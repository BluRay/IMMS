/*
 * 填充下拉列表 with id=>value;包括全部选项
 */
function getSelects(data, selectval, element,defaultVal,valName) {
	defaultVal=defaultVal||"";	
	var strs = "<option value="+defaultVal+">全部</option>";
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
