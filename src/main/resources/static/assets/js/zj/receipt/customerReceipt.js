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
            goodsNum: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            receiver: {
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
            receiveTime: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
}

function checkGoodsNum(){
    var goodsNum = $('#goodsNum').val();
    var flag = 'false';
    $.ajax({
        type: 'get',
        url: "/customerReceiveFindByGoodsNum/"+goodsNum,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data != '' && data != null) {
               flag = '该货物回执单号已经填写!'
            }else{
                $.ajax({
                    type: 'get',
                    url: "/goodsFindByGoodsNum/"+goodsNum,
                    async: false,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        if (d != '' && d != null) {
                            if (d.status == 2){
                                flag = 'true'
                            }else{
                                flag = '货物未运达!'
                            }
                        }else{
                            flag = '无此货物单号!'
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
            var checkstatus = checkGoodsNum();
            console.log(checkstatus)

            if (checkstatus == 'true' ){
                var param = {
                    goodsNum: $('#goodsNum').val(),
                    receiver: $('#receiver').val(),
                    receiveTime: $('#receiveTime').val()
                }

                console.log(JSON.stringify(param));
                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/customerReceiveInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        $('#goodsNum').val(null);
                        $('#receiver').val(null);
                        $('#receiveTime').val(null);
                        toastr.success("添加成功");

                        setTimeout(function () { window.location.href="customerReceiveQuery"; }, 2000);
                    }
                })
            } else  {
                var msg = '错误如下：\n';
                if (checkstatus != 'true'){msg += checkstatus+'\n'}
                toastr.error(msg);
            }
        }else {
            var checkstatus = checkGoodsNum();
            var onPage = $('#onpage').text();
            if ( checkstatus == 'true' || checkstatus=='该货物回执单号已经填写!'){
                var param = {
                    id:$(Obj).val(),
                    goodsNum: $('#goodsNum').val(),
                    receiver: $('#receiver').val(),
                    receiveTime: $('#receiveTime').val()
                }
                console.log(JSON.stringify(param));
                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/customerReceiveUpdate",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        tosearch(onPage);
                        $('#goodsNum').val(null);
                        $('#goodsNum').attr('readonly','readOnly');
                        $('#receiver').val(null);
                        $('#receiveTime').val(null);
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
        goodsNum: $('#hidden_goodsNum').val(),
        receiver: $('#hidden_receiver').val()
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/customerReceiveSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].goodsNum + "</td>" +
                    "<td>" + data[i].receiver + "</td><td>" + data[i].receiveTime + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addmodal\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'"  +
                    "type='button' onclick='updatemodel(this)' pid='" + data[i].goodsNum + "'><i class=\"fa-pencil\"></i><span>修改</span></button> </a>"+
                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/customerReceiveSearchCount",param);
}

$('#btn-search').click(function () {
    $('#hidden_goodsNum').val($('#search_goodsNum').val());
    $('#hidden_receiver').val($('#search_receiver').val());
    tosearch(1);
})

function updatemodel(Obj) {
    var goodsNum = $(Obj).attr('pid');
    $('#isupdateflag').val('true');

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "customerReceiveFindByGoodsNum/"+goodsNum,
        //data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#goodsNum').val(d.goodsNum);
            $('#receiver').val(d.receiver);
            $('#receiveTime').val(d.receiveTime);
            $('#btn-save').val(d.id);
            $('#goodsNum').attr('readonly','readOnly');

        }
    })
}

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
    $('#goodsNum').val(null);
    $('#receiver').val(null);
    $('#receiveTime').val(null);
    $('#goodsNum').removeAttr('readonly');
    $('#isupdateflag').val('false')
});