package uk.samuel.solid_chat.entity.model;



import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uk.samuel.solid_chat.entity.enums.Status;

@Getter
@Setter
@NoArgsConstructor
@Entity
@AllArgsConstructor
public class User extends BaseClass{

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Status status;

//   public User(String username, String password, Status status){
//        this.username = username;
//
//        this.password = password;
//
//        this.status = status;
//    }

}
