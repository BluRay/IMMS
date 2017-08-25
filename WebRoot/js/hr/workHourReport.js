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
	var rowsGroup=[0,1,2];
	columns= [
        {"title":"序号","class":"center","data":"count","defaultContent": ""},
	    {"title":"工号","class":"center","width":"60px","data":"staff_number","defaultContent": ""},
	    {"title":"姓名","class":"center","width":"60px","data":"staff_name","defaultContent":""},
	    {"title":"类型","class":"center","data":"type","defaultContent":""},
	    {"title":"01","class":"center","data":"01","defaultContent":""},
	    {"title":"02","class":"center","data":"02","defaultContent": ""},
	  	{"title":"03","class":"center","data": "03","defaultContent": ""},	
	  	{"title":"04","class":"center","data":"04","defaultContent": ""},
	  	{"title":"05","class":"center","data": "05","defaultContent": ""},	
	  	{"title":"06","class":"center","data":"06","defaultContent": ""},
	  	{"title":"07","class":"center","data":"07","defaultContent": ""},
	  	{"title":"08","class":"center","data": "08","defaultContent": ""},	
	  	{"title":"09","class":"center","data":"09","defaultContent": ""},
	  	{"title":"10","class":"center","data": "10","defaultContent": ""},	
	  	{"title":"11","class":"center","data":"11","defaultContent": ""},
	  	{"title":"12","class":"center","data":"12","defaultContent":""},
	    {"title":"13","class":"center","data":"13","defaultContent": ""},
	  	{"title":"14","class":"center","data": "14","defaultContent": ""},	
	  	{"title":"15","class":"center","data":"15","defaultContent": ""},
	  	{"title":"16","class":"center","data": "16","defaultContent": ""},	
	  	{"title":"17","class":"center","data":"17","defaultContent": ""},
	  	{"title":"18","class":"center","data":"18","defaultContent": ""},
	  	{"title":"19","class":"center","data": "19","defaultContent": ""},	
	  	{"title":"20","class":"center","data":"20","defaultContent": ""},
	  	{"title":"21","class":"center","data": "21","defaultContent": ""},	
	  	{"title":"22","class":"center","data":"22","defaultContent": ""},
	  	{"title":"23","class":"center","data":"23","defaultContent":""},
	    {"title":"24","class":"center","data":"24","defaultContent": ""},
	  	{"title":"25","class":"center","data": "25","defaultContent": ""},	
	  	{"title":"26","class":"center","data":"26","defaultContent": ""},
	  	{"title":"27","class":"center","data": "27","defaultContent": ""},	
	  	{"title":"28","class":"center","data":"28","defaultContent": ""},
	  	{"title":"29","class":"center","data":"29","defaultContent": ""},
	  	{"title":"30","class":"center","data": "30","defaultContent": ""},	
	  	{"title":"31","class":"center","data":"31","defaultContent": ""},
	  ]	;
	var day = new Array("日", "一", "二", "三", "四", "五", "六"); 
	var date= new Date($("#waitmanhourdate").val() + "-01");      //转换成Data();
	// 判定每月1号是星期几,用于设置周六、周日背景色
	var weekday=day[(date.getDay())%7];
	var d=[];
	if(weekday=="一"){ // 【9,10,16,17,23,24,30,31】列号背景色绿色
		d=[9,10,16,17,23,24,30,31];
	}
	if(weekday=="二"){
		d=[8,9,15,16,22,23,29,30];
	}
	if(weekday=="三"){
		d=[7,8,14,15,21,22,28,29];
	}
	if(weekday=="四"){
		d=[6,7,13,14,20,21,27,28,34];
	}
	if(weekday=="五"){
		d=[5,6,12,13,19,20,26,27,33,34];
	}
	if(weekday=="六"){
		d=[4,5,11,12,18,19,25,26,32,33];
	}
	if(weekday=="日"){
		d=[3,4,10,11,17,18,24,25,31,32];
	}
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 4,
            rightColumns:0
        },
		dom: 'Bfrtip',
		lengthMenu: [
		             [ 20, 50, 100, -1 ],
		             [ '显示20行', '显示50行', '显示100行', '全部' ]
		         ],
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        //{extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	        {extend:'pageLength',text:'显示行'}
	       
	    ],
	    paginate:true,
        rowsGroup:rowsGroup,
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: ($(window).height()-250)+"px",
		scrollX: true,
		pageLength: 10,
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." ,
			infoEmpty:"抱歉，未查询到数据！",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}
		},
		aoColumnDefs : [
            {
                "aTargets" :d,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {   
    	             $(nTd).css('background-color', 'green');
	             }   
            }
        ],
		ajax:function (data, callback, settings) {
			
			var param ={
				"draw":1,
				"factory":$("#search_factory :selected").text(),
				"workshop":$("#search_workshop :selected").text(),
				"workgroup":$("#search_workgroup :selected").text(),
				"team":$("#search_team :selected").text(),
				"staff":$("#staff_number").val(),
				"work_date":$("#waitmanhourdate").val(),
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "queryStaffWorkHoursList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$(".divLoading").hide();
                    console.log("data",result.data);
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