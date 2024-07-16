package uk.samuel.solid_chat.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {



    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        // Step 1: Create a content type resolver
        DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();

        // Step 2: Set the default MIME type to application/json
        resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);

        // Step 3: Create a new Jackson message converter
        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();

        // Step 4: Set a custom ObjectMapper on the converter
        converter.setObjectMapper(new ObjectMapper());

        // Step 5: Set the content type resolver on the converter
        converter.setContentTypeResolver(resolver);

        // Step 6: Add the converter to the list of message converters
        messageConverters.add(converter);

        // Step 7: Return false to indicate that no further configuration is needed
        return false;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // with this you can access the backend via ws://origin/ws
        registry.addEndpoint("/ws");

        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // create brokers prefix to handle messages on the background (subscribed to)
        registry.enableSimpleBroker("/user", "/online", "/public");

        // set the app prefix: that needs to be included to access
        // methods in the controller
        registry.setApplicationDestinationPrefixes("/app");

        // this is used to handle private message for a particular user
        registry.setUserDestinationPrefix("/user");
    }
}
