$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/planSearch",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("plan/planSearch",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		
		var now = new Date(); //当前日期
		var startDate=new Date(now.getTime()-6*24*3600*1000);
		$("#start_date").val(formatDate(startDate));
		$("#end_date").val(formatDate(now));
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/planSearch",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
});
