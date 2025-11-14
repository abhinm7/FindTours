import express from "express";
import { getTourById, getTours } from "../controllers/tourController.js"

const router = express.Router();

// GET all tours
router.get('/', getTours);
// GET single tour by ID
router.get('/:id', getTourById);



export default router;