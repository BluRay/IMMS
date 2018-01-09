$(document).ready(function(){
	initPage();
	var bread_height=$("#breadcrumbs").height();
	var form_height=$(".page-content-area").eq(0).height();
	height=window.innerHeight-bread_height-form_height-38;
	//alert(height)
	$("#row").css("height",height);
	
	$(document).on("change","#search_index",function(){
		var now = new Date(); 				//当前日期
		var nowDayOfWeek = now.getDay(); 	//今天本周的第几天 
		if($(this).val() == "0"){
			$("#start_date").val(formatDate(now));
			$("#end_date").val(formatDate(now));
		}else if($(this).val() == "1"){
			var startDate=new Date(now.getTime()-nowDayOfWeek*24*3600*1000);
			$("#start_date").val(formatDate(startDate));
			$("#end_date").val(formatDate(now));
		}else if($(this).val() == "2"){
			$("#start_date").val(formatDate(now).substring(0,7) + "-01");
			$("#end_date").val(formatDate(now));
		}

    	$(".fixed-table-body-columns").css("top","35px");
    	ajaxQuery();
	});
	
	$(document).on("change","#search_factory",function(){
		ajaxQuery();
	});
	
	//查询
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
})

function  initPage(){
	var now = new Date(); //当前日期
	//var startDate=new Date(now.getTime()-6*24*3600*1000);
	$("#search_index").val("0");
	$("#start_date").val(formatDate(now));
	$("#end_date").val(formatDate(now));
	
	getFactorySelect("report/staffUseRate",'',"#search_factory",null,'id');
	
	ajaxQuery();
}

function ajaxQuery(){
	$.ajax({
        type: "post",
        url: "getStaffUseRateData",
		dataType:"json",
		data:{
			"draw":1,
			"factory":$("#search_factory :selected").text(),
			"factory_id":$("#search_factory").val(),
			"start_date":$("#start_date").val(),
			"end_date":$("#end_date").val()
		},
		success:function(response){
			var str = "";
			$('#faq-list-1').html("");
    		$.each(response.data,function(index,value){
          		var rate="-";
          		if(!isNaN(Number(value.capacity)) &&Number(value.capacity)>0){
          			rate=Number(value.output)/Number(value.capacity)*100;
          			rate=rate.toFixed(2)+"%"
          		}
          		
            	var mark="";
            	if(value.leave_num !='0' && value.leave_num !=undefined){
            		mark+="请假"+value.leave_num+"人；"
            	}
            	if(value.holiday_num !='0' && value.holiday_num !=undefined){
            		mark+="放假"+value.holiday_num+"人；"
            	}
            	if(value.absence_num !='0' && value.absence_num !=undefined){
            		mark+="旷工"+value.absence_num+"人；"
            	}
            	if(value.out_aid_num !='0' && value.out_aid_num !=undefined){
            		mark+="外出支援"+value.out_aid_num+"人；"
            	}
    			
    			str+='<div class="panel panel-default">'
								+'<div class="panel-heading">'
									+'<a href="#faq-1-1'+value.workshop+'" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">'
										+'<i class="pull-right ace-icon fa fa-chevron-left" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>'
										+'<span style="color:green;font-weight: bold;"> '+value.workshop+'：</span>&nbsp;&nbsp;产量('+(value.output||'0')+')&nbsp;利用率('+(rate||'-')
									+')</a>'
								+'</div>'
	
								+'<div class="panel-collapse collapse" id="faq-1-1'+value.workshop+'" style="height: 0px;">'
									+'<div class="panel-body">'
											+'<div id="faq-list-nested-1'+value.workshop+'" class="panel-group accordion-style1 accordion-style2">'													
													+'<div class="panel panel-default">'
															+'<div class="panel-heading">'
																+'<a href="#faq-list-1-sub-1'+value.workshop+'" data-parent="#faq-list-nested-1'+value.workshop+'" data-toggle="collapse" class="accordion-toggle collapsed">'
																	+'<i class="smaller-80 middle ace-icon fa fa-plus" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;'
																		+'内部人数：'+value.direct_num_yd+'&nbsp;&nbsp;外包人数：'+value.short_num_yd
																+'</a>'
															+'</div>'
													+'</div>'
													+'<div class="panel panel-default">'
															+'<div class="panel-heading">'
																+'<a href="#faq-list-1-sub-1'+value.workshop+'" data-parent="#faq-list-nested-1'+value.workshop+'" data-toggle="collapse" class="accordion-toggle collapsed">'
																	+'<i class="smaller-80 middle ace-icon fa fa-plus" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;'
																		+'IE标准人力：'+(value.bus_cap||'-')
																+'</a>'
															+'</div>'
													+'</div>'												
													+'<div class="panel panel-default">'
															+'<div class="panel-heading">'
																+'<a href="#faq-list-1-sub-1'+value.workshop+'" data-parent="#faq-list-nested-1'+value.workshop+'" data-toggle="collapse" class="accordion-toggle collapsed">'
																	+'<i class="smaller-80 middle ace-icon fa fa-plus" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;'
																		+'对应产能：'+(value.capacity||'0')+'&nbsp;&nbsp;实际产量：'+(value.output||'0')
																+'</a>'
															+'</div>'
													+'</div>'												
													+'<div class="panel panel-default">'
															+'<div class="panel-heading">'
																+'<a href="#faq-list-1-sub-1'+value.workshop+'" data-parent="#faq-list-nested-1'+value.workshop+'" data-toggle="collapse" class="accordion-toggle collapsed">'
																	+'<i class="smaller-80 middle ace-icon fa fa-plus" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;'
																		+'备注：'+(mark||'')
																+'</a>'
															+'</div>'
													+'</div>'												
											+'</div>'	
											
										+'</div>'
									+'</div>'
																						
						+'</div>';
    			
    			
    			
    		});
    		$('#faq-list-1').html(str);
		},
		error:function(response){
			alert(response.message);
		}
	});

}