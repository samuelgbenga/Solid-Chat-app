import { useState} from 'react'

import ChatWindow from "../component/chatWindowComponent"
import Sidebar from "../component/sidebarComponent"
import { UserSchema } from '../type/schema';
import { useWebsockets } from '../context/WebsocketContext';

const MainPage = () => {

    const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
    const { onDisconnected } = useWebsockets();


    // warn the user befor loading this
    window.onbeforeunload = () => {
        if (onDisconnected) {
            onDisconnected();
        }
    };


  return (
    <div>
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                {selectedUser && <ChatWindow selectedUser={selectedUser} />}
            </div>
        </div>
        </div>
  )
}

export default MainPage