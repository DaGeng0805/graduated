package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.DriverInfo;

import java.util.List;

public interface DriverInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DriverInfo record);

    int insertSelective(DriverInfo record);

    DriverInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DriverInfo record);

    int updateByPrimaryKey(DriverInfo record);


    Integer countAll();

    List<DriverInfo> selectWithPage(DriverInfo record);

    DriverInfo selectByPhone(String phone);

    List<DriverInfo> search(DriverInfo record);

    Integer countSearch(DriverInfo record);

    DriverInfo selectByLicence(String licence);

    List<DriverInfo> findByName(String driverName);

}