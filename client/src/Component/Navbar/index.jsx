import React from "react";
import { Link } from "react-router";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useBasket } from "@/contexts/BasketContext";
function Navbar() {
  const { loggedIn , user } = useAuth();// oturum acık mı değilmi onu kontrol için alt da linklerin orada kontrol yapıyorum
  const {items} = useBasket()
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/"> Anasayfa</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {loggedIn ? (
          <>
          {/* {items.length>0 &&( */}
            <Link to="/Sepet">
              <Button variant="outline" colorPalette= "blue" > Sepet {items.length}</Button>
            </Link>
          {/* )} */}
          {
            user.role==="admin"&&(
              <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
            )
          }
            <Link to="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
          </>
        ): (
          <>
            <Link to="/SingIn">
              <Button colorPalette="blue" variant="subtle"> Login</Button>
            </Link>

            <Link to="/SingUp">
              <Button colorPalette="green" variant="surface"> Sing Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
