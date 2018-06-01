var pageSize=1;
var matainPlan = 0;

var lastBatch=0;
var last_production_qty = 0;

$(document).ready(function(){
	getOrderNoSelect("#search_order_no","#orderId",fn_cb_getOrderInfo);
	getFactorySelect("/BMS/zzj/zzjPlanManage",'',"#search_factory",null,'id');
	getWorkshopSelect("/BMS/zzj/zzjPlanManage",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line','全部','id');
	//工厂切换
	$("#search_factory").on("change",function(){
		getWorkshopSelect("/BMS/zzj/zzjPlanManage",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line','全部','id');
	}); 
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line','全部','id');
		ajaxQuery();
	});
	
	//线别切换 
	$("#search_line").change(function(){
		ajaxQuery();
	});
	
	$("#search_batch").change(function(){
		ajaxQuery();
	});
	
	$("#ajaxQuery").on("click",function(){
		ajaxQuery();
	}); 
	
	$(document).on("click","#btnAdd",function(){
		getFactorySelect("/BMS/zzj/zzjPlanManage",'',"#add_factory",null,'id');
		getWorkshopSelect("/BMS/zzj/zzjPlanManage",$("#add_factory :selected").text(),"","#add_workshop",null,"id");
		getLineSelect($("#add_factory :selected").text(),$("#add_workshop :selected").text(),'','#add_line',null,'id');
		//$("#newPlanAmount").focus();
		getOrderNoSelect("#add_order_no","#orderId",fn_cb_getOrderInfo_add,"",$("#add_factory"));
		var dialog = $( "#dialog-add" ).removeClass('hide').dialog({
			width:600,
			height:500,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>新增下料计划</h4></div>",
			title_html: true,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				},
				{
					text: "确定",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						ajaxAdd();
						//$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	});
	
});


function fn_cb_getOrderInfo(order){
	ajaxQuery();
	$("#searchOrderInfo").html(order.name+" "+order.busType+order.orderQty + "台");
}

function fn_cb_getOrderInfo_add(order){
	$("#addOrderInfo").html(order.name+" "+order.busType+order.orderQty + "台");
}

function checkValue(input,type){

	if(!const_int_validate.test($(input).val())){
		alert("请输入正整数！");
		$(input).val("");
		return false;
	}

	if(type=='edit_quantity'){
		var inputValue = Number($(input).val());
		var production_qty = Number($("#production_qty").val());
		if(Number(matainPlan+inputValue)>Number(production_qty)){
			alert("计划数量不能大于订单工厂生产数量，本次输入的计划数必须小于等于："+(production_qty-matainPlan));
			$(input).val("");
			return false;
		}
	}
	if(type=='add_quantity'||type=='add_batch'){
		matainPlan=0;
		lastBatch=0;
		last_production_qty = 0;
		//判断订单、工厂、车间、线别是否为空
		var order_id = $("#add_order_no").attr("order_id")||'';
		var order_no = $("#add_order_no").val();
		var factory_id = $("#add_factory").val()||'';
		var factory_name = $("#add_factory").find("option:selected").text()||'';
		var workshop_name = $("#add_workshop").find("option:selected").text()||'';
		var line_name = $("#add_line").find("option:selected").text()||'';
		var batch = $("#add_batch").val()||'';
		var quantity = $("#add_quantity").val()||'';
		
		if(undefined == order_id || order_id==''){
			alert("请选择订单！");
			return false;
		}
		if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
			alert("请选择生产工厂！");
			return false;
		}
		if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
			alert("请选择车间！");
			return false;
		}
		if(undefined == line_name || line_name=='' ||line_name=='请选择'){
			alert("请选择线别！");
			return false;
		}
		
		$.ajax({
			url:"queryZzjPlan",
			type: "post",
			dataType:"json",
			async:false,
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name
			},
			success:function(response){
				if(response.success){	
					var datalist=response.data.zzjPlan;
					if(undefined !=datalist&&datalist.length>0)
					for(var i = 0; i < datalist.length; i++) {
						last_production_qty = Number(datalist[i]['production_qty']);
						matainPlan = matainPlan+Number(datalist[i]['quantity']);
						if(lastBatch<Number(datalist[i]['batch'].substr(1,1))){
							lastBatch = Number(datalist[i]['batch'].substr(1,1));
						}
					}
				}
			}
		});
		
		if(last_production_qty==0){
			//未查询到订单工厂生产数量继续查询
			$.ajax({
				url:"queryFactoryOrderQuantity",
				type: "post",
				dataType:"json",
				async:false,
				data:{
					"order_id":order_id,
					"factory_id":factory_id
				},
				success:function(response){
					if(response.success){	
						var production_qty=response.data.production_qty;
						if(undefined !=production_qty){
							last_production_qty = Number(production_qty);
						}
				
					}
				}
			});
		}
	}
	
	if(type=='add_quantity'){
		var inputValue = Number($(input).val());
		if(Number(matainPlan+inputValue)>Number(last_production_qty)){
			alert("计划数量不能大于订单工厂生产数量，本次输入的计划数必须小于等于："+(last_production_qty-matainPlan));
			$(input).val("");
		}
	}
	if(type=='add_batch'){

		if(Number(batch)!=(lastBatch+1)){
			alert("批次号必须为："+(lastBatch+1));
			$("#add_batch").val((lastBatch+1))
			return false;
		}
		
	}
}

function ajaxQuery(){
	var save_flag=true;
	
	//判断订单、工厂、车间、线别是否为空
	var order_id = $("#search_order_no").attr("order_id")||'';
	var factory_id = $("#search_factory").val()||'';
	var factory_name = $("#search_factory").find("option:selected").text()||'';
	var workshop_name = $("#search_workshop").find("option:selected").text()||'';
	var line_name = $("#search_line").find("option:selected").text()||'';
	var batch = $("#search_batch").find("option:selected").text()||'';
	
	if(undefined == order_id || order_id==''){
		save_flag = false;
		alert("请选择订单！");
		return false;
	}
	if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
		save_flag = false;
		alert("请选择生产工厂！");
		return false;
	}
	if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
		save_flag = false;
		alert("请选择车间！");
		return false;
	}
	if(undefined == line_name || line_name=='' ||line_name=='请选择'){
		save_flag = false;
		alert("请选择线别！");
		return false;
	}
	if(save_flag){
		$(".divLoading").addClass("fade in").show();
		$.ajax({
			url:"queryZzjPlan",
			type: "post",
			dataType:"json",
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name,
				"batch":batch
			},
			success:function(response){
				$(".divLoading").hide();
				if(response.success){	
					
					if($.fn.dataTable.isDataTable("#tableResult")){
						$('#tableResult').DataTable().destroy();
						$('#tableResult').empty();
					}
					var datalist=response.data.zzjPlan;
					var checkedLine = $("#search_line").find("option:selected").text()||'';
					var checkedBatch = $("#search_batch").find("option:selected").text()||'';
					if('全部'==checkedLine){
						$("#search_batch").html("");
						$("#search_batch").append("<option value=''>全部</option>");
					}
					if('全部'!=checkedLine&&'全部'==checkedBatch){
						if(undefined !=datalist && 'undefined' !=datalist && datalist.length>0){
							//给批次下拉条件增加option
							$("#search_batch").html("");
							$("#search_batch").append("<option value=''>全部</option>");
							for(var i = 0; i < datalist.length; i++) {
								$("#search_batch").append("<option value='"+datalist[i]['batch']+"'>"+datalist[i]['batch']+"</option>");
							}
						}
					}

					var columns=[
			            {"title":"订单编号","class":"center","width":"70px","data":"order_no","defaultContent": ""},
			            {"title":"订单描述","class":"center","data":"order_name","defaultContent": ""},
			            {"title":"生产工厂","class":"center","width":"70px","data": "factory_name","defaultContent": ""},
			            {"title":"生产车间","class":"center","width":"65px","data":"workshop_name","defaultContent": ""},
			            {"title":"生产线别","class":"center","width":"65px","data": "line_name","defaultContent": ""},
			            {"title":"批次","class":"center","width":"65px","data": "batch","defaultContent": ""},
			            {"title":"批次数量","class":"center","width":"65px","data": "quantity","defaultContent": ""},
			            {"title":"计划开始日期","class":"center","width":"85px","data": "start_date","defaultContent": ""},
			            {"title":"计划完成日期","class":"center","width":"85px","data": "end_date","defaultContent": ""},
			            {"title":"状态","class":"center","width":"60px","data": "status","defaultContent": "","render":function(data,type,row){
			            	if(data=='1'){
			            		return "未开始";
			            	}else if(data=='2'){
			            		return "生产中";
			            	}else{
			            		return "已完成";
			            	}
			            }},
			            {"title":"维护人","class":"center","width":"60px","data": "username","defaultContent": ""},
			            {"title":"维护时间","class":"center","data": "edit_date","width":"135px","defaultContent": ""},
			            {"title":"操作","width":'50px',"class":"center","data":null,"defaultContent": "",
			            	"render": function ( data, type, row ) {
			            		 
			            		var rtnStr = "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editPlan(" + row['id'] + ",this)' style='color:blue;cursor: pointer;'></i>&nbsp;";
			            		if(row['status']=='1'){
			            			rtnStr += "<i class=\"glyphicon glyphicon-trash bigger-130 showbus\" title=\"删除\" onclick='deletePlan(" + row['id'] + ")' style='color:red;cursor: pointer;'></i>";
			            		}
			            		return 	rtnStr;
			            	},
			            }
			        ];
					$("#tableResult").DataTable({
						paiging:false,
						fixedColumns:   { //固定列，行有错位现象
				            leftColumns: 0,
				            rightColumns:0
				        },
						ordering:false,
						rowsGroup:[0,1,2,3,4],
						processing:true,
						searching: false,
						autoWidth:false,
						paginate:false,
						sScrollY: $(window).height()-140,
						scrollX: false,
						scrollCollapse: false,
						lengthChange:false,
						orderMulti:false,
						info:false,
						language: {
							
						},
						data:datalist,
						columns:columns
					});

				}else{
					//后台处理失败，提示错误消息
					alert(response.message);
				}
				var head_width=$(".dataTables_scrollHead").width();
                $(".dataTables_scrollHead").css("width",head_width-17);
			}
		});
		
	}
	
}

function editPlan(row,buttion){
	$("#id").val(row);
	//得到编辑的数据行
	var tr=$(buttion).parent("td").parent("tr");
	var dataTable = $('#tableResult').dataTable();
	var dataObj = dataTable.fnGetData($(tr));
	console.log(dataObj);
	$("#edit_order_no").val(dataObj.order_no);
	$("#edit_order_id").val(dataObj.order_id);
	$("#editOrderInfo").html(dataObj.order_name);
	$("#edit_order_no").val(dataObj.order_no);
	$("#edit_factory").append("<option value='"+dataObj.factory_id+"'>"+dataObj.factory_name+"</option>");
	$("#edit_workshop").append("<option value='"+dataObj.workshop_name+"'>"+dataObj.workshop_name+"</option>");
	$("#edit_line").append("<option value='"+dataObj.line_name+"'>"+dataObj.line_name+"</option>");
	var batch = dataObj.batch.replace('第', '').replace('批', '');
	$("#edit_batch").val(batch);
	$("#old_quantity").val(dataObj.quantity);
	$("#edit_quantity").val(dataObj.quantity);
	$("#edit_start_date").val(dataObj.start_date);
	$("#edit_end_date").val(dataObj.end_date);
	$("#edit_memo").val(dataObj.memo);
	$("#production_qty").val(dataObj.production_qty);
	
	matainPlan = 0;
	var nTrs = dataTable.fnGetNodes();//fnGetNodes获取表格所有行，nTrs[i]表示第i行tr对象
	for(var i = 0; i < nTrs.length; i++){
		var trDataObj = dataTable.fnGetData(nTrs[i]);
		//if(batch ==trDataObj.batch.replace('第', '').replace('批', '')){
		matainPlan =matainPlan + Number(trDataObj.quantity);
	}
	matainPlan = matainPlan-dataObj.quantity;
	
	$("#dialog-edit").removeClass('hide').dialog({
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑下料计划</h4></div>',
		title_html: true,
		width:'550px',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
					text: "保存",
					id:"btn_ok",
					"class" : "btn btn-success btn-minier",
					click: function() {
						btnEditPlanConfirm();
					} 
				}
			]
	});
					
}

function btnEditPlanConfirm(){
	if($("#edit_quantity").val().trim()==''){
		alert('批次数量不能为空');
		$("#edit_quantity").focus();
		return;
	}else{
		$("#editForm").ajaxSubmit({
			url:"editZzjPlan",
			type: "post",
			dataType:"json",
			data:{
				"id":$("#id").val(),
				"quantity":$("#edit_quantity").val(),
				"old_quantity":$("#old_quantity").val(),
				"start_date":$("#edit_start_date").val(),
				"end_date":$("#edit_end_date").val(),
				"change_reason":$("#edit_change_reason").val(),
				"memo":$("#edit_memo").val()
			},
			success:function(response){
				if(response.data=='1'){
					$( "#dialog-edit" ).dialog( "close" );
	            	ajaxQuery();
	            	$.gritter.add({
						title: 'Message：',
						text: "<h5>保存成功！</h5>",
						class_name: 'gritter-info'
					});
				}
			}
		});
	}

	
}

function deletePlan(plan_id){
		var result = confirm("确认删除？") ;
		if(result == true){
			//确认删除
			$.ajax({
				url : "deletePlan",
				dataType : "json",
				data : {"id":plan_id},
				async : false,
				error : function(response) {
					alert(response.message)
				},
				success : function(response) {
					ajaxQuery();
	            	$.gritter.add({
						title: 'Message：',
						text: "<h5>"+response.message+"</h5>",
						class_name: 'gritter-info'
					});
				}
			});
			
		}
}

function ajaxAdd(){
	var save_flag=true;
	
	//判断订单、工厂、车间、线别是否为空
	var order_id = $("#add_order_no").attr("order_id")||'';
	var order_no = $("#add_order_no").val();
	var factory_id = $("#add_factory").val()||'';
	var factory_name = $("#add_factory").find("option:selected").text()||'';
	var workshop_name = $("#add_workshop").find("option:selected").text()||'';
	var line_name = $("#add_line").find("option:selected").text()||'';
	var batch = $("#add_batch").val()||'';
	var quantity = $("#add_quantity").val()||'';
	
	if(undefined == order_id || order_id==''){
		save_flag = false;
		alert("请选择订单！");
		return false;
	}
	if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
		save_flag = false;
		alert("请选择生产工厂！");
		return false;
	}
	if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
		save_flag = false;
		alert("请选择车间！");
		return false;
	}
	if(undefined == line_name || line_name=='' ||line_name=='请选择'){
		save_flag = false;
		alert("请选择线别！");
		return false;
	}
	if(undefined == batch || batch=='' ||batch=='请选择'){
		save_flag = false;
		alert("请填写批次号！");
		return false;
	}
	if(undefined == quantity || quantity=='' ||quantity=='请选择'){
		save_flag = false;
		alert("请填写批次车付数量！");
		return false;
	}
	
	if(save_flag){
		$("#addForm").ajaxSubmit({
			url:"addZzjPlan",
			type: "post",
			dataType:"json",
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name,
				"batch":batch,
				"quantity":quantity,
				"start_date":$("#add_start_date").val(),
				"end_date":$("#add_end_date").val(),
				"memo":$("#add_memo").val()
			},
			success:function(response){
				if(response.data=='1'){
					$("#add_batch").val("");
					$("#add_quantity").val("");
					$( "#dialog-add" ).dialog( "close" );
	            	$.gritter.add({
						title: 'Message：',
						text: "<h5>保存成功！</h5>",
						class_name: 'gritter-info'
					});
	            	
					$("#search_order_no").attr("order_id",order_id);
					$("#search_order_no").val(order_no);
					ajaxQuery();
				}
			}
		});
	}
}

function ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList,header_id){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'savePMD',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(addList),
			"order_id":order_id,
			"factory_id":factory_id,
			"factory_name":factory_name,
			"workshop_name":workshop_name,
			"line_name":line_name,
			"header_id":header_id
		},
		success:function(response){
			$(".divLoading").hide();
            if(response.success){
            	//$('#tableResult tbody').html("");
            	$.gritter.add({
					title: 'Message：',
					text: "<h5>导入成功！</h5>",
					class_name: 'gritter-info'
				});
            }else{
            	$.gritter.add({
					title: 'Message：',
					text: "<h5>导入失败！</h5>",
					class_name: 'gritter-info'
				});
            }
		}
	});
}