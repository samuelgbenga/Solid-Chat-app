package uk.samuel.solid_chat.service;

import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.UserLoginRequest;
import uk.samuel.solid_chat.payload.request.UserRequest;

import java.util.List;

public interface UserService {

    User connect(UserRequest request);

    User disconnected(UserRequest request);

    List<User> getConnectedUsers();

    User loadUser(UserLoginRequest loginRequest);

    User findUserById(Long id);
}
