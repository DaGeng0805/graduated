function findPage(url) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: url,
        //data: addform.serialize(),//序列化表单数据
        async:false,
        timeout: 10000,
        success: function (data) {
           return data;
        }
    })
}

function getUpPage() {
    var onpage = $('#onpage'),pages = parseInt(onpage.text());
    var page = 0;
    if (pages-1==0){page=1;}else{page=pages-1;}
    return page;
}
function getDownPage() {
    var onpage = $('#onpage'),pages = parseInt(onpage.text());
    var totalPage = $('#totalPage').val();
    var page = 0;
    if (pages+1>parseInt(totalPage)){page = totalPage;} else {page = pages+1;}
    return page;
}
function getFinalPage() {
    var totalPage = $('#totalPage').val();
    return totalPage;
}
function getGoPage() {
    var num = $('#num').val();
    var reg = /^[0-9]*$/;
    if (reg.test(num))
    {
        var totalPage = parseInt($('#totalPage').val());
        var pages = parseInt(num);
        var page = 0;
        if (pages>totalPage){page = totalPage}
        else if (pages == 0){page = 1}
        else {page = pages}
    }
    else {
        return false;
    }
    return page;
}

function checkSiteManagerPhone(phone) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/managerFindByPhone/"+phone,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
           if (data.phone != null){
               flag = false;
           }else {
               flag =  true;
           }
        }
    })

    return flag;
}

function checkStation(stationName) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/checkStationName/"+stationName,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.stationName != null){
                console.log("有此站点")
                flag = true;
            }else {
                flag =  false;
            }
        }
    })
    return flag;
}

function checkSalesmanPhone(phone) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/salesmanFindByPhone/"+phone,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.phone != null){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}

function checkCustomerPhone(phone) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/customerFindByPhone/"+phone,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.phone != null){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })
    return flag;
}

function checkDriverPhone(phone) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/driverFindByPhone/"+phone,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.phone != null){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}

function checkDriverLicence(licence) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/driverFindByLicence/"+licence,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.licence != null){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}

function checkWaybill(waybill) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/detailBillFindbyBillNum/"+waybill,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.status != 0){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}



function checkWaybillIsDone(waybill) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/waybillFindByWaybill/"+waybill,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            if (data.status != 2){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}

function checkPlateNum(plateNum) {
    var flag = false;
    $.ajax({
        type: 'get',
        // dataType: 'json',
        url: "/truckSelectByPlateNum/"+plateNum,
        async: false,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            console.log(data)
            if (data != "" && data != null){
                flag = false;
            }else {
                flag =  true;
            }
        }
    })

    return flag;
}


$('#first').click(function () {
    tosearch(1);
})

$('#end').click(function () {
    tosearch(getFinalPage());
})

$('#up').click(function () {
    tosearch(getUpPage())
})

$('#down').click(function () {
    tosearch(getDownPage())
})

$('#go').click(function (e) {
    var result = getGoPage();
    if (result == false){
        toastr.warning("请输入正确数字")
    }else {
        tosearch(result);
    }
})

function sendid(Obj) {
    console.log($(Obj).attr("pid"))
    $('#confirm').val($(Obj).attr("pid"));
}

function getSearchTotalPage(url,param){
    var totalPage = $('#totalPage');
    $.ajax({
        type: 'post',
        //dataType: 'json',
        url: url,
        data: JSON.stringify(param),
        async: true,
        timeout: 10000,
        headers: {"Content-Type": "application/json;charset=utf-8"},
        success: function (data) {
            console.log(data);
            totalPage.val(data);
        }
    })
}
