var switch_node_arr="焊装,玻璃钢,涂装,底盘,总装,检测线";
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("tech/taskAssignPrePage",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vMonBefore= d.getMonth();
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		s1=(vYear-1)+"-"+(12)+"-"+"01";	
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
	$("#task_assess").clearForm();
	$("[name=switch_mode]").removeAttr("disabled");
	$("#new_accordion").html("");
	$("#tr_switch_node").css("display","none");
	var allTaskDiv = $("#new_accordion").children('div');
	allTaskDiv.each(function(index){
		if(index>0){
			$(this).remove();
		}
	});
	$("#new_tab").html("<li></li>");
	var tech_list=getTechList(task_id);
	$.each(tech_list,function(i,tech_detail){
		var order_desc=tech_detail.order_desc;
		var tech_detail_list=tech_detail.tech_detail_list;
		var follow_detail=tech_detail.follow_detail;
		var prod_factory_id=tech_detail.prod_factory_id;
		var prod_factory=tech_detail.prod_factory;
		addTechDetail(order_desc,tech_detail_list,follow_detail,prod_factory_id,prod_factory);		
	});		
	var mode_index=0;
	//节点前切换
	if(switch_mode=='节点前切换'){
		mode_index=1;
		$("#switch_node").val(switch_node);
	}
	//节点后切换
	if(switch_mode=='节点后切换'){
		mode_index=2;
		$("#switch_node").val(switch_node);
	}
	$("[name=switch_mode]").eq(mode_index).prop('checked',true);
	$("[name=switch_mode]").prop("disabled",true);
	$("#v_task_content").val(task_content);
	$("#v_tech_order_no").val(tech_order_no);
	$("#dialog-assessModal").data("tech_date",tech_date);
	$("#dialog-assessModal").data("tech_task_id",task_id);
	$("#dialog-assessModal").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 技改任务分配-前段</h4></div>',
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
						asessTechTask();
					} 
				}
			]
	});
	
}

function asessTechTask(){
	var factory_cboxs=$("input[name='new_tecn_flag']");
	var tech_task_id=$("#dialog-assessModal").data("tech_task_id");
	var switch_mode=$("input[name='switch_mode']:checked").val();
	var tech_date=$("#dialog-assessModal").data("tech_date");
	var switch_node=$("#switch_node").val()||"";
	var node_list="";
	var node_index=switch_node_arr.indexOf(switch_node);
	if(switch_mode=='节点前切换'){
		node_list=switch_node_arr.substring(0,node_index-1)
	}
	if(switch_mode=='节点后切换'){				
		node_list=switch_node_arr.substring(node_index,switch_node_arr.length)
	}
	var conditions=new Array();
	$.each(factory_cboxs,function(i,cbox){
		var factory=$(cbox).parent("div").find("span").html();
		var factory_id=$(cbox).parent("div").find("span").attr("factory_id");
		var tech_factory=$(cbox).parent("div").find(".tech_factory :selected").text();
		var tech_factory_id=$(cbox).parent("div").find(".tech_factory").val();
		var order_no=$(cbox).parent("div").parent("div").parent("div").find(".assess_order_no").val();
		if($(cbox).prop("checked")==true){
			var tech_detail_list=[];
			var tb=$(cbox).parent("div").next("table");
			var tr_body=$(tb).find("tr").eq(1);
			var tr_head=$(tb).find("tr").eq(0);
			$.each(tr_body.children("td"),function(i,td){
				if(Number($(td).html())>0){
					var detail="";
					var workshop=$(tr_head).find("td").eq(i).html();
					//alert(workshop);
					detail=workshop+":"+$(td).html();
					tech_detail_list.push(detail);
				}
			});		
			var obj={};
			obj.tech_task_id=tech_task_id;
			obj.factory_list=factory;
			obj.factory_id=factory_id
			obj.order_no=order_no;
			obj.switch_mode=switch_mode;
			obj.switch_node=switch_node;
			obj.tech_date=tech_date;
			obj.tech_list=tech_detail_list.toString();
			obj.node_list=node_list;
			obj.tech_factory_id=tech_factory_id;
			obj.tech_factory=tech_factory;
			conditions.push(obj);
		}
	});
	console.log('---->conditions',conditions);
	$.ajax({
		url:"assignTechTask",
		dataType:"json",
		type:"post",
		async:false,
		data:{
			"conditions":JSON.stringify(conditions)
			},
		success:function(response){
			$("#dialog-assessModal").dialog( "close" );
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>分配成功！</h5>',
				class_name: 'gritter-info'
			});
		    }
		});
}

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
			tech_list=response.data;
		}
	});
	return tech_list;
}
function addTechDetail(order_desc,tech_detail_list,follow_detail,prod_factory_id,prod_factory){
	follow_detail=follow_detail||"";
	var is_follow=false;
	$.each(follow_detail.split(";"),function(i,follow){
		var factory=follow.split("||")[0];
		var follow_num=follow.split("||")[1];
		if(follow.split("||")[1]>0){
			is_follow=true;
			return false;
		}
	})
	var order_disabled="disabled";
	order_desc=order_desc||"";
	tech_detail_list=tech_detail_list||"";
	var i=order_desc.indexOf("<br>");
	var order_no=order_desc.substring(0,i);
	var order_detail=order_desc.substring(i+4,order_desc.length);
	var tasklist=($("#new_tab").find("li"));
	var taskNum=tasklist.length;
	var index=taskNum-1;
	
	$("#new_tab").find("li").removeClass("active");
	$("#new_accordion").find("div").removeClass("active");
	var tabli="<li class='active'><a href='#new_task"+taskNum+"' data-toggle='tab' style='font-size: 14px; color: #333;display:inline-block'><span>订单"+taskNum+"</span>"
	+"</a></li>";
	$("#new_tab li:eq("+index+")").before(tabli);
	var tabContent="<div class=\"tab-pane active\" role=\"tabpanel\" id=\"new_task"+taskNum+"\">";
	tabContent+="<div class=\"panel panel-default\"><div class=\"panel-collapse in\" role=\"tabpanel\">";
	tabContent+="<div class=\"panel-body\"><div><span>订单：</span><input type=\"text\" data-provide=\"typeahead\" class=\"assess_order_no\" id=\"order_"+taskNum+"\" class=\"input-medium\"" +order_disabled+" value=\""+order_no+"\"><span class=\"order_desc\">"+order_detail+"</span></div>";
	tabContent+="</div></div></div>";
	
	$(tabContent).appendTo($("#new_accordion"));
	addTechFactoryDetail(taskNum,tech_detail_list,follow_detail,prod_factory_id,prod_factory);
}
function addTechFactoryDetail(taskNum,tech_detail_list,follow_detail,prod_factory_id,prod_factory){
	var factory_disable_obj={};
	follow_detail=follow_detail||"";
	$.each(follow_detail.split(";"),function(i,follow){
		var factory=follow.split("||")[0].split("_")[1];
		var follow_num=Number(follow.split("||")[1]);
		factory_disable_obj[factory]="disabled";
	})
	var factory_select_options=$("#search_factory").html().replace("全部","请选择");
	taskElement="#new_task"+taskNum;
	tech_detail_list=tech_detail_list||"";
	console.log('---->tech_detail_list = ' + tech_detail_list);
	if(tech_detail_list.trim().length>0){
		var tech_detail_arr=tech_detail_list.split(";");
		var content=$("<div id=\"tech_factory_"+taskNum+"\" class=\"tech_factory\"/>");
		$.each(tech_detail_arr,function(i,tech_detail){
			var factory=tech_detail.split("||")[0].split("_")[1];
			var factory_id=tech_detail.split("||")[0].split("_")[0];
			var tech_info=tech_detail.split("||")[1];
			var tech_obj=new Array();
			$.each(tech_info.split(","),function(i,data){
				var workshop=data.split(":")[0];
				var tech_num=data.split(":")[1];
				tech_obj[workshop]=tech_num;
			})
			var checked="";
			if(tech_info.trim().length>0){
				checked="checked";
			}
			var facotory_div=$("<div style='margin-top:10px'><b>生产工厂：</b><span factory_id='"+(prod_factory_id||factory_id)+"'>"+(prod_factory||factory)+"</span></div>");
			var ckbox=$("<input style=\"height:15px\" name=\"new_tecn_flag\""+
					" class=\"input-medium\" type=\"checkbox\" "+checked+" "+factory_disable_obj[prod_factory]+">");
			var tech_factory="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>技改工厂：</b><select style='width:100px;height:28px' class='tech_factory' disabled>"+factory_select_options+"</select>";
			var tech_table=$("<table class=\"table table-bordered table-striped\" style=\"margin-bottom: 0px;\"></table>");
			var tr_head=$("<tr><td>自制件</td><td>部件</td><td>焊装</td><td>玻璃钢</td><td>涂装</td><td>底盘</td><td>总装</td><td>检测线</td></tr>");
			var tr_body=$("<tr height='31px'><td contenteditable=\"true\">"+(tech_obj['自制件']||'0')+"</td><td contenteditable=\"true\">"+(tech_obj['部件']||'0')+"</td><td>"+
					(tech_obj['焊装']||'')+"</td><td>"+(tech_obj['玻璃钢']||'')+"</td><td>"+(tech_obj['涂装']||'')+"</td><td>"+
					(tech_obj['底盘']||'')+"</td><td>"+(tech_obj['总装']||'')+"</td><td>"+(tech_obj['检测线']||'')+"</td></tr>");
			$(tech_table).append(tr_head).append(tr_body);	
			$(facotory_div).append(ckbox);
			$(facotory_div).append(tech_factory);			
			$(ckbox).data("tech_detail",tech_detail);			
			$(content).append(facotory_div);
			$(content).append(tech_table);
			$(facotory_div).find(".tech_factory").val(factory_id);
		})
		$(taskElement).append(content);
		
	}	
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
    	        	console.log('---->assess_date = ' + row['assess_date'])
    	        	if(row['assess_date']==undefined||row['assess_date']==''||row['assess_date'].trim().length==0){
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
    	$("#btnQuery").prop("disabled","disabled");
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

