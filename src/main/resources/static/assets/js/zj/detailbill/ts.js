$(document).ready(function () {
    var tbody = $('#tbody'),
        html = "";
    tosearch(1);
})


$('#first').click(function () {
    var tbody = $('#tbody');
    var html = '';
    var onpage = $('#onpage');
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "/detailBillPage/1",
        //data: addform.serialize(),//序列化表单数据
        async:true,
        timeout: 10000,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status;
                if (data[i].status == 0){status='未填'}
                else if (data[i].status == 1) {status='已填'}
                else if (data[i].status == 2) {status='作废'}

                html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
                    "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
                    "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
                    // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
                    "</div> </td></tr>"
            }
            tbody.html(html);
            onpage.html(1);
        }
    })
})

// $('#end').click(function () {
//     var tbody = $('#tbody');
//     var totalPage = $('#totalPage').val();
//     var html = '';
//     var onpage = $('#onpage');
//     $.ajax({
//         type: 'post',
//         dataType: 'json',
//         url: "/detailBillPage/"+totalPage,
//         //data: addform.serialize(),//序列化表单数据
//         async:true,
//         timeout: 10000,
//         success: function (data) {
//             for (var i = 0; i < data.length; i++) {
//                 var status;
//                 if (data[i].status == 0){status='未填'}
//                 else if (data[i].status == 1) {status='已填'}
//                 else if (data[i].status == 2) {status='作废'}
//
//                 html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
//                     "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
//                     "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
//                     // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
//                     "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
//                     "</div> </td></tr>"
//             }
//             tbody.html(html);
//             onpage.html(totalPage);
//         }
//     })
// })
//
// $('#up').click(function () {
//
//     var tbody = $('#tbody');
//     var onpage = $('#onpage'),pages = parseInt(onpage.text());
//
//     var page = 0;
//     if (pages-1==0){page=1;}else{page=pages-1;}
//     console.log(page);
//     var html = '';
//     $.ajax({
//         type: 'post',
//         dataType: 'json',
//         url: "/detailBillPage/"+page,
//         //data: addform.serialize(),//序列化表单数据
//         async:true,
//         timeout: 10000,
//         success: function (data) {
//             for (var i = 0; i < data.length; i++) {
//                 var status;
//                 if (data[i].status == 0){status='未填'}
//                 else if (data[i].status == 1) {status='已填'}
//                 else if (data[i].status == 2) {status='作废'}
//
//                 html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
//                     "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
//                     "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
//                     // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
//                     "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
//                     "</div> </td></tr>"
//             }
//             tbody.html(html);
//             onpage.html(page);
//         }
//     })
// })
//
// $('#down').click(function () {
//     var tbody = $('#tbody');
//     var onpage = $('#onpage'),pages = parseInt(onpage.text());
//     console.log(pages);
//     var totalPage = $('#totalPage').val();
//     var page = 0;
//     if (pages+1>parseInt(totalPage)){page = totalPage;} else {page = pages+1;}
//     var html = '';
//     console.log(page);
//     $.ajax({
//         type: 'post',
//         dataType: 'json',
//         url: "/detailBillPage/"+page,
//         //data: addform.serialize(),//序列化表单数据
//         async:true,
//         timeout: 10000,
//         success: function (data) {
//
//             for (var i = 0; i < data.length; i++) {
//                 var status;
//                 if (data[i].status == 0){status='未填'}
//                 else if (data[i].status == 1) {status='已填'}
//                 else if (data[i].status == 2) {status='作废'}
//
//                 html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
//                     "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
//                     "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
//                     // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
//                     "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
//                     "</div> </td></tr>"
//             }
//             tbody.html(html);
//             console.log(page);
//             onpage.html(page);
//         }
//     })
// })
//
// $('#go').click(function () {
//     var num = $('#num').val();
//     var reg = /^[0-9]*$/;
//     if (reg.test(num))
//     {
//         var totalPage = parseInt($('#totalPage').val());
//         var pages = parseInt(num);
//         var page = 0;
//         var onpage = $('#onpage');
//         var tbody = $('#tbody');
//         var html = '';
//         if (pages>totalPage){page = totalPage}
//         else if (pages == 0){page = 1}
//         else {page = pages}
//         $.ajax({
//             type: 'post',
//             dataType: 'json',
//             url: "/detailBillPage/"+page,
//             //data: addform.serialize(),//序列化表单数据
//             async:true,
//             timeout: 10000,
//             success: function (data) {
//                 for (var i = 0; i < data.length; i++) {
//                     var status;
//                     if (data[i].status == 0){status='未填'}
//                     else if (data[i].status == 1) {status='已填'}
//                     else if (data[i].status == 2) {status='作废'}
//
//                     html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
//                         "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
//                         "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
//                         // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
//                         "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
//                         "</div> </td></tr>"
//                 }
//                 tbody.html(html);
//                 onpage.html(page);
//             }
//         })
//         console.log(parseInt(pages));
//     }else {
//         toastr.error("请输入正确数字！");
//     }
// })


function showModal(Obj) {
    var id = $(Obj).closest("tr").find(".pid").val();
    console.log(id);
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: "/detailBillFindByid/"+id,
        //data: addform.serialize(),//序列化表单数据
        async:true,
        timeout: 10000,
        success: function (data) {
            $('#bill_billNum').val(data.billNum);
            $('#bill_receiver').val(data.receiver);
            $('#bill_receiverPhone').val(data.receiverPhone);
            $('#bill_distributePerson').val(data.distributePerson);
            $('#bill_distributePersonPhone').val(data.distributePersonPhone);
            $('#bill_receivePlace').val(data.receivePlace);
            $('#bill_id').val(data.id)

        }
    })
}

$('#btn-save').click(function () {

    var bv = $('#form-update').data("bootstrapValidator");
    bv.validate();
    if(bv.isValid()){
        var param = {
            id:$('#bill_id').val(),
            billNum:$('#bill_billNum').val(),
            receiver:$('#bill_receiver').val(),
            receiverPhone:$('#bill_receiverPhone').val(),
            distributePerson:$('#bill_distributePerson').val(),
            distributePersonPhone:$('#bill_distributePersonPhone').val(),
            receivePlace:$('#bill_receivePlace').val(),
            status:0,
            writeTime:' '
        }
        console.log(JSON.stringify(param))
        $.ajax({
            type: 'post',
            // dataType: 'json',
            url: "/detailBillUpdate",
            data: JSON.stringify(param),//序列化表单数据
            async:true,
            timeout: 10000,
            headers : {"Content-Type" : "application/json;charset=utf-8"},
            success: function (d) {
                $('#addConfirm').modal('hide');
                var page = $('#onpage').text();
                var html = "";
                var tbody = $('#tbody');
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: "/detailBillPage/"+page,
                    //data: addform.serialize(),//序列化表单数据
                    async:true,
                    timeout: 10000,
                    success:function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var status;
                            if (data[i].status == 0){status='未填'}
                            else if (data[i].status == 1) {status='已填'}
                            else if (data[i].status == 2) {status='作废'}

                            html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
                                "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
                                "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
                                // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
                                "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
                                "</div> </td></tr>"
                        }
                        tbody.html(html);
                    }
                })
            }
        })
    }else {
        toastr.error('请按规则填写');
    }
})

$('body').on('hidden.bs.modal', '.modal', function () {
    $("#form-update").data('bootstrapValidator').destroy();
    $('#form-update').data('bootstrapValidator', null);
    validate();
});

function validate(){
    $('#form-update').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            bill_receiver: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]{2,4}$/,
                        message: '请输入2-4个中文'
                    }
                    // emailAddress: {
                    //     message: 'The input is not a valid email address'
                    // }
                }
            },
            bill_receiverPhone: {
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
            bill_distributePerson: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    },
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]{2,4}$/,
                        message: '请输入2-4个中文'
                    }
                    // emailAddress: {
                    //     message: 'The input is not a valid email address'
                    // }
                }
            },
            bill_distributePersonPhone: {
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
            bill_receivePlace: {
                validators: {
                    notEmpty: {
                        message: '必填项'
                    }
                }
            }
        }
    })
}

$(document).ready(function () {
    validate();
});

$('#btn-search').click(function () {
    $('#hidden_status').val($('#search_status').val());
    $('#hidden_billNum').val($('#search_billNum').val());
    $('#hidden_receiver').val($('#search_receiver').val());
    $('#hidden_sbTime').val($('#search_sbTime').val());
    $('#hidden_seTime').val($('#search_seTime').val());

    console.log("youzz")
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
        status: $('#hidden_status').val(),
        billNum: $('#hidden_billNum').val(),
        receiver: $('#hidden_receiver').val(),
        sbTime: $('#hidden_sbTime').val(),
        seTime: $('#hidden_seTime').val()
    }

    console.log(JSON.stringify(param));

    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: "/detailBillSerach",
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status;
                if (data[i].status == 0){status='未填'}
                else if (data[i].status == 1) {status='已填'}
                else if (data[i].status == 2) {status='作废'}

                html += "<tr><input type='hidden' class='pid' value="+ data[i].id+ "><td>"+data[i].billNum+"</td><td>"+data[i].receiver+"</td><td>"+data[i].receiverPhone+"</td>" +
                    "<td>"+data[i].distributePerson+"</td><td>"+data[i].distributePersonPhone+"</td><td>"+data[i].receivePlace+"</td>" +
                    "<td>"+data[i].writeTime+"</td><td>"+status+"</td><td><div class='btn-group'>" +
                    // "<a class='btn btn-info btn-xs p310 editRow' id='edit'>编辑</a>" +
                    "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#addConfirm\" class=\"btn btn-info btn-xs p310 editRow\" onclick='showModal(this)'>编辑</a>"+
                    "</div> </td></tr>"
            }
            tbody.html(html);
            onpage.html(page);
        }
    })

    getSearchTotalPage('datailbillSearchCount',param);
}