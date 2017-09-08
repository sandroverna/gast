package it.notartel.gast.beapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
@EnableScheduling
public class WebSocketConfig  implements WebSocketConfigurer {

	@Autowired
	GastWebSocketHandler gastWSocketHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(gastWSocketHandler, "/gastwebsocket").addInterceptors(new HttpSessionHandshakeInterceptor()).setAllowedOrigins("*");
	}
}
