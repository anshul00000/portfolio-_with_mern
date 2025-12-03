// FollowListModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable followers/following modal (full-width).
 *
 * Props:
 * - open (bool) -- show/hide the modal
 * - onClose (fn) -- called when modal closes
 * - mode ('followers'|'following') -- title mode
 * - users (array) -- list of user objects to render
 * - backendUrl (string) -- optional base url for images
 * - currentUserId (string) -- id of logged-in user (to show "You")
 * - FollowComponent (component) -- optional Follow component to render per-user
 */
export default function FollowListModal({
  open = false,
  onClose = () => {},
  mode = 'followers',
  users = [],
  backendUrl = '',
  currentUserId = '',
  FollowComponent = null,
}) {
  const dialogRef = useRef(null);
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // When `open` changes, show/close dialog and toggle body scroll
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // show modal if open
    if (open) {
      // disable page scroll
      document.body.style.overflow = 'hidden';
      // small delay so focus works after showModal
      try {
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        }
      } catch (e) { /* ignore */ }
      setTimeout(() => searchRef.current?.focus(), 60);
    } else {
      // close and restore scroll
      try { dialog.close(); } catch (e) { /* ignore */ }
      document.body.style.overflow = '';
      setSearchTerm('');
    }

    // cleanup on unmount
    return () => {
      try { dialog.close(); } catch (e) {}
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close when Escape pressed
  useEffect(() => {
    const handleKey = (ev) => { if (ev.key === 'Escape') onClose && onClose(); };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // When dialog is closed via UI (native close), ensure onClose called & scroll restored
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handler = () => {
      document.body.style.overflow = '';
      onClose && onClose();
      setSearchTerm('');
    };
    dialog.addEventListener('close', handler);
    return () => dialog.removeEventListener('close', handler);
  }, [onClose]);

  const filtered = (users || []).filter((u) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (u.username || '').toLowerCase().includes(s)
      || (u.bio || '').toLowerCase().includes(s)
      || (u.email || '').toLowerCase().includes(s);
  });

  const imgSrc = (element) => {
    if (element.photo) {
      // if backendUrl provided and photo looks like filename -> prefix
      if (backendUrl && !/^https?:\/\//i.test(element.photo) && !element.photo.startsWith('//') && !element.photo.startsWith('/public')) {
        return `${backendUrl.replace(/\/$/, '')}/public/images/${element.photo}`;
      }
      // otherwise return as-is
      return element.photo;
    }
    return backendUrl ? `${backendUrl.replace(/\/$/, '')}/public/images/default.jpg` : 'default.jpg';
  };

  return (
    <>
      <style>{`
        /* Full-screen dialog */
        dialog.follow-modal {
          border: none;
          border-radius: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          margin: 0;
          max-width: 100vw;
          z-index: 9999;
        }
        dialog.follow-modal::backdrop {
          background: rgba(0,0,0,0.55);
        }

        /* Shell uses full height layout */
        .follow-modal-shell {
          display:flex;
          flex-direction:column;
          height: 100%;
          background: #f8fafc;
        }

        .follow-modal-header {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding: 14px 18px;
          border-bottom: 1px solid #e6e6e6;
          background: linear-gradient(90deg, #ffffff, #fbfdff);
        }
        .follow-modal-title { font-weight:700; font-size:18px; color:#07263a; }
        .follow-modal-count { font-size:13px; color:#6b7280; margin-top:2px; }

        .follow-modal-controls { display:flex; gap:10px; align-items:center; }
        .follow-search { padding:8px 12px; border-radius:10px; border:1px solid #e6e6e6; width:300px; }
        .follow-button-ghost { padding:8px 12px; border-radius:10px; border:1px solid rgba(10,30,60,0.06); background:transparent; cursor:pointer; font-weight:700; color:#07263a; }

        /* List occupies remaining height and scrolls internally */
        .follow-list {
          padding: 14px;
          overflow:auto;
          display:grid;
          gap:12px;
          grid-template-columns: 1fr;
          flex: 1 1 auto;
          justyfy-content: center;
          align-items: center;
        }

        .follow-card {
          display:flex;
          gap:12px;
          align-items:center;
          padding:12px;
          border-radius:12px;
          border:1px solid #f1f5f9;
          background: #bcbcbc62;
        }

        .follow-avatar { width:64px; height:64px; border-radius:50%; overflow:hidden; flex-shrink:0; border:1px solid rgba(0,0,0,0.06); }
        .follow-avatar img { width:100%; height:100%; object-fit:cover; display:block; }

        .follow-meta { flex:1; min-width:0; display:flex; flex-direction:column; gap:6px; }
        .follow-name { font-weight:700; color:#07263a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .follow-bio { color:#6b7280; font-size:13px; max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .follow-stats { font-size:12px; color:#8b949e; }

        .follow-actions { display:flex; gap:8px; align-items:center; }

        .follow-empty { padding:30px; text-align:center; color:#6b7280; }

        @media (max-width:720px) {
          .follow-search { width:160px; }
          .follow-avatar { width:48px; height:48px; }
          .follow-modal-title { font-size:16px; }
        }
      `}</style>

      <dialog
        ref={dialogRef}
        className="follow-modal"
        aria-modal="true"
        onClose={() => {
          /* native close event handled in effect to call onClose */
        }}
      >
        <div className="follow-modal-shell" role="dialog" aria-label={mode === 'following' ? 'Following list' : 'Followers list'}>
          <div className="follow-modal-header">
            <div>
              <div className="follow-modal-title">{mode === 'following' ? 'Following' : 'Followers'}</div>
              <div className="follow-modal-count">{users?.length ?? 0} user(s)</div>
            </div>

            <div className="follow-modal-controls">
              <input
                ref={searchRef}
                className="follow-search"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="follow-button-ghost"
                onClick={(e) => { e.preventDefault(); document.body.style.overflow = ''; onClose && onClose(); }}
              >
                Close
              </button>
            </div>
          </div>

          <div className="follow-list" role="list">
            {filtered && filtered.length > 0 ? (
              filtered.map((element) => (
                <div key={element._id} className="follow-card" role="listitem">
                  <NavLink
                    to={`/user/${encodeURIComponent(element._id)}`}
                    style={{ display: 'flex', gap: 12, alignItems: 'center', textDecoration: 'none', color: 'inherit', flex: 1 }}
                    onClick={() => { document.body.style.overflow = ''; onClose && onClose(); }}
                  >
                    <div className="follow-avatar">
                      <img
                        src={imgSrc(element)}
                        alt={element.username || 'User'}
                        onError={(e) => { e.target.onerror = null; e.target.src = backendUrl ? `${backendUrl.replace(/\/$/, '')}/public/images/default.jpg` : 'default.jpg'; }}
                      />
                    </div>

                    <div className="follow-meta">
                      <div className="follow-name">{element.username || 'Unknown'}</div>
                      <div className="follow-bio">{element.bio || '—'}</div>
                      <div className="follow-stats">{(element.followers?.length ?? 0)} followers · {(element.following?.length ?? 0)} following</div>
                    </div>
                  </NavLink>

                  <div className="follow-actions">
                    {FollowComponent && currentUserId !== element._id ? (
                      <FollowComponent my_id={element._id} />
                    ) : currentUserId === element._id ? (
                      <div style={{ fontSize: 12, color: '#8b949e', padding: '6px 8px' }}>You</div>
                    ) : (
                      <NavLink to={`/user/${encodeURIComponent(element._id)}`} className="follow-button-ghost" onClick={() => { document.body.style.overflow = ''; onClose && onClose(); }}>View</NavLink>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="follow-empty">
                {users?.length === 0 ? <div>No users to show.</div> : <div>No matches for “{searchTerm}”</div>}
              </div>
            )}
          </div>
        </div>
      </dialog>

      {/* Fallback overlay for browsers without <dialog> support */}
      {!('HTMLDialogElement' in window) && open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '100vw', height: '100vh' }}>
            <div className="follow-modal-shell" style={{ height: '100%', overflow: 'hidden' }}>
              <div className="follow-modal-header">
                <div>
                  <div className="follow-modal-title">{mode === 'following' ? 'Following' : 'Followers'}</div>
                  <div className="follow-modal-count">{users?.length ?? 0} user(s)</div>
                </div>
                <div className="follow-modal-controls">
                  <input ref={searchRef} className="follow-search" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button className="follow-button-ghost" onClick={(e) => { e.preventDefault(); document.body.style.overflow = ''; onClose && onClose(); }}>Close</button>
                </div>
              </div>

              <div className="follow-list" role="list">
                {filtered && filtered.length > 0 ? filtered.map((element) => (
                  <div key={element._id} className="follow-card" role="listitem">
                    <NavLink to={`/user/${encodeURIComponent(element._id)}`} style={{ display: 'flex', gap: 12, alignItems: 'center', textDecoration: 'none', color: 'inherit', flex: 1 }} onClick={() => { document.body.style.overflow = ''; onClose && onClose(); }}>
                      <div className="follow-avatar">
                        <img src={imgSrc(element)} alt={element.username || 'User'} onError={(e) => { e.target.onerror = null; e.target.src = backendUrl ? `${backendUrl.replace(/\/$/, '')}/public/images/default.jpg` : 'default.jpg'; }} />
                      </div>
                      <div className="follow-meta">
                        <div className="follow-name">{element.username || 'Unknown'}</div>
                        <div className="follow-bio">{element.bio || '—'}</div>
                        <div className="follow-stats">{(element.followers?.length ?? 0)} followers · {(element.following?.length ?? 0)} following</div>
                      </div>
                    </NavLink>

                    <div className="follow-actions">
                      {FollowComponent && currentUserId !== element._id ? <FollowComponent my_id={element._id} /> : currentUserId === element._id ? <div style={{ fontSize: 12, color: '#8b949e', padding: '6px 8px' }}>You</div> : <NavLink to={`/user/${encodeURIComponent(element._id)}`} className="follow-button-ghost" onClick={() => { document.body.style.overflow = ''; onClose && onClose(); }}>View</NavLink>}
                    </div>
                  </div>
                )) : <div className="follow-empty">{users?.length === 0 ? <div>No users to show.</div> : <div>No matches for “{searchTerm}”</div>}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

FollowListModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  mode: PropTypes.oneOf(['followers', 'following']),
  users: PropTypes.array,
  backendUrl: PropTypes.string,
  currentUserId: PropTypes.string,
  FollowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
