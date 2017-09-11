package it.notartel.gast.beapi;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

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
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
		
		for(WebSocketSession webSocketSession : sessions) {
			//Message sessionMessage = new Gson().fromJson(message.getPayload(), Message.class);
			//Map mapvalue = new Gson().fromJson(message.getPayload(), Map.class);
		    //System.out.println("MESSAGE = " + sessionMessage.toString());
			webSocketSession.sendMessage(message);
		}
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.
		sessions.add(session);
		System.out.println("Connessione stabilita con: " + session.toString());
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
