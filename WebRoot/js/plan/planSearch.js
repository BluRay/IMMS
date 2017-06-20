var div_height = $(window).height()-250;
var li_flag = "1";
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/planSearch",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("plan/planSearch",$("#search_factory :selected").text(),"","#search_workshop",'全部',"id");
		
		var now = new Date(); //当前日期
		var startDate=new Date(now.getTime()-6*24*3600*1000);
		$("#start_date").val(formatDate(startDate));
		$("#end_date").val(formatDate(now));
		//$("#home").css("height",div_height);
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
			getSearch();
		}else{
			//getDetail();
		}
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/planSearch",$("#search_factory :selected").text(),"","#search_workshop",'全部',"id");
	})
	
});

function getSearch(){
	$.ajax({
	    url: "showPlanSearch",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val().trim(),
	    	"workshop": $('#search_workshop').find("option:selected").text(),
	    	"start_date": $('#start_date').val(),
	    	"end_date": $('#end_date').val(),
	    },
	    success:function(response){	
	    	$("#tablePlan tbody").html("");
    		var last_order="";
    		var orderTd="";
    		var tplan_zzj=0;
    		var treal_zzj=0;
    		var tplan_bjon=0;
    		var treal_bjon=0;
    		var tplan_bjoff=0;
    		var treal_bjoff=0;
    		
    		var tplan_hzon=0;
    		var treal_hzon=0;
    		var tplan_hzoff=0;
    		var treal_hzoff=0;
    		
    		var tplan_tzon=0;
    		var treal_tzon=0;
    		var tplan_tzoff=0;
    		var treal_tzoff=0;
    		
    		var tplan_dpon=0;
    		var treal_dpon=0;
    		var tplan_dpoff=0;
    		var treal_dpoff=0;
    		
    		var tplan_zzon=0;
    		var treal_zzon=0;
    		var tplan_zzoff=0;
    		var treal_zzoff=0;
    		
    		var tplan_rk=0;
    		var treal_rk=0;
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");  			
    			if(last_order==value.order_desc){
    				var rowspan=parseInt($(orderTd).attr("rowspan"));
    				$(orderTd).attr("rowspan",rowspan+1);
    			}else{ 
    				orderTd="#order_"+value.order_id;
    				$("<td style=\"text-align:center;\" rowspan=1 id='order_"+value.order_id+"'/>").html(value.order_desc).appendTo(tr);
    			}
    			$("<td style=\"text-align:center;\" />").html(value.key_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.total_plan_qty).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.real_qty).appendTo(tr);
    			var rate_qty = "-";var rate_amend_qty = "-";
    			if(value.total_plan_qty != 0){
    				rate_qty = Math.round(value.real_qty / value.total_plan_qty * 10000) / 100.00 + "%";
    			}
    			$("<td style=\"text-align:center;\" />").html(rate_qty).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.total_qty).appendTo(tr);
    			last_order=value.order_desc;
    			$("#tablePlan tbody").append(tr);
    			tplan_zzj+=(value.key_name=='自制件下线'?parseInt(value.total_plan_qty):0);
        		treal_zzj+=(value.key_name=='自制件下线'?parseInt(value.real_qty):0);
        		tplan_bjon+=(value.key_name=='部件上线'?parseInt(value.total_plan_qty):0);
        		treal_bjon+=(value.key_name=='部件上线'?parseInt(value.real_qty):0);
        		tplan_bjoff+=(value.key_name=='部件下线'?parseInt(value.total_plan_qty):0);
        		treal_bjoff+=(value.key_name=='部件下线'?parseInt(value.real_qty):0);       		
        		tplan_hzon+=(value.key_name=='焊装上线'?parseInt(value.total_plan_qty):0);
        		treal_hzon+=(value.key_name=='焊装上线'?parseInt(value.real_qty):0);
        		tplan_hzoff+=(value.key_name=='焊装下线'?parseInt(value.total_plan_qty):0);
        		treal_hzoff+=(value.key_name=='焊装下线'?parseInt(value.real_qty):0);        		
        		tplan_tzon+=(value.key_name=='涂装上线'?parseInt(value.total_plan_qty):0);
        		treal_tzon+=(value.key_name=='涂装上线'?parseInt(value.real_qty):0);
        		tplan_tzoff+=(value.key_name=='涂装下线'?parseInt(value.total_plan_qty):0);
        		treal_tzoff+=(value.key_name=='涂装下线'?parseInt(value.real_qty):0);       		
        		tplan_dpon+=(value.key_name=='底盘上线'?parseInt(value.total_plan_qty):0);
        		treal_dpon+=(value.key_name=='底盘上线'?parseInt(value.real_qty):0);
        		tplan_dpoff+=(value.key_name=='底盘下线'?parseInt(value.total_plan_qty):0);
        		treal_dpoff+=(value.key_name=='底盘下线'?parseInt(value.real_qty):0);
        		tplan_zzon+=(value.key_name=='总装上线'?parseInt(value.total_plan_qty):0);
        		treal_zzon+=(value.key_name=='总装上线'?parseInt(value.real_qty):0);
        		tplan_zzoff+=(value.key_name=='总装下线'?parseInt(value.total_plan_qty):0);
        		treal_zzoff+=(value.key_name=='总装下线'?parseInt(value.real_qty):0);
        		tplan_rk+=(value.key_name=='入库'?parseInt(value.total_plan_qty):0);
        		treal_rk+=(value.key_name=='入库'?parseInt(value.real_qty):0);			
    		});
    		$("#tr_plan").find("td").eq("1").html(tplan_zzj);
    		$("#tr_plan").find("td").eq("2").html(tplan_bjoff);
    		$("#tr_plan").find("td").eq("3").html(tplan_hzon);
    		$("#tr_plan").find("td").eq("4").html(tplan_tzon);
    		$("#tr_plan").find("td").eq("5").html(tplan_dpon);
    		$("#tr_plan").find("td").eq("6").html(tplan_zzoff);
    		$("#tr_plan").find("td").eq("7").html(tplan_rk);
    		
    		$("#tr_realDone").find("td").eq("1").html(treal_zzj);
    		$("#tr_realDone").find("td").eq("2").html(treal_bjoff);
    		$("#tr_realDone").find("td").eq("3").html(treal_hzon);
    		$("#tr_realDone").find("td").eq("4").html(treal_tzon);
    		$("#tr_realDone").find("td").eq("5").html(treal_dpon);
    		$("#tr_realDone").find("td").eq("6").html(treal_zzon);
    		$("#tr_realDone").find("td").eq("7").html(treal_rk);
    		
    		$("#tr_doneRate").find("td").eq("1").html(tplan_zzj==0?"-":(Math.round(treal_zzj/tplan_zzj * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("2").html(tplan_bjoff==0?"-":(Math.round(treal_bjoff/tplan_bjoff * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("3").html(tplan_hzon==0?"-":(Math.round(treal_hzon/tplan_hzon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("4").html(tplan_tzon==0?"-":(Math.round(treal_tzon/tplan_tzon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("5").html(tplan_dpon==0?"-":(Math.round(treal_dpon/tplan_dpon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("6").html(tplan_zzoff==0?"-":(Math.round(treal_zzoff/tplan_zzoff * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("7").html(tplan_rk==0?"-":(Math.round(treal_rk/tplan_rk * 10000) / 100.00 + "%"));

	    	
	    }
	});
	
}

