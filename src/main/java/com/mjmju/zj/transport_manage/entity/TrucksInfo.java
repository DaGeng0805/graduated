package com.mjmju.zj.transport_manage.entity;

public class TrucksInfo extends Dto{
    private Integer id;

    private String plateNum;

    private Byte type;

    private String drivingLicence;

    private Byte status;

    private String stationName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlateNum() {
        return plateNum;
    }

    public void setPlateNum(String plateNum) {
        this.plateNum = plateNum == null ? null : plateNum.trim();
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public String getDrivingLicence() {
        return drivingLicence;
    }

    public void setDrivingLicence(String drivingLicence) {
        this.drivingLicence = drivingLicence == null ? null : drivingLicence.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName == null ? null : stationName.trim();
    }

    @Override
    public String toString() {
        return "TrucksInfo{" +
                "id=" + id +
                ", plateNum='" + plateNum + '\'' +
                ", type=" + type +
                ", drivingLicence='" + drivingLicence + '\'' +
                ", status=" + status +
                ", stationName='" + stationName + '\'' +
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