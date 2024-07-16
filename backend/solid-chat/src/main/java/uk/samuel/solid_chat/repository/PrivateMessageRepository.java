package uk.samuel.solid_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.samuel.solid_chat.entity.model.PrivateMessage;

import java.util.List;

public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Long> {

    List<PrivateMessage> findByChatRoomId(Long id);
}
