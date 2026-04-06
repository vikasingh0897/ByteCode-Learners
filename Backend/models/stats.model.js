import mongoose from 'mongoose';

const statsSchema = mongoose.Schema(
  {
    lines_committed: {
      type: String,
      default: '0',
      trim: true,
    },
    active_learners: {
      type: String,
      default: '0',
      trim: true,
    },
    live_events: {
      type: Number,
      default: 0,
    },
    kernel_achivements: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'stats',
    timestamps: true,
  }
);

const Stats = mongoose.model('Stats', statsSchema);

export default Stats;
