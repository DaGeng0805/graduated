package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.DetailBill;
import com.mjmju.zj.transport_manage.mapper.DetailBillMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class DetailBillService {

    @Autowired
    DetailBillMapper detailBillMapper;

    /**
      * @Description: 分页查询
      * @Author: 郑军
      * @Date: 2020/2/12  
      */  
    public List<DetailBill> selectWithPage(int page,Model model){
        DetailBill detailBill = new DetailBill();
        detailBill.setLimit(10);
        Integer countAll = detailBillMapper.countAll();
        int totalPage = countAll%(detailBill.limit)==0?countAll/detailBill.limit:
                countAll/detailBill.limit+1;
        detailBill.setPages(page);
        List<DetailBill> detailBills = detailBillMapper.selectWithPage(detailBill);
        return detailBills;
    }
    
    /**
      * @Description: 返回最大页数  
      * @Author: 郑军
      * @Date: 2020/2/12  
      */  
    public Integer getTotalPage(){
        Integer countAll = detailBillMapper.countAll();
        Integer totalPage = countAll%10==0?countAll/10:(countAll/10)+1;
        return totalPage;
    }
    
    /**
      * @Description: 返回查询结果
      * @Author: 郑军
      * @Date: 2020/2/16  
      */  
    public List<DetailBill> search(DetailBill detailBill){
        return detailBillMapper.search(detailBill);
    }

    /**
     * @Description: 返回多条件查询总条数
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public Integer countSearch(DetailBill record){
        Integer count = detailBillMapper.searchCount(record);
        return count%10==0?count/10:count/10+1;
    }

    /**
      * @Description: 根据id查找信息
      * @Author: 郑军
      * @Date: 2020/2/16  
      */  
    public DetailBill selectByPrimaryKey(Integer id)
    {
        return detailBillMapper.selectByPrimaryKey(id);
    }

    /**
      * @Description: 更新
      * @Author: 郑军
      * @Date: 2020/2/19
      */
    public void update(DetailBill detailBill){
        detailBillMapper.updateByPrimaryKey(detailBill);
    }
    
    /**
      * @Description: 根据单号查询
      * @Author: 郑军
      * @Date: 2020/2/29  
      */  
    public DetailBill selectWithBillNum(String billNum){ return detailBillMapper.selectWithBillNum(billNum);}
}
