$(document).ready(function () {
    validate();
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
            bill_name: {
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
            bill_phone: {
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
            bill_site: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            bill_rebates: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    greaterThan: {
                        value : 1,
                        message : '最小输入1'
                    },lessThan: {
                        value : 100,
                        message : '最大输入100'
                    }
                }
            }
        }
    })
}

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        if (isupdate == 'false') {
            var phoneflag = checkSalesmanPhone($('#bill_phone').val());
            var stationflag = checkStation($('#bill_site').val());
            if (phoneflag == true && stationflag == true){
                var param = {
                    name: $('#bill_name').val(),
                    phone: $('#bill_phone').val(),
                    addr: $('#bill_site').val(),
                    rebates: $('#bill_rebates').val()
                }

                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/salesmanInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        $('#bill_name').val(null),
                            $('#bill_phone').val(null),
                            $('#bill_site').val(null),
                            $('#bill_rebates').val(null)
                        toastr.success("添加成功");
                        //toPage(1);
                        window.location.href="salesmanQuery";
                    }
                })
            } else  {
                var msg = '错误如下：\n';
                if (phoneflag == false){msg += '此号码已拥有，请更换\n'}
                if (stationflag == false){msg += '无此站点\n'}
                toastr.error(msg);
            }
        }else {
            var stationflag = checkStation($('#bill_site').val());
            var onPage = $('#onpage').text();
            if ( stationflag == true){
                var param = {
                    id:$(Obj).val(),
                    name: $('#bill_name').val(),
                    phone: $('#bill_phone').val(),
                    addr: $('#bill_site').val(),
                    rebates: $('#bill_rebates').val()
                }
                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/salesmanUpdate",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        tosearch(onPage);
                        $('#bill_name').val(null);
                        $('#bill_phone').val(null);
                        $('#bill_site').val(null);
                        $('#bill_rebates').val(null);
                        $('#bill_name').removeAttr('readonly'),
                            $('#bill_phone').removeAttr('readonly');
                        toastr.success("修改成功");

                        $('#isupdateflag').val('false')

                    }
                })

            }else  {
                var msg = '错误如下：\n';
                if (stationflag == false){msg += '无此站点\n'}
                toastr.error(msg);
            }


        }


    } else {
        toastr.error('请按规则填写');
    }
}

function tosearch(page) {
    var tbody = $('#tbody'),
        html = "",
        onpage = $('#onpage'),
        totalPage = $('#totalPage');
    var param = {
        pages: page,
        limit: 10,
        name: $('#hidden_name').val(),
        addr: $('#hidden_stationName').val(),
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/salesmanSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].name + "</td>" +
                    "<td>" + data[i].phone + "</td><td>" + data[i].addr + "</td><td>" + data[i].rebates + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addmodal\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'"  +
                    "type='button' onclick='updatemodel(this)' pid='" + data[i].phone + "'><i class=\"fa-pencil\"></i><span>修改</span></button> </a>"+
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a>" +

                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/salesmanSearchCount",param);
}

// $('#first').click(function () {
//     tosearch(1);
// })
//
// $('#end').click(function () {
//     tosearch(getFinalPage());
// })
//
// $('#up').click(function () {
//     tosearch(getUpPage())
// })
//
// $('#down').click(function () {
//     tosearch(getDownPage())
// })
//
// $('#go').click(function (e) {
//     var result = getGoPage();
//     if (result == false){
//         toastr.warning("请输入正确数字")
//     }else {
//         tosearch(result);
//     }
// })

function sendid(Obj) {
    console.log($(Obj).attr("pid"))
    $('#confirm').val($(Obj).attr("pid"));
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/salesmanDeleteByid/" + id1,
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
    $('#hidden_name').val($('#search_name').val());
    $('#hidden_stationName').val($('#search_stationName').val());
    tosearch(1);
})

function updatemodel(Obj) {
    var phone = $(Obj).attr('pid');
    var id = $()
    $('#isupdateflag').val('true');

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "salesmanFindByPhone/"+phone,
        //data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
                $('#bill_name').val(d.name),
                $('#bill_phone').val(d.phone),
                $('#bill_site').val(d.addr),
                $('#bill_rebates').val(d.rebates),
                $('#bill_name').attr('readonly','readOnly'),
                $('#bill_phone').attr('readonly','readOnly');
                $('#btn-save').val(d.id);
        }
    })
}

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
    $('#bill_name').val(null);
    $('#bill_phone').val(null);
    $('#bill_site').val(null);
    $('#bill_rebates').val(null);
    $('#bill_name').removeAttr('readonly');
    $('#bill_phone').removeAttr('readonly');
    $('#isupdateflag').val('false')
});


