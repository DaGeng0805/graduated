package com.mjmju.zj.transport_manage.entity;

import java.math.BigDecimal;
import java.util.Date;

public class Waybill extends Dto{
    private Integer id;

    private String waybillNum;

    private String consignTime;

    private String customerName;

    private String customerPhone;

    private String customerAddr;

    private String beginPlace;

    private BigDecimal freight;

    private BigDecimal insurance;

    private Byte payWay;

    private String salesmanNum;

    private String entryPerson;

    private String entryTime;

    private String note;

    private Byte status;

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

    public String getConsignTime() {
        return consignTime;
    }

    public void setConsignTime(String consignTime) {
        this.consignTime = consignTime == null ? null : consignTime.trim();
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName == null ? null : customerName.trim();
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone == null ? null : customerPhone.trim();
    }

    public String getCustomerAddr() {
        return customerAddr;
    }

    public void setCustomerAddr(String customerAddr) {
        this.customerAddr = customerAddr == null ? null : customerAddr.trim();
    }

    public String getBeginPlace() {
        return beginPlace;
    }

    public void setBeginPlace(String beginPlace) {
        this.beginPlace = beginPlace == null ? null : beginPlace.trim();
    }

    public BigDecimal getFreight() {
        return freight;
    }

    public void setFreight(BigDecimal freight) {
        this.freight = freight;
    }

    public BigDecimal getInsurance() {
        return insurance;
    }

    public void setInsurance(BigDecimal insurance) {
        this.insurance = insurance;
    }

    public Byte getPayWay() {
        return payWay;
    }

    public void setPayWay(Byte payWay) {
        this.payWay = payWay;
    }

    public String getSalesmanNum() {
        return salesmanNum;
    }

    public void setSalesmanNum(String salesmanNum) {
        this.salesmanNum = salesmanNum == null ? null : salesmanNum.trim();
    }

    public String getEntryPerson() {
        return entryPerson;
    }

    public void setEntryPerson(String entryPerson) {
        this.entryPerson = entryPerson == null ? null : entryPerson.trim();
    }

    public String getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(String entryTime) {
        this.entryTime = entryTime;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note == null ? null : note.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Waybill{" +
                "id=" + id +
                ", waybillNum='" + waybillNum + '\'' +
                ", consignTime='" + consignTime + '\'' +
                ", customerName='" + customerName + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", customerAddr='" + customerAddr + '\'' +
                ", beginPlace='" + beginPlace + '\'' +
                ", freight=" + freight +
                ", insurance=" + insurance +
                ", payWay=" + payWay +
                ", salesmanNum='" + salesmanNum + '\'' +
                ", entryPerson='" + entryPerson + '\'' +
                ", entryTime=" + entryTime +
                ", note='" + note + '\'' +
                ", status=" + status +
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