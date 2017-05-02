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
	cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect("","","#search_factory","全部","id")
	ajaxQuery();
	
}

function ajaxQuery(){
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
		            	field: '',title: '自制件<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '部件<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '部件<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '焊装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '焊装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '涂装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '涂装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '底盘<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '底盘<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '总装<br/>上线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '总装<br/>下线',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '入库',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '发车',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: '',title: '车辆<br/>详情',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
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
        	conditions.factory=$("#search_factory").val();
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
    	$("#btnQuery").attr("disabled","disabled");
    });
/*    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });*/
}
//----------END bootstrap initTable ----------