package com.example.support_forum.support_forum_db.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.support_forum.support_forum_db.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}
