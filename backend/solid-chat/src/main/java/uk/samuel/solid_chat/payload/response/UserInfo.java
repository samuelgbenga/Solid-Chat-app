package uk.samuel.solid_chat.payload.response;

import lombok.Builder;
import lombok.Data;
import uk.samuel.solid_chat.entity.enums.Status;


@Data
@Builder
public class UserInfo {

    private String userName;


    private Status status;
}
