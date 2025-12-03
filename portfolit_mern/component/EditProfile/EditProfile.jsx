// EditProfile.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EditProfile.css';

/**
 * EditProfile page with extended portfolio fields:
 * - education[] (institution, degree, fieldOfStudy, startYear, endYear, description)
 * - experience[] (company, role, location, startDate, endDate, currentlyWorking, description)
 * - certifications[] (title, issuer, issueDate, credentialUrl)
 * - skills[] (array of strings via tag input)
 * - role, website, resumeUrl, location
 * - profile image preview (object URL, revoked on cleanup)
 *
 * Submits multipart/form-data:
 * - simple fields appended normally
 * - arrays appended as JSON strings (e.g. data.append('education', JSON.stringify(education)))
 *
 * Adjust backend parsing accordingly (e.g. JSON.parse(req.body.education)).
 */

export default function EditProfile() {
  const { state: authToken, backend_url, user: ctxUser, run_effect, set_run_effect } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const incomingUser = location.state?.user || ctxUser || null;

  const [sending, setSending] = useState(false);

  // track last created object URL for cleanup
  const prevObjectUrlRef = useRef(null);

  const [editUser, setEditUser] = useState({
    id: '',
    username: '',
    bio: '',
    github: '',
    linkedin: '',
    file: null,
    currentImage: '',
    // new fields
    education: [],       // array of objects
    experience: [],      // array of objects
    certifications: [],  // array of objects
    skills: [],          // array of strings
    skillsInput: '',     // temporary input for skills
    role: '',
    website: '',
    resumeUrl: '',
    location: '',
    isFresher: false,    // fresher flag
  });

  useEffect(() => {
    if (!incomingUser) {
      navigate('/login');
      return;
    }

    const hasExperience = Array.isArray(incomingUser.experience) && incomingUser.experience.length > 0;
    
    setEditUser({
      id: incomingUser._id || '',
      username: incomingUser.username || '',
      bio: incomingUser.bio || '',
      github: incomingUser.github || '',
      linkedin: incomingUser.linkedin || '',
      file: null,
      currentImage: incomingUser.photo || (backend_url ? `${backend_url}/public/images/default.jpg` : ''),
      education: Array.isArray(incomingUser.education) ? incomingUser.education : [],
      experience: Array.isArray(incomingUser.experience) ? incomingUser.experience : [],
      certifications: Array.isArray(incomingUser.certifications) ? incomingUser.certifications : [],
      skills: Array.isArray(incomingUser.skills) ? incomingUser.skills : [],
      skillsInput: '',
      role: incomingUser.role || '',
      website: incomingUser.website || '',
      resumeUrl: incomingUser.resumeUrl || '',
      location: incomingUser.location || '',
      isFresher: incomingUser.isFresher || !hasExperience,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingUser]);

  // cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (prevObjectUrlRef.current) {
        try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (e) { /* ignore */ }
        prevObjectUrlRef.current = null;
      }
    };
  }, []);

  // generic input handler for primitive fields
  const onChange = (e) => {
    const { name, value } = e.target;
    setEditUser((p) => ({ ...p, [name]: value }));
  };

  // image file select
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      toast.error('Only image files allowed (jpeg, png, gif, webp, svg).');
      setEditUser((p) => ({ ...p, file: null }));
      return;
    }
    if (prevObjectUrlRef.current) {
      try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
      prevObjectUrlRef.current = null;
    }
    const objUrl = URL.createObjectURL(file);
    prevObjectUrlRef.current = objUrl;
    setEditUser((p) => ({ ...p, file, currentImage: objUrl }));
  };

  // ---------- Skills helpers ----------
  const addSkillsFromInput = () => {
    const raw = editUser.skillsInput || '';
    const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length === 0) return;
    setEditUser((p) => {
      const newSkills = Array.from(new Set([...p.skills, ...parts]));
      return { ...p, skills: newSkills, skillsInput: '' };
    });
  };

  const onSkillsKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkillsFromInput();
    }
  };

  const removeSkill = (s) => {
    setEditUser((p) => ({ ...p, skills: p.skills.filter(x => x !== s) }));
  };

  // ---------- Education helpers ----------
  const addEducation = () => {
    setEditUser((p) => ({
      ...p,
      education: [...p.education, {
        type: 'college',
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
        description: ''
      }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setEditUser((p) => {
      const arr = [...p.education];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, education: arr };
    });
  };

  const removeEducation = (index) => {
    setEditUser((p) => {
      const arr = [...p.education];
      arr.splice(index, 1);
      return { ...p, education: arr };
    });
  };

  // ---------- Experience helpers ----------
  const addExperience = () => {
    setEditUser((p) => ({
      ...p,
      experience: [...p.experience, {
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
      }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setEditUser((p) => {
      const arr = [...p.experience];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, experience: arr };
    });
  };

  const removeExperience = (index) => {
    setEditUser((p) => {
      const arr = [...p.experience];
      arr.splice(index, 1);
      return { ...p, experience: arr };
    });
  };

  const toggleFresher = () => {
    setEditUser((p) => {
      const newFresherState = !p.isFresher;
      // If marking as fresher, clear all experience entries
      if (newFresherState) {
        return { ...p, isFresher: true, experience: [] };
      }
      return { ...p, isFresher: false };
    });
  };

  // ---------- Certifications helpers ----------
  const addCertification = () => {
    setEditUser((p) => ({
      ...p,
      certifications: [...p.certifications, {
        title: '',
        issuer: '',
        issueDate: '',
        credentialUrl: ''
      }]
    }));
  };

  const updateCertification = (index, field, value) => {
    setEditUser((p) => {
      const arr = [...p.certifications];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, certifications: arr };
    });
  };

  const removeCertification = (index) => {
    setEditUser((p) => {
      const arr = [...p.certifications];
      arr.splice(index, 1);
      return { ...p, certifications: arr };
    });
  };

  // ---------- Submit ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!editUser.id) {
      toast.error('User id missing.');
      return;
    }

    setSending(true);
    const data = new FormData();
    data.append('username', editUser.username);
    data.append('bio', editUser.bio || '');
    data.append('github', editUser.github || '');
    data.append('linkedin', editUser.linkedin || '');
    if (editUser.file) data.append('image', editUser.file);

    // new fields: arrays as JSON strings
    try {
      data.append('education', JSON.stringify(editUser.education || []));
      data.append('experience', JSON.stringify(editUser.experience || []));
      data.append('certifications', JSON.stringify(editUser.certifications || []));
      data.append('skills', JSON.stringify(editUser.skills || []));
    } catch (err) {
      console.warn('Error stringifying arrays', err);
    }

    // other simple fields
    data.append('role', editUser.role || '');
    data.append('website', editUser.website || '');
    data.append('resumeUrl', editUser.resumeUrl || '');
    data.append('location', editUser.location || '');
    data.append('isFresher', editUser.isFresher ? 'true' : 'false');

    try {
      const res = await fetch(`${backend_url}/updateuser/${editUser.id}`, {
        method: 'PATCH',
        headers: { Authorization: authToken || '' },
        body: data,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error('Update failed', res.status, txt);
        toast.error('Update failed. See console.');
        setSending(false);
        return;
      }

      const result = await res.json();
      toast.success('Profile updated');

      // revoke preview URL if any
      if (prevObjectUrlRef.current) {
        try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (ex) { /* ignore */ }
        prevObjectUrlRef.current = null;
      }

      setSending(false);
      try { set_run_effect && set_run_effect(!run_effect); } catch (e) { /* ignore */ }

      navigate(`/profile`);
    } catch (err) {
      console.error('Error updating profile', err);
      toast.error('Error updating profile');
      setSending(false);
    }
  };

  const onCancel = () => {
    if (prevObjectUrlRef.current) {
      try { URL.revokeObjectURL(prevObjectUrlRef.current); } catch (e) { /* ignore */ }
      prevObjectUrlRef.current = null;
    }
    navigate(-1);
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <h1 className="edit-profile-title">
          <i className="fa-solid fa-user-pen"></i> Edit Profile
        </h1>
        <p className="edit-profile-subtitle">Update your profile information and portfolio details</p>
      </div>

      <form onSubmit={onSubmit} className="edit-profile-form">
        {/* Profile Image & Username */}
        <div className="form-section profile-image-section">
          <div className="image-upload-wrapper">
            <div className="image-preview-box">
              {editUser.currentImage ? (
                <img
                  src={editUser.currentImage}
                  alt="preview"
                  onError={(e) => { e.target.onerror = null; e.target.src = `${backend_url}/public/images/default.jpg`; }}
                />
              ) : (
                <div className="image-preview-placeholder">
                  <i className="fa-solid fa-user" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                </div>
              )}
            </div>

            <div className="image-upload-controls">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input 
                  name="username" 
                  value={editUser.username} 
                  onChange={onChange} 
                  required 
                  className="form-input"
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label className="file-input-label">
                  <i className="fa-solid fa-upload"></i>
                  Upload Profile Photo
                  <input type="file" accept="image/*" onChange={onFileChange} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="fa-solid fa-circle-info"></i>
            Basic Information
          </h3>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              value={editUser.bio}
              onChange={onChange}
              rows={5}
              placeholder="Write something about yourself..."
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role / Title</label>
            <input 
              name="role" 
              value={editUser.role} 
              onChange={onChange} 
              className="form-input"
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input 
              name="location" 
              value={editUser.location} 
              onChange={onChange} 
              className="form-input"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="fa-solid fa-link"></i>
            Social Links
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <i className="fa-brands fa-github"></i> GitHub
              </label>
              <input 
                name="github" 
                value={editUser.github} 
                onChange={onChange} 
                className="form-input"
                placeholder="https://github.com/username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </label>
              <input 
                name="linkedin" 
                value={editUser.linkedin} 
                onChange={onChange} 
                className="form-input"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-globe"></i> Website
              </label>
              <input 
                name="website" 
                value={editUser.website} 
                onChange={onChange} 
                className="form-input"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fa-solid fa-file-pdf"></i> Resume URL
              </label>
              <input 
                name="resumeUrl" 
                value={editUser.resumeUrl} 
                onChange={onChange} 
                className="form-input"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="fa-solid fa-code"></i>
            Skills
          </h3>

          <div className="form-group">
            <label className="form-label">Add Skills (comma separated or press Enter)</label>
            <div className="skills-input-wrapper">
              <input
                name="skillsInput"
                value={editUser.skillsInput}
                onChange={onChange}
                onKeyDown={onSkillsKeyDown}
                placeholder="e.g. React, Node.js, MongoDB"
                className="form-input"
              />
              <button type="button" onClick={addSkillsFromInput} className="btn btn-add">
                <i className="fa-solid fa-plus"></i> Add
              </button>
            </div>

            {editUser.skills.length > 0 && (
              <div className="skills-tags">
                {editUser.skills.map((s) => (
                  <div key={s} className="skill-tag">
                    <i className="fa-solid fa-check"></i>
                    <span>{s}</span>
                    <button type="button" onClick={() => removeSkill(s)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">
              <i className="fa-solid fa-graduation-cap"></i>
              Education
            </h3>
            <button type="button" onClick={addEducation} className="btn btn-add">
              <i className="fa-solid fa-plus"></i> Add Education
            </button>
          </div>

          {editUser.education.length === 0 && (
            <div className="empty-state-text">No education entries yet. Click "Add Education" to get started.</div>
          )}

          {editUser.education.map((edu, i) => (
            <div key={i} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">Education #{i + 1}</span>
                <button type="button" onClick={() => removeEducation(i)} className="btn btn-remove">
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select value={edu.type} onChange={(e) => updateEducation(i, 'type', e.target.value)} className="form-select">
                    <option value="college">College</option>
                    <option value="school">School</option>
                    <option value="bootcamp">Bootcamp</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input 
                    placeholder="Institution name" 
                    value={edu.institution} 
                    onChange={(e) => updateEducation(i, 'institution', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Degree</label>
                  <input 
                    placeholder="e.g. Bachelor's" 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(i, 'degree', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Field of Study</label>
                  <input 
                    placeholder="e.g. Computer Science" 
                    value={edu.fieldOfStudy} 
                    onChange={(e) => updateEducation(i, 'fieldOfStudy', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input 
                    type="number"
                    placeholder="2020" 
                    value={edu.startYear || ''} 
                    onChange={(e) => updateEducation(i, 'startYear', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Year</label>
                  <input 
                    type="number"
                    placeholder="2024" 
                    value={edu.endYear || ''} 
                    onChange={(e) => updateEducation(i, 'endYear', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  placeholder="Describe your education..." 
                  value={edu.description} 
                  onChange={(e) => updateEducation(i, 'description', e.target.value)} 
                  rows={3} 
                  className="form-textarea"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">
              <i className="fa-solid fa-briefcase"></i>
              Work Experience
            </h3>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                type="button" 
                onClick={toggleFresher} 
                className={`btn ${editUser.isFresher ? 'btn-fresher-active' : 'btn-fresher'}`}
              >
                <i className="fa-solid fa-graduation-cap"></i>
                {editUser.isFresher ? 'I\'m a Fresher ✓' : 'Mark as Fresher'}
              </button>
              {!editUser.isFresher && (
                <button type="button" onClick={addExperience} className="btn btn-add">
                  <i className="fa-solid fa-plus"></i> Add Experience
                </button>
              )}
            </div>
          </div>

          {editUser.isFresher ? (
            <div className="fresher-badge">
              <i className="fa-solid fa-user-graduate"></i>
              <div>
                <h4>Fresher Profile</h4>
                <p>You're marked as a fresher with no prior work experience. Click "Mark as Fresher" again to add experience.</p>
              </div>
            </div>
          ) : editUser.experience.length === 0 ? (
            <div className="empty-state-text">No experience entries yet. Click "Add Experience" to get started or mark yourself as a fresher.</div>
          ) : null}

          {editUser.experience.map((ex, i) => (
            <div key={i} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">Experience #{i + 1}</span>
                <button type="button" onClick={() => removeExperience(i)} className="btn btn-remove">
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input 
                    placeholder="Company name" 
                    value={ex.company} 
                    onChange={(e) => updateExperience(i, 'company', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input 
                    placeholder="Your role" 
                    value={ex.role} 
                    onChange={(e) => updateExperience(i, 'role', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  placeholder="City, Country" 
                  value={ex.location} 
                  onChange={(e) => updateExperience(i, 'location', e.target.value)} 
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    value={ex.startDate ? ex.startDate.split('T')[0] : ''} 
                    onChange={(e) => updateExperience(i, 'startDate', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input 
                    type="date" 
                    value={ex.endDate ? ex.endDate.split('T')[0] : ''} 
                    onChange={(e) => updateExperience(i, 'endDate', e.target.value)} 
                    className="form-input"
                    disabled={ex.currentlyWorking}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={!!ex.currentlyWorking} 
                    onChange={(e) => updateExperience(i, 'currentlyWorking', e.target.checked)} 
                  />
                  Currently working here
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  placeholder="Describe your role and achievements..." 
                  value={ex.description} 
                  onChange={(e) => updateExperience(i, 'description', e.target.value)} 
                  rows={3} 
                  className="form-textarea"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">
              <i className="fa-solid fa-certificate"></i>
              Certifications
            </h3>
            <button type="button" onClick={addCertification} className="btn btn-add">
              <i className="fa-solid fa-plus"></i> Add Certification
            </button>
          </div>

          {editUser.certifications.length === 0 && (
            <div className="empty-state-text">No certifications yet. Click "Add Certification" to get started.</div>
          )}

          {editUser.certifications.map((c, i) => (
            <div key={i} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">Certification #{i + 1}</span>
                <button type="button" onClick={() => removeCertification(i)} className="btn btn-remove">
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input 
                    placeholder="Certification title" 
                    value={c.title} 
                    onChange={(e) => updateCertification(i, 'title', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Issuer</label>
                  <input 
                    placeholder="Issuing organization" 
                    value={c.issuer} 
                    onChange={(e) => updateCertification(i, 'issuer', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input 
                    type="date" 
                    value={c.issueDate ? c.issueDate.split('T')[0] : ''} 
                    onChange={(e) => updateCertification(i, 'issueDate', e.target.value)} 
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Credential URL</label>
                  <input 
                    placeholder="https://..." 
                    value={c.credentialUrl} 
                    onChange={(e) => updateCertification(i, 'credentialUrl', e.target.value)} 
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            <i className="fa-solid fa-xmark"></i> Cancel
          </button>
          <button type="submit" disabled={sending} className="btn btn-primary">
            <i className="fa-solid fa-floppy-disk"></i>
            {sending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
