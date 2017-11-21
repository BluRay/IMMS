var pageSize=1;
var table;
var table_height = $(window).height()-650;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("report/dpuReport",'',"#search_factory",null,'id');
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
		var startDate=$("#start_date").val();
		var endDate=$("#end_date").val();
		var queryItem=$("#search_index").val();
		var conditions = "{factoryId:'" + factory + "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
		console.log("-->conditions = " + conditions);
		
		$.ajax({
			url : "getProcessProblemReportData",
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
	})
	
});

function generateChart(chartList,itemList,queryItem){
	var title_column  = "制程问题严重等级分布图";	
	var fn_formatter_column = function(obj) {
		var s = "";
		s = obj.series.name + obj.x + ": " + obj.y;
		return s;
	};
	var xAxis_column = {
			categories : [ '涂装', '底盘', '总装', '检测线','车架','车身' ],
			labels: {
                autoRotationLimit: 40
            }
		};
	var series_column = new Array();
	series_column[0] = {
		type : 'column',
		name : 'S',
		data : [0,0,0,0,0,0],
		dataLabels : {
			enabled : true,
			rotation : 0,
			color : '#606060',
			style : {
				fontSize : '10px'
			}
		}
	};
	series_column[1] = {
			type : 'column',
			name : 'A',
			data : [0,0,0,0,0,0],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_column[2] = {
			type : 'column',
			name : 'B',
			data : [0,0,0,0,0,0],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_column[3] = {
			type : 'column',
			name : 'C',
			data : [0,0,0,0,0,0],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	var yAxis_column = {
			title : {
				text : '问题数量'
			},
			labels : {
				format : '{value} 个'
			}
		};
	$.each(chartList,function(index,data){
		//'涂装', '底盘', '总装', '检测线','车架','车身'
		var count_painting=0;
		var count_bottom=0;
		var count_assembly=0;
		var count_test=0;
		var count_frame=0;
		var count_body=0;
		var bug_detail=data.bug_desc;
		$.each(bug_detail.split(","),function(i,b){
			var workshop=b.split(":")[0];
			var count=isNaN(parseInt(b.split(":")[1]))?0:parseInt(b.split(":")[1]);
			if(workshop=='涂装'){
				count_painting=count;
			}
			if(workshop=='底盘'){
				count_bottom=count;
			}
			if(workshop=='总装'){
				count_assembly=count;
			}
			if(workshop=='检测线'){
				count_test=count;
			}
			if(workshop=='车架'){
				count_frame=count;
			}
			if(workshop=='车身'){
				count_body=count;
			}
		});
		var series_data=[count_painting,count_bottom,count_assembly,count_test,count_frame,count_body];
		if (data.serious_level == 'S') {
			series_column[0].data = series_data;
		}
		if (data.serious_level == 'A') {
			series_column[1].data = series_data;
		}
		if (data.serious_level == 'B') {
			series_column[2].data = series_data;
		}
		if (data.serious_level == 'C') {
			series_column[3].data = series_data;
		}
	});
	 var tooltip = {
             headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
                 '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
             footerFormat: '</table>',
             shared: true,
             useHTML: true
         }; 
	drowCharts("#chartsContainer", title_column, xAxis_column,fn_formatter_column, series_column, yAxis_column,tooltip);
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
                url: "getProcessProblemReportDetail",
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
		            {"title":"检测节点",width:'150',"class":"center","data":"workshop_name","defaultContent": ""},
		            {"title":"责任班组","class":"center","data":"workgroup_name","defaultContent": ""},
		            {"title":"故障","class":"center","data":"test_result","defaultContent": ""},
		            {"title":"故障级别","class":"center","data": "serious_level","defaultContent": "-"},
		            {"title":"故障数量","class":"center","data":"bug_count","defaultContent": "-"}
		          ],
	});
}


