package com.mjmju.zj.transport_manage.configuration;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.HiddenHttpMethodFilter;

import javax.servlet.Servlet;

@Configuration
public class DruidConfiguration {


    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DruidDataSource druidDataSource(){
        return new DruidDataSource();
    }

    /**
     * 配置访问druid后台检测
     * @return
     */
    @Bean
    public ServletRegistrationBean StatViewServlet(){
        ServletRegistrationBean<Servlet> bean = new ServletRegistrationBean<>(new StatViewServlet());
        bean.addUrlMappings("/druid/*");
        bean.addInitParameter("loginUsername","admin");
        bean.addInitParameter("loginPassword","admin");
        return bean;
    }

    /**
     * 配置druid监控设置
     * @return
     */
    @Bean
    public FilterRegistrationBean webStatFilter(){
        FilterRegistrationBean bean = new FilterRegistrationBean(new WebStatFilter());
        bean.addUrlPatterns("/*");
        bean.addInitParameter("exclusions","*.js, *.css, /druid/*");
        return bean;
    }


//    @Bean
//    public FilterRegistrationBean myHiddenHttpMethodFilter(){
//        FilterRegistrationBean bean = new FilterRegistrationBean(new HiddenHttpMethodFilter());
//        bean.addUrlPatterns("/*");
//        return bean;
//    }

}
