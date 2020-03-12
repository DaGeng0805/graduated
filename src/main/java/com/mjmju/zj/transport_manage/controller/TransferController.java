package com.mjmju.zj.transport_manage.controller;


import com.mjmju.zj.transport_manage.entity.TransferStation;
import com.mjmju.zj.transport_manage.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TransferController {

    @Autowired
    TransferService transferService;

    @RequestMapping("transferSByCarrageNum/{carrageNum}")
    @ResponseBody
    public List<TransferStation> transferSByCarrageNum(@PathVariable("carrageNum")String carrageNum){
        return transferService.selectByCarrageNum(carrageNum);
    }

    @PostMapping("transferInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody TransferStation record){
        transferService.insert(record);
        return "ture";
    }
}
