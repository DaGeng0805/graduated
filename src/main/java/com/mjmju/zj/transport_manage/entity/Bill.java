package com.mjmju.zj.transport_manage.entity;

public class Bill extends Dto{
    private Integer id;

    private String beginNum;

    private String endNum;

    private String receiver;

    private String receiverPhone;

    private String distributePerson;

    private String distributePersionPhone;

    private String tationName;

    private String receiveTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBeginNum() {
        return beginNum;
    }

    public void setBeginNum(String beginNum) {
        this.beginNum = beginNum == null ? null : beginNum.trim();
    }

    public String getEndNum() {
        return endNum;
    }

    public void setEndNum(String endNum) {
        this.endNum = endNum == null ? null : endNum.trim();
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver == null ? null : receiver.trim();
    }

    public String getReceiverPhone() {
        return receiverPhone;
    }

    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone == null ? null : receiverPhone.trim();
    }

    public String getDistributePerson() {
        return distributePerson;
    }

    public void setDistributePerson(String distributePerson) {
        this.distributePerson = distributePerson == null ? null : distributePerson.trim();
    }

    public String getDistributePersionPhone() {
        return distributePersionPhone;
    }

    public void setDistributePersionPhone(String distributePersionPhone) {
        this.distributePersionPhone = distributePersionPhone == null ? null : distributePersionPhone.trim();
    }

    public String getTationName() {
        return tationName;
    }

    public void setTationName(String tationName) {
        this.tationName = tationName == null ? null : tationName.trim();
    }

    public String getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(String receiveTime) {
        this.receiveTime = receiveTime == null ? null : receiveTime.trim();
    }
}