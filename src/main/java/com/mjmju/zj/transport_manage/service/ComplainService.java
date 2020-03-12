package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.Complain;
import com.mjmju.zj.transport_manage.mapper.ComplainMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplainService {
    @Autowired
    ComplainMapper complainMapper;

    /**
     * @Description: 返回最大页数
     * @Author: 郑军
     * @Date: 2020/2/19
     */
    public Integer getTotalPage(){
        Integer countAll = complainMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }

    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(Complain record){
        complainMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        complainMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 多条件查询
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public List<Complain> search(Complain record){
        record.limit=10;
        return complainMapper.search(record);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(Complain record){
        Integer count = complainMapper.countSearch(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
     * @Description: 更新投诉状态
     * @Author: 郑军
     * @Date: 2020/2/26
     */
    public void updateStatus(Integer id){
        Complain record = complainMapper.selectByPrimaryKey(id);
        record.setStatus((byte)1);
        complainMapper.updateByPrimaryKeySelective(record);
    }

}
