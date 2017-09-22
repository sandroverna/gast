package it.notartel.gast.wschat.handlers;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import it.notartel.gast.wschat.dto.Room;
import it.notartel.gast.wschat.util.Util;

@Component
public class GASTWebSocketHandler extends TextWebSocketHandler {
	private ConcurrentHashMap<String, Room> map = new ConcurrentHashMap<String, Room>();
	
	private String getRoom(WebSocketSession session) {
		Map<String, String> queryString = Util.getQueryMap(session.getUri().getQuery());
		if (queryString.containsKey("room")) {
			return queryString.get("room");
		}
		
		return null;
	}
	
	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws InterruptedException, IOException {
		String roomId = this.getRoom(session);
		if (roomId != null) {
			Room room = map.get(roomId);
			List<WebSocketSession> sessions = room.getUsers();
					
			for(WebSocketSession webSocketSession : sessions) {
				webSocketSession.sendMessage(message);
			}
					
			room.getMessages().add(message);
		}
	}
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//the messages will be broadcasted to all users.
		//HttpHeaders headers = session.getHandshakeHeaders();
		//System.out.println("[ID = " + session.getId() + " HEADERS = " + headers.toString() + "]");
		//System.out.println("[ID = " + session.getId() + " URL = " + session.getUri().getPath() + "]");
		//System.out.println("[ID = " + session.getId() + " PARAMS = " + session.getUri().getQuery() + "]");
		System.out.println("Connessione stabilita con: " + session.toString());
		
		String roomId = this.getRoom(session);
		
		if (roomId != null) {
			if (!map.containsKey(roomId)) {
				Room room = new Room(roomId);
				room.getUsers().add(session);
				map.put(roomId, room);
			} else {
				map.get(roomId).getUsers().add(session);
			}
			
			map.get(roomId).getMessages().forEach(m -> {
				try {
					session.sendMessage(m);
				} catch (IOException e) {
					e.printStackTrace();
				}
			});
		} else {
			session.close();
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession terminatedSession, CloseStatus status) throws Exception {
		String roomId = this.getRoom(terminatedSession);
		
		if (roomId != null) {
			Optional<WebSocketSession> session = map.get(roomId).getUsers().
					stream().
					filter(s -> s.getId().equals(terminatedSession.getId())).
					findFirst();
			
			session.ifPresent(map.get(roomId).getUsers()::remove);
			System.out.println("Connessione terminata con: " + terminatedSession.toString());
		}
	}
}
