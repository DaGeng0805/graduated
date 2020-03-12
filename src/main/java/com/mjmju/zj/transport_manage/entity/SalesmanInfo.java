package com.mjmju.zj.transport_manage.entity;

public class SalesmanInfo extends Dto{
    private Integer id;

    private String number;

    private String name;

    private String phone;

    private String addr;

    private Integer rebates;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr == null ? null : addr.trim();
    }

    public Integer getRebates() {
        return rebates;
    }

    public void setRebates(Integer rebates) {
        this.rebates = rebates;
    }
}