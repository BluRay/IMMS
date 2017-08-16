var tab_index = 1;
var data_url = "checkTaskReport";
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("tech/techTaskReport",'',"#search_factory","全部",'id');
		getOrderNoSelect("#search_order_no","#orderId");
		//getWorkshopSelect("tech/techTaskReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	}
	
	$("#btnQuery").click(function () {
		$("#btnQuery").attr("disabled","disabled");
		ajaxQuery();
    });
	
});

function ajaxQuery(){	
	eachSeries(scripts, getScript, initTable);
}

function change_tab(index){
	tab_index = index;
	if(index===1){
		$("#tab_1").show();
		$("#tab_2").hide();
	}
	if(index===2){
		$("#tab_2").show();
		$("#tab_1").hide();
	}
	console.log("change_tab : " + tab_index);
	ajaxQuery();
}

//----------START bootstrap initTable ----------
function initTable() {
	
	$table.bootstrapTable('destroy'); 
	var columns=[];
	if(tab_index===1){
		columns = [
		          [
		            {
		            	field: 'FACTORY',title: '工厂',width:'80',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
			        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
			        	}
		            },{
		            	field: 'TECH_DATE',title: '技改单日期',width:'100',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'ORDER_NO',title: '车型订单',width:'80',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'TECH_ORDER_NO',title: '技改单号',width:'150',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'DUTY_UNIT',title: '责任单位',width:'100',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'TASK_CONTENT',title: '技改任务',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'TECH_LIST',title: '技改台数',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'TIME_LIST',title: '技改工时（H）',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            },{
		            	field: 'ID',title: '技改总工时',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	},
			        	formatter:function(value,row,index){
		        			var total_hours = 0
			        		if(row.TECH_LIST==''||row.TIME_LIST==''){
			        			return '-';
			        		}else{
				        		tech_str = row.TECH_LIST.replace(/:/g,'":"');
			                    tech_str = tech_str.replace(/,/g,'","');
				        		tech_str = '{"' + tech_str + '"}';
				        		var tech_obj = JSON.parse(tech_str);
				        		time_str = row.TIME_LIST.replace(/:/g,'":"');
				        		time_str = time_str.replace(/,/g,'","');
				        		time_str = '{"' + time_str + '"}';
				        		var time_obj = JSON.parse(time_str);
				        		//自制件
				        		if(typeof(tech_obj.自制件) == "undefined" || typeof(time_obj.自制件) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.自制件*time_obj.自制件;
				        		}
				        		//部件
				        		if(typeof(tech_obj.部件) == "undefined" || typeof(time_obj.部件) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.部件*time_obj.部件;
				        		}
				        		//焊装
				        		if(typeof(tech_obj.焊装) == "undefined" || typeof(time_obj.焊装) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.焊装*time_obj.焊装;
				        		}
				        		//玻璃钢
				        		if(typeof(tech_obj.玻璃钢) == "undefined" || typeof(time_obj.玻璃钢) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.玻璃钢*time_obj.玻璃钢;
				        		}
				        		//涂装
				        		if(typeof(tech_obj.涂装) == "undefined" || typeof(time_obj.涂装) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.涂装*time_obj.涂装;
				        		}
				        		//底盘
				        		if(typeof(tech_obj.底盘) == "undefined" || typeof(time_obj.底盘) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.底盘*time_obj.底盘;
				        		}
				        		//总装
				        		if(typeof(tech_obj.总装) == "undefined" || typeof(time_obj.总装) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.总装*time_obj.总装;
				        		}
				        		//检测线
				        		if(typeof(tech_obj.检测线) == "undefined" || typeof(time_obj.检测线) == "undefined"){
				        			total_hours += 0;
				        		}else{
				        			total_hours += tech_obj.检测线*time_obj.检测线;
				        		}
			        		}
			        		return total_hours + "H";
			        	}
		            },{
		            	field: 'TECH_SINGLE_PRICE',title: '工时单价',align: 'center',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
		    	        	}
		            }
		        ]
		    ]
	}else{
		columns = [
			          [
			            {
			            	field: 'FACTORY',title: '工厂',width:'100',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
				        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
				        	}
			            },{
			            	field: 'TECH_DATE',title: '技改单日期',width:'90',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'ORDER_NO',title: '车型订单',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'TECH_ORDER_NO',title: '技改单号',width:'150',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'DUTY_UNIT',title: '责任单位',width:'100',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'TASK_CONTENT',title: '技改任务',width:'200',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'SAP_NO',title: 'SAP料号',width:'120',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'MATERIAL_DESC',title: '物料描述',width:'150',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'MATERIAL_TYPE',title: '物料类型',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'MATERIAL_SPEC',title: '物料规格',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'UNIT',title: '单位',width:'60',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'SUPPLIER_CODE',title: '供应商代码',width:'140',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'SINGLE_LOSS',title: '单车损耗',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'LEVEL_USAGE',title: '层级用量',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'SINGLE_WEIGHT',title: '单重',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'SINGLE_USAGE',title: '单车用量',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'WORKSHOP',title: '使用车间',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'PROCESS',title: '工序',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'ASSEMB_SITE',title: '装配位置',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            },{
			            	field: 'BUS_COUNT',title: '技改台数',width:'80',align: 'center',valign: 'middle',align: 'center',
			                sortable: false,visible: true,footerFormatter: totalTextFormatter,
			                cellStyle:function cellStyle(value, row, index, field) {
			    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
			    	        	}
			            }
			        ]
			    ]
	}
	
    $table.bootstrapTable({
    	height: getHeight()-30,
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,				//冻结列
        fixedNumber: 0,		//冻结列数
        queryParams:function(params) {
        	params["task_content"] = $("#search_tech_task_content").val();
        	params["tech_order_no"] = $("#search_tech_order_no").val();
        	params["order_no"] = $("#search_order_no").val();
        	params["status"] = $("#status").val();
        	params["factory"] = $("#search_factory").val();
        	//params["workshop"] = $("#search_workshop").val();
        	params["tech_date_start"] = $("#search_date_start").val();
        	params["tech_date_end"] = $("#search_date_end").val();   
        	params["tab_index"] = tab_index;	     	
        	return params;
        },
        columns: columns
    });
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	$("#btnQuery").prop("disabled","disabled");
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

