// UserStats.jsx
import React from 'react';

const UserStats = ({ project_, followers, following, onFollowersClick, onFollowingClick }) => {
  return (
    <div className='profile-stats-cards'>
      <div className='stat-card stat-card-projects'>
        <div className='stat-card-icon'>
          <i className="fa-solid fa-folder-open"></i>
        </div>
        <div className='stat-card-content'>
          <span className='stat-card-value'>{project_?.length || 0}</span>
          <span className='stat-card-label'>Projects</span>
        </div>
      </div>
      
      <div className='stat-card stat-card-followers' onClick={() => onFollowersClick('followers')}>
        <div className='stat-card-icon'>
          <i className="fa-solid fa-users"></i>
        </div>
        <div className='stat-card-content'>
          <span className='stat-card-value'>{followers?.length || 0}</span>
          <span className='stat-card-label'>Followers</span>
        </div>
      </div>
      
      <div className='stat-card stat-card-following' onClick={() => onFollowingClick('following')}>
        <div className='stat-card-icon'>
          <i className="fa-solid fa-user-plus"></i>
        </div>
        <div className='stat-card-content'>
          <span className='stat-card-value'>{following?.length || 0}</span>
          <span className='stat-card-label'>Following</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
