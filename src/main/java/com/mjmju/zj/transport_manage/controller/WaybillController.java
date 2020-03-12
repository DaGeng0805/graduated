package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.Waybill;
import com.mjmju.zj.transport_manage.service.TrucksService;
import com.mjmju.zj.transport_manage.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class WaybillController {

    @Autowired
    WaybillService waybillService;

    @RequestMapping("waybillAdd")
    public String waybillAdd(){
        return "receiver/waybillAdd";
    }

    @RequestMapping("waybillQuery")
    public String waybillQuery(Model model){
        model.addAttribute("totalPage",waybillService.getTotalPage());
        return "receiver/waybill";
    }

    @PostMapping("waybillInsert")
    @ResponseBody
    public String managerInsert(@RequestBody Waybill waybill){
        waybillService.insert(waybill);
        return "ture";
    }

    @PostMapping("waybillDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        waybillService.delete(id);
        return "ture";
    }

    @RequestMapping("waybillSearch")
    @ResponseBody
    public List<Waybill> search(@RequestBody Waybill waybill){
        System.out.println(waybill.toString());
        return waybillService.search(waybill);
    }

    @RequestMapping("waybillSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody Waybill waybill){
        return waybillService.countSearch(waybill);
    }

    @RequestMapping("waybillUpdate")
    @ResponseBody
    public String waybillInsert(@RequestBody Waybill waybill){
        waybillService.updateByPrimaryKeySelective(waybill);
        return "true";
    }

    @GetMapping("waybillFindByWaybill/{waybillNum}")
    @ResponseBody
    public Waybill deleteByid( @PathVariable("waybillNum") String waybillNum){
        return waybillService.selectByWaybill(waybillNum);
    }
}
