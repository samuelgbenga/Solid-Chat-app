package uk.samuel.solid_chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import uk.samuel.solid_chat.entity.model.PrivateMessage;
import uk.samuel.solid_chat.entity.model.PublicMessage;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.PrivateMessageRequest;
import uk.samuel.solid_chat.payload.request.PublicMessageRequest;
import uk.samuel.solid_chat.service.MessageService;
import uk.samuel.solid_chat.service.UserService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class MessageController {

    private final MessageService messageService;

    private final UserService userService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/public")
    @SendTo("/public")
    public PublicMessage sendMessage(@Payload PublicMessageRequest request) {
        return messageService.savePublicMessage(request);
    }

    // send the private messages
    @MessageMapping("/chat/private")
    public void sendMessage(@Payload PrivateMessageRequest request) {
        PrivateMessage savedMessage = messageService.savePrivateMassage(request);
        User receiver = userService.findUserById(request.getReceiver().getId());
        simpMessagingTemplate.convertAndSendToUser(
                String.valueOf(receiver.getId()),
                "/queue/messages",
                savedMessage
        );
    }


    @GetMapping("/messages/{senderId}/{receiverId}")
    public List<PrivateMessage> getMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        return messageService.getAllPrivateMessages(senderId, receiverId);
    }

    // get all public messages
    @GetMapping("/messages/public")
    public List<PublicMessage> getAllPublicMessages(){
        return messageService.getAllPublicMessage();
    }
}
