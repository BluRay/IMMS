var queryflag=true;
$(document).ready(function(){
	initPage();
	$("#btn_scan").click(function(){
    	yspCheckIn.qrCode();
    });
    
//    $('#mat_desc').bind('keydown', function(event) {
//    	if(event.keyCode == "13"){
//    		if($(this).val().indexOf("?")>=0){
//    			$(this).val($(this).val().split("?")[1])
//    			ajaxQuery();
//    		}
//    	}
//    });
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
            		$("#order").val(order_desc);
            	}
            	//查询物料明细
            	if(order_no!=""){
            		getMatInfo(order_no,mat_desc);
            		ajaxQuery();
            	}else{
            		saveflag=false;
            		alert("请扫描物料二维码！");
            		return false;
            	}
                
            }
            return false;
        }  
    });
	
	$("#factory").change(function(){
		$("#workshop").empty();
		if($("#factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			ajaxQuery();
		}
	});
	
	$("#workshop").change(function(){
		$("#line").empty();
		if($("#workshop").val() !=''){
			getAllLineSelect();
			ajaxQuery();
		}
	});
	
	$("#line").change(function(){
		$("#process").empty();
		if($("#line").val() !=''){
			ajaxQuery();
		}
	});
	
//	$("#mat_desc").change(function(){
//		if($(this).val() !=''){
//			ajaxQuery();
//		}
//	});

//	$('.scrollable').each(function () {
//		var $this = $(this);
//		$(this).ace_scroll({
//			size: $this.data('size') || 100,
//		});
//	});
//	$('.scrollable-horizontal').each(function () {
//
//		var $this = $(this);
//		$(this).ace_scroll(
//		  {
//			horizontal: true,
//			styleClass: 'scroll-top',
//			size: $this.data('size') || 100,
//			mouseWheelLock: true
//		  }
//		).css({'padding-top': 12});
//	});
//	
//	$(window).on('resize.scroll_reset', function() {
//		$('.scrollable-horizontal').ace_scroll('reset');
//	});
});

function initPage(){
	$("#order").val("").attr("order_id","");
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	cDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-" + (eDay < 10 ? "0" + eDay : eDay);
	$("#business_date").val(cDate);
	getFactorySelect("zzj/zzjWorkshopSupply","","#factory",null,"id");
	getOrderNoSelect("#order","#orderId",function(){
		ajaxQuery();
	});
}

function getFactorySelect() {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {
			function_url:'zzj/zzjWorkshopSupply'
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response.data, "", "#factory");
			getAllWorkshopSelect();
			getAllLineSelect();
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
				function_url:'zzj/zzjWorkshopSupply'
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

function ajaxQuery(){
	beforQuery();
	if(queryflag)
	$.ajax({
        type: "post",
        url: "getWorkshopSupplyList",
		dataType:"json",
		data:{
			"factory_id":$("#factory").val(),
			"delivery_workshop":$("#workshop :selected").text(),
			"line_name":$("#line :selected").text(),
			"order_id":$("#order").attr("order_id"),
			"business_date":$("#business_date").val(),
			"mat_description":$("#mat_desc").val()
		},
		success:function(response){
			var str = "";
			$('.table-body').remove();
    		$.each(response.data,function(index,value){	
    			var tr = $("<div class='table-tr table-body' id='tr-"+(index+1)+"'></div>");
    			$("<div class='table-td'></div>").html(value.mat_description).appendTo(tr);
    			$("<div class='table-td'></div>").html("<a onclick='forwardEdit("+JSON.stringify(value)+")' title='处理'>"+value.receiving_quantity+"</a>").appendTo(tr);
    			$("#tr-"+index).after(tr);
    		});
		},
		error:function(response){
			alert(response.message);
		}
	});

}

function beforQuery(){
	var factory=$("#factory").val();
	var workshop=$("#workshop").val();
	var order_id=$("#order").attr("order_id");
	var business_date=$("#business_date").val();
	if(business_date==''){
		alert("请填写供应日期！")
		queryflag=false;
		return false;
	}else if(order_id==''||order_id==undefined){
		alert("请填写有效订单！")
		queryflag=false;
		return false;
	}else{
		queryflag=true;
	}
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
//				creatOptions(mat.zzj_type.split(","),"#zzj_type");
//				creatOptions(mat.batch.split(","),"#batch");
			}
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
function setQRData(str){
	if(jQuery.trim(str) != ""){
		saveflag=true;
    	var order_desc=str.split("|")[0] || "";
    	var mat_desc=str.split("|")[1] || "";
    	$("#mat_desc").val(mat_desc);
    	var order_no="";
    	if(order_desc.split(" ").length>1){
    		order_no=order_desc.split(" ")[0];
    		$("#order").val(order_desc);
    	}
    	//查询物料明细
    	if(order_no!=""){
    		getMatInfo(order_no,mat_desc);
    		ajaxQuery();
    	}else{
    		saveflag=false;
    		alert("请扫描物料二维码！")
    		return false;
    	}
        
    }
}

function forwardEdit(value){
	//alert(value.mat_description+":"+value.received_quantity+":"+value.id);
	var param= [
		    {name:'mat_description',val:value.mat_description},
		    {name:'factory_name',val:value.factory_name},
		    {name:'delivery_workshop',val:value.delivery_workshop},
		    {name:'line_name',val:value.line_name},
			{name:'receiving_workshop',val:value.receiving_workshop},
			{name:'order_desc',val:value.order_desc},
			{name:'received_quantity',val:value.received_quantity},
			{name:'zzj_type',val:value.zzj_type},
			{name:'demand_quantity',val:value.demand_quantity},
			{name:'quantity',val:value.receiving_quantity},
			{name:'id',val:value.id},
			{name:'business_date',val:value.business_date}
		];
	var form = $("<form id='forward_form'  method='post'></form>");
   $(form).attr("action","/BMS/zzj/zzjWorkshopSupplyUpdate_Mobile");
   $(form).attr("accept-charset","UTF-8");
   $(form).attr("method","post");
    $.each(param,function(i,arg){
    	var input = $("<input type='hidden'>");
        input.attr({"name":arg.name});
        input.val(arg.val);
        form.append(input);
    })
    $(document.body).append(form);  
    $("#form").attr("enctype","application/x-www-form-urlencoded");
    $("#form").attr("encoding","application/x-www-form-urlencoded"); 
    $("#form").attr("onsubmit","document.charset='UTF-8';"); 
    $(form).submit();

	/*$.post("matUpdate_Mobile", ,function(response){
		window.location.href='matUpdate_Mobile';
	});*/
}