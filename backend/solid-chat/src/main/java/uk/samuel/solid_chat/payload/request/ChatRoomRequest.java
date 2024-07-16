package uk.samuel.solid_chat.payload.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.samuel.solid_chat.entity.model.User;

@Data
@Builder
@NoArgsConstructor
public class ChatRoomRequest {


    private User sender;

    private User receiver;

    ChatRoomRequest(User sender, User receiver){
        this.sender = sender;
        this.receiver = receiver;
    }
}
