import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  approveUserRequest,
  fetchPendingUsers,
  listFilesRequest,
} from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate } from '../lib/utils.js';

const PendingStaffCard = ({ staff, files, onApprove, onReject, disabled }) => {
  const [canCreateFiles, setCanCreateFiles] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [selection, setSelection] = useState({ fileId: '', accessLevel: 'view' });

  useEffect(() => {
    setCanCreateFiles(false);
    setAssignments([]);
  }, [staff._id]);

  const availableFiles = useMemo(
    () => files.filter((file) => !assignments.some((assignment) => assignment.fileId === file._id)),
    [files, assignments]
  );

  const handleAddAssignment = () => {
    if (!selection.fileId) {
      toast.error('Choose a file to assign');
      return;
    }
    setAssignments((prev) => [...prev, { ...selection }]);
    setSelection({ fileId: '', accessLevel: 'view' });
  };

  const handleRemoveAssignment = (fileId) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.fileId !== fileId));
  };

  const handleLevelChange = (fileId, level) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.fileId === fileId ? { ...assignment, accessLevel: level } : assignment
      )
    );
  };

  const handleApprove = () => {
    onApprove(staff._id, {
      approved: true,
      canCreateFiles,
      assignments,
    });
  };

  const handleReject = () => {
    onReject(staff._id);
  };

  return (
    <article className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-base-content">{staff.name}</h3>
          <p className="text-sm text-base-content/60">{staff.email}</p>
        </div>
        <time className="text-xs text-base-content/60">Requested {formatDate(staff.createdAt)}</time>
      </header>

      <div className="mt-4 space-y-4">
        <label className="flex items-center justify-between rounded-2xl border border-base-200/60 bg-base-200/40 p-3 text-sm">
          <div>
            <p className="font-semibold">Allow file creation</p>
            <p className="text-xs text-base-content/60">Staff can publish new documents when enabled.</p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={canCreateFiles}
            onChange={(event) => setCanCreateFiles(event.target.checked)}
          />
        </label>

        <div className="rounded-2xl border border-base-200/60 bg-base-200/40 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <select
              className="select select-bordered flex-1"
              value={selection.fileId}
              onChange={(event) => setSelection((prev) => ({ ...prev, fileId: event.target.value }))}
            >
              <option value="">Select file to share</option>
              {availableFiles.map((file) => (
                <option key={file._id} value={file._id}>
                  {file.title}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered md:w-40"
              value={selection.accessLevel}
              onChange={(event) => setSelection((prev) => ({ ...prev, accessLevel: event.target.value }))}
            >
              <option value="view">Can view</option>
              <option value="edit">Can edit</option>
            </select>
            <button type="button" className="btn btn-primary md:w-auto" onClick={handleAddAssignment}>
              Add
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {assignments.length === 0 ? (
              <span className="text-xs text-base-content/60">
                Assign files now to share access instantly once approved.
              </span>
            ) : (
              assignments.map((assignment) => {
                const file = files.find((item) => item._id === assignment.fileId);
                return (
                  <div
                    key={assignment.fileId}
                    className="flex items-center gap-2 rounded-full bg-base-100 px-3 py-1 text-xs shadow"
                  >
                    <span className="font-medium">{file?.name || 'Untitled file'}</span>
                    <select
                      className="select select-bordered select-xs"
                      value={assignment.accessLevel}
                      onChange={(event) => handleLevelChange(assignment.fileId, event.target.value)}
                    >
                      <option value="view">view</option>
                      <option value="edit">edit</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleRemoveAssignment(assignment.fileId)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="btn btn-error flex-1"
            onClick={handleReject}
            disabled={disabled}
          >
            {disabled ? <span className="loading loading-spinner" /> : 'Reject'}
          </button>
          <button
            type="button"
            className="btn btn-success flex-1"
            onClick={handleApprove}
            disabled={disabled}
          >
            {disabled ? <span className="loading loading-spinner" /> : 'Approve'}
          </button>
        </div>
      </div>
    </article>
  );
};

const ApprovalsPage = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.role !== 'boss') {
      navigate('/', { replace: true });
    }
  }, [user.role, navigate]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [pendingResponse, fileResponse] = await Promise.all([
        fetchPendingUsers(),
        listFilesRequest(),
      ]);
      // Backend returns arrays directly, not { users: [...] } or { files: [...] }
      setPending(Array.isArray(pendingResponse) ? pendingResponse : (pendingResponse?.users || []));
      setFiles(Array.isArray(fileResponse) ? fileResponse : (fileResponse?.files || []));
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to load pending approvals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (id, payload) => {
    try {
      setActingId(id);
      const response = await approveUserRequest(id, payload);
      toast.success(response?.message || 'User approved successfully');
      setPending((prev) => prev.filter((staff) => staff._id !== id));
      await refreshProfile();
    } catch (err) {
      toast.error(err?.message || 'Failed to approve user');
    } finally {
      setActingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActingId(id);
      const response = await approveUserRequest(id, { approved: false });
      toast.success(response?.message || 'User rejected');
      setPending((prev) => prev.filter((staff) => staff._id !== id));
    } catch (err) {
      toast.error(err?.message || 'Failed to reject user');
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="fade-in space-y-8 py-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Pending approvals</h1>
          <p className="mt-1 text-base-content/70">
            Review staff account requests, assign file access, and keep everyone aligned.
          </p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={load}>
          Refresh list
        </button>
      </header>

      {error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="loading loading-dots loading-lg text-primary" />
        </div>
      ) : pending.length === 0 ? (
        <div className="rounded-3xl border border-base-200/70 bg-base-100/70 p-10 text-center text-base-content/60">
          <p className="text-lg font-semibold text-base-content">No pending requests</p>
          <p className="mt-2 text-sm">
            You&apos;ll see new staff members here as soon as they request access to Angal.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {pending.map((staff) => (
            <PendingStaffCard
              key={staff._id}
              staff={staff}
              files={files}
              onApprove={handleApprove}
              onReject={handleReject}
              disabled={actingId === staff._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalsPage;
