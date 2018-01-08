var cur_tab = "01";
var test_card_infos=new Array();
var prod_track_infos=new Array();
var oc_infos=new Array();
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getBusNumberSelect('#search_busnumber');
		getBusNumberSelect('#nav-search-input');
		//默认查询主办Tab
		cur_tab = "01";
		ajaxQuery();
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
//	$("li").on('click',function(e){
//		clear();
//		setTimeout(1000);
//
//		if(this.id == "div1"){
//			//cur_tab = "01";
//			ajaxQuery();
//			ajaxQuery();
//		}else if(this.id == "div2"){	
//			//cur_tab = "02";
//			ajaxQueryTab02();
//		}else{
//			//cur_tab = "03";
//			ajaxQueryTab03();
//		}
//	});
	$("li").click(function(e){
		//clear();
		setTimeout("function(){alert(sleep); return false;}",5000);
		if(this.id == "div1"){
			//cur_tab = "01";
			
			
			ajaxQuery();
		}else if(this.id == "div2"){	
			//cur_tab = "02";
			ajaxQueryTab02();
		}else{
			//cur_tab = "03";
			ajaxQueryTab03();
		}
	});
	
//	$("#btnQuery").click (function () {
//		if($("#search_busnumber").val()==""){
//			alert("请输入车号或VIN号！");
//			return false;
//		}
//		if(cur_tab == "01")ajaxQuery();
//		if(cur_tab == "02")ajaxQueryTab02();
//		if(cur_tab == "03")ajaxQueryTab03();
//	});
	
});

function ajaxQuery(){
	
//	$("#table01").dataTable({
//		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
//		destroy: true,sScrollY: 320,orderMulti:false,
//		pageLength: 20,
//		pagingType:"full_numbers",
//		lengthChange:false,
//		orderMulti:false,
//		language: {
//			emptyTable:"抱歉，未查询到数据！",
//			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
//			infoEmpty:"",
//			paginate: {
//			  first:"首页",
//		      previous: "上一页",
//		      next:"下一页",
//		      last:"尾页",
//		      loadingRecords: "请稍等,加载中...",		     
//			}
//		},
//		fnPreDrawCallback:function(){
//			$(".dataTable").css("width","100%");
//		},
//		ajax:function (data, callback, settings) {
//			var param ={
//				"draw":1,
//				"taskType":'Major'
//			};
//            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
//            param.start = data.start;					//开始的记录序号
//            param.page = (data.start / data.length)+1;	//当前页码
//            $.ajax({
//                type: "post",
//                url: "../task/homeTaskList",
//                cache: false,  //禁用缓存
//                data: param,  //传入组装的参数
//                dataType: "json",
//                success: function (result) {
//                    //console.log(result);
//                	//封装返回数据
//                	var returnData = {};
//                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
//                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
//                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
//                    returnData.data = result.data;//返回的数据列表						//返回的数据列表
//                    //console.log(returnData);
//                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
//                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
//                    callback(returnData);
//                }
//            });
//		},
//		columns: [
//          	{"class":"center","data":"process_Name","defaultContent": ""},
//            {"class":"center","data":"order_No","defaultContent": ""},
//            {"class":"center","data":"order_Create_Time","defaultContent": ""},
//            {"class":"center","data":"task_Name","defaultContent": ""},
//            {"class":"center","data":"task_Create_Time","defaultContent": ""},
//            {"class":"center","data":"","defaultContent": ""},
//        ],
//	});
//	$(".dataTables_scrollHeadInner").html("");
	$.ajax({
	    url: "../task/homeTaskList",
	    dataType: "json",
		type: "post",
	    data: {
	    	"taskType":'Major'
	    },
	    success:function(response){
	    	$("#table01 tbody").html("");
	    	var url=$("#urlPath").val();
	    	$.each(response.data,function (index,value) {
	    		var path=url+(value.instance_Url=='' ? value.action_Url : value.instance_Url );
	    		var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html('<a href='+path+'?processId='+value.process_Id+'&taskId='+value.task_Id+'&orderId='+value.order_Id+'&type=mobile" title="处理">'+value.process_Name+'</a>').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.apply_username).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.department).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_Create_Time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Create_Time).appendTo(tr);
//    			var path=url+(value.instance_Url=='' ? value.action_Url : value.instance_Url );
//    			var str='<a href='+url+'/process/display?processId='+value.process_Id+'&orderId='+value.order_Id+' " class="btnPict" title="查看流程图">查看流程图</a>'+
//				'  <a href='+path+'?processId='+value.process_Id+'&taskId='+value.task_Id+'&orderId='+value.order_Id+' " class="btnEdit" title="处理">处理</a>';
//    			$("<td style=\"text-align:center;padding:3px\" />").html(str).appendTo(tr);
    			$("#table01 tbody").append(tr);
    			url=$("#urlPath").val();
	    	});
	    }
	});
}
function ajaxQueryTab02(){
	
//	$("#table02").dataTable({
//		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
//		destroy: true,sScrollY: 320,orderMulti:false,
//		pageLength: 20,
//		pagingType:"full_numbers",
//		lengthChange:false,
//		orderMulti:false,
//		language: {
//			emptyTable:"抱歉，未查询到数据！",
//			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
//			infoEmpty:"",
//			paginate: {
//			  first:"首页",
//		      previous: "上一页",
//		      next:"下一页",
//		      last:"尾页",
//		      loadingRecords: "请稍等,加载中...",		     
//			}
//		},
//		fnPreDrawCallback:function(){
//			$(".dataTable").css("width","100%");
//		},
//		ajax:function (data, callback, settings) {
//			var param ={
//				"draw":1,
//				"taskType":'Aidant'
//			};
//            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
//            param.start = data.start;					//开始的记录序号
//            param.page = (data.start / data.length)+1;	//当前页码
//            $.ajax({
//                type: "post",
//                url: "../task/homeTaskList",
//                cache: false,  //禁用缓存
//                data: param,  //传入组装的参数
//                dataType: "json",
//                success: function (result) {
//                    //console.log(result);
//                	//封装返回数据
//                	var returnData = {};
//                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
//                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
//                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
//                    returnData.data = result.data;//返回的数据列表						//返回的数据列表
//                    //console.log(returnData);
//                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
//                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
//                    callback(returnData);
//                }
//            });
//		},
//		columns: [
//          	{"title":"流程名称 ","class":"center","data":"process_Name","defaultContent": ""},
//            {"title":"流程编号","class":"center","data":"order_No","defaultContent": ""},
//            {"title":"流程启动时间","class":"center","data":"order_Create_Time","defaultContent": ""},
//            {"title":"任务名称","class":"center","data":"task_Name","defaultContent": ""},
//            {"title":"任务创建时间 ","class":"center","data":"task_Create_Time","defaultContent": ""},
//            {"title":"操作 ","class":"center","data":"","defaultContent": ""},
//        ],
//	});
//	$(".dataTable").css("width","100%");
	$.ajax({
	    url: "../task/homeTaskList",
	    dataType: "json",
		type: "post",
	    data: {
	    	"taskType":'Aidant'
	    },
	    success:function(response){
	    	$("#table02 tbody").html("");
	    	$.each(response.data,function (index,value) {
	    		var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_Name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_No).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_Create_Time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Create_Time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("").appendTo(tr);
    			$("#table02 tbody").append(tr);
	    	});
	    }
	});
}

function ajaxQueryTab03(){
	
//	$("#table03").dataTable({
//		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
//		destroy: true,sScrollY: 320,sScrollX:true,orderMulti:false,
//		pageLength: 20,
//		pagingType:"full_numbers",
//		lengthChange:false,
//		orderMulti:false,
//		language: {
//			emptyTable:"抱歉，未查询到数据！",
//			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
//			infoEmpty:"",
//			paginate: {
//			  first:"首页",
//		      previous: "上一页",
//		      next:"下一页",
//		      last:"尾页",
//		      loadingRecords: "请稍等,加载中...",		     
//			}
//		},
//		fnPreDrawCallback:function(){
//			$(".dataTable").css("width","100%");
//		},
//		ajax:function (data, callback, settings) {
//			var param ={
//				"draw":1,
//				"taskType":'CC'
//			};
//            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
//            param.start = data.start;					//开始的记录序号
//            param.page = (data.start / data.length)+1;	//当前页码
//            $.ajax({
//                type: "post",
//                url: "../task/homeTaskList",
//                cache: false,  //禁用缓存
//                data: param,  //传入组装的参数
//                dataType: "json",
//                success: function (result) {
//                    //console.log(result);
//                	//封装返回数据
//                	var returnData = {};
//                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
//                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
//                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
//                    returnData.data = result.data;//返回的数据列表						//返回的数据列表
//                    //console.log(returnData);
//                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
//                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
//                    callback(returnData);
//                }
//            });
//		},
//		columns: [
//          	{"title":"流程名称 ","class":"center","data":"process_Name","defaultContent": ""},
//            {"title":"流程编号","class":"center","data":"order_No","defaultContent": ""},
//            {"title":"流程启动时间","class":"center","data":"order_Create_Time","defaultContent": ""},
//            {"title":"任务名称","class":"center","data":"task_Name","defaultContent": ""},
//            {"title":"任务创建时间 ","class":"center","data":"task_Create_Time","defaultContent": ""},
//            {"title":"操作 ","class":"center","data":"","defaultContent": ""},
//        ],
//	});
//	
	$.ajax({
	    url: "../task/homeTaskList",
	    dataType: "json",
		type: "post",
	    data: {
	    	"taskType":'CC'
	    },
	    success:function(response){
	    	$("#table03 tbody").html("");
	    	$.each(response.data,function (index,value) {
	    		var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_Name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_No).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_Create_Time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.task_Create_Time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("").appendTo(tr);
    			$("#table03 tbody").append(tr);
	    	});
	    }
	});
}

function clear(){
	$(".dataTable").css("width","100%");
	$('#table01').html("").removeAttr("aria-describedby").removeAttr("role");
	$('#table02').html("").removeAttr("aria-describedby").removeAttr("role");
	$('#table03').html("").removeAttr("aria-describedby").removeAttr("role");
	if($.fn.dataTable.isDataTable("#table01")){
		$('#table01').DataTable().destroy();
		$('#table01').empty();
	}
	if($.fn.dataTable.isDataTable("#table02")){
		$('#table02').DataTable().destroy();
		$('#table02').empty();
	}
	if($.fn.dataTable.isDataTable("#table03")){
		$('#table03').DataTable().destroy();
		$('#table03').empty();
	}
}