// ProfileSkeleton.jsx
import React from 'react';

const ProfileSkeleton = ({ coverGradient }) => (
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

export default ProfileSkeleton;
