$(document).ready(function () {
    validate();
    // findByWaybill();
    getCarrageNum()
})

function getCarrageNum() {
    var now = new Date();
    var nowString = $.cookie("userid")+"-"+now.getFullYear()+(now.getMonth()+1)+now.getDay()+now.getHours()+now.getMinutes()+now.getSeconds();
    $('#contractNum').val(nowString);
}


function validate() {
    $('#form-insert').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            startTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            beginPlace: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            endPlace: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^1[3456789]\d{9}$/,
                        message: '格式有误'
                    }
                }
            },
            serviceCharge: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                        message: '请输入数字并最多保留两位小数'
                    }
                }
            },
            prepay: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
                        message: '请输入数字并最多保留两位小数'
                    }
                }
            },
            signTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            plateNum: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '请输入正确的车牌号'
                    }
                }
            }
        }
    })
}

function getDriverName(Obj) {
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/driverFindByPhone/"+$(Obj).val(),
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            if (d != null && d != "")
            {
                $('#driverName').val(d.driverName);
            }else {$('#driverName').val("");}
        }
    })
    
}

function getInStation(Obj){
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/truckSelectByPlateNum/"+$(Obj).val(),
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            if (d != null && d != "")
            {
                $('#inStation').val(d.stationName);
            }else {$('#inStation').val("");}
        }
    })
}

function checkTransfer(transferCount){
    var stationFlag = true;
    if ($('#isTransfer').val() == "true"){
        for (var i=1;i<=transferCount;i++){
            var tid = "transfer"+i;
            stationFlag = checkStation($('#'+tid).val());
        }
    }
    console.log(stationFlag);
    return stationFlag;
}

function insertBeginAndEnd(endNum){

    var beginParam = {
        contractNum: $('#contractNum').val(),
        stationName: $('#beginPlace').val(),
        flag: 0
    }

    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/transferInsert",
        data: JSON.stringify(beginParam),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            // toastr.success("添加成功");
            //toPage(1);
        }
    })

    var endParam = {
        contractNum: $('#contractNum').val(),
        stationName: $('#endPlace').val(),
        flag: endNum+1
    }

    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/transferInsert",
        data: JSON.stringify(endParam),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            // toastr.success("添加成功");
            //toPage(1);
            // findByWaybill();
        }
    })

}

function insert1() {
    var bv = $('#form-insert').data("bootstrapValidator");
    // var billNumFlag = checkWaybill($('#waybillNum').val());
    var stationFlag1 = checkStation($('#beginPlace').val());
    var stationFlag2 = checkStation($('#endPlace').val());
    var driverName = $('#driverName').val();
    var phoneFlag = true;
    if (driverName == null || driverName == ""){phoneFlag=false;}
    bv.validate();
    if (bv.isValid()) {
        var tf = $('#isTransfer').val();
        if (tf == "true"){
            var transferCount = parseInt($('#transferCount').val());
            var stationFlag = checkTransfer(transferCount);
            var stationRepidFlag = checkRepid(transferCount);
            var plateNumFlag = checkPlateNumAndStatus($('#plateNum').val());
            console.log("333"+plateNumFlag)

            if (stationFlag1 == true && stationFlag2 == true && phoneFlag == true && stationFlag == true &&
                stationRepidFlag == true && plateNumFlag == "true"){

                insertBeginAndEnd(transferCount)

                for (var i=1;i<=transferCount;i++){
                    var tid = "transfer"+i;

                    var tfparam = {
                        contractNum: $('#contractNum').val(),
                        stationName: $('#'+tid).val(),
                        flag: i
                    }

                    $.ajax({
                        type: 'post',
                        // dataType: 'json',
                        url: "/transferInsert",
                        data: JSON.stringify(tfparam),//序列化表单数据
                        async: true,
                        timeout: 10000,
                        headers: {"Content-Type": "application/json;charset=utf-8"},
                        success: function (d) {
                            // toastr.success("添加成功");
                            //toPage(1);
                            // findByWaybill();
                        }
                    })
                }



                var param = {
                    contractNum: $('#contractNum').val(),
                    startTime: $('#startTime').val(),
                    beginPlace: $('#beginPlace').val(),
                    endPlace: $('#endPlace').val(),
                    phone: $('#phone').val(),
                    driverName: $('#driverName').val(),
                    payWay: $('#payWay').val(),
                    serviceCharge: $('#serviceCharge').val(),
                    prepay: $('#prepay').val(),
                    signTime: $('#signTime').val(),
                    note: $('#plateNum').val()
                }
                console.log(JSON.stringify(param));

                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/carrageInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        toastr.success("添加成功");
                        //toPage(1);
                        // findByWaybill();
                    }
                })

                window.location.href="/carrageGoodsAdd/"+$('#contractNum').val();
            } else {
                var msg = '错误如下：</br>';
                if (stationFlag1 == false){msg += '出发站无此站点</br>'}
                if (stationFlag2 == false){msg += '到达站无此站点</br>'}
                if (phoneFlag == false){msg += '无此司机信息</br>'}
                if (plateNumFlag != "true"){msg += plateNumFlag+'</br>'}
                if (stationFlag == false){msg += '中转站有错误</br>'}
                if (stationRepidFlag == false){msg += '所有站点不允许重复</br>'}
                toastr.error(msg);
            }
        }else {
            var repidFlag = checkBeginAndEnd();
            var plateNumFlag = checkPlateNumAndStatus($('#plateNum').val());
            if (stationFlag1 == true && stationFlag2 == true && phoneFlag == true && repidFlag == true &&  plateNumFlag== "true"){

                insertBeginAndEnd(0)
                var param = {
                    contractNum: $('#contractNum').val(),
                    startTime: $('#startTime').val(),
                    beginPlace: $('#beginPlace').val(),
                    endPlace: $('#endPlace').val(),
                    phone: $('#phone').val(),
                    driverName: $('#driverName').val(),
                    payWay: $('#payWay').val(),
                    serviceCharge: $('#serviceCharge').val(),
                    prepay: $('#prepay').val(),
                    signTime: $('#signTime').val(),
                    note: $('#plateNum').val()
                }
                console.log(JSON.stringify(param));

                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/carrageInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        toastr.success("添加成功");
                    }
                })

                window.location.href="/carrageGoodsAdd/"+$('#contractNum').val();
            } else {
                var msg = '错误如下：</br>';
                if (stationFlag1 == false){msg += '出发站无此站点</br>'}
                if (stationFlag2 == false){msg += '到达站无此站点</br>'}
                if (plateNumFlag != "true"){msg += plateNumFlag+'</br>'}
                if (plateNumFlag == true){msg += '无此车牌号信息</br>'}
                if (repidFlag == false){msg += '所有站点不允许重复</br>'}
                toastr.error(msg);
            }

        }



    } else {
        toastr.error('请按规则填写');
    }
}

function addText() {

    var tranForm = $('#form-transfer');
    var number = parseInt($('#transferCount').val()) + 1;
    if (number > 4){ toastr.error("中转站不宜超过4个");}
    else{
        $('#transferCount').val(parseInt($('#transferCount').val())+1);
        var transferString = "transfer" + number;
        var tranString = "中转站"+number;

        var html ="<div class=\"form-group\" >\n" +
            "                        <label  class=\"col-sm-2 control-label\">"+tranString+"</label>\n" +
            "                        <div class=\"col-sm-10\">\n" +
            "                            <input type=\"text\" class=\"form-control\" id=\""+transferString+"\" placeholder=\"站点名称\" autocomplete='off'>" +
            "                            <input type=\"hidden\" id=\""+transferString+"Value"+"\">"
            "                        </div>\n" +
            "                    </div>";
        tranForm.append(html);
        initahr();
    }

}

function checkPlateNumAndStatus(plateNum) {
    var msg = "true" ;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/truckSelectByPlateNum/"+plateNum,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            console.log(data)
            if (data != "" && data != null){
                if (data.status == 1){msg = "车辆正在被使用";}
                if (data.stationName != $('#beginPlace').val()){msg = "车辆不在起点站"}
            }else {
                msg = "无此车牌信息";
            }
        }
    })
    console.log(msg)
    return msg;
}

function addInit() {
    var tranForm = $('#form-transfer');
    var transferString = "transfer" + 1;
    var tranString = "中转站"+1;
    var html ="<div class=\"form-group\" >\n" +
        "                        <label  class=\"col-sm-2 control-label\">"+tranString+"</label>\n" +
        "                        <div class=\"col-sm-10\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\""+transferString+"\" placeholder=\"站点名称\">\n" +
        " <input type=\"hidden\" id=\"transfer1Value\">"+
        "                        </div>\n" +
        "                    </div>";
    tranForm.html(html);
    $('#transferCount').val("1");
    initahr();
}

function haveTransfer() {
    $('#isTransfer').val("true");
    $('#transferModal').modal('hide');
}

function initahr() {
    $("#transfer1").typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/getListStationName/'+query,
                type: 'get',
                //data: {name: query},
                success: function (result) {
                    console.log(JSON.stringify(result));
                    return process(result);
                },
            });
        }

    });

    $("#transfer2").typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/getListStationName/'+query,
                type: 'get',
                //data: {name: query},
                success: function (result) {
                    console.log(JSON.stringify(result));
                    return process(result);
                },
            });
        }

    });

    $("#transfer3").typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/getListStationName/'+query,
                type: 'get',
                //data: {name: query},
                success: function (result) {
                    console.log(JSON.stringify(result));
                    return process(result);
                },
            });
        }

    });

    $("#transfer4").typeahead({
        source: function (query, process) {
            return $.ajax({
                url: '/getListStationName/'+query,
                type: 'get',
                //data: {name: query},
                success: function (result) {
                    console.log(JSON.stringify(result));
                    return process(result);
                },
            });
        }
    });

}


function checkRepid(num) {
    var stationString="";
    var flag = true;
    var stationBegin = $('#beginPlace').val();
    stationString += stationBegin;
    console.log("ppp"+stationString.indexOf($('#endPlace').val()) != -1)
    if (stationString.indexOf($('#endPlace').val()) != -1){//重复
        flag=false;
    }else{
        stationString += $('#endPlace').val();
    }
    for (var i=1;i<=num;i++){
        var stationNum = 'transfer'+i;
        if (stationString.indexOf($('#'+stationNum).val()) != -1){//重复
            flag=false;
        }else{
            stationString += $('#'+stationNum).val()
        }
    }
    console.log(stationString);
    return flag;
}

function checkBeginAndEnd() {
    if ($('#beginPlace').val()==$('#endPlace').val()){
        return false;
    }else {return true;}
}
