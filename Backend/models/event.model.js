import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    img: {
      type: String,
      required: [true, 'Image URL is required'],
      default: 'https://via.placeholder.com/600x400',
    },
    date: {
      type: String,
      required: [true, 'Date is required (Format: "24 OCT")'],
    },
    location: {
      type: String,
      default: 'REMOTE',
    },
    tag: {
      type: String,
      default: 'Activity',
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
