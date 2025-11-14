import TourCard from '@/components/TourCard';
import { getTours } from '@/lib/actions';

export default async function HomePage() {
  const tours = await getTours();

  return (
    <main className="container mx-auto p-8">
      {tours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl font-semibold">No Tours Found</h2>
          <p>Try adding some in the admin panel!</p>
        </div>
      )}
    </main>
  );
}