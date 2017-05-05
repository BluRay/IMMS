$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/pauseManager",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("plan/pauseManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getReasonTypeSelect();
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/pauseManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$("#btnAdd").on('click', function(e) {
		getFactorySelect("plan/pauseManager",'',"#new_factory",null,'id');
		getWorkshopSelect("plan/pauseManager",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		getKeysSelect("EXCEPTION_RESPONSIBILITY_DEPARTMENT", "", "#new_dep_id","noall","value");
		getBusType();
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加停线</h4></div>',
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
						} 
					}
				]
		});
	});
	
	function getBusType(){
		$.ajax({
			url: "../common/getBusType",
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				var strs = "";
			    $.each(response.data, function(index, value) {
			    	strs += "<option value=" + value.code + ">" + value.name + "</option>";
			    });
			    $("#new_bus_type").append(strs);
			}
		})
	}
	
	function getReasonTypeSelect() {
		$("#search_reason_type").empty();
		$("#new_reason_type").empty();
		$.ajax({
			url : "../common/getReasonTypeSelect",
			dataType : "json",
			data : {},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				var strs = "";
			    $("#search_reason").html("<option value='0'>全部</option>");
			    $.each(response.data, function(index, value) {
			    	strs += "<option value=" + value.value + ">" + value.key_name + "</option>";
			    });
			    $("#search_reason").append(strs);
			    $("#new_reason_type").append(strs);
			}
		});
	}
	
});