$(document).ready(function () {
    tosearch(1);
})

function tosearch(page) {
    var tbody = $('#tbody'),
        html = "",
        onpage = $('#onpage'),
        totalPage = $('#totalPage');

    var param = {
        pages: page,
        limit: 10,
        contractNum: $('#hidden_carrageNum').val(),
        driverName: $('#hidden_driverName').val(),
        beginPlace: $('#hidden_beginPlace').val(),
        status: $('#hidden_status').val()
    }
    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/carrageSearch",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status = "未配送";
                if (data[i].status == 1){status = '正在配送';}
                if (data[i].status == 2){status = '完成';}
                var payWay = "现结";
                if (data[i].payWay == 1){payWay = '到付';}

                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].contractNum + "</td>" +
                    "<td>" + data[i].beginPlace + "</td><td>" + data[i].endPlace + "</td><td>" + data[i].driverName + "</td>" +
                    "<td>" + data[i].startTime + "</td><td>" + payWay + "</td><td>" + data[i].freight + "</td>" +
                    "<td>" + data[i].insurance + "</td><td>" + data[i].serviceCharge + "</td><td>" + data[i].prepay + "</td>" +
                    "<td>" + data[i].signTime + "</td><td>" + data[i].note + "</td><td>" + status + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除</span></button> </a><button class='btn btn-success btn-icon btn-icon-standalone' type='button'  value='"+data[i].contractNum+"' onclick='goGoodsQuery(this)'><i class=\"fa-pencil\"></i><span>修改</span></button> </a></button>" +

                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/carrageSearchCount",param);
}

$('#btn-search').click(function () {
    $('#hidden_carrageNum').val($('#search_carrageNum').val());
    $('#hidden_driverName').val($('#search_driverName').val());
    $('#hidden_status').val($('#search_status').val());
    $('#hidden_beginPlace').val($('#search_beginPlace').val());
    tosearch(1);
})

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/carrageDeleteByid/" + id1,
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

function goGoodsQuery(Obj) {
    window.location.href="/carrageGoodsAdd/"+$(Obj).val();
}
