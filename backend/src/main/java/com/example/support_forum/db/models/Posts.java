package com.example.support_forum.db.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;

    private String description;

    private Integer user_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String title) {
        this.description = description;
    }

    public Integer getUser_Id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }




}
