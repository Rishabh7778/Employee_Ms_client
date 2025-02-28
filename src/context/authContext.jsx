import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create an axios instance so that we don't add multiple interceptors
  const axiosInstance = axios.create();

  // Axios interceptor to handle 401 errors by attempting token refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If a 401 is received and we haven't retried this request yet
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem("refreshToken")
      ) {
        originalRequest._retry = true;
        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          // Call the refresh endpoint with the refresh token
          const response = await axios.post(`https://employee-mg-server.onrender.com/api/auth/refresh`, { refreshToken });
          // Save the new access token
          localStorage.setItem("token", response.data.accessToken);
          // Update the header and retry the original request
          originalRequest.headers["Authorization"] = "Bearer " + response.data.accessToken;
          return axiosInstance(originalRequest);
        } catch (err) {
          // If refresh fails, logout the user
          logout();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  const verifyUser = async () => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axiosInstance.get(`https://employee-mg-server.onrender.com/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Verify response:", response.data); // Debug log
        if (response.data.success) {
          setUser(response.data.user);
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth verification error:", error);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    verifyUser();
    // Note: You might want to refresh verification periodically (e.g., via setInterval)
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData?.token);
    localStorage.setItem("refreshToken", userData?.refreshToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthContext;
