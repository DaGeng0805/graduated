var table = $('#bill').DataTable({
    "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
    "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
    "sZeroRecords": "暂无数据",   //空数据显示
    serverSide: true,  //服务端分页显示
    stateSave: true,     //开启缓存
    "searching": false,   //datatables自带搜索，关闭，用服务端搜索
    "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
    ajax: {  //请求数据
        url: "/bills",
        contentType: "application/json",
        dataType: "JSON",
        type: "POST",
        dataSrc: 'data',  //数据名称
        data: function (d) {   //后台传回数据对应
            // return JSON.stringify(d);
            var str = {
                "draw": d.draw,
                "start": d.start,
                "length": d.length,
                "type": $("#type").val(),
                "receiver": $("#receiver-query").val()
            };
            //自定义需要传递的参数。
            console.info(JSON.stringify(str) + "ssssss");
            return JSON.stringify(str);
        }
    },
    columns: [ //自定义列   重新渲染等
        {
            "data":"id"

        },
        {"data": "type"},
        {"data": "beginNum"},
        {"data": "endNum"},
        {"data": "receiver"},
        {"data": "receivePlace"},
        {"data": "receiveTime"},
        {"data": "distributePerson"},
        {"data": null, "width": "140px"}
    ],
    "columnDefs": [{"targets": 0, "orderable": false}, {
        "targets": -1,
        "defaultContent": '<div class=btn-group>' +
            '<a class="btn btn-info btn-xs p310 editRow" id="btn-edit"><i class="im-pencil2"></i> 编辑</a>' +
            '</div>'
    }],
    //显示国际语言
    "language": {
        "processing": "玩命加载中...",
        "lengthMenu": "显示 _MENU_ 项结果",
        "zeroRecords": "没有匹配结果",
        "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "infoPostFix": "",
        "url": "",
        "paginate": {
            "first": "首页",
            "previous": "上一页",
            "next": "下一页",
            "last": "末页"
        }
    },
});



//关键词搜索
$('#btn-query').on('click', function () {
    table.draw();//查询后不需要保持分页状态，回首页
    return false;
});

// $("#receiver-query").bind('input propertychange',function(){
//     var query =  $("#receiver-query").val();
//     if(!/^[0-9]*$/.test(query)){
//         alert("请输入数字!");
//     }
//       });


$('#bill tbody').off().on('click', 'a#btn-edit', function () {
    var data = table.row($(this).parents('tr')).data();
    // $('#form-add .form-group')[0].style.display = 'none';
    $('input[name = "id"]').val(data.id);
    $('input[name = "beginNum"]').val(data.beginNum);
    $('input[name = "endNum"]').val(data.endNum);
    $('input[name = "endNum"]').attr("readonly","readonly");
    $('input[name = "receiver"]').val(data.receiver);
    $('input[name = "receiverPhone"]').val(data.receiverPhone);
    $('input[name = "distributePerson"]').val(data.distributePerson);
    $('input[name = "distributePersionPhone"]').val(data.distributePersionPhone);
    $('input[name = "receivePlace"]').val(data.receivePlace);
    $.getMainCity();
    $('input[name = "type"]').val(data.type);
    $('#bill-type-div').show();
    $("#bill-type").attr("readonly","readonly");
    $('input[name = "receiveTime"]').val(data.receiveTime);
    $('input[name = "writeTime"]').val(data.writeTime);
    $('#path').val("/bill");
    $("#method").val("PUT");
    $('#addModalLabel').text("修改");
    $('#addConfirm').modal('show');
});


$.getMainCity = function(){
    $.ajax({
        url: '/getMainCityInfo',
        contentType: 'application/json',
        dataType: 'json',
        data: null,
        method: 'POST',
        success: function (response) {
            $.each(response.data,function (index,item) {
                $("#place").append('<option>'+ item + '</option>');
            });
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
};




$('#bill-add').off().on('click', function () {
    $('input[name = "endNum"]').removeAttr("readonly");
    $('#bill-type-div').hide();
    $.getMainCity();
    $('#create-time').hide();
    $.get("/getBillBeginNum",function (response) {
        $("#bill-begin-num").val(response);
    });
    $('#path').val("/bill");
    $('#method').val("POST");
    $('#addModalLabel').text("添加");
    $('#addConfirm').modal('show');
});


$('body').on('hidden.bs.modal', '.modal', function () {
    $('input').val('');
    $('#place').html('');
    $('#select-type').show();
    $('#create-time').show();
    $("#form-add").data('bootstrapValidator').destroy();
    $('#form-add').data('bootstrapValidator', null);
    validate();
});



$('#add-submit').on('click', function () {
    var bv = $('#form-add').data("bootstrapValidator");
    bv.validate();
    var time = $('#bill-receiveTime').val();
    console.info(time + "11");
    if(time == null || time == ""){
        toastr.error("接货时间必填");
        return false;
    }
    if(bv.isValid()){
        var path = $("#path").val();
        var method =  $('#method').val();
        var data = $('#form-add').serializeArray();
        data = $.serializeForm(data);
        $.ajax({
            url: path,
            contentType: 'application/json',
            dataType: 'json',
            data: data,
            method: method,
            success: function (response) {
                if (response.flag) {
                    toastr.success(response.data.stateInfo);
                    setTimeout(function () {
                        $('#addConfirm').modal('hide');
                        table.draw(false);
                    },800);
                } else {
                    toastr.error(response.data.stateInfo);
                }
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    }
});

$.serializeForm = function (data) {
    var returnData = {};
    $.each(data, function (index, item) {
        if(item.name != 'writeTime1'){
            returnData[item.name] = item.value;
        }
    });
    return JSON.stringify(returnData);
};


$(document).ready(function () {
    validate();
});

function validate(){
    $('#form-add').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            endNum: {
                message: '填入结束号码',
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: '该数字最小为四位数'
                    },
                    /*remote: {
                        url: 'remote.php',
                        message: 'The username is not available'
                    },*/
                    // regexp: {
                    //     regexp: /^[a-zA-Z0-9_\.]+$/,
                    //     message: 'The username can only consist of alphabetical, number, dot and underscore'
                    // }
                    callback :{
                        message: '结束号码需要大于等于开始号码',
                        callback: function(value,validate){
                            var beginNum = $('#bill-begin-num').val();
                            console.info(Number(beginNum) +"ssss"+ Number(value));

                            if(Number(beginNum) > Number(value)){
                                console.info("true");
                                return false;
                            }else{
                                return true;
                            }

                        }
                    }
                }
            },
            receiver: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '输入区间在2-10'
                    },
                    // emailAddress: {
                    //     message: 'The input is not a valid email address'
                    // }
                }
            },
            receiverPhone: {
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
            distributePerson: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '输入区间在2-10'
                    }
                    // emailAddress: {
                    //     message: 'The input is not a valid email address'
                    // }
                }
            },
            distributePersionPhone: {
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
            // writeTime: {
            //     validators: {
            //         notEmpty: {
            //             message: '必填项'
            //         },
            //         date: {
            //             format: 'YYYY/MM/DD',
            //             message: '日期无效'
            //         }
            //     }
            // },
            receivePlace: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
}