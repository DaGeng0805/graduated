package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.DetailBill;

import java.util.List;

public interface DetailBillMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DetailBill record);

    int insertSelective(DetailBill record);

    DetailBill selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DetailBill record);

    int updateByPrimaryKey(DetailBill record);

    Integer countAll();

    List<DetailBill> selectWithPage(DetailBill record);

    List<DetailBill> search(DetailBill record);

    Integer searchCount(DetailBill record);

    DetailBill selectWithBillNum(String billNum);

}