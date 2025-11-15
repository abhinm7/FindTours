"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTours } from "@/lib/actions";
import { AdminToursTable } from "@/components/admin/AdminToursTable";
import { Tour } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/admin/login");
  }, []);

  // null means "loading"
  const [tours, setTours] = useState<Tour[] | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getTours();
      setTours(data);
    }
    load();
  }, []);

  // ⭐ Show loading spinner while fetching tours
  if (tours === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>

        <button
          onClick={() => router.push("/admin/create")}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          + Add Tour
        </button>
      </div>

      <AdminToursTable tours={tours} />
    </div>
  );
}
