var pageSize=1;
var table;
var table_height = $(window).height()-390;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		//getBusNumberSelect('#nav-search-input');
		getPlanRateDate();
		generateChart();
	}
	
	$("input[type='radio']").change(function(){
		getPlanRateDate();
		generateChart();
	});
	
	$("#btnQuery").click (function () {
		if($("#start_date").val()==""){
			alert("请选择开始日期！");
			$("#start_date").focus();
			return false;
		}
		if($("#end_date").val()==""){
			alert("请选择结束日期！");
			$("#end_date").focus();
			return false;
		}
		if($("#report_type").val()!="4"){
			$("#chartsContainer").show();
			$("#tableData").show();
			$("#charts_table").hide();
			$("#tableOrder_wrapper").hide();
			generateChart();
		}else{
			$("#chartsContainer").hide();
			$("#tableData").hide();
			$("#charts_table").show();
			$("#tableOrder_wrapper").show();
			generateOrderChart();
			getOrderReport();
		}
		
	})
	
});

function generateOrderChart(){
	var series=[];
	var series2=[];
	var factory_data_list=[];
	$("#th_title").html($("#report_type :selected").text());
	$.ajax({
		url:'getProcessFaultOrderReportData',
		type:'get',
		dataType:'json',
		cache:false,
		//async:false,
		data:{
			"report_type":"2",
			"start_date":$("#start_date").val(),
			"end_date":$("#end_date").val()
		},
		success:function(response){
			$("#tableData tbody").html("");
			$.each(response.series,function(i,data){
				var arr=[data.fault_level_id,data.fault_level_count];
				series.push(arr);
			})
			$.each(response.series2,function(i,data){
				var arr=[data.is_batch,data.is_batch_count];
				series2.push(arr);
			})
			
		   var chart = {plotBackgroundColor: null,plotBorderWidth: null,plotShadow: false};
		   var title = {text: '故障性质'};      
		   var tooltip = {pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'};
		   var plotOptions = {
		      pie: {
		         allowPointSelect: true,
		         cursor: 'pointer',
		         dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		            	fontSize : '16px',
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            }
		         }
		      }
		   };
		   var myseries= [{
		      type: 'pie',
		      name: '故障数',
		      fontSize : '14px',
		      data: series
		   }];     
		      
		   var json = {};   
		   json.chart = chart; 
		   json.title = title;     
		   json.tooltip = tooltip;  
		   json.series = myseries;
		   json.plotOptions = plotOptions;
		   json.credits= {enabled:false};
		   $('#chartsContainer_1').highcharts(json);
			
			
		   var chart2 = {plotBackgroundColor: null,plotBorderWidth: null,plotShadow: false};
		   var title2 = {text: '故障类型'};      
		   var tooltip2 = {pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'};
		   var plotOptions2 = {
		      pie: {
		         allowPointSelect: true,
		         cursor: 'pointer',
		         dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		            	fontSize : '16px',
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            }
		         }
		      }
		   };
		   var myseries2= [{
		      type: 'pie',
		      name: '故障数',
		      fontSize : '14px',
		      data: series2		    	  
		   }];     
		      
		   var json2 = {};   
		   json2.chart = chart2; 
		   json2.title = title2;     
		   json2.tooltip = tooltip2;  
		   json2.series = myseries2;
		   json2.plotOptions = plotOptions2;
		   json2.credits= {enabled:false};
		   $('#chartsContainer_2').highcharts(json2);  
			
		}
	});
	
}

function generateChart(){
	var series=[];
	var factory_data_list=[];
	$("#th_title").html($("#report_type :selected").text());
	$.ajax({
		url:'getProcessProblemReportData',
		type:'get',
		dataType:'json',
		cache:false,
		//async:false,
		data:{
			"report_type":$("#report_type").val(),
			"start_date":$("#start_date").val(),
			"end_date":$("#end_date").val()
		},
		success:function(response){
			$("#tableData tbody").html("");
			var total = 0;
			$.each(response.series,function(i,data){
				total += data.fault_count;
			})
			$.each(response.series,function(i,data){
				var tr = $("<tr />");
				$("<td  style='text-align:center'/>").html(i+1).appendTo(tr);
				$("<td  style='text-align:center'/>").html(data.plant_org).appendTo(tr);
				$("<td  style='text-align:center'/>").html(data.fault_count).appendTo(tr);
				$("<td  style='text-align:center'/>").html((total == 0)?"-":Math.round(data.fault_count / total * 10000) / 100.00 + "%").appendTo(tr);
				$("#tableData tbody").append(tr);
				var arr=[data.plant_org,data.fault_count,{color:'yellow'}]
				series.push(arr);
			})
			
			chart3=Highcharts.chart("chartsContainer",
					{
						credits: {enabled: false},
					    title:{text:null},
						chart : {
							type : 'column',
							height : 300					
						},
						colors: ['#ff0000', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263'],
						tooltip:{pointFormat:'故障数：{point.y}'},
						legend: {enabled: false},
						xAxis : {type: 'category',labels: {style: {fontSize: '12px',fontFamily: 'Verdana, sans-serif'}}},
						yAxis : {title:{text:null}},
			        	plotOptions: {column: {colorByPoint:true}},
						series : [{
					              data:series,
					        	  dataLabels:{
					                enabled: true,
					                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					                align: 'center',
					                format: '{point.y}',
					                y: 10,
					                style: {fontSize: '11px',fontFamily: 'Verdana, sans-serif'}
						            }  
						          }],
						 responsive: {rules:[{condition: {maxWidth: 1000,minWidth:200}}]}
					});
		}
	});

}

function getOrderReport(){

	/*$table.bootstrapTable('refresh', {url: 'getOrderDetailList'});
	$("#btnQuery").removeAttr("disabled");*/
	var columns=[];
	columns=[
	            {"title":"生产订单","width":"230","class":"center","data":"order_desc","defaultContent": ""},
	            {"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},
	            {"title":"故障总量","class":"center","data":"p_count","defaultContent": ""},
	            {"title":"订单故障率","class":"center","data":"p_rate","defaultContent": ""},
	            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent":""},
	            {"title":"生产数量","class":"center","data":"production_qty","defaultContent":""},
	            {"title":"故障数量","class":"center","data": "pf_count","defaultContent": ""},
	            {"title":"工厂故障率","class":"center","data":"pf_rate","defaultContent": ""}
	            ];
	var tb=$("#tableOrder").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 1
        },
		dom: 'Bfrtip',
        rowsGroup:[0,1,2,3,4],
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		//sScrollY: 350,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: 2000,
		lengthChange:true,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			lengthMenu:"显示 _MENU_ 行",
			infoEmpty:"",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"report_type":$("#report_type").val(),
				"start_date":$("#start_date").val(),
				"end_date":$("#end_date").val()
			};
            param.length = 20;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getOrderFaultReportList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
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
		columns: columns,
	});
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");

}

function getPlanRateDate(){
	var type = $("input[type='radio']:checked").val();
	if(type == 'W'){
		//周
		//当前周日期
		var weekStartDate = getWeekStartDate();
		var weekEndDate = getWeekEndDate();
		
        $("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'M'){
		//当前月日期
		var weekStartDate = getMonthStartDate();
		var weekEndDate = getMonthEndDate();
		
        $("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'S'){
		//当前月日期
		var weekStartDate = getSeasonStartDate();
		var weekEndDate = getSeasonEndDate();
		
        $("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'Y'){
		var now = new Date(); //当前日期 
		var nowYear = now.getYear(); //当前年 
		var myyear = now.getFullYear(); 
        $("#start_date").val(myyear+"-01-01");
        $("#end_date").val(myyear+"-12-31");
	}
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate();

	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth + "-" + myweekday); 
}

//获得本周的开端日期 
function getWeekStartDate() { 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
	return formatDate(weekStartDate); 
}

//获得本周的停止日期 
function getWeekEndDate() { 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); 
	return formatDate(weekEndDate); 
}

function getSeasonStartDate(){
	var now = new Date(); //当前日期
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var nowMonth = now.getMonth(); //当前月 
	if (nowMonth <= 3){
		return formatDate(new Date(nowYear,0,1)); 
	}else if (nowMonth <= 6){
		return formatDate(new Date(nowYear,3,1)); 
	}else if (nowMonth <= 9){
		return formatDate(new Date(nowYear,6,1)); 
	}else{
		return formatDate(new Date(nowYear,9,1)); 
	}
}

function getSeasonEndDate(){
	var now = new Date(); //当前日期
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var nowMonth = now.getMonth(); //当前月 
	if (nowMonth <= 3){
		return formatDate(new Date(nowYear,2,31)); 
	}else if (nowMonth <= 6){
		return formatDate(new Date(nowYear,5,30)); 
	}else if (nowMonth <= 9){
		return formatDate(new Date(nowYear,8,30)); 
	}else{
		return formatDate(new Date(nowYear,11,31)); 
	}
}


//获得本月的开端日期 
function getMonthStartDate(){
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, nowMonth, 1); 
	return formatDate(monthStartDate); 
}

//获得本月的停止日期 
function getMonthEndDate(){ 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
	return formatDate(monthEndDate); 
}
//获得某月的天数 
function getMonthDays(myMonth){
	var now = new Date(); //当前日期 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, myMonth, 1); 
	var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
	var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
	return days; 
}
