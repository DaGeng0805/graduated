package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.SalesmanInfo;

import java.util.List;

public interface SalesmanInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SalesmanInfo record);

    int insertSelective(SalesmanInfo record);

    SalesmanInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SalesmanInfo record);

    int updateByPrimaryKey(SalesmanInfo record);

    Integer countAll();

    List<SalesmanInfo> selectWithPage(SalesmanInfo record);

    SalesmanInfo selectByPhone(String phone);

    List<SalesmanInfo> search(SalesmanInfo record);

    Integer countSearch(SalesmanInfo record);

    List<SalesmanInfo> findByName(String name);
}