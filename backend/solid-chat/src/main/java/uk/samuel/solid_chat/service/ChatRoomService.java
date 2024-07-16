package uk.samuel.solid_chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.samuel.solid_chat.entity.model.ChatRoom;
import uk.samuel.solid_chat.entity.model.PrivateMessage;
import uk.samuel.solid_chat.entity.model.PublicMessage;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.PrivateMessageRequest;
import uk.samuel.solid_chat.payload.request.PublicMessageRequest;

import java.util.List;


public interface ChatRoomService {

    ChatRoom getChatRoom(long sender, long receiver, boolean isExist);

    ChatRoom createChatRoom(User sender, User receiver);

}
