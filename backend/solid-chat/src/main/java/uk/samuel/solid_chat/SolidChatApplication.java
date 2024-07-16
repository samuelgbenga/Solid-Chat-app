package uk.samuel.solid_chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uk.samuel.solid_chat.entity.enums.Status;
import uk.samuel.solid_chat.entity.model.User;

@SpringBootApplication
public class SolidChatApplication {

	public static void main(String[] args) {

		SpringApplication.run(SolidChatApplication.class, args);
	}

}
