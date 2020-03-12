$(document).ready(function () {
    validate();
    console.log($.cookie('biggest')+"111");
    var tbody = $('#tbody'),
        html = "";

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "/managerPage/1",
        //data: addform.serialize(),//序列化表单数据
        async: false,
        timeout: 10000,
        success: function (data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].name + "</td>" +
                    "<td>" + data[i].phone + "</td><td>" + data[i].addr + "</td><td>" + data[i].password + "</td>" +
                    // "<td></td>"
                    "<td><a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>罢免</span></button> </a></td>"
                "</tr>"
            }
            tbody.html(html);
        }
    })
})


function insert1() {
    var bv = $('#form-insert').data("bootstrapValidator");
    bv.validate();
    if (bv.isValid()) {
        var phoneflag = checkSiteManagerPhone($('#bill_phone').val());
        var stationflag = checkStation($('#bill_site').val());
        if (phoneflag == true && stationflag == true){
            var isonly = "";
            $.ajax({
                type: 'get',
                // dataType: 'json',
                url: "/checkOnlyManager/"+$('#bill_site').val(),
                //data: JSON.stringify(param),//序列化表单数据
                async: false,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (data) {
                    if (data == "false"){
                        var msg = '错误如下：\n';
                        msg += "此站点已有负责人";
                        toastr.error(msg);
                    } else {
                        var param = {
                            name: $('#bill_name').val(),
                            phone: $('#bill_phone').val(),
                            addr: $('#bill_site').val()
                        }

                        $.ajax({
                            type: 'post',
                            // dataType: 'json',
                            url: "/managerInsert",
                            data: JSON.stringify(param),//序列化表单数据
                            async: false,
                            timeout: 10000,
                            headers: {"Content-Type": "application/json;charset=utf-8"},
                            success: function (d) {
                                $('#addmodal').modal('hide');
                                $('#bill_name').val(null),
                                    $('#bill_phone').val(null),
                                    $('#bill_site').val(null)
                                toastr.success("添加成功");
                                //toPage(1);
                                window.location.href="managerQuery";
                            }
                        })
                    }
                }
            })
        } else  {
            var msg = '错误如下：\n';
            if (phoneflag == false){msg += '此号码已拥有，请更换\n'}
            if (stationflag == false){msg += '无此站点\n'}
            toastr.error(msg);
        }

    } else {
        toastr.error('请按规则填写');
    }
}


$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
});


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
            }
        }
    })
}

function sendid(Obj) {
    console.log($(Obj).attr("pid"))
    $('#confirm').val($(Obj).attr("pid"));
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    //console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/deleteByid/" + id1,
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#modal-deleteConfirm').modal('hide');
            toastr.success("罢免成功")
            toPage(onpage);
        }
    })
}

$('#first').click(function () {
    tosearch(1);
})

$('#end').click(function () {
    tosearch(getFinalPage());
})

$('#up').click(function () {
    tosearch(getUpPage())
})

$('#down').click(function () {
    tosearch(getDownPage())
})

$('#go').click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    var result = getGoPage();
    if (result == false){
        toastr.warning("请输入正确数字")
    }else {
        tosearch(result);
    }
})

function toPage(page) {
    var tbody = $('#tbody'),
        html = "",
        onpage = $('#onpage');
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "/managerPage/" + page,
        //data: addform.serialize(),//序列化表单数据
        async: true,
        timeout: 10000,
        success: function (data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].name + "</td>" +
                    "<td>" + data[i].phone + "</td><td>" + data[i].addr + "</td><td>" + data[i].password + "</td>" +
                    // "<td></td>"
                    "<td><a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>罢免</span></button> </a></td>"
                "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
}

$('#btn-search').click(function () {
    $('#hidden_name').val($('#search_name').val());
    $('#hidden_stationName').val($('#search_stationName').val());
    tosearch(1);
})


function tosearch(page) {
    var tbody = $('#tbody'),
        html = "",
        onpage = $('#onpage'),
        totalPage = $('#totalPage');
    var param = {
        pages:page,
        limit:10,
        name:$('#hidden_name').val(),
        addr:$('#hidden_stationName').val()
    }
    console.log( JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/managerSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].name + "</td>" +
                    "<td>" + data[i].phone + "</td><td>" + data[i].addr + "</td><td>" + data[i].password + "</td>" +
                    // "<td></td>"
                    "<td><a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>罢免</span></button> </a></td>"
                "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })


    getSearchTotalPage('/managerSearchCount',param);
    // $.ajax({
    //     type: 'post',
    //     //dataType: 'json',
    //     url: "/managerSearchCount",
    //     data: JSON.stringify(param),
    //     async: true,
    //     timeout: 10000,
    //     headers: {"Content-Type": "application/json;charset=utf-8"},
    //     success: function (data) {
    //         console.log(data);
    //         totalPage.val(data);
    //     }
    // })
}
