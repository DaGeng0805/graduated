package com.mjmju.zj.transport_manage.entity;

import java.math.BigDecimal;

public class GoodsInfo extends Dto{
    private Integer id;

    private String waybillNum;

    private String goodsNum;

    private String goodsName;

    private Integer number;

    private BigDecimal goodsValue;

    private BigDecimal weight;

    private BigDecimal insurance;

    private BigDecimal freight;

    private String receiverName;

    private String beginPlace;

    private String receiverPhone;

    private String receiverAddr;

    private String endPlace;

    private String deliveryTime;

    private String receiveTime;

    private Byte status;

    private Integer restante;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWaybillNum() {
        return waybillNum;
    }

    public void setWaybillNum(String waybillNum) {
        this.waybillNum = waybillNum == null ? null : waybillNum.trim();
    }

    public String getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(String goodsNum) {
        this.goodsNum = goodsNum == null ? null : goodsNum.trim();
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName == null ? null : goodsName.trim();
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public BigDecimal getGoodsValue() {
        return goodsValue;
    }

    public void setGoodsValue(BigDecimal goodsValue) {
        this.goodsValue = goodsValue;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public BigDecimal getInsurance() {
        return insurance;
    }

    public void setInsurance(BigDecimal insurance) {
        this.insurance = insurance;
    }

    public BigDecimal getFreight() {
        return freight;
    }

    public void setFreight(BigDecimal freight) {
        this.freight = freight;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName == null ? null : receiverName.trim();
    }

    public String getBeginPlace() {
        return beginPlace;
    }

    public void setBeginPlace(String beginPlace) {
        this.beginPlace = beginPlace == null ? null : beginPlace.trim();
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone == null ? null : receiverPhone.trim();
    }

    public String getReceiverAddr() {
        return receiverAddr;
    }

    public void setReceiverAddr(String receiverAddr) {
        this.receiverAddr = receiverAddr == null ? null : receiverAddr.trim();
    }

    public String getEndPlace() {
        return endPlace;
    }

    public void setEndPlace(String endPlace) {
        this.endPlace = endPlace == null ? null : endPlace.trim();
    }

    public String getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime == null ? null : deliveryTime.trim();
    }

    public String getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(String receiveTime) {
        this.receiveTime = receiveTime == null ? null : receiveTime.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public Integer getRestante() {
        return restante;
    }

    public void setRestante(Integer restante) {
        this.restante = restante;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }


    @Override
    public String toString() {
        return "GoodsInfo{" +
                "id=" + id +
                ", waybillNum='" + waybillNum + '\'' +
                ", goodsNum='" + goodsNum + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", number=" + number +
                ", goodsValue=" + goodsValue +
                ", weight=" + weight +
                ", insurance=" + insurance +
                ", freight=" + freight +
                ", receiverName='" + receiverName + '\'' +
                ", beginPlace='" + beginPlace + '\'' +
                ", receiverPhone='" + receiverPhone + '\'' +
                ", receiverAddr='" + receiverAddr + '\'' +
                ", endPlace='" + endPlace + '\'' +
                ", deliveryTime='" + deliveryTime + '\'' +
                ", receiveTime='" + receiveTime + '\'' +
                ", status=" + status +
                ", restante=" + restante +
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