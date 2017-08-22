$(document).ready(function(){
	
	initPage();
})

function initPage(){
	getFactorySelect("report/factoryOutputYear","","#search_factory",null,"id");
	var year=new Date().getFullYear();
	$("#search_year").val(year);
}