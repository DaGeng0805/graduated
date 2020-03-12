package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.DriverReceipt;
import com.mjmju.zj.transport_manage.mapper.DriverReceiptMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverReceiptService {

    @Autowired
    DriverReceiptMapper driverReceiptMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = driverReceiptMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(DriverReceipt record){
        driverReceiptMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){driverReceiptMapper.deleteByPrimaryKey(id);}

    /**
     * @Description: 根据合同单号
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public DriverReceipt selectByContractNum(String contractNum){
        return driverReceiptMapper.selectByContractNum(contractNum);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<DriverReceipt> search(DriverReceipt record){
        record.limit=10;
        return driverReceiptMapper.search(record);
    }


    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(DriverReceipt record){
        Integer count = driverReceiptMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
     * @Description: 更新
     * @Author: 郑军
     * @Date: 2020/2/26
     */
    public void update(DriverReceipt record){
        driverReceiptMapper.updateByPrimaryKeySelective(record);
    }

}
