import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { toast } from 'react-toastify';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import "./Project.css";
import SkeletonCard from '../SkeletonCard/SkeletonCard';

export default function Project({
  projects = undefined,
  backendUrl = undefined,
  authToken = undefined,
  canEdit = false,
  onUpdate = () => { },
  onDelete = () => { },
  showHeader = true,
} = {}) {
  const ctx = useContext(Context);
  const ctxProjects = ctx?.project;
  const ctxBackend = ctx?.backend_url || '';
  const ctxAuth = ctx?.state || '';
  const set_run_effect = ctx?.set_run_effect;
  const run_effect = ctx?.run_effect;

  const projectList = projects !== undefined ? projects : ctxProjects;
  const baseUrl = (backendUrl !== undefined ? backendUrl : ctxBackend) || '';
  const token = (authToken !== undefined ? authToken : ctxAuth) || '';

  const [isSending, setIsSending] = useState(false);
  const dialogRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // track last created object URL so we can revoke it when replaced/closed
  const prevObjectUrlRef = useRef(null);

  const [projectDetails, setProjectDetails] = useState({
    id: '',
    name: '',
    description: '',
    technologys: '',
    github_link: '',
    online_link: '',
    file: null,
    currentImage: '',
  });

  useEffect(() => {
    try { set_run_effect && set_run_effect(!run_effect); } catch (e) { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // disable page scroll when dialog is open
  useEffect(() => {
    if (dialogOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
    // defensive: ensure overflow isn't stuck
    document.body.style.overflow = document.body.style.overflow || '';
    return () => {};
  }, [dialogOpen]);

  // cleanup on unmount: revoke any leftover object URL
  useEffect(() => {
    return () => {
      if (prevObjectUrlRef.current) {
        try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (e) { /* ignore */ }
        prevObjectUrlRef.current = null;
      }
    };
  }, []);

  // --- helper: build correct image src ---
  function getImageUrl(image) {
    if (!image) return `${baseUrl}/public/images/default_project.jpg`;
    if (typeof image === 'string') {
      const trimmed = image.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
        return trimmed;
      }
      if (trimmed.startsWith('/')) {
        if (trimmed.includes('/public/images/')) return trimmed;
        return `${trimmed}`;
      }
      return `${baseUrl.replace(/\/$/, '')}/public/images/${trimmed}`;
    }
    return `${baseUrl}/public/images/default_project.jpg`;
  }

  const handleFileChange = (e) => {
    const chosen = e.target.files?.[0];
    if (!chosen) {
      // user cleared selection
      // revoke previous object URL if any
      if (prevObjectUrlRef.current) {
        try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
        prevObjectUrlRef.current = null;
      }
      setProjectDetails((p) => ({ ...p, file: null, currentImage: '' }));
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(chosen.type)) {
      toast.error('❌ Only image files allowed (jpeg, png, gif, webp, svg).');
      // don't keep invalid file
      setProjectDetails((p) => ({ ...p, file: null }));
      return;
    }

    // revoke old object URL if present
    if (prevObjectUrlRef.current) {
      try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
      prevObjectUrlRef.current = null;
    }

    // create new preview object URL and save it
    const objUrl = URL.createObjectURL(chosen);
    prevObjectUrlRef.current = objUrl;

    setProjectDetails((p) => ({
      ...p,
      file: chosen,
      currentImage: objUrl, // immediate preview update
    }));
  };

  const openDialog = (item) => {
    // if previously created object URL exists (leftover), revoke it
    if (prevObjectUrlRef.current) {
      try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
      prevObjectUrlRef.current = null;
    }

    setProjectDetails({
      id: item._id || '',
      name: item.name || '',
      description: item.description || '',
      technologys: item.technologys || '',
      github_link: item.github_link || '',
      online_link: item.online_link || '',
      file: null,
      currentImage: getImageUrl(item.image),
    });
    if (dialogRef.current && typeof dialogRef.current.showModal === 'function') {
      dialogRef.current.showModal();
      setDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const closeDialog = () => {
    try { dialogRef.current?.close(); } catch (e) { }
    setDialogOpen(false);

    // revoke object URL if we created one for preview
    if (prevObjectUrlRef.current) {
      try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
      prevObjectUrlRef.current = null;
    }

    setProjectDetails({
      id: '',
      name: '',
      description: '',
      technologys: '',
      github_link: '',
      online_link: '',
      file: null,
      currentImage: '',
    });
  };

  const updateValue = (e) => {
    const { name, value } = e.target;
    setProjectDetails((p) => ({ ...p, [name]: value }));
  };

  const updateProject = async (e) => {
    e.preventDefault();
    if (!projectDetails.id) {
      toast.error('Project id missing.');
      return;
    }
    setIsSending(true);

    try {
      const data = new FormData();
      data.append('name', projectDetails.name);
      data.append('description', projectDetails.description);
      data.append('technologys', projectDetails.technologys);
      data.append('github_link', projectDetails.github_link || '');
      data.append('online_link', projectDetails.online_link || '');
      if (projectDetails.file) data.append('image', projectDetails.file);

      const res = await fetch(`${baseUrl}/updateproject/${projectDetails.id}`, {
        method: 'PATCH',
        headers: { Authorization: token || '' },
        body: data,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Update failed', res.status, text);
        toast.error('Update failed. Check console.');
        setIsSending(false);
        return;
      }

      const result = await res.json();
      toast.success('Project updated successfully');
      setIsSending(false);

      // after successful save, revoke any preview object URL
      if (prevObjectUrlRef.current) {
        try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
        prevObjectUrlRef.current = null;
      }

      closeDialog();
      try { onUpdate(result); } catch (e) { }
      try { set_run_effect && set_run_effect(!run_effect); } catch (e) { }
    } catch (err) {
      console.error('Error updating project', err);
      toast.error('Error updating project');
      setIsSending(false);
    }
  };

  const deleteProject = async (image, id) => {
    const allow = confirm('Are you sure you want to delete this project?');
    if (!allow) {
      toast.info('Delete cancelled');
      return;
    }
    try {
      const url = `${baseUrl}/deletefile/${id}/image/${encodeURIComponent(image)}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
      });
      const data = await response.json();
      toast.success(data.message || 'Deleted');
      try { onDelete(data); } catch (e) { }
      try { set_run_effect && set_run_effect(!run_effect); } catch (e) { }
    } catch (err) {
      console.error('Delete error', err);
      toast.error('Error deleting project');
    }
  };

  // ensure .preview_wrap img styles if Project.css missing tweaks — we inject critical inline style here to avoid missing CSS
  const imgInlineStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

  return (
    <>
      {/* keep header/spacing consistent */}
      {/* {showHeader && (
        <div className="all_project_container">
          <h1 className="all_project_h1">{canEdit ? 'Your Projects' : 'Projects'}</h1>
        </div>
      )} */}

      {!projectList ? (
        <div>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : projectList.length === 0 ? (
        <p style={{ textAlign: 'center', padding: 40 }}>No projects available.</p>
      ) : (
        <div className="all_project_container">
          <div className="projects_grid">
            {projectList.map((p) => {
              const imageSrc = getImageUrl(p.image);
              return (
                <article key={p._id} className="project_card" data-aos="fade-up" aria-labelledby={`proj-${p._id}`}>
                  <div className="owner_bar">
                    <div className="avatar">
                      <img
                        src={p.owner?.photo ? getImageUrl(p.owner.photo) : `${baseUrl}/public/images/default.jpg`}
                        alt={p.owner?.username || 'User'}
                        onError={(e) => { e.target.onerror = null; e.target.src = `${baseUrl}/public/images/default.jpg`; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div className="owner_meta">
                      <div className="owner_name">{p.owner?.username || 'Unknown'}</div>
                      <div className="owner_sub">{p.owner?.email || p.owner?.bio || ''}</div>
                    </div>

                    <div className="owner_actions">
                      {canEdit ? (
                        <>
                          <button className="btn btn-ghost small" onClick={() => openDialog(p)}>Edit</button>
                          <button className="btn btn-ghost small" onClick={() => deleteProject(p.image, p._id)}>Delete</button>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="card_body">
                    <a href={p.online_link || '#'} target="_blank" rel="noreferrer" className="preview_wrap" aria-label={`Preview ${p.name}`} style={{ minWidth: 220, height: 250 }}>
                      <img
                        src={imageSrc}
                        alt={`${p.name} preview`}
                        onError={(e) => { e.target.onerror = null; e.target.src = `${baseUrl}/public/images/default_project.jpg`; }}
                        loading="lazy"
                        style={imgInlineStyle}
                      />
                    </a>

                    <div className="content">
                      <h2 id={`proj-${p._id}`} className="project_title">{p.name}</h2>
                      <div className="project_desc">{p.description || 'No description provided.'}</div>
                      <div className="project_tags">{p.technologys || ''}</div>

                      <div className="actions_row" role="group">
                        {p.github_link ? (
                          <a href={p.github_link} target="_blank" rel="noreferrer" className="btn btn-github small">
                            <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
                          </a>
                        ) : (
                          <button className="btn btn-ghost small" disabled>GitHub</button>
                        )}

                        {p.online_link ? (
                          <a href={p.online_link} target="_blank" rel="noreferrer" className="btn btn-view small">
                            <LanguageIcon sx={{ fontSize: 16 }} /> View
                          </a>
                        ) : (
                          <button className="btn btn-ghost small" disabled>No Demo</button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="project_footer">
                    <div>{new Date(p.createdAt || Date.now()).toLocaleDateString()}</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <a href={p.github_link || '#'} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'underline', fontSize: 13 }}>
                        Source
                      </a>
                      <a href={p.online_link || '#'} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'underline', fontSize: 13 }}>
                        Open
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit dialog */}
      <dialog ref={dialogRef} className="edit_dialog" onClose={() => setDialogOpen(false)}>
        <div className="dialog_container">
          <div className="dialog_header">
            <h3 className="dialog_title">Edit Project</h3>
            <div className="header_actions">
              <button type="button" className="btn btn-cancel" onClick={closeDialog}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-save"
                disabled={isSending}
                onClick={updateProject}
              >
                {isSending ? (
                  <>
                    <span className="spinner"></span>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>

          <form onSubmit={updateProject} className="dialog_form">
            <div className="form_grid">
              <div className="form_group">
                <label htmlFor="edit_name" className="form_label">Project Name *</label>
                <input
                  id="edit_name"
                  name="name"
                  placeholder="Enter project name"
                  value={projectDetails.name}
                  onChange={updateValue}
                  required
                  className="form_input"
                />
              </div>

              <div className="form_group">
                <label htmlFor="edit_description" className="form_label">Description</label>
                <textarea
                  id="edit_description"
                  name="description"
                  rows={4}
                  placeholder="Describe your project..."
                  value={projectDetails.description}
                  onChange={updateValue}
                  className="form_textarea"
                />
              </div>

              <div className="form_group">
                <label htmlFor="edit_tech" className="form_label">Technologies</label>
                <textarea
                  id="edit_tech"
                  name="technologys"
                  rows={2}
                  placeholder="React, Node.js, MongoDB..."
                  value={projectDetails.technologys}
                  onChange={updateValue}
                  className="form_textarea"
                />
              </div>

              <div className="form_group">
                <label htmlFor="edit_github" className="form_label">GitHub Link</label>
                <input
                  id="edit_github"
                  name="github_link"
                  type="url"
                  placeholder="https://github.com/..."
                  value={projectDetails.github_link}
                  onChange={updateValue}
                  className="form_input"
                />
              </div>

              <div className="form_group">
                <label htmlFor="edit_online" className="form_label">Live Demo Link</label>
                <input
                  id="edit_online"
                  name="online_link"
                  type="url"
                  placeholder="https://..."
                  value={projectDetails.online_link}
                  onChange={updateValue}
                  className="form_input"
                />
              </div>

              <div className="form_group">
                <label className="form_label">Project Image</label>
                <div className="image_upload_wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="edit_file"
                    className="file_input"
                  />
                  <label htmlFor="edit_file" className="file_input_label">
                    <span className="file_icon">📁</span>
                    <span>{projectDetails.file ? projectDetails.file.name : 'Choose image'}</span>
                  </label>
                  {projectDetails.currentImage && (
                    <div className="image_preview_box">
                      <img
                        src={projectDetails.currentImage}
                        alt="preview"
                        className="dialog_preview_img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `${baseUrl}/public/images/default_project.jpg`;
                        }}
                        style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
