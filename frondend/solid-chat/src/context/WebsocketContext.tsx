import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Stomp, { Frame, Client } from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { MessageSchema, UserSchema } from "../type/schema";
import {
  getAllMessages,
  getOnlineUsers,
  getAllPublicMessages,
} from "../service/api";
import { useSession } from "./SessionContext";

interface WebSocketContextSchema {
  onlineUsers: Map<number, UserSchema>;
  onDisconnected?: () => void;
  privateMessages: Map<number, Array<MessageSchema>>;
  sendPrivateMessage: (receiver: UserSchema, message: string) => void;
  publicMessages: Array<MessageSchema>;
  sendPublicMessage: (message: string) => void;
}

const WebSocketsContext = createContext<WebSocketContextSchema>({
  onlineUsers: new Map<number, UserSchema>(),
  onDisconnected: () => {},
  privateMessages: new Map<number, Array<MessageSchema>>(),
  sendPrivateMessage: () => {},
  publicMessages: [],
  sendPublicMessage: () => {},
});

const WebsocketsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { details } = useSession();
  const [onlineUsers, setOnlineUsers] = useState(new Map());
  const [privateMessages, setPrivateMessages] = useState(new Map());
  const [publicMessages, setPublicMessages] = useState<Array<MessageSchema>>(
    []
  );
  const wsClient = useRef<Client | null>(null);

  // connect to the message on the backend

  async function connect(userDetails: UserSchema) {
    const socket = new SockJS("http://localhost:8080/ws" || "");
    wsClient.current = Stomp.over(socket);
    wsClient.current.connect({}, onConnected, onError);

    // let fetch all the user online
    let fetchedOnlineUsers = await getOnlineUsers();
    let fetchPublicMessages = await getAllPublicMessages();
    setPublicMessages(fetchPublicMessages);

    // load private message from backend to frontend
    // load online users from backend to frontend

    for (const user of fetchedOnlineUsers) {
      // if it same user ignore
      if (user.id === userDetails.id) continue;
      const messages = await getAllMessages(userDetails.id, user.id);

      // set online users
      onlineUsers.set(user.id, user);
      setOnlineUsers(new Map(onlineUsers));

      // set private messages
      privateMessages.set(user.id, messages);
      setPrivateMessages(new Map(privateMessages));
    }
  }

  // set the on connected subscriptions
  const onConnected = () => {
    if (!wsClient.current) return;

    wsClient.current.subscribe("/online", onNewOnlineReceived);
    // listen private message queue
    wsClient.current.subscribe(
      `/user/${details?.id}/queue/messages`,
      onPrivateMessageReceived
    );
    // listen public message queue
    wsClient.current.subscribe(`/public`, onPublicMessageReceived);

    userJoin();
  };

  // set the errors subscription
  const onError = (error: string | Frame) => {
    console.log("Error: ", error);
  };

  // set user join
  const userJoin = () => {
    let chatMessage = {
      id: details?.id,
      username: details?.username,
      password: details?.password,
    };

    wsClient.current?.send(
      "/app/user.addUser",
      {},
      JSON.stringify(chatMessage)
    );
  };

  // on disconnected
  const onDisconnected = () => {
    let chatMessage = {
      id: details?.id,
      username: details?.username,
      password: details?.password,
    };

    wsClient.current?.send(
      "/app/user.disconnectUser",
      {},
      JSON.stringify(chatMessage)
    );
  };

  //set onPrivateMessage received
  const onPrivateMessageReceived = (message: Stomp.Message) => {
    // get the stomp payload
    const newMessage: MessageSchema = JSON.parse(message.body);
    // get the user id
    const sender = onlineUsers.get(newMessage.sender.id);

    // if no sender return
    if (!sender) return;
    // if the user does not have private
    // message map already create on for the user
    if (!privateMessages.get(sender.id)) privateMessages.set(sender.id, []);

    // get the private message array and push new message
    // finaly update
    privateMessages.get(sender.id).push(newMessage);
    setPrivateMessages(new Map(privateMessages));
  };

  // set on public message received
  const onPublicMessageReceived = (message: Stomp.Message) => {
    // get the stomp payload
    const newMessage: MessageSchema = JSON.parse(message.body);
    // get the user id
    const sender = onlineUsers.get(newMessage.sender.id);
    // if no sender return
    if (!sender) return;
    // update public message
    setPublicMessages((prev: Array<MessageSchema>) => [...prev, newMessage]);
  };

  // handle new online recieved
  const onNewOnlineReceived = async (message: Stomp.Message) => {
    // get the stomp payload
    const newUser: UserSchema = JSON.parse(message.body);

    // if this user is same do nothing (already online)
    if (newUser.id === details?.id) return;

    // check if the user is if line
    if (newUser.status === "OFFLINE") {
      // remove the user from the list
      onlineUsers.delete(newUser.id);
      setOnlineUsers(new Map(onlineUsers));
      return;
    }

    // if user is online already get the id
    const existingUser = onlineUsers.get(newUser.id);

    // if true that the user is online update the user info
    if (existingUser) {
      // User already exists, update their information
      // and return
      existingUser.username = newUser.username;
      existingUser.password = newUser.password;
      existingUser.status = newUser.status;
      onlineUsers.set(newUser.id, existingUser);
      setOnlineUsers(new Map(onlineUsers));
      return;
    }

    if (details?.id != null) {
      // get all the user messges with others
      const messages = await getAllMessages(details.id, newUser.id);

      // create a new private message mapping for the user
      privateMessages.set(newUser.id, messages);
      setPrivateMessages(new Map(privateMessages));
    } else {
      // Handle the case where details.id is null or undefined
      console.error("details.id is null or undefined");
    }

    // update the user to be online
    onlineUsers.set(newUser.id, newUser);

    setOnlineUsers(new Map(onlineUsers));
  };

  // create a function to send private message
  const sendPrivateMessage = async (receiver: UserSchema, message: string) => {
    // check that the receiever exist before sending
  

    if (!receiver) return;
    wsClient.current?.send(
      "/app/chat/private",
      {},
      JSON.stringify({
        sender: details!,
        receiver: receiver,
        content: message,
      })
    );

    // create a newMessage to update:
    // why not update the id also:
    // probably because it is already the mapping key
    const newMessage: MessageSchema = {
      sender: details!,
      receiver: receiver,
      content: message,
      id: undefined,
      roomId: undefined,
      createdAt: undefined,
    };

    // get the reciever from the sender chat
    // const senderChat = privateMessages.get(receiver.id);
    // if (!senderChat) return;

    // if the user does not have private create on for him/her
    if (!privateMessages.get(receiver.id)) {
      privateMessages.set(receiver.id, []);

      console.log("sender id cannot be null: ", details!.id);
    }

  
    // finally update the receiver private message anyway
    privateMessages.get(receiver.id).push(newMessage);
    setPrivateMessages(new Map(privateMessages));
  };

  // function to handle send public message
  const sendPublicMessage = async (message: string) => {
    // send message to public chat to backend
    wsClient.current?.send(
      "/app/chat/public",
      {},
      JSON.stringify({
        sender: details!,
        content: message,
      })
    );

    // send to frontend
    // update the set public message
    const newMessage: MessageSchema = {
      sender: details!,
      content: message,
      receiver: undefined,
      id: undefined,
      roomId: undefined,
      createdAt: undefined,
    };
    setPublicMessages((prev: Array<MessageSchema>) => [...prev, newMessage]);
  };

  useEffect(() => {
    if (details !== null && !wsClient.current) {
      connect(details);
    } // eslint-disable-next-line
  }, [details]);

  return (
    <WebSocketsContext.Provider
      value={{
        onlineUsers,
        onDisconnected,
        privateMessages,
        sendPrivateMessage,
        publicMessages,
        sendPublicMessage,
      }}
    >
      {children}
    </WebSocketsContext.Provider>
  );
};

export const useWebsockets = () => useContext(WebSocketsContext);

export default WebsocketsContextProvider;
