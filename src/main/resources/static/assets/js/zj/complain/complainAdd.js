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
                        message: '该单号为4-10位数字'
                    },
                    digits: {
                        message: '该输入栏只能包含数字。'
                    }
                }
            },
            content: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 10,
                        max: 250,
                        message: '投诉内容必须在10-250个字之间'
                    }
                }
            },
            name: {
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
            time: {
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
    var waybillFlag = checkWaybillIsDone($('#waybillNum').val());
    bv.validate();
    if (bv.isValid()) {
        if (waybillFlag == true){
            var param = {
                waybillNum: $('#waybillNum').val(),
                content: $('#content').val(),
                complainant: $('#name').val(),
                phone: $('#phone').val(),
                time: $('#time').val(),
            }
            console.log(JSON.stringify(param));

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/complainInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    toastr.success("添加成功");
                    window.location.href="#";
                }
            })
        } else {
            var msg = '错误如下：</br>';
            if (waybillFlag == false){msg += '此订单还未完成或无此订单</br>'}
            toastr.error(msg);
        }

    } else {
        toastr.error('请按规则填写');
    }
}


