package com.mjmju.zj.transport_manage.entity;

import java.math.BigDecimal;

public class SalesmanRebates extends Dto{
    private Integer id;

    private String number;

    private String waybillNum;

    private String recordDate;

    private BigDecimal rebates;

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

    public String getWaybillNum() {
        return waybillNum;
    }

    public void setWaybillNum(String waybillNum) {
        this.waybillNum = waybillNum == null ? null : waybillNum.trim();
    }

    public String getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate == null ? null : recordDate.trim();
    }

    public BigDecimal getRebates() {
        return rebates;
    }

    public void setRebates(BigDecimal rebates) {
        this.rebates = rebates;
    }
}