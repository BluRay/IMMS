var saveflag=true;
$(document).ready(function(){
	initPage();
	$("#btn_scan").click(function(){
		yspCheckIn.qrCode();
    });
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#order_desc").val(order_desc);
	});
	$(document).on("change","#search_factory",function(){
		if($(this).val()!=''){
			getWorkshopSelect("",$("#factory :selected").text(),"","#receiving_workshop",null,"id");
			getWorkshopSelect("zzj/zzjWorkshopSupply",$("#factory :selected").text(),"","#workshop",null,"id");
			getLineSelect($("#factory :selected").text(),$("#workshop :selected").text(),'','#line',null,'id');
		}
		if($("#order").val().trim().length>0 && $("#factory").val()!=''){
			getZzjTypes();
		}
	});
	//车间切换
	$("#workshop").change(function(){
		getLineSelect($("#factory :selected").text(),$("#workshop :selected").text(),'','#line',null,'id');
	});
	$(document).on("change","#zzj_type",function(){
		var receiving_workshop=$(this).attr("receiving_workshop");
		var received_quantity=$(this).attr("received_quantity");
		$("#receiving_workshop").val(receiving_workshop);
		$("#received_quantity").val(received_quantity);
	});

	//扫描后截取订单信息
    $('#mat_desc').bind('keydown', function(event) {
    	saveflag=true;    
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
            		addData();
            	}else{
            		saveflag=false;
            		alert("请扫描物料二维码！");
            		return false;
            	}
            }
            return false;
        }  
    });
    $("#btn_save").click(function(){
    	if($("#mat_desc").val()==''){
    		saveflag=false
	   		alert("请扫描物料描述!");
	   		return false;
    	}
    	if($("#order").val()==''){
    		saveflag=false
	   		alert("请输入订单!");
	   		return false;
    	}
        var quantity=$("#quantity").val();
    	if(quantity.trim().length==0){
    		saveflag=false
	   		alert("请填写供应数量!");
	   		return false;
    	}
    	if(!const_int_validate.test(quantity)){
    		saveflag=false
	   		alert("供应数量只能为整数!");
	   		return false;
    	}
    	if($("#business_date").val().trim().length==0){
    		saveflag=false
	   		alert("请填写供应日期!");
	   		return false;
    	}
    	var demand_quantity=$("#demand_quantity").val();
    	var received_quantity=$("#received_quantity").val();
    	received_quantity=(received_quantity!='' ? received_quantity : 0);
    	var check_quantity=parseFloat(demand_quantity)-parseFloat(received_quantity);
    	if(parseFloat(quantity)-check_quantity>0){
    		alert("本次供货数量不大于:"+check_quantity);
    		$("#quantity").css("border-color",'red');
    		$("#quantity").focus();
    		return false;
    	}
    	if(saveflag){
    		ajaxSave();
    	}
    });
//    $('.scrollable').each(function () {
//		var $this = $(this);
//		$(this).ace_scroll({
//			size: $this.data('size') || 100,
//			//styleClass: 'scroll-left scroll-margin scroll-thin scroll-dark scroll-light no-track scroll-visible'
//		});
//	});
//	$('.scrollable-horizontal').each(function () {
//
//		var $this = $(this);
//		$(this).ace_scroll(
//		  {
//			horizontal: true,
//			styleClass: 'scroll-top',//show the scrollbars on top(default is bottom)
//			size: $this.data('size') || 100,
//			mouseWheelLock: true
//		  }
//		).css({'padding-top': 12});
//	});
//	
//	$(window).on('resize.scroll_reset', function() {
//		$('.scrollable-horizontal').ace_scroll('reset');
//	});
})

function initPage(){
	$("#order").val("").attr("order_id","");
	getFactorySelect("zzj/zzjWorkshopSupply","","#factory",null,"id");
	getWorkshopSelect("zzj/zzjWorkshopSupply",$("#factory :selected").text(),"","#receiving_workshop",null,"id");
	getWorkshopSelect("zzj/zzjWorkshopSupply",$("#factory :selected").text(),"","#workshop",null,"id");
	getLineSelect($("#factory :selected").text(),$("#workshop :selected").text(),'','#line',null,'name');
	getOrderNoSelect("#order","#orderId");
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	cDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-" + (eDay < 10 ? "0" + eDay : eDay);
	$("#business_date").val(cDate);
}

function ajaxSave(){
	$.ajax({
		url : "saveWorkshopSupply",
		dataType : "json",
		data : {
			"order_id":$("#order").attr("order_id"),
			"factory_id":$("#factory").val(),
			"factory_name":$("#factory :selected").text(),
			"delivery_workshop":$("#workshop :selected").text(),
			"line_name":$("#line :selected").text(),
			"mat_description":$("#mat_desc").val(),
			"zzj_type":$("#zzj_type").val(),
			"receiving_workshop":$("#receiving_workshop").val(),
			"business_type":'1',
			"quantity":$("#quantity").val(),
			"business_date":$("#business_date").val()
		},
		async : false,
		error : function(response) {
			alert("保存失败");
		},
		success:function(response){
			if(response.success){
				alert("保存成功");
				clear();
			}else{
				alert("保存失败");
			}
		}
	})
}
function clear(){
	$("#order").val("");
	$("#mat_desc").val("");
	$("#quantity").val("");
	$("#business_date").val("");
	$("#demand_quantity").val("");
	$("#received_quantity").val("");
}
function addData(){
	var mat_description=$("#mat_desc").val();
	var order_id=$("#order").attr("order_id");
	var factory_id=$("#factory").val();
	if(order_id==''){
		alert("请输入订单编号");
		return false;
	}
	if(factory_id==''){
		alert("请选择工厂");
		return false;
	}
	if(mat_description==''){
		alert("请输入物料描述");
		return false;
	}
    $.ajax({
        type: "post",
        url: "getWorkshopSupplyAddByMap",
        cache: true,  //禁用缓存
        data: {
			"order_id":order_id,
        	"factory_id":factory_id,
        	"mat_description":mat_description,
        	"workshop_name":$("#workshop :selected").text(),
        	"line_name":$("#line :selected").text(),
		},  //传入组装的参数
        dataType: "json",
        success: function (result) {
            var data=result.data;
            var zzjTypeOptStr="";
            $.each(data,function(index,val){
            	zzjTypeOptStr+="<option value='"+val.zzj_type+"' " +
            			"received_quantity='"+val.received_quantity+"' " +
            			"demand_quantity='"+val.demand_quantity+"'" +
            					"receiving_workshop='"+val.receiving_workshop+"'>"+val.zzj_type+"</option>";
                if(index==0){
                	$("#demand_quantity").val(val.demand_quantity);
                	$("#received_quantity").val(val.received_quantity);
                	$("#receiving_workshop").html("<option value='"+val.use_workshop+"'>"+val.use_workshop+"</option>");
                }
            });
            $("#zzj_type").html(zzjTypeOptStr);
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
			alert(response.message);
		},
		success : function(response) {
			var matlist=response.data;
			if(matlist.length==0){
				$("#order").val("");
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
    		addData();
    	}else{
    		saveflag=false;
    		alert("请扫描物料二维码！");
    		return false;
    	}
        
    }
}

/**
 * 自制件模块获取自制件类别下拉选项
 */
function getZzjTypes(selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjTypeList",
		data : {
			"factory" : $("#factory").val(),
			"order_no":$("#order").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#zzj_type",null, "name");	
		}	
	});
}
