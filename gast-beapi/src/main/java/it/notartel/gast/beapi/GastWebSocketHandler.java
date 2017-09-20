package it.notartel.gast.beapi;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

import it.notartel.gast.beapi.model.Message;

@Component
public class GastWebSocketHandler extends TextWebSocketHandler {
	List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	List<TextMessage> messages = new CopyOnWriteArrayList<>();
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
		System.out.println("MESSAGGIO RICEVUTO PAYLOAD = " + message.getPayload().toString());
		
		for(WebSocketSession webSocketSession : sessions) {
			webSocketSession.sendMessage(message);
		}
		
		messages.add(message);
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.
		System.out.println("Connessione stabilita con: " + session.toString());
		HttpHeaders headers = session.getHandshakeHeaders();
		
		System.out.println("[ID = " + session.getId() + " HEADERS = " + headers.toString() + "]");
		System.out.println("[ID = " + session.getId() + " URL = " + session.getUri().getPath() + "]");
		System.out.println("[ID = " + session.getId() + " PARAMS = " + session.getUri().getQuery() + "]");
		
		Map<String, String> queryString = Util.getQueryMap(session.getUri().getQuery());
		System.out.println("ROOM = " + queryString.get("room"));
		
		sessions.add(session);
		
		messages.forEach(m -> {
			try {
				session.sendMessage(m);
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession terminatedSession, CloseStatus status) throws Exception {
		
		Optional<WebSocketSession> session = sessions.
				stream().
				filter(s -> s.getId().equals(terminatedSession.getId())).
				findFirst();
		
		session.ifPresent(sessions::remove);
		System.out.println("Connessione terminata con: " + terminatedSession.toString());
	}
}
