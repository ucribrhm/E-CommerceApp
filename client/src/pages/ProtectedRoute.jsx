import { useEffect } from "react";
import {  useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext"; // Oturum kontrolü için


function ProtectedRoute({ element, admin }) {
  const { loggedIn ,user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {// kullanıcı kontrolü
    if (!loggedIn||(admin && user.role !== "admin")) {
      //   navigate('/SingIn'); singine yönlendirdim
      navigate("/");
    }
    
  }, [loggedIn,admin,user, navigate]);
 
  return loggedIn ? element : null;
}

export default ProtectedRoute;
