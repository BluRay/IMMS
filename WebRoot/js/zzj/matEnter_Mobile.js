var saveflag=true;
$(document).ready(function(){
	initPage();
	
	$("#btn_scan").click(function(){
    	yspCheckIn.qrCode();
    })
    
	$("#factory").change(function(){
		$("#workshop").empty();
		if($("#factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			getTeamSelect($("#factory :selected").text(),$("#workshop :selected").text(),
					"","","#team",null,"id");
			getAllProcessSelect();
		}
	});
	
	$("#workshop").change(function(){
		$("#line").empty();
		if($("#workshop").val() !=''){
			getAllLineSelect();
			getTeamSelect($("#factory :selected").text(),$("#workshop :selected").text(),
					"","","#team",null,"id");
			getAllProcessSelect();
		}
	});
	$("#line").change(function(){
		$("#process").empty();
		if($("#line").val() !=''){
			getAllProcessSelect();
		}
	});
	
	//扫描后截取订单信息
    $('#mat_desc').bind('keydown', function(event) {
    	saveflag=true;
        if($(this).attr("disabled") == "disabled")
            return false;      
        if (event.keyCode == "13"){	
            if(jQuery.trim($('#mat_desc').val()) != ""){
            	var order_desc=$('#mat_desc').val().split("|")[0] || "";
            	var mat_desc=$('#mat_desc').val().split("|")[1] || "";
            	$(this).val(mat_desc);
            	var order_no="";
            	if(order_desc.split(" ").length>1){
            		order_no=order_desc.split(" ")[0];
            		$("#order").val(order_desc)
            	}
            	//查询物料明细
            	if(order_no!=""){
            		getMatInfo(order_no,mat_desc);
            	}else{
            		saveflag=false;
            		alert("请扫描物料二维码！")
            		return false;
            	}
                
            }
            return false;
        }  
    });
	
	//重置
    $("#btn_clear").click(function(){
    	clear();
    	$("#mat_desc").val("");
    	$("#product_num").val("");
    	$("#product_date").val("");
    	$("#memo").val("");
    })
    
/*	$("#process").change(function(){
		$("#processname").val('');
		var process_code=$("#process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#processname").html(process_name);
	});*/
	
    /**
     * 保存
     */
    $("#btn_save").click(function(){
    	var val_flag=true;
    	if($("#mat_desc").val().trim().length==0){
    		val_flag=false;
    		alert("请扫描物料二维码!");
    		return false;
    	}
    	if($("#zzj_type").val().trim().length==0){
    		val_flag=false
	   		alert("请选择自制件类别!");
	   		return false;
    	}
    	if($("#batch").val().trim().length==0){
    		val_flag=false
	   		alert("请选择生产批次!");
	   		return false;
    	}
    	if($("#product_num").val().trim().length==0){
    		val_flag=false
	   		alert("请填写生产数量!");
	   		return false;
    	}
    	if(!const_int_validate.test($("#product_num").val())){
    		val_flag=false
	   		alert("生产数量只能为整数!");
	   		return false;
    	}
    	if($("#product_date").val().trim().length==0){
    		val_flag=false
	   		alert("请填写生产日期!");
	   		return false;
    	}
    	if($("#process").val().trim().length==0){
    		val_flag=false
	   		alert("请选择生产工序!");
	   		return false;
    	}
    	if($("#team").val().trim().length==0){
    		val_flag=false
	   		alert("请选择生产班组!");
	   		return false;
    	}
    	
    	if(saveflag&&val_flag){
    		ajaxSave();
    	}
    	
    })
    
})

function initPage(){
	clear();
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	cDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-" + (eDay < 10 ? "0" + eDay : eDay);
	$("#product_date").val(cDate);
	getFactorySelect("zzj/matEnter","","#factory",null,"id");
}

function getFactorySelect() {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {
			function_url:'zzj/matEnter'
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response.data, "", "#factory");
			getAllWorkshopSelect();
			getAllLineSelect();
			getAllProcessSelect();
			getTeamSelect($("#factory :selected").text(),$("#workshop :selected").text(),
					"","","#team",null,"id");
		}
	});
}

function getAllWorkshopSelect() {
	$("#workshop").empty();
	$.ajax({
		url : "/BMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {
				factory:$("#factory :selected").text(),
				org_kind:'1',
				function_url:'zzj/matEnter'
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs ="";
			
			$("#workshop").html("");
			$.each(response.data, function(index, value) {
				strs += "<option value=" + value.id+(value.org_id?(" org_id="+value.org_id):"") +
				" customer_no_flag='"+value.customer_no_flag+"' "+
				">" + value.name
				+ "</option>";
			});
			$("#workshop").append(strs);
		}
	});
}

function getAllLineSelect() {
	$("#line").empty();
	$.ajax({
		url : "/BMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:$("#factory :selected").text(),
				workshop:$("#workshop :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			line_selects_data=response.data;
			getSelects(response.data, "", "#line",null,"name"); 
		}
	});
}

function getMatInfo(order_no,mat_desc){
	
	$.ajax({
		url : "getMatInfo",
		dataType : "json",
		data : {
				factory:$("#factory :selected").text(),
				workshop:$("#workshop :selected").text(),
				line:$("#line :selected").text(),
				order_no:order_no,
				mat_desc:mat_desc
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var matlist=response.data;
			if(matlist.length==0){
				$("#order").val("")
				saveflag=false;
				alert("未查询到物料信息，请扫描有效的物料二维码！")
				return false;
			}else{//更新录入页面对应的数据
				if(matlist.length>1){
					$("#order").val("")
					saveflag=false;
					alert("该物料明细存在重复记录，请核实数据后再录入产量！");
					return false;
				}
				var mat=matlist[0];
				$("#order").attr("order_id",mat.order_id);
				creatOptions(mat.zzj_type.split(","),"#zzj_type");
				creatOptions(mat.specification.split(","),"#specification");
				creatOptions(mat.filling_size.split(","),"#filling_size");
				creatOptions(mat.batch.split(","),"#batch");
				//creatOptions(mat.process.split(","),"#process");
				//creatOptions(mat.team.split(","),"#team");
				
			}
		}
	});
}

function clear(){
	saveflag=true;
	$("#zzj_type").html("");
	$("#specification").html("");
	$("#filling_size").html("");
	$("#batch").html("");
	//$("#process").val("");
	//$("#team").val("");
	$("#order").val("").attr("order_id","");
	$("#processname").html("");
}

function creatOptions(data_list,elementId){
	$(elementId).html("");
	var options="<option value=''>请选择</option>";
	if(data_list.length==1){
		options="";
	}
	$.each(data_list,function(i,data){
		options+="<option value='"+data+"'>"+data+"</option>";
	})
	$(elementId).html(options)
	
}

function setQRData(str){
	if(jQuery.trim(str) != ""){
		saveflag=true;
    	var order_desc=str.split("|")[0] || "";
    	var mat_desc=str.split("|")[1] || "";
    	$("#mat_desc").val(mat_desc);
    	var order_no="";
    	if(order_desc.split(" ").length>1){
    		order_no=order_desc.split(" ")[0];
    		$("#order").val(order_desc)
    	}
    	//查询物料明细
    	if(order_no!=""){
    		getMatInfo(order_no,mat_desc);
    	}else{
    		saveflag=false;
    		alert("请扫描物料二维码！")
    		return false;
    	}
        
    }
}

function getAllProcessSelect(order_type,process_default) {
	order_type=order_type||'标准订单';
	$("#process").empty();		
	$("#processname").val('');
	$.ajax({
		url : "/BMS/common/getProcessMonitorSelect",
		dataType : "json",
		data : {
			factory:$("#factory :selected").text(),
			workshop:$("#workshop :selected").text(),
			line:$("#line").val(),
			order_type:order_type
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
		    $("#process").html("");
		    var process_id_default="";
		    var process_name_default="";
		    if(response.data.length==0){
		    	saveflag=false;
		    	fadeMessageAlert(null,"未配置生产工序！","gritter-error");
		    	return false;
		    }	 
		    $.each(response.data, function(index, value) {
		    /*	if (process_default == value.process_name) {
		    		process_id_default=value.id;
		    		process_name_default=value.process_name;
		    	}	*/	
		    	strs += "<option value=" + value.process_code + " process='"+value.process_name+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		  //  alert(process_id_default);
		    $("#process").append(strs);
		   // $("#process").val(process_id_default+"");
		   // $("#processname").html(process_name_default);
		}
	});
}

function ajaxSave(){
	$.ajax({
		url : "enterMatOutput",
		dataType : "json",
		data : {
			order_id:$("#order").attr("order_id"),
			factory_id:$("#factory").val(),
			factory:$("#factory :selected").text(),
			workshop:$("#workshop :selected").text(),
			line:$("#line").val(),
			process:$("#process :selected").attr("process"),
			zzj_type:$("#zzj_type").val(),
			mat_desc:$("#mat_desc").val(),
			batch:$("#batch").val(),
			team:$("#team :selected").text(),
			quantity:$("#product_num").val(),
			product_date:$("#product_date").val(),
			memo:$("#memo").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success:function(response){
			if(response.success){
				clear();
			}
			alert(response.message);	
		}
	})
}
