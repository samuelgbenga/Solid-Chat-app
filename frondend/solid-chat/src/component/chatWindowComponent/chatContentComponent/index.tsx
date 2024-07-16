import React, { useEffect, useRef, useState } from "react";
import { UserSchema, MessageSchema } from "../../../type/schema";
import { useSession } from "../../../context/SessionContext";
import { useWebsockets } from "../../../context/WebsocketContext";
import FromMessage from "./FromMessage";
import ToMessage from "./ToMessage";

const ChatContent = ({ selectedUser }: { selectedUser: UserSchema }) => {
  const { details } = useSession();
  const { privateMessages, publicMessages } = useWebsockets();
  const [messages, setMessages] = useState<Array<MessageSchema>>([]);

  // set up the scroll to automatically scroll
  // down when a new message enters
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // if id is -1 set message to publicMessage
  // else set message to private message or an empty Array
  // the scroll bottom.
  useEffect(() => {
    if (selectedUser.id === -1) setMessages(publicMessages);
    else {
      setMessages(privateMessages.get(selectedUser.id) || [])
    };
    
    scrollToBottom();
  }, [selectedUser, privateMessages, publicMessages]);

  return (
  
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
      
        <div className="grid grid-cols-12 gap-y-2">
          {/* loop throug messages */}

          {messages.length
            ? messages.map((message: MessageSchema, index: number) => {
                return message.sender.id === details?.id ? (
                  //handle message from a user
                  <FromMessage key={index} message={message} />
                ) : (
                  //handle message to a user
                  // check if it is to public or to private
                  <ToMessage
                    key={index}
                    isPublic={selectedUser.id === -1}
                    message={message}
                  />
                );
              })
            : null}

          {/* it refrence the scroll within the chat window */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
