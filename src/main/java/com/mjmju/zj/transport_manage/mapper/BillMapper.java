package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.Bill;

import java.util.List;

public interface BillMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Bill record);

    int insertSelective(Bill record);

    Bill selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Bill record);

    int updateByPrimaryKey(Bill record);

    Integer countAll();

    List<Bill> selectWithPage(Bill bill);

    Bill selectMaxBeginNum();
}