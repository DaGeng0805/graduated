package com.mjmju.zj.transport_manage.controller;


import com.mjmju.zj.transport_manage.entity.StationInfo;
import com.mjmju.zj.transport_manage.service.StationInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class StationInfoController {

    @Autowired
    StationInfoService stationInfoService;

    @RequestMapping("getListStationName/{stationName}")
    @ResponseBody
    public List<String> getListStationName(@PathVariable("stationName")String stationName){
        return stationInfoService.findByName(stationName);
    }

    @RequestMapping("checkStationName/{stationName}")
    @ResponseBody
    public StationInfo checkStationName(@PathVariable("stationName")String stationName){
        return stationInfoService.checkByName(stationName);
    }

    @RequestMapping("checkOnlyManager/{stationName}")
    @ResponseBody
    public String checkOnlyManager(@PathVariable("stationName")String stationName){
        return stationInfoService.checkOnlyManager(stationName);
    }


    @RequestMapping("stationQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",stationInfoService.getTotalPage());
        return "allInfo/stationInfo";
    }

    @PostMapping("stationInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody StationInfo record){
        stationInfoService.insert(record);
        return "ture";
    }

    @PostMapping("stationUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody StationInfo record){
        stationInfoService.update(record);
        return "ture";
    }

    @PostMapping("stationDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        stationInfoService.delete(id);
        return "ture";
    }

    @RequestMapping("stationSearch")
    @ResponseBody
    public List<StationInfo> search(@RequestBody StationInfo record){
        return stationInfoService.search(record);
    }

    @RequestMapping("stationSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody StationInfo record){
        return stationInfoService.countSearch(record);
    }

    @RequestMapping("stationFindById/{id}")
    @ResponseBody
    public StationInfo stationFindById(@PathVariable("id") Integer id){
        return stationInfoService.findById(id);
    }
}
