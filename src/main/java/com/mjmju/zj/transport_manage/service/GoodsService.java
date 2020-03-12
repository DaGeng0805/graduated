package com.mjmju.zj.transport_manage.service;

import com.mjmju.zj.transport_manage.entity.CarrageContract;
import com.mjmju.zj.transport_manage.entity.GoodsInfo;
import com.mjmju.zj.transport_manage.entity.Waybill;
import com.mjmju.zj.transport_manage.mapper.CarrageContractMapper;
import com.mjmju.zj.transport_manage.mapper.CarrageGoodsMapper;
import com.mjmju.zj.transport_manage.mapper.GoodsInfoMapper;
import com.mjmju.zj.transport_manage.mapper.WaybillMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class GoodsService {
    
    @Autowired
    GoodsInfoMapper goodsInfoMapper;

    @Autowired
    WaybillMapper waybillMapper;

    @Autowired
    CarrageContractMapper carrageContractMapper;
    
    /**
      * @Description: 根据订单号返回对应货物信息
      * @Author: 郑军
      * @Date: 2020/3/2  
      */  
    public List<GoodsInfo> selectByWaybill(String waybillNum){
        Waybill waybill = waybillMapper.selectByWaybill(waybillNum);
        List<GoodsInfo> goodsInfos = goodsInfoMapper.selectByWaybill(waybillNum);
        if (waybill.getStatus()==(byte)0){
            for (GoodsInfo g:goodsInfos){
                g.setMsg("true");
            }
        }else   {
            for (GoodsInfo g:goodsInfos){
                g.setMsg("false");
            }
        }
        return goodsInfos;
    }

    /**
     * @Description: 根据合同号返回合适的对应货物信息
     * @Author: 郑军
     * @Date: 2020/3/2
     */
    public List<GoodsInfo> selectCarrageGoods(String contractNum){
        CarrageContract carrageContract = carrageContractMapper.selectByContractNum(contractNum);
        return goodsInfoMapper.selectCarrageGoods(carrageContract);
    }



    /**
     * @Description: 插入数据
     * @Author: 郑军
     * @Date: 2020/2/20
     */
    public void insert(GoodsInfo record){
        Waybill waybill = waybillMapper.selectByWaybill(record.getWaybillNum());
        waybill.setFreight((BigDecimal)waybill.getFreight().add(record.getFreight().multiply(new BigDecimal(record.getNumber()))));
        waybill.setInsurance((BigDecimal)waybill.getInsurance().add(record.getInsurance().multiply(new BigDecimal(record.getNumber()))));
        waybillMapper.updateByPrimaryKeySelective(waybill);
        goodsInfoMapper.insertSelective(record);
    }

    /**
     * @Description: 根据主键删除
     * @Author: 郑军
     * @Date: 2020/2/23
     */
    public void delete(Integer id){
        GoodsInfo record = goodsInfoMapper.selectByPrimaryKey(id);
        Waybill waybill = waybillMapper.selectByWaybill(record.getWaybillNum());
        waybill.setFreight((BigDecimal)waybill.getFreight().subtract(record.getFreight().multiply(new BigDecimal(record.getNumber()))));
        waybill.setInsurance((BigDecimal)waybill.getInsurance().subtract(record.getInsurance().multiply(new BigDecimal(record.getNumber()))));
        waybillMapper.updateByPrimaryKeySelective(waybill);
        goodsInfoMapper.deleteByPrimaryKey(id);
    }

    /**
     * @Description: 更新
     * @Author: 郑军
     * @Date: 2020/3/2
     */
    public void update(GoodsInfo record){
        goodsInfoMapper.updateByPrimaryKeySelective(record);
    }
    
    /**
      * @Description: 根据主键查询
      * @Author: 郑军
      * @Date: 2020/3/8  
      */  
    public GoodsInfo selectById(Integer id){
        return goodsInfoMapper.selectByPrimaryKey(id);
    }

    /**
     * @Description: 根据货物单号查找
     * @Author: 郑军
     * @Date: 2020/3/8
     */
    public GoodsInfo selectByGoodsNum(String goodsNum){
        return goodsInfoMapper.selectByGoodsNum(goodsNum);
    }

    /**
     * @Description: 根据货物编号返回对应的自动补全信息
     * @Author: 郑军
     * @Date: 2020/3/2
     */
    public List<String> findByGoodsNum(String goodsNum){
        return goodsInfoMapper.findByGoodsNum(goodsNum);
    }


}
