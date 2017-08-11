var extArray = new Array(".xlsx");
$(document).ready(function(){
	initPage();
    
    $("#reportType").change(function(){
    	if($(this).val()=='计件'){
    		/*$("#attendanceTable").css("display","");
    		$("#attendanceTable_hour").css("display","none");*/
    		$("#upload_template").attr("href","download/人员考勤模板-计件.xlsx");
    	}else{
    		/*$("#attendanceTable").css("display","none");
    		$("#attendanceTable_hour").css("display","");*/
    		$("#upload_template").attr("href","download/人员考勤模板-计时.xlsx");
    	}
    });
    
    $("#btnBulkAdd").click(function(){
    	$("#divBulkAdd").css("display","");
    });
    
    $("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
	});
    
    $("#btnQuery").click(function(){
    	ajaxQuery();
    })
    
})

function initPage(){
	$("#hr_plan").addClass("in");
	var d = new Date(); 
    var s = d.getFullYear().toString() + '-'+addzero(d.getMonth() + 1)+"-"+d.getDate();
    $("#record_date").val(s);
    $("#reportType").val("计件");	
}

function addzero(v) {
	if (v < 10) return '0' + v;return v.toString();
}

function LimitAttach(form, file) {
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		var url="";
		var report_type=$("#reportType").val();
		if(report_type=='计件'){
			url="uploadAttendenceData"
		}else{
			url="uploadAttendenceHourData";
		}
		$("#attendanceUploadForm").ajaxSubmit({
			url:url,
			type: "post",
			dataType:"json",
			data:{
				record_date:$("#record_date").val()
			},
			success:function(response){
				alert(response.message);	
				$("#divBulkAdd").css("display","none");
				if(response.success){
					ajaxQuery();
				}			
			}			
		});
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
	return false;
}

function ajaxQuery(){
	$("#divBulkAdd").css("display","none");
	var conditions={};
	var factory=$("#factory").val();
	var workshop=$("#workshop").val();
	var record_date=$("#record_date").val();
	var report_type=$("#reportType").val();
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.record_date=record_date;
	conditions.report_type=report_type;
	
	$.ajax({
		url:"getReportData",
		type: "post",
		dataType:"json",
		data:{
			conditions:JSON.stringify(conditions)
		},
		success:function(response){
			var tableId=report_type=="计件"?"#attendanceTable":"#attendanceTable_hour"
			$(tableId).find("tbody").html("");
			if(report_type=="计件"){
				$.each(response.reportList,function(index,value){
					var tr=$("<tr />");
					$("<td />").html(value.factory).appendTo(tr)
					$("<td />").html(value.workshop).appendTo(tr)
					$("<td />").html(value.team).appendTo(tr)
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
					$("<td />").html(value.in_aid_tj_num).appendTo(tr)
					$("<td />").html(value.in_aid_oth_num).appendTo(tr)
					$("<td />").html(value.in_aid_note).appendTo(tr)
					
					$(tableId).find("tbody").append(tr);
				})		
			}else{
				$.each(response.reportList,function(index,value){
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
					$("<td />").html(value.in_aid_tj_num).appendTo(tr)
					$("<td />").html(value.in_aid_oth_num).appendTo(tr)
					$("<td />").html(value.in_aid_note).appendTo(tr)
					
					$(tableId).find("tbody").append(tr);
				})		
			}
			
			showTable(report_type);	
		}			
	})
	
}

function showTable(report_type){
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#attendanceTable")){
		$('#attendanceTable').DataTable().destroy();
		$('#attendanceTable').empty();
	}
	if($.fn.dataTable.isDataTable("#attendanceTable_hour")){
		$('#attendanceTable_hour').DataTable().destroy();
		$('#attendanceTable_hour').empty();
	}
	$('#attendanceTable').hide();
	$('#attendanceTable_hour').hide();
	
	var tableId="#attendanceTable"
	if(report_type=='计时'){
		tableId="#attendanceTable_hour"
	}
	$(tableId).show();
	
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
			sScrollY: $(window).height()-250,
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
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}