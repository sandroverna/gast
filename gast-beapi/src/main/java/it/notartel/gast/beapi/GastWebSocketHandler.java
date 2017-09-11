package it.notartel.gast.beapi;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GastWebSocketHandler extends TextWebSocketHandler {
	WebSocketSession session;
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		if (session != null && session.isOpen()) {
			System.out.println("Ricevuto messaggio: " + message.getPayload().toString() + " da: " + session.toString());
			session.sendMessage(message);
		} else {
			System.out.println("Non ci sono sessioni aperte per ricevere messaggi!");
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		this.session = session;
		System.out.println("Connessione stabilita con: " + session.toString());
		session.sendMessage(new TextMessage("Benvenuto su GAST!"));
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
		System.out.println("Connessione terminata con: " + session.toString());
	}
}
