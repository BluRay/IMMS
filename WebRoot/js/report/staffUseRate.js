$(document).ready(function(){
	initPage();
	
	$(document).on("change","#search_index",function(){
		var now = new Date(); 				//当前日期
		var nowDayOfWeek = now.getDay(); 	//今天本周的第几天 
		if($(this).val() == "0"){
			$("#start_date").val(formatDate(now));
			$("#end_date").val(formatDate(now));
		}else if($(this).val() == "1"){
			var startDate=new Date(now.getTime()-nowDayOfWeek*24*3600*1000);
			$("#start_date").val(formatDate(startDate));
			$("#end_date").val(formatDate(now));
		}else if($(this).val() == "2"){
			$("#start_date").val(formatDate(now).substring(0,7) + "-01");
			$("#end_date").val(formatDate(now));
		}

    	$(".fixed-table-body-columns").css("top","35px");
    	ajaxQuery();
	});
	
	$(document).on("change","#search_factory",function(){
		ajaxQuery();
	});
	
	//查询
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
})

function  initPage(){
	var now = new Date(); //当前日期
	//var startDate=new Date(now.getTime()-6*24*3600*1000);
	$("#search_index").val("0");
	$("#start_date").val(formatDate(now));
	$("#end_date").val(formatDate(now));
	
	getFactorySelect("report/staffUseRate",'',"#search_factory",null,'id');
	
	ajaxQuery();
}

function ajaxQuery(){
	$(".divLoading").addClass("fade in").show();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	var columns= [
	          	{"title":"地区","class":"center","width":"150","data":"factory","defaultContent": ""},
	          	{"title":"车间","class":"center","width":"80","data":"workshop","defaultContent": ""},
	          	{"title":"内部人数","class":"center","width":"80","data":"direct_num_yd","defaultContent": ""},
	            {"title":"外包人数","class":"center","width":"80","data":"short_num_yd","defaultContent":""},
	            {"title":"IE标准人力","class":"center","width":"150","data":"bus_cap","defaultContent":""},
	            {"title":"对应产能","class":"center","width":"80","data":"capacity","defaultContent": ""},
	          	{"title":"实际产量","class":"center","width":"80","data":"output","defaultContent": ""},
	          	{"title":"人员利用率","class":"center","data":"","width":"100","defaultContent": "","render":function(data,type,row){
	          		var rate="-";
	          		if(!isNaN(Number(row.capacity)) &&Number(row.capacity)>0){
	          			rate=Number(row.output)/Number(row.capacity)*100;
	          			rate=rate.toFixed(2)+"%"
	          		}
	          		return rate;
	          	}},
	            {"title":"备注","class":"center","data":"output_6","defaultContent":"","render":function(data,type,row){
	            	var mark="";
	            	if(row.leave_num !='0' && row.leave_num !=undefined){
	            		mark+="请假"+row.leave_num+"人；"
	            	}
	            	if(row.holiday_num !='0' && row.holiday_num !=undefined){
	            		mark+="放假"+row.holiday_num+"人；"
	            	}
	            	if(row.absence_num !='0' && row.absence_num !=undefined){
	            		mark+="旷工"+row.absence_num+"人；"
	            	}
	            	if(row.out_aid_num !='0' && row.out_aid_num !=undefined){
	            		mark+="外出支援"+row.out_aid_num+"人；"
	            	}
	            	return mark;
	            }}
	          ]  
	
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 2,
            //rightColumns:2
        },
        rowsGroup:[0],
		dom: 'Bfrtip',
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	       
	    ],
	    paginate:false,
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-220,
		scrollX: true,
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
				"draw":1,
				"factory":$("#search_factory :selected").text(),
				"factory_id":$("#search_factory").val(),
				"start_date":$("#start_date").val(),
				"end_date":$("#end_date").val()
			};

            $.ajax({
                type: "post",
                url: "getStaffUseRateData",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$(".divLoading").hide();
                	staff_salary_list=result.data;
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: columns,
	});
	

	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}