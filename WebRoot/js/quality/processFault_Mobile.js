var pic01 = "";var pic02 = "";var pic03 = "";var pic04 = "";var pic05 = "";
var picb01 = "";var picb02 = "";var picb03 = "";var picb04 = "";var picb05 = "";
var photoCount = 0;var photobCount = 0;		//处理前照片  处理后照片
var picType = 0;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect('','',"#new_factory","请选择",'id');
		getKeysSelect("PROCESS_FAULT_AREA", "", "#new_area","请选择","value");
		getFactorySelect("quality/processFault",'',"#new_response_factory","请选择",'id');
		getBusType();
		getWorkshopSelect("quality/processFault",$("#new_response_factory :selected").text(),"","#new_workshop","请选择","id");
		pic01 = "";pic02 = "";pic03 = "";pic04 = "";pic05 = "";
		picb01 = "";picb02 = "";picb03 = "";picb04 = "";picb05 = "";
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
    
	$("#new_response_factory").change(function(){
		$("#new_workshop").empty();
		if($("#new_response_factory").val() !=''){
			getWorkshopSelect("quality/processFault",$("#new_response_factory :selected").text(),"","#new_workshop","请选择","id");
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
				var strs2 = "<option value=''>请选择</option>";
			    $.each(response.data, function(index, value) {
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
	if($("#new_vin").val()==''){
		alert("请输入VIN号！");
		$("#new_vin").focus();
		return false;
	}
	if($("new_area").val()==''){
		alert("请输入销售地区！");
		return false;
	}
	if($("#new_license_number").val()==''){
		alert("请输入车牌号码,没有车牌号请输入'/'");
		$("#new_license_number").val('/');
		$("#new_license_number").focus().select();
		return false;
	}
	if($("#new_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#new_fault_date").focus();
		return false;
	}
	if($("#new_fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#new_fault_mils").focus();
		return false;
	}
	if($("#new_fault_level").val()==''){
		alert("请输入故障等级！");
		return false;
	}
	if($("#new_is_batch").val()==''){
		alert("请输入故障性质！");
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
	if($("#new_resolve_method").val()==''){
		alert("请输入处理方法！");
		$("#new_resolve_method").focus();
		return false;
	}
	if($("#new_order_no").val()==''){
		alert("请输入生产订单！");
		$("#new_order_no").focus();
		return false;
	}
	if($("#new_factory").val()==''){
		alert("请输入生产工厂！");
		return false;
	}
	if($("#new_bus_type").val()==''){
		alert("请输入车辆型号！");
		return false;
	}
	if(!vinTest.test($("#new_vin").val())){
		alert("请输入长度为17位，只包含大写字母和数字的VIN号！");
		$("#new_vin").focus();
		return false;
	}
	
    $.ajax({
        type: "post",
        dataType: "json",
        url : "addProcessFaultMobile",
        data: {
			"vin" : $("#new_vin").val(),
			"area":$('#new_area').find("option:selected").text(),
			"license_number" : $("#new_license_number").val(),
			"fault_date":$("#new_fault_date").val(),
			"fault_mils" : $("#new_fault_mils").val(),
			"fault_level_id" : $("#new_fault_level").val(),
			"is_batch" : $("#new_is_batch").val(),			//故障性质
			"fault_phenomenon" : $("#new_fault_phenomenon").val(),
			"fault_reason" : $("#new_fault_reason").val(),
			"resolve_method" : $("#new_resolve_method").val(),
			
			"pic01":pic01,
			"pic02":pic02,
			"pic03":pic03,
			"pic04":pic04,
			"pic05":pic05,
			"picb01":picb01,
			"picb02":picb02,
			"picb03":picb03,
			"picb04":picb04,
			"picb05":picb05,

			"order_no":$("#new_order_no").val(),
			"order_desc":$("#new_order_desc").val(),
			"factory_id":$("#new_factory").val(),
			"bus_type" : $("#new_bus_type").val(),			//改成存车型ID 170911
			"response_factory" : $('#new_response_factory').find("option:selected").text(),
			"workshop" : $('#new_workshop').find("option:selected").text(),
			"resolve_user":$("#new_resolve_user").val(),
			"resolve_result" : $("#new_resolve_result").val(),
			"resolve_date" : $("#new_resolve_date").val(),
			"punish" : $("#new_punish").val(),
			"compensation" : $("#new_compensation").val(),
			"memo" : $("#new_memo").val()

			//"customer_name" : $("#new_customer_name").val(),
			//"create_user" : $("#new_create_user").val(),
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

function fun_openCamera(index){		//拍摄处理前照片
	//alert("-->fun_openCamera = " + index + "|photoCount = " + photoCount);
	picType = 0;
	if(index >= photoCount){
		yspCheckIn.openCamera();
	}
}
function fun_openCamera2(index){		//拍摄处理前照片
	//alert("-->fun_openCamera = " + index + "|photoCount = " + photoCount);
	picType = 2;
	if(index >= photobCount){
		yspCheckIn.openCamera();
	}
}

function setImageData(str){
	if(picType == 0){
		document.getElementById('img_src_' + photoCount).src = 'data:image/gif;base64,'+str;
		if (photoCount==0)pic01 = str;
		if (photoCount==1)pic02 = str;
		if (photoCount==2)pic03 = str;
		if (photoCount==3)pic04 = str;
		if (photoCount==4)pic05 = str;		
		photoCount++;
		if(photoCount < 5){
			var paramHtml = '<img onclick="fun_openCamera('+photoCount+')" width="100%" height="200" id="img_src_'+photoCount+'"></img><br/>*点击上方图片框拍摄照片<br/>';
			$(paramHtml).appendTo("#photo_div");
		}
	}else{
		document.getElementById('img2_src_' + photobCount).src = 'data:image/gif;base64,'+str;
		if (photobCount==0)picb01 = str;
		if (photobCount==1)picb02 = str;
		if (photobCount==2)picb03 = str;
		if (photobCount==3)picb04 = str;
		if (photobCount==4)picb05 = str;	
		photobCount++;
		if(photobCount < 5){
			var paramHtml = '<img onclick="fun_openCamera2('+photobCount+')" width="100%" height="200" id="img2_src_'+photobCount+'"></img><br/>*点击上方图片框拍摄照片<br/>';
			$(paramHtml).appendTo("#photo_div2");
		}
	}
	
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
