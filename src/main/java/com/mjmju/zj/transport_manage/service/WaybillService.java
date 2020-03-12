package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.CustomerInfo;
import com.mjmju.zj.transport_manage.entity.DetailBill;
import com.mjmju.zj.transport_manage.entity.Waybill;
import com.mjmju.zj.transport_manage.mapper.CustomerInfoMapper;
import com.mjmju.zj.transport_manage.mapper.DetailBillMapper;
import com.mjmju.zj.transport_manage.mapper.WaybillMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class WaybillService {

    @Autowired
    WaybillMapper waybillMapper;

    @Autowired
    DetailBillMapper detailBillMapper;

    @Autowired
    CustomerInfoMapper customerInfoMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = waybillMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据 并且往客户信息表中更新客户信息
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(Waybill record){
        DetailBill detailBill = detailBillMapper.selectWithBillNum(record.getWaybillNum());
        detailBill.setStatus((byte)1);
        detailBill.setWriteTime(record.getEntryTime());
        detailBillMapper.updateByPrimaryKey(detailBill);

        CustomerInfo customerInfo = customerInfoMapper.selectByPhone(record.getCustomerPhone());
        if (customerInfo == null){
            String customerName = record.getCustomerName();
            String customerPhone = record.getCustomerPhone();
            CustomerInfo customerInfo1 = new CustomerInfo();
            customerInfo1.setName(customerName);
            customerInfo1.setPhone(customerPhone);
            customerInfo1.setAddr(record.getCustomerAddr());
            customerInfoMapper.insert(customerInfo1);
        }else{
            customerInfo.setName(record.getCustomerName());
            customerInfo.setAddr(record.getCustomerAddr());
            customerInfoMapper.updateByPrimaryKeySelective(customerInfo);
        }
        waybillMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        waybillMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<Waybill> search(Waybill record){
        record.limit=10;
        return waybillMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(Waybill record){
        Integer count = waybillMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 灵活更新
      * @Author: 郑军
      * @Date: 2020/2/29
      */
    public void updateByPrimaryKeySelective(Waybill record){
        waybillMapper.updateByPrimaryKeySelective(record);
    }

    /**
      * @Description: 根据waybill去查找
      * @Author: 郑军
      * @Date: 2020/2/29
      */
    public Waybill selectByWaybill(String waybillNum){
        return waybillMapper.selectByWaybill(waybillNum);
    }

}
