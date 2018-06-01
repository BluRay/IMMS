var queryflag=true;
$(document).ready(function(){
	initPage();
	$("#btn_scan").click(function(){
    	yspCheckIn.qrCode();
    })
    
    $(document).on('keydown','#mat_desc',function(event) {
    	if(event.keyCode == "13"){
    		if($(this).val().indexOf("|")>=0){
    			var order_desc=$('#mat_desc').val().split("|")[0] || "";
    			var order_no="";
            	if(order_desc.split(" ").length>1){
            		order_no=order_desc.split(" ")[0];
            		$("#order").val(order_no);
            	}
       			$(this).val($(this).val().split("|")[1]);
       			if( !getMatInfo(order_no,$(this).val())){
       				return false;
       			}
    			ajaxQuery();
    		}
    	}
    })
	
	$("#factory").change(function(){
		$("#workshop").empty();
		if($("#factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			getTeamSelect($("#factory :selected").text(),$("#workshop :selected").text(),
					"","","#team",null,"id");
			getAllProcessSelect();
			ajaxQuery();
		}
	});
	
	$("#workshop").change(function(){
		$("#line").empty();
		if($("#workshop").val() !=''){
			getAllLineSelect();
			getTeamSelect($("#factory :selected").text(),$("#workshop :selected").text(),
					"","","#team",null,"id");
			getAllProcessSelect();
			ajaxQuery();
		}
	});
	
	$("#line").change(function(){
		$("#process").empty();
		if($("#line").val() !=''){
			getAllProcessSelect();
			ajaxQuery();
		}
	});
	
	$("#process").change(function(){
		ajaxQuery();
	})
	
	$("#mat_desc").change(function(){
		ajaxQuery();
	})
	
})

function initPage(){
	$("#order").val("").attr("order_id","")
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	cDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-" + (eDay < 10 ? "0" + eDay : eDay);
	$("#product_date").val(cDate);
	getFactorySelect("zzj/matEnter","","#factory",null,"id");
	getOrderNoSelect("#order","#orderId",function(){
		ajaxQuery();
	});
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

function getAllProcessSelect(order_type,process_default) {
	order_type=order_type||'标准订单';
	$("#process").empty();		
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
		    	queryflag=false;
		    	fadeMessageAlert(null,"未配置生产工序！","gritter-error");
		    	return false;
		    }	 
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.id + " process='"+value.process_code+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		    $("#process").append(strs);
		}
	});
}

function ajaxQuery(){
	beforQuery();
	if(queryflag)
	$.ajax({
        type: "post",
        url: "getMatOutputData",
		dataType:"json",
		data:{
			"draw":1,
			"factory":$("#factory").val(),
			"workshop":$("#workshop :selected").text(),
			"line":$("#line :selected").text(),
			"process":$("#process :selected").text(),
			"order_id":$("#order").attr("order_id"),
			"product_date":$("#product_date").val(),
			"mat_desc":$("#mat_desc").val()
		},
		success:function(response){
			if(response.data.length==0){
				alert("未查到符合条件的数据!");
				return false;
			}
			var str = "";
			$('#faq-list-1').html("");
    		$.each(response.data,function(index,value){	
    			var detail_arr=value.detail.split(",");
    			str+='<div class="panel panel-default">'
								+'<div class="panel-heading">'
									+'<a href="#faq-1-1'+value.mat_description+'" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">'
										+'<i class="pull-right ace-icon fa fa-chevron-left" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>'
										+'<span style="color:green;font-weight: bold;"> '+value.mat_description+'：</span>&nbsp;&nbsp;产量('+(value.total_quantity||'0')
									+')</a>'
								+'</div>'
	
								+'<div class="panel-collapse collapse" id="faq-1-1'+value.mat_description+'" style="height: 0px;">'
									+'<div class="panel-body">'
											+'<div id="faq-list-nested-1'+value.mat_description+'" class="panel-group accordion-style1 accordion-style2">'	;
    							
    			$.each(detail_arr,function(i,detail){
    				var batch=detail.split("-")[0];
    				var zzj_type=detail.split("-")[1];
    				var output=detail.split("-")[2];
    				
    				str+='<div class="panel panel-default">'
					+'<div class="panel-heading">'
					+'<a href="#" onclick="forwardEdit(\''+detail+'\',\''+value.mat_description +'\')" data-parent="#faq-list-nested-1'+value.mat_description+'" data-toggle="collapse" class="accordion-toggle collapsed">'
						//+'<i class="smaller-80 middle ace-icon fa fa-plus" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;'
							+'批次：'+batch+',&nbsp;&nbsp;类别：'+zzj_type+',&nbsp;&nbsp;产量：'+output
					+'</a>'
					+'</div>'
					+'</div>';
    				
    			})
    				
    			str+='</div>'+'</div>'+'</div>'+'</div>';
    			
    			
    			
    		});
    		$('#faq-list-1').html(str);
		},
		error:function(response){
			alert(response.message);
		}
	});

}

function beforQuery(){
	var factory=$("#factory").val();
	var workshop=$("#workshop").val();
	var line=$("#line").val();
	var process=$("#process").val()
	var order_id=$("#order").attr("order_id");
	var product_date=$("#product_date").val();
	if(product_date==''){
		alert("请填写生产日期！")
		queryflag=false;
		return false;
	}else if(order_id==''||order_id==undefined){
		alert("请填写有效订单！")
		queryflag=false;
		return false;
	}else if(process==""||process==undefined){
		alert("请选择生产工序！")
		queryflag=false;
		return false;
	}
	else{
		queryflag=true;
	}
}

function setQRData(str){
	if(str.indexOf("|")>=0){
		var order_desc=str|| "";
		var order_no="";
    	if(order_desc.split(" ").length>1){
    		order_no=order_desc.split(" ")[0];
    		$("#order").val(order_no);
    	}
		$("#mat_desc").val(str.split("|")[1]);
		if(!getMatInfo(order_no,str.split("|")[1])){
			return false;
		}
		ajaxQuery();
	}
}

function forwardEdit(detail,mat_desc){
	//alert("a")
	var arr=detail.split("-");
	var batch=arr[0];
	var zzj_type=arr[1];
	var output=arr[2];
	var output_id=arr[3];
	var team=arr[4];
	var param= [
			{name:'factory_id',val:$("#factory").val()},
			{name:'workshop',val:$("#workshop :selected").text()},
			{name:'line',val:$("#line :selected").text()},
			{name:'process',val:$("#process :selected").text()},
			{name:'mat_desc',val:mat_desc},
			{name:'zzj_type',val:zzj_type},
			{name:'order_id',val:$("#order").attr("order_id")},
			{name:'order_no',val:$("#order").val()},
			{name:'team',val:team},
			{name:'batch',val:batch},
			{name:'output',val:output},
			{name:'output_id',val:output_id},
			{name:'product_date',val:$("#product_date").val()}
			
		];
	var form = $("<form id='forward_form' style='display:none' method='post'></form>");
   $(form).attr("action","matUpdate_Mobile");
   $(form).attr("accept-charset","UTF-8");
   $(form).attr("method","post");
    $.each(param,function(i,arg){
    	var input = $("<input type=''>");
        input.attr({"name":arg.name});
        input.val(arg.val);
        form.append(input);
    })
    form.append(" <input type=\"submit\" value=\"提交\" />");
    $(".page-content").append(form);  
    $(form).submit();

	/*$.post("matUpdate_Mobile", ,function(response){
		window.location.href='matUpdate_Mobile';
	});*/
}

function getMatInfo(order_no,mat_desc){
	var flag= true;
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
				alert("未查询到物料信息，请扫描有效的物料二维码！")
				flag=false;
			}else{//更新录入页面对应的数据				
				var mat=matlist[0];
				$("#order").attr("order_id",mat.order_id);
			}
		}
	});
	return flag;
}