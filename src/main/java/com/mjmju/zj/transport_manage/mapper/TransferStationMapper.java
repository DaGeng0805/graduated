package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.TransferStation;

import java.util.List;

public interface TransferStationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TransferStation record);

    int insertSelective(TransferStation record);

    TransferStation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TransferStation record);

    int updateByPrimaryKey(TransferStation record);

    List<TransferStation> selectByCarrageNum(String contractNum);
}