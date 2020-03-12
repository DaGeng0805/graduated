package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CarrageGoods;

import java.util.List;

public interface CarrageGoodsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CarrageGoods record);

    int insertSelective(CarrageGoods record);

    CarrageGoods selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CarrageGoods record);

    int updateByPrimaryKey(CarrageGoods record);

    CarrageGoods SByContractNumAndGoodsNum(CarrageGoods record);

    void DByContractNumAndGoodsNum(CarrageGoods record);

    List<CarrageGoods> SByContractNum(String contractNum);
}