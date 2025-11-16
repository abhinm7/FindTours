import axios from "axios";

export async function verifyAdminFrontEnd() {
  if (typeof window === "undefined") return { valid: false };

  const token = localStorage.getItem("admin_token");
  if (!token) {
    return { valid: false, message: "missing" };
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;

  } catch (err: any) {
    return {
      valid: false,
      message: err.response?.data?.message || "invalid",
    };
  }
}
