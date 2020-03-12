package com.mjmju.zj.transport_manage.entity;

import java.math.BigDecimal;

public class DriverRetainage extends Dto{
    private Integer id;

    private String number;

    private String contractNum;

    private String recordDate;

    private BigDecimal retainage;

    private Byte status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number == null ? null : number.trim();
    }

    public String getContractNum() {
        return contractNum;
    }

    public void setContractNum(String contractNum) {
        this.contractNum = contractNum == null ? null : contractNum.trim();
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate == null ? null : recordDate.trim();
    }

    public BigDecimal getRetainage() {
        return retainage;
    }

    public void setRetainage(BigDecimal retainage) {
        this.retainage = retainage;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}