"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("admin_token", res.data.token);
      toast.success("Login successful!");

      router.push("/admin");
    } catch (err: any) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="container max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>

      <form className="space-y-4" onSubmit={login}>
        <input
          className="w-full border p-2 rounded"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
