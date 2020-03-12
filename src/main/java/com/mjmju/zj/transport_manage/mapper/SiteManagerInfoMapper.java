package com.mjmju.zj.transport_manage.mapper;

import com.mjmju.zj.transport_manage.entity.SiteManagerInfo;

import java.util.List;

public interface SiteManagerInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SiteManagerInfo record);

    int insertSelective(SiteManagerInfo record);

    SiteManagerInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SiteManagerInfo record);

    int updateByPrimaryKey(SiteManagerInfo record);

    Integer countAll();

    List<SiteManagerInfo> selectWithPage(SiteManagerInfo record);

    SiteManagerInfo selectByPhone(String phone);

    List<SiteManagerInfo> search(SiteManagerInfo record);

    Integer countSearch(SiteManagerInfo record);

    void deleteByStationName(String addr);

    List<SiteManagerInfo> findByName(String name);
}