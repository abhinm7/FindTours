import axios from "axios";

export async function verifyAdminFrontEnd() {
  if (typeof window === "undefined") return { valid: false };

  const token = localStorage.getItem("admin_token");
  if (!token) {
    return { valid: false, message: "missing" };
  }

  try {
    console.log("hit 1 ")
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token`, {},
      {
        headers: {
          authorization: `Bearer ${token}`,
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
