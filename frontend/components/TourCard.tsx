import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tour } from '@/lib/types';

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  // Format the price nicely
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(tour.price);

  return (
    <Card className="overflow-hidden">
      {' '}

      <CardHeader className="p-0">
        <div className="relative w-full h-48">

          {tour.image?.url ? (
            <Image
              src={tour.image.url}
              alt={tour.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            // A placeholder if no image exists
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-1">{tour.title}</CardTitle>
        <CardDescription>{tour.destination}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-semibold">{formattedPrice}</span>
      </CardFooter>
    </Card>
  );
}