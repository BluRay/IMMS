$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/busDispatchPlan",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getBusType();
	}
	
	$("#btnAdd").on('click', function(e) {
		getFactorySelect("plan/busDispatchPlan",'',"#new_factory",null,'id');
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加发车计划</h4></div>',
			title_html: true,
			width:'550px',
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "增加",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							btnNewConfirm();
						} 
					}
				]
		});
	});
	
});

function btnNewConfirm(){
	var mailTo=$("#new_mail_addr").val();
	if($("#new_order_no").val()==""){
		alert("请输入订单号！");
		return false;
	}
	if($("#new_plan_num").val()==""){
		alert("请输入发车数量！");
		return false;
	}
	if($("#new_plan_date").val()==""){
		alert("请输入发车日期！");
		return false;
	}
	var error_mail=validateEmail(mailTo.split(";"));
	if(error_mail.trim().length>0){
		alert("收件人中"+error_mail+"不是有效邮箱地址！")
		return false;
	}
	
	$.ajax({
		url: "addDispatchPlan",
		dataType: "json",
		data: {
			"factory_id" : $('#new_factory').val(),
			"order_no" : $('#new_order_no').val(),
			"plan_dispatch_qty" : $('#new_plan_num').val(),
			"dispatch_date" : $('#new_plan_date').val(),
			"customer_number_flag" : $('#new_customer_number_flag').val(),
			"email_addrs" : $('#new_mail_addr').val(),
		},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>增加成功！</h5>',
				class_name: 'gritter-info'
			});
		}
	});

	$("#dialog-add").dialog( "close" );
	ajaxQuery();
	
}

function validateEmail(maillist){
	var mailaddr="";
	$.each(maillist,function(i,mail){
		if(!const_email_validate.test(mail)){
			mailaddr=mail;
			return false;
		}
	});
	return mailaddr;
}

function getBusType(){
	$("#search_bustype").empty();
	$.ajax({
		url: "../common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			var strs = "<option value=''>全部</option>";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.code + ">" + value.name + "</option>";
		    });
		    $("#search_bustype").append(strs);
		}
	})
}