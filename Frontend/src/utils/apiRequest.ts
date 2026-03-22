// utils/apiRequest.ts
import { toast } from "react-hot-toast";
import { API_URL } from "../confiq";

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
};

type ApiOptions = {
  method?: string;
  body?: Record<string, any> | FormData;
  token?: string;
  tokenType?: "user" | "tutor"; // new
  showSuccess?: boolean;
  isFormData?: boolean;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  { method = "GET", body, token, tokenType = "user", showSuccess = false, isFormData = false }: ApiOptions = {}
): Promise<ApiResponse<T>> => {
  const toastId = toast.loading("Please wait...");

  try {
    let authToken = token;
    if (!authToken) {
      if (tokenType === "tutor") authToken = localStorage.getItem("tutorToken") || undefined;
      else authToken = localStorage.getItem("auth-token") || localStorage.getItem("token") || undefined;
    }

    const headers: Record<string, string> = {};
    if (!isFormData) headers["Content-Type"] = "application/json";
    if (authToken) headers.Authorization = `Bearer ${authToken}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: isFormData ? (body as FormData) : body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    toast.dismiss(toastId);

    if (!response.ok) {
      toast.error(data.msg || data.message || "Something went wrong!");
      return { success: false, data };
    }

    if (showSuccess && (data.msg || data.message)) toast.success(data.msg || data.message);

    return { success: true, data };
  } catch (error) {
    toast.dismiss(toastId);
    toast.error("Network error! Please try again.");
    console.error("API Error:", error);
    return { success: false, data: null };
  }
};