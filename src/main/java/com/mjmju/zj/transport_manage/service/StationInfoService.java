package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.StationInfo;
import com.mjmju.zj.transport_manage.mapper.SiteManagerInfoMapper;
import com.mjmju.zj.transport_manage.mapper.StationInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationInfoService {
    
    @Autowired
    StationInfoMapper stationInfoMapper;

    @Autowired
    SiteManagerInfoMapper siteManagerInfoMapper;
    
    /**
      * @Description: 模糊查询，返回list，一般用于自动补全  
      * @Author: 郑军
      * @Date: 2020/2/17  
      */  
    public List<String> findByName(String stationName){
        List<String> byName = stationInfoMapper.findByName(stationName);
        return byName;
    }

    /**
      * @Description: 根据站点名称返回站点信息
      * @Author: 郑军
      * @Date: 2020/2/23  
      */  
    public StationInfo checkByName(String stationName){
        return stationInfoMapper.checkByName(stationName);
    }
    
    /**
      * @Description: 查询此站点是否已经有负责人 返回false表示此站点已经有负责人，true表示无负责人
      * @Author: 郑军
      * @Date: 2020/2/26  
      */  
    public String checkOnlyManager(String stationName){
        StationInfo stationInfo = stationInfoMapper.checkOnlyManager(stationName);
        String managerName = stationInfo.getManagerName();
        if (managerName == null || managerName == ""){
            return "true";
        }else {
            return "false";
        }
    }
    /**
      * @Description: 增加站点负责人信息
      * @Author: 郑军
      * @Date: 2020/2/26  
      */  
    public void updateManager(StationInfo record){
        stationInfoMapper.updateManager(record);
    }


    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = stationInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(StationInfo record){
        stationInfoMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除站点并且删除关联站点管理员
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        StationInfo stationInfo = stationInfoMapper.selectByPrimaryKey(id);
        siteManagerInfoMapper.deleteByStationName(stationInfo.getStationName());
        stationInfoMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<StationInfo> search(StationInfo record){
        record.limit=10;
        return stationInfoMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(StationInfo record){
        Integer count = stationInfoMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 更新
      * @Author: 郑军
      * @Date: 2020/2/26
      */
    public void update(StationInfo record){
        stationInfoMapper.updateByPrimaryKeySelective(record);
    }
    
    /**
      * @Description: 根据主键查询站点信息
      * @Author: 郑军
      * @Date: 2020/2/26  
      */  
    public StationInfo findById(Integer id){return stationInfoMapper.selectByPrimaryKey(id);}
}
