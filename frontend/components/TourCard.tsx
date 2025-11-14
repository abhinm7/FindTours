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

  // formatted date range
  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);

  const formattedStartDate = startDate.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });

  const dateRange = `${formattedStartDate} - ${endDate.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  return (

    <Card className="overflow-hidden p-0">
      <div className="relative w-full h-48">
        {tour.image?.url ? (
          <Image
            src={tour.image.url}
            alt={tour.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{tour.title}</h2>
        <p className="text-sm text-muted-foreground mb-2">{tour.destination}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>{dateRange}</span>
        </div>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-semibold">{formattedPrice}</span>
      </div>
    </Card>
  );
}