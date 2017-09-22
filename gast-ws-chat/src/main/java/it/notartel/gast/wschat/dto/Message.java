package it.notartel.gast.wschat.dto;

public class Message {
	private String author;
	private String message;
	private String newDate;
	
	public Message(String author, String message, String newDate) {
		this.author = author;
		this.message = message;
		this.newDate = newDate;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public void setAuthor(String author) {
		this.author = author;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getNewDate() {
		return newDate;
	}
	
	public void setNewDate(String newDate) {
		this.newDate = newDate;
	}

	@Override
	public String toString() {
		return "Message [author=" + author + ", message=" + message + ", newDate=" + newDate + "]";
	}
}
