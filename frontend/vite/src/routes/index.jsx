import { Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "../pages/chat";
import { LoginPage } from "../pages/login";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import UserContext from "../contexts/userContext";

const authenticationRoutes = [
   { key: "redirect-login", path: "*", element: <Navigate to="/chat/chat-login" /> },
   { key: "login", path: "/chat/chat-login", element: <LoginPage /> }
];

const appRoutes = [
   { key: "redirect-chat", path: "*", element: <Navigate to="/chat/" /> },
   { key: "chat", path: "/chat/", element: <Chat /> }
];

export const AppRoutes = () => {
   const { user, logout } = useContext(UserContext);
   document.addEventListener('logout', () => logout());

   if (!user) {
      return(
         <Routes>
            {authenticationRoutes.map(route => (
               <Route key={route.key} path={route.path} element={route.element} />
            ))}
         </Routes>
      )
   }else{
      return (
         <Routes>
            {appRoutes.map(route => (
               <Route key={route.key} path={route.path} element={route.element} />
            ))}
         </Routes>
      );
   }
};