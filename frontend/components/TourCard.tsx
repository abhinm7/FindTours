import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Tour } from '@/lib/types';
import { CalendarDays } from 'lucide-react';

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(tour.price);

  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);

  const formattedStartDate = startDate.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });

  const dateRange = `${formattedStartDate} - ${endDate.toLocaleDateString(
    'en-IN',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  )}`;

  return (
    <Card
      className="
        overflow-hidden p-0 rounded w-full max-w-xs mx-auto
        transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div className="relative w-full h-40">
        {tour.image?.url ? (
          <Image
            src={tour.image.url}
            alt={tour.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h2 className="text-lg font-semibold mb-1">{tour.title}</h2>
        <p className="text-xs text-muted-foreground mb-2">{tour.destination}</p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{dateRange}</span>
        </div>
      </div>

      <div className="p-3 pt-0 flex justify-between items-center">
        <span className="text-base font-semibold">{formattedPrice}</span>
      </div>
    </Card>
  );
}
