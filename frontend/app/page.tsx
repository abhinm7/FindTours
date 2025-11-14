import TourCard from '@/components/TourCard';
import { getTours } from '@/lib/actions';

export default async function HomePage() {
  const tours = await getTours();

  return (
    <main className="w-full max-w-full px-4 sm:px-6 md:px-8 mx-auto">
      <section className="rounded-sm p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>
    </main>
  );
}
