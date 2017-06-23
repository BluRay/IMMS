var pageSize=1;
var table;
var table_height = $(window).height()-250;
$(document).ready(function(){
	initPage();

	$("#breadcrumbs").resize(function() {
		ajaxQuery();
	});
	
	function initPage(){
		getFactorySelect("quality/problemImprove",'',"#search_factory","全部",'id');
		getFactorySelect("quality/problemImprove",'',"#edit_factory","全部",'id');
		getBusType();
		$('#new_fault_pic,#new_8d_report,#new_close_evidenc,#edit_fault_pic,#edit_8d_report,#edit_close_evidenc').ace_file_input({
			no_file:'文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			width:"300px",
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['pdf','PDF'],
		}).on('file.error.ace', function(event, info) {
			alert("请上传正确的文件!");
			return false;
	    });
	}
	
	$('#new_factory').change(function(){ 
		getWorkshopSelect("quality/problemImprove",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
	});
	$('#edit_factory').change(function(){ 
		getWorkshopSelect("quality/problemImprove",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnAdd").on('click', function(e) {
		getFactorySelect("quality/processFault",'',"#new_factory",null,'id');
		getWorkshopSelect("quality/processFault",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加问题改善</h4></div>',
			title_html: true,
			width:'600px',
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
							btnNewConfirm();
						} 
					}
				]
		});
	});
	
});

function editProblemImprove(id){
	$(".div-dialog input").prop("disabled",false);  
    $(".div-dialog select").prop("disabled",false);  

	getWorkshopSelect("quality/processFault",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
    $.ajax({
		url: "showProblemImprove",
		dataType: "json",
		data: {"id":id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			$("#edit_fault_description").val(response.data.fault_description);
			$("#edit_factory").val(response.data.factory_id);
			$("#edit_workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
			
			
		}
    });
    
    $("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑问题改善</h4></div>',
		title_html: true,
		width:'550px',
		modal: true,
		buttons: [{
					text: "关闭",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},{
					text: "保存",
					id:"btn_ok",
					"class" : "btn btn-success btn-minier",
					click: function() {
						btnEditConfirm(id);
					} 
				}
			]
	});
}

function btnNewConfirm(){
	if($("#new_fault_description").val()==''){
		alert("请输入问题描述！");$("#new_fault_description").focus();return false;
	}
	if($("#new_vin").val()==''){
		alert("请输入VIN号！");$("#new_vin").focus();return false;
	}
	if($("#new_license_number").val()==''){
		alert("请输入车牌号码！");$("#new_license_number").focus();return false;
	}
	if($("#new_fault_mils").val()==''){
		alert("请输入行驶里程！");$("#new_fault_mils").focus();return false;
	}
	var is_closed = 0;
	if ($("#new_is_closed").get(0).checked) {
		is_closed = 1;
	}
	console.log("-->is_closed = " + is_closed);
	$('#form_add').ajaxSubmit({
		url: "addProblemImprove",
		dataType : "json",
		type : "post",
	    data: {
	    	"new_fault_description":$("#new_fault_description").val(),
	    	"new_factory":$("#new_factory").val(),
	    	"new_workshop":$("#new_workshop").val(),
	    	"new_bus_type":$("#new_bus_type").val(),
	    	"new_vin":$("#new_vin").val(),
	    	"new_license_number":$("#new_license_number").val(),
	    	"new_fault_mils":$("#new_fault_mils").val(),
	    	"new_fault_phenomenon":$("#new_fault_phenomenon").val(),
	    	"new_fault_level_id":$("#new_fault_level_id").val(),
	    	"new_fault_reason":$("#new_fault_reason").val(),
	    	"new_risk_evaluate":$("#new_risk_evaluate").val(),
	    	"new_keystone_attention":$("#new_keystone_attention").val(),
	    	"new_resolve_method":$("#new_resolve_method").val(),
	    	"new_resolve_date":$("#new_resolve_date").val(),
	    	"new_memo":$("#new_memo").val(),
	    	"new_is_closed":is_closed
	    },
		async: false,
	    success:function (response) {
	    	if (response.success) {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-add" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增失败！</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
	
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
				"orderColumn":"id",
				"factory_id" : $("#search_factory").val(),
				"bus_type" : $("#search_bus_type").val(),
				"vin" : $("#search_vin").val(),
				"fault_description" : $("#search_fault_description").val(),
				"is_closed" : $("#search_is_closed").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getProblemImproveList",
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
		            {"title":"问题描述",width:'150',"class":"center","data":"fault_description","defaultContent": ""},
		            {"title":"责任工厂",width:'80',"class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"责任车间",width:'80',"class":"center","data":"response_workshop","defaultContent": ""},
		            {"title":"车型",width:'50',"class":"center","data":"bus_type","defaultContent": ""},
		            {"title":"VIN号",width:'80',"class":"center","data":"vin","defaultContent": ""},
		            {"title":"车牌号码",width:'90',"class":"center","data":"license_number","defaultContent": ""},
		            {"title":"故障里程",width:'80',"class":"center","data":"fault_mils","defaultContent": ""},
		            {"title":"故障现象",width:'150',"class":"center","data":"fault_phenomenon","defaultContent": ""},
		            {"title":"解决方法",width:'150',"class":"center","data":"resolve_method","defaultContent": ""},
		            {"title":"处理时间",width:'100',"class":"center","data":"resolve_date","defaultContent": ""},
		            {"title":"状态",width:'60',"class":"center","data":"is_closed","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return (data == "0")?"未关闭":"已关闭";
		            	}
		            },
		            {"title":"维护人",width:'60',"class":"center","data":"display_name","defaultContent": ""},
		            {"title":"维护时间",width:'150',"class":"center","data":"edit_date","defaultContent": ""},
		            {"title":"操作",width:'80',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"查看\" onclick='showProblemImprove(" 
		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>" + 
		            		"&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editProblemImprove(" 
		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
	
}

function getBusType(){
	$("#search_bus_type").empty();
	$("#new_bus_type").empty();
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
		    $("#search_bus_type").append("<option value=''>全部</option>" + strs);
		    $("#new_bus_type").append(strs);
		}
	})
}