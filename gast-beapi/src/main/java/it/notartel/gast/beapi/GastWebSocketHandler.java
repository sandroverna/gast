package it.notartel.gast.beapi;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GastWebSocketHandler extends TextWebSocketHandler {

    /*WebSocketSession session;

    // This will send only to one client(most recently connected)
    public void counterIncrementedCallback(int counter) {
        System.out.println("Trying to send:" + counter);
        if (session != null && session.isOpen()) {
            try {
                System.out.println("Now sending:" + counter);
                session.sendMessage(new TextMessage("{\"value\": \"" + counter + "\"}"));
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Don't have open session to send:" + counter);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Connection established");
        this.session = session;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {
        if ("CLOSE".equalsIgnoreCase(message.getPayload())) {
            session.close();
        } else {
            System.out.println("Received:" + message.getPayload());
        }
    }*/
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
