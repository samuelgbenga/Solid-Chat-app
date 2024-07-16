package uk.samuel.solid_chat.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatRoomResponse {

    private String responseCode;

    private String responseMessage;

    private ChatRoomInfo chatRoomInfo;
}
