package it.notartel.gast.beapi.model;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Room {
	private String id;
	private List<WebSocketSession> users;
	private List<TextMessage> messages;
	
	public Room(String id) {
		this.id = id;
		this.users = new CopyOnWriteArrayList<>();
		this.messages = new CopyOnWriteArrayList<>();
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public List<WebSocketSession> getUsers() {
		return users;
	}
	
	public void setUsers(List<WebSocketSession> users) {
		this.users = users;
	}
	
	public List<TextMessage> getMessages() {
		return messages;
	}
	
	public void setMessages(List<TextMessage> messages) {
		this.messages = messages;
	}
}
