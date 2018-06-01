var pageSize=1;
var table;
var table_height = $(window).height()-420;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		//getBusNumberSelect('#nav-search-input');
		getFactorySelect("report/dpuReport",'',"#search_factory","全部",'id');
		getKeysSelect("CHECK_NODE", "", "#search_test_node_id",null,"id");
		var now = new Date(); //当前日期
		$("#start_date").val(ChangeDateToString(now).substring(0,7) + "-01");
		$("#end_date").val(ChangeDateToString(now));
		getQuery();
	}
	
/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	function getQuery(){

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
		
		var factory_str = "";
		$("#search_factory option").each(function(){
			if($(this).val() != '')factory_str += $(this).val() + ",";
		});
		factory_str = factory_str.substring(0,factory_str.length-1);
		if($("#search_factory").val() != ''){
			factory_str = $("#search_factory").val();
		}
		
		var factory="("+ factory_str + ")";
		var test_node_id=$("#search_test_node_id").val();
		var startDate=$("#start_date").val();
		var endDate=$("#end_date").val();
		var queryItem=$("#search_index").val();
		var conditions = "{factoryId:'" + factory + "',test_node_id:'" + test_node_id+"',queryItem:'"+
		queryItem+ "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
		console.log("-->conditions = " + conditions);
		
		$.ajax({
			url : "getPassRateReportData",
			type : "post",
			dataType : "json",
			data : {
				"conditions" : conditions
			},
			success : function(response) {
				generateChart(response.chartList,response.itemList,queryItem);
			}
		});
		ajaxQuery(conditions);
	}
	
	$("#btnQuery").click (function () {
		getQuery();
	})
	
});

function generateChart(chartList,itemList,queryItem){
	var pass_rate = new Array();
	var categories=new Array();
	var targetVal=0;
	var maxVal=100;
	var linedata=new Array();
	if(itemList==undefined){
		itemList=new Array();
	}
	if(itemList.length>0){
		$.each(itemList,function(index,item){
			pass_rate[item]=null;
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
	targetVal=chartList[0].target_val==undefined?'0':chartList[0].target_val;
	targetVal=Number(targetVal.replace("%",""));
	$.each(chartList,function(index,data){		
		var busTotal=isNaN(parseInt(data.bus_total))?0:parseInt(data.bus_total);
		var bugOkNum=isNaN(parseInt(data.bus_ok_num))?0:parseInt(data.bus_ok_num);		
		if(queryItem=='order'){
			categories[index]=data.item;
			pass_rate[data.item]=Number((bugOkNum/busTotal*100).toFixed(2));
		}else{
			pass_rate[data.item]=Number((bugOkNum/busTotal*100).toFixed(2));
		}

	});
	
	var title_line = "一次校检合格率趋势图";	
	var xAxis_line = {
			categories : categories,
			labels: {
                autoRotationLimit: 80
            }
		};
	var fn_formatter_line = function(obj) {
		var s = "";
		s = obj.x + ": " + obj.y +"%";
		return s;
	}
	var yAxis_line = {
			title : {
				text : ''
			},
			labels:{
				format: '{value} %'
			},
			max:maxVal,
			plotLines : [ { //一条延伸到整个绘图区的线，标志着轴中一个特定值。
				color : 'red',
				dashStyle : 'Dash', //Dash,Dot,Solid,默认Solid
				width : 1.5,
				value : targetVal, //y轴显示位置
				zIndex : 0,
				label : {
					text : '目标值：'+targetVal+"%", //标签的内容
					align : 'left', //标签的水平位置，水平居左,默认是水平居中center
					x : 10
				//标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
				}
			} ]
		};

	for (value in pass_rate)
	{
		linedata.push(pass_rate[value]);
	}
	var series_line = [];
	var l_obj = {
			type : 'line',
			name : '一次校检合格率',
			data : linedata,
			marker : {
				lineWidth : 2,
				lineColor : Highcharts.getOptions().colors[3],
				fillColor : 'white'
			},
			dataLabels : {
				enabled : true,
				formatter : function(obj) {
					return this.y +"%";
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

function ajaxQuery(conditions){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,scrollX: "100%",orderMulti:false,
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
				"conditions" : conditions,
				"orderColumn":"id"
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getPassRateDetail",
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
		            {"title":"车号",width:'150',"class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"检验节点","class":"center","data":"test_node","defaultContent": ""},
		            {"title":"检验员","class":"center","data": "tester","defaultContent": "-"},
		            {"title":"QE","class":"center","data":"qe","defaultContent": "-"},
		            {"title":"判定时间","class":"center","data": "test_date","defaultContent": "-"}
		          ],
	});
}

function ChangeDateToString(DateIn){
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	// 初始化时间
	Year = DateIn.getFullYear();
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	CurrentDate = Year + "-";
	if (Month >= 10){
		CurrentDate = CurrentDate + Month + "-";
	}else {
		CurrentDate = CurrentDate + "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate = CurrentDate + Day;
	} else {
		CurrentDate = CurrentDate + "0" + Day;
	}
	return CurrentDate;
}
