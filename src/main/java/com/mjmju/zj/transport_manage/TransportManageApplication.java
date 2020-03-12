package com.mjmju.zj.transport_manage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@MapperScan(value = "com.fteplus.transport.mapper")
@MapperScan(value = "com.mjmju.zj.transport_manage.mapper")
@SpringBootApplication
public class TransportManageApplication {

    public static void main(String[] args) {
        SpringApplication.run(TransportManageApplication.class, args);
    }
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper().disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }
}
