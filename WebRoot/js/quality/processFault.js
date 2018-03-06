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
	
	function initPage(){
		//getBusNumberSelect('#nav-search-input');
		getFactorySelect("quality/processFault",'',"#search_factory",null,'id');
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
	
	$('#new_factory').change(function(){ 
		getWorkshopSelect("quality/processFault",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
	});
	$('#edit_factory').change(function(){ 
		getWorkshopSelect("quality/processFault",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
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
		getFactorySelect("quality/processFault",'',"#new_factory",null,'id');
		getWorkshopSelect("quality/processFault",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加制程异常</h4></div>',
			title_html: true,
			width:'600px',
			height:520,
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

function showProcessFault(id){
	getBusType();
	getFactorySelect("quality/processFault",'',"#edit_factory",null,'id');
	getWorkshopSelect("quality/processFault",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	
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
			$("#edit_workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
			$("#edit_resolve_method").val(response.data.resolve_method);
			$("#edit_resolve_date").val(response.data.resolve_date);
			$("#edit_resolve_result").val(response.data.resolve_result);
			$("#edit_punish").val(response.data.punish);
			$("#edit_compensation").val(response.data.compensation);
			$("#edit_memo").val(response.data.memo);
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
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 查看制程异常</h4></div>',
				title_html: true,
				width:'600px',
				height:520,
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
	getFactorySelect("quality/processFault",'',"#edit_factory",null,'id');
	getWorkshopSelect("quality/processFault",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");

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
			$("#edit_workshop").find("option:contains('"+response.data.response_workshop+"')").attr("selected",true);
			$("#edit_resolve_method").val(response.data.resolve_method);
			$("#edit_resolve_date").val(response.data.resolve_date);
			$("#edit_resolve_result").val(response.data.resolve_result);
			$("#edit_punish").val(response.data.punish);
			$("#edit_compensation").val(response.data.compensation);
			$("#edit_memo").val(response.data.memo);
			//$("#edit_report_file").show();
			if(response.data.report_file_path != null){
				$('#file_link').show();
				$('#file_link').attr('href',response.data.report_file_path); 
			}else{
				$('#file_link').hide();
			}
			
			$("#dialog-edit").removeClass('hide').dialog({
				resizable: false,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑制程异常</h4></div>',
				title_html: true,
				width:'550px',
				height:520,
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

function btnEditConfirm(id){
	var vinTest = /^[A-Z0-9]{17}$/;
	if($("#edit_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#edit_fault_date").focus();
		return false;
	}
	if($("#edit_fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#new_fault_mils").focus();
		return false;
	}
	if($("#edit_customer_name").val()==''){
		alert("请输入客户名称！");
		$("#edit_customer_name").focus();
		return false;
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
	//console.log("-->id = "+ id);
	$('#form_edit').ajaxSubmit({
		url: "editProcessFault",
		dataType : "json",
		type : "post",
	    data: {
	    	"id":id,
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
			"factory" : $("#edit_factory").val(),
			"workshop" : $('#edit_workshop').find("option:selected").text(),
			"resolve_method" : $("#edit_resolve_method").val(),
			"resolve_date" : $("#edit_resolve_date").val(),
			"resolve_result" : $("#edit_resolve_result").val(),
			"punish" : $("#edit_punish").val(),
			"compensation" : $("#edit_compensation").val(),
			"memo" : $("#edit_memo").val()
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
					text: '<h5>编辑失败！</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function btnNewConfirm(){
	var vinTest = /^[a-zA-Z0-9]{17}$/;
	
	if($("#new_fault_date").val()==''){
		alert("请输入故障反馈日期！");
		$("#new_fault_date").focus();
		return false;
	}
	if($("#new_fault_mils").val()==''){
		alert("请输入故障里程！");
		$("#new_fault_mils").focus();
		return false;
	}
	if($("#new_customer_name").val()==''){
		alert("请输入客户名称！");
		$("#new_customer_name").focus();
		return false;
	}
	if($("#new_license_number").val()==''){
		alert("请输入车牌号码！");
		$("#new_license_number").focus();
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
	if($("#new_fault_phenomenon").val()==''){
		alert("请输入故障现象！");
		$("#new_fault_phenomenon").focus();
		return false;
	}
	if($("#new_fault_reason").val()==''){
		alert("请输入故障原因！");
		$("#new_fault_reason").focus();
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
			"factory" : $("#new_factory").val(),
			"workshop" : $('#new_workshop').find("option:selected").text(),
			"resolve_method" : $("#new_resolve_method").val(),
			"resolve_dat" : $("#new_resolve_date").val(),
			"resolve_result" : $("#new_resolve_result").val(),
			"punish" : $("#new_punish").val(),
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
					text: '<h5>新增失败！</h5>',
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
    $table.bootstrapTable({
        height: getHeight(),
        url:'getProcessFaultList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        queryParams:function(params) {		
        	params["factory_id"] = $("#search_factory").val(); 
        	params["customer_name"] = $("#search_customer_name").val(); 
        	params["status"] = $("#search_resolve_result").val(); 
        	params["fault_phenomenon"] = $("#search_fault_phenomenon").val(); 
        	params["fault_date_start"] = $("#search_date_start").val(); 
        	params["fault_date_end"] = $("#search_date_end").val();      	
        	return params;
        },
        columns: [
        [
            {
            	field: 'bus_type_code',title: '车辆型号',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'order_no',title: '订单',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'factory_name',title: '生产工厂',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'area',title: '区域',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'fault_date',title: '反馈日期',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'fault_date',title: '故障反馈周历',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        },
	        	formatter:function(value, row, index){
	        		//console.log(value.substring(0,4));
	        		//console.log(value.substring(5,value.length).substring(0,value.substring(5,value.length).indexOf('/')));
	        		//console.log(value.substring(value.indexOf('/')+1,value.length).substring(value.substring(value.indexOf('/')+1,value.length).indexOf("/")+1));
	        		return getYearWeek(value.substring(0,4),value.substring(5,value.length).substring(0,value.substring(5,value.length).indexOf('/')),value.substring(value.indexOf('/')+1,value.length).substring(value.substring(value.indexOf('/')+1,value.length).indexOf("/")+1));
	        	}
            },{
            	field: 'fault_mils',title: '故障里程',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'customer_name',title: '客户',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'license_number',title: '车牌号码',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'vin',title: 'VIN号',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'fault_level_id',title: '故障等级',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'fault_phenomenon',title: '故障描述',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'response_workshop',title: '责任车间',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'editor_name',title: '维护人',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'edit_date',title: '维护时间',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
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

