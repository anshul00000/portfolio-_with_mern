// Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import Project from '../Project/Project';
import Follow from '../Follow/Follow';
import FollowListModal from '../FollowListModal/FollowListModal';
import './Profile.css';

function Profile() {
  const { user, backend_url, project, run_effect, set_run_effect, allproject } = useContext(Context);
  const navigate = useNavigate();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('followers');
  const [modalUsers, setModalUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showCompletionDetails, setShowCompletionDetails] = useState(false);
  const [coverGradient, setCoverGradient] = useState('');

  // Generate random pattern/texture cover image on mount
  useEffect(() => {
    // Array of pattern and texture images from Unsplash
    const patterns = [
      'photo-1618005182384-a83a8bd57fbe', // Geometric pattern
      'photo-1557672172-298e090bd0f1', // Gradient mesh
      'photo-1618005198919-d3d4b5a92ead', // Abstract pattern
      'photo-1557682250-33bd709cbe85', // Wavy pattern
      'photo-1579546929518-9e396f3cc809', // Gradient texture
      'photo-1557683316-973673baf926', // Smooth gradient
      'photo-1618556450994-a6a128ef0d9d', // Geometric shapes
      'photo-1634017839464-5c339ebe3cb4', // Minimal texture
      'photo-1635322966219-b75ed372eb01', // Abstract waves
      'photo-1620121692029-d088224ddc74', // Soft pattern
      'photo-1618556450991-2f1af64e8191', // Mesh gradient
      'photo-1634017839464-5c339ebe3cb4', // Minimal geometric
    ];
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const imageUrl = `url(https://images.unsplash.com/${randomPattern}?w=1200&h=300&fit=crop&q=80)`;
    setCoverGradient(imageUrl);
  }, []);

  useEffect(() => {
    if (user == undefined) {
      navigate('/login');
    } else {
      setFollowers(user.followers || []);
      setFollowing(user.following || []);
    }
  }, [user, navigate]);

  useEffect(() => {
    set_run_effect && set_run_effect(!run_effect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add scroll effect for nav blur
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (allproject.length > 0 && !user) {
    return <h1 style={{ textAlign: "center" }}>Please log in to access your profile</h1>;
  }

  const openFollowersModal = (which = 'followers') => {
    const list = which === 'followers' ? (followers || []) : (following || []);
    setModalUsers(list);
    setModalMode(which);
    setModalOpen(true);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/user/${user._id}`;
    if (navigator.share) {
      navigator.share({ 
        title: 'Check this out!', 
        text: 'Take a look at this profile!', 
        url: shareUrl 
      }).catch(() => { });
    } else {
      navigator.clipboard?.writeText(shareUrl);
      toast.info('Profile URL copied to clipboard');
    }
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!user) return { percentage: 0, completed: 0, total: 0, missing: [] };

    let completed = 0;
    let total = 0;
    const missing = [];

    // Basic Info (weight: 6 fields)
    const basicFields = [
      { name: 'Username', field: user.username && user.username.trim() !== '', weight: 1, icon: 'fa-user' },
      { name: 'Email', field: user.email && user.email.trim() !== '', weight: 1, icon: 'fa-envelope' },
      { name: 'Phone', field: user.phone, weight: 1, icon: 'fa-phone' },
      { name: 'Profile Photo', field: user.photo && user.photo !== 'default.jpg' && user.photo.trim() !== '', weight: 1, icon: 'fa-image' },
      { name: 'Bio', field: user.bio && user.bio.trim() !== '' && user.bio !== "React developer ^_^", weight: 1, icon: 'fa-align-left' },
      { name: 'Role/Title', field: user.role && user.role.trim() !== '', weight: 1, icon: 'fa-briefcase' }
    ];

    basicFields.forEach(item => {
      total += item.weight;
      if (item.field) {
        completed += item.weight;
      } else {
        missing.push({ name: item.name, category: 'Basic Info', icon: item.icon });
      }
    });

    // Social Links (weight: 4 fields)
    const socialFields = [
      { 
        name: 'GitHub Profile', 
        field: user.github && user.github.trim() !== '', 
        weight: 1, 
        icon: 'fa-brands fa-github' 
      },
      { 
        name: 'LinkedIn Profile', 
        field: user.linkedin && user.linkedin.trim() !== '', 
        weight: 1, 
        icon: 'fa-brands fa-linkedin' 
      },
      { 
        name: 'Website', 
        field: user.website && user.website.trim() !== '', 
        weight: 1, 
        icon: 'fa-globe' 
      },
      { 
        name: 'Location', 
        field: user.location && user.location.trim() !== '', 
        weight: 1, 
        icon: 'fa-location-dot' 
      }
    ];

    socialFields.forEach(item => {
      total += item.weight;
      if (item.field) {
        completed += item.weight;
      } else {
        missing.push({ name: item.name, category: 'Social Links', icon: item.icon });
      }
    });

    // Education (weight: 2)
    total += 2;
    if (user.education && user.education.length > 0) {
      completed += 2;
    } else {
      missing.push({ name: 'Education', category: 'Portfolio', icon: 'fa-graduation-cap' });
    }

    // Experience (weight: 2) - Consider fresher status
    total += 2;
    if (user.isFresher === true) {
      // If marked as fresher, consider it complete
      completed += 2;
    } else if (user.experience && user.experience.length > 0) {
      completed += 2;
    } else {
      missing.push({ name: 'Work Experience (or mark as Fresher)', category: 'Portfolio', icon: 'fa-briefcase' });
    }

    // Skills (weight: 2)
    total += 2;
    if (user.skills && user.skills.length > 0) {
      completed += 2;
    } else {
      missing.push({ name: 'Skills', category: 'Portfolio', icon: 'fa-code' });
    }

    // Certifications (weight: 1)
    total += 1;
    if (user.certifications && user.certifications.length > 0) {
      completed += 1;
    } else {
      missing.push({ name: 'Certifications', category: 'Portfolio', icon: 'fa-certificate' });
    }

    // Resume (weight: 1)
    total += 1;
    if (user.resumeUrl) {
      completed += 1;
    } else {
      missing.push({ name: 'Resume/CV', category: 'Documents', icon: 'fa-file-pdf' });
    }

    // Projects (weight: 2)
    total += 2;
    if (project && project.length > 0) {
      completed += 2;
    } else {
      missing.push({ name: 'Projects', category: 'Portfolio', icon: 'fa-folder-open' });
    }

    const percentage = Math.round((completed / total) * 100);
    return { percentage, completed, total, missing };
  };

  const profileCompletion = calculateProfileCompletion();

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return '#4ade80'; // green
    if (percentage >= 50) return '#fbbf24'; // yellow
    return '#f87171'; // red
  };

  const getCompletionMessage = (percentage) => {
    if (percentage === 100) return 'Perfect! Your profile is complete 🎉';
    if (percentage >= 80) return 'Almost there! Just a few more details';
    if (percentage >= 50) return 'Good progress! Keep going';
    return 'Let\'s complete your profile';
  };

  // Skeleton Loader Component
  const ProfileSkeleton = () => (
    <div className='profile-container'>
      <div className='profile-hero'>
        <div className='profile-cover skeleton-shimmer' style={{ 
          background: coverGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
        
        <div className='profile-header'>
          <div className='profile-avatar-wrapper'>
            <div className='profile-avatar skeleton-shimmer'></div>
          </div>
          <div className='profile-actions'>
            <div className='skeleton-button skeleton-shimmer'></div>
            <div className='skeleton-button skeleton-shimmer'></div>
          </div>
        </div>
      </div>

      <div className='profile-content'>
        <div className='profile-info'>
          <div className='skeleton-title skeleton-shimmer'></div>
          <div className='skeleton-text skeleton-shimmer'></div>
          <div className='skeleton-text skeleton-shimmer' style={{ width: '60%' }}></div>
          
          <div className='profile-stats-cards'>
            <div className='stat-card'>
              <div className='skeleton-circle skeleton-shimmer'></div>
              <div className='skeleton-stat skeleton-shimmer'></div>
            </div>
            <div className='stat-card'>
              <div className='skeleton-circle skeleton-shimmer'></div>
              <div className='skeleton-stat skeleton-shimmer'></div>
            </div>
            <div className='stat-card'>
              <div className='skeleton-circle skeleton-shimmer'></div>
              <div className='skeleton-stat skeleton-shimmer'></div>
            </div>
          </div>

          <div className='profile-social'>
            <div className='skeleton-social skeleton-shimmer'></div>
            <div className='skeleton-social skeleton-shimmer'></div>
            <div className='skeleton-social skeleton-shimmer'></div>
            <div className='skeleton-social skeleton-shimmer'></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <FollowListModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        users={modalUsers}
        backendUrl={backend_url}
        currentUserId={user?._id}
        FollowComponent={Follow}
      />

      <div className='profile-container'>
        {/* Hero Section with Cover */}
        <div className='profile-hero'>
          <div className='profile-cover' style={{ 
            background: coverGradient,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}></div>
          
          <div className='profile-header'>
            <div className='profile-avatar-wrapper'>
              <img 
                src={user.photo} 
                alt={user.username} 
                className='profile-avatar'
                onError={(e) => { e.target.src = 'default.jpg'; }} 
              />
            </div>

            <div className='profile-actions'>
              <button className='btn-edit' onClick={() => navigate('/edit-profile', { state: { user } })}>
                <i className="fa-solid fa-pen-to-square"></i> Edit Profile
              </button>
              <button className='btn-secondary' onClick={handleShare}>
                <i className="fa-solid fa-share-nodes"></i> Share
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className='profile-content'>
          <div className='profile-info'>
            <h1 className='profile-username'>
              {user ? user.username : 'Loading...'}
            </h1>
            
            {user?.bio && (
              <p className='profile-bio'>{user.bio}</p>
            )}

            {/* Profile Completion */}
            {user && profileCompletion.percentage < 100 && (
              <div className='profile-completion-card'>
                <div className='completion-header'>
                  <div className='completion-info'>
                    <h3 className='completion-title'>Profile Completion</h3>
                    <p className='completion-message'>{getCompletionMessage(profileCompletion.percentage)}</p>
                  </div>
                  <div className='completion-percentage' style={{ color: getCompletionColor(profileCompletion.percentage) }}>
                    {profileCompletion.percentage}%
                  </div>
                </div>
                <div className='completion-bar-container'>
                  <div 
                    className='completion-bar-fill' 
                    style={{ 
                      width: `${profileCompletion.percentage}%`,
                      background: getCompletionColor(profileCompletion.percentage)
                    }}
                  ></div>
                </div>

                {/* Missing Fields Details */}
                {showCompletionDetails && profileCompletion.missing.length > 0 && (
                  <div className='completion-details'>
                    <h4 className='details-title'>
                      <i className="fa-solid fa-list-check"></i>
                      Missing Fields ({profileCompletion.missing.length})
                    </h4>
                    <div className='missing-fields-grid'>
                      {profileCompletion.missing.map((item, index) => (
                        <div key={index} className='missing-field-item'>
                          <i className={`fa-solid ${item.icon}`}></i>
                          <div className='missing-field-info'>
                            <span className='field-name'>{item.name}</span>
                            <span className='field-category'>{item.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className='completion-actions'>
                  <button 
                    className='btn-show-details' 
                    onClick={() => setShowCompletionDetails(!showCompletionDetails)}
                  >
                    <i className={`fa-solid ${showCompletionDetails ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    {showCompletionDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                  <button className='btn-complete-profile' onClick={() => navigate('/edit-profile', { state: { user } })}>
                    <i className="fa-solid fa-circle-plus"></i> Complete Profile
                  </button>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className='profile-stats-cards'>
              <div className='stat-card stat-card-projects'>
                <div className='stat-card-icon'>
                  <i className="fa-solid fa-folder-open"></i>
                </div>
                <div className='stat-card-content'>
                  <span className='stat-card-value'>{project?.length || 0}</span>
                  <span className='stat-card-label'>Projects</span>
                </div>
              </div>
              
              <div className='stat-card stat-card-followers' onClick={() => openFollowersModal('followers')}>
                <div className='stat-card-icon'>
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className='stat-card-content'>
                  <span className='stat-card-value'>{followers?.length || 0}</span>
                  <span className='stat-card-label'>Followers</span>
                </div>
              </div>
              
              <div className='stat-card stat-card-following' onClick={() => openFollowersModal('following')}>
                <div className='stat-card-icon'>
                  <i className="fa-solid fa-user-plus"></i>
                </div>
                <div className='stat-card-content'>
                  <span className='stat-card-value'>{following?.length || 0}</span>
                  <span className='stat-card-label'>Following</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='profile-social'>
              {user?.github && (
                <a href={user.github} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-github"></i>
                </a>
              )}
              {user?.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              )}
              {user?.email && (
                <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
              )}
              {user?.phone && (
                <a href={`tel:${user.phone}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-solid fa-phone"></i>
                </a>
              )}
            </div>

            {/* Upload Project Button */}
            <NavLink className="btn-primary btn-upload" to="/pu">
              <i className="fa-solid fa-upload"></i> Upload New Project
            </NavLink>
          </div>

          {/* Tabbed Portfolio Section */}
          <div className='profile-portfolio'>
            <div className='portfolio-tabs'>
              <button 
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <i className="fa-solid fa-folder-open"></i>
                Projects
                {project?.length > 0 && <span className='tab-badge'>{project.length}</span>}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fa-solid fa-graduation-cap"></i>
                Education
                {user?.education?.length > 0 && <span className='tab-badge'>{user.education.length}</span>}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className="fa-solid fa-briefcase"></i>
                Experience
                {user?.experience?.length > 0 && <span className='tab-badge'>{user.experience.length}</span>}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="fa-solid fa-code"></i>
                Skills
                {user?.skills?.length > 0 && <span className='tab-badge'>{user.skills.length}</span>}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('certifications')}
              >
                <i className="fa-solid fa-certificate"></i>
                Certifications
                {user?.certifications?.length > 0 && <span className='tab-badge'>{user.certifications.length}</span>}
              </button>
            </div>

            <div className='portfolio-content'>
              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className='tab-content'>
                  {project?.length > 0 ? (
                    <Project
                      canEdit={true}
                      onUpdate={() => set_run_effect && set_run_effect(!run_effect)}
                      onDelete={() => set_run_effect && set_run_effect(!run_effect)}
                    />
                  ) : (
                    <div className='empty-state'>
                      <i className="fa-solid fa-folder-open"></i>
                      <h3>No Projects Yet</h3>
                      <p>Start showcasing your work by uploading your first project</p>
                      <NavLink className="btn-primary" to="/pu">
                        <i className="fa-solid fa-upload"></i> Upload Project
                      </NavLink>
                    </div>
                  )}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className='tab-content'>
                  {user?.education?.length > 0 ? (
                    <div className='education-list'>
                      {user.education.map((edu, index) => (
                        <div key={edu._id || index} className='education-card'>
                          <div className='education-icon'>
                            <i className="fa-solid fa-graduation-cap"></i>
                          </div>
                          <div className='education-details'>
                            <h3>{edu.degree || 'Degree'}</h3>
                            <h4>{edu.institution}</h4>
                            {edu.fieldOfStudy && <p className='field'>{edu.fieldOfStudy}</p>}
                            <p className='duration'>
                              {edu.startYear} - {edu.endYear || 'Present'}
                            </p>
                            {edu.description && <p className='description'>{edu.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='empty-state'>
                      <i className="fa-solid fa-graduation-cap"></i>
                      <h3>No Education Added</h3>
                      <p>Add your educational background to complete your profile</p>
                      <button className='btn-primary' onClick={() => navigate('/edit-profile', { state: { user } })}>
                        <i className="fa-solid fa-plus"></i> Add Education
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className='tab-content'>
                  {user?.isFresher === true ? (
                    <div className='fresher-display-badge'>
                      <div className='fresher-icon'>
                        <i className="fa-solid fa-user-graduate"></i>
                      </div>
                      <div className='fresher-content'>
                        <h3>Fresher Profile</h3>
                        <p>This user is a fresher with no prior work experience. They're ready to start their professional journey!</p>
                        <div className='fresher-tags'>
                          <span className='fresher-tag'>
                            <i className="fa-solid fa-graduation-cap"></i> Fresh Graduate
                          </span>
                          <span className='fresher-tag'>
                            <i className="fa-solid fa-rocket"></i> Ready to Learn
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : user?.experience?.length > 0 ? (
                    <div className='experience-list'>
                      {user.experience.map((exp, index) => (
                        <div key={exp._id || index} className='experience-card'>
                          <div className='experience-icon'>
                            <i className="fa-solid fa-briefcase"></i>
                          </div>
                          <div className='experience-details'>
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                            {exp.location && <p className='location'><i className="fa-solid fa-location-dot"></i> {exp.location}</p>}
                            <p className='duration'>
                              {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                              {exp.currentlyWorking ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                            </p>
                            {exp.description && <p className='description'>{exp.description}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='empty-state'>
                      <i className="fa-solid fa-briefcase"></i>
                      <h3>No Experience Added</h3>
                      <p>Add your work experience or mark yourself as a fresher in the edit profile section</p>
                      <button className='btn-primary' onClick={() => navigate('/edit-profile', { state: { user } })}>
                        <i className="fa-solid fa-plus"></i> Add Experience or Mark as Fresher
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className='tab-content'>
                  {user?.skills?.length > 0 ? (
                    <div className='skills-grid'>
                      {user.skills.map((skill, index) => (
                        <div key={index} className='skill-tag'>
                          <i className="fa-solid fa-check"></i>
                          {skill}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='empty-state'>
                      <i className="fa-solid fa-code"></i>
                      <h3>No Skills Added</h3>
                      <p>List your technical and professional skills</p>
                      <button className='btn-primary' onClick={() => navigate('/edit-profile', { state: { user } })}>
                        <i className="fa-solid fa-plus"></i> Add Skills
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <div className='tab-content'>
                  {user?.certifications?.length > 0 ? (
                    <div className='certifications-list'>
                      {user.certifications.map((cert, index) => (
                        <div key={cert._id || index} className='certification-card'>
                          <div className='certification-icon'>
                            <i className="fa-solid fa-certificate"></i>
                          </div>
                          <div className='certification-details'>
                            <h3>{cert.title}</h3>
                            <h4>{cert.issuer}</h4>
                            <p className='issue-date'>
                              Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                            {cert.credentialUrl && (
                              <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className='credential-link'>
                                <i className="fa-solid fa-link"></i> View Credential
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='empty-state'>
                      <i className="fa-solid fa-certificate"></i>
                      <h3>No Certifications Added</h3>
                      <p>Add your professional certifications and achievements</p>
                      <button className='btn-primary' onClick={() => navigate('/edit-profile', { state: { user } })}>
                        <i className="fa-solid fa-plus"></i> Add Certification
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
