import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/lib/types";
import { Calendar } from "lucide-react";

export default function TourCard({ tour }: { tour: Tour }) {
  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Link
      href={`/tour/${tour._id}`}
      className="block rounded-lg shadow-sm border hover:shadow-md transition overflow-hidden bg-white h-full"
    >
      {/* Image */}
      <div className="relative w-full h-40 md:h-44">
        <Image
          src={tour.image.url}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 h-[210px] justify-between">

        {/* Title */}
        <h2 className="font-semibold text-[15px] leading-snug line-clamp-2 h-12">
          {tour.title}
        </h2>

        {/* Destination */}
        <p className="text-gray-600 text-sm">{tour.destination}</p>

        {/* Date + Duration */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {start.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
              {" - "}
              {end.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>

          {/* Duration Right Side */}
          <span className="text-gray-500">• {diffDays} days</span>
        </div>

        {/* Price bottom */}
        <p className="font-semibold text-black text-lg">
          ₹{tour.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
