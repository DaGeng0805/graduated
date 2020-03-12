package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.DriverInfo;
import com.mjmju.zj.transport_manage.mapper.DriverInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class DriverService {
    @Autowired
    DriverInfoMapper driverInfoMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = driverInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(DriverInfo siteManagerInfo){
        driverInfoMapper.insertSelective(siteManagerInfo);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        driverInfoMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 根据电话查询对应资料
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public DriverInfo selectByPhone(String phone){
        return driverInfoMapper.selectByPhone(phone);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<DriverInfo> search(DriverInfo record){
        record.limit=10;
        return driverInfoMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(DriverInfo record){
        Integer count = driverInfoMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 根据驾驶证查询
      * @Author: 郑军
      * @Date: 2020/2/29  
      */  
    public DriverInfo selectByLicence(String licence){
        return driverInfoMapper.selectByLicence(licence);
    }

    /**
     * @Description: 根据名称返回查询集合
     * @Author: 郑军
     * @Date: 2020/2/29
     */
    public List<DriverInfo> findByName(String name){
        return driverInfoMapper.findByName(name);
    }

}
