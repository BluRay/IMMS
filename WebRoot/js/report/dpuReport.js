var pageSize=1;
var table;
var table_height = $(window).height()-500;
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
		ajaxQuery(conditions);
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
                url: "getDPUReportDetail",
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
		            {"title":"故障","class":"center","data": "test_result","defaultContent": "-"},
		            {"title":"备注","class":"center","data":"memo","defaultContent": "-"},		            
		            {"title":"检验员","class":"center","data":"tester","defaultContent": "-"},
		            {"title":"检验时间","class":"center","data": "test_date","defaultContent": "-"}
		          ],
	});
}


