import React from "react";
import { MessageSchema } from "../../../type/schema";
import { AVATAR_COLORS } from "../../../constant/color";

const ToMessage = ({
  isPublic,
  message,
}: {
  isPublic: boolean;
  message: MessageSchema;
}) => {
  const [showTimestamp, setShowTimestamp] = React.useState(false);
  const formattedTime = message.createdAt?.slice(
    0,
    message.createdAt?.lastIndexOf(".")
  );

  return (
    <div
      className="col-start-1 col-end-10 px-3 mb-1 rounded-lg"
      onMouseEnter={() => setShowTimestamp(true)}
      onMouseLeave={() => setShowTimestamp(false)}
    >
      {/* if our guy is public make sure the name of the sender
      is known */}
      {isPublic && (
        <p className="ml-1 text-xs text-gray-400 italic">
          {message.sender.username}
        </p>
      )}

      <div className="flex flex-row items-end">
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full ${AVATAR_COLORS.at(
            message.sender.id % AVATAR_COLORS.length
          )} flex-shrink-0 text-sm overflow-hidden`}
        >
          {message.sender.username[0].toUpperCase()}
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl min-w-fit max-w-max">
          <p
            className="break-words"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {message.content}
          </p>
        </div>
        <p className="ml-2 text-xs text-gray-400 italic">
          {showTimestamp
            ? formattedTime
            : formattedTime?.split(" ")[1].slice(0, 5)}
        </p>
      </div>
    </div>
  );
};

export default ToMessage;
