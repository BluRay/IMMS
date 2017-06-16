var cur_year="";
var pageSize=10;

$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function () {
		$("#btnQuery").attr("disabled","disabled");
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });

});

function initPage(){
/*	cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	*/
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect("","","#search_factory","全部","id")
	ajaxQuery();
	
}

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getOrderDetailList'});
	$("#btnQuery").removeAttr("disabled");
}

//----------START bootstrap initTable ----------
function initTable() {
	var columns=[
		         [
		            {
		            	field: 'order_desc',title: '订单',align: 'center',width:'250',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
			        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
			        	}
		            },{
		            	field: 'order_type',title: '订单类型',align: 'center',width:'90',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'delivery_date',title: '订单交期',align: 'center',width:'100',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'factory_name',title: '生产工厂',align: 'center',width:'150',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	},
		    	      
		            },{
		            	field: 'production_qty',title: '生产<br/>数量',align: 'center',width:'60',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'order_config_name',title: '配置',align: 'center',width:'150',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'config_qty',title: '配置<br/>数量',align: 'center',width:'60',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'customer',title: '客户',align: 'center',width:'150',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'sequence',title: '生产<br/>顺序',align: 'center',width:'60',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'zzj_offline_count',title: '自制件<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'parts_online_count',title: '部件<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'parts_offline_count',title: '部件<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'welding_online_count',title: '焊装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'welding_offline_count',title: '焊装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'painting_online_count',title: '涂装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'painting_offline_count',title: '涂装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'chassis_online_count',title: '底盘<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'chassis_offline_count',title: '底盘<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'assembly_online_count',title: '总装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'assembly_offline_count',title: '总装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'warehousing_count',title: '入库',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'dispatch_count',title: '发车',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '车辆<br/>详情',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        },
		    	        formatter:function(value,row,index){
		    	        		return "<i class=\"ace-icon fa fa-search bigger-130 editorder\" onclick = 'ajaxShowBusNumber(" + row.id+ ","+row.factory_id+","+row.order_config_id+");' style='color:blue;cursor: pointer;'></i>";
		    	        }
		            },{
		            	field: '',title: '评审<br/>结果',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            }
		        ]
		    ];
	
    $table.bootstrapTable({
        height: getHeight(),
        width:'1500px',
        url:"getOrderDetailList",
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,			//冻结列
        fixedNumber: 0,				//冻结列数
        sidePagination : "client",
        responseHandler: function(res){
             return res.rows;
        },
        queryParams:function() {
        	
        	var conditions={};
        	conditions.order_no=$("#search_order_no").val();
        	conditions.factory=/*$("#search_factory").val();*/getAllFromOptions("#search_factory","val")
        	conditions.actYear=$("#search_productive_year").val();
        	conditions.status=$("#search_status").val();        
/*        	params["conditions"] = JSON.stringify(conditions); */
        	return conditions;
        },
        columns: columns
    });
    
    
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height:getHeight()});
    });
    
    
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	//$("#btnQuery").attr("disabled","disabled");
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
}
//----------END bootstrap initTable ----------
function ajaxShowBusNumber(order_id,factory_id,order_config_id){
	$.ajax({
		url: "/IMMS/order/showBusNumber",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id,"order_config_id":order_config_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			var dialog = $( "#dialog-message" ).removeClass('hide').dialog({
				width:1000,
				height:500,
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
			if(response.success){
				drawBusInfoTable(response.data)
			} else {
				alert(response.message);
			}
		}
	})
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
            rightColumns:1
        },
/*		sScrollY: $("#dialog-message").height()-30,
		scrollX: true,*/
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
