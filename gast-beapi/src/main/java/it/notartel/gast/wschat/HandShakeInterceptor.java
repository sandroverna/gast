package it.notartel.gast.beapi;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

public class HandShakeInterceptor extends HttpSessionHandshakeInterceptor {


	@Override
	public boolean beforeHandshake(ServerHttpRequest request,ServerHttpResponse response, WebSocketHandler wsHandler,Map<String, Object> attributes) throws Exception {
	    /*System.out.println(">>>>>>>>>>>Before Handshake<<<<<<<<<<<<<<");
	    System.out.println("REQUEST HEADERS = " + request.getHeaders().toString());
	    System.out.println("REQUEST URI = " + request.getURI().toString());
	    System.out.println("REQUEST BODY MESSAGE = " + request.getBody().toString());
	    System.out.println("ATTRIBUTES = " + attributes.toString());
	    System.out.println("RESPONSE = " + response.toString());*/
	    return super.beforeHandshake(request, response, wsHandler, attributes);
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,Exception ex) {
		/*System.out.println(">>>>>>>>>>>After Handshake<<<<<<<<<<<<<<");
	    System.out.println("REQUEST HEADERS = " + request.getHeaders().toString());
	    System.out.println("REQUEST URI = " + request.getURI().toString());
	    System.out.println("RESPONSE = " + response.toString());*/
	    super.afterHandshake(request, response, wsHandler, ex);
	}
}
