package com.mjmju.zj.transport_manage.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.mjmju.zj.transport_manage.entity.Complain;
import com.mjmju.zj.transport_manage.service.ComplainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ComplainController {

    @Autowired
    ComplainService complainService;

    @Value("${netaddr}")
    private String content;


    @RequestMapping("complainAdd")
    public String goQuery(Model model){
        return "complain/complaints";
    }

    @RequestMapping("complainQuery")
    public String salesmanQuery(Model model){
        model.addAttribute("totalPage",complainService.getTotalPage());
        return "complain/complaintsQuery";
    }

    @PostMapping("complainInsert")
    @ResponseBody
    public String salesmanInsert(@RequestBody Complain record){
        complainService.insert(record);
        return "ture";
    }

    @PostMapping("complainUpdate/{id}")
    @ResponseBody
    public String salesmanUpdate(@PathVariable("id")Integer id){
        complainService.updateStatus(id);
        return "ture";
    }

    @PostMapping("complainDeleteByid/{id}")
    @ResponseBody
    public String deleteByid( @PathVariable("id") Integer id){
        complainService.delete(id);
        return "ture";
    }

    @RequestMapping("complainSearch")
    @ResponseBody
    public List<Complain> search(@RequestBody Complain record){
        System.out.println(record.toString());
        return complainService.search(record);
    }

    @RequestMapping("complainSearchCount")
    @ResponseBody
    public Integer managerSearchCount(@RequestBody Complain record){
        return complainService.countSearch(record);
    }

    @RequestMapping("/get2WM")
    public void dowanload(HttpServletRequest request,HttpServletResponse response) throws Exception {
        Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
        // 指定编码格式
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        // 指定纠错级别(L--7%,M--15%,Q--25%,H--30%)
        hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
        // 编码内容,编码类型(这里指定为二维码),生成图片宽度,生成图片高度,设置参数
        BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, 200, 200, hints);
        //设置请求头
        response.setHeader("Content-Type","application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=" + "二维码.png");
        OutputStream outputStream = response.getOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "png", outputStream);
        outputStream.flush();
        outputStream.close();
    }


}
