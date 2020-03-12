package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.TrucksInfo;
import com.mjmju.zj.transport_manage.mapper.TrucksInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrucksService {

    @Autowired
    TrucksInfoMapper trucksInfoMapper;


    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = trucksInfoMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(TrucksInfo record){
        trucksInfoMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        trucksInfoMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<TrucksInfo> search(TrucksInfo record){
        record.limit=10;
        return trucksInfoMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(TrucksInfo record){
        Integer count = trucksInfoMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 用于提供给司机进行选择车辆时进行使用
      * @Author: 郑军
      * @Date: 2020/2/28
      */
    public List<TrucksInfo> driverSelect(TrucksInfo record){
        return trucksInfoMapper.driverSelect(record);
    }

    /**
      * @Description: 根据车牌号进行查找
      * @Author: 郑军
      * @Date: 2020/2/28
      */
    public TrucksInfo selectByPlateNum(String plateNum){
        return trucksInfoMapper.selectByPlateNum(plateNum);
    }

}
