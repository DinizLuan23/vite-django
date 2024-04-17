// add the beginning of your app entry
import 'vite/modulepreload-polyfill'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

// Hooks
import useAuth from './hooks/useAuth'

// Context
import UserContext from "./contexts/userContext";

export function App(){
   const { user, login, logout } = useAuth();

   return (
      <UserContext.Provider value={{ user, login, logout }}>
         <BrowserRouter>
            <ToastContainer />
            <AppRoutes />
         </BrowserRouter>
      </UserContext.Provider>
   )
}