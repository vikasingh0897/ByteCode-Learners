import Event from '../models/event.model.js';
import asyncHandler from '../utils/async-handler.js';

export const getEvents = asyncHandler(async (req, res) => {
  const eventsData = await Event.find({}).sort({ createdAt: -1 }).limit(8);

  if (!eventsData || eventsData.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No events found in the database.',
    });
  }
  res.status(200).json({ success: true, data: eventsData });
});
