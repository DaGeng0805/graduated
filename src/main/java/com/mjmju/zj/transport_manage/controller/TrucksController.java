package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.TrucksInfo;
import com.mjmju.zj.transport_manage.service.TrucksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TrucksController {
    @Autowired
    TrucksService trucksService;

    @RequestMapping("truckQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",trucksService.getTotalPage());
        return "allInfo/truckInfo";
    }

    @PostMapping("truckInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody TrucksInfo srucksInfo){
        trucksService.insert(srucksInfo);
        return "ture";
    }

    @PostMapping("truckDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        trucksService.delete(id);
        return "ture";
    }

    @GetMapping("truckSelectByPlateNum/{plateNum}")
    @ResponseBody
    public TrucksInfo struckSelectByPlateNum( @PathVariable("plateNum") String plateNum){
        return trucksService.selectByPlateNum(plateNum);
    }

    @RequestMapping("truckSearch")
    @ResponseBody
    public List<TrucksInfo> search(@RequestBody TrucksInfo trucksInfo){
        System.out.println(trucksInfo.toString());
        return trucksService.search(trucksInfo);
    }

    @RequestMapping("truckSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody TrucksInfo trucksInfo){
//        System.out.println(trucksInfo.toString());
        return trucksService.countSearch(trucksInfo);
    }

    @RequestMapping("driverSelect")
    @ResponseBody
    public List<TrucksInfo> driverSelect(@RequestBody TrucksInfo trucksInfo){
        return trucksService.driverSelect(trucksInfo);
    }




}
