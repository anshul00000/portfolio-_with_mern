// Allproject.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../public/context/context_api";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Follow from "../Follow/Follow";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import './Allproject.css'
function Allproject() {
  const [effect_, run_effect] = useState(true);
  const [followStatus, setFollowStatus] = useState({});
  const { user, state, backend_url, allproject } = useContext(Context);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const status = {};
      if (!allproject || allproject.length === 0) {
        setFollowStatus({});
        return;
      }
      for (let project of allproject) {
        const userId = project.owner._id;
        if (user) {
          try {
            const response = await fetch(`${backend_url}/checkfollow`, {
              method: "POST",
              headers: {
                Authorization: state,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            });
            const data = await response.json();
            status[userId] = {
              isFollower: !!data.isFollower,
              isFollowing: !!data.isFollowing,
            };
          } catch (err) {
            console.error("checkfollow error", err);
          }
        }
      }
      setFollowStatus(status);
    };

    fetchFollowStatus();
  }, [allproject, user, backend_url, state, effect_]);

  const triggerRefresh = () => run_effect(!effect_);

  const renderFollowControl = (ownerId) => {
    if (!user)
      return (
        <NavLink to="/login" className="btn btn-ghost small">
          Login
        </NavLink>
      );
    if (user._id === ownerId) return <span className="owner-label">You</span>;
    const s = followStatus[ownerId];
    if (!s) return <button className="btn btn-ghost small">Loading...</button>;
    if (s.isFollower && s.isFollowing)
      return <button className="btn btn-following small">Following ✔</button>;
    if (s.isFollower)
      return (
        <span onClick={triggerRefresh}>
          <Follow my_id={ownerId} back={true} un_follow={false} />
        </span>
      );
    if (s.isFollowing)
      return (
        <span onClick={triggerRefresh}>
          <Follow my_id={ownerId} back={false} un_follow={true} />
        </span>
      );
    return (
      <span onClick={triggerRefresh}>
        <Follow my_id={ownerId} />
      </span>
    );
  };

  const loading = !allproject || allproject.length === 0;

  return (
    <>

      <div className="all_project_container">
        <h1 className="all_project_h1">Projects</h1>

        {loading  ? (
          <div className="projects_grid" role="status">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="projects_grid">
            {allproject.map((project) => (
              <article
                key={project._id}
                className="project_card"
                data-aos="fade-up"
              >
                <div className="owner_bar">
                 <NavLink
                        to={`/user/${encodeURIComponent(project.owner._id)}`}
                        className="btn btn-ghost small"
                  >
                  <div className="avatar">
                    <img
                      src={
                        project.owner.photo ||
                        `${backend_url}/public/images/default.jpg`
                      }
                      alt={`${project.owner.username || "User"} avatar`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "default.jpg";
                      }}
                    />
                  </div>
                  </NavLink>
                  <div className="owner_meta">
                    <div className="owner_name">
                      {project.owner.username || "Unknown"}
                    </div>
                    <div className="owner_sub">
                      {project.owner.email || project.owner.bio || ""}
                    </div>
                  </div>
                  <div className="owner_actions">
                    {renderFollowControl(project.owner._id)}
                  </div>
                </div>

                <div className="card_body">
                  <a
                    href={project.online_link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="preview_wrap"
                  >
                    <img
                      src={
                        project.image ||
                        `${backend_url}/public/images/default_project.jpg`
                      }
                      alt={`${project.name} preview`}
                      loading="lazy"
                    />
                  </a>

                  <div className="content">
                    <h2 className="project_title">{project.name}</h2>
                    <div className="project_desc">
                      {project.description || "No description provided."}
                    </div>
                    <div className="project_tags">
                      {project.technologys || ""}
                    </div>

                    <div className="actions_row">
                      {project.github_link ? (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-github small"
                        >
                          <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
                        </a>
                      ) : (
                        <button className="btn btn-ghost small" disabled>
                          GitHub
                        </button>
                      )}

                      {project.online_link ? (
                        <a
                          href={project.online_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-view small"
                        >
                          <OpenInNewIcon sx={{ fontSize: 16 }} /> View
                        </a>
                      ) : (
                        <button className="btn btn-ghost small" disabled>
                          No Demo
                        </button>
                      )}

                      <NavLink
                        to={`/user/${encodeURIComponent(project.owner._id)}`}
                        className="btn btn-ghost small"
                      >
                        Profile
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="project_footer">
                  <div>
                    {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a
                      href={project.github_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--muted)",
                        textDecoration: "underline",
                      }}
                    >
                      Source
                    </a>
                    <a
                      href={project.online_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--muted)",
                        textDecoration: "underline",
                      }}
                    >
                      Open
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Allproject;
