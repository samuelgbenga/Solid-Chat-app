
import { UserSchema } from '../../type/schema';
import ChatContent from './chatContentComponent';
import ChatInput from './chatInputComponent';

const ChatWindow = ({ selectedUser }: { selectedUser: UserSchema }) => {

  return (
    <div className="flex flex-col flex-auto h-full py-2 px-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
      
        <ChatContent selectedUser = {selectedUser}/>
        <ChatInput selectedUser={selectedUser} />
      </div>
    </div>
  )
}

export default ChatWindow;