var pageSize=1;
var table;
var table_height = $(window).height()-260;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect();
	}
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