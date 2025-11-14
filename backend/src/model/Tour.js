import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A tour must have a title'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'A tour must have a destination'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    startDate: {
      type: Date,
      required: [true, 'A tour must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'A tour must have an end date'],
    },
    image: {
      url: {
        type: String,
        required: false,
      },
      public_id: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;