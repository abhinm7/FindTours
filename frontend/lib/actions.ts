import axios from "axios";
import { Tour } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
console.log(BASE_URL)
// Get all tours (client/server safe)
export async function getTours(): Promise<Tour[]> {
  try {
    
    const res = await axios.get(`${BASE_URL}/api/tours`);
    return res.data.success ? res.data.data : [];

  } catch (err) {
    console.error("Get tours error:", err);
    return [];
  }
}

// Get a single tour (client/server safe)
export async function getTourById(id: string): Promise<Tour | null> {
  try {
    const res = await axios.get(`${BASE_URL}/api/tours/${id}`);
    return res.data.success ? res.data.tour : null;
  } catch (err) {
    console.error("Get tour error:", err);
    return null;
  }
}

function getAuthHeader() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// CREATE TOUR
export async function createTour(formData: FormData) {
  try {
    await axios.post(`${BASE_URL}/api/admin/tours`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, message: "Tour created successfully!" };
  } catch (err: any) {
    console.error("Create error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to create tour",
    };
  }
}

// UPDATE TOUR
export async function updateTour(id: string, formData: FormData) {
  try {
    await axios.put(`${BASE_URL}/api/admin/tours/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, message: "Tour updated successfully!" };
  } catch (err: any) {
    console.error("Update error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to update tour",
    };
  }
}

// DELETE TOUR
export async function deleteTour(id: string) {
  try {
    await axios.delete(`${BASE_URL}/api/admin/tours/${id}`, {
      headers: getAuthHeader(),
    });

    return { success: true, message: "Tour deleted successfully!" };
  } catch (err: any) {
    console.error("Delete error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to delete tour",
    };
  }
}
