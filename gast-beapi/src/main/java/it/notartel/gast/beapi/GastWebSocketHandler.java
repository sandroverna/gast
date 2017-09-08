package it.notartel.gast.beapi;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GastWebSocketHandler extends TextWebSocketHandler {
	WebSocketSession session;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("SESSION VALUE = " + session.toString());
		System.out.println("MESSAGE GETPAYLOAD = " + message.toString());
		
		if (session != null && session.isOpen()) {
			try {
				session.sendMessage(new TextMessage("{\"message\": \"Benvenuto su GAST!!!!!\"}"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			System.out.println("Non ci sono sessioni aperte per inviare il messaggio");
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connessione stabilita");
		this.session = session;
	}
	
}
