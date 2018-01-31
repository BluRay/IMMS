var factory = '';
var workshop = '';
var workgroup = '';
var team = '';
$(document).ready(function () {	
	initPage();
	
	function initPage() {
		//getBusNumberSelect('#nav-search-input');
		getOrderNoSelect("#search_order_no","#orderId");
		getOrgAuthTree($("#workGroupTree"),'hrBaseData/staffDistribution',"1,2,3,4",'1',3);
		$('#workGroupTree').height($(window).height()-80)
		$('#workGroupTree').ace_scroll({
			size: $(window).height()-80
		});
	}

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	$("#btnQuery").click(function () {
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
	});
	
	$("#btn_upload").click (function () {
		if($("#search_order_no").val() ===""){
			alert("生产订单不能为空！");
			$("#search_order_no").focus();
			return false;
		}
		if($("#effective_date").val() ===""){
			alert("生效日期不能为空！");
			$("#effective_date").focus();
			return false;
		}
		if ($("#file").val() == "") {
			alert("请选择文件！");
			return false;
		}
		var file = $("#file").val();
		var extName = file.substring(file.lastIndexOf(".")).toLowerCase();
		if(extName !== ".xls"){
			alert("请上传.xls类型的文件！");
		}
		
		$("#uploadDistributionForm").ajaxSubmit({
			url:"uploadStaffDistribution",
			type: "post",
			dataType:"json",
			data:{
				"orderId":$("#search_order_no").val(),
				"effective_date":$("#effective_date").val()
			},
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
	
	
	$("#div_tree1").height($(window).height()*0.9+40);
	$("#div_tree2").height($(window).height()*0.9+40);
	
	
});


function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
		workshop='';
		workgroup = '';
		team='';
	}	
	if(treeNode.org_type == '2'){
		factory=treeNode.getParentNode().displayName;
		workshop=treeNode.displayName;
		workgroup = '';
		team='';
	}
	if(treeNode.org_type == '3'){
		factory=treeNode.getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().displayName;
		workgroup=treeNode.displayName;
		team='';
	}
	if(treeNode.org_type == '4'){
		factory=treeNode.getParentNode().getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().getParentNode().displayName;
		workgroup=treeNode.getParentNode().displayName;
		team=treeNode.displayName;
	}
	
	//console.log("-->" + factory + "|" + workshop + "|" + team);
	eachSeries(scripts, getScript, initTable);
	ajaxQuery();
};

function ajaxQuery(){
	$table.bootstrapTable('refresh', {url: 'getStaffDistribution'});
}

//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:'getStaffDistribution',
        striped:false,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,						//冻结列数
        queryParams:function(params) {
        	params["factory"] = factory; 
        	params["workshop"] = workshop; 
        	params["workgroup"] = workgroup; 
        	params["team"] = team; 
        	params["orderId"] = $("#search_order_no").val(); 
        	params["staff"] = $("#search_staff").val(); 
        	params["effctiveDateStart"] = $("#start_date").val(); 
        	params["effctiveDateEnd"] = $("#end_date").val(); 
        	return params;
        },
        columns: [
        [
            {
            	field: 'factory',title: '&nbsp;&nbsp;&nbsp;工厂&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'workshop',title: '&nbsp;&nbsp;车间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'workgroup',title: '&nbsp;&nbsp;班组&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'order_desc',title: '&nbsp;&nbsp;订单&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'staff_number',title: '&nbsp;&nbsp;工号&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'staff_name',title: '&nbsp;&nbsp;姓名&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'distribution',title: '分配金额',align: 'center',valign: 'middle',align: 'center',
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
            	field: 'editor',title: '&nbsp;&nbsp;编辑人&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'edit_date',title: '&nbsp;&nbsp;编辑时间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
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
    function getHeight() {return $(window).height()+30;}
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