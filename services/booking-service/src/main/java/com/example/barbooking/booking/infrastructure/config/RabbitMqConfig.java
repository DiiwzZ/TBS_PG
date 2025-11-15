package com.example.barbooking.booking.infrastructure.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    public static final String BOOKING_EXCHANGE = "booking.exchange";
    public static final String NO_SHOW_QUEUE = "booking.noshow.queue";
    public static final String NO_SHOW_ROUTING_KEY = "booking.noshow";

    @Bean
    public Exchange bookingExchange() {
        return ExchangeBuilder.topicExchange(BOOKING_EXCHANGE)
                .durable(true)
                .build();
    }

    @Bean
    public Queue noShowQueue() {
        return QueueBuilder.durable(NO_SHOW_QUEUE).build();
    }

    @Bean
    public Binding noShowBinding(Queue noShowQueue, Exchange bookingExchange) {
        return BindingBuilder.bind(noShowQueue)
                .to(bookingExchange)
                .with(NO_SHOW_ROUTING_KEY)
                .noargs();
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }
}

