import { fetchLogout, fetchMe } from "@/Api";
import { useState, createContext, useEffect, useContext } from "react";
import { Spinner ,VStack,Text} from "@chakra-ui/react"



const AuthContext = createContext();
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(()=>{// oturum acma
    (async () => {
        try {
           const  me = await fetchMe();
        //    console.log('me :>> ', me);
            setLoggedIn(true)
            setUser(me)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    })()
},[])

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token",data.accessToken)
    localStorage.setItem("refresh-token",data.refreshToken)
  };

  const logout= async () => {
    setLoading(false)
    setLoggedIn(false); 
    setUser(null)// oturum bilgilerini siliyorum
    await fetchLogout();
    localStorage.removeItem("access-token")
    localStorage.removeItem("refresh-token")

  }


  const values = {
    loggedIn,
    user,
    login,
    logout
  };
  if (loading) {
    return(
        <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    )
  }

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  );
};
const useAuth = () =>useContext(AuthContext);
export { AuthProvider, useAuth };
