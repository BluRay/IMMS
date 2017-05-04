/*
 * 填充下拉列表 with id=>value;包括全部选项
 */
function getSelects(data, selectval, element,defaultVal,valName) {	
	var strs ="";
	if(defaultVal!=undefined){
		 strs = "<option value="+defaultVal+"></option>";
	}
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}
/*
 * 填充下拉列表 with id=>value;不包括全部选项
 */
function getSelects_noall(data, selectval, element,defaultVal,valName) {
	//defaultVal=defaultVal||"";
	var strs ="";
	if(defaultVal!=undefined){
		 strs = "<option value="+defaultVal+"></option>";
	}
	
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}
/*
 * 填充下拉列表 with id=>value;不包括全部选项
 */
function getSelects_empty(data, selectval, element,defaultVal,valName) {
	//var strs = "<option value=''>请选择</option>";
	defaultVal=defaultVal||"";	
	var strs = "<option value="+defaultVal+">请选择</option>";
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}
/*
 * 订单编号模糊查询 submitId： 用于提交的元素的id
 */
function getOrderNoSelect(elementId, submitId, fn_backcall, bustype,factory,areaflg) {
	areaflg=areaflg||"";
	if (!bustype) {
		bustype = "";
	}
	if(!factory){
		factory="";
	}
	var orderlist;
	//alert($(elementId).next().html())
	//alert(factory);
	$(elementId).typeahead({		
		source : function(input, process) {
			var data={
					"busType":bustype,
					"orderNo":input,
					"factory":factory
			};		
			return $.ajax({
				url:"/IMMS/common/getOrderFuzzySelect",
				dataType : "json",
				type : "post",
				data : data,
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
		items : 30,
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
			if(areaflg!="copy"){//复制粘贴，非选择默认列表第一个项
				return true;
			}
			// alert(this.query);
			$.each(orderlist, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
					return;
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			$(submitId).val(selectId);
			return true;
		},
		updater : function(item) {
			$.each(orderlist, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			$(submitId).val(selectId);
			return item;
		}
	});
}

$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
	_title: function(title) {
		var $title = this.options.title || '&nbsp;'
		if( ("title_html" in this.options) && this.options.title_html == true )
			title.html($title);
		else title.text($title);
	}
}));


function select_selectOption(elementId,value){
	var options=$(elementId).find("option");
	$.each(options,function(i,option){
		if($(option).text()==value||$(option).attr("value")==value){
			$(elementId).find("option").eq(i).attr("selected", "selected");
		}
	})
}

/*
 * 弹性建下拉选项
 */
function getKeysSelect(keyCode, selectval, element,selectType,valueItem) {
	$.ajax({
		url : "/IMMS/common/getKeysSelect",
		dataType : "json",
		data : {
			keyCode : keyCode
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs ;
			if (selectType == 'noall') {
				strs="";
			}else
				strs="<option value=''>请选择</option>";
			$(element).html("");
			$.each(response.data, function(index, value) {
				if (selectval == value.id || selectval == value.key_name) {
					if(valueItem=='keyName'){
						strs += "<option value=" + value.key_name + " keyValue="
						+ value.value + " selected='selected'>"
						+ value.key_name + "</option>";
					}else
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + " selected='selected'>"
							+ value.key_name + "</option>";
				} else {
					if(valueItem=='keyName'){
						strs += "<option value=" + value.key_name + " keyValue="
						+ value.value + ">" + value.key_name + "</option>";
					}else
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + ">" + value.key_name + "</option>";
				}
			});
			$(element).append(strs);
		}
	})
}

function generatekeys(keyCode, list) {
	$.ajax({
		url : "/IMMS/common/getKeysSelect",
		dataType : "json",
		data : {
			keyCode : keyCode
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data, function(index, value) {
				/*
				 * if (input == value.id) { returnValue = value.key_name }
				 */
				var obj = {
					"id" : value.id,
					"key_name" : value.key_name
				};
				list.push(obj);
			});
		}
	});
}

/**
 * 工厂选择下拉列表（包括权限控制）
 * url:权限控制url
 * selectval:选中的值
 * selectId:下拉框组件id
 * selectType:下拉框组件类型：==全部==、==请选择==、== ==
 * valName:option value值:id/name
 */

function getFactorySelect(url,selectval,selectId,selectType,valName){
	$.ajax({
		url : "/IMMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {"function_url":url},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data,selectval,selectId,selectType, valName);	
		}
	});
}

/**
 * 车间选择下拉列表（包括权限控制）
 * url:权限控制url
 * selectval:选中的值
 * selectId:下拉框组件id
 * selectType:下拉框组件类型：==全部==、==请选择==、== ==
 * valName:option value值:id/name
 */

function getWorkshopSelect(url,factory,selectval,selectId,selectType,valName){
	$.ajax({
		url : "/IMMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {"function_url":url,"factory":factory},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data,selectval,selectId,selectType, valName);	
		}
	});
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
} 

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
function getHeight() {return $(window).height() - 125;}
function getWidth() {return $(window).width()-220;}
