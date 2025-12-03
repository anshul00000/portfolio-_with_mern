// ProfileCompletion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateProfileCompletion, getCompletionColor, getCompletionMessage } from './utils/profileHelpers';

const ProfileCompletion = ({ user, project, showDetails, setShowDetails }) => {
  const navigate = useNavigate();
  const profileCompletion = calculateProfileCompletion(user, project);

  if (profileCompletion.percentage >= 100) return null;

  return (
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

      {showDetails && profileCompletion.missing.length > 0 && (
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
          onClick={() => setShowDetails(!showDetails)}
        >
          <i className={`fa-solid ${showDetails ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        <button className='btn-complete-profile' onClick={() => navigate('/edit-profile', { state: { user } })}>
          <i className="fa-solid fa-circle-plus"></i> Complete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletion;
