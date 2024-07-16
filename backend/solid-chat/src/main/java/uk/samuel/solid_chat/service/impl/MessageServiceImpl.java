package uk.samuel.solid_chat.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.samuel.solid_chat.entity.model.ChatRoom;
import uk.samuel.solid_chat.entity.model.PrivateMessage;
import uk.samuel.solid_chat.entity.model.PublicMessage;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.PrivateMessageRequest;
import uk.samuel.solid_chat.payload.request.PublicMessageRequest;
import uk.samuel.solid_chat.repository.ChatRoomRepository;
import uk.samuel.solid_chat.repository.PrivateMessageRepository;
import uk.samuel.solid_chat.repository.PublicMessageRepository;
import uk.samuel.solid_chat.repository.UserRepository;
import uk.samuel.solid_chat.service.ChatRoomService;
import uk.samuel.solid_chat.service.MessageService;
import uk.samuel.solid_chat.service.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final PrivateMessageRepository privateMessageRepository;

    private final PublicMessageRepository publicMessageRepository;

    private final UserService userService;

    private final ChatRoomService chatRoomService;


    @Override
    public PrivateMessage savePrivateMassage(PrivateMessageRequest request) {

        // create a private chatroom
        ChatRoom chatRoom = chatRoomService
                .getChatRoom(request.getSender().getId(),
                        request.getReceiver().getId(), true);

        if(chatRoom == null) return null;

        User sender = userService.findUserById(request.getSender().getId());
        User receiver = userService.findUserById(request.getReceiver().getId());

        // check that non if this user are null
        if (sender == null || receiver == null ) return null;

        // build the private message body
        PrivateMessage newMessage = PrivateMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .content(request.getContent())
                .chatRoomId(chatRoom.getId())
                .build();

        // save the private message
        return privateMessageRepository.save(newMessage);
    }

    @Override
    public PublicMessage savePublicMessage(PublicMessageRequest request) {

        User sender = userService.findUserById(request.getSender().getId());
        if (sender == null) return null;
        PublicMessage newMessage = PublicMessage.builder()
                .sender(sender)
                .content(request.getContent())
                .build();

        return publicMessageRepository.save(newMessage);
    }

    @Override
    public List<PrivateMessage> getAllPrivateMessages(long senderId, long receiverId) {

        ChatRoom room = chatRoomService.getChatRoom(senderId, receiverId, false);
        if (room != null) {
            return privateMessageRepository.findByChatRoomId(room.getId());
        }
        return null;
    }

    @Override
    public List<PublicMessage> getAllPublicMessage() {
        return publicMessageRepository.findAll();
    }

    // get all public message
}
