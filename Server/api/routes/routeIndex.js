import express from 'express';
import historyRoutes from './historyIndex.js';
import userRoutes from './userIndex.js';

const router=express.Router();
router.use('/history',historyRoutes);
router.use('/user',userRoutes);

export default router;