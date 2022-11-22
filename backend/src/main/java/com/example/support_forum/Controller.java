package com.example.support_forum;

import com.example.support_forum.json.Message;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("message")
    public Message greet() {
        return new Message(1, "help me");
    }
}
