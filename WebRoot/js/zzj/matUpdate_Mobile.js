var saveflag=true;
$(document).ready(function(){
	initPage();
	
	$("#process").change(function(){
		$("#processname").val('');
		var process_code=$("#process :selected").text();
		var process_name=$(this).find("option:contains('"+process_code+"')").attr("process");
		$("#processname").html(process_name);
	});
	
    /**
     * 保存
     */
    $("#btn_save").click(function(){
    	var val_flag=true;
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
    
    $("#btn_delete").click(function(){
    	$.ajax({
    		url : "matDelete",
    		dataType : "json",
    		method:"post",
    		data : {
    			output_id:$("#output_id").val(),
    			order_id:$("#order").attr("order_id"),
    			factory_id:$("#factory").val(),
    			workshop:$("#workshop :selected").text(),
    			line:$("#line").val(),
    			batch:$("#batch").val()
    		},
    		async : false,
    		error : function(response) {
    			alert(response.message)
    		},
    		success : function(response) {
    			alert(response.message);
    			if(response.success){
    				window.history.go(-1);
    			}
    			
/*    			window.location.href="matQuery_Mobile?order_no="+$("#order_prepage").val()+
    			"&order_id="+$("#order").attr("order_id")+"&mat_desc="+$("#mat_desc").val()
    			*/
    		}
    	});
    })
    
})

function initPage(){
	var order_no=$("#order_prepage").val();
	var mat_desc=$("#mat_desc").val();
	getFactorySelect();
	
	getMatInfo(order_no,mat_desc);
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
			getSelects_noall(response.data, $("#factory_prepage").val(), "#factory");
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
			var workshop_default=$("#workshop_prepage").val();
			$("#workshop").html("");
			$.each(response.data, function(index, value) {
				var selected="";
				if(value.name==workshop_default){
					selected="selected"
				}
				strs += "<option value=" + value.id+(value.org_id?(" org_id="+value.org_id):"") +selected+
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
			getSelects(response.data, $("#line_prepage").val(), "#line",null,"name"); 
		}
	});
}

function creatOptions(data_list,elementId){
	$(elementId).html("");
	var options="";
	$.each(data_list,function(i,data){
		options+="<option value='"+data+"'>"+data+"</option>";
	})
	$(elementId).html(options)
	
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
		    var process_code_default=$("#process_prepage").val();
		    if(response.data.length==0){
		    	saveflag=false;
		    	fadeMessageAlert(null,"未配置生产工序！","gritter-error");
		    	return false;
		    }	 
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.process_name + " process='"+value.process_code+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		  //  alert(process_id_default);
		    $("#process").append(strs);
		    $("#process").val(process_code_default);
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
				$("#order").val(order_no+" "+mat.order_desc);
				$("#order").attr("order_id",mat.order_id);
				creatOptions(mat.zzj_type.split(","),"#zzj_type");
				$("#zzj_type").val($("#zzj_type_prepage").val())
				creatOptions(mat.specification.split(","),"#specification");
				creatOptions(mat.filling_size.split(","),"#filling_size");
				creatOptions(mat.batch.split(","),"#batch");
				$("#batch").val($("#batch_prepage").val())
				//creatOptions(mat.process.split(","),"#process");
				//creatOptions(mat.team.split(","),"#team");
				
			}
		}
	});
}
function ajaxSave(){
	$.ajax({
		url : "enterMatOutput",
		dataType : "json",
		data : {
			output_id:$("#output_id").val(),
			order_id:$("#order").attr("order_id"),
			factory_id:$("#factory").val(),
			factory:$("#factory :selected").text(),
			workshop:$("#workshop :selected").text(),
			line:$("#line").val(),
			process:$("#process :selected").text(),
			zzj_type:$("#zzj_type").val(),
			mat_desc:$("#mat_desc").val(),
			batch:$("#batch").val(),
			batch_old:$("#batch_prepage").val(),
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
			alert(response.message);	
			window.location.href="matQuery_Mobile?order_no="+$("#order_prepage").val()+
			"&order_id="+$("#order").attr("order_id")+"&mat_desc="+$("#mat_desc").val();
		}
	})
}
