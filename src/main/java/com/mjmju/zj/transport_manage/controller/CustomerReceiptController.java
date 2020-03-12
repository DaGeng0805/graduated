package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.CustomerReceipt;
import com.mjmju.zj.transport_manage.entity.DriverReceipt;
import com.mjmju.zj.transport_manage.service.CustomerRecepitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerReceiptController {

    @Autowired
    CustomerRecepitService customerRecepitService;

    @RequestMapping("customerReceiveQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",customerRecepitService.getTotalPage());
        return "receipt/customerRecepit";
    }

    @PostMapping("customerReceiveInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody CustomerReceipt record){
        customerRecepitService.insert(record);
        return "ture";
    }

    @PostMapping("customerReceiveUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody CustomerReceipt record){
        customerRecepitService.update(record);
        return "ture";
    }

    @PostMapping("customerReceiveDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        customerRecepitService.delete(id);
        return "ture";
    }

    @RequestMapping("customerReceiveFindByGoodsNum/{goodsNum}")
    @ResponseBody
    public CustomerReceipt selectByContractNum(@PathVariable("goodsNum") String goodsNum){
        return customerRecepitService.selectByGoodsNum(goodsNum);
    }

    @RequestMapping("customerReceiveSearch")
    @ResponseBody
    public List<CustomerReceipt> search(@RequestBody CustomerReceipt record){
        return customerRecepitService.search(record);
    }

    @RequestMapping("customerReceiveSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody CustomerReceipt record){
        return customerRecepitService.countSearch(record);
    }
}
