var pageSize=1;
var table;
var table_height = $(window).height()-260;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		$("#btnSave").attr("disabled","disabled");
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect();
		cur_year = new Date().getFullYear();
		$("#search_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		if(new Date().getMonth()+1 <10){
			$("#search_month").val("0"+(new Date().getMonth()+1));
		}else{
			$("#search_month").val(new Date().getMonth()+1);
		}
	};
	
	$("#btnQuery").click (function () {
		if($('#search_order_no').val() == ""){
			alert("请输入订单号！");
			$('#search_order_no').focus();
			return false;
		}else if($('#search_factory').val() == ""){
			alert("请选择工厂！");
		}
		$('#revision_str').val("");
		ajaxQuery();
		return false;
	});
	
});

function ajaxQuery(){
	$.ajax({
	    url: "showPlanMasterList",
	    dataType: "json",
		type: "get",
	    data: {
	    	"version":"",
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"plan_month": $("#search_year").val() + $("#search_month").val()
	    },
	    success:function(response){
	    	$("#tableData tbody").html("");
    		$("#btnSave").removeAttr("disabled");
    		var stock = new Array(0,0,0,0,0,0,0,0,0,0,0);		//库存
    		var day = new Array("日", "一", "二", "三", "四", "五", "六"); 
    		var input = "<input class=\"cell\" style=\"border:0;width:18px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";

    		
	    }
	});
}

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