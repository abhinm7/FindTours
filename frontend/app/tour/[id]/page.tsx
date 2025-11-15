"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTourById } from "@/lib/actions";

export default function TourPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getTourById(id as string);
      setTour(data);
    }
    load();
  }, [id]);

  if (!tour) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  // Compute duration
  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      {tour.image?.url && (
        <img
          src={tour.image.url}
          alt={tour.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-semibold mb-2">{tour.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{tour.destination}</p>

      <p className="text-xl font-semibold mb-4">
        ₹{tour.price.toLocaleString("en-IN")}
      </p>

      <p className="text-gray-700">
        <strong>Start Date:</strong> {start.toLocaleDateString()}
      </p>

      <p className="text-gray-700">
        <strong>End Date:</strong> {end.toLocaleDateString()}
      </p>

      <p className="text-gray-700 mt-1">
        <strong>Duration:</strong> {days} days
      </p>
    </main>
  );
}
