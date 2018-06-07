//var pic01 = "";var pic02 = "";var pic03 = "";var pic04 = "";var pic05 = "";
//var picb01 = "";var picb02 = "";var picb03 = "";var picb04 = "";var picb05 = "";
//var photoCount = 0;var photobCount = 0;var photoMaCount = -1;var photoMbCount = -1;		//处理前照片  处理后照片 重新拍摄照片序号
//var picType = 0;

var pre_pic_count = 1;var pic_count = 1;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect('','',"#factory","请选择",'id');
		getKeysSelect("PROCESS_FAULT_AREA", "", "#area","请选择","key_name");
		getFactorySelect("quality/processFault",'',"#response_factory","请选择",'name');
		getBusType();
		getWorkshopSelect("quality/processFault",$("#response_factory :selected").text(),"","#workshop","请选择","id");
		pic01 = "";pic02 = "";pic03 = "";pic04 = "";pic05 = "";
		picb01 = "";picb02 = "";picb03 = "";picb04 = "";picb05 = "";
	}
	
	$("#vin").blur(function(){
		if($("#vin").val() !== ""){
			$.ajax({
				url: "getFactoryIdByVin",
				dataType: "json",
				data: {"vin":$("#vin").val()},
				async: false,
				error: function () {alertError();},
				success: function (response) {
					//console.log(response.data.length);
					if(response.data.length == 0){
						$("#bus_type").removeAttr("disabled");
						$("#order_no").removeAttr("disabled");
						$("#factory").removeAttr("disabled");
						$("#factory").val('');
					}else{
						$("#bus_type").attr("readonly","readonly"); 
						$("#order_no").attr("readonly","readonly"); 
						$("#bus_type").val(response.data[0].bus_type_id);
						$("#order_no").val(response.data[0].order_no);
						$("#order_desc").val(response.data[0].order_describe);
						$("#factory").val(response.data[0].factory_id);
						$("#factory").attr("readonly","readonly"); 
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
    
	$("#response_factory").change(function(){
		$("#workshop").empty();
		if($("#response_factory").val() !=''){
			getWorkshopSelect("quality/processFault",$("#response_factory :selected").text(),"","#workshop","请选择","id");
		}
	});
	
	$("#exec_process").change(function(){
		$("#exec_processname").val('');
		var process_code=$("#exec_process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#exec_processname").html(process_name);
	});
	
	$(document).on("click",".del_pre_pic",function(e){
		var tr=$(e.target).closest("tr");
		$(tr).remove();	
		pre_pic_count--;
	});
	$(document).on("click",".del_pic",function(e){
		var tr=$(e.target).closest("tr");
		$(tr).remove();	
		pic_count--;
	});
	
	$("#add_pic").click( function (argument) {		
		if(pic_count >= 5){
			alert("最多上传5张图片！");
		}else{
			var paramHtml='<tr><td><input name="pic_file" style="width:80%" type="file" accept=".jpg,.JPG"/></td>' +
			'<td><i id="iconIcon" class="del_pic fa fa-times bigger-180" style="cursor: pointer;color: blue;"></i></td></tr>';
			$(paramHtml).appendTo("#pic_tr");	
			pic_count ++ ;
		}
		return false;
	});
	
	$("#add_pre_pic").click( function (argument) {		
		if(pre_pic_count >= 5){
			alert("最多上传5张图片！");
		}else{
			var paramHtml='<tr><td><input name="pre_pic_file" style="width:80%" type="file" accept=".jpg,.JPG"/></td>' +
			'<td><i id="iconIcon" class="del_pre_pic fa fa-times bigger-180" style="cursor: pointer;color: blue;"></i></td></tr>';
			$(paramHtml).appendTo("#pre_pic_tr");	
			pre_pic_count ++ ;
		}
		return false;
	});
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#vin').bind('keydown', function(event) {
        //if vin disable,stop propogation
        if($(this).attr("disabled") == "disabled")
            return false;
        if (event.keyCode == "13"){
            if(jQuery.trim($('#vin').val()) != ""){
                ajaxValidate();
            }
            return false;
        }
    });
    
    function getBusType(){
		$("#bus_type").empty();
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
			    $("#bus_type").append(strs2);
			}
		})
	}

    
})



function ajaxEnter(){	
	var vinTest = /^[a-zA-Z0-9]{17}$/;
	var milsVal = "^[0-9]*[1-9][0-9]*$";
	//数据验证
	if($("#vin").val()==''){
		alert("请输入VIN号！");
		$("#vin").focus();
		return false;
	}
	if($("area").val()==''){
		alert("请输入销售地区！");
		return false;
	}
	if($("#license_number").val()==''){
		alert("请输入车牌号码,没有车牌号请输入'/'");
		$("#license_number").val('/');
		$("#license_number").focus().select();
		return false;
	}
	if($("#fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#fault_date").focus();
		return false;
	}
	if($("#fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#fault_mils").focus();
		return false;
	}
	if($("#fault_level").val()==''){
		alert("请输入故障等级！");
		return false;
	}
	if($("#is_batch").val()==''){
		alert("请输入故障性质！");
		return false;
	}
	if($("#fault_phenomenon").val()==''){
		alert("请输入故障描述！");
		$("#fault_phenomenon").focus();
		return false;
	}
	if($("#fault_reason").val()==''){
		alert("请输入故障原因！");
		$("#fault_reason").focus();
		return false;
	}
	if($("#resolve_method").val()==''){
		alert("请输入处理方法！");
		$("#resolve_method").focus();
		return false;
	}
	if($("#order_no").val()==''){
		alert("请输入生产订单！");
		$("#order_no").focus();
		return false;
	}
	if($("#factory").val()==''){
		alert("请输入生产工厂！");
		return false;
	}
	if($("#bus_type").val()==''){
		alert("请输入车辆型号！");
		return false;
	}
	if(!vinTest.test($("#vin").val())){
		alert("请输入长度为17位，只包含大写字母和数字的VIN号！");
		$("#vin").focus();
		return false;
	}
	$("#btn_save").attr("disabled","disabled"); 
	fadeMessageAlert(null,"正在提交，请稍候...","gritter-success");
	
	var response_factory =  $('#response_factory').find("option:selected").text();
	var workshop =  $('#workshop').find("option:selected").text();
	
	$("#processFault_form").ajaxSubmit({
		url:"addProcessFaultMobile",
		type: "post",
		dataType:"json",
		success:function(response){
			resetPage();
            if(response.success){ 
                fadeMessageAlert(null,"操作成功！","gritter-success");
                $("#btn_save").removeAttr("disabled");
                location.reload();
            }
            else{
                fadeMessageAlert(null,response.message,"agritter-error");
                $("#btn_save").removeAttr("disabled");
            }
		}
	});
	/**
    $.ajax({
        type: "post",
        dataType: "json",
        url : "addProcessFaultMobile",
        data: {
			"vin" : $("#vin").val(),
			"area":$('#area').find("option:selected").text(),
			"license_number" : $("#license_number").val(),
			"fault_date":$("#fault_date").val(),
			"fault_mils" : $("#fault_mils").val(),
			"fault_level_id" : $("#fault_level").val(),
			"is_batch" : $("#is_batch").val(),			//故障性质
			"fault_phenomenon" : $("#fault_phenomenon").val(),
			"fault_reason" : $("#fault_reason").val(),
			"resolve_method" : $("#resolve_method").val(),

			"order_no":$("#order_no").val(),
			"order_desc":$("#order_desc").val(),
			"factory_id":$("#factory").val(),
			"bus_type" : $("#bus_type").val(),			//改成存车型ID 170911
			"response_factory" : (response_factory == "请选择")?"":response_factory,
			"workshop" : (workshop == "请选择")?"":workshop,
			"resolve_user":$("#resolve_user").val(),
			"resolve_result" : $("#resolve_result").val(),
			"resolve_date" : $("#resolve_date").val(),
			"punish" : $("#punish").val(),
			"compensation" : $("#compensation").val(),
			"memo" : $("#memo").val()

			//"customer_name" : $("#customer_name").val(),
			//"create_user" : $("#create_user").val(),
        },
        success: function(response){
            resetPage();
            if(response.success){ 
                fadeMessageAlert(null,"操作成功！","gritter-success");
                $("#btn_save").removeAttr("disabled");
                location.reload();
            }
            else{
                fadeMessageAlert(null,response.message,"agritter-error");
                $("#btn_save").removeAttr("disabled");
            }

            setTimeout(function() {
                $("#vinHint").hide().html("未输入车号");
                $("#btn_save").removeAttr("disabled");
            },60000);
        },
        error:function(){
        	alertError();
        	$("#btn_save").removeAttr("disabled");
        }
    });
    **/
}

function resetPage () {
	$("#scan_form").resetForm();
    $("#vin").removeAttr("disabled");
    $("#vin").val("");
   	$('#vin').data("vin","");
	$('#vin').data("order_id","");
	$('#vin').data("order_config_id","");
	$('#vin').data("bus_type_id","");
    $("#vin").focus();
    //$("#btn_save").hide();
    //$("#btn_clear").hide();
    
}

function fun_openCamera(index){		//拍摄处理前照片
	picType = 0;
	if(index >= photoCount){
		yspCheckIn.openCamera();
	}else{
		picType = 2;				//重新拍摄 处理前 照片
		photoMaCount = index;
		yspCheckIn.openCamera();
	}
}
function fun_openCamera2(index){	//拍摄处理后照片
	//alert("-->fun_openCamera = " + index + "|photoCount = " + photoCount);
	picType = 1;
	if(index >= photobCount){
		yspCheckIn.openCamera();
	}else{
		picType = 3;				//重新拍摄 处理后 照片
		photoMbCount = index;
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
	}else if(picType == 1){
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
	}else if(picType == 2){
		document.getElementById('img_src_' + photoMaCount).src = 'data:image/gif;base64,'+str;
		if (photoMaCount==0)pic01 = str;
		if (photoMaCount==1)pic02 = str;
		if (photoMaCount==2)pic03 = str;
		if (photoMaCount==3)pic04 = str;
		if (photoMaCount==4)pic05 = str;
	}else if(picType == 3){
		document.getElementById('img2_src_' + photoMbCount).src = 'data:image/gif;base64,'+str;
		if (photoMbCount==0)picb01 = str;
		if (photoMbCount==1)picb02 = str;
		if (photoMbCount==2)picb03 = str;
		if (photoMbCount==3)picb04 = str;
		if (photoMbCount==4)picb05 = str;
	}
	
}

function setQRData(str){
	$("#vin").val(str);
	if($('#vin').attr("disabled") == "disabled")
        return false;
	if(jQuery.trim($('#vin').val()) != ""){
		$.ajax({
			url: "getFactoryIdByVin",
			dataType: "json",
			data: {"vin":$("#vin").val()},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				//console.log(response.data.length);
				if(response.data.length == 0){
					$("#bus_type").removeAttr("disabled");
					$("#order_no").removeAttr("disabled");
					$("#factory").removeAttr("disabled");
					$("#factory").val('');
				}else{
					$("#bus_type").attr("disabled","disabled"); 
					$("#order_no").attr("disabled","disabled"); 
					$("#bus_type").val(response.data[0].bus_type_id);
					$("#order_no").val(response.data[0].order_no);
					$("#order_desc").val(response.data[0].order_describe);
					$("#factory").val(response.data[0].factory_id);
					$("#factory").attr("disabled","disabled"); 
				}
			}
		});
    }
}
