package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.CarrageGoods;
import com.mjmju.zj.transport_manage.mapper.CarrageGoodsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarrageGoodsService {

    @Autowired
    CarrageGoodsMapper carrageGoodsMapper;

    /**
      * @Description: 增加或者删除
      * @Author: 郑军
      * @Date: 2020/3/8
      */
    public void insertOrUpdate(CarrageGoods record){
        CarrageGoods carrageGoods = carrageGoodsMapper.SByContractNumAndGoodsNum(record);
        if (carrageGoods == null){
            carrageGoodsMapper.insertSelective(record);
        }else {
            carrageGoods.setNumber(record.getNumber());
            carrageGoodsMapper.updateByPrimaryKeySelective(carrageGoods);
        }
    }
    
    /**
      * @Description: 删除货物
      * @Author: 郑军
      * @Date: 2020/3/8  
      */  
    public void DByContractNumAndGoodsNum(CarrageGoods record){
        carrageGoodsMapper.DByContractNumAndGoodsNum(record);
    }

    /**
      * @Description: 返回合同对应单号
      * @Author: 郑军
      * @Date: 2020/3/8
      */
    public List<CarrageGoods> SByContractNum(String contractNum){
        return carrageGoodsMapper.SByContractNum(contractNum);
    }
}
