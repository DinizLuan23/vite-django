import axios from './index';
import { toast } from "react-toastify";

export async function getRoomsService(user){
   try {
      const { status, data } = await axios.post('/api-chat/get-rooms');

      if (status === 200) return data;
      else throw Error(data.message);
   } catch (err) {
      if(err.name == 'AxiosError') return false;

      toast.error(err.message);
      return false;
   }
}