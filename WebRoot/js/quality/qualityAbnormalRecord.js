var pageSize=1;
var table;
var table_height = $(window).height()-180;
var checkMap={ '焊装':'焊装', '涂装':'涂装','底盘':'底盘','总装':'总装'};
$(document).ready(function(){
	initPage();

	$("#breadcrumbs").resize(function() {
		ajaxQuery();
	});

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	function initPage(){
		clear();
		//getBusNumberSelect('#nav-search-input');
		getBusNumberSelect('#search_bus_number');
		getFactorySelect("quality/qualityAbnormalRecord",'',"#search_factory","全部",'id');
		getFactorySelect("quality/qualityAbnormalRecord",'',"#new_factory",null,'id');
		getFactorySelect("quality/qualityAbnormalRecord",'',"#edit_factory","全部",'id');
		var factory_id=$("#default_factory").val();
		$("#new_factory option[value='"+factory_id+"']").prop("selected",true);
		getBusType();
		getOrderNoSelect("#search_order_no","#orderId");
		getKeysSelect("CHECK_NODE", "", "#search_test_node","全部","id");
		getKeysSelect("CHECK_NODE", "", "#new_test_node","请选择","id");
	}
	
	$('#new_factory').change(function(){ 
		getWorkshopSelect("quality/qualityAbnormalRecord",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
	});
	$('#search_factory').change(function(){ 
		getWorkshopSelect("quality/qualityAbnormalRecord",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	});
	$('#edit_factory').change(function(){ 
		getWorkshopSelect("quality/qualityAbnormalRecord",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	});
	$('#new_bug_type').change(function(){
		if($(this).val()==''){
			return false;
		}
		getBugDesc();
	});
	$('#new_bug_desc').change(function(){
		if($(this).val()==''){
			return false;
		}
		getBugLevel();
	});
	
	$("#new_order_no").blur(function(){
		if($(this).val()==''){
			return false;
		}
		//订单选项弹出层没隐藏之前,不触发事件
		if($("#order_no_td .typeahead").css("display")=="block"){
			//alert("不触发事件");
			return false;
		}
		$.ajax({
			url: "../order/getOrderByNo",
			dataType: "json",
			data: {"order_no":$(this).val()},
			async: false,
			error: function () {},
			success: function (response) {
				var data=response.data;
				if(data==null){
					alert("订单编号不存在");
				}else{
					$("#new_order_id").val(data.id);
					$("#new_bus_type option[value='"+data.bus_type_id+"']").prop("selected",true);
				}
			}
	    });
	});
	
//	$("#new_busnumber").blur(function(){
//		if($("#new_busnumber").val()==''){
//			return false;
//		}
//		if($("#new_order_no").val()==''){
//			return false;
//		}
//		if($("#bus_number_td .typeahead").css("display")=="block"){
//			return false;
//		}
//		$.ajax({
//			url: "checkBusNumber",
//			dataType: "json",
//			data: {
//				"bus_number":$(this).val(),
//				"order_no":$("#new_order_no").val()
//			},
//			error: function () {},
//			success: function (response) {
//				if(response.businfo==null){
//					alert("车号不存在");
//				}
//			}
//	    });
//	});
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnAdd").on('click', function(e) {
		clear();
		$('#file').ace_file_input({
			no_file:'请选择要上传的文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['xlsx','xls'],
		}).on('file.error.ace', function(event, info) {
			alert("请选择Excel文件!");
	    });
		getFactorySelect("quality/qualityAbnormalRecord",'',"#new_factory",null,'id');
		getWorkshopSelect("quality/qualityAbnormalRecord",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		getOrderNoSelect("#new_order_no","#orderId");
		getBusNumberSelect('#new_busnumber');
		getBugType();
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 新增品质异常记录</h4></div>',
			title_html: true,
			width:'600px',
			height:520,
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
							btnNewConfirm('0');
						} 
					},
					{
						text: "保存 & 新增",
						id:"btn_ok",
						"class" : "btn btn-info btn-minier",
						click: function() {
							btnNewConfirm('1');
							clear();
						} 
					}
				]
		});
	});
	$("#btnDel").on("click",function(){
		if(!confirm("您确认要要删除吗?")){
			return false;
		}
		ajaxDelete();
	});
});

function btnNewConfirm(flag){
	if($("#new_order_no").val()==''){
		alert("请输入订单编号！");$("#new_order_no").focus();return false;
	}
	if($("#new_test_node").val()==''){
		alert("请选择检验节点！");$("#new_test_node").focus();return false;
	}
	if($("#new_busnumber").val()==''){
		alert("请输入车号！");$("#new_busnumber").focus();return false;
	}
	if($("#new_problem_desc").val()==''){
		alert("请输入问题描述！");$("#new_problem_desc").focus();return false;
	}
	if($("#new_bug_type").val()==''){
		alert("请选择故障类型！");$("#new_bug_type").focus();return false;
	}
	if($("#new_bug_desc").val()==''){
		alert("请选择故障描述！");$("#new_bug_desc").focus();return false;
	}

	$('#addForm').ajaxSubmit({
		url: "addQualityAbnormalRecord",
		dataType : "json",
		type : "post",
	    data: {
	    	"factory":$("#new_factory :selected").text(),
	    	"test_node_id":$("#new_test_node").val(),
	    	"test_node":$("#new_test_node :selected").text(),
	    	"bus_type":$("#new_bus_type :selected").text(),
	    	"bus_number":$("#new_busnumber").val(),
	    	"order_id":$("#new_order_id").val(),
	    	"problem_desc":$("#new_problem_desc").val(),
	    	"level":$("#new_level").val(),
	    	"solution":$("#new_solution").val(),
	    	"iqc":$("#new_iqc").val(),
	    	"remark":$("#new_remark").val(),
	    	"bug_type":$("#new_bug_type").val(),
	    	"bug_desc":$("#new_bug_desc").val(),
	    	"resp_unit":$("#new_resp_unit").val(),
	    },
		async: false,
	    success:function (response) {
	    	
	    	if (response.success) {
	    		
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增成功！</h5>',
					class_name: 'gritter-info'
				});
		    	if(flag=='0'){
		    		clear();
		    		$( "#dialog-add" ).dialog( "close" ); 
		    		ajaxQuery();
		    	}
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>'+response.message+'</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
}

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,fixedColumns:   {
            leftColumns: 0,
            rightColumns:0
        },paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 20,pagingType:"full_numbers",lengthChange:false,
		
	    dom: 'Bfrtip',
		lengthMenu: [
             [ 20, 50, 100, -1 ],
             [ '显示20行', '显示50行', '显示100行', '全部' ]
         ],
         buttons: [
       	     {extend:'excelHtml5',title:'data_export',exportOptions:{orthogonal:'export'},
       	      className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
       	     {extend:'pageLength',text:'显示行'}
       	],
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"order_no":$("#search_order_no").val(),
				"factory" : $("#search_factory :selected").text(),
				"bus_type" : $("#search_bustype").val(),
				"bus_number" : $("#search_bus_number").val(),
				"test_node_id" : $("#search_test_node").val(),
				"iqc" : $("#search_iqc").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getQualityAbnormalRecordList",
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
		            {"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>",width:'50',"class":"center","data":"id","render": function ( data, type, row ) {
	                    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
	                },"defaultContent": ""},
		            {"title":"车号",width:'150',"class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"车型",width:'80',"class":"center","data":"bus_type_code","defaultContent": ""},
		            {"title":"工厂",width:'80',"class":"center","data":"factory","defaultContent": ""},
		            {"title":"检验节点",width:'80',"class":"center","data":"test_node","defaultContent": ""},
		            {"title":"订单",width:'80',"class":"center","data":"order_no","defaultContent": ""},
		            {"title":"问题描述",width:'110',"class":"center","data":"problem_desc","render": function ( data, type, row ) {
		            	if(type == 'export' ){
		            		return data;
		            	}
					    return data.length>10 ? '<div title=\''+data+'\'>'+data.substring(0,10)+'...</div>' : data;
					},"defaultContent": ""},
		            {"title":"责任单位",width:'90',"class":"center","data":"resp_unit","defaultContent": ""},
					{"title":"故障图片",width:'80',"class":"center","data":"problem_photo_path","render": function ( data, type, row ) {
						var result="";
						//var path=$("#urlPath").val();
						if(data != null && data!=''){
							result="<a href='"+data+"' target='_blank'>查看</a>";
						}
						if(type == 'export' ){
		            		return data;
		            	}
						return result;
					},"defaultContent": ""},
		            {"title":"缺陷等级",width:'80',"class":"center","data":"level","defaultContent": ""},
		            {"title":"处理方式",width:'100',"class":"center","data":"solution","render": function ( data, type, row ) {
		            	if(type == 'export' ){
		            		return data;
		            	}
					    return data.length>8 ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : data;
					},"defaultContent": ""},
		            {"title":"检验员",width:'80',"class":"center","data":"iqc","defaultContent": ""},
		            {"title":"备注",width:'60',"class":"center","data":"remark","render": function ( data, type, row ) {
		            	if(type == 'export' ){
		            		return data;
		            	}
					    return data.length>8 ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : data;
					},"defaultContent": ""},
		            {"title":"维护人",width:'70',"class":"center","data":"editor","defaultContent": ""},
		            {"title":"维护时间",width:'120',"class":"center","data":"edit_date","defaultContent": ""},
//		            {"title":"操作",width:'80',"class":"center","data":null,"defaultContent": "",
//		            	"render": function ( data, type, row ) {
//		            		return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"查看\" onclick='showProblemImprove(" 
//		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>" + 
//		            		"&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editProblemImprove(" 
//		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>"
//		            	},
//		            }
		          ],
	});
	$(".dt-buttons").css("margin-top","-50px").css("margin-left","-10px").find("a").css("border","0px");
}

function getBusType(){
	$("#search_bustype").empty();
	$("#new_bus_type").empty();
	$("#edit_bus_type").empty();
	$.ajax({
		url: "../common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {},
		success: function (response) {
			var strs = "";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.id + ">" + value.name + "</option>";
		    });
		    $("#search_bustype").append("<option value=''>全部</option>" + strs);
		    $("#new_bus_type").append(strs);
		    $("#edit_bus_type").append(strs);
		}
	})
}
function getBugType(){
	$("#new_bug_type").empty();
	$.ajax({
		url: "getFaultListFuzzy",
		dataType: "json",
		data: {},
		async: false,
		error: function () {},
		success: function (response) {
			var strs = "<option value=''>全部</option>";
			var map = {};
		    $.each(response.data, function(index, value) {
		    	if (!map.hasOwnProperty(value.bugType)) {  
		    		map[value.bugType]=value.bugType;
		    		strs += "<option value=" + value.bugType + ">" + value.bugType + "</option>";
		    	}
		    });
		    $("#new_bug_type").append(strs);
		}
	})
}
function getBugDesc(){
	$("#new_bug_desc").empty();
	$.ajax({
		url: "getFaultListFuzzy",
		dataType: "json",
		data: {"bug_type":$("#new_bug_type").val()},
		async: false,
		error: function () {},
		success: function (response) {
			var strs = "<option value=''>全部</option>";
			var map = {};
		    $.each(response.data, function(index, value) {
		    	if (!map.hasOwnProperty(value.bug)) {  
		    		map[value.bug]=value.bug;
		    		strs += "<option value=" + value.bug + ">" + value.bug + "</option>";
		    	}
		    });
		    $("#new_bug_desc").append(strs);
		}
	})
}
function getBugLevel(){
	$("#new_level").empty();
	$.ajax({
		url: "getFaultListFuzzy",
		dataType: "json",
		data: {
			"bug_type":$("#new_bug_type").val(),
			"bug":$("#new_bug_desc").val(),
		},
		error: function () {},
		success: function (response) {
			var strs = "";
			var map = {};
		    $.each(response.data, function(index, value) {
		    	if (!map.hasOwnProperty(value.faultLevel)) {  
		    		map[value.faultLevel]=value.faultLevel;
		    		strs += "<option value=" + value.faultLevel + ">" + value.faultLevel + "</option>";
		    	}
		    });
		    $("#new_level").append(strs);
		}
	})
}
//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}
function ajaxDelete(){
	var ids = '';
	$(":checkbox").each(function(){
		if($(this).prop("checked")){
			if($(this).attr('fid')){
				ids += $(this).attr('fid').split('_')[1] + ',';
			}
		}
	});
	if(ids===''){
		$.gritter.add({
			title: '系统提示：',
			text: '<h5>请至少勾选一条记录！</h5>',
			class_name: 'gritter-info'
		});
		return false;
	}
	$.ajax({
	    url: "deleteQualityAbnormalRecord",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ids" : ids.substring(0,ids.length-1)
	    },
	    success:function(response){
	    	if(response.success){
	    	$.gritter.add({
				title: '系统提示：',
				text: '<h5>删除成功！</h5>',
				class_name: 'gritter-info'
			});
	    	
	    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除失败！</h5><br>',
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
}
function clear(){
	$("#new_order_no").val("");
	$("#new_order_id").val("");
    $("#new_busnumber").val("");
    $("#new_problem_desc").val("");
    $("#new_iqc").val("");
    $("#new_solution").val("");
    $("#new_remark").val("");
    $("#new_bug_desc").empty();
    $("#new_level").empty();
    $("#new_resp_unit").val("");
}