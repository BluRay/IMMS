$(document).ready(function(){
	
	initPage();
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	$("#date_type").change(function(){
		getPlanRateDate();
		ajaxQuery();
	});
	$("#season").change(function(){
		getPlanRateDate();
		ajaxQuery();
	});
	$("#btnQuery").on("click",function () {
		$("input[name='xx']").attr('checked',false);
		ajaxQuery();
	});
})

function initPage(){
	getPlanRateDate();
	ajaxQuery();
}
function ajaxQuery(){
	if($.fn.dataTable.isDataTable("#tableData")){
		$('#tableData').DataTable().destroy();
		$('#tableData').empty();
	}
	if($("#start_date").val()==''){
		alert("开始时间不能为空");
		return;
	}
	if($("#end_date").val()==''){
		alert("结束时间不能为空");
		return;
	}
	drawRankChart();
}
function getPlanRateDate(){
	var type = $("#date_type :selected").val();
	$("#season_td").hide();
	if(type == 'd'){
		var date=new Date();
        $("#start_date").val(formatDate(date));
        $("#end_date").val(formatDate(date));
	}else if(type == 'w'){
		var weekStartDate = getWeekStartDate();
		var weekEndDate = getWeekEndDate();
		$("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'm'){
		//当前月日期
		var startDate = getMonthStartDate();
		var endDate = getMonthEndDate();
		$("#start_date").val(startDate);
        $("#end_date").val(endDate);
	}else if(type == 's'){
		$("#season_td").show();
		var season=$("#season").val(),start_date='',end_date='';
		var now = new Date(); //当前日期 
		var nowYear = now.getYear(); //当前年 
		var myyear = now.getFullYear(); 
		if(season=='1'){
			start_date=myyear+"-01-01";
			end_date=myyear+"-03-31";
		}
		if(season=='2'){
			start_date=myyear+"-04-01";
			end_date=myyear+"-06-30";
		}
		if(season=='3'){
			start_date=myyear+"-07-01";
			end_date=myyear+"-09-30";
		}
		if(season=='4'){
			start_date=myyear+"-10-01";
			end_date=myyear+"-12-31";
		}
		$("#start_date").val(start_date);
        $("#end_date").val(end_date);
	}else if(type == 'y'){
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

function drawRankChart(){

	var series=[];
	var factory_data_list=[];
	$.ajax({
		url:'getfactoryRateRankData',
		type:'get',
		dataType:'json',
		cache:false,
		async:false,
		data:{
		   'start_date':$("#start_date").val(),
	       'end_date': $("#end_date").val()
		},
		success:function(response){
			var result_list=[];
			$.each(response.factory_data,function(i,detail){
            	var result={};
            	var plan_real=detail.detail_info;
            	var plan=plan_real.split(";")[0].split(":")[1];
            	var real=plan_real.split(";")[1].split(":")[1];
            	result={"factory_name":detail.factory_name,"plan":plan,"real":real,"rank":detail.rank};
            	result_list.push(result);
            })
			$.each(response.series,function(i,data){
				var arr=[data.factory_name,data.rate]
				series.push(arr);
			})
			factory_data_list=response.factory_data;
			chart3=Highcharts.chart("containerReport",
			{
				credits: 
				{
			            enabled: false
			    },
			    title:{
			    	text:"工厂达成率排名"
			    },
			    subtitle:{
					text:$("#start_date").val()+"至"+$("#end_date").val()+"达成率排名"
				},
				chart : {
					type : 'column',
					height : 250+"px"					
				},
				colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
				tooltip:{
					formatter: function () {
						var factory_name=this.points[0].key;
						var detail_info;
		                var s= '<b>' + factory_name+ '</b><br/>' 
		                $.each(factory_data_list,function(i,detail){
		                	if(detail.factory_name==factory_name){
		                		detail_info=detail.detail_info;
		                		return false;
		                	}	
		                })
		                detail_info=detail_info||"";
		                $.each(detail_info.split(","),function(i,data){
			                	var d='';				  
			                	if((i+1)%2==0){
			                		d=data+'<br />';
			                	}
			                	if((i+1)%2!=0&&data!=''){
			                		d=data+'   ';	
			                	}		                	
			                	s+=d;		
				          })
		                return s;
		            },
		            shared: true
				},
				legend: {
			            enabled: false
			     },
				xAxis : {
					 type: 'category',
			            labels: {
			                rotation: 0,
			                style: {
			                    fontSize: '12px',
			                    fontFamily: 'Verdana, sans-serif',
			                }
			            }
				},
				yAxis : {
					min: 0,
		            labels: {
		                format: '{value} %',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            },
		            title: {
		                text: '百分比',
		                style: {
		                    color: Highcharts.getOptions().colors[2]
		                }
		            },
		            tickPositions: [0,50,100,150,200]
				},
				series : [
			          {
			        	  data:series,
			        	  dataLabels:{
				                enabled: true,
				                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
				                align: 'center',
				                format: '{point.y}', // one decimal
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
			// table数据显示
			showTable(result_list);
			
		}
	});
}
function showTable(result_list){
	var columns=[];
		columns= [
	        {"title":"工厂","class":"center","data":"factory_name","defaultContent": ""},
	        {"title":"各节点总计划(台)","class":"center","data":"plan","defaultContent": "","render":function(data,type,row){
		        return (data!='0') ? data : '-'
		    }},
	        {"title":"各节点总完成(台)","class":"center","data": "real","defaultContent": "","render":function(data,type,row){
		        return (data!='0') ? data : '-'
		    }},
	        {"title":"计划达成率","class":"center","data": "","defaultContent": "","render":function(data,type,row){
	        	var number1=row.real;
            	var number2=row.plan!=0 ? row.plan : 1;
            	var result=Math.round(number1 / number2 * 10000) / 100.00 + "%";// 小数点后两位百分比
                return (result!='0%') ? result : '-'
	        }},
	        {"title":"排名","class":"center","data":"rank","defaultContent":""},
	       ]	;
	$("#tableData").DataTable({
		paiging:false,
		ordering:false,
		processing:true,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-480,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			processing: "正在查询，请稍后...",
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"！"
		},
		data:result_list,
		columns:columns,
		aoColumnDefs : [
            {
            "aTargets" :[3,4],
            "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { 
            	$(nTd).css('color', '#ff0000').css('font-weight', 'bold');
            }   
            }
        ],
	});
}
