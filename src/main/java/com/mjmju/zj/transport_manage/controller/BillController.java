package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.Bill;
import com.mjmju.zj.transport_manage.mapper.BillMapper;
import com.mjmju.zj.transport_manage.service.BillService;
//import com.mjmju.zj.transport_manage.service.IBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BillController {

    @Autowired
    BillService billService;



    @RequestMapping("billAddpage")
    public String index(Model model){
        model.addAttribute("beginNum",billService.selectMaxBeginNum());
        return "bill/billAdd";
    }

    @RequestMapping("billAdd")
    @ResponseBody
    public String add(Bill bill){
        billService.add(bill);
        return "true";
    }
}
