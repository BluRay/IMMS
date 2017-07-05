
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
function getOrderNoSelect(elementId, submitId, fn_backcall, bustype,factoryElement,areaflg) {
	areaflg=areaflg||"";
	
	if (!bustype) {
		bustype = "";
	}

	var orderlist;
	//alert($(elementId).next().html())
	$(elementId).typeahead({		
		source : function(input, process) {
			var factory="";
			if(factoryElement){
				if($(factoryElement).find("option:selected").text()=="全部"||$(factoryElement).find("option:selected").text()=="请选择"){
					factory="";
				}else
					factory=$(factoryElement).find("option:selected").text();			
			}
			//alert(factory);
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
			 //alert(this.query);
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
			var strs ="";
			if(selectType!=undefined){
				strs = "<option value=''>"+selectType+"</option>";
			}
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
/**
 * 根据工厂、车间获取线别下拉列表
 * @param factory
 * @param workshop
 */
function getLineSelect(factory,workshop,selectval,selectId,selectType,valName) {
	$.ajax({
		url : "/IMMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:factory,
				workshop:workshop
			},
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
 * 
 * @param name
 * @returns
 */
function getLineSelectStandard(selectval,selectId,selectType,valName){
	$.ajax({
		url : "/IMMS/common/getLineSelect",
		dataType : "json",
		data : {
			},
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
		selectVal=($(elementId+" :selected").text()=="全部"||$(elementId+" :selected").text()=="请选择")?selectVal_ALL:$(elementId+" :selected").text();
	}else
		selectVal=$(elementId).val()==""?selectVal_ALL:$(elementId).val();
	
	return selectVal;
	
}

//自动隐藏的信息提示框
function fadeMessageAlert(title,message, alertClass) {
	alertClass=alertClass|| 'gritter-info';
	title=title||'系统提示：';
	/*$("#messageAlert").removeClass("alert-error alert-success").addClass(
			alertClass);
	$("#messageAlert").html(message);
	$("#messageAlert").show(500, function() {
		setTimeout(function() {
			$("#messageAlert").hide(1000);
		}, 5000);
	});*/
	$.gritter.add({
		title: title,
		time: 1000,  
	    speed:500,
		text: '<h5>'+message+'</h5>',
		class_name: alertClass
	});
}

//表格下复选框全选、反选;checkall:true全选、false反选
function check_All_unAll(tableId, checkall) {
	if (checkall) {
		$(tableId + " tbody :checkbox").prop("checked", true);
		//alert("选中");
	} else {
		$(tableId + " tbody :checkbox").prop("checked",false);
	}
}

/**
 * 车型下拉列表
 * @param selectval
 * @param selectId
 * @param selectType
 * @param valName
 */
function getBusTypeSelect(selectval,selectId,selectType,valName){
	$.ajax({
		url : "/IMMS/common/getBusType",
		dataType : "json",
		data : {},
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
 * 零部件模糊查询
 * @param elementId
 * @param submitId  :用于提交的元素的id
 * @param fn_backcall
 */
function getPartsSelect(elementId, submitId, fn_backcall) {
	var partslist;
	$(elementId).typeahead({
		source : function(input, process) {
			$.get("/IMMS/common/getPartsSelect", {
				"parts" : input
			}, function(response) {
				partslist = response.data;
				var results = new Array();
				$.each(response.data, function(index, value) {
					results.push(value.name);
				})
				return process(results);
			}, 'json');
		},
		matcher : function(item) {
			var selectId = "";
			$.each(partslist, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})

			// alert(selectId);
			$(elementId).attr("parts_id", selectId);
			$(submitId).val(selectId);
			return true;
			
		},
		items : 30,
		updater : function(item) {
			var selectId = "";
			$.each(partslist, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})

			// alert(selectId);
			$(elementId).attr("parts_id", selectId);
			$(submitId).val(selectId);
			return item;
		}
	});
}

/*
 * 根据零部件输入值获取零部件ID
 */
function getPartsId(parts) {
	var partsId = "0";
	$.ajax({
		url : "/IMMS/common/getPartsSelect",
		dataType : "json",
		data : {
			"parts" : parts
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (response.data.length > 0) {
				partsId = response.data[0].id;
			}
		}
	})
	return partsId;
}

/**
 * 根据订单id获取订单配置下拉列表
 * @param order_id
 */
function getOrderConfigSelect(order_id,selectval,selectId,selectType,valName) {
	$.ajax({
		url : "/IMMS/common/getOrderConfigSelect",
		dataType : "json",
		data : {
				order_id:order_id
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data,selectval,selectId,selectType, valName);	
		}
	});
}

/*
 * 查号模糊查询 submitId： 用于提交的元素的id
 */
function getBusNumberSelect(elementId, submitId, fn_backcall) {
	var busNumberlist;
	$(elementId).typeahead({
		source : function(input, process) {
			$.get("/IMMS/common/getBusNumberFuzzySelect", {
				"bus_input" : input
			}, function(response) {
				var data=response.data;
				busNumberlist = data;
				var results = new Array();
				$.each(data, function(index, value) {
					results.push(value.bus_number);
				})
				return process(results);
			}, 'json');
		},
		items : 30,
		matcher : function(item) {
			
			return true;
		},
		updater : function(item) {
			$.each(busNumberlist, function(index, value) {
				if (value.bus_number == item) {
					orderId = value.order_id;
					orderConfigId=value.order_config_id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", orderId);
			$(elementId).attr("order_config_id", orderConfigId);
			//$(submitId).val(selectId);
			return item;
		}
	});
}

function getUserInfoByCard(cardId){
	var user;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "/IMMS/common/getUserInfoByCard",
		data : {
			"card_no" : cardId
		},
		success : function(response) {
			var list = response.data;
			if (list.length > 0) {
				user = list[0];
			}
		}
	})
	return user;
}