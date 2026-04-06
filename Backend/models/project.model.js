import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      uppercase: true,
    },
    desc: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    repo: {
      type: String,
      required: [true, 'Repository link is required'],
      trim: true,
    },
    version: {
      type: String,
      default: 'v1.0.0',
    },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'In Progress', 'Beta'],
      default: 'Active',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const project = mongoose.model('Project', projectSchema);

export default project;
