import React from "react";
import { useWebsockets } from "../../context/WebsocketContext";
import { useSession } from "../../context/SessionContext";

const SignoutBtn = () => {
  const { onDisconnected } = useWebsockets();
  const { handleUserLogout } = useSession();

  // handle disconnect and handle the logout
  // disconnect then log out
  const handleClick = () => {
    if (onDisconnected) {
      onDisconnected();
    }
    handleUserLogout();
  };

  return (
    <div className="flex flex-col mt-3">
      <button
        className="border border-sky-600 text-sky-800 hover:bg-gray-100 rounded-lg py-2 px-3 text-sm w-4/5 self-center"
        onClick={() => handleClick()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignoutBtn;
