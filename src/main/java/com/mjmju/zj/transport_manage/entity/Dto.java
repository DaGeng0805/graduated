package com.mjmju.zj.transport_manage.entity;

public class Dto {

    public String msg;

    public int pages;

    public int totalpages;

    public int status1;

    public int limit;

    public String sbTime;

    public String seTime;



    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public int getTotalpages() {
        return totalpages;
    }

    public void setTotalpages(int totalpages) {
        this.totalpages = totalpages;
    }


    public int getLimit() {
        return limit;
    }

    public int getStatus1() {
        return status1;
    }

    public void setStatus1(int status1) {
        this.status1 = status1;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getSbTime() {
        return sbTime;
    }

    public void setSbTime(String sbTime) {
        this.sbTime = sbTime;
    }

    public String getSeTime() {
        return seTime;
    }

    public void setSeTime(String seTime) {
        this.seTime = seTime;
    }
}
