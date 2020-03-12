package com.mjmju.zj.transport_manage.entity;

public class DetailBill extends Dto{
    private Integer id;

    private String billNum;

    private Byte status;

    private String writeTime;

    private String receiver;

    private String receiverPhone;

    private String distributePerson;

    private String distributePersonPhone;

    private String receivePlace;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBillNum() {
        return billNum;
    }

    public void setBillNum(String billNum) {
        this.billNum = billNum == null ? null : billNum.trim();
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getWriteTime() {
        return writeTime;
    }

    public void setWriteTime(String writeTime) {
        this.writeTime = writeTime == null ? null : writeTime.trim();
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

    public String getDistributePersonPhone() {
        return distributePersonPhone;
    }

    public void setDistributePersonPhone(String distributePersonPhone) {
        this.distributePersonPhone = distributePersonPhone == null ? null : distributePersonPhone.trim();
    }

    public String getReceivePlace() {
        return receivePlace;
    }

    public void setReceivePlace(String receivePlace) {
        this.receivePlace = receivePlace == null ? null : receivePlace.trim();
    }

    @Override
    public String toString() {
        return "DetailBill{" +
                "id=" + id +
                ", billNum='" + billNum + '\'' +
                ", status=" + status +
                ", writeTime='" + writeTime + '\'' +
                ", receiver='" + receiver + '\'' +
                ", receiverPhone='" + receiverPhone + '\'' +
                ", distributePerson='" + distributePerson + '\'' +
                ", distributePersonPhone='" + distributePersonPhone + '\'' +
                ", receivePlace='" + receivePlace + '\'' +
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