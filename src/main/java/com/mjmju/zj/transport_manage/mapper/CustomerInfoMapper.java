package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CustomerInfo;

import java.util.List;

public interface CustomerInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CustomerInfo record);

    int insertSelective(CustomerInfo record);

    CustomerInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CustomerInfo record);

    int updateByPrimaryKey(CustomerInfo record);

    Integer countAll();

    List<CustomerInfo> selectWithPage(CustomerInfo record);

    CustomerInfo selectByPhone(String phone);

    List<CustomerInfo> search(CustomerInfo record);

    Integer countSearch(CustomerInfo record);
}