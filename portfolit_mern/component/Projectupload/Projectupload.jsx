import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../public/context/context_api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Projectupload() {
  const [isSending, setIsSending] = useState(false);
  const [preview, setPreview] = useState(null);

  const { user, backend_url, allproject } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [file, setFile] = useState({
    name: '',
    description: '',
    technologys: '',
    github_link: '',
    online_link: '',
    file: null,
  });

  const handleFileChange = (e) => {
    const chosenFile = e.target.files?.[0];
    if (!chosenFile) {
      setFile((p) => ({ ...p, file: null }));
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];

    if (!allowedTypes.includes(chosenFile.type)) {
      toast.error('❌ Only image files are allowed.');
      setFile((p) => ({ ...p, file: null }));
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    const objectUrl = URL.createObjectURL(chosenFile);
    setPreview(objectUrl);
    setFile((p) => ({ ...p, file: chosenFile }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error('Please login first.');
      return;
    }
    if (!backend_url) {
      toast.error('Backend URL missing.');
      return;
    }
    if (!file.name.trim()) {
      toast.error('Please enter project title/name.');
      return;
    }

    setIsSending(true);

    try {
      const data = new FormData();
      data.append('name', file.name);
      data.append('description', file.description);
      data.append('technologys', file.technologys);
      data.append('github_link', file.github_link);
      data.append('online_link', file.online_link);
      if (file.file) data.append('image', file.file);
      data.append('owner', user._id);

      const response = await fetch(`${backend_url}/file`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result && (result.name || result._id)) {
        setFile({
          name: '',
          description: '',
          technologys: '',
          github_link: '',
          online_link: '',
          file: null,
        });
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        toast.success('File uploaded successfully');
      } else {
        toast.error(result.message || 'Upload failed.');
      }
    } catch (err) {
      console.error('Error uploading:', err);
      toast.error('Error while uploading.');
    } finally {
      setIsSending(false);
    }
  };

  if (allproject?.length > 0 && !user) {
    return <h1 style={{ textAlign: 'center' }}>Please log in to access your profile</h1>;
  }

  return (
    <>
      <div className="main_login_div">
        <div className="form">
          <h2 className="fontstyle">| UPLOAD PROJECTS |</h2>

          <form action="#" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title/Name"
              name="name"
              value={file.name}
              onChange={handleTextChange}
              autoFocus
              required
            />
            <br />
            <br />
            <textarea
              placeholder="Description"
              name="description"
              value={file.description}
              onChange={handleTextChange}
            />
            <textarea
              placeholder="Technologys"
              name="technologys"
              value={file.technologys}
              onChange={handleTextChange}
            />
            <input
              type="text"
              placeholder="Git_hub_Link"
              name="github_link"
              value={file.github_link}
              onChange={handleTextChange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Online_Link"
              name="online_link"
              value={file.online_link}
              onChange={handleTextChange}
            />
            <br />
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            <br />

            {/* ✅ Small Preview Box */}
            {preview && (
              <div style={{ marginBottom: 12, textAlign: "center" }}>
                <div style={{ marginBottom: 6, fontSize: "14px", color: "#666" }}>
                  Preview:
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "120px",
                    height: "120px",
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            )}

            <button className="submit_login" type="submit" disabled={isSending}>
              {isSending ? 'Sending ........' : 'UPLOAD'}
            </button>
          </form>
        </div>


        <div className="circle"></div>
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>
    </>
  );
}

export default Projectupload;
