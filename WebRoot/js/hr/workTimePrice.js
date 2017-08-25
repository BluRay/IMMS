$(document).ready(function () {	
	initPage();
	
	function initPage() {
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("hrBaseData/workTimePrice",'',"#search_factory","全部",'id');
		getFactorySelect("hrBaseData/workTimePrice",'',"#edit_factory",null,'id');
		getKeysSelect("HOUR_PRICE", "", "#edit_hour_type",null,"value");
	}
	
	$("#btnQuery").click(function () {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnAdd").on('click', function(e) {
		getFactorySelect("hrBaseData/workTimePrice",'',"#new_factory",null,'id');
		getKeysSelect("HOUR_PRICE", "", "#new_hour_type",null,"value");
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加工时单价</h4></div>',
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
	$("#btnQuery").trigger("click");
});

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getWorkTimePriceList'});
}

function btnNewConfirm(){
	if($("#new_effective_date").val()==""){
		alert("生效日期不能为空！");
		$("#new_effective_date").focus();
	}
	if($("#new_price").val()==""){
		alert("工时单价不能为空！");
		$("#new_price").focus();
	}
	$.ajax({
		url: "addWorkTimePrice",
		dataType: "json",
		data: {
			"factory_id" : $('#new_factory').val(),
			"hour_type" : $("#new_hour_type :selected").attr('keyvalue'),
			"effective_date" : $('#new_effective_date').val(),
			"price" : $('#new_price').val()
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

function btnEditConfirm(id){
	if($("#edit_effective_date").val()==""){
		alert("生效日期不能为空！");
		$("#edit_effective_date").focus();
	}
	if($("#edit_price").val()==""){
		alert("工时单价不能为空！");
		$("#edit_price").focus();
	}
	$.ajax({
		url: "editWorkTimePrice",
		dataType: "json",
		data: {
			"id":id,
			"factory_id" : $('#edit_factory').val(),
			"hour_type" : $("#edit_hour_type :selected").attr('keyvalue'),
			"effective_date" : $('#edit_effective_date').val(),
			"price" : $('#edit_price').val()
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>编辑成功！</h5>',
				class_name: 'gritter-info'
			});
		}
	});

	$("#dialog-edit").dialog( "close" );
	ajaxQuery();
}

function edit(id,factory_id,hour_type,effective_date,price){
	$("#edit_effective_date").val(effective_date);
	$("#edit_price").val(price);
	$("#edit_factory").val(factory_id);
	$("#edit_hour_type").find("option[keyvalue='"+hour_type+"']").attr("selected", true);
	
	$("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑工时单价</h4></div>',
		title_html: true,
		width:'550px',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
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

//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:'getWorkTimePriceList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,		//冻结列数
        queryParams:function(params) {
        	params["factory_id"] = $("#search_factory").val(); 
        	params["effective_date"] = $("#effective_date").val(); 
        	return params;
        },
        columns: [
        [
            {
            	field: 'factory_name',title: '&nbsp;&nbsp;&nbsp;生产工厂&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'key_name',title: '&nbsp;&nbsp;工时类型&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'effective_date',title: '&nbsp;&nbsp;生效日期&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'price',title: '&nbsp;&nbsp;单价&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'display_name',title: '&nbsp;&nbsp;维护人&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'edit_date',title: '&nbsp;&nbsp;维护时间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'status',title: '&nbsp;&nbsp;操作&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};},
    	        formatter:function(value, row, index){
    	        	if(row['process_date']!=null){
    	        		return "-";
    	        	}else{
    	        		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"修改\" onclick='edit(" + row['id'] + 
	                    ",\""+row['factory_id']+"\",\""+row['hour_type']+"\",\""+row['effective_date']+"\",\""+row['price']+"\")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;";
    	        	}
    	        	
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
    function getHeight() {return $(window).height()-45;}
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

