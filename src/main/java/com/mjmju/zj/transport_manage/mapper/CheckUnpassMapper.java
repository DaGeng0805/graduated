package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.CheckUnpass;

public interface CheckUnpassMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CheckUnpass record);

    int insertSelective(CheckUnpass record);

    CheckUnpass selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CheckUnpass record);

    int updateByPrimaryKey(CheckUnpass record);
}