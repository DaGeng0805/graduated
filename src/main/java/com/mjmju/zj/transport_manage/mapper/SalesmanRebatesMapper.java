package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.SalesmanRebates;


public interface SalesmanRebatesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SalesmanRebates record);

    int insertSelective(SalesmanRebates record);

    SalesmanRebates selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SalesmanRebates record);

    int updateByPrimaryKey(SalesmanRebates record);


}