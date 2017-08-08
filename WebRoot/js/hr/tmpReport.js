$(document).ready(function() {
    initPage();
	
	function initPage() {
		getFactorySelect("hrReport/tmpReport","","#search_factory",null,"id")	
		getWorkshopSelect("hrReport/tmpReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id")
		getWorkgroupSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_workgroup","全部","id")
	}
	
	$(document).on("change","#search_factory",function(){
		var factory=$("#search_factory :selected").text();
		getWorkshopSelect("hrReport/pieceTimeReport",factory,"","#search_workshop",null,"id")
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	$(document).on("change","#search_workshop",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	$(document).on("change","#search_workgroup",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		var workgroup=$("#search_workgroup :selected").text();
		getTeamSelect(factory,workshop,workgroup,"","#search_team","全部","id");
	})
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
});

//限制开始和结束时间为同一个月
function limitMonthDate(e) {
	var DateString;
	if (e == 2) {
		var beginDate = $dp.$("wdate_start").value;
		if (beginDate != "" && beginDate != null) {
			var limitDate = new Date(beginDate);
			limitDate.setDate(new Date(limitDate.getFullYear(), limitDate.getMonth() + 1, 0).getDate()); //获取此月份的天数
			DateString = limitDate.getFullYear() + '-' + (limitDate.getMonth() + 1) + '-' + limitDate.getDate();
			return DateString;
		}
	}
	if (e == 1) {
		var endDate = $dp.$("wdate_end").value;
		if (endDate != "" && endDate != null) {
			var limitDate = new Date(endDate);
			limitDate.setDate("1"); //设置闲置时间为月初
			DateString = limitDate.getFullYear() + '-' + (limitDate.getMonth() + 1) + '-' + limitDate.getDate();
			return DateString;
		}
	}
}



