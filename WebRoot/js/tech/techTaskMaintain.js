var pageSize=1;
var table;
var status_arr={'0':'非重大变更','1':'一般重大变更','2':'特别重大变更'}
var extArray = new Array(".xls");
var ECN_TYPE = [];
var ECN_CHANGE_TYPE = [];
var ECN_DUTY_UNIT = [];
var selectedrows;
$(document).ready(function(){
	generatekeys("ECN_TYPE", ECN_TYPE);
	generatekeys("ECN_CHANGE_TYPE", ECN_CHANGE_TYPE);
	generatekeys("ECN_DUTY_UNIT", ECN_DUTY_UNIT);
	
	$("#breadcrumbs").resize(function() {
		ajaxQuery();
	});
	
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	
	$('#new_custom_change').change(function(){
		if($(this).prop("checked")){
			$('#new_custom_change_no').prop("disabled",false);
		}else{
			$('#new_custom_change_no').prop("disabled",true);
		}
	});
	
	/**
	 * 触发弹出新增技改任务界面
	 */
	$(document).on("click","#btnAdd",function(){
		
		getKeysSelect("ECN_CHANGE_TYPE", "变更单类型", "#new_tech_order_type");
		getKeysSelect("ECN_TYPE", "技改类型", "#new_tech_type");
		getKeysSelect("ECN_DUTY_UNIT", "技改责任单位", "#new_duty_unit");
		
		$('#new_tech_point_num').val(1);
		
		$('#new_custom_change').prop("checked",false);
		$('#new_custom_change_no').prop("disabled",true);

		$('#new_tech_date').val(formatDate(new Date()));
		//文件控件初始化
		$('#new_tech_order_file , #new_custom_change_file').ace_file_input({
			no_file:'请选择要上传的PDF文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			allowExt: ['pdf','PDF'],
			//whitelist:'gif|png|jpg|jpeg'
			//blacklist:'exe|php'
			//onchange:'
		}).on('file.error.ace', function(event, info) {
			bootbox.dialog({
				message: "请上传PDF文件!", 
				buttons: {
					"success" : {
						"label" : "确定",
						"className" : "btn-sm btn-primary"
					}
				}
			});
	      });
		
		var dialog = $( "#dialog-teckTask_new" ).removeClass('hide').dialog({
			width:1080,
			height:560,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-flag green"></i> 新增技改任务</h4></div>',
			title_html: true,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				},
				{
					text: "确定",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						ajaxAdd();
						//$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	});


	
	$(document).on("click",".close.add",function(e){
		$(e.target).closest("tr").remove();		
		//var latest_num_start=Number($("#newModal").data("bus_num_start"));
		//获取cur_year下的最新流水起始号（最大流水号+1）
		var order_type=$("#newOrderType").val();
		var latest_num_start=0;
		if(order_type=='标准订单'){
			latest_num_start=getLatestSeris(cur_year);
		}
		$("#dialog-order_new").data("bus_num_start",latest_num_start);
		//alert(latest_num_start);
		//更新流水号
		var maxOrderNo = latest_num_start;	
		var factoryOrder_parameters=$("#new_factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
	});
	
	$(document).on("click",".close.edit",function(e){
		var order_type=$("#editOrderType").val();
		var tr=$(e.target).closest("tr");
		if(order_type=='标准订单'){
			/**判断该工厂订单下是否已经产生了车号，是则不能删除
			 */
			if($(tr).data("min_busnum")!='0'&&$(tr).data("min_busnum")!=undefined){
				alert("该工厂订单下已生成了车号，不能删除！");
			}else /*if($(tr).data("production_qty")==undefined)*/{//新增的产地分配，删除后，合并剩余可用流水段列表;//已存在的产地分配，删除后，合并剩余可用流水段列表
				var series={};
				series.num_start=$(tr).find("td").eq(3).find("input").val();
				series.num_end=$(tr).find("td").eq(4).find("input").val();
				mergeReduceSeriesList(series);
				if($(tr).data("factory_order_id")!=undefined){
					var obj={};
					obj.factory_order_id=$(tr).data("factory_order_id");
					//obj.order_detail_id=$(tr).data("order_detail_id");
					obj.production_qty=$(tr).data("production_qty");
					del_order_list.push(obj);
				}
				$(tr).remove();	
			}
		}else{
			if($(tr).data("factory_order_id")!=undefined){
				var obj={};
				obj.factory_order_id=$(tr).data("factory_order_id");
				//obj.order_detail_id=$(tr).data("order_detail_id");
				obj.production_qty=$(tr).data("production_qty");
				del_order_list.push(obj);
			}
			$(tr).remove();	
			var maxOrderNo = 0;	
			var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
			$.each(factoryOrder_parameters,function(index,param){
				var tds=$(param).children("td");
				$(tds[3]).find("input").val(maxOrderNo);
				$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
				maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
			});
		}
		
		
	});
	
});

// 删除
$(document).on("click",".close",function(e){
	$(e.target).closest("tr").remove();
});

function ajaxQuery(){
	$("#tableTechTask").dataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: "1500px",
		/*scrollCollapse: true,*/
		pageLength: 15,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"tech_order_no":$("#search_tech_order_no").val(),
				"task_content":$("#search_tech_task_content").val(),
				"tech_date_start":$("#search_tech_date_start").val(),
				"tech_date_end":$("#search_tech_date_end").val(),
				"status":$("#search_tech_task_status").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码
            console.log("-->tech_date_start = " + $("#search_tech_date_start").val(),param);
            $.ajax({
                type: "post",
                url: "techTaskMaintain/getTaskMaintainList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: [
		            {"title":"技改任务","sWidth":"150px","class":"center","data":"task_content",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"变更单类型","sWidth":"100px","class":"center","data":"tech_order_type","render":function(data,type,row){
		            	return getKeys(ECN_CHANGE_TYPE, data)
		            },"defaultContent": ""},
		            {"title":"技改单编号","sWidth":"100px","class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"变更单附件","sWidth":"100px","class":"center","data":"tech_order_file","render": function(data,type,row){
		            	return data==null?"":"<a href='#' onclick='window.open(\"" + data + "\")'>查看</a>" },"defaultContent":""
		            },
		            {"title":"技改单日期","sWidth":"100px","class":"center","data": "tech_date","defaultContent": ""},
		            {"title":"责任单位","sWidth":"100px","class":"center","data":"duty_unit","render":function(data,type,row){
		            	return getKeys(ECN_DUTY_UNIT, data)
		            },"defaultContent": ""},		            
		            {"title":"重大变更","sWidth":"100px","class":"center","data":"major_change","defaultContent": "","render":function(data,type,row){
		            	return status_arr[data]
		            	}
		            },		            
		            {"title":"顾客变更","sWidth":"100px","class":"center","data": "custom_change","defaultContent": ""},
		            {"title":"顾客变更单","sWidth":"100px","class":"center","data":"custom_change_file","render": function(data,type,row){
		            	return data==null?"":"<a href='#' onclick='window.open(\"" + data + "\")'>查看</a>" },"defaultContent":""
		            },
		            {"title":"重复变更","sWidth":"100px","class":"center","data": "repeat_change","defaultContent": ""},
		            {"title":"技改类型","sWidth":"100px","class":"center","data":"tech_type","render":function(data,type,row){
		            	return getKeys(ECN_TYPE, data)
		            },"defaultContent": ""},	
		            /**
		            {"title":"订单状态","sWidth":"100px","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },	   **/         
		            {"title":"操作","sWidth":"50px","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-110 editorder\" title=\"编辑\" onclick = 'showEditModal(" + row.id+ ");' style='color:green;cursor: pointer;'></i>"},
		            	"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-110 editorder\" style='color:green;cursor: pointer;'></i>"} 
		          ],
	});

}
function getKeys(keys, input) {
	var returnValue = "";

	$.each(keys, function(index, value) {
		if (input == value.id) {
			returnValue = value.key_name;
		}
	});

	return returnValue;
}

function getSelectRowDatas(tableID) {
	var trs = $("#" + tableID).find("tr");
	var propertyValue;
	var selectData = new Array();
	for (var i = 1; i < trs.length; i++) { // 第二行开始为数据
		var obj = new Object();
		var objTr = trs[i];
		var tdArray = objTr.childNodes;
		console.log("-->tdArray id  = " + tdArray[0].id);
		if (tdArray[0].innerHTML == "" && tdArray[0].children.length == 0) {
			continue;
		}

		for (var j = 0; j < tdArray.length; j++) {
			var propertyName = tdArray[j].id;
			console.log("-->propertyName = " + propertyName);
			propertyValue = tdArray[j].innerHTML;
			var childTag = tdArray[j].children;
			if (childTag.length > 0) {
				var inputType = childTag[0].tagName;
				var inputName = childTag[0].type;
				/**
				if (inputName == "checkbox") {
					if (childTag[0].checked == false) { // 判断为没有选中的数据行直接跳出不做处理
						break;
					}
					continue;
				}**/
				if ((inputType == "INPUT" && inputName == "hidden") || (inputType == "INPUT" && inputName == "text") || inputType == "SELECT") {
					propertyValue = childTag[0].value;
				} else if (inputType === "A") {
					propertyValue = childTag[0].innerHTML;
				}
			}
			obj[propertyName] = propertyValue;
		}
		if (!isEmptyObject(obj)) {
			selectData.push(obj);
		}

	}
	return selectData;
}

function isEmptyObject(obj) {
	for ( var n in obj) {
		return false;
	}
	return true;
}

function ajaxAdd (argument) {
	//数据验证
	if ($("#new_task_content").val().trim() == "") {
		alert("技改任务 值不能为空！");
		$("#new_task_content").focus();
		return false;
	}
	if ($("#new_tech_order_no").val().trim() == "") {
		alert("技改单号 值不能为空！");
		$("#new_tech_order_no").focus();
		return false;
	}
	if ($("#new_tech_point_num").val().trim() == "") {
		alert("技改点数 值不能为空！");
		$("#new_tech_point_num").focus();
		return false;
	}
	if ($("#new_tech_order_type").val().trim() == "") {
		alert("变更单类型 值不能为空！");
		$("#new_tech_order_type").focus();
		return false;
	}
	if ($("#new_tech_type").val().trim() == "") {
		alert("技改类型 值不能为空！");
		$("#new_tech_type").focus();
		return false;
	}
	if ($("#new_tech_date").val().trim() == "") {
		alert("技改单日期 值不能为空！");
		$("#new_tech_date").focus();
		return false;
	}
	if ($("#new_duty_unit").val().trim() == "") {
		alert("责任单位 值不能为空！");
		$("#new_duty_unit").focus();
		return false;
	}
	if ($("#new_tech_order_file").val().trim() == "") {
		alert("技改单附件不能为空！");
		$("#new_tech_order_file").focus();
		return false;
	}
	$('#teckTaskForm_new').ajaxSubmit({
		url: "techTaskMaintain/addTechTask",
		dataType : "json",
		type : "post",
	    data: {
	    	"selectedrows" : selectedrows
		},
		async: false,
	    success:function (response) {
	    	
	    	if (response.success) {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>技改任务新增成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-teckTask_new" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>技改任务新增失败！</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function showEditModal(techTaskId){
	getKeysSelect("ECN_CHANGE_TYPE", "变更单类型", "#edit_tech_order_type");
	getKeysSelect("ECN_TYPE", "技改类型", "#edit_tech_type");
	getKeysSelect("ECN_DUTY_UNIT", "技改责任单位", "#edit_duty_unit");
	//查询技改任务信息 url: "techTaskMaintain/addTechTask",
	$("#edit_tech_order_file").next("a").remove();
	$("#edit_custom_change_file").next("a").remove();
	$("#tech_task_id").val(techTaskId);
	$.ajax({
		url: "techTaskMaintain/getSingleTaskMaintain",
		dataType: "json",
		data: {"id" : techTaskId},
		async: false,
		error: function () {alertError();},
		success: function (response) {			
			$.each(response.data, function(index, value) {
				$("#edit_task_content").val(value.task_content);
				$("#edit_tech_order_type").val(value.tech_order_type);
				$("#edit_tech_order_no").val(value.tech_order_no);
				$("#edit_tech_order_file").after("<a href='#' onclick='window.open(\"" + value.tech_order_file + "\")'>" + (value.tech_order_file == "" ? "" : "查看") + "</a>");
				$("#edit_tech_date").val(value.tech_date);
				$("#edit_duty_unit").val(value.duty_unit);
				$("#edit_major_change").val(value.major_change);
				//value.major_change == "Y" ? $("#edit_major_change").attr('checked', true) : $("#edit_major_change").removeAttr('checked');
				value.custom_change == "Y" ? $("#edit_custom_change").attr('checked', true) : $("#edit_custom_change").removeAttr('checked');
				value.repeat_change == "Y" ? $("#edit_repeat_change").attr('checked', true) : $("#edit_repeat_change").removeAttr('checked');

				$("#edit_custom_change_file").after("<a href='#' onclick='window.open(\"" + value.custom_change_file + "\")'>" + (value.custom_change_file == "" ? "" : "查看") + "</a>");
				$("#edit_tech_type").val(value.tech_type);

				$("#edit_tech_point_num").val(value.tech_point_num);
				$("#edit_custom_change_no").val(value.custom_change_no);
			});
			
			var dialog = $( "#dialog-teckTask_moidfy" ).removeClass('hide').dialog({
				width:1080,
				height:560,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 编辑技改任务</h4></div>",
				title_html: true,
				buttons: [ 
					{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {
							$( this ).dialog( "close" ); 
						} 
					},
					{
						text: "确定",
						"class" : "btn btn-primary btn-minier",
						click: function() {
							ajaxEdit();
						} 
					}
				]
			});
		}
	})
	
	ajaxQueryChangedMaterialList(techTaskId);
	
}

function ajaxEdit() {
	if ($("#edit_task_content").val().trim() == "") {
		alert("技改任务 值不能为空！");
		$("#edit_task_content").focus();
		return false;
	}
	if ($("#edit_tech_order_no").val().trim() == "") {
		alert("技改单号 值不能为空！");
		$("#edit_tech_order_no").focus();
		return false;
	}
	if ($("#edit_tech_point_num").val().trim() == "") {
		alert("技改点数 值不能为空！");
		$("#edit_tech_point_num").focus();
		return false;
	}
	if ($("#edit_tech_order_type").val().trim() == "") {
		alert("变更单类型 值不能为空！");
		$("#edit_tech_order_type").focus();
		return false;
	}
	if ($("#edit_tech_type").val().trim() == "") {
		alert("技改类型 值不能为空！");
		$("#new_tech_type").focus();
		return false;
	}
	if ($("#edit_tech_date").val().trim() == "") {
		alert("技改单日期 值不能为空！");
		$("#edit_tech_date").focus();
		return false;
	}
	if ($("#edit_duty_unit").val().trim() == "") {
		alert("责任单位 值不能为空！");
		$("#edit_duty_unit").focus();
		return false;
	}
	var trs = selectedrows; //getSelectRowDatas("table2");
	
	console.log('--trs = ' , trs);

	$('#teckTaskForm_moidfy').ajaxSubmit({
		url : "techTaskMaintain/editTechTaskMaintain",
		dataType : "json",
		type : "post",
		data : {
			"selectedrows" : JSON.stringify(trs)
		},
		success : function(response) {
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>保存成功！</h5>',
				class_name: 'gritter-info'
			});
			$("#dialog-teckTask_moidfy").dialog( "close" );
			ajaxQuery();
		}
	});
}

function ajaxQueryChangedMaterialList(tech_task_id){
	$.ajax({
		url : "techTaskMaintain/getChangedMaterialList",
		dataType : "json",
		type : "post",
		data : {
			"tech_task_id" : tech_task_id
		},
		success : function(response) {
			selectedrows = "";
			$("#table2 tbody").html("");
			selectedrows=JSON.stringify(response.data);
			$.each(response.data, function(index, value) {
				var tr = $("<tr />");
				$("<td id=\"sap_no\" contentEditable=\"false\"/>").html(value.sap_no).appendTo(tr);
				$("<td id=\"material_desc\" contentEditable=\"false\"/>").html(value.material_desc).appendTo(tr);
				$("<td id=\"material_type\" contentEditable=\"false\"/>").html(value.material_type).appendTo(tr);
				$("<td id=\"material_spec\" contentEditable=\"false\"/>").html(value.material_spec).appendTo(tr);
				$("<td id=\"unit\" contentEditable=\"false\"/>").html(value.unit).appendTo(tr);
				$("<td id=\"supplier_code\" contentEditable=\"false\"/>").html(value.supplier_code).appendTo(tr);
				$("<td id=\"single_loss\" contentEditable=\"false\"/>").html(value.single_loss).appendTo(tr);
				$("<td id=\"level_usage\" contentEditable=\"false\"/>").html(value.level_usage).appendTo(tr);
				$("<td id=\"single_weight\" contentEditable=\"false\"/>").html(value.single_weight).appendTo(tr);
				$("<td id=\"single_usage\" contentEditable=\"false\"/>").html(value.single_usage).appendTo(tr);
				$("<td id=\"workshop\" contentEditable=\"false\"/>").html(value.workshop).appendTo(tr);
				$("<td id=\"process\" contentEditable=\"false\"/>").html(value.process).appendTo(tr);
				$("<td id=\"assemb_site\" contentEditable=\"false\"/>").html(value.assemb_site).appendTo(tr);
				$("<td id=\"remark\" contentEditable=\"false\"/>").html(value.remark).appendTo(tr);
				$("#table2 tbody").append(tr);
			});
		}
	});
	
}

function upload(form,file,table){
	if (file == "") {
		alert("请选择文件！");
		return false;
	}
	var allowSubmit = false;
	var ext;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
		ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		selectedrows = "";
		$(form).ajaxSubmit({
			dataType : "json",
			type : 'post',
			url : 'techTaskMaintain/uploadChangedMaterialListFile', // 需要提交的 url
			data : {
				
			},
			success : function(response) {
				//alert(response.data); JSON.stringify(json_configList);
				selectedrows=JSON.stringify(response.data);
				drawConfigListTable(response,table);
				$(form).resetForm();
			}
		})
		
	}
	
}

function drawConfigListTable(data,table){
	$("#"+table+" tbody").html("");
	$.each(data.data,function (index,value) {
		var tr = $("<tr />");
		$("<td />").html(value.sap_no).appendTo(tr);
		$("<td />").html(value.material_spec).appendTo(tr);
		$("<td />").html(value.material_type).appendTo(tr);
		$("<td />").html(value.material_spec).appendTo(tr);
		$("<td />").html(value.unit).appendTo(tr);
		$("<td />").html(value.supplier_code).appendTo(tr);
		$("<td />").html(value.single_loss).appendTo(tr);
		$("<td />").html(value.level_usage).appendTo(tr);
		$("<td />").html(value.single_weight).appendTo(tr);
		$("<td />").html(value.single_usage).appendTo(tr);
		$("<td />").html(value.workshop).appendTo(tr);
		$("<td />").html(value.process).appendTo(tr);
		$("<td />").html(value.assemb_site).appendTo(tr);
		$("<td />").html(value.remark).appendTo(tr);
		$("#"+table+" tbody").append(tr);
	});
}

//格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}
