package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.CustomerReceipt;
import com.mjmju.zj.transport_manage.mapper.CustomerReceiptMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerRecepitService {

    @Autowired
    CustomerReceiptMapper customerReceiptMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = customerReceiptMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(CustomerReceipt record){
        customerReceiptMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){customerReceiptMapper.deleteByPrimaryKey(id);}

    /**
     * @Description: 根据货物编号查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public CustomerReceipt selectByGoodsNum(String goodsNum){
        return customerReceiptMapper.selectByGoodsNum(goodsNum);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<CustomerReceipt> search(CustomerReceipt record){
        record.limit=10;
        return customerReceiptMapper.search(record);
    }


    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(CustomerReceipt record){
        Integer count = customerReceiptMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
     * @Description: 更新
     * @Author: 郑军
     * @Date: 2020/2/26
     */
    public void update(CustomerReceipt record){
        customerReceiptMapper.updateByPrimaryKeySelective(record);
    }


}
