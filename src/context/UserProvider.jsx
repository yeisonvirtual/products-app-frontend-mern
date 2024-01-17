import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"

import Cookies from 'js-cookie';
import { verifyTokenRequest } from "../Auth/services/auth";

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // comprueba si hay login
  useEffect(() => {

    async function checkLogin(){

      const token = Cookies.get('token');

      if (!token) {
        setIsAuthenticated(false);
        setUser({});
        setIsLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        const userData = await res.json()

        if (res.status!==200) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(userData);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }

    }

    checkLogin();

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated }}>
      { children }
    </UserContext.Provider>
  )
}
