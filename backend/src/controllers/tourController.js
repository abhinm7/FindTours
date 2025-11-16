import Tour from '../model/Tour.js';
import { v2 as cloudinary } from 'cloudinary';

//fetch all tours
export const getTours = async (req, res) => {
  try {
    const tours = (await Tour.find().sort({ createdAt: -1 }));
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
};

//fetch single tour
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json({ success: true, tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//create tour
export const createTour = async (req, res) => {
  const { title, destination, price, startDate, endDate } = req.body;

  // Create a default image object
  let image = {
    url: null,
    public_id: null,
  };
  // Check if a file was uploaded by multer-storage-cloudinary
  if (req.file) {
    // Populate the image object with Cloudinary data
    image = {
      url: req.file.path, // The public URL provided by Cloudinary
      public_id: req.file.filename, // The public_id for deletion
    };
  }

  try {
    const newTour = new Tour({
      title,
      destination,
      price,
      startDate,
      endDate,
      image, // Save the entire image object
    });

    const savedTour = await newTour.save();
    res.status(201).json({ success: true, savedTour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//update tour
export const updateTour = async (req, res) => {
  try {
    // First, find the tour to get its old image public_id
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Get the new text data from the request body
    const newData = { ...req.body };

    // Check if a new file is being uploaded
    if (req.file) {
      // If the tour already has an image, delete it from Cloudinary
      if (tour.image && tour.image.public_id) {
        await cloudinary.uploader.destroy(tour.image.public_id);
      }

      // Add the new image's data to the update object
      newData.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Find the tour by ID and update it with the new data
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, updatedTour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//delete tour by id
export const deleteTour = async (req, res) => {
  try {
    // Find the tour first to get its image public_id
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    // Check if the tour has an image with a public_id
    if (tour.image && tour.image.public_id) {
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(tour.image.public_id);
    }

    // After deleting from Cloudinary, delete the tour from the database
    await tour.deleteOne();

    res.status(200).json({ success: true, message: 'Tour successfully deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};