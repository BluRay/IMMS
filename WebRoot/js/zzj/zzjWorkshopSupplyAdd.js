
$(document).ready(function(){
	initPage();
	
	$("#btnConfirm").click(function(){
		addData();
    });
	$("#btnBack").click(function(){
		window.location.href="/BMS/zzj/zzjWorkshopSupply";
    });
	$(document).on("change","#search_factory",function(){
		if($(this).val()!=''){
			getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
			getWorkshopSelect("zzj/zzjWorkshopSupply",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
			getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
		}
		if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	});
	
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	});
	$(document).on("change","#search_order_no",function(){
		$("#search_order_desc").val("");
        if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	});
	$("#prodction_qty").change(function(){
		var prodction_qty=$(this).val();
		if(prodction_qty=='' || prodction_qty=='0'){
			$(".supply_quantity").val("");
			return false;
		}
		if(!const_int_validate.test(prodction_qty) && prodction_qty!=""){
			alert("只能录入数字类型！");
			$(this).val("");
			$(this).focus();
			return false;
		}
		prodction_qty=parseInt(prodction_qty);
		$("#tableResult tbody").find("tr").each(function() {
			var tr = $(this);
			var quantity=tr.find(".quantity").text();
			if(quantity=='' || quantity=='0'){
				quantity=0;
			}
			quantity=parseFloat(quantity);
			tr.find(".supply_quantity").val(quantity*prodction_qty);
		});
	});
	$(document).on("blur",".supply_quantity",function(event) {
		var quantity=$(this).val();
		$(this).css("border-color",'');
		if(!const_float_validate.test(quantity) && quantity!=""){
			alert("只能录入数字类型！");
			$(this).val("");
			$(this).css("border-color",'red');
			$(this).focus();
			return false;
		}
		var demand_quantity=$(this).parents("tr").find(".demand_quantity").text();
		var received_quantity=$(this).parents("tr").find(".received_quantity").text();
		received_quantity=(received_quantity!='' ? received_quantity : 0);
		var check_quantity=parseFloat(demand_quantity)-parseFloat(received_quantity);
		if(parseFloat(quantity)-check_quantity>0){
			alert("本次供货数量应不大于需求数量与已累计收货数量之差:"+check_quantity);
			$(this).val("");
			$(this).css("border-color",'red');
			$(this).focus();
			return false;
		}
	});
	$("#btnSave").click(function(){
		 save();
    });
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
});
function addData(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择工厂");
		return false;
	}
	var use_workshop=$("#search_use_workshop :selected").text()=="全部" ? '' : $("#search_use_workshop :selected").text();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	var dt=$("#tableResult").DataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-150,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"没查找到符合条件的记录",					     
			infoEmpty:"",
			zeroRecords:""
		},
		ajax:function (data, callback, settings) {
			var param ={
				"order_id":$("#search_order_no").attr("order_id"),
	        	"factory_id":$("#search_factory").val(),
	        	"workshop_name":$("#search_workshop :selected").text(),
	        	"line_name":$("#search_line :selected").text(),
	        	"mat_description":$("#search_mat_desc").val(),
	        	"zzj_type":$("#search_zzj_type").val(),
	        	"use_workshop":use_workshop
			};

            $.ajax({
                type: "post",
                url: "getWorkshopSupplyAddByMap",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //封装返回数据
                    var returnData = {};
                    returnData.data = result.data;//返回的数据列表
                    callback(returnData);
                }
            });
		},
		columns: [
            {"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","class":"center","data": "zzj_type","render":function(){
            	return "<input type='checkbox' class='checkbox'/>";
            }},
            {"title":"生产车间","class":"center workshop_name","data": "workshop_name"},
            {"title":"生产线别","class":"center line_name","data": "line_name"},
            {"title":"自制件类型","class":"center zzj_type","data": "zzj_type"},
            {"title":"物料描述","class":"center mat_description","data":"mat_description","defaultContent": ""},		            
            {"title":"材料/规格","class":"center specification","data":"specification","defaultContent": ""},
            {"title":"单位","class":"center","data":"unit","defaultContent": ""},
            {"title":"单车用量","class":"center quantity","data":"quantity","defaultContent": ""},
            {"title":"使用车间","class":"center receiving_workshop","data":"use_workshop","defaultContent": ""},
            {"title":"下料尺寸","class":"center filling_size","data": "filling_size","defaultContent": ""},
            {"title":"需求数量","class":"center demand_quantity","data":"demand_quantity","defaultContent": ""},		            
            {"title":"本次供货数量","class":"center","data":"","render":function(data,type,row){
            	return "<input class='supply_quantity' style='width:80px;height:28px;' type='text'>"+
            	"<input type='hidden' value='"+row.order_id+"' class='order_id'>"+
            	"<input type='hidden' value='"+row.factory_id+"' class='factory_id'>"+
            	"<input type='hidden' value='"+row.factory_name+"' class='factory_name'>";
            }},		            
            {"title":"累计供货数量","class":"center received_quantity","data":"received_quantity","defaultContent": ""}          		           
          ],
	});
}

function initPage(){
	getFactorySelect("zzj/zzjWorkshopSupply","","#search_factory",null,"id")
	getOrderNoSelect("#search_order_no","#orderId");
	getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
	getWorkshopSelect("zzj/zzjWorkshopSupply",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
//	getWorkshopSelect("zzj/zzjWorkshopSupply",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
//	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'name');
}

function save(){
	var length=$("#tableResult tbody").find("tr").length;
	if(length==0){
		alert("没有可保存的数据");
		return false;
	}
	var datalist = [];
	var saveflag=true;
	var message="";
	$("#tableResult tbody").find("tr").each(function() {
		var tr = $(this);
		if(tr.find(".checkbox").is(":checked")){
			var mat_description=tr.find(".mat_description").text();
			var zzj_type=tr.find(".zzj_type").text();
			var quantity=tr.find(".supply_quantity").val();
			if(quantity==''){
				message="请输入数量";
				tr.find(".supply_quantity").css("border-color","red");
			}
			var factory_name=tr.find(".factory_name").val();
			var receiving_workshop=tr.find(".receiving_workshop").text();
			var delivery_workshop=tr.find(".workshop_name").text();
			var line_name=tr.find(".line_name").text();
			var order_id=tr.find(".order_id").val();
			var factory_id=tr.find(".factory_id").val();
			var data = {};
			data.mat_description=mat_description;
			data.zzj_type=zzj_type,
			data.quantity=quantity;
			data.factory_name=factory_name;
			data.delivery_workshop=delivery_workshop;
			data.line_name=line_name;
			data.receiving_workshop=receiving_workshop;
			data.order_id=order_id;
			data.factory_id=factory_id;
			data.business_type='1';
			datalist.push(data);
		}
	});
	if(datalist.length==0){
		$.gritter.add({
			title: '提示：',
			text: "<h5>没有可保存的数据</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}
	if(message!=''){
		$.gritter.add({
			title: '提示：',
			text: "<h5>"+message+"</h5>",
			class_name: 'gritter-info'
		});
		return false;
	}

	$.ajax({
		type: "post",
        url: "saveWorkshopSupplyByBatch",
        cache: true,  //禁用缓存
        data: {
        	"datalist" : JSON.stringify(datalist)
        },  
        dataType: "json",
        success: function (result) {
        	if(result.success){
        		$("#tableResult tbody").html("");
        		$.gritter.add({
        			title: '提示：',
        			text: "<h5>保存成功</h5>",
        			class_name: 'gritter-info'
        		});
        	}else{
        		$.gritter.add({
        			title: '提示：',
        			text: "<h5>保存失败</h5>",
        			class_name: 'gritter-info'
        		});
        	}
        }
	});
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
			"factory" : $("#search_factory").val(),
			"order_no":$("#search_order_no").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_zzj_type","全部", "name");	
		}	
	});
}
//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}