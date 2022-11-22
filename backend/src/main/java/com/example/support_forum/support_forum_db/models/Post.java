package com.example.support_forum.support_forum_db.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;

@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "email")
    private String title;

    @Column(name = "username")
    private String description;

    @Column(name = "password")
    private String user_id;
}
