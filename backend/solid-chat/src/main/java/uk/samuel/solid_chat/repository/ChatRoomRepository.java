package uk.samuel.solid_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.samuel.solid_chat.entity.model.ChatRoom;
import uk.samuel.solid_chat.entity.model.User;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findBySenderAndReceiver(User sender, User receiver);
}
