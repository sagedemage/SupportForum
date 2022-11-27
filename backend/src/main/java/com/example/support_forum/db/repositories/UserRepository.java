package com.example.support_forum.db.repositories;

import com.example.support_forum.db.models.Users;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, Integer> {

}
