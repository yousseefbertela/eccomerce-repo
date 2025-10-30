import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  createFileRequest,
  fetchStaffList,
  listFilesRequest,
  deleteFileRequest,
} from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate, truncate } from '../lib/utils.js';

const defaultForm = {
  title: '',
  description: '',
  content: '',
};

const FilesPage = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null); // Track which file is being deleted
  const [form, setForm] = useState(defaultForm);
  const [shareDraft, setShareDraft] = useState([]);
  const [shareSelect, setShareSelect] = useState({ userId: '', accessLevel: 'view' });

  const canCreateFiles = useMemo(
    () => user.role === 'boss' || (user.role === 'staff' && user.canCreateFiles),
    [user.role, user.canCreateFiles]
  );

  const canEditFile = useCallback((file) => {
    if (user.role === 'boss') {
      return true;
    }

    // Check if user is the creator
    if (file.createdBy?._id === user._id) {
      return true;
    }

    // Check if user has edit access in accessList
    return file.accessList?.some((entry) => 
      entry.user?._id === user._id && entry.accessLevel === 'edit'
    );
  }, [user._id, user.role]);

  const refreshFiles = useCallback(async () => {
    try {
      setLoading(true);
      const [fileResponse, staffResponse] = await Promise.all([
        listFilesRequest(),
        user.role === 'boss' ? fetchStaffList() : Promise.resolve({ users: [] }),
      ]);
      // Backend returns array directly, not { files: [...] }
      setFiles(Array.isArray(fileResponse) ? fileResponse : (fileResponse?.files || []));
      setStaff(staffResponse.users || []);
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [user.role]); // Remove canCreateFiles from dependency and condition

  useEffect(() => {
    refreshFiles();
  }, [refreshFiles]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddShare = () => {
    if (!shareSelect.userId) {
      return;
    }
    if (shareDraft.some((share) => share.userId === shareSelect.userId)) {
      toast.error('Staff member already added');
      return;
    }
  setShareDraft((prev) => [...prev, { ...shareSelect }]);
    setShareSelect({ userId: '', accessLevel: 'view' });
  };

  const handleRemoveShare = (userId) => {
    setShareDraft((prev) => prev.filter((share) => share.userId !== userId));
  };

  const handleShareLevelChange = (userId, level) => {
    setShareDraft((prev) => prev.map((share) => (share.userId === userId ? { ...share, accessLevel: level } : share)));
  };

  const handleCreateFile = async (event) => {
    event.preventDefault();
    setCreating(true);
    try {
      const payload = {
        ...form,
        shareWith: shareDraft.map((share) => ({
          userId: share.userId,
          accessLevel: share.accessLevel,
        })),
      };
      const response = await createFileRequest(payload);
      toast.success(response?.message || 'File created');
      setForm(defaultForm);
      setShareDraft([]);
  await refreshFiles();
    } catch (err) {
      toast.error(err?.message || 'Failed to create file');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteFile = async (fileId, fileName) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(fileId);
    try {
      const response = await deleteFileRequest(fileId);
      toast.success(response?.message || 'File deleted successfully');
      await refreshFiles();
    } catch (err) {
      toast.error(err?.message || 'Failed to delete file');
    } finally {
      setDeleting(null);
    }
  };

  const availableStaff = useMemo(
    () =>
      staff
        .filter((member) => member._id !== user._id)
        .filter((member) => !shareDraft.some((share) => share.userId === member._id)),
    [staff, user._id, shareDraft]
  );

  return (
    <div className="page-transition space-y-8 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 animate-slide-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Files
          </h1>
          <p className="text-base-content/70 text-lg">Browse, create, and collaborate on company documents.</p>
        </div>
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="badge badge-primary badge-lg font-medium">
            {files.length} Files
          </div>
          {canCreateFiles && (
            <div className="badge badge-secondary badge-lg font-medium animate-bounce-subtle">
              ✨ Creator Access
            </div>
          )}
        </div>
      </header>

      {error ? (
        <div className="alert alert-error shadow-elevated animate-scale-in" role="alert">
          <span>{error}</span>
        </div>
      ) : null}

      {canCreateFiles ? (
        <section className="glass-effect rounded-3xl p-8 shadow-elevated-lg card-hover animate-slide-in">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-primary">Create a file</h2>
              <p className="text-base-content/60">Share immediately with teammates or save privately.</p>
            </div>
            <div className="animate-float">
              <span className="text-4xl">📄</span>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleCreateFile}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="form-control group">
                <span className="label-text font-medium text-base-content/80">Name</span>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered focus-enhanced bg-base-100/50 backdrop-blur-sm transition-all duration-200 focus:bg-base-100 focus:scale-[1.02]"
                  placeholder="Quarterly revenue outlook"
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
              </label>
              <label className="form-control group">
                <span className="label-text font-medium text-base-content/80">Description</span>
                <input
                  type="text"
                  name="description"
                  className="input input-bordered focus-enhanced bg-base-100/50 backdrop-blur-sm transition-all duration-200 focus:bg-base-100 focus:scale-[1.02]"
                  placeholder="Short summary"
                  value={form.description}
                  onChange={handleFormChange}
                />
              </label>
            </div>
            <label className="form-control group">
              <span className="label-text font-medium text-base-content/80">Content</span>
              <textarea
                name="content"
                className="textarea textarea-bordered h-40 focus-enhanced bg-base-100/50 backdrop-blur-sm transition-all duration-200 focus:bg-base-100 resize-none"
                placeholder="Add details, agenda, or notes here"
                value={form.content}
                onChange={handleFormChange}
              />
            </label>
            <div className="rounded-2xl border border-base-200/60 bg-base-200/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-base-content">Share on create</span>
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => setShareDraft([])}>
                  Reset
                </button>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-[2fr_1fr_auto]">
                <select
                  className="select select-bordered"
                  value={shareSelect.userId}
                  onChange={(event) =>
                    setShareSelect((prev) => ({ ...prev, userId: event.target.value }))
                  }
                >
                  <option value="">Select teammate</option>
                  {availableStaff.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered"
                  value={shareSelect.accessLevel}
                  onChange={(event) =>
                    setShareSelect((prev) => ({ ...prev, accessLevel: event.target.value }))
                  }
                >
                  <option value="view">Can view</option>
                  <option value="edit">Can edit</option>
                </select>
                <button type="button" className="btn btn-primary" onClick={handleAddShare}>
                  Add
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {shareDraft.length === 0 ? (
                  <span className="text-xs text-base-content/60">
                    No teammates yet. Add one to share instantly after creation.
                  </span>
                ) : (
                  shareDraft.map((share) => {
                    const member = staff.find((item) => item._id === share.userId);
                    return (
                      <div
                        key={share.userId}
                        className="flex items-center gap-2 rounded-full bg-base-100 px-3 py-1 text-xs shadow"
                      >
                        <span className="font-medium">{member?.name || 'Unknown'}</span>
                        <select
                          className="select select-bordered select-xs"
                          value={share.accessLevel}
                          onChange={(event) => handleShareLevelChange(share.userId, event.target.value)}
                        >
                          <option value="view">view</option>
                          <option value="edit">edit</option>
                        </select>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs"
                          onClick={() => handleRemoveShare(share.userId)}
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-enhanced focus-enhanced" disabled={creating}>
              {creating ? <span className="loading loading-spinner" /> : null}
              <span>✨ Create file</span>
            </button>
          </form>
        </section>
      ) : null}

      <section className="glass-effect rounded-3xl p-8 shadow-elevated-lg animate-slide-in">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-primary">All files</h2>
            <p className="text-base-content/60">{files.length} files available to you.</p>
          </div>
          <div className="animate-float">
            <span className="text-3xl">📁</span>
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <span className="loading loading-dots loading-lg text-primary animate-pulse" />
              <p className="text-base-content/60">Loading your files...</p>
            </div>
          </div>
        ) : files.length === 0 ? (
          <div className="py-20 text-center space-y-4 animate-fade-in">
            <div className="text-6xl animate-float">📂</div>
            <p className="text-lg text-base-content/60">
              Nothing here yet. {canCreateFiles ? 'Create the first file to get started.' : 'Ask the boss for access.'}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {files.map((file, index) => (
              <article
                key={file._id}
                className="group glass-effect rounded-3xl p-6 card-hover shadow-elevated animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">📄</span>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                          {file.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="badge badge-sm badge-ghost">
                            👤 {file.createdBy?.name}
                          </span>
                          {file.accessList && file.accessList.length > 0 && (
                            <span className="badge badge-sm badge-primary badge-outline">
                              🔗 {file.accessList.length} {file.accessList.length === 1 ? 'person' : 'people'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 line-clamp-2">{truncate(file.description)}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Link 
                      className="btn btn-primary btn-sm btn-enhanced focus-enhanced" 
                      to={`/files/${file._id}`}
                    >
                      Open
                    </Link>
                    {canEditFile(file) && (
                      <button
                        type="button"
                        className="btn btn-error btn-sm btn-enhanced focus-enhanced"
                        onClick={() => handleDeleteFile(file._id, file.title)}
                        disabled={deleting === file._id}
                        title="Delete file"
                      >
                        {deleting === file._id ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          '🗑️'
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <dl className="mt-6 grid gap-2 text-xs text-base-content/60 sm:grid-cols-2">
                  <div>
                    <dt>Owner</dt>
                    <dd className="font-medium text-base-content">{file.createdBy?.name}</dd>
                  </div>
                  <div>
                    <dt>Updated</dt>
                    <dd>{formatDate(file.updatedAt)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt>Shared with</dt>
                    <dd className="mt-1 flex flex-wrap gap-1">
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FilesPage;
