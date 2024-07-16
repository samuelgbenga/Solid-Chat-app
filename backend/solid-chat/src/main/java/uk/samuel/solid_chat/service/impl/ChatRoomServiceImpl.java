package uk.samuel.solid_chat.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.samuel.solid_chat.entity.model.ChatRoom;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.repository.ChatRoomRepository;
import uk.samuel.solid_chat.service.ChatRoomService;
import uk.samuel.solid_chat.service.UserService;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final UserService userService;

    private final ChatRoomRepository chatRoomRepository;


    @Override
    public ChatRoom getChatRoom(long sender, long receiver, boolean isNotExist) {
        long senderId = Math.min(sender, receiver);
        User firstUser = userService.findUserById(senderId);
        long receiverId = Math.max(sender, receiver);
        User secondUser = userService.findUserById(receiverId);

        Optional<ChatRoom> chatRoom = chatRoomRepository.findBySenderAndReceiver(firstUser, secondUser);
        if(chatRoom.isPresent()){
            return chatRoom.get();
        }
        if(isNotExist){
            return createChatRoom(firstUser, secondUser);
        }
        return null;
    }

    @Override
    public ChatRoom createChatRoom(User sender, User receiver) {

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setSender(sender);
        chatRoom.setReceiver(receiver);

        return chatRoomRepository.save(chatRoom);

    }
}
