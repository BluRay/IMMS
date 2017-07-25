var pageSize=1;
var table;
var table_height = $(window).height()-270;
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
var model_task_detail_id = 0;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("tech/worktimeMaintain",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("tech/worktimeMaintain",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		ajaxQuery();
	}
	
	$("#search_factory").change(function() {
		getWorkshopSelect("tech/worktimeMaintain",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#group").change(function() {
		getChildOrgSelect("#subgroup", $("#group").val(), "", "empty");
	});
	
	$("#addWorkhour").on("click", function() {
		if($("#mta_wdate").val().trim()==""){
			alert("请选择操作日期！");
		}else{
			addWorkHourItem();
		}
	});
	
	$("#subgroup").change(function() {
		var factory = $("#factory").find("option:selected").text();
		var workshop = $("#workshop").find("option:selected").text();
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
	
});



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

function checkWorkHours(obj){
	var total_hour=0;
	var hour = $(obj).val();
	
	 if (!re_f.test(hour)&&hour!="") {
		$(obj).val("");
		alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
	}
}

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
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
		            {"title":"技改任务",width:'120',"class":"center","data":"task_content","defaultContent": ""},
		            {"title":"变更单类型",width:'60',"class":"center","data":"tech_order_type","defaultContent": ""},
		            {"title":"技改单号",width:'80',"class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"变更单附件",width:'60',"class":"center","data":"tech_order_file","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if(data!=''&& data!=null){
								return "<a href=\""+data+"\" target='_blank'>"+"查看"+"</a>";
							}	
		            	},
		            },
		            {"title":"技改单日期",width:'60',"class":"center","data":"tech_date","defaultContent": ""},
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
		            {"title":"订单",width:'60',"class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"工厂",width:'60',"class":"center","data":"factory","defaultContent": ""},
		            {"title":"车间",width:'60',"class":"center","data":"workshop","defaultContent": ""},
		            {"title":"分配工时",width:'60',"class":"center","data":"tech_time","defaultContent": ""},
		            {"title":"技改台数",width:'60',"class":"center","data":"tech_num","defaultContent": ""},
		            {"title":"完成台数",width:'60',"class":"center","data":"follow_num","defaultContent": ""},
		            {"title":"已录入工时",width:'60',"class":"center","data":"ready_hour","defaultContent": ""},
		            {"title":"车号信息",width:'60',"class":"center","data":"-","defaultContent": ""},
		            {"title":"成本可否转移",width:'80',"class":"center","data":"order_desc","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return row.tech_order_type=='ECN'?'否':'是';
		            	},
		            },
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='addWorkTime(\"" + row['order_no'] + "\",\""+ row['tech_order_no'] +"\",\""+ row['task_content'] +"\",\""+ row['task_detail_id'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
}

function addWorkTime(order_no,tech_order_no,task_content,task_detail_id,factory,workshop,tech_list){
	console.log(order_no+"|"+task_content+"|"+task_detail_id+"|"+factory+"|"+workshop+"|"+tech_list);
	$("#orderNo").html(tech_order_no);
	$("#task").html(task_content);
	$("#factory").val(factory);
	$("#workshop").val(workshop);
	$("#group").val('');
	$("#subgroup").val('');
	$("#tb_workhour").html("");
	//$("#mtaModal").data("ecnTaskId",task_detail_id);
	model_task_detail_id = task_detail_id;
	console.log("-->ecnTaskId = " + model_task_detail_id);
	getChildOrgSelect("#group",$("#search_workshop :selected").attr('org_id'), "","empty");
	
	$("#dialog-add").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 技改工时维护</h4></div>',
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
						btnConfirm();
					} 
				}
			]
	});
}

function btnConfirm(){
	var inputlist = $("#table_workhour input[class='input-small card_num']");
	console.log("-->inputlist.length = " + inputlist.length);
	var saveFlag=true;
	var stafflist = [];
	var factory=$("#factory").val();
	var dept="生产部";
	var workshop=$("#workshop").val();
	//var workgroup=$("#group option:selected").text()=="请选择"?"":$("#group option:selected").text();
	//var team=$("#subgroup option:selected").text()=="请选择"?"":$("#subgroup option:selected").text();
	
	var subgroupId=$("#subgroup").val()==''?'0':$("#subgroup").val();
	var groupId=$("#group").val()==''?'0':$("#group").val();
	var workshopId=$("#search_workshop :selected").attr('org_id');
	var workDate=$("#mta_wdate").val();						
	//console.log(factory + "|" + workshop + "|" + workgroup + "|" +team + "|" +subgroupId + "|" +groupId + "|" +workshopId+ "|" +workDate);
	if(workDate==null||workDate.trim().length==0){
		alert("请输入操作日期！");
		return false;
	}
	if(checkSalarySubmit(factory,workshop,workDate.substring(0,7))=='true'){
		alert("车间工资已提交/结算，不允许再维护工时信息！");
		return false;
	}
	
	var staffNumlist="";
	$.each(inputlist,function(index, input) {
		var tr = $(input).closest("tr");
		var staffId=$(input).attr("staffId");	
		var staff_number=$(input).val();										
		var workHour=$(tr).find(".work_hour").val();
		
		var workgroup = $(tr).find(".staff_group").html();
		var team = $(tr).find(".staff_subgroup").html();
		
		var skillParameter=$(tr).data("skill_parameter");
		if(staffId !=undefined &&staffId.trim().length>0){
			var staff = {};
			staff.orderId = $(tr).data("id");
			staff.ecnTaskId = model_task_detail_id;
			staff.workDate=workDate;
			staff.staff_id=staffId;
			staff.staff_number=staff_number;
			if(workshopId!='0'){
				staff.subgroupId=workshopId
			}
			if(groupId!='0'){
				staff.subgroupId=groupId
			}
			if(subgroupId!='0'){
				staff.subgroupId=subgroupId
			}
			staff.factory=factory;
			staff.dept=dept;
			staff.workshop=workshop;
			staff.workgroup=workgroup;
			staff.team=team;
			staff.workHour=workHour;
			staff.skillParameter=skillParameter;
			console.log("staff_number = " , staff.staff_number);;
			if(!isContain(staff,stafflist)){
				stafflist.push(staff);
			}else{
				saveFlag=false;
				alert("不能重复维护工时！");
				return false;
			}			
		}
		if(workHour==''||workHour.trim().length==0){
			saveFlag=false;
			alert("技改工时不能为空！");
			return false;
		}
		var staffNum=$(input).val();
		if(staffNum.trim().length==0){
			alert("工号不能为空！");
			saveFlag=false;
			return false;
		}
		var staffNum = $(input).val();	
		staffNumlist+=staffNum+","	
	});
	
	console.log("-->staffNumlist = " + staffNumlist);
	console.log("-->stafflist = " , stafflist);
	var conditions="{staffNum:'"+staffNumlist+"',workDate:'"+
	$("#mta_wdate").val()+"',ecnTaskId:"+model_task_detail_id+"}";
	var sfwlist=ajaxGetStaffWorkHours(conditions);
	if(sfwlist.length>0){
		saveFlag=false;
		alert("不能重复维护工时！！");
		return false;
	}
	if(saveFlag&&stafflist.length>0){
		ajaxSave(JSON.stringify(stafflist));
	}
}

function ajaxSave(conditions) {
	console.log("-->ajaxSave conditions = " + conditions);
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

function ajaxGetStaffWorkHours(conditions) {
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

