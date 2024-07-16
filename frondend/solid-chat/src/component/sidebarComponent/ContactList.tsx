import React, { useEffect } from "react";
import { UserSchema } from "../../type/schema";
import { useWebsockets } from "../../context/WebsocketContext";
import { AVATAR_COLORS } from '../../constant/color'

const ContactList = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: UserSchema | null;
  setSelectedUser: (user: UserSchema) => void;
}) => {
  const { onlineUsers } = useWebsockets();

  // convert the online user map to a flattend array
  const onlineUsersArray = Array.from(onlineUsers.values()).flat();


  //handle onclick on an online user
  const handleOnCLick = (onlineUser: UserSchema) => {
    setSelectedUser(onlineUser);
  }

  // rerender base on online users
  useEffect(() => {}, [onlineUsers]);

  return (
    <div className="flex flex-col mt-8 flex-1">
      {/* displays active friends */}
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Friends</span>
        <span className="flex items-center justify-center bg-green-400 h-4 w-4 p-3 rounded-full">
          {onlineUsersArray.length}
        </span>
      </div>

      {/* displays all friends */}
      <div>
        {onlineUsersArray.length > 0 &&
          onlineUsersArray.map((onlineUser) => (
            <button
            key={onlineUser.id}
            className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${selectedUser && onlineUser.id === selectedUser.id ? 'bg-gray-100' : ''}`}
            onClick={() => handleOnCLick(onlineUser)}
            >
                {/* give the first later a unique style */}
              <div className={`flex items-center justify-center h-8 w-8 ${AVATAR_COLORS.at(onlineUser.id % AVATAR_COLORS.length)} rounded-full`}>
              {onlineUser.username[0].toUpperCase()}
            </div>
            
            {/* display the user name */}
            <div className="ml-2 text-sm font-semibold">{onlineUser.username}</div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ContactList;
