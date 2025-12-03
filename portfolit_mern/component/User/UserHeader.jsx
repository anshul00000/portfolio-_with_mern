// UserHeader.jsx
import React from 'react';
import { toast } from 'react-toastify';
import Follow from '../Follow/Follow';

const UserHeader = ({ user_, coverGradient, ifol, ifoli, my_fun, check }) => {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/user/${user_._id}`;
    if (navigator.share) {
      navigator.share({ 
        title: 'Check this out!', 
        text: `Check out ${user_.username}'s profile!`, 
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
            src={user_.photo || `${user_.photo}`}
            alt={user_.username || 'User'} 
            className='profile-avatar'
            onError={(e) => { e.target.src = 'default.jpg'; }} 
          />
        </div>

        <div className='profile-actions'>
          {/* Follow button logic */}
          <div className='follow-button-wrapper' onClick={my_fun}>
            {(ifol && ifoli) ? (
              <Follow my_id={user_._id} back={false} un_follow={true} />
            ) : ifol ? (
              <Follow my_id={user_._id} back={true} un_follow={false} />
            ) : ifoli ? (
              <Follow my_id={user_._id} back={false} un_follow={true} />
            ) : (
              <Follow my_id={user_._id} back={false} un_follow={false} />
            )}
          </div>
          
          <button className='btn-secondary' onClick={handleShare}>
            <i className="fa-solid fa-share-nodes"></i> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
