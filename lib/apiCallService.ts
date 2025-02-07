import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders } from "axios";

// General API response interface
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// API client
const apiClient = axios.create({
  baseURL: "", // API"s base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// General API call function
export async function apiCall<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: Record<string, unknown> | null = null,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {

  const request: AxiosRequestConfig = {
    url,
    method,
    data, // Include data if it"s POST/PUT request
    headers: new AxiosHeaders({
      ...apiClient.defaults.headers, // Merge default headers
      ...headers, // Custom headers
    }),
  };

  try {
    // Make the API request
    const response: AxiosResponse<T> = await apiClient(request);
    return { data: response.data, status: response.status, statusText: response.statusText };
  }
  catch (error: any) {
    // Handle API errors
    if (error.response) {
      // Case-I: Server responded with a status outside 2xx range
      throw new Error(`API Error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // Case-II: No response was received from the server
      throw new Error("API Error: No response received");
    } else {
      // Case-III: Some other error during request setup
      throw new Error(`API Error: ${error.message}`);
    }
  }
}