import { useContext, useEffect, useState } from "react";
import { getRoomsService } from "../services/chat";
import UserContext from "../contexts/userContext";

export function Chat() {
   const { user } = useContext(UserContext);

   const [rooms, setRooms] = useState([]);
   const [roomSelecionada, setRoomSelecionada] = useState(null);
 
   const logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczkekPHniUxWHAfxyGisk8zXa55NVj6FQqWdtKAn7zAEDLq3ptp3UmRGfVxgYREg3TNc&usqp=CAU';
   const image1 = 'https://64.media.tumblr.com/58bbc7fc926fca608cbd79a86df3f68c/tumblr_phdkyvAVON1w575d9_1280.jpg';
   const image2 = 'https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODZjYmQ5MDMtZDBiZS00NTQxLThjMzQtMzMwNzk0YWZkOGZlLmpwZWc.webp';

   useEffect(() => {
      if(user){
         (async () => {
            const result = await getRoomsService(user);
      
            if(result){
               setRooms(result);
               setRoomSelecionada(result[result.length - 1]);
            }
         })();
      }
   },[])
 
   return (
      <div className="h-screen max-h-screen p-10 bg-[#282a36]">
         <div className='flex h-full rounded-lg shadow-2xl'>
            <div className="h-full flex flex-col w-1/4 bg-white rounded-s-md">
               <header className="p-4 flex justify-between items-center bg-gradient-to-r from-purple-700 to-[#9580FF] text-white rounded-ss-md">
               <h1 className="text-2xl text-[#f8f8f2] font-semibold">Chat Web</h1>
               </header>
            
               <div className="h-full bg-[#282a36] overflow-y-auto p-3 border-r border-[#282a36]">
               {
                  rooms?.length > 0 ? rooms.map(room => (
                     <div key={room.room_id} className="flex items-center cursor-pointer bg-[#44475a] p-2 rounded-md">
                     <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img src={logo} alt="User Avatar" className="w-12 h-12 rounded-full object-contain" />
                     </div>
                     <div className="flex-1">
                        <h2 className="text-lg text-[#f8f8f2] font-semibold">{room.title}</h2>
                        <p className="text-[#f8f8f2]">{room.created_at}</p>
                     </div>
                     </div>
                  )) :
                     <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                     <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img src={logo} alt="User Avatar" className="w-12 h-12 rounded-full" />
                     </div>
                     <div className="flex-1">
                        <h2 className="text-lg font-semibold">Alice</h2>
                        <p className="text-gray-600">Hoorayy!!</p>
                     </div>
                     </div>
               }
               </div>
            </div>

            <div className="flex flex-col h-full flex-1 rounded-e-md">
               <div className="bg-gradient-to-r from-[#9580FF] p-4 text-white rounded-se-md">
               <h1 className="text-2xl text-center font-semibold">{roomSelecionada?.title ?? 'Porpacredi'}</h1>
               </div>
               
               <div className="h-full overflow-y-auto p-4 bg-[#44475a]">
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2">
                     <img src={image1} alt="User Avatar" className="w-10 h-10 rounded-full object-fill" />
                  </div>
                  <div className="flex max-w-96 bg-[#9580FF] rounded-lg p-3 gap-3">
                     <p className="text-white">Hey Bob, how's it going?</p>
                  </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                  <div className="flex max-w-96 bg-purple-700 text-white rounded-lg p-3 gap-3">
                     <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center ml-2">
                     <img src={image2} alt="My Avatar" className="w-10 h-10 rounded-full object-fill" />
                  </div>
               </div>
               </div>

               {/* <!-- Chat Input --> */}
               <footer className="bg-[#282a36] p-4 rounded-ee-md border-l border-[#282a36]">
               <div className="flex items-center">
                  <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md bg-[#44475a]" />
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md ml-2">Send</button>
               </div>
               </footer>
               
            </div>
         </div>
      </div>
   )
}