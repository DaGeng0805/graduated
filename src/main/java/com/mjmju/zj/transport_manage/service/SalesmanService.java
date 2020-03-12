package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.SalesmanInfo;
import com.mjmju.zj.transport_manage.mapper.SalesmanInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesmanService {
    @Autowired
    SalesmanInfoMapper salesmanInfoMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = salesmanInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(SalesmanInfo salesmanInfo){
        salesmanInfoMapper.insertSelective(salesmanInfo);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){salesmanInfoMapper.deleteByPrimaryKey(id);}

    /**
     * @Description: 根据电话查询对应资料
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public SalesmanInfo selectByPhone(String phone){
        return salesmanInfoMapper.selectByPhone(phone);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<SalesmanInfo> search(SalesmanInfo salesmanInfo){
        salesmanInfo.limit=10;
        return salesmanInfoMapper.search(salesmanInfo);
    }

    /**
     * @Description: 根据名称返回查询集合
     * @Author: 郑军
     * @Date: 2020/2/29
     */
    public List<SalesmanInfo> findByName(String name){
        return salesmanInfoMapper.findByName(name);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(SalesmanInfo salesmanInfo){
        Integer count = salesmanInfoMapper.countSearch(salesmanInfo);
        return count%10==0?count/10:count/10+1;
    }

    /**
   * @Description: 更新
   * @Author: 郑军
   * @Date: 2020/2/26
   */
    public void update(SalesmanInfo salesmanInfo){
        salesmanInfoMapper.updateByPrimaryKeySelective(salesmanInfo);
    }
}
