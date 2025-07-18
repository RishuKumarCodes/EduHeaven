import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found. User might already be logged out.");
      navigate("/");
    }

    const handleSignOut = async () => {
      try {
        await axios.post(`${backendUrl}/logout`, {}, { withCredentials: true });

        localStorage.removeItem("token");
        localStorage.removeItem("activationToken");

        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    handleSignOut();
  }, [navigate]);

  return null;
};

export default Signout;
