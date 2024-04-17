import axios from './index';
import { toast } from "react-toastify";

export async function loginService(usuario, senha){
   try {
      const { status: statusCsrf, data: dataCsrf } = await axios.get('/api-chat/get-csrf-token');

      if(statusCsrf === 200 && dataCsrf){
         const csrfToken = dataCsrf.csrfToken;
         axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
      }

      const { status, data } = await axios.post('/api-chat/chat-login', { usuario, senha });

      if (status === 200) return data;
      else throw Error(data.message);
   } catch (err) {
      if(err.name == 'AxiosError') return false;

      toast.error(err.message);
      return false;
   }
}