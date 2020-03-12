package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.TransferStation;
import com.mjmju.zj.transport_manage.mapper.TransferStationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferService {
    
    @Autowired
    TransferStationMapper transferStationMapper;

    /**
      * @Description: 根据合同编号获取对应中转站信息
      * @Author: 郑军
      * @Date: 2020/3/6  
      */  
    public List<TransferStation> selectByCarrageNum(String contractNum){
        return transferStationMapper.selectByCarrageNum(contractNum);
    }


    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(TransferStation record){
        transferStationMapper.insertSelective(record);
    }
    
    
    
    
}
