package uk.samuel.solid_chat.payload.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import uk.samuel.solid_chat.entity.enums.Status;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private Long id;

    private String username;

    private String password;

    private Status status;


}
