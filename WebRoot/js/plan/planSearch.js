var div_height = $(window).height()-250;
var li_flag = "1";
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
		$("#home").css("height",div_height);
		$("#messages").css("height",div_height);
	}
	
	$("li").click(function(e){
		if(this.id == "div1"){
			li_flag = "1";
			getSearch();
		}else{
			li_flag = "2";
			getDetail();
		}
	});
	
	$("#btnQuery").click (function () {
		if($("#search_factory").val()==""){
			alert("请选择生产工厂！");
			return false;
		}
		if($("#start_date").val()==""){
			alert("请选择生产开始日期！");
			$("#start_date").focus();
			return false;
		}
		if($("#end_date").val()==""){
			alert("请选择生产结束日期！");
			$("#end_date").focus();
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	function ajaxQuery(targetPage){	
		if (li_flag =="1"){
			//getSearch();
		}else{
			//getDetail();
		}
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/planSearch",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
});
