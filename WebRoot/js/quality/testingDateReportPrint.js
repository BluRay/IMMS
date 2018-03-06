
$(document).ready(function(){
	var ecnTaskId = GetQueryString('taskid');
	
	$("#btnPrint").click(function() {
		$("#btnPrint").hide();
		setTimeout(function() {
			window.print();
		}, 500);
		
		//$("#btnPrint").show();
	});
	window.onafterprint=function(){
		$("#btnPrint").show();
	};
	$("#btnClose").click(function() {
		window.opener=null;window.close();
	});
	
	
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}