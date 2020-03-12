package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CarrageContract;
import com.mjmju.zj.transport_manage.entity.GoodsInfo;

import java.util.List;

public interface GoodsInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(GoodsInfo record);

    int insertSelective(GoodsInfo record);

    GoodsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(GoodsInfo record);

    int updateByPrimaryKey(GoodsInfo record);

    List<GoodsInfo> selectByWaybill(String waybillNum);

    List<GoodsInfo> selectCarrageGoods(CarrageContract recod);

    GoodsInfo selectByGoodsNum(String goodsNum);

    List<String> findByGoodsNum(String goodsNum);
}