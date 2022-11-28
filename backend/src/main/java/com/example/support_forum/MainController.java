package com.example.support_forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class MainController {
    //@Autowired // bean called userRepository
    //private UserRepository userRepository;

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public String addNewUser(@RequestParam String username
            , @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        n.setUsername(username);
        n.setPassword(password);
        //userRepository.save(n);
        return "Saved";
    }
}
