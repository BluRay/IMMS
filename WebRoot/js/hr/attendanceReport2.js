var extArray = new Array(".xlsx");
$(document).ready(function(){
	initPage();
    
    $("#reportType").change(function(){
    	if($(this).val()=='计件'){
    		$("#reportCount").parent().show();
    	}else{
    		$("#reportCount").parent().hide();
    	}
    });
    
    $(document).on("change","#factory",function(){
		var factory=$("#factory :selected").text();
		getWorkshopSelect("hrReport/attendanceUpload",factory,"","#workshop","全部","id","")		
	})
    
    $("#btnQuery").click(function(){
    	ajaxQuery();
    })

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
    
})

function initPage(){
	getBusNumberSelect('#nav-search-input');
	$("#hr_plan").addClass("in");
	var d = new Date(); 
    var s = d.getFullYear().toString() + '-'+addzero(d.getMonth() + 1)+"-"+addzero(d.getDate());
    $("#record_date").val(s);
    $("#reportType").val("计件");
    getFactorySelect("hrReport/attendanceUpload","","#factory",null,"id")	
	getWorkshopSelect("hrReport/attendanceUpload",$("#factory :selected").text(),"","#workshop","全部","id","")
	
}

function addzero(v) {
	if (v < 10) return '0' + v;return v.toString();
}

function ajaxQuery(){
	$(".divLoading").addClass("fade in").show();
	var url="getAttendenceReport";
	var conditions={};
	var factory=$("#factory :selected").text();
	var workshop=$("#workshop :selected").text();
	var record_date=$("#record_date").val();
	var report_type=$("#reportType").val();
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.record_date=record_date;
	conditions.report_type=report_type;
	
	$('#attendanceTable').hide();
	$('#attendanceTable_hour').hide();
	$('#attendanceTable_total').hide();
	
	var tableId="#attendanceTable"
	if(report_type=='计时'){
		tableId="#attendanceTable_hour"
	}else{
		if($("#reportCount").val()=='workshop'){
			tableId="#attendanceTable_total"
			
    	}else{
    		tableId="#attendanceTable";
    		url="getReportData";
    	}
	}
	$(tableId).show();
	
	if ( $.fn.dataTable.isDataTable("#attendanceTable") ) {
		$("#attendanceTable").dataTable().fnClearTable();
	    $("#attendanceTable").dataTable().fnDestroy();
	}
	if ( $.fn.dataTable.isDataTable("#attendanceTable_hour") ) {
		$("#attendanceTable_hour").dataTable().fnClearTable();
	    $("#attendanceTable_hour").dataTable().fnDestroy();
	}
	if ( $.fn.dataTable.isDataTable("#attendanceTable_total") ) {
		$("#attendanceTable_total").dataTable().fnClearTable();
	    $("#attendanceTable_total").dataTable().fnDestroy();
	}
	
	$.ajax({
		url:url,
		type: "post",
		dataType:"json",
		data:{
			conditions:JSON.stringify(conditions)
		},
		success:function(response){
			//var tableId=report_type=="计件"?"#attendanceTable":"#attendanceTable_hour"
			$(tableId).find("tbody").html("");
			if(report_type=="计件"){
				$.each(response.data,function(index,value){
					var tr=$("<tr />");
					$("<td />").html(value.factory).appendTo(tr)
					$("<td />").html(value.workshop).appendTo(tr)
					if($("#reportCount").val()=='workgroup'){
						$("<td />").html(value.team).appendTo(tr)
					}
					
					$("<td />").html(value.direct_num_yd).appendTo(tr)
					$("<td />").html(value.direct_num_sd).appendTo(tr)
					$("<td />").html(value.short_num_yd).appendTo(tr)
					$("<td />").html(value.short_num_sd).appendTo(tr)
					$("<td />").html(value.leave_num).appendTo(tr)
					$("<td />").html(value.holiday_num).appendTo(tr)
					$("<td />").html(value.absence_num).appendTo(tr)
					$("<td />").html(value.trip_num).appendTo(tr)
					$("<td />").html(value.out_aid_num).appendTo(tr)
					$("<td />").html(value.work_num).appendTo(tr)
					$("<td />").html(value.out_aid_cs_num).appendTo(tr)
					$("<td />").html(value.out_aid_nj_num).appendTo(tr)
					$("<td />").html(value.out_aid_hz_num).appendTo(tr)
					$("<td />").html(value.out_aid_dl_num).appendTo(tr)
					$("<td />").html(value.out_aid_qd_num).appendTo(tr)
					$("<td />").html(value.out_aid_cd_num).appendTo(tr)
					$("<td />").html(value.out_aid_wh_num).appendTo(tr)
					$("<td />").html(value.out_aid_sw_num).appendTo(tr)
					$("<td />").html(value.out_aid_ty_num).appendTo(tr)
					$("<td />").html(value.out_aid_sz_num).appendTo(tr)
					$("<td />").html(value.out_aid_xa_num).appendTo(tr)
					$("<td />").html(value.out_aid_nb_num).appendTo(tr)
					$("<td />").html(value.out_aid_yc_num).appendTo(tr)
					$("<td />").html(value.out_aid_tj_num).appendTo(tr)
					$("<td />").html(value.out_aid_oth_num).appendTo(tr)
					$("<td />").html(value.out_aid_note).appendTo(tr)
					$("<td />").html(value.in_aid_cs_num).appendTo(tr)
					$("<td />").html(value.in_aid_nj_num).appendTo(tr)
					$("<td />").html(value.in_aid_hz_num).appendTo(tr)
					$("<td />").html(value.in_aid_dl_num).appendTo(tr)
					$("<td />").html(value.in_aid_qd_num).appendTo(tr)
					$("<td />").html(value.in_aid_cd_num).appendTo(tr)
					$("<td />").html(value.in_aid_wh_num).appendTo(tr)
					$("<td />").html(value.in_aid_sw_num).appendTo(tr)
					$("<td />").html(value.in_aid_ty_num).appendTo(tr)
					$("<td />").html(value.in_aid_sz_num).appendTo(tr)
					$("<td />").html(value.in_aid_xa_num).appendTo(tr)
					$("<td />").html(value.in_aid_nb_num).appendTo(tr)
					$("<td />").html(value.in_aid_yc_num).appendTo(tr)
					$("<td />").html(value.in_aid_tj_num).appendTo(tr)
					$("<td />").html(value.in_aid_oth_num).appendTo(tr)
					$("<td />").html(value.in_aid_note).appendTo(tr)
					
					$(tableId).find("tbody").append(tr);
				})		
			}else{
				$.each(response.data,function(index,value){
					var tr=$("<tr />");
					$("<td />").html(value.factory).appendTo(tr)
					$("<td />").html(value.workshop).appendTo(tr)
					$("<td />").html(value.assist_num_yd).appendTo(tr)
					$("<td />").html(value.assist_num_sd).appendTo(tr)
					$("<td />").html(value.leave_num).appendTo(tr)
					$("<td />").html(value.holiday_num).appendTo(tr)
					$("<td />").html(value.absence_num).appendTo(tr)
					$("<td />").html(value.trip_num).appendTo(tr)
					$("<td />").html(value.callout_num).appendTo(tr)
					$("<td />").html(value.out_aid_num).appendTo(tr)
					$("<td />").html(value.work_num).appendTo(tr)
					$("<td />").html(value.out_aid_cs_num).appendTo(tr)
					$("<td />").html(value.out_aid_nj_num).appendTo(tr)
					$("<td />").html(value.out_aid_hz_num).appendTo(tr)
					$("<td />").html(value.out_aid_dl_num).appendTo(tr)
					$("<td />").html(value.out_aid_qd_num).appendTo(tr)
					$("<td />").html(value.out_aid_cd_num).appendTo(tr)
					$("<td />").html(value.out_aid_wh_num).appendTo(tr)
					$("<td />").html(value.out_aid_sw_num).appendTo(tr)
					$("<td />").html(value.out_aid_ty_num).appendTo(tr)
					$("<td />").html(value.out_aid_sz_num).appendTo(tr)
					$("<td />").html(value.out_aid_xa_num).appendTo(tr)
					$("<td />").html(value.out_aid_nb_num).appendTo(tr)
					$("<td />").html(value.out_aid_yc_num).appendTo(tr)
					$("<td />").html(value.out_aid_tj_num).appendTo(tr)
					$("<td />").html(value.out_aid_oth_num).appendTo(tr)
					$("<td />").html(value.out_aid_note).appendTo(tr)
					$("<td />").html(value.in_aid_cs_num).appendTo(tr)
					$("<td />").html(value.in_aid_nj_num).appendTo(tr)
					$("<td />").html(value.in_aid_hz_num).appendTo(tr)
					$("<td />").html(value.in_aid_dl_num).appendTo(tr)
					$("<td />").html(value.in_aid_qd_num).appendTo(tr)
					$("<td />").html(value.in_aid_cd_num).appendTo(tr)
					$("<td />").html(value.in_aid_wh_num).appendTo(tr)
					$("<td />").html(value.in_aid_sw_num).appendTo(tr)
					$("<td />").html(value.in_aid_ty_num).appendTo(tr)
					$("<td />").html(value.in_aid_sz_num).appendTo(tr)
					$("<td />").html(value.in_aid_xa_num).appendTo(tr)
					$("<td />").html(value.in_aid_nb_num).appendTo(tr)
					$("<td />").html(value.in_aid_yc_num).appendTo(tr)
					$("<td />").html(value.in_aid_tj_num).appendTo(tr)
					$("<td />").html(value.in_aid_oth_num).appendTo(tr)
					$("<td />").html(value.in_aid_note).appendTo(tr)
					
					$(tableId).find("tbody").append(tr);
				})		
			}
			/*$('#attendanceTable').hide();
			$('#attendanceTable_hour').hide();
			
		
			$(tableId).show();*/
			
			showTable(report_type);	
		}			
	})
	
}

function showTable(report_type){
	var conditions={};
	var factory=$("#factory").val();
	var workshop=$("#workshop").val();
	var record_date=$("#record_date").val();
	var report_type=$("#reportType").val();
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.record_date=record_date;
	conditions.report_type=report_type;
	var tableId="#attendanceTable"
	if(report_type=='计时'){
			tableId="#attendanceTable_hour"
		}else{
			if($("#reportCount").val()=='workshop'){
				tableId="#attendanceTable_total"
				
	    	}else{
	    		tableId="#attendanceTable";
	    		url="getReportData";
	    	}
		}
	
	/*if ( $.fn.dataTable.isDataTable(tableId) ) {
	    table = $(tableId).DataTable();
	}else*/
	$(tableId).dataTable({
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
			sScrollY: $(window).height()-140,
			scrollX: true,
			info:false,
			orderMulti:false,
			language: {
				emptyTable:"抱歉，未查询到数据！",
				loadingRecords:"正在查询，请稍后..." ,
				infoEmpty:"抱歉，未查询到数据！",
			},
			
	  });
	
	$(tableId).find('.dataTables_empty').css("padding-left","350px")
	$(".dt-buttons").css("position","fixed").css("left","92%");
	$(".dt-buttons").css("top","110px").find("a").css("border","0px");
	var head_width=$(".dataTables_scroll").width();
	$(".dataTables_scrollBody").scrollTop(10);
	//alert($(".dataTables_scrollBody").scrollTop());

	if($(".dataTables_scrollBody").scrollTop()>0){
		$(".dataTables_scrollHead").css("width",head_width-20);
		$(".dataTables_scrollBody").scrollTop(0);
	}
	$(".divLoading").hide();
    
}
