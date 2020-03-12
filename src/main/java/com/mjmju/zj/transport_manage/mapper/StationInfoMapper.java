package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.StationInfo;

import java.util.List;

public interface StationInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StationInfo record);

    int insertSelective(StationInfo record);

    StationInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StationInfo record);

    int updateByPrimaryKey(StationInfo record);

    List<String> findByName(String stationName);

    StationInfo checkByName(String stationName);

    StationInfo checkOnlyManager(String stationName);

    void updateManager(StationInfo record);

    Integer countAll();

    List<StationInfo> selectWithPage(StationInfo record);

    List<StationInfo> search(StationInfo record);

    Integer countSearch(StationInfo record);
}