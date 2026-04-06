import { Router } from 'express';
import { getTeam } from '../controllers/team.controller.js';

const router = Router();

router.route('/team').get(getTeam);

export default router;
