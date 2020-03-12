package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.SiteManagerInfo;
import com.mjmju.zj.transport_manage.entity.StationInfo;
import com.mjmju.zj.transport_manage.mapper.SiteManagerInfoMapper;
import com.mjmju.zj.transport_manage.mapper.StationInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class ManagerService {
    @Autowired
    SiteManagerInfoMapper managerInfoMapper;

    @Autowired
    StationInfoMapper stationInfoMapper;

    /**
     * @Description: 分页查询
     * @Author: 郑军
     * @Date: 2020/2/18
     */
    public List<SiteManagerInfo> selectWithPage(int page, Model model){
        SiteManagerInfo siteManagerInfo = new SiteManagerInfo();
        siteManagerInfo.setLimit(10);
        Integer countAll = managerInfoMapper.countAll();
        int totalPage = countAll%(siteManagerInfo.limit)==0?countAll/siteManagerInfo.limit:
                countAll/siteManagerInfo.limit+1;
        siteManagerInfo.setPages(page);
        List<SiteManagerInfo> siteManagerInfos = managerInfoMapper.selectWithPage(siteManagerInfo);
        return siteManagerInfos;
    }

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = managerInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }
    
    /**
      * @Description: 插入数据  
      * @Author: 郑军
      * @Date: 2020/2/20  
      */  
    public void insert(SiteManagerInfo siteManagerInfo){
        managerInfoMapper.insertSelective(siteManagerInfo);
    }

    /**
      * @Description: 根据主键删除
      * @Author: 郑军
      * @Date: 2020/2/23
      */
    public void delete(Integer id){
        SiteManagerInfo siteManagerInfo = managerInfoMapper.selectByPrimaryKey(id);
        StationInfo stationInfo = stationInfoMapper.checkOnlyManager(siteManagerInfo.getAddr());
        stationInfo.setManagerName(null);
        stationInfo.setManagerPhone(null);
        stationInfoMapper.updateByPrimaryKey(stationInfo);
        managerInfoMapper.deleteByPrimaryKey(id);
    }

    /**
      * @Description: 根据电话查询对应资料  
      * @Author: 郑军
      * @Date: 2020/2/23  
      */  
    public SiteManagerInfo selectByPhone(String phone){
        return managerInfoMapper.selectByPhone(phone);
    }

    /**
      * @Description: 多条件查询
      * @Author: 郑军
      * @Date: 2020/2/23  
      */  
    public List<SiteManagerInfo> search(SiteManagerInfo siteManagerInfo){
        siteManagerInfo.limit=10;
        return managerInfoMapper.search(siteManagerInfo);
    }

    /**
      * @Description: 返回多条件查询总条数
      * @Author: 郑军
      * @Date: 2020/2/23  
      */  
    public Integer countSearch(SiteManagerInfo siteManagerInfo){
        Integer count = managerInfoMapper.countSearch(siteManagerInfo);
        return count%10==0?count/10:count/10+1;
    }

    /**
     * @Description: 根据名称返回查询集合
     * @Author: 郑军
     * @Date: 2020/2/29
     */
    public List<SiteManagerInfo> findByName(String name){
        return managerInfoMapper.findByName(name);
    }


}
