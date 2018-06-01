var cur_year="";
var pageSize=20;

$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function () {
		/*$("#btnQuery").attr("disabled","disabled");*/
		/*eachSeries(scripts, getScript, initTable);*/
		ajaxQuery();
    });


	//导出功能
	$(".buttons-excel").click(function(){
		//ajaxQuery(0,'all');
		$("#tableOrder thead").remove();
		$("#tableOrder tbody").children("tr").children("td:hidden").remove();
		htmlToExcel("tableOrder", "", "","订单明细","订单明细");
		return false;
	});
});

function initPage(){
	var cur_year = new Date().getFullYear();
	var factory_default=getQueryString("factory_id");
	$("#search_productive_year").val(cur_year);
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect("",factory_default,"#search_factory","全部","id")
	ajaxQuery();
	
}

function ajaxQuery(){
	/*$table.bootstrapTable('refresh', {url: 'getOrderDetailList'});
	$("#btnQuery").removeAttr("disabled");*/
	var columns=[];
	columns=[
	            {"title":"订单","width":"230","class":"center","data":"order_desc","defaultContent": ""},
	            {"title":"订单类型","class":"center","data":"order_type","defaultContent": ""},
	            {"title":"订单区域","class":"center","data":"order_area","defaultContent": ""},
	            {"title":"订单交期","class":"center","data":"delivery_date","defaultContent": ""},
	            {"title":"客户","class":"center","data":"customer","defaultContent":""},
	            {"title":"生产工厂","class":"center","data": "factory_name","defaultContent": ""},
	            {"title":"生产数量","class":"center","data":"production_qty","defaultContent": ""},		            
	            {"title":"配置","class":"center","data":"order_config_name","defaultContent": ""},		            
	            {"title":"配置数量","class":"center","data": "config_qty","defaultContent": ""},		            
	            {"title":"生产顺序","class":"center","data":"sequence","defaultContent": ""},
	            
	            {"title":"自制件下线","class":"center","data":"zzj_offline_count","defaultContent": ""},
	            {"title":"部件上线","class":"center","data":"parts_online_count","defaultContent": ""},
	            {"title":"部件下线","class":"center","data":"parts_offline_count","defaultContent": ""},
	            {"title":"焊装上线","class":"center","data": "welding_online_count","defaultContent": ""},
	            {"title":"焊装下线","class":"center","data":"welding_offline_count","defaultContent": ""},		            
	            {"title":"涂装上线","class":"center","data":"painting_online_count","defaultContent": ""},		            
	            {"title":"涂装下线","class":"center","data": "painting_offline_count","defaultContent": ""},
	            {"title":"底盘上线","class":"center","data":"chassis_online_count","defaultContent":""},
	            {"title":"底盘下线","class":"center","data":"chassis_offline_count","defaultContent": ""},
	            
	            {"title":"总装上线","class":"center","data": "assembly_online_count","defaultContent": ""},
	            {"title":"总装下线","class":"center","data":"assembly_offline_count","defaultContent": ""},		            
	            {"title":"入库","class":"center","data":"warehousing_count","defaultContent": ""},		            
	            {"title":"发车","class":"center","data": "dispatch_count","defaultContent": ""},
	            {"title":"车辆详情","width":'70',"class":"center","data":"","defaultContent":"","render":function(data,type,row){
	            	return "<i class=\"ace-icon fa fa-search bigger-130 editorder\" onclick = 'ajaxShowBusNumber(" + row.id+ ","+row.factory_id+","+row.order_config_id+");' style='color:blue;cursor: pointer;'></i>";
	            }},{"title":"BOM","width":'50',"class":"center","data":"","defaultContent":"","render":function(data,type,row){
	            	return "<i class=\"ace-icon fa fa-search bigger-130 editorder\" onclick = 'ajaxShowOrderBOM(" + row.id+ ","+row.factory_id+","+row.order_config_id+");' style='color:blue;cursor: pointer;'></i>";
	            }},
	            
	            {"title":"评审结果","width":'70',"class":"center","data":"review_result","render":function(data,type,row){
	            	return data=="2"?"已评审":(data=="1"?"评审中":"未评审")},"defaultContent":""
	            },
	            ];
	var tb=$("#tableOrder").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 0,
            rightColumns:3
        },
		dom: 'Bfrtip',
		lengthMenu: [
		             [ 20, 50,100, -1 ],
		             [ '显示20行', '显示50行', '显示100行', '全部' ]
		         ],
	    buttons: [
	        {extend:'excelHtml5',enabled:false,title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	        {extend:'pageLength',text:'显示20行'}
	       
	    ],
        rowsGroup:[0,1,2,3,4],
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-140,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: pageSize,
		pagingType:"full_numbers",
		lengthChange:true,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			lengthMenu:"显示 _MENU_ 行",
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
			$(".divLoading").addClass("fade in").show();
			var param ={
				"draw":1,
				"order_no":$("#search_order_no").val(),
				"factory":getAllFromOptions("#search_factory","val"),
				"actYear":$("#search_productive_year").val(),
				"status":$("#search_status").val(),
				"review_status":$("#search_review_status").val()+"",
				"img_output":$("#search_img_status").val()+""
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getOrderDetailList",
                cache: false,  //禁用缓存
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
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    var head_width=$(".dataTables_scrollHead").width();
                    //alert(head_width)
                    $(".dataTables_scrollHead").css("width",head_width-20);
                    
                    $(".divLoading").hide();
                }
            });
		
		},
		columns: columns,
	});
	$("#tableOrder_info").addClass('col-xs-6');
	$("#tableOrder_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}

function ajaxShowBusNumber(order_id,factory_id,order_config_id){
	$.ajax({
		url: "/BMS/order/showBusNumber",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id,"order_config_id":order_config_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tableBusNumber tbody").html("");
				drawBusInfoTable(response.data)
			} else {
				alert(response.message);
			}
			var dialog = $( "#dialog-message" ).removeClass('hide').dialog({
				width:1000,
				height:520,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 车辆明细</h4></div>",
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
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
			
		}
	})
}

function ajaxShowOrderBOM(order_id,factory_id,order_config_id){
	$.ajax({
		url:"/BMS/common/getOrderBOM",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id,"order_config_id":order_config_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			var dialog = $( "#dialog-message2" ).removeClass('hide').dialog({
				width:800,
				height:520,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> BOM明细</h4></div>",
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
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
			drawOrderBOMTable(response.data);
		}
	})
}

function drawOrderBOMTable(data){

	var t=$("#tableBusNumber2").DataTable({
		paiging:false,
		showRowNumber:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		fixedColumns:   {
            leftColumns: 1,
            rightColumns:0
        },
/*		sScrollY: $("#dialog-message").height()-30,
		scrollX: true,*/
/*		createdRow: function ( row, data, index ) {
			//alert(index)
			 $('td', row).	eq(1).find("input").data("allot_config_id",data.allot_config_id||0);
			 $('td', row).	eq(1).find("input").data("order_config_id",data.order_config_id);
        },*/
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"未查询到订单BOM信息！"
		},
		data:data,
		columns: [
		            {"title":"料号","width":"90","class":"center","data":"material","defaultContent": ""},
		            {"title":"物料描述","class":"center","data":"material_des","defaultContent": ""},
		            {"title":"生产工厂","width":"80","class":"center","data":"product_factory","defaultContent": ""},
		            {"title":"用量","width":"60","class":"center","data":"req_qty","defaultContent": ""},
		            {"title":"单位","width":"60","class":"center","data":"unit","defaultContent": ""},
		            {"title":"生产订单","width":"120","class":"center","data":"pp_order","defaultContent": ""}
		          ]	      
	});
}

function drawBusInfoTable(data){

	var t=$("#tableBusNumber").dataTable({
		paiging:false,
		showRowNumber:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		fixedColumns: {
            leftColumns:1,
        },
		sScrollY: $("#dialog-message").height()-30,
		scrollX: true,
/*		createdRow: function ( row, data, index ) {
			//alert(index)
			 $('td', row).	eq(1).find("input").data("allot_config_id",data.allot_config_id||0);
			 $('td', row).	eq(1).find("input").data("order_config_id",data.order_config_id);
        },*/
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"未查询到车辆信息！"
		},
		data:data,
		columns: [
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"VIN","class":"center","data":"vin","defaultContent": ""},
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"当前车间","class":"center","data":"workshop","defaultContent": ""},
		            {"title":"当前工序","class":"center","data":"process_name","defaultContent": ""},
		            {"title":"焊装上线","class":"center","data":"welding_online_date","defaultContent": ""},
		            {"title":"焊装下线","class":"center","data":"welding_offline_date","defaultContent": ""},
		            {"title":"涂装上线","class":"center","data":"painting_online_date","defaultContent": ""},
		            {"title":"涂装下线","class":"center","data":"painting_offline_date","defaultContent": ""},
		            {"title":"底盘上线","class":"center","data":"chassis_online_date","defaultContent": ""},
		            {"title":"底盘下线","class":"center","data":"chassis_offline_date","defaultContent": ""},
		            {"title":"总装上线","class":"center","data":"assembly_online_date","defaultContent": ""},
		            {"title":"总装下线","class":"center","data":"assembly_offline_date","defaultContent": ""},
		            {"title":"入库","class":"center","data":"warehousing_date","defaultContent": ""},
		            {"title":"发车","class":"center","data":"dispatch_date","defaultContent": ""}
		          ]	      
	});
}