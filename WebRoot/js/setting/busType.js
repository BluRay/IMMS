var pageSize=1;
var table;
var select_str = "";
var select_str1 = "";
var select_str2 = "";
var cur_year="";
var original = "";
var reduce_series_list=new Array();
var max_num = 0;		var sum_num = 0;
var edit_max_num = 0;	var edit_sum_num = 0;
var del_order_list=new Array();
var dt;
/*$.extend( true, $.fn.dataTable.defaults, {
    "searching": false,
    "ordering": false,
    "rowsGroup":[0,1,2,3,4,5]
} );*/
$(document).ready(function(){
	cur_year = new Date().getFullYear();
	
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	$(document).on("click","#btnAdd",function(){
		
		var dialog = $( "#dialog_add" ).removeClass('hide').dialog({
			width:600,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 新增车型</h4></div>',
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
					} 
				}
			]
		});
	}); 
	
	$(document).on("click",".close.add",function(e){
		prod_year=$("#new_productive_year").val();
		$(e.target).closest("tr").remove();		
		//var latest_num_start=Number($("#newModal").data("bus_num_start"));
		//获取cur_year下的最新流水起始号（最大流水号+1）
		var order_type=$("#newOrderType").val();
		var latest_num_start=0;
		if(order_type !='KD件'){
			latest_num_start=getLatestSeris(prod_year);
		}
		$("#dialog_add").data("bus_num_start",latest_num_start);
		//alert(latest_num_start);
		//更新流水号
		var maxOrderNo = latest_num_start;	
		var factoryOrder_parameters=$("#new_factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
	});
	
	$(document).on("click",".close.edit",function(e){
		var order_type=$("#editOrderType").val();
		var tr=$(e.target).closest("tr");
		if(order_type !='KD件'){
			/**判断该工厂订单下是否已经产生了车号，是则不能删除
			 */
			if($(tr).data("min_busnum")!='0'&&$(tr).data("min_busnum")!=undefined){
				alert("该工厂订单下已生成了车号，不能删除！");
			}else /*if($(tr).data("production_qty")==undefined)*/{//新增的产地分配，删除后，合并剩余可用流水段列表;//已存在的产地分配，删除后，合并剩余可用流水段列表
				var series={};
				series.num_start=$(tr).find("td").eq(3).find("input").val();
				series.num_end=$(tr).find("td").eq(4).find("input").val();
				mergeReduceSeriesList(series);
				if($(tr).data("factory_order_id")!=undefined){
					var obj={};
					obj.factory_order_id=$(tr).data("factory_order_id");
					//obj.order_detail_id=$(tr).data("order_detail_id");
					obj.production_qty=$(tr).data("production_qty");
					del_order_list.push(obj);
				}
				$(tr).remove();	
			}
		}else{
			if($(tr).data("factory_order_id")!=undefined){
				var obj={};
				obj.factory_order_id=$(tr).data("factory_order_id");
				//obj.order_detail_id=$(tr).data("order_detail_id");
				obj.production_qty=$(tr).data("production_qty");
				del_order_list.push(obj);
			}
			$(tr).remove();	
			var maxOrderNo = 0;	
			var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
			$.each(factoryOrder_parameters,function(index,param){
				var tds=$(param).children("td");
				$(tds[3]).find("input").val(maxOrderNo);
				$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
				maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
			});
		}
		
	});
	$(document).on("click",".editBusType",function(){
        
		var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
			width:600,
			/*height:500,*/
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 编辑车型</h4></div>',
			title_html: true,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {
						$( this ).dialog( "close" ); 
						$("#editForm")[0].reset();
					} 
				},
				{
					text: "确定",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						if($("#edit_busTypeCode").val()===""){
							alert("车型编码不能为空！");
							$("#edit_busTypeCode").focus();
							return false;
						}
						if($("#edit_internalName").val()===""){
							alert("车辆内部名称不能为空！");
							$("#edit_internalName").focus();
							return false;
						}
//						if($("#edit_vinPrefix").val()===""){
//							alert("VIN前八位不能为空！");
//							$("#edit_vinPrefix").focus();
//							return false;
//						}
//						if($("#edit_numberSize").val()===""){
//							alert("生成序列号位数不能为空！");
//							$("#edit_numberSize").focus();
//							return false;
//						}
						
					
					$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	}); 
	
});

function ajaxQuery(){
	dt=$("#tableData").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:1
        },
        rowsGroup:[0,1,2,3,4,5],
		paiging:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		scrollY: $(window).height()-245,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"busTypeCode":$("#search_busTypeCode").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getBusTypeList",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    callback(returnData);
                }
            });
		
		},
		columns: [
//					{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","class":"center","data":"id","render": function ( data, type, row ) {
//					    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
//					},"defaultContent": ""},
		            {"title":"车型编号","class":"center","data":"busTypeCode","defaultContent": ""},
		            {"title":"车型内部名称","class":"center","data":"internalName","defaultContent": ""},
		            {"title":"品牌","class":"center","data":"brand","defaultContent": ""},
		            {"title":"制造商","class":"center","data":"manufacturer","defaultContent": ""},
		            //{"title":"车辆类型","class":"center","data": "busVehicleTypeId","defaultContent": ""},
		            {"title":"车辆型号","class":"center","data":"vehicleModel","defaultContent": ""},		            
		            {"title":"底盘型号","class":"center","data":"chassisModel","defaultContent": ""},		            
		            {"title":"车辆长度","class":"center","data": "vehicleLength","defaultContent": ""},
		            {"title":"轴距","class":"center","data":"wheelbase","defaultContent": ""},
		            {"title":"最大允许总质量","class":"center","data":"maxWeight","defaultContent": ""},		            
		            {"title":"额定载客数量","class":"center","data": "passengerNum","defaultContent": ""},
		            //{"title":"燃料类型","class":"center","data":"fuelType","defaultContent": ""},
		            //{"title":"驱动电机类型","class":"center","data": "driveMotorTypeId","defaultContent": ""},
		            {"title":"电机型号","class":"center","data":"motorModel","defaultContent": ""},		            
		            {"title":"电机最大功率","class":"center","data":"motorPower","defaultContent": ""},		            
		            {"title":"电池型号","class":"center","data": "batteryModel","defaultContent": ""},
		            {"title":"电池容量","class":"center","data":"","defaultContent": ""},
		            {"title":"额定电压","class":"center","data":"","defaultContent": ""},		            
		            {"title":"维护人","class":"center","data": "editorId","defaultContent": ""},
		            {"title":"维护时间","class":"center","data":"editDate","defaultContent": ""},
		            //{"title":"编辑","class":"center","data":null,"defaultContent": "<i onclick = 'ajaxEdit(" + row.id+ ");' class=\"ace-icon fa fa-pencil bigger-130 editBusType\" style='color:green;cursor: pointer;'></i>"}
		            {"title":"编辑","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick = 'ajaxEdit(" + row.id+ ");' style='color:green;cursor: pointer;'></i>"},
		            	"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130 editBusType\" style='color:green;cursor: pointer;'></i>"}
		          ],
		
	});
/*	dt.on('page.dt', function ( e, settings) {
		new $.fn.dataTable.RowsGroup( dt.datatable, [0,1,2,3,4,5] );
	})*/
}
function setInput(value){
	var input="<input type='text' value='"+value+"' />";
	return input;
} 

function ajaxEditConfirm (argument){
	
	$("#btnEditConfirm").attr("disabled","disabled");

	$.ajax({
		type: "get",
		dataType: "json",
		url: "/IMMS/setting/updateBusType",
	    data: {
	    	"busTypeCode":$("#edit_busTypeCode").val(),
			"internalName":$("#edit_internalName").val(),
			"brand":$("#edit_brand").val(),
			"manufacturer":$("#edit_manufacturer").val(),
			"vehicleModel":$("#edit_vehicleModel").val(),
			"driveMotor":$("#edit_driveMotor").val(),
			"chassisModel":$("#edit_chassisModel").val(),
			"motorModel":$("#edit_motorModel").val(),
			"vehicleLength":$("#edit_vehicleLength").val(),
			"motorPower":$("#edit_motorPower").val(),
			"wheelbase":$("#edit_wheelbase").val(),
			"batteryModel":$("#edit_batteryModel").val(),
			"passengerNum":$("#edit_passengerNum").val(),
			"maxWeight":$("#edit_maxWeight").val(),
			"lightDowndip":$("#edit_lightDowndip").val(),
			"maxSpeed":$("#edit_maxSpeed").val()
		},
		async: false,
	    success:function (response) {
	    	$("#btnEditConfirm").removeAttr("disabled");
	    	
    		if(factoryOrderDetail==""){
    			alert("订单数据编辑成功！");
    		}else{
    			alert("订单数据编辑成功，请重新发布该订单今天及以后的计划！");
    		}
    		$( "#dialog-order" ).dialog( "close" );
    		ajaxQuery();
	     
	    },
	    error:function(){alertError();$("#btnEditConfirm").removeAttr("disabled");}
	});
	
}

function ajaxAdd (argument) {
	if($("#add_busTypeCode").val()===""){
		alert("车型编码不能为空！");
		$("#add_busTypeCode").focus();
		return false;
	}
	if($("#edit_internalName").val()===""){
		alert("车辆内部名称不能为空！");
		$("#edit_internalName").focus();
		return false;
	}
	if($("#add_vehicleLength").val()===""){
		alert("车型长度不能为空！");
		$("#add_vehicleLength").focus();
		return false;
	}
	if($("#edit_wheelbase").val()===""){
		alert("轴距称不能为空！");
		$("#edit_wheelbase").focus();
		return false;
	}
    $.ajax({
		type: "get",
		dataType: "json",
		url: "/IMMS/setting/addBusType",
	    data: {
			"busTypeCode":$("#add_busTypeCode").val(),
			"internalName":$("#add_internalName").val(),
			"brand":$("#add_brand").val(),
			"manufacturer":$("#add_manufacturer").val(),
			"vehicleModel":$("#add_vehicleModel").val(),
			"driveMotor":$("#add_driveMotor").val(),
			"chassisModel":$("#add_chassisModel").val(),
			"motorModel":$("#add_motorModel").val(),
			"vehicleLength":$("#add_vehicleLength").val(),
			"motorPower":$("#add_motorPower").val(),
			"wheelbase":$("#add_wheelbase").val(),
			"batteryModel":$("#add_batteryModel").val(),
			"passengerNum":$("#add_passengerNum").val(),
			"maxWeight":$("#add_maxWeight").val(),
			"lightDowndip":$("#add_lightDowndip").val(),
			"maxSpeed":$("#add_maxSpeed").val()
		},
		async: false,
	    success:function (response) {
	    	
	    	if (response.success) {
	    		$( "#dialog_add" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function ajaxEdit(id){

	//查询订单信息
	$.ajax({
		url: "/IMMS/setting/getBusTypeById",
		dataType: "json",
		data: {"id" : id},
		async: false,
		error: function () {alertError();},
		success: function (response) {			

			$('#editId').val(id);
			$('#edit_busTypeCode').val(response.data.busTypeCode);
			$('#edit_internalName').val(response.data.internalName);
			$('#edit_vehicleModel').val(response.data.vehicleModel);
			$('#edit_chassisModel').val(response.data.chassisModel);
			$('#edit_vehicleLength').val(response.data.vehicleLength);
			$('#edit_wheelbase').val(response.data.wheelbase);
			$('#edit_maxWeight').val(response.data.maxWeight);
			$('#edit_passengerNum').val(response.data.passengerNum);
			$('#edit_motorModel').val(response.data.motorModel);
			$('#edit_motorPower').val(response.data.motorPower);
			$('#edit_batteryModel').val(response.data.batteryModel);

			var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
				width:600,
				height:500,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>编辑车型</h4></div>",
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
							//$( this ).dialog( "close" );
							//ajaxEditConfirm();
							$.ajax({
							    url: "updateBusType",
							    dataType: "json",
								type: "get",
							    data: {
							    	"id" : $("#editId").val(),
							    	"busTypeCode":$("#edit_busTypeCode").val(),
									"internalName":$("#edit_internalName").val(),
									"brand":$("#edit_brand").val(),
									"manufacturer":$("#edit_manufacturer").val(),
									"vehicleModel":$("#edit_vehicleModel").val(),
									"driveMotor":$("#edit_driveMotor").val(),
									"chassisModel":$("#edit_chassisModel").val(),
									"motorModel":$("#edit_motorModel").val(),
									"vehicleLength":$("#edit_vehicleLength").val(),
									"motorPower":$("#edit_motorPower").val(),
									"wheelbase":$("#edit_wheelbase").val(),
									"batteryModel":$("#edit_batteryModel").val(),
									"passengerNum":$("#edit_passengerNum").val(),
									"maxWeight":$("#edit_maxWeight").val(),
									"lightDowndip":$("#edit_lightDowndip").val(),
									"maxSpeed":$("#edit_maxSpeed").val()
							    },
							    success:function(response){
							    	if(response.success){
							    	$.gritter.add({
										title: '系统提示：',
										text: '<h5>编辑成功！</h5>',
										class_name: 'gritter-info'
									});
							    	ajaxQuery();
							    	}else{
							    		$.gritter.add({
											title: '系统提示：',
											text: '<h5>编辑失败！</h5><br>'+response.message,
											class_name: 'gritter-info'
										});
							    	}
							    }
							});
							$( this ).dialog( "close" );
						} 
					}
				]
			});
		}
	})
}
function ajaxEditConfirm(){
	$.ajax({
	    url: "updateBusType",
	    dataType: "json",
		type: "get",
	    data: {
	    	"id" : $("#editId").val(),
	    	"busTypeCode":$("#edit_busTypeCode").val(),
			"internalName":$("#edit_internalName").val(),
			"brand":$("#edit_brand").val(),
			"manufacturer":$("#edit_manufacturer").val(),
			"vehicleModel":$("#edit_vehicleModel").val(),
			"driveMotor":$("#edit_driveMotor").val(),
			"chassisModel":$("#edit_chassisModel").val(),
			"motorModel":$("#edit_motorModel").val(),
			"vehicleLength":$("#edit_vehicleLength").val(),
			"motorPower":$("#edit_motorPower").val(),
			"wheelbase":$("#edit_wheelbase").val(),
			"batteryModel":$("#edit_batteryModel").val(),
			"passengerNum":$("#edit_passengerNum").val(),
			"maxWeight":$("#edit_maxWeight").val(),
			"lightDowndip":$("#edit_lightDowndip").val(),
			"maxSpeed":$("#edit_maxSpeed").val()
	    },
	    success:function(response){
	    	if(response.success){
	    	$.gritter.add({
				title: '系统提示：',
				text: '<h5>编辑成功！</h5>',
				class_name: 'gritter-info'
			});
	    	//$("#editForm")[0].reset();
	    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>编辑失败！</h5><br>'+response.message,
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
	$( this ).dialog( "close" );
	ajaxQuery();
}
