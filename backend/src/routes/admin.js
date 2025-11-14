import express from 'express';
import {
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js'

const router = express.Router();

// --- ADMIN ONLY ROUTES ---

// POST (create) a new tour
router.post('/tours', createTour);

// PUT (update) a tour by ID
router.put('/tours/:id', updateTour);

// DELETE a tour by ID
router.delete('/tours/:id', deleteTour);

export default router;