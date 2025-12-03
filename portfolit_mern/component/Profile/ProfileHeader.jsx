// ProfileHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileHeader = ({ user, coverGradient }) => {
  const navigate = useNavigate();

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

  return (
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
  );
};

export default ProfileHeader;
