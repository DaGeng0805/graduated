$(document).ready(function () {
    findByContractNum();
    hidding();
})

function hidding(){
    if ($('#checkSend').val()!='false'){$('#hidding').remove()}
}

function findByContractNum() {
    console.log($('#checkSend').val() == 'false');
    var tbody = $('#tBody');
    var addTBody = $('#addTBody');
    var html = "";
    $.ajax({
        type: 'get',
        url: "/goodsFindByContractNum/" + $('#contractNum').val(),
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var restanteId = "res" + data[i].id
                if (data[i].restante != 0){
                    if($('#checkSend').val() == 'false'){
                        html += "<tr id='" + data[i].id + "'><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].goodsNum + "</td>" +
                            "<td>" + data[i].goodsName + "</td><td id='" + restanteId + "' value='" + data[i].restante + "'>" + data[i].restante + "</td><td>" + data[i].beginPlace + "</td>" +
                            "<td>" + data[i].endPlace + "</td>" +
                            "<td>" +
                            "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'" +
                            "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>添加</span></button> </a>" +
                            "</td>" +
                            "</tr>"
                    }else{
                        html += "<tr id='" + data[i].id + "'><input type='hidden' class='pid' value=" + data[i].id + "><td>" + data[i].goodsNum + "</td>" +
                            "<td>" + data[i].goodsName + "</td><td id='" + restanteId + "' value='" + data[i].restante + "'>" + data[i].restante + "</td><td>" + data[i].beginPlace + "</td>" +
                            "<td>" + data[i].endPlace + "</td>" +
                            // "<td>" +
                            // "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'" +
                            // "type='button' onclick='sendid(this)' pid='" + data[i].id + "'><i class=\"fa-remove\"></i><span>添加</span></button> </a>" +
                            // "</td>" +
                            "</tr>"
                    }

                }
            }
            tbody.html(html);
        }
    })

    var html1 = '';
    $.ajax({
        type: 'get',
        url: "/carrageGoodByContractNum/" + $('#contractNum').val(),
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (d) {
            for (var i = 0; i < d.length; i++) {
                $.ajax({
                    type: 'get',
                    url: "/goodsFindByGoodsNum/" + d[i].goodsNum,
                    async: false,
                    timeout: 10000,
                    headers: {"Content-Type": "application/json;charset=utf-8"},
                    success: function (data) {
                        if($('#checkSend').val() == 'false'){
                            html1 += "<tr id='a" + data.id + "'><input type='hidden' class='pid' value=" + data.id + "><td>" + data.goodsNum + "</td>" +
                                "<td>" + data.goodsName + "</td><td id='ares" + data.id + "'>" + d[i].number + "</td><td>" + data.beginPlace + "</td>" +
                                "<td>" + data.endPlace + "</td>" +
                                "<td>" +
                                "<button class='btn btn-red btn-icon btn-icon-standalone'" +
                                "type='button' onclick='deleteGoodsNum(this)' pid='" + data.id + "'><i class=\"fa-remove\"></i><span>删除</span></button>" +
                                "</td>" +
                                "</tr>"
                        }else {
                            html1 += "<tr id='a" + data.id + "'><input type='hidden' class='pid' value=" + data.id + "><td>" + data.goodsNum + "</td>" +
                                "<td>" + data.goodsName + "</td><td id='ares" + data.id + "'>" + d[i].number + "</td><td>" + data.beginPlace + "</td>" +
                                "<td>" + data.endPlace + "</td>" +
                                // "<td>" +
                                // "<button class='btn btn-red btn-icon btn-icon-standalone'" +
                                // "type='button' onclick='deleteGoodsNum(this)' pid='" + data.id + "'><i class=\"fa-remove\"></i><span>删除</span></button>" +
                                // "</td>" +
                                "</tr>"
                        }
                        addTBody.append(html1);
                    }
                })
            }
            addTBody.html(html1);
        }
    })


}

function deleteGoodsNum(Obj) {
    $.ajax({
        type: 'get',
        url: "/goodsFindById/" + $(Obj).attr('pid'),
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            var res = '#' + "res" + $(Obj).attr('pid');
            var ares = '#' + "ares" + $(Obj).attr('pid');
            var aid = '#a' + $(Obj).attr('pid');
            var aresValure = parseInt($(ares).html());
            var resValure = 0;

            if ($(res).length > 0) {
                resValure = parseInt($(res).html());
                $(res).html(parseInt($(ares).html()) + parseInt($(res).html()));
                $(aid).remove();
            }
            else {
                resValure=0;
                var tbody = $('#tBody');
                var html = '';

                if($('#checkSend').val() == 'false'){
                    html += "<tr id='" + data.id + "'><input type='hidden' class='pid' value=" + data.id + "><td>" + data.goodsNum + "</td>" +
                        "<td>" + data.goodsName + "</td><td id='res" + data.id + "'>" + parseInt($(ares).html()) + "</td><td>" + data.beginPlace + "</td>" +
                        "<td>" + data.endPlace + "</td>" +
                        "<td>" +
                        "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'" +
                        "type='button' onclick='sendid(this)' pid='" + data.id + "'><i class=\"fa-remove\"></i><span>添加</span></button> </a>" +
                        "</td>" +
                        "</tr>"
                }
                else{
                    html += "<tr id='" + data.id + "'><input type='hidden' class='pid' value=" + data.id + "><td>" + data.goodsNum + "</td>" +
                        "<td>" + data.goodsName + "</td><td id='res" + data.id + "'>" + parseInt($(ares).html()) + "</td><td>" + data.beginPlace + "</td>" +
                        "<td>" + data.endPlace + "</td>" +
                        // "<td>" +
                        // "<a href=\"javascript:;\"  data-toggle=\"modal\" data-target=\"#modal-deleteConfirm\" class=\"btn btn-success btn-icon btn-icon-standalone\" ><button class='btn btn-success btn-icon btn-icon-standalone'" +
                        // "type='button' onclick='sendid(this)' pid='" + data.id + "'><i class=\"fa-remove\"></i><span>添加</span></button> </a>" +
                        // "</td>" +
                        "</tr>"

                }
                tbody.append(html);
                $(aid).remove();
            }

            var param = {
                contractNum: $('#contractNum').val(),
                goodsNum: data.goodsNum,
                endPlace: data.endPlace,
                number: parseInt($(ares).html())
            }
            console.log(JSON.stringify(param))
            $.ajax({
                type: 'post',
                url: "/carrageGoodsDelete",
                async: false,
                timeout: 10000,
                data: JSON.stringify(param),//序列化表单数据
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (data) {
                }
            })

            console.log(aresValure)
            console.log(resValure)
            var param1 = {
                id: data.id,
                restante: aresValure+resValure
            }

            console.log(JSON.stringify(param1));
            $.ajax({
                type: 'post',
                url: "/goodsUpdate",
                async: false,
                timeout: 10000,
                data: JSON.stringify(param1),//序列化表单数据
                headers: {"Content-Type": "application/json;charset=utf-8"},
                success: function (data) {

                }
            })

        }
    })
}

function checkNum(Obj) {
    var reg = /^[1-9]\d*$/;
    var addTBody = $('#addTBody');
    var html = ""

    if (reg.test($('#goodsNumber').val())) {
        $.ajax({
            type: 'get',
            url: "/goodsFindById/" + $(Obj).val(),
            async: false,
            timeout: 10000,
            headers: {"Content-Type": "application/json;charset=utf-8"},
            success: function (data) {
                var res = '#' + "res" + $(Obj).val();
                var ares = '#' + "ares" + $(Obj).val();
                var resValue = parseInt($(res).html());
                if (parseInt($(res).html()) >= parseInt($('#goodsNumber').val())) {
                    if (parseInt($(res).html()) == parseInt($('#goodsNumber').val())) {
                        $('#' + $(Obj).val()).remove();
                    }

                    console.log($(ares).length);
                    if ($(ares).length > 0) {
                        $(ares).html(parseInt($(ares).html()) + parseInt($('#goodsNumber').val()));
                        $(res).html(parseInt($(res).html()) - parseInt($('#goodsNumber').val()));
                    }
                    else {
                        html += "<tr id='a" + data.id + "'><input type='hidden' class='pid' value=" + data.id + "><td>" + data.goodsNum + "</td>" +
                            "<td>" + data.goodsName + "</td><td id='ares" + data.id + "'>" + parseInt($('#goodsNumber').val()) + "</td><td>" + data.beginPlace + "</td>" +
                            "<td>" + data.endPlace + "</td>" +
                            "<td>" +
                            "<button class='btn btn-red btn-icon btn-icon-standalone'" +
                            "type='button' onclick='deleteGoodsNum(this)' pid='" + data.id + "'><i class=\"fa-remove\"></i><span>删除</span></button>" +
                            "</td>" +
                            "</tr>"
                        addTBody.append(html);
                        // $('#'+"res"+$(Obj).val()).val(parseInt($('#'+"res"+$(Obj).val()).val()) - parseInt($('#goodsNumber').val()));
                        $(res).html(parseInt($(res).html()) - parseInt($('#goodsNumber').val()));
                    }
                    $('#modal-deleteConfirm').modal('hide');


                    var param = {
                        contractNum: $('#contractNum').val(),
                        goodsNum: data.goodsNum,
                        endPlace: data.endPlace,
                        number: parseInt($(ares).html())
                    }
                    console.log(JSON.stringify(param))

                    $.ajax({
                        type: 'post',
                        url: "/carrageGoodsInsertOrUpdate",
                        async: false,
                        timeout: 10000,
                        data: JSON.stringify(param),//序列化表单数据
                        headers: {"Content-Type": "application/json;charset=utf-8"},
                        success: function (data) {

                        }
                    })

                    var paramUpdate = {
                        id: data.id,
                        restante: resValue - parseInt($('#goodsNumber').val())
                    }
                    console.log(JSON.stringify(paramUpdate));
                    $.ajax({
                        type: 'post',
                        url: "/goodsUpdate",
                        async: false,
                        timeout: 10000,
                        data: JSON.stringify(paramUpdate),//序列化表单数据
                        headers: {"Content-Type": "application/json;charset=utf-8"},
                        success: function (data) {

                        }
                    })

                    $('#goodsNumber').val('');
                } else {
                    toastr.error("数值不能大于剩余数量!");
                }
            }
        })


    } else {
        toastr.error("请输不为0的正整数!");
    }

}

$('#modal-deleteConfirm').on('shown.bs.modal', function (e) {     //模态框的ID

    $('#goodsNumber').focus(); //通过ID找到对应输入框，让其获得焦点

});
