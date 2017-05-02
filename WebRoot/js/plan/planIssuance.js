$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/planRevision",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		$("#btnSave").attr("disabled","disabled");
	}
	$("#btnQuery").click (function () {
		if($('#search_factory').val() == ""){
			alert("请选择工厂！");
			return false;
		}
		if($('#issuance_date').val() == ""){
			alert("请输入发布日期！");
			$('#issuance_date').focus();
			return false;
		}
		$('#revision_str').val("");
		ajaxQuery();
		return false;
	});
	
	
	function ajaxQuery(targetPage){
		$.ajax({
		    url: "getIssuancePlan",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"issuance_date": $('#issuance_date').val()
		    },
		    success:function(response){	
		    	
		    }
		});
		
	}
});