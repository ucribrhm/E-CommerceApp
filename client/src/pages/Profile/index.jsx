import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useBasket } from "@/contexts/BasketContext";
function Profile() {
  
  const { user, logout } = useAuth();
  const { clearBasket } = useBasket();
  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    clearBasket(); //sepeti boşalt
    navigate("/");
  };
  return (
    <div>
      Profile
      <code>{JSON.stringify(user)}</code>
      <Button colorPalette="red" onClick={handleLogout}>
        Çıkış yap
      </Button>
    </div>
  );
}

export default Profile;
