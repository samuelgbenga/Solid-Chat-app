package uk.samuel.solid_chat.payload.response;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PrivateMessageResponse {

    private String responseCode;

    private String responseMessage;

    private PrivateMessageInfo privateMessageInfo;


}
