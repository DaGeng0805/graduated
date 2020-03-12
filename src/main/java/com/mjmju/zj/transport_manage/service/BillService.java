package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.Bill;
import com.mjmju.zj.transport_manage.entity.DetailBill;
import com.mjmju.zj.transport_manage.mapper.BillMapper;
import com.mjmju.zj.transport_manage.mapper.DetailBillMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillService {

    @Autowired
    BillMapper billMapper;

    @Autowired
    DetailBillMapper detailBillMapper;

    /**
      * @Description: 返回开始编号
      * @Param:
      * @return: 最大编号
      * @Author: 郑军
      * @Date: 2020/2/9
      */
    public String selectMaxBeginNum(){
        try{
            Bill bill = billMapper.selectMaxBeginNum();
            int endNum = Integer.parseInt(bill.getEndNum())+1;
            return String.valueOf(endNum);
        }
        catch(Exception ex){
            return "1000";
        }
    }

    /**
      * @Description: 添加到bill表并且往detail表里面添加内容
      * @Param:bill实体类
      * @return:
      * @Author: 郑军
      * @Date: 2020/2/10
      */
    public void add(Bill bill){
        billMapper.insert(bill);
        int beginNum = Integer.parseInt(bill.getBeginNum()),
                endNum = Integer.parseInt(bill.getEndNum());
        for (int i = beginNum; i <= endNum; i++) {
            DetailBill detailBill = new DetailBill();
            detailBill.setBillNum(String.valueOf(i));
            detailBill.setReceiver(bill.getReceiver());
            detailBill.setReceiverPhone(bill.getReceiverPhone());
            detailBill.setDistributePerson(bill.getDistributePerson());
            detailBill.setDistributePersonPhone(bill.getDistributePersionPhone());
            detailBill.setReceivePlace(bill.getTationName());
            detailBillMapper.insertSelective(detailBill);
        }
    }
}
