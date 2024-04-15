import { useEffect, useState } from 'react'

// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

function App() {
  const [count, setCount] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [roomSelecionada, setRoomSelecionada] = useState(null);
  const reactLogo = '/static/react.svg'
  const viteLogo = '/static/vite.svg'

  async function testarChat(){

  }

  useEffect(() => {
    (async () => {
      const result = await (await fetch('/frontend/get-rooms')).json();
      setRooms(result);
      setRoomSelecionada(result[result.length - 1]);
    })();
  },[])

  return (
      <div className="h-screen max-h-screen p-10">
        <div className='flex h-full rounded-lg shadow-lg'>
          <div className="w-1/4 bg-white rounded-s-md">
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-red-700 text-white rounded-ss-md">
              <h1 className="text-2xl font-semibold">Chat Web</h1>
              <div className="relative">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </div>
            </header>
          
            <div className="overflow-y-auto p-3">
              {
                rooms?.length > 0 ? rooms.map(room => (
                  <div className="flex items-center cursor-pointer bg-gray-400 hover:bg-gray-100 p-2 rounded-md">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{room.title}</h2>
                      <p className="text-gray-600">{room.created_at}</p>
                    </div>
                  </div>
                )) :
                  <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                      <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">Alice</h2>
                      <p className="text-gray-600">Hoorayy!!</p>
                    </div>
                  </div>
              }
            </div>
          </div>

          <div className="flex flex-col h-full flex-1 rounded-e-md ">
            <div className="bg-zinc-900 p-4 text-white rounded-se-md">
              <h1 className="text-2xl text-center font-semibold">Alice</h1>
            </div>
            
            <div className="h-full overflow-y-auto p-4 border border-white">
              {/* <!-- Incoming Message --> */}
              <div className="flex mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                  <p className="text-gray-700">Hey Bob, how's it going?</p>
                </div>
              </div>
              
              {/* <!-- Outgoing Message --> */}
              <div className="flex justify-end mb-4 cursor-pointer">
                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                  <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                  <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                </div>
              </div>
            </div>

            {/* <!-- Chat Input --> */}
            <footer className="bg-white p-4 rounded-ee-md border-l">
              <div className="flex items-center">
                <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400" />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
              </div>
            </footer>
              
          </div>
        </div>
      </div>
  )
}

export default App
