import { useContext, useState } from "react";
import UserContext from "../contexts/userContext";
import { loginService } from "../services/auth";

export function LoginPage(){
   const { login } = useContext(UserContext);

   const [usuario, setUsuario] = useState('');
   const [senha, setSenha] = useState('');

   async function logar(){
      if(!usuario || !senha) return;

      const result = await loginService(usuario, senha);
      if(result.response && result.usuario) login(result.usuario);
   }

   return (
      <div className="bg-[#282a36] flex justify-center items-center w-screen h-screen">
         <div className="p-4 w-full max-w-md max-h-screen">
            <div className="rounded-lg shadow bg-gray-700">
               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                  <h3 className="text-xl font-semibold text-white">
                     Acessar a plataforma
                  </h3>
               </div>
               <div className="p-4 md:p-5">
                  <div className="space-y-4">
                     <div>
                        <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-white">Seu usuário</label>
                        <input 
                           type="usuario" 
                           name="usuario" 
                           id="usuario" 
                           className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white" 
                           placeholder="Seu usuário" 
                           value={usuario}
                           onChange={(e)=> setUsuario(e.target.value)} 
                        />
                     </div>
                     <div>
                        <label htmlFor="senha" className="block mb-2 text-sm font-medium text-white">Sua senha</label>
                        <input 
                           type="senha" 
                           name="senha" 
                           id="senha" 
                           placeholder="••••••••" 
                           className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white" 
                           value={senha} 
                           onChange={(e)=> setSenha(e.target.value)}  
                        />
                     </div>
                     <div className="flex justify-between">
                        <div className="flex items-start">
                           <div className="flex items-center h-5">
                              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded focus:ring-3 bg-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" required />
                           </div>
                           <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Lembrar me</label>
                        </div>
                        <a href="#" className="text-sm hover:underline text-blue-400">Esqueceu a senha?</a>
                     </div>
                     <button 
                        className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
                        onClick={logar}
                     >
                        Logar em sua conta
                     </button>
                     <div className="text-sm font-medium text-gray-300">
                        Não cadastrado? <a href="#" className="hover:underline text-blue-400">Criar sua conta</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}