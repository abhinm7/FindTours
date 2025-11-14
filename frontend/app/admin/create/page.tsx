"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateTourForm } from "@/components/admin/CreateTourForm";

export default function CreateTourPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/admin/login");
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl mb-4">Create Tour</h1>
      <CreateTourForm />
    </div>
  );
}
