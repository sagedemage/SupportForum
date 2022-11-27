package com.example.support_forum;

import com.example.support_forum.json.Message;
import com.example.support_forum.db.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import com.example.support_forum.db.repositories.UserRepository;

@Controller
@RequestMapping(path="/api")
public class MainController {
    @Autowired

    private UserRepository userRepository;

    @PostMapping(path="/add")
     public @ResponseBody String addNewUser(@RequestParam String email, String password) {
        Users user = new Users();
        user.setEmail(email);
        user.setPassword(password);
        userRepository.save(user);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Users> getAllUsers() {
        return userRepository.findAll();
    }
    @GetMapping(path="/message")
    public Message greet() {
        return new Message(1, "help me");
    }
}
