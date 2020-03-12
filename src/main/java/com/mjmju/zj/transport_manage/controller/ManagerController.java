package com.mjmju.zj.transport_manage.controller;


import com.mjmju.zj.transport_manage.entity.SiteManagerInfo;
import com.mjmju.zj.transport_manage.entity.StationInfo;
import com.mjmju.zj.transport_manage.mapper.StationInfoMapper;
import com.mjmju.zj.transport_manage.service.ManagerService;
import com.mjmju.zj.transport_manage.service.StationInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class ManagerController {

    @Autowired
    ManagerService managerService;



    @Autowired
    StationInfoService stationInfoService;

    @RequestMapping("testCookie")
    public String testCookie(HttpServletRequest request, HttpServletResponse response){
        Cookie cookie = new Cookie("biggest","18760533101");
        Cookie cookieid = new Cookie("userid","1456");
        cookie.setMaxAge(360000);
        response.addCookie(cookieid);
        response.addCookie(cookie);
        return "allInfo/managerInfo";
    }

    @RequestMapping("managerQuery")
    public String managerQuery(Model model){
        model.addAttribute("totalPage",managerService.getTotalPage());
        return "allInfo/managerInfo";
    }

    @RequestMapping("managerPage/{page}")
    @ResponseBody
    public List<SiteManagerInfo> selectWithPage(@PathVariable("page")Integer page, Model model){
        List<SiteManagerInfo> detailBills = managerService.selectWithPage(page, model);
        return detailBills;
    }

    @PostMapping("managerInsert")
    @ResponseBody
    public String managerInsert(@RequestBody SiteManagerInfo siteManagerInfo){
        managerService.insert(siteManagerInfo);
        StationInfo stationInfo = new StationInfo();
        stationInfo.setStationName(siteManagerInfo.getAddr());
        stationInfo.setManagerName(siteManagerInfo.getName());
        stationInfo.setManagerPhone(siteManagerInfo.getPhone());
        stationInfoService.updateManager(stationInfo);
        return "ture";
    }

    @PostMapping("deleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){

        managerService.delete(id);
        return "ture";
    }

    @RequestMapping("managerFindByPhone/{phone}")
    @ResponseBody
    public SiteManagerInfo findByPhone(@PathVariable("phone") String phone){
        return managerService.selectByPhone(phone);
    }


    @RequestMapping("managerSearch")
    @ResponseBody
    public List<SiteManagerInfo> search(@RequestBody SiteManagerInfo siteManagerInfo){
        System.out.println(siteManagerInfo.toString());
        return managerService.search(siteManagerInfo);
    }

    @RequestMapping("managerSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody SiteManagerInfo siteManagerInfo){
        System.out.println(siteManagerInfo.toString());
        return managerService.countSearch(siteManagerInfo);
    }

    @RequestMapping("managerFindByName/{name}")
    @ResponseBody
    public List<SiteManagerInfo> salesmanFindByName(@PathVariable("name") String name){
        return managerService.findByName(name);
    }
}
