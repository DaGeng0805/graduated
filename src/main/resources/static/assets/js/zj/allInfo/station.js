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
    var isupdate = $('#isupdateflag').val();

    bv.validate();
    if (bv.isValid()) {
        if (isupdate == 'false') {
            var stationflag = checkStation($('#bill_name').val());
            if (stationflag == false) {
                var param = {
                    stationName: $('#bill_name').val(),
                    addr: $('#bill_addr').val()
                }

                $.ajax({
                    type: 'post',
                    // dataType: 'json',
                    url: "/stationInsert",
                    data: JSON.stringify(param),//序列化表单数据
                    async: true,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (d) {
                        $('#addmodal').modal('hide');
                        $('#bill_name').val(null);
                        $('#bill_addr').val(null)
                        toastr.success("添加成功");
                        //toPage(1);
                        window.location.href = "stationQuery";
                    }
                })
            } else {
                var msg = '错误如下：\n';
                if (stationflag == true) {
                    msg += '站点名称已经拥有\n'
                }
                toastr.error(msg);
            }
        } else {

            var onPage = $('#onpage').text();
            var param = {
                id: $(Obj).val(),
                stationName: $('#bill_name').val(),
                addr: $('#bill_addr').val(),

            }
            $.ajax({
                type: 'post',
                // dataType: 'json',
                url: "/stationUpdate",
                data: JSON.stringify(param),//序列化表单数据
                async: true,
                timeout: 10000,
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (d) {
                    $('#addmodal').modal('hide');
                    tosearch(onPage);
                    $('#bill_name').val(null);
                    $('#bill_addr').val(null);
                    $('#bill_name').removeAttr('readonly'),
                        toastr.success("修改成功");
                    $('#isupdateflag').val('false')
                }
            })

        }
    } else {
        toastr.error('请按规则填写');
    }
}

function updatemodel(Obj) {
    var id = $(Obj).attr('pid');
    $('#isupdateflag').val('true');

    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "stationFindById/" + id,
        //data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#bill_name').val(d.stationName),
                $('#bill_addr').val(d.addr),
                $('#bill_name').attr('readonly', 'readOnly'),
                $('#btn-save').val(d.id);
        }
    })
}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    //console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/stationDeleteByid/" + id1,
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


function sendid(Obj) {
    console.log($(Obj).attr("pid"))
    $('#confirm').val($(Obj).attr("pid"));
}

$('#btn-search').click(function () {
    $('#hidden_stationName').val($('#search_stationName').val());
    $('#hidden_manage').val($('#search_manage').val());
    tosearch(1);
})
