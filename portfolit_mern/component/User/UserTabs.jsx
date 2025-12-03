// UserTabs.jsx
import React from 'react';
import Project from '../Project/Project';

const UserTabs = ({ activeTab, setActiveTab, user_, project_, backend_url, state }) => {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: 'fa-folder-open', count: project_?.length },
    { id: 'education', label: 'Education', icon: 'fa-graduation-cap', count: user_?.education?.length },
    { id: 'experience', label: 'Experience', icon: 'fa-briefcase', count: user_?.experience?.length || (user_?.isFresher ? 1 : 0) },
    { id: 'skills', label: 'Skills', icon: 'fa-code', count: user_?.skills?.length },
    { id: 'certifications', label: 'Certifications', icon: 'fa-certificate', count: user_?.certifications?.length },
  ];

  return (
    <div className='profile-portfolio'>
      <div className='portfolio-tabs'>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            {tab.label}
            {tab.count > 0 && <span className='tab-badge'>{tab.count}</span>}
          </button>
        ))}
      </div>

      <div className='portfolio-content'>
        {activeTab === 'projects' && (
          <ProjectsTab project_={project_} backend_url={backend_url} state={state} />
        )}
        {activeTab === 'education' && (
          <EducationTab education={user_?.education} />
        )}
        {activeTab === 'experience' && (
          <ExperienceTab experience={user_?.experience} isFresher={user_?.isFresher} />
        )}
        {activeTab === 'skills' && (
          <SkillsTab skills={user_?.skills} />
        )}
        {activeTab === 'certifications' && (
          <CertificationsTab certifications={user_?.certifications} />
        )}
      </div>
    </div>
  );
};

// Projects Tab
const ProjectsTab = ({ project_, backend_url, state }) => (
  <div className='tab-content'>
    {project_?.length > 0 ? (
      <Project
        projects={project_}
        backendUrl={backend_url}
        authToken={state}
        canEdit={false}
        onUpdate={() => { }}
        onDelete={() => { }}
      />
    ) : (
      <EmptyState 
        icon="fa-folder-open"
        title="No Projects Yet"
        description="This user hasn't uploaded any projects yet"
      />
    )}
  </div>
);

// Education Tab
const EducationTab = ({ education }) => (
  <div className='tab-content'>
    {education?.length > 0 ? (
      <div className='education-list'>
        {education.map((edu, index) => (
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
      <EmptyState 
        icon="fa-graduation-cap"
        title="No Education Added"
        description="This user hasn't added their educational background yet"
      />
    )}
  </div>
);

// Experience Tab
const ExperienceTab = ({ experience, isFresher }) => (
  <div className='tab-content'>
    {isFresher === true ? (
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
    ) : experience?.length > 0 ? (
      <div className='experience-list'>
        {experience.map((exp, index) => (
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
      <EmptyState 
        icon="fa-briefcase"
        title="No Experience Added"
        description="This user hasn't added their work experience yet"
      />
    )}
  </div>
);

// Skills Tab
const SkillsTab = ({ skills }) => (
  <div className='tab-content'>
    {skills?.length > 0 ? (
      <div className='skills-grid'>
        {skills.map((skill, index) => (
          <div key={index} className='skill-tag'>
            <i className="fa-solid fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    ) : (
      <EmptyState 
        icon="fa-code"
        title="No Skills Added"
        description="This user hasn't listed their skills yet"
      />
    )}
  </div>
);

// Certifications Tab
const CertificationsTab = ({ certifications }) => (
  <div className='tab-content'>
    {certifications?.length > 0 ? (
      <div className='certifications-list'>
        {certifications.map((cert, index) => (
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
      <EmptyState 
        icon="fa-certificate"
        title="No Certifications Added"
        description="This user hasn't added any certifications yet"
      />
    )}
  </div>
);

// Empty State Component
const EmptyState = ({ icon, title, description }) => (
  <div className='empty-state'>
    <i className={`fa-solid ${icon}`}></i>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default UserTabs;
