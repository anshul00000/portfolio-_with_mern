// User.jsx - Simplified Main Component
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import FollowListModal from '../FollowListModal/FollowListModal';
import Follow from '../Follow/Follow';

// Import sub-components
import UserSkeleton from './UserSkeleton';
import UserHeader from './UserHeader';
import UserStats from './UserStats';
import UserTabs from './UserTabs';

// Import helpers
import { getRandomCoverPattern } from '../Profile/utils/profileHelpers';

// Import styles
import '../Profile/Profile.css';

function User() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { run_effect, set_run_effect, state, user, backend_url } = useContext(Context);

  // State management
  const [user_, set_user_] = useState({});
  const [project_, set_project_] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [ifol, setifol] = useState(undefined);
  const [ifoli, setifoli] = useState(undefined);
  const [unset, setUnset] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('followers');
  const [modalUsers, setModalUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [coverGradient, setCoverGradient] = useState('');
  const [loading, setLoading] = useState(true);

  // Generate random cover pattern on mount
  useEffect(() => {
    setCoverGradient(getRandomCoverPattern());
  }, []);

  // Redirect if viewing own profile
  useEffect(() => {
    if (user && user._id === user_id) {
      navigate("/profile");
    }
  }, [user, user_id, navigate]);

  // Fetch user data
  const find_user = async () => {
    try {
      const response = await fetch(`${backend_url}/auser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const data = await response.json();
      
      if (data.user_deails) {
        set_user_(data.user_deails || {});
        set_project_(data.project_details || []);
        setFollowers(data.user_deails.followers || []);
        setFollowing(data.user_deails.following || []);
      } else {
        toast.error("User not found");
        set_user_({});
        set_project_([]);
        setFollowers([]);
        setFollowing([]);
      }
    } catch (error) {
      console.error("find_user error:", error);
      toast.error("Error loading user");
      set_user_({});
      set_project_([]);
      setFollowers([]);
      setFollowing([]);
    } finally {
      setLoading(false);
    }
  };

  // Check follow status
  const check = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${backend_url}/checkfollow`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      const data = await response.json();

      if (data.isFollower || data.isFollowing) {
        setifol(data.isFollower);
        setifoli(data.isFollowing);
      } else {
        setifol(undefined);
        setifoli(undefined);
      }
    } catch (error) {
      console.error("check error:", error);
    }
  };

  // Load user data and check follow status
  useEffect(() => {
    find_user();
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, run_effect, unset, ifoli, ifol]);

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

  // Helper functions
  const my_fun = () => {
    setUnset(!unset);
  };

  const openFollowersModal = (which = 'followers') => {
    const list = which === 'followers' ? (followers || []) : (following || []);
    setModalUsers(list);
    setModalMode(which);
    setModalOpen(true);
  };

  // Show skeleton loader while loading
  if (loading) {
    return <UserSkeleton coverGradient={coverGradient} />;
  }

  // Show error if user not found
  if (!user_._id) {
    return (
      <div className='profile-container'>
        <div className='empty-state' style={{ padding: '4rem 2rem' }}>
          <i className="fa-solid fa-user-slash" style={{ fontSize: '4rem', color: '#e5e5e5' }}></i>
          <h3>User Not Found</h3>
          <p>The user you're looking for doesn't exist or has been removed.</p>
          <button className='btn-primary' onClick={() => navigate('/')}>
            <i className="fa-solid fa-home"></i> Go Home
          </button>
        </div>
      </div>
    );
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
        <UserHeader 
          user_={user_} 
          coverGradient={coverGradient}
          ifol={ifol}
          ifoli={ifoli}
          my_fun={my_fun}
          check={check}
        />

        <div className='profile-content'>
          <div className='profile-info'>
            <h1 className='profile-username'>{user_.username || 'Loading...'}</h1>
            
            {user_.bio && <p className='profile-bio'>{user_.bio}</p>}

            <UserStats 
              project_={project_}
              followers={followers}
              following={following}
              onFollowersClick={openFollowersModal}
              onFollowingClick={openFollowersModal}
            />

            <div className='profile-social'>
              {user_.github && (
                <a href={user_.github} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-github"></i>
                </a>
              )}
              {user_.linkedin && (
                <a href={user_.linkedin} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              )}
              {user_.email && (
                <a href={`mailto:${user_.email}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-brands fa-google-plus-g"></i>
                </a>
              )}
              {user_.phone && (
                <a href={`tel:${user_.phone}`} target="_blank" rel="noreferrer" className='social-link'>
                  <i className="fa-solid fa-phone"></i>
                </a>
              )}
            </div>
          </div>

          <UserTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user_={user_}
            project_={project_}
            backend_url={backend_url}
            state={state}
          />
        </div>
      </div>
    </>
  );
}

export default User;
