package uk.samuel.solid_chat.payload.response;

import lombok.Builder;
import lombok.Data;
import uk.samuel.solid_chat.entity.model.User;


@Data
@Builder
public class PublicMessageInfo {


    private User sender;


    private String content;
}
