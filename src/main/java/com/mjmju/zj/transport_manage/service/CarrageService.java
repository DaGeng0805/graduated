package com.mjmju.zj.transport_manage.service;


import com.mjmju.zj.transport_manage.entity.CarrageContract;
import com.mjmju.zj.transport_manage.mapper.CarrageContractMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrageService {

    @Autowired
    CarrageContractMapper carrageContractMapper;


    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = carrageContractMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(CarrageContract record){
        carrageContractMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        carrageContractMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<CarrageContract> search(CarrageContract record){
        record.limit=10;
        return carrageContractMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(CarrageContract record){
        Integer count = carrageContractMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
     * @Description: 灵活更新
     * @Author: 郑军
     * @Date: 2020/2/29
     */
    public void updateByPrimaryKeySelective(CarrageContract record){
        carrageContractMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * @Description: 根据合同编号获取信息
     * @Author: 郑军
     * @Date: 2020/2/29
     */
    public CarrageContract selectByContractNum(String contractNum){
        return carrageContractMapper.selectByContractNum(contractNum);
    }
    
    /**
      * @Description: 根据合同单号返回自动填充
      * @Author: 郑军
      * @Date: 2020/3/11  
      */  
    public List<String> findByContractNum(String contractNum){
        return carrageContractMapper.findByContractNum(contractNum);
    }

}
