package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.CustomerInfo;
import com.mjmju.zj.transport_manage.mapper.CustomerInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService{
    @Autowired
    CustomerInfoMapper customerInfoMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = customerInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(CustomerInfo record){
        customerInfoMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){customerInfoMapper.deleteByPrimaryKey(id);}

    /**
     * @Description: 根据电话查询对应资料
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public CustomerInfo selectByPhone(String phone){
        return customerInfoMapper.selectByPhone(phone);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<CustomerInfo> search(CustomerInfo record){
        record.limit=10;
        return customerInfoMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(CustomerInfo record){
        Integer count = customerInfoMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 更新  
      * @Author: 郑军
      * @Date: 2020/3/2  
      */  
    public void update(CustomerInfo record){
        customerInfoMapper.updateByPrimaryKeySelective(record);
    }

}
