package uk.samuel.solid_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.samuel.solid_chat.entity.model.PublicMessage;

public interface PublicMessageRepository extends JpaRepository<PublicMessage, Long> {
}
