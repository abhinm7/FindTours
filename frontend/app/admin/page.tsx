"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTours } from "@/lib/actions";
import { AdminToursTable } from "@/components/admin/AdminToursTable";
import { Tour } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();

  // PROTECT ADMIN ROUTE
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/admin/login");
  }, []);

  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getTours();
      setTours(data); 
    }
    load();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
      <AdminToursTable tours={tours} />
    </div>
  );
}
