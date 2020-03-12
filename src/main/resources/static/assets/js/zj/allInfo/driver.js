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
            bill_licence: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/,
                        message: '格式有误'
                    }
                }
            }
        }
    })
}

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    //var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        var phoneflag = checkDriverPhone($('#bill_phone').val());
        var licenceflag = checkDriverLicence($('#bill_licence').val());
        if (phoneflag == true && licenceflag == true) {
            var param = {
                driverName: $('#bill_name').val(),
                phone: $('#bill_phone').val(),
                licence: $('#bill_licence').val()
            }

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/driverInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    $('#addmodal').modal('hide');
                    $('#bill_name').val(null);
                    $('#bill_phone').val(null);
                    $('#bill_licence').val(null);
                    toastr.success("添加成功");
                    //toPage(1);
                    window.location.href = "driverQuery";
                }
            })
        } else {
            var msg = '错误如下：\n';
            if (phoneflag == false) {
                msg += '此号码已拥有，请更换</br>'
            }
            if (licenceflag == false) {
                msg += '驾驶证已有，请更换</br>'
            }
            toastr.error(msg);
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
        driverName: $('#hidden_name').val(),
    }

    console.log(JSON.stringify(param));
    if ($.cookie('biggest') != null) {
        $.ajax({
            type: 'post',
            //dataType: 'json',
            url: "/driverSearch",
            data: JSON.stringify(param),
            async: true,
            timeout: 10000,
            headers: {"Content-Type": "application/json;charset=utf-8"},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].driverName + "</td>" +
                        "<td>" + data[i].phone + "</td><td>" + data[i].licence + "</td><td>" + data[i].password + "</td>" +
                        // "<td></td>"
                        "<td>" +
                        "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                        "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a>" +

                        "</td>" +
                        "</tr>"
                }
                tbody.html(html);
                onpage.html(page);
            }
        })
        getSearchTotalPage("/driverSearchCount",param);
    }else   {
        $.ajax({
            type: 'post',
            //dataType: 'json',
            url: "/driverSearch",
            data: JSON.stringify(param),
            async: true,
            timeout: 10000,
            headers: {"Content-Type": "application/json;charset=utf-8"},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].driverName + "</td>" +
                        "<td>" + data[i].phone + "</td><td>" + data[i].licence + "</td>" +
                        // "<td></td>"
                        "<td>" +
                        "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                        "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a>" +
                        "</td>" +
                        "</tr>"
                }
                tbody.html(html);
                onpage.html(page);
            }
        })
        getSearchTotalPage("/driverSearchCount",param);
    }
}

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
        url: "/driverDeleteByid/" + id1,
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
    tosearch(1);
})

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
});


