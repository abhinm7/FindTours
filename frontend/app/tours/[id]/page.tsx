import { getTourById } from "@/lib/actions";

export default async function TourPage({ params }: any) {
  const tour = await getTourById(params.id);

  if (!tour) return <div className="p-8">Tour not found</div>;

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      {tour.image.url && (
        <img src={tour.image.url} alt="" className="w-full h-80 object-cover rounded-lg mb-6" />
      )}

      <h1 className="text-3xl font-semibold">{tour.title}</h1>
      <p className="text-lg text-gray-600">{tour.destination}</p>
      <p className="mt-4">Price: ₹{tour.price}</p>
      <p className="mt-2">Start Date: {tour.startDate?.slice(0, 10)}</p>
      <p className="mt-2">Duration: {tour.endDate} days</p>
    </main>
  );
}
