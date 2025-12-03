// SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => {
  return (
    <>
      <style>{`
        .skeleton-card {
          position: relative;
          border: 1px solid #d1d5db;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
          animation: pulse 1.4s ease-in-out infinite;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 320px;
          width: 80vw;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }

        .skeleton-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.7),
            transparent
          );
          transform: skewX(-10deg);
          animation: shimmer 1.3s infinite;
        }

        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }

        .skeleton-block,
        .skeleton-line,
        .skeleton-btn {
          background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
        }

        .owner_bar {
          display:flex;
          gap:12px;
          align-items:center;
          padding:12px 14px;
          border-bottom:1px solid rgba(12,40,70,0.03);
          background: linear-gradient(90deg, rgba(250,252,255,0.95), rgba(245,249,255,0.9));
        }

        .avatar-block { width:56px; height:56px; border-radius:50%; flex-shrink:0; }
        .action-block { width:64px; height:36px; border-radius:8px; }
        .owner_meta { display:flex; flex-direction:column; gap:6px; min-width:0; flex:1; }

        .skeleton-line {
          height: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .name-line { width: 140px; height: 14px; }
        .sub-line { width: 180px; height: 12px; }
        .title-line { width: 60%; height: 18px; }
        .desc-line { width: 100%; height: 12px; }
        .desc-line.short { width: 80%; }
        .tags-line { width: 40%; height: 14px; }

        .card_body {
          display:flex;
          gap:16px;
          padding:14px;
          flex:1;
          align-items:flex-start;
        }

        .preview_wrap {
          flex: 0 0 44%;
          min-width: 220px;
          max-width: 480px;
          border-radius: 10px;
          overflow: hidden;
          background: #f3f7fb;
          height: 250px;
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .preview-block { width:100%; height:100%; border-radius:10px; }

        .content { flex:1; display:flex; flex-direction:column; gap:10px; }

        .actions_row { display:flex; gap:10px; align-items:center; margin-top:auto; flex-wrap:wrap; }
        .skeleton-btn { width:90px; height:36px; border-radius:8px; }

        .project_footer {
          display:flex;
          justify-content:space-between;
          gap:10px;
          padding:12px 14px;
          border-top:1px solid rgba(12,40,70,0.03);
        }

        .tiny { width:60px; height:10px; }
        .short2 { width:80px; }

        @media (max-width: 900px) {
          .card_body { flex-direction: column; }
          .preview_wrap { width:100%; height:200px; }
        }

        @media (max-width: 480px) {
          .preview_wrap { height:160px; }
        }
      `}</style>

      <article className="skeleton-card" aria-hidden>
        <div className="owner_bar">
          <div className="avatar skeleton-block avatar-block" />
          <div className="owner_meta">
            <div className="skeleton-line name-line" />
            <div className="skeleton-line sub-line" />
          </div>
          <div className="owner_actions">
            <div className="skeleton-block action-block" />
          </div>
        </div>

        <div className="card_body">
          <div className="preview_wrap">
            <div className="skeleton-block preview-block" />
          </div>

          <div className="content">
            <div className="skeleton-line title-line" />
            <div className="skeleton-line desc-line" />
            <div className="skeleton-line desc-line short" />
            <div className="skeleton-line tags-line" />
            <div className="actions_row">
              <div className="skeleton-btn" />
              <div className="skeleton-btn" />
              <div className="skeleton-btn" />
            </div>
          </div>
        </div>

        <div className="project_footer">
          <div className="skeleton-line tiny" />
          <div className="skeleton-line tiny short2" />
        </div>
      </article>
    </>
  );
};

export default SkeletonCard;
