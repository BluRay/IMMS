$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	});

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})

	$(document).on("change","#search_factory",function(){
		var factory=$("#search_factory :selected").text();
		getWorkshopSelect("hrReport/waitReport",factory,"","#search_workshop",null,"id");
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id");
		$("#search_team").html("<option value=''>全部</option>");
	});
	
	$(document).on("change","#search_workshop",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id");
		$("#search_team").html("<option value=''>全部</option>");
	});
	
	$(document).on("change","#search_workgroup",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		var workgroup=$("#search_workgroup :selected").text();
		getTeamSelect(factory,workshop,workgroup,"","#search_team","全部","id");
	});
	//导出功能
	$(document).on("click",".buttons-excel",function(){
		//ajaxQuery(0,'all');
		$("#tableResult tbody").children("tr").children("td:hidden").remove();
		htmlToExcel("tableResult", "", "","等待工时统计","等待工时统计");
		return false;
	});
});


function initPage(){	
	getBusNumberSelect('#nav-search-input');
	$("#search_form")[0].reset();
	getFactorySelect("hrReport/waitReport","","#search_factory",null,"id")	
	getWorkshopSelect("hrReport/waitReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getWorkgroupSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_workgroup","全部","id")
	var LSTR_ndate=new Date(); 
	var LSTR_MM=LSTR_ndate.getMonth()+1;
	var LSTR_MM=LSTR_MM > 10?LSTR_MM:("0"+LSTR_MM)
	$("#waitmanhourdate").val(getPreMonth(LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-01"));
}

function ajaxQuery(){
	
	$(".divLoading").addClass("fade in").show();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[0,1,2,3,4,5,6,7]
	columns= [
	    {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
	    {"title":"车间","class":"center","data":"workshop","defaultContent":""},
	    {"title":"班组","class":"center","data":"workgroup","defaultContent":""},
	    {"title":"小班组","class":"center","data":"team","defaultContent":""},
	    {"title":"等待日期","class":"center","data":"work_date","defaultContent": ""},
	  	{"title":"等待原因","class":"center","data": "wait_reason","defaultContent": ""},	
	  	{"title":"详细原因","width":"150","class":"center","data":"detail_reason","defaultContent": "","render":function(data, type, row ){
        	var html="";
        	if(data.length>50){
        		html="<i title='"+data+"' style='font-style: normal'>"+data.substring(1,50)+"...</i>"
        	}else{
        		html=data;
        	}
        	return html;
        }},
	  	{"title":"单价","class":"center","data": "hour_price","defaultContent": ""},	
	  	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
	  	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
	  	{"title":"岗位","class":"center","data": "job","defaultContent": ""},	
	  	{"title":"等待工时","class":"center","data":"work_hour","defaultContent": ""},
	  	{"title":"人员去向","class":"center","data": "whereabouts","defaultContent": ""},	
	  	{"title":"等待工资","class":"center","data":"wpay","defaultContent": ""},
	  ]	;
	
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 0,
            rightColumns:1
        },
		dom: 'Bfrtip',
		lengthMenu: [
		             [ 20, 50, 100, -1 ],
		             [ '显示20行', '显示50行', '显示100行', '全部' ]
		         ],
	    buttons: [
	        {extend:'excelHtml5',enabled:false,title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	        {extend:'pageLength',text:'显示行'}
	       
	    ],
	    paginate:true,
        rowsGroup:rowsGroup,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: "100%",
		scrollCollapse: false,
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
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
				"factory":$("#search_factory :selected").text(),
				"workshop":$("#search_workshop :selected").text(),
				"workgroup":$("#search_workgroup :selected").text(),
				"team":$("#search_team :selected").text(),
				"staff":$("#staff_number").val(),
				"waitdate":$("#waitmanhourdate").val(),
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getStaffWaitHours",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$(".divLoading").hide();
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
                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		
		},
		columns: columns,
	});
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}
/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    //var t2 = year2 + '-' + month2 + '-' + day2;
    var t2 = year2 + '-' + month2;
    return t2;
}