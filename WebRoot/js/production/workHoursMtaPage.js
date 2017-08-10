var pageSize=1;
var table;
var table_height = $(window).height()-270;
var cur_tmpOrderId = 0;
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
var status_arr = {"0" : "已创建","2" : "已分配","3" : "已评估","5" : "已完成","6" : "已驳回"};
var wh_status_arr={'0':'已维护','1':'已审批','2':'已驳回','3':'已锁定'};
var edit_list = [];
var ready_hour = 0;

$(document).ready(function () {	
	initPage();
	
	function initPage(){
		$("#status").val("3");
		getFactorySelect("production/workHoursMtaPage",'',"#q_factory",null,'id');
		getWorkshopSelect("production/workHoursMtaPage",$("#q_factory :selected").text(),"","#q_workshop",null,"id");
	}
	
	$("#q_factory").change(function() {
		getWorkshopSelect("production/workHoursMtaPage",$("#q_factory :selected").text(),"","#q_workshop",null,"id");
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#group").change(function() {
		getChildOrgSelect("#subgroup", $("#group").val(), "", "empty");
	});
	
	$("#subgroup").change(function() {
		var factory = $("#factory").val();
		var workshop = $("#workshop").val();
		var workgroup = $("#group").find("option:selected").text();
		var subgroup = $("#subgroup").find("option:selected").text();
		console.log(factory + "|" + workshop + "|" + workgroup + "|" + subgroup);
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			async : false,
			url : "../common/getStaffInfo",
			data : {
				"factory" : factory,
				"workshop" : workshop,
				"workgroup" : workgroup,
				"subgroup" : subgroup
			},
			success : function(response) {
				var list = response.data;
				$("#tb_workhour").html("");
				$.each(list, function(index, staff) {
					
					addWorkHourItem(staff.id,staff.staff_number,
							staff.name, staff.job, "",
							staff.team_org,
							staff.workgroup_org,
							staff.workshop_org,
							staff.plant_org,staff.skill_parameter)
				});
			}
		})
		
	});
	
	$("#addWorkhour").on("click", function() {
		if($("#mta_wdate").val().trim()==""){
			alert("请选择操作日期！");
		}else{
			addWorkHourItem();
		}
	});
	
	$("#btnSwhQuery").click (function () {
		var staffNum = $("#edit_cardNumber").val();
		var workDate = $("#edit_workDate").val();
		var tmpOrderId = cur_tmpOrderId;
		var conditions = "{staffNum:'" + staffNum + "',workDate:'" + workDate + "',temp_order_id:" + tmpOrderId + "'}";
		console.log("-->conditions = " + conditions);
		var swhlist = ajaxGetStaffWorkHours(conditions);
		generateWorkhourTb(swhlist);
	});
	
});

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:true,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,scrollCollapse: true, scrollXInner: "150%",
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
			var orderNo = $('#tmp_order_no').val();
			var applyDateStart = $('#start_date').val();
			var applyDateEnd = $('#end_date').val();
			var status = $('#status').val();
			var factory = $("#q_factory :selected").text();
			var workshopAll = "";
			$("#q_workshop option").each(function() {
				if($(this).text()!=="全部") workshopAll += $(this).text() + ",";
			});
			var workshop = $("#q_workshop :selected").text() == "全部" ? workshopAll : $("#q_workshop :selected").text();
			var conditions = "{orderNo:'" + orderNo + "',applyDateStart:'"
			+ applyDateStart + "',applyDateEnd:'" + applyDateEnd + "',status:'"
			+ status + "',factory:'" + factory + "',workshop:'" + workshop
			+ "'}";
			console.log('-->conditions = ' + conditions);
			
			$.ajax({
                type: "post",
                url: "getTmpOrderList",
                cache: false,  //禁用缓存
                data: {"conditions":conditions},  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
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
                }
            });
		},
		columns: [
		            {"title":"派工流水号",width:'150',"class":"center","data":"order_serial_no","defaultContent": ""},
		            {"title":"工单号",width:'100',"class":"center","data":"sap_order","defaultContent": ""},
		            {"title":"作业原因/内容",width:'200',"class":"center","data":"reason_content","defaultContent": ""},
		            {"title":"总数量",width:'100',"class":"center","data":"total_qty","defaultContent": ""},
		            {"title":"已完成数量",width:'100',"class":"center","data":"finished_qty","defaultContent": "0"},
		            {"title":"产量",width:'50',"class":"center","data":"totalQty","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		//0 已维护 1 已审批 2 驳回 3 锁定
		            		var totalQty = row.total_qty == undefined ? "": row.total_qty;
		            		var readyQty = row.finished_qty == undefined ? 0: row.finished_qty;
		            		if (totalQty!=readyQty && (row.status =='2' || row.status=='1')){
		            			return "<input class='productQty' id=\"prdqty_"
								+ row.tmp_order_no
								+ "\" style=\"border:1;width:30px;text-align:center;font-size: 12px\" />"
		            		}
		            	},
		            },
		            {"title":"工时",width:'50',"class":"center","data":"singleHour","defaultContent": ""},
		            {"title":"所需人力",width:'100',"class":"center","data":"labors","defaultContent": ""},
		            {"title":"总工时",width:'100',"class":"center","data":"-","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		var totalHour = parseFloat(row.single_hour)*parseFloat(row.total_qty);
		            		return totalHour.toFixed(2);
		            	},
		            },
		            {"title":"录入总工时",width:'100',"class":"center","data":"-","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		var workhourTotal=row.workhour_total==undefined?0:row.workhour_total;
		            		return workhourTotal.toFixed(2);
		            	},
		            },
		            {"title":"申请人",width:'100',"class":"center","data":"applier_name","defaultContent": ""},
		            {"title":"申请时间",width:'100',"class":"center","data":"apply_date","defaultContent": ""},
		            {"title":"状态",width:'100',"class":"center","data":"status","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return status_arr[data];
		            	},
		            },
		            {"title":"操作",width:'100',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-plus bigger-130 showbus\" title=\"维护\" onclick='addWorkTime(\"" + row['id'] + "\",\"" + row['tmp_order_no'] + "\",\""+ row['reason_content'] +"\",\""+ row['total_qty'] +"\",\""+ row['finished_qty'] +"\",\""+ row['workhour_total'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;" + 
		            		"<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editWorkTime(\"" + row['id'] + "\",\"" + row['tmp_order_no'] + "\",\""+ row['reason_content'] +"\",\""+ row['total_qty'] +"\",\""+ row['finished_qty'] +"\",\""+ row['workhour_total'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\")' style='color:blue;cursor: pointer;'></i>";
		            	},
		            }
		          ],
	});
	
}

function editWorkTime(id,tmp_order_no,reason_content,total_qty,finished_qty,workhour_total,factory,workshop,tech_list){
	$("#edit_orderNo").html(tmp_order_no);
	$("#edit_reason").html(reason_content);
	var conditions = "{temp_order_id:'" + id + "'}";
	var response = ajaxGetStaffWorkHours(conditions)
	var swhlist = response;
	generateWorkhourTb(swhlist, true);
	cur_tmpOrderId = id;
	edit_list = [];
	$("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 额外工时修改</h4></div>',
		title_html: true,
		width:'820px',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
					text: "删除",
					id:"btn_del",
					"class" : "btn btn-info btn-minier",
					click: function() {
						btnDelConfirm();
					} 
				},
				{
					text: "保存",
					id:"btn_ok",
					"class" : "btn btn-success btn-minier",
					click: function() {
						btnEditConfirm();
					} 
				}
			]
	});
}

function btnEditConfirm(){
	if (edit_list.length > 0) {
		ajaxUpdate(JSON.stringify(edit_list));
	} else {
		alert("无数据更改！");
	}
}

function ajaxUpdate(conditions){
	$.ajax({
		url : "updateStaffTmpHourInfo",
		dataType : "json",
		type : "get",
		data : {
			"conditions" : conditions,
			"whflag" : 'update',
			"tempOrderId":cur_tmpOrderId
		},
		success : function(response) {
			if (response.success) {
				$("#dialog-edit").dialog( "close" );
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>操作成功！</h5>',
					class_name: 'gritter-info'
				});
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
	
}

function btnDelConfirm(){
	var boxList=$("#workhour_list :checked");
	var swhList=[];
	var deltrlist=[];
	$.each(boxList,function(index,box){
		var obj={};
		var tr=$(box).closest("tr");
		var swhid=$(tr).data("id");
		obj.id=swhid;
		swhList.push(obj);
		deltrlist.push(tr);
	});
	
	if(swhList.length==0){
		alert("请选择需要删除的工时信息！");
	}else{
		$.ajax({
			url : "deleteStaffTmpHourInfo",
			dataType : "json",
			type : "post",
			data : {
				"conditions" : JSON.stringify(swhList)
			},
			success : function(response) {
				if (response.success) {
					$("#dialog-edit").dialog( "close" );
					$.gritter.add({
						title: '系统提示：',
						text: '<h5>操作成功！</h5>',
						class_name: 'gritter-info'
					});
					ajaxQuery();
				} else {
					alert(response.message);
				}
			}
		});
	}
	
}

function addWorkTime(id,tmp_order_no,reason_content,total_qty,finished_qty,workhour_total,factory,workshop,tech_list){
	$("#orderNo").html(tmp_order_no);
	$("#reason").html(reason_content);
	$("#factory").val(factory);
	$("#workshop").val(workshop);
	$("#group").val('');
	$("#subgroup").val('');
	$("#tb_workhour").html("");
	getChildOrgSelect("#group",$("#q_workshop :selected").attr('org_id'), "","empty");
	
	
	$("#dialog-add").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 额外工时维护</h4></div>',
		title_html: true,
		width:'750px',
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
						btnAddConfirm(id);
					} 
				}
			]
	});
}

function btnAddConfirm(id){
	var inputlist = $("#table_workhour input[class='input-small card_num']");
	var saveFlag = true;
	var stafflist = [];
	var factory = $("#factory").val();
	var workshop = $("#workshop").val();
	var workgroup = $("#group option:selected").text() == "请选择" ? "" : $("#group option:selected").text();
	var team = $("#subgroup option:selected").text() == "请选择" ? "" : $("#subgroup option:selected").text();
	var subgroupId = $("#subgroup").val() == '' ? '0': $("#subgroup").val();
	var groupId = $("#group").val() == '' ? '0': $("#group").val();
	var workshopId = $("#q_workshop :selected").attr('org_id');
	var workDate = $("#mta_wdate").val();
	if (workDate == null || workDate.trim().length == 0) {
		alert("请输入操作日期");
		return false;
	}
	if(checkSalarySubmit(factory,workshop,workDate.substring(0,7))=='true'){
		alert("车间工资已提交/结算，不允许再维护工时信息！");
		return false;
	}
	
	$.each(inputlist,function(index,input) {
		var tr = $(input).closest("tr");
		var staff_number = $(input).val();
		var workHour = $(tr).find(".work_hour").val();
		var skillParameter = $(tr).data("skill_parameter");
		
		if (staff_number != undefined && staff_number.trim().length > 0) {
			var staff = {};
			staff.orderId = $(tr).data("id");
			staff.tempOrderId = $("#mtaModal").data("orderId");
			staff.workDate = workDate;
			staff.staff_number = staff_number;
			staff.temp_order_id = id;
			if (workshopId != '0') {
				staff.subgroupId = workshopId
			}
			if (groupId != '0') {
				staff.subgroupId = groupId
			}
			if (subgroupId != '0') {
				staff.subgroupId = subgroupId
			}
			staff.factory = factory;
			//staff.dept = dept;
			staff.workshop = workshop;
			staff.workgroup = workgroup;
			staff.team = team;
			staff.workHour = workHour;
			staff.skillParameter = skillParameter;
			if (!isContain(staff,stafflist)) {
				stafflist.push(staff);
			} else {
				saveFlag = false;
				alert("不能重复维护工时！");
				return false;
			}
		}
		
		if (workHour == ''|| workHour.trim().length == 0) {
			saveFlag = false;
			alert("额外工时不能为空！");
			return false;
		}
		var staffNum = $(input).val();
		if (staffNum.trim().length == 0) {
			alert("工号不能为空！");
			saveFlag = false;
			return false;
		}
		
		var conditions = "{staffNum:'" + staffNum + "',workDate:'" + $("#mta_wdate").val()
			+ "',temp_order_id:" + id + "}";
		console.log("-->conditions = " + conditions);
		var sfwlist = ajaxGetStaffWorkHours(conditions);
		if (sfwlist.length > 0) {
			saveFlag = false;
			alert("不能重复维护工时！");
			return false;
		}
		
	});
	
	if (saveFlag && stafflist.length > 0) {
		ajaxSave(JSON.stringify(stafflist));	
	}
	
}

function ajaxSave(conditions) {
	$.ajax({
		url : "saveWorkHourInfo",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				$("#dialog-add").dialog( "close" );
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>操作成功！</h5>',
					class_name: 'gritter-info'
				});
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
}

function generateWorkhourTb(swhlist, caculate) {
	$("#checkall").attr("checked", false);
	caculate = caculate || false;
	var ready = 0;
	$("#workhour_list").html("");
	$.each(swhlist,function(index, swh) {
		var tr = $("<tr style='padding:5px'/>");
		var workhour = swh.work_hour == undefined ? "": swh.work_hour;
		if (swh.status == "已驳回") {
			$("<td />").html("<input type='checkbox' >").appendTo(tr);
		} else {
			$("<td />").html("").appendTo(tr);
		}
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		var disabled = (swh.status != '已驳回') ? 'disabled': "";
		$("<td />").html("<input class='input-small edit_work_hour' "+ disabled
								+ " onchange=\"checkEditWorkHours(this)\" style='text-align:center;margin-bottom: 0px;' type='text' value='"
								+ workhour + "' old_value='" + workhour + "'>").appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(swh.workshop_org).appendTo(tr);
		$("<td />").html(swh.plant_org).appendTo(tr);
		$("<td />").html(swh.status).appendTo(tr);
		$("<td />").html(swh.work_date).appendTo(tr);
		$("#workhour_list").append(tr);
		$(tr).data("id", swh.id);
		if (caculate) {
			var h = isNaN(parseFloat(swh.work_hour)) ? 0 : parseFloat(swh.work_hour);
			ready += h;
		}
	});
	ready_hour = ready.toFixed(2);
}

function checkEditWorkHours(obj){
	var pre_submit_val = isNaN(parseFloat($(obj).attr("old_value"))) ? 0: parseFloat($(obj).attr("old_value"));
	var submit_val = parseFloat($(obj).val());
	//var limit_total_hour = isNaN(parseFloat($("#editModal").data("totalHour"))) ? 0: parseFloat($("#editModal").data("totalHour"));
	if (!re_f.test($(obj).val())&&$(obj).val()!="") {
		$(obj).val(pre_submit_val);
		alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
	}else{
		var edit_obj = {};
		edit_obj.id = $(obj).closest("tr").data("id");
		edit_obj.workHour = submit_val;
		edit_list.push(edit_obj);
		console.log("-->id = " + $(obj).closest("tr").data("id"));
	}
	
}

function addWorkHourItem(staffId,cardNo, staffName, staffPost, workHour, subgroup,group, workshop, factory,skillParameter) {
	cardNo = cardNo || "";
	cardNoDisabled = "";
	if (cardNo.trim().length > 0) {
		cardNoDisabled = "disabled";
	}
	workHour = workHour || "";
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("<button type=\"button\" class=\"close\" onclick=\"close_tr(this)\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>").appendTo(tr);
	$("<td />").html("<input class='input-small card_num' onchange=\"addStaffInfo(this)\" style='text-align:center;margin-bottom: 0px;' type='text' value='"
					+ cardNo + "' staffId='"+staffId+"' " + cardNoDisabled + ">").appendTo(tr);
	$("<td class='staff_name' />").html(staffName).appendTo(tr);
	$("<td class='staff_post' />").html(staffPost).appendTo(tr);
	$("<td />").html("<input class='input-small work_hour' onchange=\"checkWorkHours(this)\" style='text-align:center;margin-bottom: 0px;' type='text' value="+ workHour + " >").appendTo(tr);
	$("<td class='staff_subgroup' />").html(subgroup).appendTo(tr);
	$("<td class='staff_group' />").html(group).appendTo(tr);
	$("<td class='staff_workshop' />").html(workshop).appendTo(tr);
	$("<td class='staff_factory' />").html(factory).appendTo(tr);
	$(tr).data("skill_parameter",skillParameter)
	$("#tb_workhour").append(tr);
}

function close_tr(obj){
	$(obj).closest("tr").remove();
}

function checkWorkHours(obj){
	var total_hour=0;
	var hour = $(obj).val();
	
	 if (!re_f.test(hour)&&hour!="") {
		$(obj).val("");
		alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
	}
}

function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "getStaffTmpHours",
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

function addStaffInfo(obj){
	console.log("-->addStaffInfo");
	//var cardNumInput = $(e.target);
	var tr = $(obj).closest("tr");
	$(tr).find(".staff_name").html("");
	$(tr).find(".staff_post").html("");
	$(tr).find(".staff_subgroup").html("");
	$(tr).find(".staff_group").html("");
	$(tr).find(".staff_workshop").html("");
	$(tr).find(".staff_factory").html("");
	var staff = getStaffInfo($(obj).val());
	//console.log("-->staff = " + staff);
	if (staff == undefined || staff == null) {
		alert("请输入有效员工号！");
		$(obj).val("");
	} else {
		$(obj).attr("staffId",staff.id);
		$(tr).find(".staff_name").html(staff.name);
		$(tr).find(".staff_post").html(staff.job);
		$(tr).find(".staff_subgroup").html(staff.team_org);
		$(tr).find(".staff_group").html(staff.workgroup_org);
		$(tr).find(".staff_workshop").html(staff.workshop_org);
		$(tr).find(".staff_factory").html(staff.plant_org);
		$(tr).data("skill_parameter",staff.skill_parameter)
	}
}

