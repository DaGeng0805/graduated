package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.Bill;
import com.mjmju.zj.transport_manage.entity.DriverInfo;
import com.mjmju.zj.transport_manage.entity.SiteManagerInfo;
import com.mjmju.zj.transport_manage.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

@Controller
@RequestMapping("/login")
public class LoginController {


    @Autowired
    LoginService loginService;

//    /**
//     * @Description: 检查电话是否在数据库内
//     * @Param: [phone]
//     * @return: java.lang.String
//     * @Author: 郑军
//     * @Date: 2020/2/3
//     */
//    @PostMapping("/manager")
//    public String checkManagerPhone(SiteManagerInfo siteManagerInfo){
//        String msg = loginService.checkManagerPhone(siteManagerInfo.getPhone());//1表示没有找到电话
//        return msg;
//    }
//
//    /**
//     * @Description: 检查电话是否在数据库内
//     * @Param: [phone]
//     * @return: java.lang.String
//     * @Author: 郑军
//     * @Date: 2020/2/3
//     */
//    @PostMapping("/driver")
//    public String cheekDriverPhone(DriverInfo driverInfo){
//        String msg = loginService.checkDriverPhone(driverInfo.getPhone());//1表示没有找到电话
//        return msg;
//    }
//
//    @PostMapping("/checkManagerCode")
//    @ResponseBody
//    public SiteManagerInfo checkManagerCode(SiteManagerInfo siteManagerInfo){
//        SiteManagerInfo siteManagerInfo1 = loginService.checkManagerCode(siteManagerInfo);
//        return siteManagerInfo1;
//    }
//
//    @PostMapping("/checkDriverCode")
//    @ResponseBody
//    public DriverInfo checkManagerCode(DriverInfo driverInfo){
//        DriverInfo driverInfo1 = loginService.checkDriverCode(driverInfo);
//        return driverInfo1;
//    }
//

}
