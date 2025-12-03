// User.jsx
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Follow from '../Follow/Follow';
import FollowListModal from '../FollowListModal/FollowListModal';
import Project from '../Project/Project';
import '../Profile/Profile.css';

function User() {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const { run_effect, set_run_effect, state, user, backend_url } = useContext(Context);

  const [user_, set_user_] = useState({});
  const [project_, set_project_] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [ifol, setifol] = useState(undefined);
  const [ifoli, setifoli] = useState(undefined);

  const [unset, setUnset] = useState(true);
  const [unset2, setUnset2] = useState(true);

  // modal state for follower/following list
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('followers'); // 'followers' or 'following'
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
  const [modalUsers, setModalUsers] = useState([]);

  const [button, setbutton] = useState(true);

  // If the logged-in user tries to open their own user page, redirect to /profile
  useEffect(() => {
    if (user && user._id === user_id) {
      navigate("/profile");
    }
  }, [user, user_id, navigate]);

  const find_user = async () => {
    try {
      const response = await fetch(`${backend_url}/auser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });
      const data = await response.json();
      console.log("find_user data:", data);
      if (data.user_deails) {
        set_user_(data.user_deails || {});
        set_project_(data.project_details || []);
        setFollowers(data.user_deails.followers || []);
        setFollowing(data.user_deails.following || []);
      } else {
        toast.error("user not found");
        set_user_({});
        set_project_([]);
        setFollowers([]);
        setFollowing([]);
      }
    } catch (error) {
      console.error("find_user error:", error);
      set_user_({});
      set_project_([]);
      setFollowers([]);
      setFollowing([]);
    }
  };

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

  useEffect(() => {
    find_user();
    check();
    // re-run when run_effect flips or local toggles change
  }, [user, run_effect, unset, unset2, ifoli, ifol]);

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

  // helpers to open the follow list modal
  const openFollowersModal = (which = 'followers') => {
    const list = which === 'followers' ? (followers || []) : (following || []);
    setModalUsers(list);
    setModalMode(which);
    setModalOpen(true);
  };

  // small helper toggles you had
  function my_fun() {
    setUnset(!unset);
  }
  function my_fun_2() {
    setUnset2(!unset2);
    set_run_effect && set_run_effect(!run_effect);
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/user/${user_id}`;
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

  // Render
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
                src={user_.photo || `${backend_url}/public/images/${user_.photo}`}
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

        {/* Profile Info Section */}
        <div className='profile-content'>
          <div className='profile-info'>
            <h1 className='profile-username'>
              {user_.username || 'Loading...'}
            </h1>
            
            {user_.bio && (
              <p className='profile-bio'>{user_.bio}</p>
            )}

            {/* Stats Cards */}
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

          {/* Projects Section */}
          <div className='profile-projects'>
            <h2 className='section-title'>{user_.username}'s Projects</h2>
            <Project
              projects={project_}
              backendUrl={backend_url}
              authToken={state}
              canEdit={false}
              onUpdate={() => { }}
              onDelete={() => { }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;