$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("report/dpuReport",'',"#search_factory",null,'id');
		getWorkshopSelect("report/dpuReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("report/dpuReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnQuery").click (function () {
		if($("#start_date").val()==""){
			alert("请选择开始日期！");
			$("#start_date").focus();
			return false;
		}
		if($("#end_date").val()==""){
			alert("请选择结束日期！");
			$("#end_date").focus();
			return false;
		}
		
		var factory=$("#search_factory").val();
		var workshop=$("#search_workshop").val();
		var startDate=$("#start_date").val();
		var endDate=$("#end_date").val();
		var queryItem=$("#search_index").val();
		var conditions = "{factoryId:'" + factory + "',workshopId:'" + workshop+"',queryItem:'"+
		queryItem+ "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
		console.log("-->conditions = " + conditions);
		
		$.ajax({
			url : "getDPUReportData",
			type : "post",
			dataType : "json",
			data : {
				"conditions" : conditions
			},
			success : function(response) {
				
			}
		});
		
	})
	
});
