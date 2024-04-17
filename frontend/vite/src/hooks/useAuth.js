import { useEffect, useState } from "react";

const useAuth = () => {
   const [user, setUser] = useState(null);

   const getUser = () => {
      if(!user) return JSON.parse(localStorage.getItem('user_data'));
      else return user;
   };

   const login = (userData) => {
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
   };

   const logout = () => {
      setUser(null);
      return localStorage.removeItem('user_data');
   };

   useEffect(() => {
      const auxUser = JSON.parse(localStorage.getItem('user_data'));
      if(!user && auxUser) setUser(auxUser);
   },[])

   return { user, login, logout };
}

export default useAuth;