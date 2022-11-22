package com.example.support_forum.json;

public class Message {
    private final int number;
    private final String message;
    public Message(int number, String message) {
        this.number = number;
        this.message = message;
    }
    public int getNumber() {
        return number;
    }
    public String getMessage() {
        return message;
    }
}
