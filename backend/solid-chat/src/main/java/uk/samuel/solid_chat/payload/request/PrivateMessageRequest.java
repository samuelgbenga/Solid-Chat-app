package uk.samuel.solid_chat.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.samuel.solid_chat.entity.model.User;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrivateMessageRequest {


    private long roomId;

    private User sender;


    private User receiver;


    private String content;
}
