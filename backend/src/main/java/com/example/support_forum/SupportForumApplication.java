package com.example.support_forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.example.support_forum.UserRepository")
public class SupportForumApplication {
	public static void main(String[] args) {
		SpringApplication.run(SupportForumApplication.class, args);
	}
}
