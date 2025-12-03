const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ===========================
// Sub-Schemas for Portfolio
// ===========================

// Education (college, school, etc.)
const EducationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['college', 'school', 'bootcamp', 'other'],
    default: 'college'
  },
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  fieldOfStudy: { type: String, default: '' },
  startYear: { type: Number },
  endYear: { type: Number },
  description: { type: String, default: '' }
}, { _id: true });

// Work experience
const ExperienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: Date },
  endDate: { type: Date },
  currentlyWorking: { type: Boolean, default: false },
  description: { type: String, default: '' }
}, { _id: true });

// Certification or achievements
const CertificationSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  issuer: { type: String, default: '' },
  issueDate: { type: Date },
  credentialUrl: { type: String, default: '' }
}, { _id: true });

// ===========================
// Main User Schema
// ===========================
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    default: "default.jpg"
  },
  bio: {
    type: String,
    default: "React developer ^_^"
  },
  github: {
    type: String,
    default: "https://github.com/anshul00000"
  },
  linkedin: {
    type: String,
    default: "https://www.linkedin.com/in/anshul-chaurasiya/"
  },

  // ===========================
  // 👇 NEW PORTFOLIO FIELDS 👇
  // ===========================

  // Education array (college/school/etc.)
  education: { type: [EducationSchema], default: [] },

  // Work experience array
  experience: { type: [ExperienceSchema], default: [] },

  // Skills
  skills: { type: [String], default: [] }, // e.g. ["React", "Node.js", "MongoDB"]

  // Certifications
  certifications: { type: [CertificationSchema], default: [] },
  // Resume file link
  resumeUrl: { type: String, default: '' },

  // Role or job title
  role: { type: String, default: 'Developer' },

  // Generic portfolio/website
  website: { type: String, default: '' },

  // Location
  location: { type: String, default: '' },

  // Is Fresher
  isFresher: { type: Boolean, default: true },

  // ===========================
  // Followers & Following (existing)
  // ===========================
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });


// ===========================
// JWT Token Generator
// ===========================
userschema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        username: this.username,
      },
      process.env.jwt_key,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Token generation failed");
  }
};

// ===========================
// Password Compare Function
// ===========================
userschema.methods.password_compar = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

// ===========================
// Pre-save Hook (optional password hashing)
// ===========================
// Uncomment this if you want to hash password automatically before saving
/*
userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
*/

// ===========================
// Export
// ===========================
const User = mongoose.model("User", userschema);
module.exports = User;
