package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.CustomerInfo;
import com.mjmju.zj.transport_manage.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @RequestMapping("customerQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",customerService.getTotalPage());
        return "allInfo/customerInfo";
    }

    @PostMapping("customerInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody CustomerInfo record){
        customerService.insert(record);
        return "ture";
    }

    @PostMapping("customerUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody CustomerInfo record){
        customerService.update(record);
        return "ture";
    }

    @PostMapping("customerDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        customerService.delete(id);
        return "ture";
    }

    @RequestMapping("customerFindByPhone/{phone}")
    @ResponseBody
    public CustomerInfo findByPhone(@PathVariable("phone") String phone){
        return customerService.selectByPhone(phone);
    }

    @RequestMapping("customerSearch")
    @ResponseBody
    public List<CustomerInfo> search(@RequestBody CustomerInfo record){
        return customerService.search(record);
    }

    @RequestMapping("customerSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody CustomerInfo record){
        return customerService.countSearch(record);
    }
}
