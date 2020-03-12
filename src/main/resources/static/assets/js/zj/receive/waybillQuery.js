$(document).ready(function () {
    validate();
    console.log("123");
    tosearch(1);
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

function tosearch(page) {
    var tbody = $('#tbody'),
        html = "",
        onpage = $('#onpage'),
        totalPage = $('#totalPage');

    var param = {
        pages: page,
        limit: 10,
        waybillNum: $('#hidden_waybillNum').val(),
        customerName: $('#hidden_name').val(),
        status: $('#hidden_status').val(),
        sbTime: $('#hidden_sbTime').val(),
        seTime: $('#hidden_seTime').val()
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/waybillSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status = "未完成";
                if (data[i].status == 1){status = '正在配送';}
                if (data[i].status == 2){status = '完成';}
                var payWay = "现结";
                if (data[i].payWay == 1){payWay = '到付';}

                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].waybillNum + "</td>" +
                    "<td>" + data[i].consignTime + "</td><td>" + data[i].customerName + "</td><td>" + data[i].customerPhone + "</td>" +
                    "<td>" + data[i].beginPlace + "</td><td>" + data[i].freight + "</td><td>" + data[i].insurance + "</td>" +
                    "<td>" + payWay + "</td><td>" + data[i].salesmanNum + "</td><td>" + status + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a><button class='btn btn-success btn-icon btn-icon-standalone' type='button'  value='"+data[i].waybillNum+"' onclick='goGoodsQuery(this)'><i class=\"fa-pencil\"></i><span>修改</span></button> </a></button>" +

                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/waybillSearchCount",param);
}

function goGoodsQuery(Obj) {
    window.location.href="/goodsAdd/"+$(Obj).val();
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/waybillDeleteByid/" + id1,
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#modal-deleteConfirm').modal('hide');
            toastr.success("删除成功")
            tosearch(onpage);
        }
    })
}

$('#btn-search').click(function () {
    $('#hidden_name').val($('#search_customerName').val());
    $('#hidden_waybillNum').val($('#search_waybillNum').val());
    $('#hidden_status').val($('#search_status').val());
    $('#hidden_sbTime').val($('#search_sbTime').val());
    $('#hidden_seTime').val($('#search_seTime').val());
    // $('#hidden_stationName').val($('#search_stationName').val());
    tosearch(1);
})
