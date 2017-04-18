$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#file").val("");
		getFactorySelect();
	}
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
	});
	$("#btn_upload").click (function () {
		alert("btn_upload");
		$("#uploadMasterPlanForm").ajaxSubmit({
			url:"uploadMasterPlan",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){					
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}
			}			
		});
	});
});

function getFactorySelect(){
	$.ajax({
		url : "/IMMS/common/getFactorySelect",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response.data, "", "#search_factory");
		}
	});
}