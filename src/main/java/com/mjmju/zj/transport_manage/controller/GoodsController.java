package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.GoodsInfo;
import com.mjmju.zj.transport_manage.entity.Waybill;
import com.mjmju.zj.transport_manage.service.GoodsService;
import com.mjmju.zj.transport_manage.service.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class GoodsController {

    @Autowired
    GoodsService goodsService;

    @Autowired
    WaybillService waybillService;

    @RequestMapping("goodsAdd/{waybillNum}")
    public String GoodsAdd(@PathVariable("waybillNum")String waybillNum, Model model ) {
        Waybill waybill = waybillService.selectByWaybill(waybillNum);
        model.addAttribute("waybill",waybill);
        return "receiver/goodsAdd";
    }

    @PostMapping("goodsDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        goodsService.delete(id);
        return "ture";
    }

    @PostMapping("goodsInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody GoodsInfo record){
        goodsService.insert(record);
        return "ture";
    }

    @PostMapping("goodsUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody GoodsInfo record){
        System.out.println(record.toString());
        goodsService.update(record);
        return "ture";
    }

    @RequestMapping("goodsSelectByWaybillNum/{waybillNum}")
    @ResponseBody
    public List<GoodsInfo> goodsSelectByWaybillNum(@PathVariable("waybillNum")String waybillNum) {
        return goodsService.selectByWaybill(waybillNum);
    }

    @GetMapping("goodsFindByContractNum/{contractNum}")
    @ResponseBody
    public List<GoodsInfo> deleteByid( @PathVariable("contractNum") String contractNum){
        return goodsService.selectCarrageGoods(contractNum);
    }

    @GetMapping("goodsFindById/{id}")
    @ResponseBody
    public GoodsInfo goodsFindById( @PathVariable("id") Integer id){
        return goodsService.selectById(id);
    }

    @GetMapping("goodsFindByGoodsNum/{goodsNum}")
    @ResponseBody
    public GoodsInfo goodsFindById( @PathVariable("goodsNum") String goodsNum){
        return goodsService.selectByGoodsNum(goodsNum);
    }

    @RequestMapping("goodsSelectByGoodsNum/{goodsNum}")
    @ResponseBody
    public List<String> goodsFindByGoodsNum(@PathVariable("goodsNum")String goodsNum) {
        System.out.println("yo");
        return goodsService.findByGoodsNum(goodsNum);
    }
}
