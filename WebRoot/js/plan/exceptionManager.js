$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/pauseManager",'',"#search_factory",null,'id');
		getWorkshopSelect("plan/pauseManager",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		setSelects();
	};
	
	$("#btnQuery").click(function () {
		console.log("---->btnQuery");
		$("#btnQuery").attr("disabled","disabled");
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });
	
	function setSelects(){
		$("#search_severity_level").append("<option value=''>全部</option><option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
		$("#search_status").append("<option value=''>全部</option><option value='0'>处理中</option><option value='1'>处理完成</option>");
		$("#search_measures").append("<option value=''>全部</option><option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
		
	}
});

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getExceptionList'});
	$("#btnQuery").removeAttr("disabled");
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
    	        	}
            },{
            	field: 'duty_department_id',title: '&nbsp;&nbsp;责任部门&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'measures_id',title: '&nbsp;&nbsp;处理措施&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
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
    	        	return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"修改\" onclick='edit(" + row['staff_number'] + 
		                    ")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-ok bigger-130 showbus\" title=\"修改\" onclick='edit(" + row['staff_number'] + 
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