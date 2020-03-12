package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.DriverRetainage;

public interface DriverRetainageMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DriverRetainage record);

    int insertSelective(DriverRetainage record);

    DriverRetainage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DriverRetainage record);

    int updateByPrimaryKey(DriverRetainage record);
}