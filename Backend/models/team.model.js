import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    img: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    role: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['tier1', 'tier2', 'tier3', 'core'],
      required: true,
    },
    socialLinks: {
      github: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);

export default Team;
