package com.mjmju.zj.transport_manage.configuration;


import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisConfiguration {

    @Bean
    public ConfigurationCustomizer mybatis() {
//        return  customize(configuration) -> {
//            configuration.setMapUnderscoreToCamelCase(true);
//            configuration.setUseGeneratedKeys(true);
//            configuration.setLazyLoadingEnabled(true);
//            configuration.setAggressiveLazyLoading(false);
//        };

        return new ConfigurationCustomizer() {
            @Override
            public void customize(org.apache.ibatis.session.Configuration configuration) {
                configuration.setMapUnderscoreToCamelCase(true);
                configuration.setUseGeneratedKeys(true);
                configuration.setLazyLoadingEnabled(true);
                configuration.setAggressiveLazyLoading(false);
                configuration.setCacheEnabled(false);
            }
        };



    }
}
