"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTourById } from "@/lib/actions";
import { Tour } from "@/lib/types";
import { EditTourForm } from "@/components/admin/EditTourForm";

export default function EditTourPageClient({ id }: { id: string }) {
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);

  // Protect route
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/admin/login");
  }, []);

  useEffect(() => {
    async function load() {
      console.log("Fetching tour with ID:", id);
      const data = await getTourById(id);
      console.log("Loaded tour:", data);
      setTour(data);
    }
    load();
  }, [id]);

  if (!tour) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Edit Tour</h1>
      <EditTourForm tour={tour} />
    </div>
  );
}
