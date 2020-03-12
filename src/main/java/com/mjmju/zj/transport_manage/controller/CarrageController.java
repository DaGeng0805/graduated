package com.mjmju.zj.transport_manage.controller;


import com.mjmju.zj.transport_manage.entity.CarrageContract;
import com.mjmju.zj.transport_manage.entity.Waybill;
import com.mjmju.zj.transport_manage.service.CarrageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CarrageController {

    @Autowired
    CarrageService carrageService;


    @RequestMapping("carrageAdd")
    public String carrageAdd(){
        return "distribute/carrageAdd";
    }

    @RequestMapping("carrageGoodsAdd/{contractNum}")
    public String carrageGoodsAdd(Model model,@PathVariable("contractNum")String contractNum){
        model.addAttribute("contractNum",contractNum);
        CarrageContract carrageContract = carrageService.selectByContractNum(contractNum);
        if (carrageContract.getStatus()==(byte)0){model.addAttribute("checkSend","false");}
        else {model.addAttribute("checkSend","true");}
        return "distribute/carrageGoodsAdd";
    }


    @RequestMapping("carrageQuery")
    public String waybillQuery(Model model){
        model.addAttribute("totalPage",carrageService.getTotalPage());
        return "distribute/carrageQuery";
    }

    @PostMapping("carrageInsert")
    @ResponseBody
    public String managerInsert(@RequestBody CarrageContract record){
        carrageService.insert(record);
        return "true";
    }

    @PostMapping("carrageDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        carrageService.delete(id);
        return "ture";
    }

    @PostMapping("carrageSearch")
    @ResponseBody
    public List<CarrageContract> search(@RequestBody CarrageContract record){
        System.out.println(record.toString());
        return carrageService.search(record);
    }

    @PostMapping("carrageSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody CarrageContract record){
        return carrageService.countSearch(record);
    }

    @RequestMapping("carrageUpdate")
    @ResponseBody
    public String carrageUpdate(@RequestBody CarrageContract record){
        carrageService.updateByPrimaryKeySelective(record);
        return "true";
    }

    @GetMapping("carrageFindByContractNum/{contractNum}")
    @ResponseBody
    public CarrageContract deleteByid(@PathVariable("contractNum") String contractNum){
        return carrageService.selectByContractNum(contractNum);
    }

    @GetMapping("carrageFindBycontractNum/{contractNum}")
    @ResponseBody
    public List<String> findByContractNum(@PathVariable("contractNum") String contractNum){
        return carrageService.findByContractNum(contractNum);
    }
}
