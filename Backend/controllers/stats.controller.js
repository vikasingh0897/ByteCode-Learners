import Stats from '../models/stats.model.js';
import asyncHandler from '../utils/async-handler.js';

export const getStats = asyncHandler(async (req, res) => {
  const statsData = await Stats.findOne();

  if (!statsData) {
    return res.status(200).json({
      success: true,
      data: {
        lines_committed: '0',
        active_learners: '0',
        live_events: 0,
        kernel_achivements: 0,
      },
    });
  }

  res.status(200).json({ success: true, data: statsData });
});
