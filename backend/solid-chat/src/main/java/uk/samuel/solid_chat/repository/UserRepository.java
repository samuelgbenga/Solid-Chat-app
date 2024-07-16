package uk.samuel.solid_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uk.samuel.solid_chat.entity.enums.Status;
import uk.samuel.solid_chat.entity.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByStatus(Status status);

    Optional<User> findByUsername(String userName);
}
