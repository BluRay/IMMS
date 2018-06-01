var pic01 = "";
var photoCount = 0;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect('','',"#new_factory","请选择",'id');
		getKeysSelect("PROCESS_FAULT_AREA", "", "#new_area",null,"value");
		getFactorySelect("quality/processFault",'',"#new_response_factory",null,'id');
		getBusType();
		getWorkshopSelect("quality/processFault",$("#new_response_factory :selected").text(),"","#new_workshop",null,"id");
		
	}
	
	$("#new_vin").blur(function(){
		if($("#new_vin").val() !== ""){
			$.ajax({
				url: "getFactoryIdByVin",
				dataType: "json",
				data: {"vin":$("#new_vin").val()},
				async: false,
				error: function () {alertError();},
				success: function (response) {
					//console.log(response.data.length);
					if(response.data.length == 0){
						$("#new_bus_type").removeAttr("disabled");
						$("#new_order_no").removeAttr("disabled");
						$("#new_factory").removeAttr("disabled");
						$("#new_factory").val('');
					}else{
						$("#new_bus_type").attr("disabled","disabled"); 
						$("#new_order_no").attr("disabled","disabled"); 
						$("#new_bus_type").val(response.data[0].bus_type_id);
						$("#new_order_no").val(response.data[0].order_no);
						$("#new_order_desc").val(response.data[0].order_describe);
						$("#new_factory").val(response.data[0].factory_id);
						$("#new_factory").attr("disabled","disabled"); 
					}
				}
			});
		}
	});
	
	$("#btn_clear").click(function(){
    	resetPage();
    })

    $("#btn_save").click(function(){
    	ajaxEnter();
    });
	
	$("#btn_scan").click(function(){
    	yspCheckIn.qrCode();
    })
    
	$("#exec_factory").change(function(){
		$("#exec_workshop").empty();
		if($("#exec_factory").val() !=''){
			getAllWorkshopSelect();
		}
	});
	
	$("#exec_process").change(function(){
		$("#exec_processname").val('');
		var process_code=$("#exec_process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#exec_processname").html(process_name);
	});
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#new_vin').bind('keydown', function(event) {
        //if new_vin disable,stop propogation
        if($(this).attr("disabled") == "disabled")
            return false;
        if (event.keyCode == "13"){
            if(jQuery.trim($('#new_vin').val()) != ""){
                ajaxValidate();
            }
            return false;
        }
    });
    
    function getBusType(){
		$("#new_bus_type").empty();
		$.ajax({
			url: "../common/getBusType",
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				//var strs = "<option value=''>全部</option>";
				var strs2 = "<option value=''>请选择</option>";
			    $.each(response.data, function(index, value) {
			    	//strs += "<option value=" + value.code + ">" + value.name + "</option>";
			    	strs2 += "<option value=" + value.id + ">" + value.name + "</option>";
			    });
			    $("#new_bus_type").append(strs2);
			}
		})
	}

    
})



function ajaxEnter(){	
	var vinTest = /^[a-zA-Z0-9]{17}$/;
	var milsVal = "^[0-9]*[1-9][0-9]*$";
	//数据验证
	if($("#new_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#new_fault_date").focus();
		return false;
	}
	if($("#new_license_number").val()==''){
		alert("请输入车牌号码,没有车牌号请输入'/'");
		$("#new_license_number").val('/');
		$("#new_license_number").focus().select();
		return false;
	}
	if($("#new_vin").val()==''){
		alert("请输入VIN号！");
		$("#new_vin").focus();
		return false;
	}
	if(!vinTest.test($("#new_vin").val())){
		alert("请输入长度为17位，只包含大写字母和数字的VIN号！");
		$("#new_vin").focus();
		return false;
	}
	if($("#new_order_no").val()==''){
		alert("请输入生产订单！");
		$("#new_order_no").focus();
		return false;
	}
	if($("#new_fault_phenomenon").val()==''){
		alert("请输入故障描述！");
		$("#new_fault_phenomenon").focus();
		return false;
	}
	if($("#new_fault_reason").val()==''){
		alert("请输入故障原因！");
		$("#new_fault_reason").focus();
		return false;
	}
	
    $.ajax({
        type: "post",
        dataType: "json",
        url : "addProcessFault",
        data: {
        	"bus_type" : $("#new_bus_type").val(),			//改成存车型ID 170911
			"fault_date":$("#new_fault_date").val(),
			"fault_mils" : $("#new_fault_mils").val(),
			"customer_name" : $("#new_customer_name").val(),
			"license_number" : $("#new_license_number").val(),
			"vin" : $("#new_vin").val(),
			"fault_level_id" : $("#new_fault_level").val(),
			"is_batch" : $("#new_is_batch").val(),
			"fault_phenomenon" : $("#new_fault_phenomenon").val(),
			"fault_reason" : $("#new_fault_reason").val(),
			"order_no":$("#new_order_no").val(),
			"order_desc":$("#new_order_desc").val(),
			"area":$('#new_area').find("option:selected").text(),
			"response_factory" : $('#new_response_factory').find("option:selected").text(),
			"workshop" : $('#new_workshop').find("option:selected").text(),
			"resolve_method" : $("#new_resolve_method").val(),
			"resolve_date" : $("#new_resolve_date").val(),
			"resolve_result" : $("#new_resolve_result").val(),
			"punish" : $("#new_punish").val(),
			"create_user" : $("#new_create_user").val(),
			"compensation" : $("#new_compensation").val(),
			"memo" : $("#new_memo").val()
        },
        success: function(response){
            resetPage();
            if(response.success){ 
                fadeMessageAlert(null,"操作成功！","gritter-success");
                resetPage();
            }
            else{
                fadeMessageAlert(null,response.message,"agritter-error");
            }

            setTimeout(function() {
                $("#vinHint").hide().html("未输入车号");
            },60000);
        },
        error:function(){alertError();}
    });
    
}

function resetPage () {
	$("#scan_form").resetForm();
    $("#new_vin").removeAttr("disabled");
    $("#new_vin").val("");
   	$('#new_vin').data("vin","");
	$('#new_vin').data("order_id","");
	$('#new_vin').data("order_config_id","");
	$('#new_vin').data("bus_type_id","");
    $("#new_vin").focus();
    //$("#btn_save").hide();
    //$("#btn_clear").hide();
    
}

function setImageData(str){
	//document.getElementById('img_src').src = 'data:image/gif;base64,'+str;
	document.getElementById('img_src_' + photoCount).src = 'data:image/gif;base64,'+str;
	photoCount++;
	
	var paramHtml = '<img onclick="yspCheckIn.openCamera()" width="200" height="200" id="img_src_'+photoCount+'"></img><br/>*点击上方图片框拍摄照片<br/>';
	$(paramHtml).appendTo("#photo_div");
	
	pic01 = str;
}

function setQRData(str){
	//alert(str);
	$("#new_vin").val(str);
	if($('#new_vin').attr("disabled") == "disabled")
        return false;
	if(jQuery.trim($('#new_vin').val()) != ""){
		$.ajax({
			url: "getFactoryIdByVin",
			dataType: "json",
			data: {"vin":$("#new_vin").val()},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				//console.log(response.data.length);
				if(response.data.length == 0){
					$("#new_bus_type").removeAttr("disabled");
					$("#new_order_no").removeAttr("disabled");
					$("#new_factory").removeAttr("disabled");
					$("#new_factory").val('');
				}else{
					$("#new_bus_type").attr("disabled","disabled"); 
					$("#new_order_no").attr("disabled","disabled"); 
					$("#new_bus_type").val(response.data[0].bus_type_id);
					$("#new_order_no").val(response.data[0].order_no);
					$("#new_order_desc").val(response.data[0].order_describe);
					$("#new_factory").val(response.data[0].factory_id);
					$("#new_factory").attr("disabled","disabled"); 
				}
			}
		});
    }
}
