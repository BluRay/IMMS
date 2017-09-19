var search_count_flag = "1";
$(document).ready(function() {
    initPage();
	
	function initPage() {
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("hrReport/ecnReport","","#search_factory",null,"id")	
		getWorkshopSelect("hrReport/ecnReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id")
		getWorkgroupSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_workgroup","全部","id")
	}
	
	$(document).on("change","#search_factory",function(){
		var factory=$("#search_factory :selected").text();
		getWorkshopSelect("hrReport/pieceTimeReport",factory,"","#search_workshop",null,"id")
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	$(document).on("change","#search_workshop",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	$(document).on("change","#search_workgroup",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		var workgroup=$("#search_workgroup :selected").text();
		getTeamSelect(factory,workshop,workgroup,"","#search_team","全部","id");
	})
	
	$("#btnQuery").click(function(){
		search_count_flag = $("#search_count_flag").val();
		console.log("--search_count_flag = " + search_count_flag);
		if(search_count_flag == "1"){
			ajaxQuery();
		}else{
			ajaxQuery2();
		}
		
	})

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	//导出功能
	$(document).on("click",".buttons-excel",function(){
		//ajaxQuery(0,'all');
		$("#tableResult tbody").children("tr").children("td:hidden").remove();
		htmlToExcel("tableResult", "", "","技改工时统计","技改工时统计");
		return false;
	});
});

//限制开始和结束时间为同一个月
function limitMonthDate(e) {
	var DateString;
	if (e == 2) {
		var beginDate = $dp.$("wdate_start").value;
		if (beginDate != "" && beginDate != null) {
			var limitDate = new Date(beginDate);
			limitDate.setDate(new Date(limitDate.getFullYear(), limitDate
					.getMonth() + 1, 0).getDate()); //获取此月份的天数
			DateString = limitDate.getFullYear() + '-'
					+ (limitDate.getMonth() + 1) + '-'
					+ limitDate.getDate();
			return DateString;
		}
	}
	if (e == 1) {
		var endDate = $dp.$("wdate_end").value;
		if (endDate != "" && endDate != null) {
			var limitDate = new Date(endDate);
			limitDate.setDate("1"); //设置闲置时间为月初
			DateString = limitDate.getFullYear() + '-'
					+ (limitDate.getMonth() + 1) + '-'
					+ limitDate.getDate();
			return DateString;
		}
	}
	
}

function ajaxQuery(){
	if($("#wdate_start").val().trim().length==0||$("#wdate_end").val().trim().length==0){
		alert("请输入日期范围！");
		return false;
	}
	var conditions = "{factory:'" + $("#search_factory").find("option:selected").text() + 
	"',workshop:'" + $("#search_workshop").find("option:selected").text() + 
	"',workgroup:'" + (($("#search_workgroup").find("option:selected").text()=="全部")?"":$("#search_workgroup").find("option:selected").text()) + 
	"',team:'" + (($("#search_team").find("option:selected").text()=="全部")?"":$("#search_workgroup").find("option:selected").text()) +
	"',dateStart:'" + $("#wdate_start").val() +
	"',dateEnd:'" + $("#wdate_end").val() +
	"',staff:'" + $("#search_staff").val() +
	"',task:'" + $("#search_task").val() + "'}";
	console.log("-->conditions = " + conditions);
	
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[];
	columns= [
          {"title":"技改单","class":"center","width":"160","data":"tech_order_no","defaultContent": ""},
          {"title":"技改任务","class":"center","width":"180","data":"task_content","defaultContent": ""},
          {"title":"操作车间","class":"center","data":"workshop","defaultContent": ""},
          {"title":"总工时","class":"center","data":"totalhours","defaultContent": ""},
          {"title":"总费用","class":"center","data":"totalprice","defaultContent": ""},
          {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
          {"title":"工号","class":"center","data":"staff_number","defaultContent":""},
          {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
          {"title":"工厂","class":"center","data": "plant_org","defaultContent": ""},		            
          {"title":"车间","width":"80","class":"center","data":"workshop","defaultContent": ""},		            
          {"title":"班组","width":"100","class":"center","data": "workgroup_org","defaultContent": ""},
          {"title":"小班组","class":"center","data": "team_org","defaultContent": ""},
          {"title":"操作工时","class":"center","data": "work_hour","defaultContent": ""},
          {"title":"有效工时","class":"center","data": "real_work_hour","defaultContent": ""}	,
          {"title":"技改工资","class":"center","data": "salary","defaultContent": ""}	
      ]	;
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		dom: 'Bfrtip',
		buttons: [
			        {extend:'excelHtml5',enabled:false,title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
			        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},],
        paginate:false,
        rowsGroup:rowsGroup,
        paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: true,
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." ,
			infoEmpty:"抱歉，未查询到数据！",
		},
		ajax:function (data, callback, settings) {
			
			var param ={
				"draw":1,
				"conditions":conditions
			};
			$.ajax({
                type: "post",
                url: "getEcnReportData",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	//$(".divLoading").hide();
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.data = result.data;//返回的数据列表
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: columns,
	});
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}

function ajaxQuery2(){
	if($("#wdate_start").val().trim().length==0||$("#wdate_end").val().trim().length==0){
		alert("请输入日期范围！");
		return false;
	}
	var workshopAll="";
	$("#search_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	var conditions = "{factory:'" + $("#search_factory").find("option:selected").text()
		+ "',workshop:'" + ($("#search_workshop").find("option:selected").text() == '全部' ? workshopAll : $("#search_workshop").find("option:selected").text())
		+ "',workgroup:'"
		+ ($("#search_workgroup").find("option:selected").text() == '全部' ? '' : $("#search_workgroup").find("option:selected").text())
		+ "',team:'"
		+ ($("#search_team").find("option:selected").text() == '全部' ? '' : $("#search_team").find("option:selected").text())
		+ "',dateStart:'" + $("#wdate_start").val() + "',dateEnd:'"
		+ $("#wdate_end").val() + "',staff:'" + $("#search_staff").val()
		+ "',task:'" + $("#search_task").val() + "',ecn_document_number:''}";

	console.log("-->conditions = " + conditions);
	
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[];
	columns= [
          {"title":"工号","class":"center","data":"staff_number","defaultContent":""},
          {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
          {"title":"岗位","class":"center","data":"job","defaultContent": ""},
          {"title":"小班组","class":"center","data": "team_org","defaultContent": ""},       
          {"title":"班组","width":"100","class":"center","data": "workgroup_org","defaultContent": ""},
          {"title":"工厂","class":"center","data": "plant_org","defaultContent": ""},		            
          {"title":"操作车间","class":"center","data":"workshop","defaultContent": ""},	            
          {"title":"技改单","class":"center","data":"tech_order_no","defaultContent": ""},	                    
          {"title":"技改任务","class":"center","data":"task_content","defaultContent": ""},	
          {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},	
          {"title":"操作工时","class":"center","data": "work_hour","defaultContent": ""},
          {"title":"有效工时","class":"center","data": "real_work_hour","defaultContent": ""}	,     
          {"title":"技改工资","class":"center","data": "salary","defaultContent": ""}	
      ]	;
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		dom: 'Bfrtip',
		buttons: [
			        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
			        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},],
        paginate:false,
        rowsGroup:rowsGroup,
        paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: true,
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." ,
			infoEmpty:"抱歉，未查询到数据！",
		},
		ajax:function (data, callback, settings) {
			
			var param ={
				"draw":1,
				"conditions":conditions
			};
			$.ajax({
                type: "post",
                url: "getEcnReportData1",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	//$(".divLoading").hide();
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.data = result.data;//返回的数据列表
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: columns,
	});
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
	
	
	
	
	
}
