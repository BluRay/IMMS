$(document).ready(function () {	
	initPage();
	
/*	$("#btnQuery").click(function(){
		ajaxQuery();
	});*/
	
    $("#search_factory").change(function(){
    	
    	ajaxQuery();
	});
	
    $("#search_index").change(function(){
    	ajaxQuery();
	});
    
})

function initPage(){
	getFactorySelect();
	ajaxQuery();
}

function ajaxQuery(){
	$(".divLoading").addClass("fade in").show();
	if ( $.fn.dataTable.isDataTable("#tableResult") ) {
		$("#tableResult").dataTable().fnClearTable();
	    $("#tableResult").dataTable().fnDestroy();
	    $('#tableResult').empty();
	}
	$("#tableResult").html("");
	
	var start_date= "";
	var end_date = "";
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay(); 	//今天本周的第几天 
	//var startDate=new Date(now.getTime()-6*24*3600*1000);
	if($("#search_index").val() =='0'){
		start_date= formatDate(now);
		end_date = formatDate(now);
	}else if($("#search_index").val() =='1'){
		var startDate=new Date(now.getTime()-nowDayOfWeek*24*3600*1000);
		start_date= formatDate(startDate);
		end_date = formatDate(now);
	}else if($("#search_index").val() =='2'){
		start_date= ChangeDateToString(now).substring(0,7) + "-01";
		end_date = formatDate(now);
	}else if($("#search_index").val() =='3'){
		start_date= ChangeDateToString(now).substring(0,4) + "-01-01";
		end_date = ChangeDateToString(now).substring(0,4) + "-12-31";
	}
	
	$("#tableResult").DataTable({
		serverSide: true,
	    paginate:false,
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height(),
		scrollX: false,
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			zeroRecords:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." 
		},
        
		ajax:function (data, callback, settings) {
			var param ={
					"factory":$("#search_factory :selected").val(),
					"start_date":start_date,
					"end_date":end_date
					};

            $.ajax({
                type: "post",
                url: "getFactoryYieldData_Mobile",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	//封装返回数据
                	var plan_qty=0;
            	    var finished_qty=0;
                    var returnData = {};
                    returnData.data = result.data;//返回的数据列表
                    var addTotalJson={};
            		$.each(result.data,function(index,value){
            			plan_qty+=parseFloat(value.plan_qty);
            			finished_qty+=parseFloat(value.finished_qty);
            		});
            		addTotalJson={"workshop":"合计",
            				"plan_qty":plan_qty,
            				"finished_qty":finished_qty};
            		returnData.data.push(addTotalJson);
                    callback(returnData);
                }
            });
		
		},
		columns: [
		            {"title":"车间","class":"center workshop","data":"workshop","defaultContent": ""},
		            {"title":"计划数量","class":"center welding_offline","data":"plan_qty","render":function(data,type,row){
		            	return (data!='0' && data!='0%') ? data : '-'
		            },"defaultContent": ""},
		            {"title":"完成数量","class":"center welding_offline","data":"finished_qty","render":function(data,type,row){
		            	return (data!='0' && data!='0%') ? data : '-'
		            },"defaultContent": ""},		            
		            {"title":"达成率","class":"center","data":"","render":function(data,type,row){
		            	var number1=row.finished_qty;
		            	var number2=row.plan_qty!=0 ? row.plan_qty : 1;
		            	var result=((Math.round(number1 / number2 * 10000) / 100.00)>100 ? 100:Math.round(number1 / number2 * 10000) / 100.00) + "%";// 小数点后两位百分比
                        return (result!='0%') ? result : '-'
		            },"defaultContent": ""}
		          ]
	});
}

function getFactorySelect() {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data, "", "#search_factory","全部");

		}
	});
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

function StringToDate(DateStr){     
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  
function DateDiff(strInterval,dtStart,dtEnd){
	switch (strInterval) {   
    case 's' :return parseInt((dtEnd - dtStart) / 1000);  
    case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
    case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
    case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
    case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
    case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
    case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
	}
}
function nextdate(date){ 
	var b = date.getDate(); 
	b += 1; 
	date.setDate(b); 
	var year = date.getFullYear(); //取得当前年份命令 
	var month = date.getMonth()+1; 
	var day = date.getDate(); 
	if(month < 10){ month ='0'+ month ; } 
	if(day < 10){ day ='0'+ day ; } 
	return year+ "-"+ month+"-"+day ; 
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
