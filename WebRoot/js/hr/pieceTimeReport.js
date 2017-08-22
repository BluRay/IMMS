$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	$(document).on("change","#search_salary_model",function(){
		var options="<option value='车辆维度'>车辆维度</option><option value='人员维度'>人员维度</option>";
		if($(this).val()=='辅助人力'||$(this).val()=='底薪模式'){
			options="<option value='日期维度'>日期维度</option><option value='人员维度'>人员维度</option>";
			
		}
		$("#search_count_flag").html(options);
	})
	
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
});


function initPage(){	
		$("#search_form")[0].reset();
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect("hrReport/pieceTimeReport","","#search_factory",null,"id")	
		getWorkshopSelect("hrReport/pieceTimeReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id")
		getWorkgroupSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_workgroup","全部","id")
	
}


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
	
	
	$(".divLoading").addClass("fade in").show();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[];
	var salary_model=$("#search_salary_model").val();
	var count_flag=$("#search_count_flag").val();
	if(salary_model=="技能系数"){
		if(count_flag=='车辆维度'){
			rowsGroup=[0,1,2,3,4,5,6,7,8,15]
			columns= [
			            {"title":"车号","class":"center","width":"160","data":"bus_number","defaultContent": ""},
			            {"title":"订单","class":"center","width":"180","data":"order_desc","defaultContent": ""},
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},
			            {"title":"补贴车","class":"center","data":"bonus","defaultContent": ""},
			            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			            {"title":"岗位","class":"center","data": "job","defaultContent": ""},		            
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}else{
			rowsGroup=[0,1,2,3,4,5,6,15]
			columns= [
			          	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			          	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			          	{"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			          	{"title":"岗位","class":"center","data": "job","defaultContent": ""},	
			          	{"title":"车号","class":"center","width":"160","data":"bus_number","defaultContent": ""},
			            {"title":"订单","class":"center","width":"180","data":"order_desc","defaultContent": ""},
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},			            
			            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},
			            {"title":"补贴车","class":"center","data":"bonus","defaultContent": ""},
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},  		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}
	}
	
	if(salary_model=="承包制"){
		if(count_flag=='车辆维度'){
			rowsGroup=[0,1,2,3,4,5,6,7,8,15]
			columns= [
			            {"title":"车号","class":"center","width":"160","data":"bus_number","defaultContent": ""},
			            {"title":"订单","class":"center","width":"180","data":"order_desc","defaultContent": ""},
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},
			            {"title":"补贴车","class":"center","data":"bonus","defaultContent": ""},
			            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			            {"title":"岗位","class":"center","data": "job","defaultContent": ""},		            
			            {"title":"分配金额","width":"80","class":"center","data":"distribution","defaultContent": ""},		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}else{
			rowsGroup=[0,1,2,3,4,5,6,15]
			columns= [
			          	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			          	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			          	{"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			          	{"title":"岗位","class":"center","data": "job","defaultContent": ""},	
			          	{"title":"车号","class":"center","width":"160","data":"bus_number","defaultContent": ""},
			            {"title":"订单","class":"center","width":"180","data":"order_desc","defaultContent": ""},
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},			            
			            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},
			            {"title":"补贴车","class":"center","data":"bonus","defaultContent": ""},
			            {"title":"分配金额","width":"80","class":"center","data":"distribution","defaultContent": ""},  		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}
	}
	
	if(salary_model=="辅助人力"){
		if(count_flag=='日期维度'){
			rowsGroup=[0,1,2,3,4,11]
			columns= [
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			            {"title":"岗位","class":"center","data": "job","defaultContent": ""},		            
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资（月）","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}else{
			rowsGroup=[0,1,2,3,4,5,6,11]
			columns= [
			          	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			          	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			          	{"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			          	{"title":"岗位","class":"center","data": "job","defaultContent": ""},	
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},  		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资（月）","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}
	}
	
	if(salary_model=="底薪模式"){
		if(count_flag=='日期维度'){
			rowsGroup=[0,1,2,3,4,12]
			columns= [
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			            {"title":"岗位","class":"center","data": "job","defaultContent": ""},		            
			            {"title":"底薪","class":"center","data": "basic_salary","defaultContent": ""},
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资（月）","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}else{
			rowsGroup=[0,1,2,3,4,5,6,7,12]
			columns= [
			          	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
			          	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
			          	{"title":"工厂","class":"center","data":"factory","defaultContent": ""},
			            {"title":"车间","class":"center","data":"workshop","defaultContent":""},
			            {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
			            {"title":"小班组","class":"center","data":"team","defaultContent":""},
			          	{"title":"岗位","class":"center","data": "job","defaultContent": ""},
			          	{"title":"底薪","class":"center","data": "basic_salary","defaultContent": ""},
			            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
			            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},  		            
			            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": ""},
			            {"title":"计件工资（月）","class":"center","data": "ppay","defaultContent": ""},
			            {"title":"合计工资","class":"center","data": "total_ppay","defaultContent": ""}	
			          ]	;
		}
	}
	
	var tb=$("#tableResult").DataTable({
		serverSide: true,
	/*	fixedColumns:   {
            leftColumns: 2,
            rightColumns:2
        },*/
		dom: 'Bfrtip',
		/*lengthMenu: [
		             [ 20, 50, 100, -1 ],
		             [ '显示20行', '显示50行', '显示100行', '全部' ]
		         ],*/
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	       /* {extend:'pageLength',text:'显示行'}*/
	       
	    ],
	    paginate:false,
        rowsGroup:rowsGroup,
	/*    drawCallback: function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'next'} ).nodes();
            var last=null;
 
            alert(rows.length);
            api.column(0, {page:'next'} ).data().each( function ( group, i ) {
                if ( last !== group) {               	
                	if(last !=null){
                		$(rows).eq( i ).before(
                                '<tr class="group"><td colspan="13" style="font-weight: bold;" >合计：'+'</td></tr>'
                            );
                	}
                    last = group;
                }else{
                	
                }
            } );
        },*/
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." ,
			infoEmpty:"抱歉，未查询到数据！",
		/*	paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}*/
		},
		ajax:function (data, callback, settings) {
			
			var param ={
				"draw":1,
				"order_no":$("#search_order_no").val(),
				"factory":$("#search_factory :selected").text(),
				"workshop":$("#search_workshop :selected").text(),
				"workgroup":$("#search_workgroup :selected").text(),
				"team":$("#search_team :selected").text(),
				"staff":$("#staff_number").val(),
				"bus_number":$("#bus_number").val(),
				"order_id":$("#search_order_no").attr("order_id"),
				"wdate_start":$("#wdate_start").val(),
				"wdate_end":$("#wdate_end").val(),
				"salary_model":salary_model,
				"count_flag":count_flag
			};
            /*param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码
*/
            $.ajax({
                type: "post",
                url: "getStaffPieceHours",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$(".divLoading").hide();
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
                   /* returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
*/                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                	var head_width=$(".dataTables_scroll").width();
                	$(".dataTables_scrollBody").scrollTop(10);
                	//alert($(".dataTables_scrollBody").scrollTop());

                	if($(".dataTables_scrollBody").scrollTop()>0){
                		$(".dataTables_scrollHead").css("width",head_width-20);
                		$(".dataTables_scrollBody").scrollTop(0);
                	}
                }
            });
		
		},
		columns: columns,
	});
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}
