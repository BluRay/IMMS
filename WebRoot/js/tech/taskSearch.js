$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("tech/taskSearch",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("tech/taskSearch",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("tech/taskSearch",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	})
	
	$("#btnQuery").click(function() {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
	});
	
});

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'searchTaskList'});
}

function getTaskAllSelectedBusNum(order_no,factory,taskid,bus_num_start,bus_num_end,workshop,task_detail_id,prod_factory){
	$("#selectBusNumber_orderId_view").val(order_no);
	$("#selectBusNumber_factoryId_view").val(factory);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_taskDetailId_view").val(task_detail_id);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';	
	ajaxShowBusNumber(order_no,taskid,bus_num_start,bus_num_end,factory,workshop,task_detail_id,prod_factory);
}
function ajaxShowBusNumber(order_no,tech_task_id,bus_num_s,bus_num_e,factory,workshop,task_detail_id,prod_factory){
	$.ajax({
		url: "getTaskBusNumber",
		dataType: "json",
		type: "get",
		data: {
				"order_no" : order_no,
				"factory":prod_factory,
				"tech_task_id" : tech_task_id,
				"task_detail_id":task_detail_id,
				"bus_num_start" : bus_num_s||'',
				"bus_num_end" : bus_num_e||'',
				"workshop":workshop,
				"bus_status":"all"
		},
		async: false,
		error: function () {alert(response.message);},
		success: function (response) {
			if((workshop == "自制件")||(workshop == "部件")){
				$("#selectBusNumber_table_view").hide();
				$("#selectBusNumber_table_view2").show();
				$("#selectBusNumber_table_view2 tbody").html("");
				$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.workshop).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.follow_num).appendTo(tr);
	       			$("<td style=\"text-align:center;\" />").html(value.confirmor).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			$("#selectBusNumber_table_view2 tbody").append(tr);
	    		});
			}else{
				$("#selectBusNumber_table_view2").hide();
				$("#selectBusNumber_table_view").show();
				$("#selectBusNumber_table_view tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	       			$("<td style=\"text-align:center;\" />").html(value.confirmor).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			$("#selectBusNumber_table_view tbody").append(tr);
	    		});
			}
			
		}
	});
	
	$("#dialog-BusNumberModal").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 技改车辆信息</h4></div>',
		title_html: true,
		width:850,
		height:580,
		modal: true,
		buttons: [{
					text: "关闭",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				}
			]
	});
}

//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:'searchTaskList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,		//冻结列数
        queryParams:function(params) {
        	var workshopAll="";
        	$("#search_workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
        	var conditions={};
        	conditions.task_content=$("#search_tech_task_content").val();
        	conditions.tech_order_no=$("#search_tech_order_no").val();
        	conditions.order_no=$("#search_order_no").val();
        	conditions.factory=$("#search_factory :selected").text();
        	conditions.workshop_list=workshop;
        	conditions.tech_date_start=$("#search_date_start").val();
        	conditions.tech_date_end=$("#search_date_end").val();
        	conditions.status=$("#status").val();
        	
        	params["conditions"] = JSON.stringify(conditions); 
        	return params;
        },
        columns: [
        [
			{
				field: 'task_content',title: '技改任务',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
				return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
				},formatter:function(value, row, index){
	        		if(value.length > 15){
            			return "<p title="+value.replace(/\r/ig, "").replace(/\n/ig, "")+">" + value.substring(0,15) + "...</p>";
            		}else{
            			return "<p>" + value + "</p>";
            		}
	        	}
			},{
				field: 'tech_order_type',title: '变更单类型',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'tech_order_no',title: '技改单号',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'tech_order_file',title: '变更单附件',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	},
			    formatter:function(value,row,index){
			    	if(value!=''&&value!=null){
						return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
						}	
			        }
			},{
				field: 'tech_date',title: '技改单日期',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'duty_unit',title: '责任单位',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'major_change',title: '重大变更',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'custom_change',title: '顾客变更',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter
			},{
				field: 'custom_change_file',title: '顾客变更单附件',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	},
			    formatter:function(value,row,index){
			    		if(value!=''&&value!=null){
			    			return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
			    		}	                    	
			        }	
			},{
				field: 'repeat_change',title: '重复变更',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'tech_type',title: '技改类型',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'switch_mode',title: '切换方式',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'switch_node',title: '切换节点',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'order_desc',title: '订单',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	},
			  
			},{
				field: 'factory',title: '技改工厂',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'prod_factory',title: '生产工厂',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'workshop',title: '车间',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'tech_time',title: '分配工时',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'tech_num',title: '技改台数',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'follow_num',title: '完成台数',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{
				field: 'ready_hour',title: '已录入工时',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	}
			},{            	
				field: '',title: '车号信息',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	},
			    	formatter:function(value,row,index){
			        	return "<i name=\"edit\" class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick=\"getTaskAllSelectedBusNum('"
			        	+row.order_no+"','"+row.factory+"','"+row.id+"',null,null,'"+row.workshop+"','"+row.task_detail_id+"','"+row.prod_factory+"')\">";
			        }
			},{
				field: '',title: '成本是否可转移',align: 'center',valign: 'middle',align: 'center',
			    sortable: false,visible: true,footerFormatter: totalTextFormatter,
			    cellStyle:function cellStyle(value, row, index, field) {
			    	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
			    	},
			    formatter:function(value,row,index){
			        	return row.tech_order_type=='ECN'?'否':'是';
			        }
			}
        ]
    ]
    });
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	$("#btnQuery").prop("disabled","disabled");
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
    function getHeight() {return $(window).height()+55;}
    function getWidth() {return $(window).width()-220;}
}
//----------END bootstrap initTable ----------

//----------START Bootstrap Script ----------
var scripts = [
        '../js/bootstrap-table.js','../js/bootstrap-table-fixed-columns.js',
        '../js/bootstrap-table-export.js','../js/tableExport.js',
        '../js/bootstrap-table-editable.js','../js/bootstrap-editable.js'
    ],
    eachSeries = function (arr, iterator, callback) {
    	//console.log("---->arr.length=" + arr.length);
        callback = callback || function () {};
        if (!arr.length) {return callback();}
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {callback(err);callback = function () {};}
                else {completed += 1;if (completed >= arr.length) {callback(null);}else {iterate();}}
            });
        };
        iterate();
    };
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {return row.id});
}
function responseHandler(res) {
    $.each(res.rows, function (i, row) {row.state = $.inArray(row.id, selections) !== -1;});return res;
}
function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {html.push('<p><b>' + key + ':</b> ' + value + '</p>');});
    return html.join('');
}
function operateFormatter(value, row, index) {
    return ['<a class="remove" href="javascript:void(0)" title="Remove">','<i class="glyphicon glyphicon-remove"></i>','</a>'].join('');
}
window.operateEvents = {
    'click .like': function (e, value, row, index) {alert('You click like action, row: ' + JSON.stringify(row));},
    'click .remove': function (e, value, row, index) {ajaxDel(row.id);}
};
function totalTextFormatter(data) {return 'Total';}
function totalNameFormatter(data) {return data.length;}
function totalPriceFormatter(data) {
    var total = 0;
    $.each(data, function (i, row) {total += +(row.price.substring(1));});
    return '$' + total;
}
function getScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState ||this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            if (callback)
            	callback();
            	script.onload = script.onreadystatechange = null;
        }
    };
    head.appendChild(script);
    return undefined;
} 