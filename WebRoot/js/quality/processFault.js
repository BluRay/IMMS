var pageSize=1;
var table;
var table_height = $(window).height()-140;
$(document).ready(function(){
	initPage();
	$("#breadcrumbs").resize(function() {
		ajaxQuery();
	});

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	});*/
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
	});
	
	$("#new_vin").blur(function(){
		//console.log($("#new_vin").val());
		if($("#new_vin").val() !== ""){
			$.ajax({
				url: "getFactoryIdByVin",
				dataType: "json",
				data: {"vin":$("#new_vin").val()},
				async: false,
				error: function () {alertError();},
				success: function (response) {
					//console.log(response.data.length);
					if(response.data.length == 0){
						$("#new_bus_type").removeAttr("disabled");
						$("#new_order_no").removeAttr("disabled");
						$("#new_factory").removeAttr("disabled");
						$("#new_factory").val('');
					}else{
						$("#new_bus_type").attr("disabled","disabled"); 
						$("#new_order_no").attr("disabled","disabled"); 
						$("#new_bus_type").val(response.data[0].bus_type_id);
						$("#new_order_no").val(response.data[0].order_no);
						$("#new_order_desc").val(response.data[0].order_describe);
						$("#new_factory").val(response.data[0].factory_id);
						$("#new_factory").attr("disabled","disabled"); 
					}
				}
			});
		}
	});
	
	$("#edit_vin").blur(function(){
		if($("#edit_vin").val() !== ""){
			$.ajax({
				url: "getFactoryIdByVin",
				dataType: "json",
				data: {"vin":$("#edit_vin").val()},
				async: false,
				error: function () {alertError();},
				success: function (response) {
					//$("#edit_bus_type").val(response.data[0].bus_type_id);
					
					if(response.data.length == 0){
						$("#edit_bus_type").removeAttr("disabled");
						$("#edit_order_no").removeAttr("disabled");
					}else{
						$("#edit_bus_type").attr("disabled","disabled"); 
						$("#edit_order_no").attr("disabled","disabled"); 
						$("#edit_factory").val(response.data[0].factory_id);
						$("#edit_bus_type").val(response.data[0].bus_type_id);
						$("#edit_order_no").val(response.data[0].order_no);
						$("#edit_order_desc").val(response.data[0].order_describe);
					}
				}
			});
		}
	});
	
	function initPage(){
		var now = new Date(); //当前日期
		var start_date= ChangeDateToString(now).substring(0,7) + "-01";
		var end_date = formatDate(now);
		$("#date_start").val(start_date);
		$("#date_end").val(end_date);
		
		getFactorySelect("quality/processFault",'',"#search_factory","全部",'id');
		getFactorySelect("quality/processFault",'',"#edit_factory","请选择",'id');
		getFactorySelect('','',"#new_factory","请选择",'id');
		getKeysSelect("PROCESS_FAULT_AREA", "", "#search_area","全部","value");
		getKeysSelect("PROCESS_FAULT_AREA", "", "#new_area",null,"value");
		getKeysSelect("PROCESS_FAULT_AREA", "", "#edit_area",null,"value");
		getOrderNoSelect("#search_order_no","#orderId");
		getOrderNoSelect2("#new_order_no","#orderId");
		getOrderNoSelect2("#edit_order_no","#orderId");
		getBusType();
		$('#new_report_file,#edit_report_file').ace_file_input({
			no_file:'请选择要上传的文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			width:"300px",
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['pdf','PDF'],
		}).on('file.error.ace', function(event, info) {
			alert("请上传正确的文件!");
			return false;
	    });
	}
	
	$("#btnQuery").click (function () {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
		return false;
	});
	
	$('#new_response_factory').change(function(){ 
		getWorkshopSelect("quality/processFault",$("#new_response_factory :selected").text(),"","#new_workshop",null,"id");
	});
	
	$('#edit_response_factory').change(function(){ 
		getWorkshopSelect("quality/processFault",$("#edit_response_factory :selected").text(),"","#edit_workshop",null,"id");
	});
	
	$("#btn_upload").click (function () {
		$("#uploadProcessFaultForm").ajaxSubmit({
			url:"uploadProcessFault",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				ajaxQuery();
				if(response.success){					
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}
			}			
		});
	});
	
	$("#btnAdd").on('click', function(e) {
		getBusType();
		//getFactorySelect("quality/processFault",'',"#new_factory",null,'id');
		getFactorySelect("quality/processFault",'',"#new_response_factory",null,'id');
		getWorkshopSelect("quality/processFault",$("#new_response_factory :selected").text(),"","#new_workshop",null,"id");
		$("#new_fault_date").val("");
		$("#new_fault_mils").val("");
		$("#new_license_number").val("");
		$("#new_vin").val("");
		$("#new_fault_phenomenon").val("");
		$("#new_fault_reason").val("");
		$("#new_resolve_method").val("");
		$("#new_resolve_date").val("");
		$("#new_report_file").val("");
		$("#new_punish").val("");
		$("#new_compensation").val("");
		$("#new_memo").val("");
		$("#new_order_no").val("");
		$("#new_order_desc").val("");
		$("#new_bus_type").attr("disabled","disabled"); 
		$("#new_order_no").attr("disabled","disabled"); 
		
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 售后问题反馈</h4></div>',
			title_html: true,
			width:'600px',
			height:450,
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
	
	function getBusType(){
		$("#search_bus_type").empty();
		$("#new_bus_type").empty();
		$.ajax({
			url: "../common/getBusType",
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				var strs = "<option value=''>全部</option>";
				var strs2 = "<option value=''></option>";
			    $.each(response.data, function(index, value) {
			    	strs += "<option value=" + value.code + ">" + value.name + "</option>";
			    	strs2 += "<option value=" + value.id + ">" + value.name + "</option>";
			    });
			    $("#search_bus_type").append(strs);
			    $("#new_bus_type").append(strs2);
			}
		})
	}
	
});

function showProcessFault(id){
	getBusType();
	getFactorySelect("quality/processFault",'',"#edit_response_factory",null,'id');
	getWorkshopSelect("quality/processFault",$("#edit_response_factory :selected").text(),"","#edit_workshop",null,"id");
	
	$.ajax({
		url: "showProcessFaultInfo",
		dataType: "json",
		data: {"id":id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			//$("#edit_bus_type").find("option:contains('"+response.data.bus_type+"')").attr("selected",true);
			$("#edit_bus_type").val(response.data.bus_type);
			$("#edit_fault_date").val(response.data.fault_date);
			$("#edit_fault_mils").val(response.data.fault_mils);
			$("#edit_customer_name").val(response.data.customer_name);
			$("#edit_license_number").val(response.data.license_number);
			$("#edit_vin").val(response.data.vin);
			$("#edit_fault_level_id").val(response.data.fault_level_id);
			$("#edit_is_batch").val(response.data.is_batch);
			$("#edit_fault_phenomenon").val(response.data.fault_phenomenon);
			$("#edit_fault_reason").val(response.data.fault_reason);
			$("#edit_factory").val(response.data.factory_id);
			$("#edit_order_no").val(response.data.order_no);
			$("#edit_response_factory").find("option:contains('"+response.data.response_factory+"')").attr("selected",true);
			$("#edit_workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
			$("#edit_resolve_method").val(response.data.resolve_method);
			$("#edit_resolve_date").val(response.data.resolve_date);
			$("#edit_resolve_result").val(response.data.resolve_result);
			$("#edit_punish").val(response.data.punish);
			$("#edit_compensation").val(response.data.compensation);
			$("#edit_memo").val(response.data.memo);
			$("#edit_resolve_user").val(response.data.resolve_user);
			$("#edit_area").find("option:contains('"+response.data.processFaultArea+"')").attr("selected",true);
			//$("#edit_report_file").hide();
			if(response.data.report_file_path != null){
				$('#file_link').show();
				$('#file_link').attr('href',response.data.report_file_path); 
			}else{
				$('#file_link').hide();
			}
			
			$(".div-dialog input").prop("disabled",true);  
		    $(".div-dialog select").prop("disabled",true);  
			
			$("#dialog-edit").removeClass('hide').dialog({
				resizable: false,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 查看售后问题</h4></div>',
				title_html: true,
				width:'600px',
				height:450,
				modal: true,
				buttons: [{
							text: "关闭",
							"class" : "btn btn-minier",
							click: function() {$( this ).dialog( "close" );} 
						}
					]
			});
			
		}
	})
}

function editProcessFault(id){
	getBusType();
	getFactorySelect("quality/processFault",'',"#edit_response_factory",null,'id');
	getWorkshopSelect("quality/processFault",$("#edit_response_factory :selected").text(),"","#edit_workshop",null,"id");

	$(".div-dialog input").prop("disabled",false);  
    $(".div-dialog select").prop("disabled",false);  
     
	$.ajax({
		url: "showProcessFaultInfo",
		dataType: "json",
		data: {"id":id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			//$("#edit_bus_type").find("option:contains('"+response.data.bus_type+"')").attr("selected",true);
			$("#edit_bus_type").val(response.data.bus_type);
			$("#edit_fault_date").val(response.data.fault_date);
			$("#edit_fault_mils").val(response.data.fault_mils);
			$("#edit_customer_name").val(response.data.customer_name);
			$("#edit_license_number").val(response.data.license_number);
			$("#edit_vin").val(response.data.vin);
			$("#edit_fault_level_id").val(response.data.fault_level_id);
			$("#edit_is_batch").val(response.data.is_batch);
			$("#edit_fault_phenomenon").val(response.data.fault_phenomenon);
			$("#edit_fault_reason").val(response.data.fault_reason);
			$("#edit_factory").val(response.data.factory_id);
			$("#edit_order_no").val(response.data.order_no);
			$("#edit_response_factory").find("option:contains('"+response.data.response_factory+"')").attr("selected",true);
			$("#edit_area").find("option:contains('"+response.data.processFaultArea+"')").attr("selected",true);
			$("#edit_workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
			$("#edit_resolve_method").val(response.data.resolve_method);
			$("#edit_resolve_date").val(response.data.resolve_date);
			$("#edit_resolve_result").val(response.data.resolve_result);
			$("#edit_punish").val(response.data.punish);
			$("#edit_compensation").val(response.data.compensation);
			$("#edit_memo").val(response.data.memo);
			$("#edit_resolve_user").val(response.data.resolve_user);
			$("#edit_order_desc").val(response.data.order_describe);
			//$("#edit_report_file").show();
			if(response.data.report_file_path != null){
				$('#file_link').show();
				$('#file_link').attr('href',response.data.report_file_path); 
			}else{
				$('#file_link').hide();
			}
			if(response.data.bus_id == 0){
				console.log("bus_id null");
			}else{
				$("#edit_order_no").prop("disabled",true);
				$("#edit_factory").prop("disabled",true);
				$("#edit_bus_type").prop("disabled",true);
			}
			$("#dialog-edit").removeClass('hide').dialog({
				resizable: false,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑售后问题</h4></div>',
				title_html: true,
				width:'550px',
				height:450,
				modal: true,
				buttons: [{
							text: "关闭",
							"class" : "btn btn-minier",
							click: function() {$( this ).dialog( "close" );} 
						},{
							text: "保存",
							id:"btn_ok",
							"class" : "btn btn-success btn-minier",
							click: function() {
								btnEditConfirm(id);
							} 
						}
					]
			});
			
		}
	})
}

function deleteProcessFault(id){
	if(confirm("确认删除？")){
		$.ajax({
			url:"deleteProcessFault",
			type:"post",
			async:false,
			dataType:"json",
			data:{
				"processFaultId":id				
			},
			success:function(response){
				alert("删除成功！");
				ajaxQuery();
			},
			error: function () {alert("您没有删除权限！");},
		})
	}
}

function btnEditConfirm(id){
	var vinTest = /^[A-Z0-9]{17}$/;
	var milsVal = "^[0-9]*[1-9][0-9]*$";
	if($("#edit_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#edit_fault_date").focus();
		return false;
	}
	if($("#edit_fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#edit_fault_mils").focus();
		return false;
	}else{
		if($("#edit_fault_mils").val()!='0'){
		 var re  =   new   RegExp(milsVal); 
	     if($("#edit_fault_mils").val().match(re)==null) {
	    	 alert("故障里程必须为正整数！");
				$("#edit_fault_mils").focus();
				return false;
	     }
		}
	}
	if($("#edit_license_number").val()==''){
		alert("请输入车牌号码！");
		$("#edit_license_number").focus();
		return false;
	}
	if($("#edit_vin").val()==''){
		alert("请输入VIN号！");
		$("#edit_vin").focus();
		return false;
	}
	if(!vinTest.test($("#edit_vin").val())){
		alert("请输入长度为17位，只包含大写字母和数字的VIN号！");
		$("#edit_vin").focus();
		return false;
	}
	if($("#edit_fault_phenomenon").val()==''){
		alert("请输入故障现象！");
		$("#edit_fault_phenomenon").focus();
		return false;
	}
	if($("#edit_fault_reason").val()==''){
		alert("请输入故障原因！");
		$("#edit_fault_reason").focus();
		return false;
	}
	if($("#edit_order_no").val()==''){
		alert("请输入生产订单！");
		$("#edit_order_no").focus();
		return false;
	}
	if(($("#edit_factory").val()=='')||($("#edit_factory").val()==null)){
		alert("请输入生产工厂！");
		return false;
	}
	if(($("#edit_bus_type").val()=='')||($("#edit_bus_type").val()==null)){
		alert("请输入车辆型号！");
		return false;
	}
	
	console.log("-->edit_factory = "+ $("#edit_factory").val());
	$('#form_edit').ajaxSubmit({
		url: "editProcessFault",
		dataType : "json",
		type : "post",
	    data: {
	    	"id":id,
	    	"order_no" : $("#edit_order_no").val(),
	    	"factory" : $("#edit_factory").val(),
	    	"bus_type" : $("#edit_bus_type").val(),
			"fault_date":$("#edit_fault_date").val(),
			"fault_mils" : $("#edit_fault_mils").val(),
			"customer_name" : $("#edit_customer_name").val(),
			"license_number" : $("#edit_license_number").val(),
			"vin" : $("#edit_vin").val(),
			"fault_level_id" : $("#edit_fault_level_id").val(),
			"is_batch" : $("#edit_is_batch").val(),
			"fault_phenomenon" : $("#edit_fault_phenomenon").val(),
			"fault_reason" : $("#edit_fault_reason").val(),
			"response_factory" : $("#edit_response_factory").find("option:selected").text(),
			"workshop" : $('#edit_workshop').find("option:selected").text(),
			"resolve_method" : $("#edit_resolve_method").val(),
			"resolve_date" : $("#edit_resolve_date").val(),
			"resolve_result" : $("#edit_resolve_result").val(),
			"punish" : $("#edit_punish").val(),
			"resolve_user" : $("#edit_resolve_user").val(),
			"compensation" : $("#edit_compensation").val(),
			"memo" : $("#edit_memo").val(),
			"area":$('#edit_area').find("option:selected").text(),
			"order_desc":$("#edit_order_desc").val()
	    },
		async: false,
	    success:function (response) {
	    	if (response.success) {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>编辑成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-edit" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>' + response.message + '</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function btnNewConfirm(){
	var vinTest = /^[a-zA-Z0-9]{17}$/;
	var milsVal = "^[0-9]*[1-9][0-9]*$";
	
	if($("#new_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#new_fault_date").focus();
		return false;
	}
	
	if($("#new_fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#new_fault_mils").focus();
		return false;
	}else{
		if($("#new_fault_mils").val()!='0'){
		 var re  =   new   RegExp(milsVal); 
	     if($("#new_fault_mils").val().match(re)==null) {
	    	 alert("故障里程必须为正整数！");
				$("#new_fault_mils").focus();
				return false;
	     }
		}
	}
	if($("#new_license_number").val()==''){
		alert("请输入车牌号码,没有车牌号请输入'/'");
		$("#new_license_number").val('/');
		$("#new_license_number").focus().select();
		return false;
	}
	if($("#new_vin").val()==''){
		alert("请输入VIN号！");
		$("#new_vin").focus();
		return false;
	}
	if(!vinTest.test($("#new_vin").val())){
		alert("请输入长度为17位，只包含大写字母和数字的VIN号！");
		$("#new_vin").focus();
		return false;
	}
	if($("#new_order_no").val()==''){
		alert("请输入生产订单！");
		$("#new_order_no").focus();
		return false;
	}
	if($("#new_fault_phenomenon").val()==''){
		alert("请输入故障描述！");
		$("#new_fault_phenomenon").focus();
		return false;
	}
	if($("#new_fault_reason").val()==''){
		alert("请输入故障原因！");
		$("#new_fault_reason").focus();
		return false;
	}
	if($("#new_factory").val()==''){
		alert("请输入生产工厂！");
		return false;
	}
	if($("#new_bus_type").val()==''){
		alert("请输入车辆型号！");
		return false;
	}
	
	$('#form_add').ajaxSubmit({
		url: "addProcessFault",
		dataType : "json",
		type : "post",
	    data: {
	    	"bus_type" : $("#new_bus_type").val(),			//改成存车型ID 170911
			"fault_date":$("#new_fault_date").val(),
			"fault_mils" : $("#new_fault_mils").val(),
			"customer_name" : $("#new_customer_name").val(),
			"license_number" : $("#new_license_number").val(),
			"vin" : $("#new_vin").val(),
			"fault_level_id" : $("#new_fault_level_id").val(),
			"is_batch" : $("#new_is_batch").val(),
			"fault_phenomenon" : $("#new_fault_phenomenon").val(),
			"fault_reason" : $("#new_fault_reason").val(),
			"order_no":$("#new_order_no").val(),
			"order_desc":$("#new_order_desc").val(),
			"area":$('#new_area').find("option:selected").text(),
			"factory" : $("#new_factory").val(),
			"response_factory" : $('#new_response_factory').find("option:selected").text(),
			"workshop" : $('#new_workshop').find("option:selected").text(),
			"resolve_method" : $("#new_resolve_method").val(),
			"resolve_date" : $("#new_resolve_date").val(),
			"resolve_result" : $("#new_resolve_result").val(),
			"punish" : $("#new_punish").val(),
			"resolve_user" : $("#new_resolve_user").val(),
			"compensation" : $("#new_compensation").val(),
			"memo" : $("#new_memo").val()
	    },
		async: false,
	    success:function (response) {
	    	if (response.success) {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-add" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>' + response.message + '</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function getBusType(){
	$(".busType").empty();
	$.ajax({
		url: "/BMS/common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			options = $.templates("#tmplBusTypeSelect").render(response.data);
			$(".busType").append(options);
		}
	})
}

function showtab(vin){
	var url = "/BMS/production/productionsearchbusinfo?bus_number=" + vin;
	var obj ={"id":"车辆信息查询","title":"车辆信息查询","close": "true","url": url};
	window.parent.addTabs(obj);
}

var getYearWeek = function (a, b, c) { 
    var d1 = new Date(a, b-1, c), d2 = new Date(a, 0, 1), 
    d = Math.round((d1 - d2) / 86400000); 
    return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7); 
};

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getProcessFaultList'});
}

//----------START bootstrap initTable ----------
function initTable() {
	console.log(($("#search_bus_type").find("option:selected").text() == "全部")?"":$("#search_bus_type").find("option:selected").text());
    $table.bootstrapTable({
        height: getHeight(),
        width:getWidth(),
        url:'getProcessFaultList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        queryParams:function(params) {	
        	params["bus_type"] = ($("#search_bus_type").find("option:selected").text() == "全部")?"":$("#search_bus_type").find("option:selected").text();
        	params["factory_id"] = $("#search_factory").val(); 
        	params["area"] = $("#search_area").find("option:selected").text();
        	params["week"] = $("#search_week").val(); 
        	params["level"] = $("#search_level").val(); 
        	params["fault_phenomenon"] = $("#search_fault_phenomenon").val(); 
        	params["fault_mils"] = $("#search_mils").val(); 
        	params["is_batch"] = $("#search_is_batch").val(); 
        	
        	params["vin"] = $("#search_vin").val(); 
        	params["date_start"] = $("#date_start").val(); 
        	params["date_end"] = $("#date_end").val(); 
        	params["order_no"] = $("#search_order_no").val(); 
        	
        	return params;
        },
        columns: [
        [
            {
            	field: 'vin',title: 'VIN号',width:"200px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	},
	        	formatter:function(value, row, index){
	        		return "<a onclick='showtab(\""+value+"\")'>"+value+"</a>";
	        	}
            },{
            	field: 'order_describe',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生产订单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"700px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
	        	},
	        	formatter:function(value, row, index){
	        		if(row['order_no'] == ""){
	        			return "-";
	        		}else{
	        			return row['order_no'] + ((row['order_describe']==undefined)?"":row['order_describe']);
	        		}
	        		
	        	}
            },{
            	field: 'factory_name',title: '生产工厂',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
	        	}
            },{
            	field: 'area',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区域&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
	        	}
            },{
            	field: 'bus_type_code',title: '车辆型号',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
	        	}
            },{
            	field: 'license_number',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌号码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"150px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'fault_mils',title: '故障里程',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'fault_date',title: '反馈日期',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'fault_date',title: '反馈周历',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        },
	        	formatter:function(value, row, index){
	        		var year = value.substring(0,4);
	        		var month = parseInt(value.substring(5,7),10);
	        		var day = parseInt(value.substring(8,10),10);
	        		return "第"+getYearWeek(year,month,day)+"周";
	        	}
            },{
            	field: 'fault_phenomenon',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故障描述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'fault_level_id',title: '故障等级',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'is_batch',title: '故障性质',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	},
    	        	formatter:function(value, row, index){
    	        		if(value == "0"){
    	        			return "非批量";
    	        		}else{
    	        			return "批量";
    	        		}
    	        	}
            },{
            	field: 'fault_reason',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;故障原因&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"200px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'resolve_method',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;解决方法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"200px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'response_factory',title: '责任工厂',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'response_workshop',title: '责任车间',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'resolve_date',title: '处理日期',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'resolve_result',title: '处理结果',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	},
	        	formatter:function(value, row, index){
	        		if(value == "0"){
	        			return "已关闭";
	        		}else{
	        			return "处理中";
	        		}
	        	}
            },{
            	field: 'resolve_user',title: '处理人',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	},
    	        	formatter:function(value, row, index){
    	        		if (value == undefined){
    	        			return row['editor_name'];
    	        		}else{
    	        			return value;
    	        		}
    	        	}
            },{
            	field: 'memo',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'edit_date',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',width:"100px",align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"width":"50px","padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        },
	        	formatter:function(value, row, index){
	        		return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"查看\" onclick='showProcessFault(" 
            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>" + 
            		"&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editProcessFault(" 
            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>" + 
            		"&nbsp;&nbsp;<i class=\"glyphicon glyphicon-remove bigger-130 showbus\" title=\"删除\" onclick='deleteProcessFault(" 
            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>"
	        	}
            }
        ]
    ]
    });
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	$("#btnQuery").attr("disabled","disabled");
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
    function getHeight() {return $(window).height()+40;}
    function getWidth() {return $(window).width()-220;}
}
//----------END bootstrap initTable ----------

//----------START Bootstrap Script ----------
var scripts = [
        '../js/bootstrap-table.js','../js/bootstrap-table-fixed-columns.js',
        '../js/bootstrap-table-export.js','../js/tableExport.js',
        '../js/bootstrap-table-editable.js','../js/bootstrap-editable.js'
    ],
    eachSeries = function (arr, iterator, callback) {
    	//console.log("---->arr.length=" + arr.length);
        callback = callback || function () {};
        if (!arr.length) {return callback();}
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {callback(err);callback = function () {};}
                else {completed += 1;if (completed >= arr.length) {callback(null);}else {iterate();}}
            });
        };
        iterate();
    };
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {return row.id});
    }
    function responseHandler(res) {
        $.each(res.rows, function (i, row) {row.state = $.inArray(row.id, selections) !== -1;});return res;
    }
    function detailFormatter(index, row) {
        var html = [];
        $.each(row, function (key, value) {html.push('<p><b>' + key + ':</b> ' + value + '</p>');});
        return html.join('');
    }
    function operateFormatter(value, row, index) {
        return ['<a class="remove" href="javascript:void(0)" title="Remove">','<i class="glyphicon glyphicon-remove"></i>','</a>'].join('');
    }
    window.operateEvents = {
        'click .like': function (e, value, row, index) {alert('You click like action, row: ' + JSON.stringify(row));},
        'click .remove': function (e, value, row, index) {ajaxDel(row.id);}
    };
    function totalTextFormatter(data) {return 'Total';}
    function totalNameFormatter(data) {return data.length;}
    function totalPriceFormatter(data) {
        var total = 0;
        $.each(data, function (i, row) {total += +(row.price.substring(1));});
        return '$' + total;
    }
    function getScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = url;
        var done = false;
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState ||this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                if (callback)
                	callback();
                	script.onload = script.onreadystatechange = null;
            }
        };
        head.appendChild(script);
        return undefined;
    }  

    function getOrderNoSelect2(elementId, submitId, fn_backcall, bustype,factoryElement,areaflg) {
    	areaflg=areaflg||"";    	
    	if (!bustype) {
    		bustype = "";
    	}
    	var order={};
    	var orderlist;
    	//alert($(elementId).next().html())
    	$(elementId).typeahead({		
    		source : function(input, process) {
    			var factory="";
    			if(factoryElement){
    				if($(factoryElement).find("option:selected").text()=="全部"
    					||$(factoryElement).find("option:selected").text()=="请选择"){
    					factory="";
    				}else
    					factory=$(factoryElement).find("option:selected").text()||$(factoryElement).val();			
    			}
    			//alert(factory);
    			var data={
    					"busType":bustype,
    					"orderNo":input,
    					"factory":factory
    			};		
    			return $.ajax({
    				url:"/BMS/common/getAllOrderFuzzySelect",
    				dataType : "json",
    				type : "post",
    				data : data,
    				async: false,
    				success: function (response) { 
    					orderlist = response.data;
    					var results = new Array();
    					$.each(orderlist, function(index, value) {
    						//alert(value.id);
    						results.push(value.orderNo);
    					})
    					return process(results);
    				}
    			});
    		},
    		items : 20,
    		highlighter : function(item) {
    			var order_name = "";
    			var bus_type = "";
    			var order_qty = "";
    			$.each(orderlist, function(index, value) {
    				if (value.orderNo == item) {
    					order_name = value.name;
    					bus_type = value.busType;
    					order_qty = value.orderQty + "台";
    				}
    			})
    			return item + "  " + order_name + " " + bus_type + order_qty;
    		},
    		matcher : function(item) {
    			return true;
    		},
    		updater : function(item) {
    			return item;
    		},
    		afterSelect:function(item){
    			$.each(orderlist, function(index, value) {
    				if (value.orderNo == item) {
    					order=value;
    					selectId = value.id;
    					$(elementId).attr("order_id", selectId);
    					$(elementId).attr("bus_type_id",value.bus_type_id);
    					$(submitId).val(selectId);				
    				}
    			})
    			if (typeof (fn_backcall) == "function") {
    				fn_backcall(order);
    			}
    		}
    	});
    }    
    
    function formatDate(date) { 
    	var myyear = date.getFullYear(); 
    	var mymonth = date.getMonth()+1; 
    	var myweekday = date.getDate();

    	if(mymonth < 10){ 
    		mymonth = "0" + mymonth; 
    	} 
    	if(myweekday < 10){ 
    		myweekday = "0" + myweekday; 
    	} 
    	return (myyear+"-"+mymonth + "-" + myweekday); 
    }  
    function ChangeDateToString(DateIn){
    	var Year = 0;
    	var Month = 0;
    	var Day = 0;
    	var CurrentDate = "";
    	// 初始化时间
    	Year = DateIn.getFullYear();
    	Month = DateIn.getMonth() + 1;
    	Day = DateIn.getDate();
    	CurrentDate = Year + "-";
    	if (Month >= 10){
    		CurrentDate = CurrentDate + Month + "-";
    	}else {
    		CurrentDate = CurrentDate + "0" + Month + "-";
    	}
    	if (Day >= 10) {
    		CurrentDate = CurrentDate + Day;
    	} else {
    		CurrentDate = CurrentDate + "0" + Day;
    	}
    	return CurrentDate;
    }
