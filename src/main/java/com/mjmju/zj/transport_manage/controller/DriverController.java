package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.DriverInfo;
import com.mjmju.zj.transport_manage.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class DriverController {
    @Autowired
    DriverService driverService;


    @RequestMapping("driverQuery")
    public String managerQuery(Model model){
        model.addAttribute("totalPage",driverService.getTotalPage());
        return "allInfo/driverInfo";
    }


    @PostMapping("driverInsert")
    @ResponseBody
    public String managerInsert(@RequestBody DriverInfo driverInfo){
        driverService.insert(driverInfo);
        return "ture";
    }

    @PostMapping("driverDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        driverService.delete(id);
        return "ture";
    }

    @RequestMapping("driverFindByPhone/{phone}")
    @ResponseBody
    public DriverInfo findByPhone(@PathVariable("phone") String phone){
        return driverService.selectByPhone(phone);
    }

    @RequestMapping("driverFindByLicence/{licence}")
    @ResponseBody
    public DriverInfo driverFindByLicence(@PathVariable("licence") String licence){
        return driverService.selectByLicence(licence);
    }


    @RequestMapping("driverSearch")
    @ResponseBody
    public List<DriverInfo> search(@RequestBody DriverInfo driverInfo){
        return driverService.search(driverInfo);
    }

    @RequestMapping("driverSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody DriverInfo driverInfo){
        return driverService.countSearch(driverInfo);
    }

    @RequestMapping("driverFindByName/{name}")
    @ResponseBody
    public List<DriverInfo> salesmanFindByName(@PathVariable("name") String name){
        return driverService.findByName(name);
    }


}
