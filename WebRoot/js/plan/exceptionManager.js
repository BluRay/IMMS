$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/exceptionManager",'',"#search_factory",null,'id');
		getWorkshopSelect("plan/exceptionManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		setSelects();
	};
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("plan/exceptionManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
	$('#edit_factory').change(function(){ 
		getWorkshopSelect("plan/exceptionManager",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	})
	
	$("#btnQuery").click(function () {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });
	
	function setSelects(){
		$("#search_severity_level").append("<option value=''>全部</option><option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
		$("#search_status").append("<option value=''>全部</option><option value='0'>处理中</option><option value='1'>处理完成</option>");
		$("#search_measures").append("<option value=''>全部</option><option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
		$("#edit_severity_level").append("<option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
		$("#edit_measures").append("<option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
		getKeysSelect("EXCEPTION_RESPONSIBILITY_DEPARTMENT", "", "#edit_duty_department","noall","value");
	}
});

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getExceptionList'});
}

function edit(id){
	getFactorySelect("plan/exceptionManager",'',"#edit_factory",null,'id');
	getWorkshopSelect("plan/exceptionManager",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	getReasonTypeSelect();
	$("#dialog-edit").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑异常信息</h4></div>',
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
						btnEditConfirm();
						$( this ).dialog( "close" );
						ajaxQuery();
					} 
				}
			]
	});
	
	$.ajax({
		url : "getExceptionList",
		dataType : "json",
		data : {"id":id},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.rows,function(index,value){
				if(index == 0){
					$("#exception_id").val(value.id);
					$("#edit_factory").find("option[text='"+value.factory+"']").attr("selected", true);
					$("#edit_workshop").find("option[text='"+value.workshop+"']").attr("selected", true);
					$("#edit_line").val(value.line);
					getProcessList(value.factory,value.workshop,value.line)
					$("#edit_busNumber").val(value.bus_number);
					$("#edit_reason_type").val(value.reason_type_id);
					$("#edit_detailed_reason").val(value.detailed_reasons);
					$("#edit_severity_level").val(value.severity_level_id);
					$("#edit_duty_department").find("option[keyvalue='"+value.duty_department_id+"']").attr("selected", true);
					$("#edit_measures").val(value.measures_id);
					
				}
			});
		}
	});
	
}

function getProcessList(factory,workshop,line){
	$("#edit_process").empty();
	$.ajax({
		url : "../common/queryProcessList",
		dataType : "json",
		data : {
			"factory":factory,
			"workshop":workshop,
			"line":line
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.id + ">" + value.process_name + "</option>";
		    });
		    $("#edit_process").append(strs);
		}
	});
}

function getReasonTypeSelect() {
	$("#edit_reason_type").empty();
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
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.value + ">" + value.key_name + "</option>";
		    });
		    $("#edit_reason_type").append(strs);
		}
	});
}

function btnEditConfirm(){
	$.ajax({
		url : "editExceptionInfo",
		dataType : "json",
		data : {
			"id":$('#exception_id').val(),
			"factory":$('#edit_factory').find("option:selected").text(),
			"workshop":$('#edit_workshop').find("option:selected").text(),
			"line":$('#edit_line').val(),
			"process":$('#edit_process').find("option:selected").text(),
			"reason_type_id":$('#edit_reason_type').val(),
			"detailed_reasons":$('#edit_detailed_reason').val(),
			"severity_level_id":$('#edit_severity_level').val(),
			"duty_department_id":$("#edit_duty_department :selected").attr('keyvalue'),
			"measures_id":$('#edit_measures').val(),
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>保存成功！</h5>',
				class_name: 'gritter-info'
			});
		}
	});
	
}

//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:'getExceptionList',
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,		//冻结列数
        queryParams:function(params) {
        	var workshopAll="";
        	$("#workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var conditions="{factory:'"+$("#search_factory :selected").text()+"'}";
        	params["conditions"] = conditions; 
        	return params;
        },
        columns: [
        [
            {
            	field: 'factory',title: '&nbsp;&nbsp;&nbsp;生产工厂&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'workshop',title: '&nbsp;&nbsp;生产车间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'line',title: '&nbsp;&nbsp;线别&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'process',title: '&nbsp;&nbsp;工序&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'bus_number',title: '&nbsp;&nbsp;车号&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'reason_type_id',title: '&nbsp;&nbsp;异常类型 &nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'detailed_reasons',title: '&nbsp;&nbsp;详细原因&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'editor_id',title: '&nbsp;&nbsp;维护人&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
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
            	field: 'start_time',title: '&nbsp;&nbsp;开始时间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'pfinish_time',title: '&nbsp;&nbsp;预计结束时间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'severity_level_id',title: '&nbsp;&nbsp;严重等级&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	},
	        	 formatter:function(value, row, index){
	        		 if(value === "1"){str = "普通"}
	        		 if(value === "2"){str = "严重"}
	        		 if(value === "0"){str = "不影响"}
	        		 return  str;
	        	 }
            },{
            	field: 'duty_department',title: '&nbsp;&nbsp;责任部门&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'measures_id',title: '&nbsp;&nbsp;处理措施&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	},
	        	 formatter:function(value, row, index){
	        		 if(value === "1"){str = "异常"}
	        		 if(value === "2"){str = "停线"}
	        		 if(value === "0"){str = "忽略"}
	        		 return  str;
	        	 }
            },{
            	field: 'status',title: '&nbsp;&nbsp;状态&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
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
    	        	return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"修改\" onclick='edit(" + row['id'] + 
		                    ")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-ok bigger-130 showbus\" title=\"修改\" onclick='confirm(" + row['id'] + 
		                    ")' style='color:blue;cursor: pointer;'></i>";
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