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
        name: $('#hidden_name').val(),
        // addr: $('#hidden_stationName').val(),
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/customerSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].name + "</td>" +
                    "<td>" + data[i].phone + "</td><td>" + data[i].addr + "</td>" +
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

    getSearchTotalPage("/customerSearchCount",param);
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
        url: "/customerDeleteByid/" + id1,
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

function insert1(Obj) {
    var bv = $('#form-insert').data("bootstrapValidator");
    var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        var phoneflag = checkCustomerPhone($('#bill_phone').val());
        if (phoneflag == true) {
            var param = {
                name: $('#bill_name').val(),
                phone: $('#bill_phone').val(),
                addr: $('#bill_addr').val()
            }

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/customerInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    $('#addmodal').modal('hide');
                    $('#bill_name').val(null);
                    $('#bill_phone').val(null);
                    $('#bill_addr').val(null);
                    toastr.success("添加成功");
                    //toPage(1);
                    window.location.href = "customerQuery";
                }
            })
        } else {
            var msg = '错误如下：\n';
            if (phoneflag == false) {
                msg += '此号码已拥有，请更换\n'
            }
            toastr.error(msg);
        }


    } else {
        toastr.error('请按规则填写');
    }
}
$('#btn-search').click(function () {
    $('#hidden_name').val($('#search_name').val());
    tosearch(1);
})