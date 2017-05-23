$(document).ready(function (){
	initPage();
	
	function initPage(){
		getFactorySelect("tech/taskAssignPage",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vMonBefore= d.getMonth();
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		s1=(vYear-1)+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+"01";	
		s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		$("#search_date_start").val(s1);
		$("#search_date_end").val(s);
	}
	
	$("#btnQuery").click(function () {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });
	
	
});

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'taskAssignPage/getTaskList'});
}

function ajaxEdit(task_id,task_detail_id,task_content,tech_order_no,switch_mode,switch_node,tech_date){
	
	//$("#new_accordion").html("");// 清空之前的div
	
	//$("#tr_switch_node").css("display","");
	var mode_index=0;
	var switch_mode='节点前切换';
	var is_follow = true;
	var allTaskDiv = $("#new_accordion").children('div');
	allTaskDiv.each(function(index){
		if(index>0){
			$(this).remove();
		}
	});
	
	$("#new_tab").html("<li><i id=\"add_tech_detail\" class=\"glyphicon glyphicon-plus bigger-130\" style=\"cursor: pointer;  padding-top: 5px;padding-left:5px; color: blue;\"></i></li>");
	var is_follow=false;
	var tech_list=getTechList(task_id);
	if(tech_list.length==0){
		//addTechDetail();
	}
	
	if(switch_mode=='节点前切换'){
		mode_index=1;
		$("#tr_switch_node").css("display","");
		$("#switch_node").val(switch_node);
	}
	if(switch_mode=='节点后切换'){
		mode_index=2;
		$("#tr_switch_node").css("display","");
		$("#switch_node").val(switch_node);
	}
	$("[name=switch_mode]").eq(mode_index).attr('checked',true);
	if(is_follow){
		$("[name=switch_mode]").attr("disabled",true);
	}
	
	$("#dialog-assessModal").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 技改任务分配</h4></div>',
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
						//btnConfirm();
					} 
				}
			]
	});
}

//根据技改任务ID查询技改实施范围信息
function getTechList(task_id){
	var conditions="{'task_id':"+task_id+"}";
	var tech_list=[];
	$.ajax({
		url:"taskAssignPage/getTechList",
		dataType:"json",
		type:"post",
		async:false,
		data:{"conditions":conditions},
		success:function(response){
			tech_list=response.hashMap;
		}
	});
	return tech_list;
}


//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:'taskAssignPage/getTaskList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,		//冻结列数
        queryParams:function(params) {
        	var conditions={};
        	conditions.task_content=$("#search_tech_task_content").val();
        	conditions.tech_order_no=$("#search_tech_order_no").val();
        	conditions.order_no=$("#search_order_no").val();
        	conditions.factory=$("#search_factory :selected").text();
        	conditions.tech_date_start=$("#search_date_start").val();
        	conditions.tech_date_end=$("#search_date_end").val();
        	conditions.status=$("#status").val();
        	
        	params["conditions"] = JSON.stringify(conditions);
        	
        	return params;
        },
        columns: [
        [
            {
            	field: 'task_content',title: '&nbsp;&nbsp;&nbsp;技改任务&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'tech_order_no',title: '&nbsp;&nbsp;&nbsp;技改单编号&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'switch_mode',title: '&nbsp;&nbsp;&nbsp;切换方式&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'tech_date',title: '&nbsp;&nbsp;&nbsp;技改日期&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'order_desc',title: '&nbsp;&nbsp;&nbsp;订单&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'factory',title: '&nbsp;&nbsp;&nbsp;工厂&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'switch_node',title: '&nbsp;&nbsp;&nbsp;切换节点&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'tech_list',title: '&nbsp;&nbsp;&nbsp;技改台数&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'status',title: '&nbsp;&nbsp;操作&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};},
    	        formatter:function(value, row, index){
    	        	if(row['assess_date']==undefined||row['assess_date']==null||row['assess_date'].trim().length==0){
    	        		//task_id,task_detail_id,task_content,tech_order_no,switch_mode,switch_node,tech_date
    	        		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"分配\" onclick='ajaxEdit(\"" + 
    	        		row['id'] + "\",\"" + row['task_detail_id'] + "\",\"" + row['task_content'] + "\",\"" + row['tech_order_no'] + "\",\"" + 
    	        		row['switch_mode'] + "\",\"" + row['switch_node'] + "\",\"" + row['tech_date'] + "\")' style='color:blue;cursor: pointer;'></i>";
    	        	}
    	        }
            }
        ]
    ]
    });
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	$("#btnQuery").attr("disabled","disabled");
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
    function getHeight() {return $(window).height()-45;}
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
    
    