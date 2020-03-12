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
            bill_plate_num: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '请输入正确的车牌号'
                    }
                }
            },
            bill_addr: {
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
    //var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        var plamFlag = checkPlateNum($('#bill_plate_num').val())
        var stationflag = checkStation($('#bill_addr').val());
        if (stationflag == true && plamFlag == true) {
            var param = {
                plateNum: $('#bill_plate_num').val(),
                type: $('#bill_type').val(),
                status: 0,
                stationName: $('#bill_addr').val()
            }

            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/truckInsert",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    $('#addmodal').modal('hide');
                    $('#bill_plate_num').val(null);
                    $('#bill_type').val('');
                    $('#bill_addr').val(null);
                    toastr.success("添加成功");
                    //toPage(1);
                    window.location.href = "truckQuery";
                }
            })
        } else {
            var msg = '错误如下：</br>';
            if (stationflag == false) {
                msg += '无此站点</br>'
            }
            if (plamFlag == false) {
                msg += '已有此车牌号</br>'
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
        type: $('#hidden_type').val(),
        status: $('#hidden_status').val(),
        stationName: $('#hidden_addr').val()
    }

    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/truckSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var type = '';
                if (data[i].type==0){type="大型车";}
                if (data[i].type==1){type="中型车";}
                if (data[i].type==2){type="小型车";}
                var status = '';
                if (data[i].status==0){status='未使用'}
                if (data[i].status==1){status='在使用'}

                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].plateNum + "</td>" +
                    "<td>" + type + "</td><td>" + data[i].stationName + "</td><td>" + status + "</td>" +
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

    getSearchTotalPage('truckSearchCount',param);
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/truckDeleteByid/" + id1,
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
    $('#hidden_status').val($('#search_status').val());
    $('#hidden_addr').val($('#search_addr').val());
    $('#hidden_type').val($('#search_type').val());
    tosearch(1);
})

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-insert").data('bootstrapValidator').destroy();
    $('#form-insert').data('bootstrapValidator', null);
    validate();
});
