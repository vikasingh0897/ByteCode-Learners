import Team from '../models/team.model.js';
import asyncHadler from '../utils/async-handler.js';

export const getTeam = asyncHadler(async (req, res) => {
  const members = await Team.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: members.length,
    data: members,
  });
});
