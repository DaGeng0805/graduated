package com.mjmju.zj.transport_manage.controller;

import com.mjmju.zj.transport_manage.entity.DetailBill;
import com.mjmju.zj.transport_manage.service.DetailBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class DetailBillController {



    @Autowired
    DetailBillService detailBillService;

    @RequestMapping("detailBillQueryPage")
    public String goQuery(Model model){
        model.addAttribute("totalPage",detailBillService.getTotalPage());
        return "bill/billQuery";
    }


    @RequestMapping("detailBillPage/{page}")
    @ResponseBody
    public List<DetailBill> selectWithPage(@PathVariable("page")Integer page, Model model){
        List<DetailBill> detailBills = detailBillService.selectWithPage(page, model);
        return detailBills;
    }

    @RequestMapping("detailBillSerach")
    @ResponseBody
    public List<DetailBill> serach(@RequestBody DetailBill detailBill)
    {
        System.out.println(detailBill.toString());
        return detailBillService.search(detailBill);
    }

    @PostMapping("detailBillFindByid/{id}")
    @ResponseBody
    public DetailBill detailBillFindByid(@PathVariable("id")Integer id){
        return detailBillService.selectByPrimaryKey(id);
    }

    @PostMapping("detailBillUpdate")
    @ResponseBody
    public String detailBillUpdate(@RequestBody DetailBill detailBill){
        System.out.println(detailBill.toString());
        detailBillService.update(detailBill);
        return "true";
    }

    @RequestMapping("datailbillSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody DetailBill dateilbill){
//        System.out.println(trucksInfo.toString());
        return detailBillService.countSearch(dateilbill);
    }

    @RequestMapping("detailBillFindbyBillNum/{billNum}")
    @ResponseBody
    public DetailBill detailBillFindbyBillNum(@PathVariable("billNum")String billNum){
        return detailBillService.selectWithBillNum(billNum);
    }
}
