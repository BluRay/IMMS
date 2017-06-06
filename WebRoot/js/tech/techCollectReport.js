$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("tech/techTaskReport",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
	}
	
});
