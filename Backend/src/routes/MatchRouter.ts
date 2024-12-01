import { Router } from "express";
import { createMatch, getMatches } from '../controller/MatchesController';
import { authenticateJWT } from '../middleware/auth';

const matchRouter = Router();

matchRouter.post('/matches/:userId', authenticateJWT, createMatch);
matchRouter.get('/matches', authenticateJWT, getMatches);

export default matchRouter; 
