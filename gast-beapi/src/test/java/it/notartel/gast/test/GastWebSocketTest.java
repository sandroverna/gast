package it.notartel.gast.test;


import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.socket.client.WebSocketClient;

import it.notartel.gast.beapi.Application;

@RunWith(SpringRunner.class)
@SpringBootTest(classes={Application.class})
public class GastWebSocketTest {
	
	//private static final String WEBSOCKET_URI = "ws://localhost:8080/gastwebsocket";
	
	WebSocketClient gastWebSocketClient;
	
	private static Logger log = Logger.getLogger(GastWebSocketTest.class);
	
    @Test
    public void test1() throws Exception {
    	log.info("TEST 1");
    }

}