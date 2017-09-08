package it.notartel.gast.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GastWebSocketHandler extends TextWebSocketHandler {

	WebSocketSession session;
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		if (session != null && session.isOpen()) {
			session.sendMessage(new TextMessage("Websocket GAST: sei connesso a GAST!!!"));
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection established");
		this.session = session;
	}
	
}
