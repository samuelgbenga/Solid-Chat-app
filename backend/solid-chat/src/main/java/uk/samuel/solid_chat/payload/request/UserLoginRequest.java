package uk.samuel.solid_chat.payload.request;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
public class UserLoginRequest {

    private String username;

    private String password;

    UserLoginRequest(String username, String password){
        this.username = username;
        this.password = password;
    }
}
