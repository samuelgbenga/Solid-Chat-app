package uk.samuel.solid_chat.service;

import uk.samuel.solid_chat.entity.model.ChatRoom;
import uk.samuel.solid_chat.entity.model.PrivateMessage;
import uk.samuel.solid_chat.entity.model.PublicMessage;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.PrivateMessageRequest;
import uk.samuel.solid_chat.payload.request.PublicMessageRequest;

import java.util.List;

public interface MessageService {




    PrivateMessage savePrivateMassage(PrivateMessageRequest request);

    PublicMessage savePublicMessage(PublicMessageRequest request);

    List<PrivateMessage> getAllPrivateMessages(long senderId, long receiverId);

    List<PublicMessage> getAllPublicMessage();
}
