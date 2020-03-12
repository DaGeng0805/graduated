$(document).ready(function () {
    validate();
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
            waybillNum: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 4,
                        max: 10,
                        message: '该数字最小为四位数'
                    },
                    digits: {
                        message: '该值只能包含数字。'
                    }
                }
            },
            consign_time: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            customerName: {
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
            customerPhone: {
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
            customerAddr: {
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
            entryPerson: {
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
            entryTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            note: {
                stringLength: {
                    max: 200,
                    message: '该数字最小为四位数'
                },
            }
        }
    })
}

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    var billNumFlag = checkWaybill($('#waybillNum').val());
    var stationFlag = checkStation($('#beginPlace').val());
    var salseman = $('#salesman').val();

    bv.validate();
    if (bv.isValid()) {
        // var phoneflag = checkCustomerPhone($('#bill_phone').val());
        if (billNumFlag == true && stationFlag == true){
            var param = {
                waybillNum: $('#waybillNum').val(),
                consignTime: $('#consignTime').val(),
                customerName: $('#customerName').val(),
                customerPhone: $('#customerPhone').val(),
                customerAddr: $('#customerAddr').val(),
                beginPlace: $('#beginPlace').val(),
                payWay: $('#payWay').val(),
                salesmanNum: $('#salesman').val(),
                entryPerson: $('#entryPerson').val(),
                entryTime: $('#entryTime').val(),
                freight: 0,
                insurance: 0,
                note: $('#note').val()
            }
            console.log(JSON.stringify(param));

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/waybillInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    toastr.success("添加成功");
                    //toPage(1);
                    window.location.href = "goodsAdd/"+$('#waybillNum').val();
                }
            })
        } else {
            var msg = '错误如下：</br>';
            if (billNumFlag == false){msg += '无此运单编号或运单已经被填写</br>'}
            if (stationFlag == false){msg += '无此站点</br>'}
            toastr.error(msg);
        }

    } else {
        toastr.error('请按规则填写');
    }
}

