$(document).ready(function () {
    validate();
    findByWaybill();
})

function validate() {
    $('#form-insert').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            goodsName: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            number: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 1,
                        max: 3,
                        message: '该数字最小为四位数'
                    },
                    digits: {
                        message: '该值只能包含数字。'
                    }
                }
            },
            goodsValue: {
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
            weight: {
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
            volume: {
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
            freight: {
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
            receiverName: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]{2,4}$/,
                        message: '请输入2-4个中文'
                    }
                }
            },
            receiverPhone: {
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
            deliveryTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
}

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    // var billNumFlag = checkWaybill($('#waybillNum').val());
     var stationFlag = checkStation($('#endPlace').val());
     var repid = checkRepid();
    // var salseman = $('#salesman').val();

    bv.validate();
    if (bv.isValid()) {
        if (stationFlag == true && repid == true){
            var param = {
                waybillNum: $('#waybillNum').val(),
                goodsNum: $('#goodsNum').val(),
                goodsName: $('#goodsName').val(),
                number: $('#number').val(),
                restante: $('#number').val(),
                goodsValue: $('#goodsValue').val(),
                weight: $('#weight').val(),
                insurance: $('#insurance').val(),
                freight: $('#freight').val(),
                receiverName: $('#receiverName').val(),
                receiverPhone: $('#receiverPhone').val(),
                beginPlace: $('#beginPlace').val(),
                endPlace: $('#endPlace').val(),
                deliveryTime: $('#deliveryTime').val(),
                receiveTime: $('#receiveTime').val()
            }
            console.log(JSON.stringify(param));

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/goodsInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    toastr.success("添加成功");
                    //toPage(1);
                    findByWaybill();
                }
            })
        } else {
            var msg = '错误如下：</br>';
            if (stationFlag == false){msg += '无此站点</br>'}
            if (repid == false){msg += '终点站不能与起点站重复</br>'}
            toastr.error(msg);
        }

    } else {
        toastr.error('请按规则填写');
    }
}

function checkRepid() {
    var beginPlace = $('#beginPlace').val();
    var endPlace = $('#endPlace').val();
    if (beginPlace != endPlace) {return true;}else{return false;}
}

function findByWaybill(){
    console.log($('#waybillNum').val());
    var tbody = $('#tBody');
    var html = "";
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/goodsSelectByWaybillNum/"+$('#waybillNum').val(),
        //data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            var goodsNum;
            if (data.length == 0){goodsNum = $('#waybillNum').val()+'-1'}
            else {goodsNum =$('#waybillNum').val() + '-' + (parseInt(data[0].goodsNum.split('-')[1])+1)}
            $('#goodsNum').val(goodsNum);
            tbody.html(html);
            if (data[0].msg == 'true'){
                for (var i = 0; i < data.length; i++) {
                    html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].waybillNum + "</td>" +
                        "<td>" + data[i].goodsNum + "</td><td>" + data[i].goodsName + "</td><td>" + data[i].number + "</td>" +
                        "<td>" + data[i].goodsValue + "</td><td>" + data[i].weight + "</td><td>" + data[i].insurance + "</td>" +
                        "<td>" + data[i].freight + "</td><td>" + data[i].receiverName + "</td><td>" + data[i].receiverPhone + "</td>" +
                        "<td>" + data[i].beginPlace + "</td><td>" + data[i].endPlace + "</td><td>" + data[i].receiveTime + "</td>" +
                        "<td>" +
                        "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                        "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a>" +
                        "</td>" +
                        "</tr>"
                }
                tbody.html(html);
            } else {
                for (var i = 0; i < data.length; i++) {
                    html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].waybillNum + "</td>" +
                        "<td>" + data[i].goodsNum + "</td><td>" + data[i].goodsName + "</td><td>" + data[i].number + "</td>" +
                        "<td>" + data[i].goodsValue + "</td><td>" + data[i].weight + "</td><td>" + data[i].insurance + "</td>" +
                        "<td>" + data[i].freight + "</td><td>" + data[i].receiverName + "</td><td>" + data[i].receiverPhone + "</td>" +
                        "<td>" + data[i].beginPlace + "</td><td>" + data[i].endPlace + "</td><td>" + data[i].receiveTime + "</td>" +
                        // "<td>" +
                        // "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                        // "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a>" +
                        // "</td>" +
                        "</tr>"
                }
                tbody.html(html);
            }



        }
    })
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/goodsDeleteByid/" + id1,
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#modal-deleteConfirm').modal('hide');
            toastr.success("删除成功")
            findByWaybill();
        }
    })
}