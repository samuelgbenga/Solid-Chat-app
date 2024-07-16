package uk.samuel.solid_chat.payload.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.samuel.solid_chat.entity.model.PublicMessage;
import uk.samuel.solid_chat.entity.model.User;


@Data
@Builder
@NoArgsConstructor
public class PublicMessageRequest {


    private User sender;


    private String content;

    PublicMessageRequest(User sender, String content){
        this.sender = sender;
        this.content = content;
    }
}
