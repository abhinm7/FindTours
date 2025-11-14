export type Tour = {
  _id: string;
  title: string;
  destination: string;
  price: number;
  startDate: string;
  endDate: string;
  image: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
};