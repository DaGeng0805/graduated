package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CarrageContract;

import java.util.List;

public interface CarrageContractMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CarrageContract record);

    int insertSelective(CarrageContract record);

    CarrageContract selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CarrageContract record);

    int updateByPrimaryKey(CarrageContract record);



    Integer countAll();

    List<CarrageContract> search(CarrageContract record);

    Integer countSearch(CarrageContract record);

    CarrageContract selectByContractNum(String contractNum);

    List<String> findByContractNum(String contractNum);
}