package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.DriverReceipt;

import java.util.List;

public interface DriverReceiptMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DriverReceipt record);

    int insertSelective(DriverReceipt record);

    DriverReceipt selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DriverReceipt record);

    int updateByPrimaryKey(DriverReceipt record);

    Integer countAll();

    List<DriverReceipt> selectWithPage(DriverReceipt record);

    DriverReceipt selectByContractNum(String contractNum);

    List<DriverReceipt> search(DriverReceipt record);

    Integer countSearch(DriverReceipt record);

}