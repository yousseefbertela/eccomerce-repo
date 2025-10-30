import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { listFilesRequest, fetchPendingUsers } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate, truncate } from '../lib/utils.js';

const DashboardPage = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [filesResponse, pendingResponse] = await Promise.all([
          listFilesRequest(),
          user.role === 'boss' ? fetchPendingUsers() : Promise.resolve([]),
        ]);
        // Backend returns array directly, not { files: [...] }
        const fetchedFiles = Array.isArray(filesResponse) ? filesResponse : (filesResponse?.files || []);
        setFiles(fetchedFiles);
        // Backend returns array directly, not { users: [...] }
        const fetchedPending = Array.isArray(pendingResponse) ? pendingResponse : (pendingResponse?.users || []);
        setPendingUsers(fetchedPending);
        setError(null);
      } catch (err) {
        setError(err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user.role]);

  const stats = useMemo(() => {
    const totalFiles = files.length;
    const myFiles = files.filter((file) => file.createdBy?._id === user._id).length;
    const sharedWithMe = files.filter((file) =>
      file.accessList?.some((entry) => entry.user?._id === user._id)
    ).length;

    return {
      totalFiles,
      myFiles,
      sharedWithMe,
      pendingApprovals: pendingUsers.length,
    };
  }, [files, user._id, pendingUsers.length]);

  const recentFiles = files.slice(0, 5);

  return (
    <div className="fade-in space-y-8 py-8">
      <header>
        <h1 className="text-3xl font-bold text-base-content">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-base-content/70">
          {user.role === 'boss'
            ? 'Review pending approvals, manage files, and keep the organization secure.'
            : 'Access shared documents and stay updated with the latest changes.'}
        </p>
      </header>

      {error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="stat">
          <div className="stat-title">Total files</div>
          <div className="stat-value text-primary">{stats.totalFiles}</div>
          <div className="stat-desc">Across all accessible documents</div>
        </article>
        <article className="stat">
          <div className="stat-title">My files</div>
          <div className="stat-value text-secondary">{stats.myFiles}</div>
          <div className="stat-desc">Created by you</div>
        </article>
        <article className="stat">
          <div className="stat-title">Shared with me</div>
          <div className="stat-value text-accent">{stats.sharedWithMe}</div>
          <div className="stat-desc">Active collaborations</div>
        </article>
        {user.role === 'boss' ? (
          <article className="stat">
            <div className="stat-title">Pending approvals</div>
            <div className="stat-value text-warning">{stats.pendingApprovals}</div>
            <div className="stat-desc">Staff awaiting access</div>
          </article>
        ) : null}
      </section>

      {user.role === 'staff' && !user.approved ? (
        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-6 text-warning">
          <h2 className="text-lg font-semibold">Awaiting boss approval</h2>
          <p className="mt-2 text-warning/80">
            You can sign in but will need the boss to approve your account before accessing shared files.
          </p>
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-base-content">Recent files</h2>
            <Link className="btn btn-ghost btn-sm" to="/files">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-base-200/70">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <span className="loading loading-dots loading-lg text-primary" />
              </div>
            ) : recentFiles.length === 0 ? (
              <p className="py-6 text-sm text-base-content/60">
                No files yet. Create one or ask the boss for access.
              </p>
            ) : (
              recentFiles.map((file) => (
                <article key={file._id} className="flex items-start justify-between gap-4 py-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-base-content">{file.title}</h3>
                      <span className="badge badge-xs badge-ghost">
                        👤 {file.createdBy?.name}
                      </span>
                      {file.accessList && file.accessList.length > 0 && (
                        <span className="badge badge-xs badge-primary badge-outline">
                          🔗 {file.accessList.length}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-base-content/60">
                      Updated {formatDate(file.updatedAt)}
                    </p>
                    <p className="mt-2 text-sm text-base-content/70">{truncate(file.description)}</p>
                  </div>
                  <Link to={`/files/${file._id}`} className="btn btn-ghost btn-xs">
                    Open
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
        {user.role === 'boss' ? (
          <div className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-base-content">Awaiting approval</h2>
              <Link className="btn btn-ghost btn-sm" to="/approvals">
                Manage
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <span className="loading loading-spinner text-primary" />
                </div>
              ) : pendingUsers.length === 0 ? (
                <p className="text-sm text-base-content/60">No pending requests. Enjoy the calm.</p>
              ) : (
                pendingUsers.slice(0, 5).map((staff) => (
                  <article
                    key={staff._id}
                    className="rounded-2xl border border-base-200/60 bg-base-200/60 p-4 text-sm"
                  >
                    <p className="font-semibold text-base-content">{staff.name}</p>
                    <p className="text-xs text-base-content/60">{staff.email}</p>
                    <p className="mt-2 text-xs text-base-content/60">
                      Requested {formatDate(staff.createdAt)}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-base-200/70 bg-base-100/70 p-6 shadow-md">
            <h2 className="text-lg font-semibold text-base-content">Need more access?</h2>
            <p className="mt-2 text-sm text-base-content/70">
              Ask the boss to share the files you need. You&apos;ll get a notification when your permissions change.
            </p>
            <Link to="/files" className="btn btn-primary btn-sm mt-6">
              Browse files
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
