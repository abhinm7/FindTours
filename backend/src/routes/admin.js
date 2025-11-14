import express from 'express';
import {
    createTour,
    updateTour,
    deleteTour,
} from '../controllers/tourController.js'
import upload from "../config/cloudinary.js"

const router = express.Router();

// POST (create) a new tour
router.post('/tours', upload.single('image'), createTour);

// PUT (update) a tour by ID
router.put('/tours/:id', upload.single('image'), updateTour);

// DELETE a tour by ID
router.delete('/tours/:id', deleteTour);

export default router;