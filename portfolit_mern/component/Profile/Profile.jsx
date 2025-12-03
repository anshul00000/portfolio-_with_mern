// Profile.jsx - Simplified Main Component
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { NavLink, useNavigate } from "react-router-dom";
import FollowListModal from '../FollowListModal/FollowListModal';
import Follow from '../Follow/Follow';

// Import sub-components
import ProfileSkeleton from './ProfileSkeleton';
import ProfileHeader from './ProfileHeader';
import ProfileCompletion from './ProfileCompletion';
import ProfileStats from './ProfileStats';
import ProfileTabs from './ProfileTabs';

// Import helpers
import { getRandomCoverPattern } from './utils/profileHelpers';

// Import styles
import './Profile.css';

function Profile() {
  const { user, backend_url, project, run_effect, set_run_effect, allproject } = useContext(Context);
  const navigate = useNavigate();

  // State management
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('followers');
  const [modalUsers, setModalUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showCompletionDetails, setShowCompletionDetails] = useState(false);
  const [coverGradient, setCoverGradient] = useState('');

  // Generate random cover pattern on mount
  useEffect(() => {
    setCoverGradient(getRandomCoverPattern());
  }, []);

  // Handle user authentication
  useEffect(() => {
    if (user == undefined) {
      navigate('/login');
    } else {
      setFollowers(user.followers || []);
      setFollowing(user.following || []);
    }
  }, [user, navigate]);

  // Trigger effect
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

  // Check for login requirement
  if (allproject.length > 0 && !user) {
    return <h1 style={{ textAlign: "center" }}>Please log in to access your profile</h1>;
  }

  // Show skeleton loader while loading
  if (!user) {
    return <ProfileSkeleton coverGradient={coverGradient} />;
  }

  // Handle followers/following modal
  const openFollowersModal = (which = 'followers') => {
    const list = which === 'followers' ? (followers || []) : (following || []);
    setModalUsers(list);
    setModalMode(which);
    setModalOpen(true);
  };

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
        <ProfileHeader user={user} coverGradient={coverGradient} />

        <div className='profile-content'>
          <div className='profile-info'>
            <h1 className='profile-username'>{user.username}</h1>
            
            {user.bio && <p className='profile-bio'>{user.bio}</p>}

            <ProfileCompletion 
              user={user} 
              project={project}
              showDetails={showCompletionDetails}
              setShowDetails={setShowCompletionDetails}
            />

            <ProfileStats 
              project={project}
              followers={followers}
              following={following}
              onFollowersClick={openFollowersModal}
              onFollowingClick={openFollowersModal}
            />

            <div className='profile-social'>
              {user.github && (
                <a href={user.github} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-github"></i>
                </a>
              )}
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              )}
              {user.email && (
                <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
              )}
              {user.phone && (
                <a href={`tel:${user.phone}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-solid fa-phone"></i>
                </a>
              )}
            </div>

            <NavLink className="btn-primary btn-upload" to="/pu">
              <i className="fa-solid fa-upload"></i> Upload New Project
            </NavLink>
          </div>

          <ProfileTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            project={project}
            run_effect={run_effect}
            set_run_effect={set_run_effect}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
