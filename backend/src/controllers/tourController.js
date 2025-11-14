import Tour from '../model/Tour.js'


//get all tours
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single tour
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
