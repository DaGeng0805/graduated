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
        waybillNum: $('#hidden_waybillNum').val(),
        complainant: $('#hidden_complainant').val(),
        status: $('#hidden_status').val()
    }
    console.log(JSON.stringify(param));
    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/complainSearch",
        data: JSON.stringify(param),
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status = '未处理';
                var btn = "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-updateConfirm\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'" +
                    "type='button' onclick='sendUpdateId(this)' pid='" + data[i].id + "'><i class=\"fa-pencil\"></i><span>反馈完成</span></button> </a>";
                if (data[i].status == 1) {
                    status = '完成';
                    btn = "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-red btn-icon btn-icon-standalone\" ><button class='btn btn-red btn-icon btn-icon-standalone'" +
                        "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>删除投诉</span></button> </a>";
                }
                html += "<tr><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].waybillNum + "</td>" +
                    "<td>" + data[i].complainant + "</td><td>" + data[i].phone + "</td><td>" + data[i].time + "</td>" +
                    "<td>" + data[i].content + "</td><td>" + status + "</td>" +
                    // "<td></td>"
                    "<td>" +
                    btn
                    +
                    "</td>" +
                    "</tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })
    getSearchTotalPage("/complainSearchCount", param);

}

function deleteByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    //console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/complainDeleteByid/" + id1,
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

function updateByid(Obj) {
    var id1 = $(Obj).attr('value');
    var onpage = $('#onpage').text();
    //console.log(onpage);
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: "/complainUpdate/" + id1,
        // data: JSON.stringify(param),//序列化表单数据
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            $('#modal-updateConfirm').modal('hide');
            toastr.success("反馈成功")
            tosearch(onpage);
        }
    })
}

function sendUpdateId(Obj) {
    console.log($(Obj).attr("pid"))
    $('#confirm-2').val($(Obj).attr("pid"));
}

$('#btn-search').click(function () {
    $('#hidden_complainant').val($('#search_complainant').val());
    $('#hidden_status').val($('#search_status').val());
    $('#hidden_waybillNum').val($('#search_waybillNum').val());
    tosearch(1);
})

function get2wm() {
    window.location.href="/get2WM"
    // $.ajax({
    //     type: 'get',
    //     url: "/testq",
    //     async: true,
    //     timeout: 10000,
    //     success: function (d) {
    //     }
    // })
}


