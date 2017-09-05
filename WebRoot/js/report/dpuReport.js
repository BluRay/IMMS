$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("report/dpuReport",'',"#search_factory",null,'id');
		getWorkshopSelect("report/dpuReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getKeysSelect("CHECK_NODE", "", "#search_test_node_id",null,"id");
	}
	
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
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
		
		var factory=$("#search_factory").val();
		var test_node_id=$("#search_test_node_id").val();
		var startDate=$("#start_date").val();
		var endDate=$("#end_date").val();
		var queryItem=$("#search_index").val();
		var conditions = "{factoryId:'" + factory + "',test_node_id:'" + test_node_id+"',queryItem:'"+
		queryItem+ "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
		console.log("-->conditions = " + conditions);
		
		$.ajax({
			url : "getDPUReportData",
			type : "post",
			dataType : "json",
			data : {
				"conditions" : conditions
			},
			success : function(response) {
				generateChart(response.chartList,response.itemList,queryItem);
			}
		});
		
	})
	
});

function generateChart(chartList,itemList,queryItem){
	var bug_avg = new Array();
	var categories=new Array();
	var targetVal=0;
	var linedata=new Array();
	if(itemList==undefined){
		itemList=new Array();
	}
	if(itemList.length>0){
		$.each(itemList,function(index,item){
			bug_avg[item]=0;
			if(queryItem=='week'){
				categories[index]="第"+item+"周";
			}
			if(queryItem=='month'){
				categories[index]=item+"月";
			}
			if(queryItem=='day'){
				categories[index]=item;
			}
		});
	}
	$.each(chartList,function(index,data){
		targetVal=data.target_val==undefined?0:data.target_val;
		var busNum=isNaN(parseInt(data.bus_num))?0:parseInt(data.bus_num);
		var bugNum=isNaN(parseInt(data.bug_num))?0:parseInt(data.bug_num);		
		if(queryItem=='order'){
			categories[index]=data.item;
			bug_avg[data.item]=Number((bugNum/busNum).toFixed(2));
		}/*else if(queryItem=='day'){
			bug_avg[data.item]=Number((bugNum/busNum).toFixed(2));
		}*/else{
			bug_avg[data.item]=Number((bugNum/busNum).toFixed(2));
		}
	});
	var title_line = "单车缺陷数(DPU)趋势图";	
	var xAxis_line = {
			categories : categories,
			labels: {
                autoRotationLimit: 80
            }
		};
	var fn_formatter_line = function(obj) {
		var s = "";
		s = obj.x + ": " + obj.y ;
		return s;
	}
	var yAxis_line = {
			title : {
				text : ''
			},
			//max:Number(targetVal)+3,
			plotLines : [ { //一条延伸到整个绘图区的线，标志着轴中一个特定值。
				color : 'red',
				dashStyle : 'Dash', //Dash,Dot,Solid,默认Solid
				width : 1.5,
				value : targetVal, //y轴显示位置
				zIndex : 0,
				label : {
					text : '目标值：'+targetVal, //标签的内容
					align : 'left', //标签的水平位置，水平居左,默认是水平居中center
					x : 10
				//标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
				}
			} ]
		};

	for (value in bug_avg)
	{
		linedata.push(bug_avg[value]);
	}
	var series_line = [];
	var l_obj = {
			type : 'line',
			name : 'DPU',
			data : linedata,
			marker : {
				lineWidth : 2,
				lineColor : Highcharts.getOptions().colors[3],
				fillColor : 'white'
			},
			dataLabels : {
				enabled : true,
				formatter : function(obj) {
					return this.y ;
				},
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_line.push(l_obj);
	
	drowCharts("#chartsContainer", title_line, xAxis_line,fn_formatter_line, series_line, yAxis_line);
}

function drowCharts(container, title, xAxis, fn_formatter, series, yAxis,tooltip,plotOptions) {
	$(container).highcharts({
		chart : {
			shadow : false,// 是否设置阴影
			zoomType : 'xy'// 拖动鼠标放大图表的方向
		},
		colors : [  '#90ed7d', '#f7a35c','#8085e9', '#f15c80', '#e4d354', '#8085e8','#8d4653', '#91e8e1','#7cb5ec' ],
		// 图表版权信息。默认情况下，highcharts图表的右下方会放置一个包含链接的版权信息。
		credits : {
			enabled : false
		},
		title : {
			text : title
		},
		xAxis : xAxis,
		yAxis : yAxis,
		tooltip : tooltip||{
			formatter : function() {
				var s;
				s = fn_formatter(this);
				return s;
			}
		},
		plotOptions:plotOptions||{},
		labels : {},
		series : series
	});
}

