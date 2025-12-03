// profileHelpers.js - Helper functions for profile calculations

export const calculateProfileCompletion = (user, project) => {
  if (!user) return { percentage: 0, completed: 0, total: 0, missing: [] };

  let completed = 0;
  let total = 0;
  const missing = [];

  // Basic Info (weight: 6 fields)
  const basicFields = [
    { name: 'Username', field: user.username && user.username.trim() !== '', weight: 1, icon: 'fa-user' },
    { name: 'Email', field: user.email && user.email.trim() !== '', weight: 1, icon: 'fa-envelope' },
    { name: 'Phone', field: user.phone, weight: 1, icon: 'fa-phone' },
    { name: 'Profile Photo', field: user.photo && user.photo !== 'default.jpg' && user.photo.trim() !== '', weight: 1, icon: 'fa-image' },
    { name: 'Bio', field: user.bio && user.bio.trim() !== '' && user.bio !== "React developer ^_^", weight: 1, icon: 'fa-align-left' },
    { name: 'Role/Title', field: user.role && user.role.trim() !== '', weight: 1, icon: 'fa-briefcase' }
  ];

  basicFields.forEach(item => {
    total += item.weight;
    if (item.field) {
      completed += item.weight;
    } else {
      missing.push({ name: item.name, category: 'Basic Info', icon: item.icon });
    }
  });

  // Social Links (weight: 4 fields)
  const socialFields = [
    { 
      name: 'GitHub Profile', 
      field: user.github && user.github.trim() !== '', 
      weight: 1, 
      icon: 'fa-brands fa-github' 
    },
    { 
      name: 'LinkedIn Profile', 
      field: user.linkedin && user.linkedin.trim() !== '', 
      weight: 1, 
      icon: 'fa-brands fa-linkedin' 
    },
    { 
      name: 'Website', 
      field: user.website && user.website.trim() !== '', 
      weight: 1, 
      icon: 'fa-globe' 
    },
    { 
      name: 'Location', 
      field: user.location && user.location.trim() !== '', 
      weight: 1, 
      icon: 'fa-location-dot' 
    }
  ];

  socialFields.forEach(item => {
    total += item.weight;
    if (item.field) {
      completed += item.weight;
    } else {
      missing.push({ name: item.name, category: 'Social Links', icon: item.icon });
    }
  });

  // Education (weight: 2)
  total += 2;
  if (user.education && user.education.length > 0) {
    completed += 2;
  } else {
    missing.push({ name: 'Education', category: 'Portfolio', icon: 'fa-graduation-cap' });
  }

  // Experience (weight: 2) - Consider fresher status
  total += 2;
  if (user.isFresher === true) {
    completed += 2;
  } else if (user.experience && user.experience.length > 0) {
    completed += 2;
  } else {
    missing.push({ name: 'Work Experience (or mark as Fresher)', category: 'Portfolio', icon: 'fa-briefcase' });
  }

  // Skills (weight: 2)
  total += 2;
  if (user.skills && user.skills.length > 0) {
    completed += 2;
  } else {
    missing.push({ name: 'Skills', category: 'Portfolio', icon: 'fa-code' });
  }

  // Certifications (weight: 1)
  total += 1;
  if (user.certifications && user.certifications.length > 0) {
    completed += 1;
  } else {
    missing.push({ name: 'Certifications', category: 'Portfolio', icon: 'fa-certificate' });
  }

  // Resume (weight: 1)
  total += 1;
  if (user.resumeUrl) {
    completed += 1;
  } else {
    missing.push({ name: 'Resume/CV', category: 'Documents', icon: 'fa-file-pdf' });
  }

  // Projects (weight: 2)
  total += 2;
  if (project && project.length > 0) {
    completed += 2;
  } else {
    missing.push({ name: 'Projects', category: 'Portfolio', icon: 'fa-folder-open' });
  }

  const percentage = Math.round((completed / total) * 100);
  return { percentage, completed, total, missing };
};

export const getCompletionColor = (percentage) => {
  if (percentage >= 80) return '#4ade80'; // green
  if (percentage >= 50) return '#fbbf24'; // yellow
  return '#f87171'; // red
};

export const getCompletionMessage = (percentage) => {
  if (percentage === 100) return 'Perfect! Your profile is complete 🎉';
  if (percentage >= 80) return 'Almost there! Just a few more details';
  if (percentage >= 50) return 'Good progress! Keep going';
  return 'Let\'s complete your profile';
};

export const getRandomCoverPattern = () => {
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
  return `url(https://images.unsplash.com/${randomPattern}?w=1200&h=300&fit=crop&q=80)`;
};
