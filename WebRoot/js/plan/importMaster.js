$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#file").val("");
	}
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
	});
});