package com.example.support_forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@SpringBootApplication
@ComponentScan("com.example.support_forum.db.repositories")
public class SupportForumApplication {
	public static void main(String[] args) {
		SpringApplication.run(SupportForumApplication.class, args);
	}
}
