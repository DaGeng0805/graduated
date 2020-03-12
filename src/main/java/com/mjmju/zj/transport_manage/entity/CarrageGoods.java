package com.mjmju.zj.transport_manage.entity;

public class CarrageGoods extends Dto{
    private Integer id;

    private String contractNum;

    private String goodsNum;

    private String endPlace;

    private Integer number;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContractNum() {
        return contractNum;
    }

    public void setContractNum(String contractNum) {
        this.contractNum = contractNum == null ? null : contractNum.trim();
    }

    public String getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(String goodsNum) {
        this.goodsNum = goodsNum == null ? null : goodsNum.trim();
    }

    public String getEndPlace() {
        return endPlace;
    }

    public void setEndPlace(String endPlace) {
        this.endPlace = endPlace == null ? null : endPlace.trim();
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "CarrageGoods{" +
                "id=" + id +
                ", contractNum='" + contractNum + '\'' +
                ", goodsNum='" + goodsNum + '\'' +
                ", endPlace='" + endPlace + '\'' +
                ", number=" + number +
                ", msg='" + msg + '\'' +
                ", pages=" + pages +
                ", totalpages=" + totalpages +
                ", status1=" + status1 +
                ", limit=" + limit +
                ", sbTime='" + sbTime + '\'' +
                ", seTime='" + seTime + '\'' +
                '}';
    }
}