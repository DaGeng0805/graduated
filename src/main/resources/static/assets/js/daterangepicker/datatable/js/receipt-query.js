var receiptTable = $('#receipt').DataTable({
    "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
    "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
    "sZeroRecords": "暂无数据",   //空数据显示
    serverSide: true,  //服务端分页显示
    stateSave: true,     //开启缓存
    "searching": false,   //datatables自带搜索，关闭，用服务端搜索
    "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
    ajax: {  //请求数据
        url: "/carrageContracts",
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
                "driverName": $("#driverName").val(),
                "contractNum": $("#contractNum1").val(),
                "status": $("#status").val(),
                "startTime": $("#startTime1").val(),
                "endTime": $("#endTime").val()
            };
            //自定义需要传递的参数。
            console.info(JSON.stringify(str) + "ssssss");
            return JSON.stringify(str);
        }
    },
    columns: [ //自定义列   重新渲染等
        {"data": "contractNum", orderable: false},
        {"data": "name", orderable: false},
        {"data": "freight", orderable: false},
        {"data": "insurance", orderable: false},
        {"data": "beginPlace", orderable: false},
        {"data": "endPlace", orderable: false},
        {"data": "startTime", orderable: false},
        {"data": "endTime", orderable: false},
        {"data": "signTime", orderable: false},
        {
            "data": "status", orderable: false, render: function (data, type, row, meta) {
                var status = data == "0" ? '未发' : (data == "1" ? '已发' : '回执');
                return status;
            }
        },
        {"data": null, "width": "140px", orderable: false}
    ],
    "columnDefs": [{"targets": 0, "orderable": false}, {
        "targets": -1,
        "defaultContent": '<div class=btn-group>' +
            '<a class="btn btn-info btn-xs p310 editRow" id="btn-edit"><i class="im-pencil2"></i> 详情</a>' +
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
$('#btn-query-receipt').on('click', function () {
    receiptTable.draw();//查询后不需要保持分页状态，回首页
    return false;
});



var status;
var driverId;
var driverData;
var carrage_id  ;
$('#receipt tbody').off().on('click', 'a#btn-edit', function () {
    var data = receiptTable.row($(this).parents('tr')).data();
    // $('#form-add .form-group')[0].style.display = 'none';
    carrage_id = data.id;
    $('input[name = "id"]').val(data.id);
    $('input[name = "contractNum"]').val(data.contractNum);
    driverId = data.driverId;
    $.ajax({
        url: '/getDriverMessage',
        // contentType: 'application/json',
        dataType: 'json',
        data: {"id": data.id},
        method: 'POST',
        success: function (response) {
            driverData = response;
            var driver;
            $.each(response, function (index, item) {
                if (data.driverId == item.id) {
                    driver += '<option value="' + item.id + '"selected="selected">' + item.name + '</option>';
                    $('input[name = "licence"]').val(item.licence);
                    $('input[name = "plateNumber"]').val(item.plateNumber);
                    $('input[name = "drivingLicence"]').val(item.drivingLicence);
                } else {
                    driver += '<option value="' + item.id + '">' + item.name + '</option>';
                }
            });
            $('#name').html(driver);
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
    $('input[name = "beginPlace"]').val(data.beginPlace);
    $.get("/getMainCity", null, function (resp) {
        var city;
        $.each(resp, function (index, item) {
            city += '<option>' + item + '</option>'
        });
        $('#begin').html(city);
    });
    $.ajax({
        url: '/getArroundCity',
        dataType: 'json',
        data: {"beginPlace": data.beginPlace},
        method: 'POST',
        success: function (response) {
            var opt;
            $.each(response, function (index, item) {
                opt += '<option>' + item + '</option>';
            });
            $('#end').html(opt);
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
    $('input[name = "endPlace"]').val(data.endPlace);
    $('input[name = "functionary"]').val(data.functionary);
    $('input[name = "functionaryPhone"]').val(data.functionaryPhone);
    $('input[name = "startTime"]').val(data.startTime);
    $('input[name = "cashDeposit"]').val(data.cashDeposit);
    $('input[name = "serviceCharge"]').val(data.serviceCharge);
    $('input[name = "cashPledge"]').val(data.cashPledge);
    $('input[name = "freight"]').val(data.freight);
    $('input[name = "insurance"]').val(data.insurance);
    $('input[name = "cashPledge"]').val(data.cashPledge);
    $('input[name = "prypay"]').val(data.prypay);
    $('input[name = "signTime"]').val(data.signTime);
    $('input[name = "status"]').val(data.status);
    $('#note').val(data.note);
    status = data.status;
    if (data.status == 1 || data.status == 2) {
        $('#add-submit').attr('disabled', "disabled");
    }
    if (data.status == 0) {
        $('#add-submit').attr('disabled', false);
    }
    $('#addModalLabel').text("修改");
    $('#editReceipt').modal('show');
});


$('#beginPlace').off().on('change', function () {
    var beginPlace = $('#beginPlace').val();
    $('#endPlace').val("");

    $.ajax({
        url: '/getArroundCity',
        dataType: 'json',
        data: {"beginPlace": beginPlace},
        method: 'POST',
        success: function (response) {
            var opt;
            $.each(response, function (index, item) {
                opt += '<option>' + item + '</option>';
            });
            $('#end').html(opt);
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
});

$('#name').on('change', function () {
    var id = $(this).val();
    var driver;
    $.each(driverData, function (index, item) {
        if (id == item.id) {
            driver += '<option value="' + item.id + '"selected="selected">' + item.name + '</option>';
            $('input[name = "licence"]').val(item.licence);
            $('input[name = "plateNumber"]').val(item.plateNumber);
            $('input[name = "drivingLicence"]').val(item.drivingLicence);
        } else {
            driver += '<option value="' + item.id + '">' + item.name + '</option>';
        }
    });
    $('#name').html(driver);
});

$('#endPlace').off().on('change', function () {
    var beginPlace = $('#beginPlace').val();
    var endPlace = $('#endPlace').val();
    if (beginPlace != "" && endPlace != "") {
        $.ajax({
            url: '/getDriver',
            dataType: 'json',
            data: {"beginPlace": beginPlace, "endPlace": endPlace},
            method: 'POST',
            success: function (response) {
                if (response == null || "" == response) {
                    $('#name').html("");
                    $('input[name = "licence"]').val("");
                    $('input[name = "plateNumber"]').val("");
                    $('input[name = "drivingLicence"]').val("");
                } else {
                    driverData = response;
                    var driver;
                    $.each(response, function (index, item) {
                        driver += '<option value="' + item.id + '">' + item.name + '</option>';
                        if (index == 0) {
                            $('input[name = "licence"]').val(item.licence);
                            $('input[name = "plateNumber"]').val(item.plateNumber);
                            $('input[name = "drivingLicence"]').val(item.drivingLicence);
                        }
                    });
                    $('#name').html(driver);
                }
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    }
});


$('#add-submit').off().on('click', function () {
    var bv = $('#form-add').data("bootstrapValidator");
    bv.validate();
    var time = $('#startTime').val();
    if(time == null || time == ""){
        toastr.error("起运时间必填");
        return false;
    }
    var time1 = $("#signTime").val();
    if(time1== null || time == ""){
        toastr.error("签订时间必填");
        return false;
    }
    if(bv.isValid()){
        var data = $('#form-add').serializeArray();
        var submitData = $.serializeForm(data);
        console.info(submitData);
        $.ajax({
            url: '/carrageContractUpdate',
            dataType: 'json',
            contentType: 'application/json',
            data: submitData,
            method: 'POST',
            success: function (response) {
                if(response.flag){
                    toastr.success(response.message);
                    setTimeout(function () {
                        $('#editReceipt').modal('hide');
                    },800);
                }
                setTimeout(function () {
                    window.location.reload();
                },900);
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    }
});

$.serializeForm = function (data) {
    var returnData = {};
    console.info(driverId + "::sss++")
    $.each(data, function (index, item) {
        if (item.name != 'plateNumber' && item.name != 'drivingLicence') {
            if (item.name == 'driverId' && item.value == driverId) {
                returnData[item.name] = 0;
            } else {
                returnData[item.name] = item.value;
            }
        }
    });
    return JSON.stringify(returnData);
};


var time = 0;
$('#good-message').off().on('click', function () {
    if (status == 0) {
        if (time == 0) {
            time += 1;
            toastr.warning("如果修改了表单数据，请先提交。否则将不会生效!");
            return false;
        } else {
            time = 0;
            // 隐藏编辑界面 ，显示添加货物界面
            $('#editReceipt').hide();
            var id = $('input[name = "id"]').val();

            var downMetch = $('#downMetch').DataTable({
                pageLength:2,
                bLengthChange: false,
                retrieve:true,
                "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
                "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
                "sZeroRecords": "暂无数据",   //空数据显示
                serverSide: true,  //服务端分页显示
                stateSave: true,     //开启缓存
                "searching": false,   //datatables自带搜索，关闭，用服务端搜索
                "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
                ajax: {  //请求数据
                    url: "/getReciptGood",
                    contentType: "application/json",
                    dataType: "JSON",
                    type: "POST",
                    dataSrc: 'data',  //数据名称
                    data: function (d) {   //后台传回数据对应
                        var str = {
                            "draw": d.draw,
                            "start": d.start,
                            "length": d.length,
                            "type": id,
                            "flag": 0
                        };
                        //自定义需要传递的参数。
                        console.info(JSON.stringify(str));
                        return JSON.stringify(str);
                    }
                },
                columns: [ //自定义列   重新渲染等
                    {"data": "goodsInfo.waybillNum", orderable: false},
                    {"data": "goodsInfo.goodsName", orderable: false},
                    {"data": "goodsInfo.goodsNum", orderable: false},
                    {"data": "num", orderable: false},
                    {"data": "goodsInfo.weight", orderable: false},
                    {"data": null, orderable: false}
                ],
                "columnDefs": [{"targets": 0, "orderable": false}, {
                    "targets": -1,
                    "defaultContent":'<input type="text" placeholder="" style="width: 60px" ' +
                        'name="jianShu" id="jianShu">&nbsp;&nbsp;<div class=btn-group><a class="btn btn-info btn-xs p310 editRow" id="down-good" style="border-radius: 50px"><i class="im-pencil2">卸货</i> </a></div>'
                }],

                //显示国际语言
                "language": {
                    "processing": "玩命加载中...",
                    //   "lengthMenu": "显示 _MENU_ 项结果",
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
                "initComplete": function () {
                    var dataNum = downMetch.ajax.json();
                    console.info(JSON.stringify(dataNum));
                    $('#totalNum1').html('<span>' + dataNum.totalNum + '</span>');
                    $('#totalPa1').html('<span>' + dataNum.totalPa + '</span>');
                },
            });

            // 待转车货物信息
            var beginPlace = $("input [name='beginPlace']").val();
            var endPlace = $("input [name='endPlace']").val();
            var upMetch = $('#upMetch').DataTable({
                 pageLength:2,
                bLengthChange: false,
                retrieve:true, //解决重复初始化table
                "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
                "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
                "sZeroRecords": "暂无数据",   //空数据显示
                serverSide: true,  //服务端分页显示
                stateSave: true,     //开启缓存
                "searching": false,   //datatables自带搜索，关闭，用服务端搜索
                "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
                ajax: {  //请求数据
                    url: "/editReciptGood",
                    contentType: "application/json",
                    dataType: "JSON",
                    type: "POST",
                    dataSrc: 'data',  //数据名称
                    data: function (d) {   //后台传回数据对应
                        var str = {
                            "draw": d.draw,
                            "start": d.start,
                            "length": d.length,
                            "beginPlace": beginPlace,
                            "endPlace": endPlace,
                            "goodName": $('#goodName').val()
                        };
                        //自定义需要传递的参数。
                        return JSON.stringify(str);
                    }
                },
                columns: [ //自定义列   重新渲染等
                    {"data": "waybillNum", orderable: false},
                    {"data": "goodName", orderable: false},
                    {"data": "goodNum", orderable: false},
                    {"data": "number", orderable: false},
                    {"data": "weight", orderable: false},
                    {"data": "area", orderable: false},
                    {"data": null, orderable: false}
                ],
                "columnDefs": [{"targets": 0, "orderable": false}, {
                    "targets": -1,
                    "defaultContent":'<input type="text" placeholder="" style="width: 60px" ' +
                    'name="jianShu2" id="jianShu2">&nbsp;&nbsp;<div class=btn-group><a class="btn btn-info btn-xs p310 editRow" id="up-good" style="border-radius: 50px"><i class="im-pencil2">装货</i> </a></div>'
                }],
                //显示国际语言
                "language": {
                    "processing": "玩命加载中...",
                 //   "lengthMenu": "显示 _MENU_ 项结果",
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

            $('#editReceiptGoodLable').text('装车货物');
            $('#editReceiptGood').modal('show');
            // upMetch.fnDestroy();
            // downMetch.fnDestroy();
        }
    } else {
        $('#editReceipt').hide();
        var id = $('input[name = "id"]').val();
        //隐藏编辑界面  ，显示查看界面
        var receiptGood = $('#receiptGood').DataTable({
            "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
            "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
            "sZeroRecords": "暂无数据",   //空数据显示
            serverSide: true,  //服务端分页显示
            stateSave: true,     //开启缓存
            "searching": false,   //datatables自带搜索，关闭，用服务端搜索
            "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
            ajax: {  //请求数据
                url: "/getReciptGood",
                contentType: "application/json",
                dataType: "JSON",
                type: "POST",
                dataSrc: 'data',  //数据名称
                data: function (d) {   //后台传回数据对应
                    var str = {
                        "draw": d.draw,
                        "start": d.start,
                        "length": d.length,
                        "type": id,
                        "flag": 1,
                    };
                    //自定义需要传递的参数。
                    return JSON.stringify(str);
                }
            },
            columns: [ //自定义列   重新渲染等
                {"data": "carrageId", orderable: false},
                {"data": "goodsInfo.goodsName", orderable: false},
                {"data": "num", orderable: false},
                {"data": "goodId", orderable: false},
            ],
            // "columnDefs": [{"targets": 0, "orderable": false}, {
            //     "targets": -1,
            //     "defaultContent": '<div class=btn-group>' +
            //         '<a class="btn btn-info btn-xs p310 editRow" id="btn-edit"><i class="im-pencil2"></i> 详情</a>' +
            //         '</div>'
            // }],
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
            "fnInitComplete": function (oSettings, json) {
                console.info(JSON.stringify(json));
                $('#totalNum').html('<span>' + json.totalNum + '</span>');
                $('#totalPa').html('<span>' + json.totalPa + '</span>');
            }
        });
        $("#receiptGood").dataTable().fnDestroy();
        $('#checkReciptGoodLabel').text("货物信息");
        $('#checkReceiptGood').modal('show');
    }

    $('#downMetch tbody').off().on('click', 'a#down-good', function () {
        var data = downMetch.row($(this).parents('tr')).data();
        var waybillNum = data.goodsInfo.waybillNum,goodNum=data.goodsInfo.goodsNum,weight = data.goodsInfo.weight,number = data.num;
        var downGoodNum =  $(this).parents('tr').find("input[name='jianShu']").val();
        if(number < downGoodNum){
            toastr.error("您的输入超出该商品的最大范围");
            return false;
        }
        $.ajax({
            url: '/updateCarrageGoodDown',
            dataType: 'json',
            // contentType: 'application/json',
            data: {"waybillNum": waybillNum, "goodNum": goodNum,"weight":weight,"number":number,"downGoodNum":downGoodNum,"carrageId":carrage_id},
            method: 'POST',
            success: function (response) {
                console.info(JSON.stringify(response));
                if(response.flag){
                    var id = $('input[name = "id"]').val();
                    upMetch.draw(false);
                    downMetch.draw(false);
                }
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    });

    $('#upMetch tbody').off().on('click', 'a#up-good', function () {
        var data = upMetch.row($(this).parents('tr')).data();
        console.info(JSON.stringify(data)+ "ssssss");
        var waybillNum = data.waybillNum,goodNum=data.goodNum,weight = data.weight,number = data.number;
        var upGoodNum =  $(this).parents('tr').find("input[name='jianShu2']").val();
        if(number < upGoodNum){
            toastr.error("您的输入超出该商品的最大范围");
            return false;
        }
        $.ajax({
            url: '/updateCarrageGood',
            dataType: 'json',
            // contentType: 'application/json',
            data: {"waybillNum": waybillNum, "goodNum": goodNum,"weight":weight,"number":number,"upGoodNum":upGoodNum,"carrageId":carrage_id},
            method: 'POST',
            success: function (response) {
                console.info(JSON.stringify(response));
                if(response.flag){
                    var id = $('input[name = "id"]').val();
                    upMetch.draw(false);

                    downMetch.draw(false);
                }
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    });
});



$('#goodName-btn').off().on('click',function () {
    upMetch.draw();//查询后不需要保持分页状态，回首页
});

$('#faChe').off().on('click',function () {
    $.ajax({
        url: '/updateCarrageStatus',
        dataType: 'json',
        // contentType: 'application/json',
        data: {"carrageId":carrage_id},
        method: 'POST',
        success: function (response) {
            if(response.flag){
                toastr.success(response.message);
                setTimeout(function () {
                    $('#checkReceiptGood').modal('hide');
                },800);
                setTimeout(function () {
                    window.location.reload();
                },900);
            }else{
                toastr.warning(response.message);
            }
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
    return false;
})

$(document).ready(function () {
    validate();
});

function validate() {
    $('#form-add').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            cashDeposit: {
                message: '请输入金额',
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
                }
            },
            functionary: {
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
            functionaryPhone: {
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
            // serviceCharge: {
            //     validators: {
            //         notEmpty: {
            //             message: '必填项'
            //         },
            //         stringLength: {
            //             min: 2,
            //             max: 10,
            //             message: '输入区间在2-10'
            //         }
            //         // emailAddress: {
            //         //     message: 'The input is not a valid email address'
            //         // }
            //     }
            // },
            cashPledge: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    // regexp: {
                    //     regexp: /^1[3456789]\d{9}$/,
                    //     message: '格式有误'
                    // }
                }
            },
            freight: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '输入区间在2-10'
                    }
                }
            },
            insurance: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    stringLength: {
                        min: 2,
                        max: 10,
                        message: '输入区间在2-10'
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
            prypay: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            },
            endPlace: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
};



