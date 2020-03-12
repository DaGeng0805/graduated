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
            contractNum: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },accepter: {
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
            checkTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
}

function getDriverName(){
    var flag = 'false';

    $.ajax({
        type: 'get',
        url: "/driverReceiveFindByContractNum/"+$('#contractNum').val(),
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data != '' && data != null) {
                flag = '该司机回执已存在'
                toastr.error('该司机回执已存在');
            }else{
                $.ajax({
                    type: 'get',
                    url: "/carrageFindByContractNum/"+$('#contractNum').val(),
                    async: false,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        if (d != '' && d != null) {
                            $('#driverName').val(d.driverName);
                            if (d.status == 2) {
                                flag='true';
                            }else{
                                flag='该合同还未完成!';
                            }
                        }else{
                            flag = '该合同不存在';
                        }

                    }
                })
            }

        }
    })
    return flag;
}

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        if (isupdate == 'false') {
            var checkstatus = getDriverName();
            console.log(checkstatus)

            if (checkstatus == 'true' ){
                var param = {
                    contractNum: $('#contractNum').val(),
                    driverName: $('#driverName').val(),
                    accepter: $('#accepter').val(),
                    checkTime: $('#checkTime').val()
                }

                console.log(JSON.stringify(param));
                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/driverReceiveInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        $('#contractNum').val(null);
                        $('#driverName').val(null);
                        $('#accepter').val(null);
                        $('#checkTime').val(null);
                        toastr.success("添加成功");

                        setTimeout(function () { window.location.href="driverReceiveQuery"; }, 2000);
                    }
                })
            } else  {
                var msg = '错误如下：\n';
                if (checkstatus != 'true'){msg += checkstatus+'\n'}
                toastr.error(msg);
            }
        }else {
            var checkstatus = getDriverName();
            var onPage = $('#onpage').text();
            if ( checkstatus == 'true' || checkstatus=='该司机回执已存在'){
                var param = {
                    id:$(Obj).val(),
                    contractNum: $('#contractNum').val(),
                    driverName: $('#driverName').val(),
                    accepter: $('#accepter').val(),
                    checkTime: $('#checkTime').val()
                }
                console.log(JSON.stringify(param));
                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/driverReceiveUpdate",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        tosearch(onPage);
                        $('#contractNum').val(null);
                        $('#driverName').val(null);
                        $('#accepter').val(null);
                        $('#checkTime').val(null);
                        $('#contractNum').removeAttr('readonly');
                        toastr.success("修改成功");
                        $('#isupdateflag').val('false')
                    }
                })

            }else  {
                var msg = '错误如下：\n';
                if (checkstatus != 'true'){msg += checkstatus+'\n'}
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
        contractNum: $('#hidden_contractNum').val(),
        driverName: $('#hidden_driverName').val()
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/driverReceiveSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].contractNum + "</td>" +
                    "<td>" + data[i].driverName + "</td><td>" + data[i].accepter + "</td><td>" + data[i].checkTime + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addmodal\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'"  +
                    "type='button' onclick='updatemodel(this)' pid='" + data[i].contractNum + "'><i class=\"fa-pencil\"></i><span>修改</span></button> </a>"+
                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/driverReceiveSearchCount",param);
}

$('#btn-search').click(function () {
    $('#hidden_contractNum').val($('#search_contractNum').val());
    $('#hidden_driverName').val($('#search_driverName').val());
    tosearch(1);
})

function updatemodel(Obj) {
    var contractNum = $(Obj).attr('pid');
    $('#isupdateflag').val('true');

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "driverReceiveFindByContractNum/"+contractNum,
        //data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#contractNum').val(d.contractNum);
            $('#driverName').val(d.driverName);
            $('#accepter').val(d.accepter);
            $('#checkTime').val(d.checkTime);
            $('#contractNum').attr('readonly','readOnly');
            $('#btn-save').val(d.id);
        }
    })
}

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
    $('#contractNum').val(null);
    $('#driverName').val(null);
    $('#accepter').val(null);
    $('#checkTime').val(null);
    $('#contractNum').removeAttr('readonly');
    $('#isupdateflag').val('false')
});