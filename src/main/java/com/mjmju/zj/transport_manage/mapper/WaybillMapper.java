package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.Waybill;

import java.util.List;

public interface WaybillMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Waybill record);

    int insertSelective(Waybill record);

    Waybill selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Waybill record);

    int updateByPrimaryKey(Waybill record);


    Integer countAll();

    List<Waybill> search(Waybill record);

    Integer countSearch(Waybill record);

    Waybill selectByWaybill(String waybillNum);

}