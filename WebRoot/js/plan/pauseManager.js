var lineStr = '';
var pageSize=1;
var table;
var table_height = $(window).height()-270;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/pauseManager",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("plan/pauseManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getReasonTypeSelect();
		getKeysSelect("EXCEPTION_RESPONSIBILITY_DEPARTMENT", "", "#edit_dep_id","noall","value");
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/pauseManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnAdd").on('click', function(e) {
		lineStr = '';$('#line_str').val(lineStr);
		$("#A").removeAttr("checked");$("#B").removeAttr("checked");
		getFactorySelect("plan/pauseManager",'',"#new_factory",null,'id');
		getWorkshopSelect("plan/pauseManager",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		getKeysSelect("EXCEPTION_RESPONSIBILITY_DEPARTMENT", "", "#new_dep_id","noall","value");
		getBusType();
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加停线</h4></div>',
			title_html: true,
			width:'550px',
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "增加",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							btnNewPauseConfirm();
							$( this ).dialog( "close" );
							ajaxQuery();
						} 
					}
				]
		});
	});
	
	function btnNewPauseConfirm(){
		var mailTo=$("#new_pause_email_send").val();
		var cc=$("#new_pause_email_cc").val();		
		if($("#line_str").val()==""){
			alert("请选择线别！");
			return false;
		}
		if($("#new_pause_date_start").val()==""){
			alert("请选择开始时间！");
			return false;
		}
		if($("#new_pause_date_end").val()==""){
			alert("请选择结束时间！");
			return false;
		}
		if($("#new_human_lossed").val()==""){
			alert("请填写浪费人数！");
			return false;
		}
		var pauseTime=getPauseMin($("#new_pause_date_start").val(),$("#new_pause_date_end").val(),'H');
		console.log('---->pauseTime = ' + pauseTime);
		if(pauseTime<parseFloat($("#new_ppause_time").val())){
			alert("输入的停线时长不能超出预计停线时长！");
			return false;
		}
		if(isNaN($("#new_human_lossed").val())){
			alert("浪费人数必需为数字！");
			$("#new_human_lossed").focus();
			return false;
		}
		var error_mail=validateEmail(mailTo.split(";"));
		if(error_mail.trim().length>0){
			alert("收件人中"+error_mail+"不是有效邮箱地址！")
			return false;
		}
		var error_mail=validateEmail(cc.split(";"));
		if(error_mail.trim().length>0){
			alert("CC中"+error_mail+"不是有效邮箱地址！")
			return false;
		}
		
		$.ajax({
			url: "addPause",
			dataType: "json",
			data: {
				"factory_id" : $('#new_factory').val(),
				"workshop_id" : $('#new_workshop').val(),
				"lines" : $('#line_str').val(),
				"pause_date_start" : $('#new_pause_date_start').val(),
				"pause_date_end" : $('#new_pause_date_end').val(),
				"detailed_reason" : $('#new_reason_detailed').val(),
				"reason_type_id":$('#new_reason_type').val(),
				"bus_type_id" : $("#new_bus_type").val(),
				"duty_department_id" : $("#new_dep_id :selected").attr('keyvalue'),
				"waste_num" : $("#new_human_lossed").val(),
				"capacity" : $("#new_capacity").val(),
				"memo" : $("#new_memo").val(),
				"email_send" : $("#new_pause_email_send").val(),
				"order_list": $("#new_order_list").val(),
				//"orderDesc":orderDescList.join("<br />"),
				"pause_hours":$("#new_pause_hours").val()
				},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>增加成功！</h5>',
					class_name: 'gritter-info'
				});
			}
		});
		
		
	}
	
	function getReasonTypeSelect() {
		$("#search_reason_type").empty();
		$("#new_reason_type").empty();
		$("#edit_reason_type").empty();
		$.ajax({
			url : "../common/getReasonTypeSelect",
			dataType : "json",
			data : {},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				var strs = "";
			    $("#search_reason").html("<option value=\'\'>全部</option>");
			    $.each(response.data, function(index, value) {
			    	strs += "<option value=" + value.value + ">" + value.key_name + "</option>";
			    });
			    $("#search_reason").append(strs);
			    $("#new_reason_type").append(strs);
			    $("#edit_reason_type").append(strs);
			}
		});
	}
	
	
});

function checkLine(t){
	if($(t).prop("checked")){
		lineStr += $(t).attr('id') + ',' ;
	}else{
		var uncheck = $(t).attr('id') + ',';
		lineStr = lineStr.replace(uncheck,'');
	}
	$('#line_str').val(lineStr);
}

function validateEmail(maillist){
	var mailaddr="";
	$.each(maillist,function(i,mail){
		if(!const_email_validate.test(mail)){
			mailaddr=mail;
			return false;
		}
	});
	return mailaddr;
}

function getBusType(){
	$("#new_bus_type").empty();$("#edit_bus_type").empty();
	$.ajax({
		url: "../common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			var strs = "";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.code + ">" + value.name + "</option>";
		    });
		    $("#new_bus_type").append(strs);$("#edit_bus_type").append(strs);
		}
	})
}
function getPauseMin(start_time,end_time,unit){
	if((start_time == "")||(start_time == null)) return 0;
	var data2;
	if((end_time == "")||(end_time == null)){
		date2=new Date();
	}else{
		date2=new Date(end_time.replace("-","/").replace("-","/") + ":00");
	}
	var date1=new Date(start_time.replace("-","/").replace("-","/") + ":00");
	var date3=date2.getTime()-date1.getTime();
	if(unit=='H'){
		return (date3/1000/3600).toFixed(2) ;
	}
	if(unit=='Min'){
		return (date3/1000/60).toFixed(2) ;
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
			var param ={
				"draw":1,
				"factory_id": $('#search_factory').val(),
		    	"workshop_id": $('#search_workshop').val(),
		    	"line": $('#search_line').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"reason_type": $('#search_reason').val(),
		    	"pause_date_start": $('#pause_date_start').val(),
		    	"pause_date_end": $('#pause_date_end').val(),
		    	"resume_date_start": $('#resume_date_start').val(),
		    	"resume_date_end": $('#resume_date_end').val(),
				"orderColumn":"id"
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getPauseList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
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
		            {"title":"生产工厂",width:'80',"class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"生产车间",width:'80',"class":"center","data":"workshop_name","defaultContent": ""},
		            {"title":"生产线别",width:'80',"class":"center","data":"line","defaultContent": ""},
		            {"title":"生产订单",width:'80',"class":"center","data":"order_list","defaultContent": ""},
		            {"title":"停线时间",width:'120',"class":"center","data":"start_time","defaultContent": ""},
		            {"title":"预计恢复时间",width:'120',"class":"center","data":"pend_time","defaultContent": ""},
		            {"title":"实际恢复时间",width:'120',"class":"center","data":"end_time","defaultContent": ""},
		            {"title":"累计停线时间",width:'120',"class":"center","data":"hours","defaultContent": ""},
		            {"title":"停线原因",width:'80',"class":"center","data":"reason_type","defaultContent": ""},
		            {"title":"详细原因",width:'120',"class":"center","data":"detailed_reason","defaultContent": ""},
		            {"title":"责任部门",width:'80',"class":"center","data":"duty_department","defaultContent": ""},
		            {"title":"损失人数",width:'80',"class":"center","data":"human_lossed","defaultContent": ""},
		            {"title":"损失产能",width:'80',"class":"center","data":"capacity_lossed","defaultContent": ""},
		            {"title":"状态",width:'40',"class":"center","data":"","defaultContent": ""},
		            {"title":"录入人",width:'60',"class":"center","data":"create_user","defaultContent": ""},
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editPause(" + row['id'] + ")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
}

function editPause(pause_id){
	getBusType();
	$("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑停线</h4></div>',
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
						btnEditPauseConfirm();
						$( this ).dialog( "close" );
						ajaxQuery();
					} 
				}
			]
	});
	
	$.ajax({
		url : "getPauseList",
		dataType : "json",
		data : {"pause_id":pause_id},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data,function(index,value){
				if(index == 0){
					$("#pause_id").val(value.id);
					$("#edit_order_list").val(value.order_list);
					$("#edit_bus_type").val(value.bus_type);
					$("#edit_reason_type").val(value.reason_type_id);
					$("#edit_dep_id").find("option[keyvalue='"+value.duty_department_id+"']").attr("selected", true);
					$("#edit_pause_date_start").val(value.start_time);
					$("#edit_pause_date_end").val(value.pend_time);
					$("#edit_pause_hours").val(value.hours);
					$("#edit_human_lossed").val(value.human_lossed);
					$("#edit_capacity").val(value.capacity_lossed);
					$("#edit_reason_detailed").val(value.detailed_reason);
					$("#edit_memo").val(value.memo);
					
				}
			});
		}
	});
}

function btnEditPauseConfirm(){
	$.ajax({
		url : "editPauseInfo",
		dataType : "json",
		data : {
			"pause_id":$('#pause_id').val(),
			"edit_bus_type":$('#edit_bus_type').val(),
			"edit_reason_type":$('#edit_reason_type').val(),
			"edit_dep_id":$("#edit_dep_id :selected").attr('keyvalue'),
			"edit_pause_date_start":$('#edit_pause_date_start').val(),
			"edit_pause_date_end":$('#edit_pause_date_end').val(),
			"edit_pause_hours":$('#edit_pause_hours').val(),
			"edit_human_lossed":$('#edit_human_lossed').val(),
			"edit_capacity":$('#edit_capacity').val(),
			"edit_reason_detailed":$('#edit_reason_detailed').val(),
			"edit_memo":$('#edit_memo').val(),
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>保存成功！</h5>',
				class_name: 'gritter-info'
			});
		}
	});
}
