import axios from "axios";

class HttpClient {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "", // env-based
      timeout: 10000, // 10 sec timeout
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: false,
    });

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  // =============================
  // REQUEST INTERCEPTOR
  // =============================
  _initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Optional logging
        if (import.meta.env.DEV) {
          console.log(" Request:", config);
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  // =============================
  // RESPONSE INTERCEPTOR
  // =============================
  _initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (import.meta.env.DEV) {
          console.log(" Response:", response);
        }
        return response.data; //  always return data directly
      },
      (error) => {
        // Centralized error handling
        const status = error?.response?.status;

        switch (status) {
          case 401:
            console.error("Unauthorized - Redirect to login");
            localStorage.removeItem("token");
            window.location.href = "/login";
            break;

          case 403:
            console.error("Forbidden");
            break;

          case 500:
            console.error("Server Error");
            break;

          default:
            console.error("API Error:", error?.message);
        }

        return Promise.reject({
          message: error?.response?.data?.message || error.message,
          status,
          data: error?.response?.data,
        });
      },
    );
  }

  // =============================
  // GENERIC METHODS
  // =============================
  get(url, params = {}, config = {}) {
    return this.axiosInstance.get(url, {
      params,
      ...config,
    });
  }

  post(url, data = {}, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  patch(url, data = {}, config = {}) {
    return this.axiosInstance.patch(url, data, config);
  }

  delete(url, data = {}, config = {}) {
    return this.axiosInstance.delete(url, {
      data,
      ...config,
    });
  }
}

//  Proper singleton
const httpClient = new HttpClient();
export default httpClient;
