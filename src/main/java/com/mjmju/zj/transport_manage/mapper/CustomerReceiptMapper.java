package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CustomerReceipt;

import java.util.List;

public interface CustomerReceiptMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CustomerReceipt record);

    int insertSelective(CustomerReceipt record);

    CustomerReceipt selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CustomerReceipt record);

    int updateByPrimaryKey(CustomerReceipt record);

    Integer countAll();

    List<CustomerReceipt> selectWithPage(CustomerReceipt record);

    CustomerReceipt selectByGoodsNum(String goodsNum);

    List<CustomerReceipt> search(CustomerReceipt record);

    Integer countSearch(CustomerReceipt record);
}