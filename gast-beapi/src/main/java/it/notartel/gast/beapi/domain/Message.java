package it.notartel.gast.beapi.domain;

public class Message {
	private String content;
	
	public Message(String content) {
		super();
		this.content = content;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
