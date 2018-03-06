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
		generateChart();
	})
	
});

function generateChart(){
	var series=[];
	var factory_data_list=[];
	$.ajax({
		url:'getProcessProblemReportData',
		type:'get',
		dataType:'json',
		cache:false,
		//async:false,
		data:{
			"start_date":$("#start_date").val(),
			"end_date":$("#end_date").val()
		},
		success:function(response){
			$("#tableData tbody").html("");
			$.each(response.series,function(i,data){
				var tr = $("<tr />");
				$("<td  style='text-align:center'/>").html(i+1).appendTo(tr);
				$("<td  style='text-align:center'/>").html(data.plant_org).appendTo(tr);
				$("<td  style='text-align:center'/>").html(data.fault_count).appendTo(tr);
				$("#tableData tbody").append(tr);
				var arr=[data.plant_org,data.fault_count]
				series.push(arr);
			})
			
			chart3=Highcharts.chart("chartsContainer",
					{
						credits: 
						{
					    	enabled: false
					    },
					    title:{
					    	text:null
					    },
						chart : {
							type : 'column',
							height : 300					
						},
						colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
						tooltip:{pointFormat:'故障数：{point.y}'},
						legend: {
					            enabled: false
					     },
						xAxis : {
							 type: 'category',
					            labels: {
					                //rotation: -45,
					                style: {
					                    fontSize: '12px',
					                    fontFamily: 'Verdana, sans-serif'
					                }
					            }
						},
						yAxis : {
							title:{
								text:null
							}
						},
						series : [
						          {
						        	  data:series,
						        	  dataLabels:{
							                enabled: true,
							                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
							                align: 'center',
							                format: '故障数：{point.y}', // one decimal
							                y: 10, // 10 pixels down from the top
							                style: {
							                    fontSize: '11px',
							                    fontFamily: 'Verdana, sans-serif'
							                }
							            }  
						          }
						          
						 ],
						 responsive: {
							 rules:[{
					                condition: {
					                    maxWidth: 1000,
					                    minWidth:200
					                }
							 }]
						 }
				
					});
		}
	});

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
