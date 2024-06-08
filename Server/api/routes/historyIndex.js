import express from 'express';
import {
    addHistoryController,
    fetchHistoryController,
    deleteHistoryController
} from '../controllers/historyController.js';

const router=express.Router();
router.post('/writehistory',addHistoryController);
router.post('/gethistory',fetchHistoryController);
router.post('/deletehistory',deleteHistoryController);
export default router;