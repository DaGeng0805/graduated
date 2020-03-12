$('#driverId').on('click',function () {
   var  beginPlace = $('#beginPlace').val();
   var endPlace  = $('#endPlace').val();
   if( "" == beginPlace || endPlace == ""){
       toastr.error("请先选择发货地，交货地");
   }
});

$('#driverId').on('change',function () {
   var id =  $(this).val();
    $.eachDriver(id);
});

$('#beginPlace').off().on('change',function () {
    var  beginPlace = $('#beginPlace').val();
    if( "" != beginPlace ){
       $('#endPlace').val("");
    }
    $.ajax({
        url: '/getArroundCity',
        dataType: 'json',
        data: {"beginPlace":beginPlace},
        method: 'POST',
        success: function (response) {
            var opt ;
            $.each(response,function (index,item) {
                opt += '<option>'+ item + '</option>';
            });
            $('#end').html(opt);
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
});
var data;
$('#endPlace').off().on('change',function () {
    var  beginPlace = $('#beginPlace').val();
    var  endPlace = $('#endPlace').val();
    if(beginPlace != "" && endPlace != "" ){
        $.ajax({
            url: '/getDriver',
            dataType: 'json',
            data: {"beginPlace":beginPlace,"endPlace":endPlace},
            method: 'POST',
            success: function (response) {
                data = response;
                var driver;
                $.each(response,function (index,item) {
                    driver += '<option value="'+item.id+'">'+ item.name + '</option>';
                });
                $('#driverId').html(driver);
               var id = $('#driverId').val();
               $.eachDriver(id);
            },
            fail: function (response) {
                toastr.error("系统崩溃....");
            }
        });
    }
});


$.eachDriver = function(id){
    $.each(data,function (index,item) {
        if(data[index].id == id){
            $('#plateNumber').val(data[index].plateNumber);
            $('#drivingLicence').val(data[index].drivingLicence);
            $('#licence').val(data[index].licence);
        }
    })
};


$("#contractNum").on('change',function () {
 // var param = {"id":$(this).val()};
    // $.get('/getBeginEndPlace',param,function (response) {
    //     $("#beginPlace").val(response.beginPlace);
    //     $("#endPlace").val(response.endPlace);
    // });
     var param = $(this).val();
    getDriverAndPlace(param);
});

$('#addCarrage').off().on('click',function () {
   var bv =  $('#carrageForm').data("bootstrapValidator");
   bv.validate();
    var time = $('#startTime').val();
    if(time == null || time == ""){
        toastr.error("起运时间必填");
        return false;
    }
    var time1 = $('#signTime').val();
    if(time1 == null || time1 == ""){
        toastr.error("签订时间必填");
        return false;
    }
    if(bv.isValid()){
       var data = {};
       $.each($('#carrageForm').serializeArray(),function (index,item) {
           //plateNumber":"168168","drivingLicence":"ae86
           if(item.name != "plateNumber" && item.name != "drivingLicence"){
               data[item.name] = item.value;
           }
       });
       console.info(JSON.stringify(data)+ " :  sdata");
       $.ajax({
           url: '/carrageContract',
           method: 'POST',
           contentType: 'application/json',
           dataType: 'JSON',
           async: false,
           data:JSON.stringify(data) ,
           success: function (res) {
               // if(res.flag){
               //     toastr.success(res.data.stateInfo);
               // }
               // setTimeout(function () {
               //     window.location.href="/goBillQuery";
               // },800);
               console.info(res.flag+" :: "+res.message);
               if(res.flag){
                   toastr.success(res.message);
                   setTimeout(function () {
                       window.location.href="/goReceiptQuery";
                   },800);
               }else{
                   toastr.error(res.message);
               }
           },
           fail: function (res) {
               toastr(res.data.stateInfo);
           }
       });
       return false;
   }
});

function getDriverAndPlace(param){
    $.ajax({
        url: "/getBeginEndPlace?id="+param,
        contentType: 'application/json',
        dataType: 'json',
        data: null,
        method: 'POST',
        success: function (response) {
            if (response.flag) {
                $(".selectDriver").html('   <select class="form-control" id="driverId" multiple="multiple">\n' +
                    '    </select>');
                console.info(response.beginPlace+ " :: " + response.endPlace);
                $("#beginPlace").val(response.beginPlace);
                $("#endPlace").val(response.endPlace);
                var data =[];
                $.each(response.driverInfoList,function (index,item) {
                   data.push({id:item.id,text:item.name,selected:true});
                });
                $("#driverId").select2({
                   data: data
                });
            } else {
                  toastr.error(response.message);
            }
        },
        fail: function (response) {
            toastr.error("系统崩溃....");
        }
    });
}


$(function () {
    $('#carrageForm').bootstrapValidator({
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
            serviceCharge: {
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
});

