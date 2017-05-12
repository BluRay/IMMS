
var const_email_validate=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
/*
 * 填充下拉列表 with id=>value;包括全部选项
 */
function getSelects(data, selectval, element,defaultVal,valName) {	
	var strs ="";
	if(defaultVal!=undefined){
		strs = "<option value=''>"+defaultVal+"</option>";
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
		 strs = "<option value=''>"+defaultVal+"</option>";
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
	var strs = "<option value=''>请选择</option>";
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

/**格局化日期：yyyy-MM-dd */
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

/**
 * 权限控制的下拉组件，当选择全部选项时，获取该组件下所有的选项以逗号分隔返回,否则返回选择的选项
 * elementId:下拉组件id
 * valName:name表示获取下拉选项text，val表示获取下拉选项value值
 * return 
 */
function getAllFromOptions(elementId,valName){
	var selectVal="";
	var selectVal_ALL="";
	$(elementId+" option").each(function(){
		if(valName=="name"){
			selectVal_ALL+=$(this).text()+",";
		}else
			selectVal_ALL+=$(this).val()+",";		
	});
	if(valName=="name"){
		selectVal=$(elementId+" :selected").text()=="全部"?selectVal_ALL:$(elementId+" :selected").text();
	}else
		selectVal=$(elementId+" :selected").text()=="全部"?selectVal_ALL:$(elementId).val();
	
	return selectVal;
	
}

