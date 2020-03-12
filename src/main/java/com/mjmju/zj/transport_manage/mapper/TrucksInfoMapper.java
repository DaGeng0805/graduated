package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.TrucksInfo;

import java.util.List;

public interface TrucksInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TrucksInfo record);

    int insertSelective(TrucksInfo record);

    TrucksInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TrucksInfo record);

    int updateByPrimaryKey(TrucksInfo record);


    Integer countAll();

    List<TrucksInfo> selectWithPage(TrucksInfo record);

    List<TrucksInfo> search(TrucksInfo record);

    Integer countSearch(TrucksInfo record);

    List<TrucksInfo> driverSelect(TrucksInfo record);

    TrucksInfo selectByPlateNum(String plateNum);



}