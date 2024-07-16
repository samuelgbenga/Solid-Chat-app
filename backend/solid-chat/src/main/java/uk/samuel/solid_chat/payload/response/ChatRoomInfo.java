package uk.samuel.solid_chat.payload.response;

import lombok.Builder;
import lombok.Data;
import uk.samuel.solid_chat.entity.model.User;

@Data
@Builder
public class ChatRoomInfo {


    private User sender;

    private User receiver;

}
