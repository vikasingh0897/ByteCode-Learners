import Project from '../models/project.model.js';
import asyncHandler from '../utils/async-handler.js';

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isPublic: true })
    .sort({
      createdAt: -1,
    })
    .limit(6);

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});
