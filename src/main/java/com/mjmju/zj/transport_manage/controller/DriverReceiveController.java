package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.DriverReceipt;
import com.mjmju.zj.transport_manage.entity.SalesmanInfo;
import com.mjmju.zj.transport_manage.service.DriverReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class DriverReceiveController {

    @Autowired
    DriverReceiptService driverReceiptService;

    @RequestMapping("driverReceiveQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",driverReceiptService.getTotalPage());
        return "receipt/driverReceipt";
    }

    @PostMapping("driverReceiveInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody DriverReceipt driverReceipt){
        driverReceiptService.insert(driverReceipt);
        return "ture";
    }

    @PostMapping("driverReceiveUpdate")
    @ResponseBody
    public String salesmanUpdate(@RequestBody DriverReceipt driverReceipt){
        driverReceiptService.update(driverReceipt);
        return "ture";
    }

    @PostMapping("driverReceiveDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        driverReceiptService.delete(id);
        return "ture";
    }

    @RequestMapping("driverReceiveFindByContractNum/{contractNum}")
    @ResponseBody
    public DriverReceipt selectByContractNum(@PathVariable("contractNum") String contractNum){
        return driverReceiptService.selectByContractNum(contractNum);
    }

    @RequestMapping("driverReceiveSearch")
    @ResponseBody
    public List<DriverReceipt> search(@RequestBody DriverReceipt driverReceipt){
        driverReceipt.toString();
        return driverReceiptService.search(driverReceipt);
    }

    @RequestMapping("driverReceiveSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody DriverReceipt driverReceipt){
        return driverReceiptService.countSearch(driverReceipt);
    }

}
