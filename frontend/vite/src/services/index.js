import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../utils/funcoes";

// Módulo de eventos personalizado para gerenciar eventos de logout
const logoutEvent = new Event('logout');

// Interceptor para adicionar o token CSRF ao cabeçalho de cada solicitação
axios.interceptors.request.use(config => {
   const csrfToken = getCookie('csrftoken'); // Assumindo que você armazena o token CSRF no localStorage
   if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
   }
   return config;
}, error => {
   return Promise.reject(error);
});

// Interceptor para manipular respostas
axios.interceptors.response.use(response => {
   return response;
}, error => {
   if (error.response && error.response.status === 403) {
      const { data } = error.response;

      if(data && data.logout) toast.info('Sessão expirada 🕒');
      else toast.error('Operação não permitida 🥲');

      document.dispatchEvent(logoutEvent);

      return Promise.reject(error);
   }else{
      return error;
   }
});

export default axios;