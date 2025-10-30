import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  fetchStaffList,
  getFileByIdRequest,
  updateFileRequest,
  updateFileSharesRequest,
  deleteFileRequest,
} from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate } from '../lib/utils.js';

const FileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', content: '' });
  const [shareDraft, setShareDraft] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [shareSaving, setShareSaving] = useState(false);
  const [error, setError] = useState(null);
  const [newShare, setNewShare] = useState({ userId: '', accessLevel: 'view' });

  const canEditContent = useMemo(() => {
    if (!file) return false;
    if (user.role === 'boss') return true;
    if (file.createdBy?._id === user._id) return true;
    return file.accessList?.some(
      (entry) => entry.user?._id === user._id && entry.accessLevel === 'edit'
    );
  }, [file, user]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [fileResponse, staffResponse] = await Promise.all([
        getFileByIdRequest(id),
        user.role === 'boss' ? fetchStaffList() : Promise.resolve([]),
      ]);

      // Backend returns file directly, not { file: {...} }
      const fetchedFile = fileResponse;
      if (!fetchedFile) {
        throw new Error('File not found');
      }

      setFile(fetchedFile);
      setForm({
        title: fetchedFile.title || '',
        description: fetchedFile.description || '',
        content: fetchedFile.content || '',
      });
      setShareDraft(
        fetchedFile.accessList?.map((entry) => ({
          userId: entry.user?._id,
          accessLevel: entry.accessLevel,
        })) || []
      );
      // Backend returns array directly, not { users: [...] }
      setStaff(Array.isArray(staffResponse) ? staffResponse : (staffResponse?.users || []));
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to load file');
    } finally {
      setLoading(false);
    }
  }, [id, user.role]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!canEditContent) {
      return;
    }
    setSaving(true);
    try {
      const response = await updateFileRequest(id, form);
      setFile(response.file);
      toast.success(response?.message || 'File updated');
    } catch (err) {
      toast.error(err?.message || 'Failed to update file');
    } finally {
      setSaving(false);
    }
  };

  const availableStaff = useMemo(() => {
    if (user.role !== 'boss') return [];
    return staff
      .filter((member) => member._id !== user._id)
      .filter((member) => !shareDraft.some((share) => share.userId === member._id));
  }, [staff, user, shareDraft]);

  const handleAddShare = () => {
    if (!newShare.userId) {
      toast.error('Select a staff member');
      return;
    }
    setShareDraft((prev) => [...prev, { ...newShare }]);
    setNewShare({ userId: '', accessLevel: 'view' });
  };

  const handleRemoveShare = (userIdToRemove) => {
    setShareDraft((prev) => prev.filter((share) => share.userId !== userIdToRemove));
  };

  const handleShareLevelChange = (userIdToUpdate, level) => {
    setShareDraft((prev) =>
      prev.map((share) =>
        share.userId === userIdToUpdate ? { ...share, accessLevel: level } : share
      )
    );
  };

  const handleSaveShares = async () => {
    setShareSaving(true);
    try {
      const response = await updateFileSharesRequest(id, { shares: shareDraft });
      setFile(response.file);
      setShareDraft(
        response.file.accessList?.map((entry) => ({
          userId: entry.user?._id,
          accessLevel: entry.accessLevel,
        })) || []
      );
      toast.success(response?.message || 'Shares updated');
    } catch (err) {
      toast.error(err?.message || 'Failed to update shares');
    } finally {
      setShareSaving(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!window.confirm(`Are you sure you want to delete "${file.name}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const response = await deleteFileRequest(id);
      toast.success(response?.message || 'File deleted successfully');
      navigate('/files'); // Redirect to files page after deletion
    } catch (err) {
      toast.error(err?.message || 'Failed to delete file');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 py-10">
        <p className="text-center text-sm text-error">{error}</p>
        <button type="button" className="btn btn-ghost mx-auto" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  if (!file) {
    return null;
  }

  return (
    <div className="fade-in space-y-8 py-8">
      <Link to="/files" className="btn btn-ghost btn-sm">
        ← All files
      </Link>

      <header className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">{file.name}</h1>
            <p className="mt-2 text-base-content/70">
              Owned by {file.createdBy?.name} • Updated {formatDate(file.updatedAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-xs text-base-content/60">
              <span className="badge badge-outline capitalize">{user.role}</span>
              {canEditContent ? <span className="badge badge-primary badge-outline">Can edit</span> : null}
            </div>
            {canEditContent ? (
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={handleDeleteFile}
                disabled={deleting}
              >
                {deleting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  'Delete File'
                )}
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-base-content">Document</h2>
            {canEditContent ? (
              <button type="button" className="btn btn-ghost btn-sm" onClick={load}>
                Refresh
              </button>
            ) : null}
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleUpdate}>
            <label className="form-control">
              <span className="label-text">Name</span>
              <input
                type="text"
                name="title"
                className="input input-bordered"
                value={form.title}
                onChange={handleFormChange}
                disabled={!canEditContent}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Description</span>
              <input
                type="text"
                name="description"
                className="input input-bordered"
                value={form.description}
                onChange={handleFormChange}
                disabled={!canEditContent}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Content</span>
              <textarea
                name="content"
                className="textarea textarea-bordered h-60"
                value={form.content}
                onChange={handleFormChange}
                disabled={!canEditContent}
              />
            </label>
            {canEditContent ? (
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="loading loading-spinner" /> : null}
                <span>Save changes</span>
              </button>
            ) : null}
          </form>
        </article>

        <aside className="space-y-6">
          <article className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
            <h2 className="text-lg font-semibold text-base-content">Share access</h2>
            {user.role !== 'boss' ? (
              <p className="mt-3 text-sm text-base-content/60">
                Only the boss can manage sharing. You&apos;ll see updates when your permissions change.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-base-200/60 bg-base-200/40 p-4">
                  <div className="grid gap-3 md:grid-cols-[2fr_1fr_auto]">
                    <select
                      className="select select-bordered"
                      value={newShare.userId}
                      onChange={(event) =>
                        setNewShare((prev) => ({ ...prev, userId: event.target.value }))
                      }
                    >
                      <option value="">Select staff</option>
                      {availableStaff.map((member) => (
                        <option key={member._id} value={member._id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered"
                      value={newShare.accessLevel}
                      onChange={(event) =>
                        setNewShare((prev) => ({ ...prev, accessLevel: event.target.value }))
                      }
                    >
                      <option value="view">Can view</option>
                      <option value="edit">Can edit</option>
                    </select>
                    <button type="button" className="btn btn-primary" onClick={handleAddShare}>
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {shareDraft.length === 0 ? (
                    <p className="text-sm text-base-content/60">No shares yet. Add a teammate above.</p>
                  ) : (
                    shareDraft.map((share) => {
                      const member = staff.find((item) => item._id === share.userId);
                      return (
                        <div
                          key={share.userId}
                          className="flex items-center justify-between rounded-2xl border border-base-200/60 bg-base-200/50 p-3"
                        >
                          <div>
                            <p className="text-sm font-semibold text-base-content">{member?.name}</p>
                            <p className="text-xs text-base-content/60">{member?.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              className="select select-bordered select-sm"
                              value={share.accessLevel}
                              onChange={(event) => handleShareLevelChange(share.userId, event.target.value)}
                            >
                              <option value="view">view</option>
                              <option value="edit">edit</option>
                            </select>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => handleRemoveShare(share.userId)}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSaveShares}
                  disabled={shareSaving}
                >
                  {shareSaving ? <span className="loading loading-spinner" /> : null}
                  <span>Save share settings</span>
                </button>
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
            <h2 className="text-lg font-semibold text-base-content">Activity</h2>
            <dl className="mt-4 space-y-2 text-sm text-base-content/70">
              <div>
                <dt>Created</dt>
                <dd>{formatDate(file.createdAt)}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{formatDate(file.updatedAt)}</dd>
              </div>
              <div>
                <dt>Access list</dt>
                <dd className="mt-1 flex flex-wrap gap-1 text-xs">
                  {file.accessList?.length ? (
                    file.accessList.map((entry) => (
                      <span key={entry.user?._id} className="badge badge-outline capitalize">
                        {entry.user?.name} • {entry.accessLevel}
                      </span>
                    ))
                  ) : (
                    <span className="badge badge-ghost">Private</span>
                  )}
                </dd>
              </div>
            </dl>
          </article>
        </aside>
      </section>
    </div>
  );
};

export default FileDetailPage;
