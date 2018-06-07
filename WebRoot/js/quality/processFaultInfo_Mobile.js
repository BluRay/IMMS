//var pic01 = "";var pic02 = "";var pic03 = "";var pic04 = "";var pic05 = "";
//var picb01 = "";var picb02 = "";var picb03 = "";var picb04 = "";var picb05 = "";
//var photoCount = 0;var photobCount = 0;var photoMaCount = -1;var photoMbCount = -1;		//处理前照片  处理后照片 重新拍摄照片序号
//var picType = 0;

var pre_pic_count = 1;var pic_count = 1;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect('','',"#factory","请选择",'id');
		getKeysSelect("PROCESS_FAULT_AREA", "", "#area","请选择","value");
		getFactorySelect("quality/processFault",'',"#response_factory","请选择",'name');
		getBusType();
		//getWorkshopSelect("quality/processFault",$("#response_factory :selected").text(),"","#workshop","请选择","name");
		pic01 = "";pic02 = "";pic03 = "";pic04 = "";pic05 = "";
		picb01 = "";picb02 = "";picb03 = "";picb04 = "";picb05 = "";
		
		if(getUrlKey("id") != null){
			//$(".input-medium").attr("disabled","disabled"); 
			//$(".form-control").attr("disabled","disabled"); 
			//$(".input-xlarge").attr("disabled","disabled"); 
			$.ajax({
				url: "showProcessFaultInfo",
				dataType: "json",
				data: {"id":getUrlKey("id")},
				async: false,
				error: function () {alertError();},
				success: function (response) {
					$("#id").val(response.data.id);
					$("#vin").val(response.data.vin);
					$("#area").find("option:contains('"+response.data.processFaultArea+"')").attr("selected",true);
					$("#license_number").val(response.data.license_number);
					$("#fault_date").val(response.data.fault_date);
					$("#fault_mils").val(response.data.fault_mils);
					$("#fault_level").find("option:contains('"+response.data.fault_level_id+"')").attr("selected",true);
					$("#is_batch").val(response.data.is_batch);
					$("#fault_phenomenon").val(response.data.fault_phenomenon);
					$("#fault_reason").val(response.data.fault_reason);
					$("#resolve_method").val(response.data.resolve_method);
					$("#order_no").val(response.data.order_no);
					$("#factory").val(response.data.factory_id);
					$("#bus_type").val(response.data.bus_type);
					if(response.data.response_factory != "")$("#response_factory").find("option:contains('"+response.data.response_factory+"')").attr("selected",true);
					getWorkshopSelect("quality/processFault",$("#response_factory :selected").text(),"","#workshop","请选择","name");
					if(response.data.response_workshop != "")$("#workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
					$("#resolve_user").val(response.data.resolve_user);
					$("#resolve_result").val(response.data.resolve_result);
					$("#resolve_date").val(response.data.resolve_date);
					$("#punish").val(response.data.punish);
					$("#compensation").val(response.data.compensation);
					$("#memo").val(response.data.memo);
					if(response.data.fault_pre_pics != ""){
						var pre_pics_count = response.data.fault_pre_pics.split("|").length -1;
						$("#img_src_0").attr("src","../file/upload/ProcessFault/"+response.data.id+"_A_01.jpg");
						for(var i=1;i<pre_pics_count;i++){
							var paramHtml = '<img width="100%" height="200" src="../file/upload/ProcessFault/'+response.data.id+'_A_0'+(i+1)+'.jpg" id="img_src_'+(i+1)+'"></img><br/>';
							$(paramHtml).appendTo("#photo_div");
						}
					}
					if(response.data.fault_pics != ""){
						var pre_count = response.data.fault_pics.split("|").length -1;
						console.log("-->pre_count = " + pre_count);
						$("#img2_src_0").attr("src","../file/upload/ProcessFault/"+response.data.id+"_B_01.jpg");
						for(var i=1;i<pre_count;i++){
							var paramHtml = '<img width="100%" height="200" src="../file/upload/ProcessFault/'+response.data.id+'_B_0'+(i+1)+'.jpg" id="img2_src_'+pre_count+'"></img><br/>';
							$(paramHtml).appendTo("#photo_div2");
						}
					}
					
				}
			});
		}
		//pic01="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";
	}
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
	});
	
	$("#btn_reply").click(function(){
		history.go(-1);
    })

    $("#btn_save").click(function(){
    	ajaxEnter();
    });
    
	$("#response_factory").change(function(){
		$("#workshop").empty();
		if($("#response_factory").val() !=''){
			getWorkshopSelect("quality/processFault",$("#response_factory :selected").text(),"","#workshop","请选择","name");
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
	if($("new_area").val()==''){
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
	
	$("#processFault_form").ajaxSubmit({
		url:"editProcessFaultMobile",
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

function getUrlKey(name){
	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}
