package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.CarrageGoods;
import com.mjmju.zj.transport_manage.service.CarrageGoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CarrageGoodsContriller {

    @Autowired
    CarrageGoodsService carrageGoodsService;

    @PostMapping("carrageGoodsInsertOrUpdate")
    @ResponseBody
    public String carrageGoodsInsertOrUpdate(@RequestBody CarrageGoods carrageGoods){
        carrageGoodsService.insertOrUpdate(carrageGoods);
        return "true";
    }

    @PostMapping("carrageGoodsDelete")
    @ResponseBody
    public String carrageGoodsDelete(@RequestBody CarrageGoods carrageGoods){
        carrageGoodsService.DByContractNumAndGoodsNum(carrageGoods);
        return "true";
    }

    @GetMapping("carrageGoodByContractNum/{contractNum}")
    @ResponseBody
    public List<CarrageGoods> carrageGoodSByContractNum(@PathVariable("contractNum")String contractNum){
        return carrageGoodsService.SByContractNum(contractNum);
    }


}
