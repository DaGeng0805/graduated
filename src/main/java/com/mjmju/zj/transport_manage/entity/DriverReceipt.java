package com.mjmju.zj.transport_manage.entity;

public class DriverReceipt extends Dto{
    private Integer id;

    private String contractNum;

    private String driverName;

    private String accepter;

    private String checkTime;

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

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName == null ? null : driverName.trim();
    }

    public String getAccepter() {
        return accepter;
    }

    public void setAccepter(String accepter) {
        this.accepter = accepter == null ? null : accepter.trim();
    }

    public String getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(String checkTime) {
        this.checkTime = checkTime == null ? null : checkTime.trim();
    }

    @Override
    public String toString() {
        return "DriverReceipt{" +
                "id=" + id +
                ", contractNum='" + contractNum + '\'' +
                ", driverName='" + driverName + '\'' +
                ", accepter='" + accepter + '\'' +
                ", checkTime='" + checkTime + '\'' +
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