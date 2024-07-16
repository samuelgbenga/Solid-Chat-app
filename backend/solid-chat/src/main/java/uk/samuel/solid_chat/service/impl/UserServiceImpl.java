package uk.samuel.solid_chat.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uk.samuel.solid_chat.entity.enums.Status;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.UserLoginRequest;
import uk.samuel.solid_chat.payload.request.UserRequest;
import uk.samuel.solid_chat.repository.UserRepository;
import uk.samuel.solid_chat.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User connect(UserRequest request) {

        // cannot connect if the user does not exist
        Optional<User> checkUser = userRepository.findByUsername(request.getUsername());
        if (checkUser.isPresent()) {
            User storedUser = checkUser.get();
            storedUser.setStatus(Status.ONLINE);
            return userRepository.save(storedUser);
        }

        return null;
    }

    @Override
    public User disconnected(UserRequest request) {

        // cannot  disconnect if the user does not exist
        Optional<User> checkUser = userRepository.findByUsername(request.getUsername());
        if (checkUser.isPresent()) {
            User storedUser = checkUser.get();
            storedUser.setStatus(Status.OFFLINE);
            return userRepository.save(storedUser);
        }
        return null;
    }

    @Override
    public List<User> getConnectedUsers() {
        return userRepository.findByStatus(Status.ONLINE);
    }

    @Override
    public User loadUser(UserLoginRequest loginRequest) {
        // load new or existing user
        User returnedUser;
        Optional<User> checkUser = userRepository.findByUsername(loginRequest.getUsername());
        if (checkUser.isPresent()) {
            returnedUser = checkUser.get();
            return returnedUser;
        }
        returnedUser = new User(
                loginRequest.getUsername(),
                loginRequest.getPassword(),
                Status.OFFLINE
        );
        return userRepository.save(returnedUser);

    }

    @Override
    public User findUserById(Long id) {

        Optional<User> checkUser = userRepository.findById(id);
        if (checkUser.isPresent()) {
            return checkUser.get();
        }

        return null;
    }
}
