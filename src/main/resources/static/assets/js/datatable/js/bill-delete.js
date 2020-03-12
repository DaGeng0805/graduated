var detail_bill_table = $('#detail-bill').DataTable({
    "pagingType": "full_numbers",  //分页样式  除了数字还有上一页下一页，第一页和最后一页
    "sLoadingRecords": "正在加载数据...",  //数据较多时加载显示
    "sZeroRecords": "暂无数据",   //空数据显示
    serverSide: true,  //服务端分页显示
    stateSave: true,     //开启缓存
    "searching": false,   //datatables自带搜索，关闭，用服务端搜索
    "dom": '<"top">rt<"bottom"iflp<"clear">>',   //显示样式 ，信息，分页栏等均在底部  也可改到top
    ajax: {  //请求数据
        url: "/detailBills",
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
                "billNum": $("#billNum").val(),
                "status":$("#status").val(),
                "type":$("#type").val(),
                "beginTime":$("#beginTime").val(),
                "endTime":$("#endTime").val(),
            };
            //自定义需要传递的参数。
            console.info(JSON.stringify(str) + "ssssss");
            return JSON.stringify(str);
        }
    },
    columns: [ //自定义列   重新渲染等
        {
            "data": null, "width": "30px", "orderable": false,
            render: function (data, type, row, meta) {
                return '<input type="checkbox" name="ids" value="' + data.id + '">'
            }
        },
        {"data": "type"},
        {"data": "billNum"},
        {"data": "status",render: function (data, type, row, meta) {
    var type = data == "1"?"作废":(data == "2"?"回执":"未填");
    return type;
}},
        {"data": "writeTime"},
    ],
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
$('#detailbill-query-btn').on('click', function () {
    detail_bill_table.draw();//查询后不需要保持分页状态，回首页
    return false;
});

//全选
$('#checkAll').on('click', function () {
    if ($('#checkAll').prop('checked') === true) {
        $('input[name="ids"]').prop('checked', 'checked');
        $('#detail-delete-btn').show();
    } else {
        $('input[name="ids"]').prop('checked', false);
        $('#detail-delete-btn').hide();
    }
});

$('#detail-bill tbody').on('click', 'td', function () {
    if($(this).find('input').prop('checked') === true){
        $('#detail-delete-btn').show();
    }else{
        $('#detail-delete-btn').hide();
    }
});

$('#detail-delete-btn').on('click',function () {
    var ids = [];
    $(":checkbox").each(function (index,item) {
        if(item.checked && index != 0){
            ids.push($(this).val())
        }
    });
    console.info(ids + ": ids" );
    $('#delModalLabel').text("提示");
    $('#delConfirm').modal('show'); //手动打开模态框
    //防止按钮绑定事件后，重复之前的操作
    $('#delete-submit').off().on('click', function () {
        $.ajax({
            method: "DELETE",
            url: "/detailBill",
            contentType :  "application/json",
            data:JSON.stringify({"ids":ids}),
            dataType: 'Json',
            success: function (result) {
                    if(result.flag){
                        $('#delConfirm').modal('hide');//手动关闭模态框
                        toastr.success(result.data.stateInfo);
                        $('#checkAll').prop('checked',false);
                        detail_bill_table.row().remove().draw(false);
                        $('#detail-delete-btn').hide();
                    }else{
                        $('#delConfirm').modal('hide');//手动关闭模态框
                        toastr.success(result.data.stateInfo);
                    }
            },
            fail: function (response) {
                $('#delConfirm').modal('hide');//手动关闭模态框
                toastr.error("系统崩溃....");
            },
        });
    });

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