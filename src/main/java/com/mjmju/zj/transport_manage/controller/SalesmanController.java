package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.SalesmanInfo;
import com.mjmju.zj.transport_manage.service.SalesmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class SalesmanController {

    @Autowired
    SalesmanService salesmanService;

    @RequestMapping("salesmanQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",salesmanService.getTotalPage());
        return "allInfo/salesmanInfo";
    }

    @PostMapping("salesmanInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody SalesmanInfo salesmanInfo){
        salesmanService.insert(salesmanInfo);
        return "ture";
    }

    @PostMapping("salesmanUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody SalesmanInfo salesmanInfo){
        salesmanService.update(salesmanInfo);
        return "ture";
    }

    @PostMapping("salesmanDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        salesmanService.delete(id);
        return "ture";
    }

    @RequestMapping("salesmanFindByPhone/{phone}")
    @ResponseBody
    public SalesmanInfo findByPhone(@PathVariable("phone") String phone){
        return salesmanService.selectByPhone(phone);
    }

    @RequestMapping("salesmanSearch")
    @ResponseBody
    public List<SalesmanInfo> search(@RequestBody SalesmanInfo salesmanInfo){
        return salesmanService.search(salesmanInfo);
    }

    @RequestMapping("salesmanSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody SalesmanInfo salesmanInfo){
        return salesmanService.countSearch(salesmanInfo);
    }

    @RequestMapping("salesmanFindByName/{name}")
    @ResponseBody
    public List<SalesmanInfo> salesmanFindByName(@PathVariable("name") String name){
        return salesmanService.findByName(name);
    }


}
