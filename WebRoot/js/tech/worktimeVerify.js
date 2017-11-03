var pageSize=1;
var table;
var table_height = $(window).height()-270;
var timeConfigCount = 0;
var cur_tmpOrderId = 0;
var ready_hour=0;
var edit_list=[];
var swh_list = [];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
var editModal_factory = "";
var editModal_workshop = "";
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("tech/worktimeVerify",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("tech/worktimeVerify",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		ajaxQuery();
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#search_factory").change(function() {
		getWorkshopSelect("tech/worktimeMaintain",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#checkall").click(function() {
		if ($(this).prop("checked")) {
			check_All_unAll("#work_hour_tb", true);
		} else{
			check_All_unAll("#work_hour_tb", false);
		}
	});
	
	$("#btnSwhQuery").click (function () {
		var staffNum=$("#edit_cardNumber").val();
		var workDate=$("#edit_workDate").val();
		var workshop=$("#edit_workshop_search").val();
		var tempOrderId=cur_tmpOrderId;
		var conditions="{staffNum:'"+staffNum+"',workMonth:'"+workDate+"',ecnTaskId:"+tempOrderId+"',workshop:'"+workshop+"'}";
		if(workDate==''||workDate==null){
			alert("请选择操作月份！");
			return false;
		}
		workhour_list=ajaxGetStaffWorkHours(conditions);
		swh_list = workhour_list;
		generateWorkhourTb(workhour_list,true);
	});
});

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
		fixedColumns: {
            leftColumns:0,
            rightColumns:1
        },
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var workshopAll="";
        	$("#search_workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var workshop=$("#search_workshop :selected").text();
        	var conditions={};
        	conditions.task_content=$("#search_tech_task_content").val();
        	conditions.tech_order_no=$("#search_tech_order_no").val();
        	conditions.order_no=$("#search_order_no").val();
        	conditions.factory=$("#search_factory :selected").text();
        	conditions.workshop=workshop;
        	conditions.tech_date_start=$("#search_date_start").val();
        	conditions.tech_date_end=$("#search_date_end").val();
        	conditions.status=$("#status").val();        	
        	conditions.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
        	conditions.start = data.start;						//开始的记录序号
        	conditions.page = (data.start / data.length)+1;		//当前页码
        	var query_str = JSON.stringify(conditions); 
        	//return params;
        	//console.log("-->conditions = " + JSON.stringify(conditions));

            $.ajax({
                type: "post",
                url: "querySingleTasklist",
                cache: false,  //禁用缓存
                data: {"conditions":query_str},  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    var head_width=$(".dataTables_scrollHead").width();
                    //alert(head_width)
                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		},
		columns: [
		            {"title":"技改任务",width:'120',"class":"center","data":"task_content","defaultContent": "","render":function(data,type,row){
		            	var html="";
		            	//data = data.replace(/\r/ig, "','").replace(/\n/ig, "','");
		            	if(data.length>20){
		            		html="<i title='"+data+"' style='font-style: normal'>"+data.substring(0,20)+"...</i>"
		            	}else{
		            		html=data;
		            	}
		            	return html;
		            	}
		            },
		            {"title":"变更单类型",width:'80',"class":"center","data":"tech_order_type","defaultContent": ""},
		            {"title":"技改单号",width:'80',"class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"变更单附件",width:'80',"class":"center","data":"tech_order_file","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if(data!=''&& data!=null){
								return "<a href=\""+data+"\" target='_blank'>"+"查看"+"</a>";
							}	
		            	},
		            },
		            {"title":"技改单日期",width:'80',"class":"center","data":"tech_date","defaultContent": ""},
		            {"title":"责任单位",width:'60',"class":"center","data":"duty_unit","defaultContent": ""},
		            {"title":"重大变更",width:'60',"class":"center","data":"major_change","defaultContent": ""},
		            {"title":"顾客变更",width:'60',"class":"center","data":"custom_change","defaultContent": ""},
		            {"title":"顾客变更单附件",width:'100',"class":"center","data":"reason_type","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if(data!=''&&data!=null){
				    			return "<a href=\""+data+"\" target='_blank'>"+"查看"+"</a>";
				    		}	
		            	},
		            },
		            {"title":"重复变更",width:'60',"class":"center","data":"repeat_change","defaultContent": ""},
		            {"title":"技改类型",width:'60',"class":"center","data":"tech_type","defaultContent": ""},
		            {"title":"切换方式",width:'60',"class":"center","data":"switch_mode","defaultContent": ""},
		            {"title":"切换节点",width:'60',"class":"center","data":"switch_node","defaultContent": ""},
		            {"title":"订单",width:'80',"class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"工厂",width:'60',"class":"center","data":"factory","defaultContent": ""},
		            {"title":"车间",width:'60',"class":"center","data":"workshop","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return $("#search_workshop :selected").text();
		            	},
		            },
		            {"title":"分配工时",width:'60',"class":"center","data":"time_list","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		var ws = $("#search_workshop :selected").text() + ":";
		            		if(typeof(data) != "undefined"){
		            			if (data.indexOf(ws)>=0){
				            		var str =  data.substring(data.indexOf(ws),data.length);
				            		if(str.indexOf(",")>0){
				            			return str.substring(0,str.indexOf(","));
				            		}else{
				            			return str;
				            		}
			            		}else{
			            			return "-"
			            		}
		            		}else{
		            			return "-"
		            		}
		            	},
		            },
		            {"title":"技改台数",width:'60',"class":"center","data":"tech_list","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		var ws = $("#search_workshop :selected").text() + ":";
		            		if(typeof(data) != "undefined"){
		            			if (data.indexOf(ws)>=0){
				            		var str =  data.substring(data.indexOf(ws),data.length);
				            		if(str.indexOf(",")>0){
				            			return str.substring(0,str.indexOf(","));
				            		}else{
				            			return str;
				            		}
			            		}else{
			            			return "-"
			            		}
		            		}else{
		            			return "-"
		            		}
		            	},
		            },
		            {"title":"完成台数",width:'60',"class":"center","data":"follow_num","defaultContent": "-"},
		            {"title":"已录入工时",width:'80',"class":"center","data":"ready_hour_list","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		var ws = $("#search_workshop :selected").text() + ":";
		            		if(typeof(data) != "undefined"){
		            			if (data.indexOf(ws)>=0){
				            		var str =  data.substring(data.indexOf(ws),data.length);
				            		if(str.indexOf(",")>0){
				            			return str.substring(0,str.indexOf(","));
				            		}else{
				            			return str;
				            		}
			            		}else{
			            			return "-"
			            		}
		            		}else{
		            			return "-"
		            		}
		            		
		            	},
		            },
		            {"title":"车号信息",width:'60',"class":"center","data":"-","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"车号信息\" onclick='getTaskAllSelectedBusNum(\"" + row['order_no'] + "\",\""+ row['factory'] +"\",\""+ row['task_detail_id'] +"\",\""+ row['switch_mode'] +"\",\""+ $("#search_workshop :selected").text() +"\")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;";
		            	},
		            },
		            {"title":"成本可否转移",width:'80',"class":"center","data":"order_desc","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return row.tech_order_type=='ECN'?'否':'是';
		            	},
		            },
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-ok bigger-130 showbus\" title=\"审核\" onclick='verifyWorkTime(\"" + row['order_no'] + "\",\""+ row['tech_order_no'] +"\",\""+ row['task_content'].replace(/\r/ig, "").replace(/\n/ig, "") +"\",\""+ row['task_detail_id'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\",\""+ row['time_list'] +"\",\""+ row['follow_list'] +"\",\""+ row['follow_list'] +"\",\""+ row['tech_single_price'] +"\")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;";
		            	},
		            }
		          ],
	});
}

function getTaskAllSelectedBusNum(order_no,factory,taskid,switch_mode,workshop){
	$("#dialog-busnumber").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 车号信息</h4></div>',
		title_html: true,
		width:'750px',
		modal: true,
		buttons: [{
					text: "关闭",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				}
			]
	});
	
	$.ajax({
		url: "getEcnTaskBusNumber",
		dataType: "json",
		type: "get",
		data: {
				"factory":factory,
				"workshop":workshop,
				"order_no" : order_no,
				"task_detail_id" : taskid
		},
		async: false,
		error: function () {alert(response.message);},
		success: function (response) {
			$("#busnumber_list").html("");
			$.each(response.data,function(index,value){
				var tr = $("<tr style='padding:5px'/>");
				$("<td />").html(index+1).appendTo(tr);
				$("<td />").html(value.bus_number).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.process_name).appendTo(tr);
				$("<td />").html(value.username).appendTo(tr);
				$("<td />").html(value.confirmor_date).appendTo(tr);
				$("#busnumber_list").append(tr);
			});
		}
	});
}

function verifyWorkTime(order_no,tech_order_no,task_content,task_detail_id,factory,workshop,tech_list,time_list,follow_list,ready_hour_list,tech_single_price){
	var totalHour = 0;
	var tech_num = 0;
	var single_hour = 0;
	cur_tmpOrderId = task_detail_id;
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var workMonth=eYear+"-"+(eMon<10?"0"+eMon:eMon);
	$("#edit_workDate").val(workMonth);
	$("#edit_singlePrice").val("25");
	editModal_factory = factory;
	editModal_workshop = workshop;
	console.log("-->time_list = " + time_list);
	
	var follow_obj={};
	if(follow_list!="undefined"){
		follow_list=follow_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
		follow_list="{\""+follow_list+"}";
		follow_obj=JSON.parse(follow_list)
	}
	var time_obj={};
	if(time_list.trim().length>0){
		time_list=time_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
		time_list="{\""+time_list+"}";
		time_obj=JSON.parse(time_list)
	}
	var ready_obj={};
	if(ready_hour_list!="undefined"){
		ready_hour_list=ready_hour_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
		ready_hour_list="{\""+ready_hour_list+"}";
		ready_obj=JSON.parse(ready_hour_list)
	}   
	queryWorkshopList();
	$.each(tech_list.split(","),function(index,tech){
		
		var cur_workshop=tech.split(":")[0];
		var assign_num=tech.split(":")[1];
		var assign_time=time_obj[cur_workshop]||"";
		var ready_hour=ready_obj[cur_workshop]||"";
		var ready_num=follow_obj[cur_workshop]||"";
		if(workshop==cur_workshop){
			totalHour = assign_num*assign_time;
    		tech_num = assign_num;
    		single_hour = assign_time;
		}
	});
	console.log("-->totalHour = " + totalHour + ",tech_num = " + tech_num + ",single_hour = " + single_hour);
	var tr = $(this).closest("tr");
	var tds = $(tr).children("td");
	//var type = $(this).attr("data-original-title");
	var tech_order_no = tech_order_no;
	var task = task_content;
	var totalQty=tech_num;
	var singleHour=single_hour;
	
	var conditions="{ecnTaskId:'"+task_detail_id+"',workMonth:'"+workMonth+"',factory:'"+factory+"',workshop:'"+workshop+"'}";
	console.log("-->tech_order_no = " + tech_order_no);
	swhlist = ajaxGetStaffWorkHours(conditions);
	swh_list = swhlist;
	generateWorkhourTb(swhlist,true);

	$("#checkall").attr("checked",false);
	$("#edit_orderNo").html(tech_order_no);
	$("#edit_task").html(task);
	$("#edit_ecnNumber").html(totalQty);
	$("#edit_singleHour").html(singleHour);
	
	$("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 工时审核</h4></div>',
		title_html: true,
		width:'790px',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
					text: "驳回",
					id:"btn_del",
					"class" : "btn btn-warning btn-minier",
					click: function() {
						btnRejectConfirm(task_detail_id,tech_order_no);
					} 
				},
				{
					text: "批准",
					id:"btn_ok",
					"class" : "btn btn-success btn-minier",
					click: function() {
						btnEditConfirm(task_detail_id,tech_order_no);
					} 
				}
			]
	});
}

function btnEditConfirm(task_detail_id,tech_order_no){
	var workDate=$("#edit_workDate").val();
	var tech_single_price = $("#edit_singlePrice").val();
	if(!const_float_validate.test(tech_single_price)){
		alert("请输入有效工时单价！");
		return false;
	}
	var conditions={};
	conditions.factory=editModal_factory;
	conditions.workshop=editModal_workshop;
	conditions.workMonth=workDate;
	edit_list=getSelectList(task_detail_id,tech_order_no);
	console.log("-->edit_list = " , edit_list);
	var orderStaus="verify";
	var trs=$("#workhour_list").children("tr");
	var tr_count = 0;
	$.each(trs,function(index,tr){
		var cbx=$(tr).find("td").find("input").attr("type");
		if(cbx!=undefined){			
			var c_checkbox=$(tr).find('input[type=checkbox]');
			var status=$(tr).data("status");
			var ischecked=$(c_checkbox).is(":checked");
			if(ischecked){
				console.log("-->tech_single_price = " + tr_count + " : "+ edit_list[0].techSinglePrice);
				edit_list[tr_count].techSinglePrice=tech_single_price;
				edit_list[tr_count].tech_order_no=tech_order_no;
				tr_count++;
			}
			if(status=='已驳回'&&!ischecked){
				orderStaus="reject";
			}	
		}
	});
	
	console.log("-->edit_list = ",edit_list);
	if(edit_list.length>0){
		ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"verify",task_detail_id,orderStaus);
	}
}

function btnRejectConfirm(task_detail_id,tech_order_no){
	var workDate=$("#edit_workDate").val();
	var conditions={};
	conditions.factory = editModal_factory;
	conditions.workshop = editModal_workshop;
	conditions.workMonth = workDate;
	edit_list=getSelectList(task_detail_id,tech_order_no);
	if(!edit_list){
		return false;
	}
	if(edit_list.length>0){
		ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"reject",task_detail_id,"reject","");
	}
}

function getSelectList(task_detail_id,tech_order_no){
	console.log("-->getSelectList" + task_detail_id);
	var boxList=$("#workhour_list :checked");
	var swhList=[];
	$.each(boxList,function(index,box){
		var obj={};
		var tr=$(box).closest("tr");
		var swhindex=$(tr).data("swhindex");
		console.log("-->swhindex = " + swhindex);
		obj=swh_list[swhindex];
		console.log("-->obj = " , obj);
		obj.tech_task_id=task_detail_id;
		obj.techSinglePrice = "0";
		obj.tech_order_no=tech_order_no;
		swhList.push(obj);
	});
	return swhList;
}

function ajaxUpdate(datalist,conditions,whflag,ecnTaskId,taskStaus,rejectReason) {
	$.ajax({
		url : "verifyWorkHourInfo",
		dataType : "json",
		async:false,
		type : "post",
		data : {
			"conditions" : datalist,
			"whflag":whflag
		},
		success : function(response) {
			if (response.success) {
				// TODO 批准、驳回时重新计算技改工资 
				ajaxCaculateSalary(conditions);
				$("#dialog-edit").dialog( "close" );
				$("#dialog-reason").dialog( "close" );
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>操作成功！</h5>',
					class_name: 'gritter-info'
				});
				ajaxQuery();
				
			}
		}
	});
}

//批准、驳回时重新计算技改工资
function ajaxCaculateSalary(conditions) {
	$.ajax({
		url : "caculateSalary",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				
			} else {
				alert(response.message);
			}

		}
	});
}

function ajaxGetStaffWorkHours(conditions){
	var swhlist;
	$.ajax({
		url : "getStaffWorkHours",
		dataType : "json",
		async:false,
		type : "get",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			swhlist = response.data;
		}
	});
	return swhlist;
}

function generateWorkhourTb(swhlist,caculate) {
	ready_hour = 0;
	caculate=caculate||false;
	$("#workhour_list").html("");
	$.each(swhlist, function(index, swh) {
		var tr = $("<tr style='padding:5px'/>");
		if (swh.status=="已锁定") {
			$("<td />").html(swh.status).appendTo(tr);
		} else {
			$("<td />").html("<input type='checkbox' >").appendTo(tr);
		}
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html(swh.work_hour).appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(swh.workshop_org).appendTo(tr);
		$("<td />").html(swh.plant_org).appendTo(tr);
		$("<td />").html(swh.work_date).appendTo(tr);
		$("<td />").html(swh.status).appendTo(tr);
		$("#workhour_list").append(tr);
		$(tr).data("id", swh.id);
		$(tr).data("swhindex", index);
		$(tr).data("status", swh.status);
		if(caculate){
			ready_hour += parseFloat(swh.work_hour);
		}
		
	});
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("合计工时：").appendTo(tr);
	$("<td />").html(ready_hour.toFixed(2)).appendTo(tr);
	
	$("#workhour_list").append(tr);
}

function queryWorkshopList(){
	$("#edit_workshop_search").empty();
	$.ajax({
		url:"/BMS/common/getWorkshopSelect",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {alert(response.message)},
		success : function(response) {
			var strs ="";
			$.each(response.data, function(index, value) {
				strs += "<option value=" + value.name + ">" + value.name + "</option>";
			});
			$("#edit_workshop_search").append(strs);
		}
	});
}

