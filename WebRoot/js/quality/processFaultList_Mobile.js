
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		var now = new Date(); //当前日期
		var start_date= ChangeDateToString(now).substring(0,7) + "-01";
		var end_date = formatDate(now);
		$("#search_fault_date_start").val(start_date);
		$("#search_fault_date_end").val(end_date);
		getKeysSelect("PROCESS_FAULT_AREA", "", "#search_area","全部","value");
	}
	
	$("#search_vin").change(function(){
    	ajaxQuery();
	});
	$("#search_area").change(function(){
    	ajaxQuery();
	});

	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#search_vin').bind('keydown', function(event) {
        if (event.keyCode == "13"){
            if(jQuery.trim($('#search_vin').val()) != ""){
            	ajaxQuery();
            }
            return false;
        }
    });
    
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
    
})

function ajaxQuery(){
		if ( $.fn.dataTable.isDataTable("#tableResult") ) {
			$("#tableResult").dataTable().fnClearTable();
		    $("#tableResult").dataTable().fnDestroy();
		    $('#tableResult').empty();
		}
		$("#tableResult").html("");
		
		$("#tableResult").DataTable({
			serverSide: true,
		    paginate:false,
			paiging:false,
			ordering:false,
			searching: false,
			bAutoWidth:false,
			destroy: true,
			//sScrollY: $(window).height(),
			//scrollX: false,
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
						"vin":$("#search_vin").val(),
						"area":$("#search_area :selected").text(),
						"fault_date_start":$("#search_fault_date_start").val(),
						"fault_date_end":$("#search_fault_date_end").val()
						};
	            $.ajax({
	                type: "post",
	                url: "getProcessFaultListFromMobile",
	                cache: false,  //禁用缓存
	                data: param,  //传入组装的参数
	                dataType: "json",
	                success: function (result) {
	                    callback(result);
	                }
	            });
			
			},
			columns: [
			            {"title":"VIN号","class":"center workshop","data":"vin","defaultContent": ""},
			            {"title":"销售区域","class":"center workshop","data":"processFaultArea","defaultContent": ""},
			            {"title":"车牌号码","class":"center workshop","data":"license_number","defaultContent": ""}
			          ]
		});
		
	}
