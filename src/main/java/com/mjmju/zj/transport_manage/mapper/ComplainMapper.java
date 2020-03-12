package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.Complain;

import java.util.List;

public interface ComplainMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Complain record);

    int insertSelective(Complain record);

    Complain selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Complain record);

    int updateByPrimaryKey(Complain record);

    Integer countAll();

    List<Complain> search(Complain record);

    Integer countSearch(Complain record);
}