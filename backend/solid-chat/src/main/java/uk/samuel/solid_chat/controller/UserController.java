package uk.samuel.solid_chat.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import uk.samuel.solid_chat.entity.model.User;
import uk.samuel.solid_chat.payload.request.UserLoginRequest;
import uk.samuel.solid_chat.payload.request.UserRequest;
import uk.samuel.solid_chat.service.UserService;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    // handles user connection or login
    @MessageMapping("/user.addUser")
    @SendTo("/online")
    public User addUser(@Payload UserRequest request) {
        return userService.connect(request);
    }

    @MessageMapping("/user.disconnect")
    @SendTo("/online")
    public User disconnectUser(@Payload UserRequest request) {
        return userService.disconnected(request);
    }


    // get list of connected or online users
    @GetMapping("/users")
    public List<User> getConnectedUsers() {
        return userService.getConnectedUsers();
    }


    // login new user
    @PostMapping("/login")
    public User signIn (@RequestBody UserLoginRequest request) {
        return userService.loadUser(request);
    }




}
