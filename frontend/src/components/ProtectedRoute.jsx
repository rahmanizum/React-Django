import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN, API_ENDPOINT } from "../constants";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthenticated(false));
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      const response = await api.post(API_ENDPOINT.GET_TOKEN_BY_REFRESH, {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthenticated(true);
        return;
      }
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        setIsAuthenticated(false);
        return;
      }
      const decoded = jwtDecode(accessToken);
      if (decoded.exp * 1000 < Date.now()) {
        return await refreshToken();
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
