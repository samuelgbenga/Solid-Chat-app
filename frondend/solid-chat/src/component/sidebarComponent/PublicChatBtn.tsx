import React from "react";
import { UserSchema } from "../../type/schema";
import { TONE_COLORS } from "../../constant/color";

const PublicChatBtn = ({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: UserSchema | null;
  setSelectedUser: (user: UserSchema) => void;
}) => {
  const handleOnCLick = () => {
    setSelectedUser({
      id: -1,
      username: "Public Chatroom",
      password: "Public Chatroom",
      status: "ONLINE",
    });
  };

  return (
    <div>
      <button
        className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
          selectedUser && selectedUser.id === -1 ? "bg-gray-100" : ""
        }`}
        onClick={() => handleOnCLick()}
      >
        <div
          className="flex items-center justify-center h-8 w-8 bg-pink-500 rounded-full"
          style={{ backgroundColor: TONE_COLORS.PRIMARY_HOVER }}
        >
          <span className="w-3/5">📢</span>
        </div>

        <div className="ml-2 text-sm font-semibold justify-center">
          Public Chatroom
        </div>
      </button>
    </div>
  );
};

export default PublicChatBtn;
