var pageSize=1;
var table;

var extArray = new Array(".xlsx");
var ECN_TYPE = [];
var ECN_CHANGE_TYPE = [];
var ECN_DUTY_UNIT = [];
var selectedrows;
$(document).ready(function(){
	generatekeys("ECN_TYPE", ECN_TYPE);
	generatekeys("ECN_CHANGE_TYPE", ECN_CHANGE_TYPE);
	generatekeys("ECN_DUTY_UNIT", ECN_DUTY_UNIT);
	
	$('.input-daterange').datepicker({
		language: 'zh-CN',
		format: "yyyy-mm-dd",
		autoclose: true,
	});
	
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	
	/**
	 * 触发弹出新增技改任务界面
	 */
	$(document).on("click","#btnAdd",function(){
		
		getKeysSelect("ECN_CHANGE_TYPE", "变更单类型", "#new_tech_order_type");
		getKeysSelect("ECN_TYPE", "技改类型", "#new_tech_type");
		getKeysSelect("ECN_DUTY_UNIT", "技改责任单位", "#new_duty_unit");
		
		$('#new_tech_point_num').val(1);
		
		/**
		 * 日期控件初始化
		 */
		$('.date-picker').datepicker({
			language: 'zh-CN',
			autoclose: true,
			todayHighlight: true,
			todayBtn:  'linked'
		})
		//show datepicker when clicking on the icon
		.next().on(ace.click_event, function(){
			$(this).prev().focus();
		});
		$('#new_tech_date').val(formatDate(new Date()));
		//文件控件初始化
		$('#new_tech_order_file , #new_custom_change_file').ace_file_input({
			no_file:'No File ...',
			btn_choose:'Choose',
			btn_change:'Change',
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
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>新增技改任务</h4></div>",
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


function ajaxQuery(){
	$("#tableTechTask").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:1
        },
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: "1500px",
		/*scrollCollapse: true,*/
		pageLength: 10,
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
				"task_content":$("#search_task_content").val(),
				"tech_date_start":$("#search_tech_date_start").val(),
				"tech_date_end":$("#search_tech_date_end").val(),
				"status":$("search_tech_task_status").val
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

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
		            {"title":"技改任务","class":"center","data":"task_content",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"变更单类型","class":"center","data":"tech_order_type","render":function(data,type,row){
		            	return getKeys(ECN_CHANGE_TYPE, data)
		            },"defaultContent": ""},
		            {"title":"技改单号","class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"变更单附件","class":"center","data":"tech_order_file","render": function(data,type,row){
		            	return data==null?"":"<a href='#' onclick='window.open(\"" + data + "\")'>查看</a>" },"defaultContent":""
		            },
		            {"title":"技改单日期","class":"center","data": "tech_date","defaultContent": ""},
		            {"title":"责任单位","class":"center","data":"duty_unit","render":function(data,type,row){
		            	return getKeys(ECN_DUTY_UNIT, data)
		            },"defaultContent": ""},		            
		            {"title":"重大变更","class":"center","data":"major_change","defaultContent": ""},		            
		            {"title":"顾客变更","class":"center","data": "custom_change","defaultContent": ""},
		            {"title":"顾客变更单附件","class":"center","data":"custom_change_file","render": function(data,type,row){
		            	return data==null?"":"<a href='#' onclick='window.open(\"" + data + "\")'>查看</a>" },"defaultContent":""
		            },
		            {"title":"重复变更","class":"center","data": "repeat_change","defaultContent": ""},
		            {"title":"技改类型","class":"center","data":"tech_type","render":function(data,type,row){
		            	return getKeys(ECN_TYPE, data)
		            },"defaultContent": ""},		         
		            {"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },	            
		            {"title":"操作","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-110 editorder\" onclick = 'ajaxEdit(" + row.id+ ");' style='color:green;cursor: pointer;'></i>"},
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

function ajaxEditConfirm (argument){
	//alert(original);
	
	$("#btnEditConfirm").attr("disabled","disabled");
	//数据验证
	var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
	var totleNum = $("#edit_order_qty").val();
	var factoryNum = 0;
	var factoryOrderDetail = [];
	var factoryOrderNum="";
	var arrStart = new Array();
	var arrEnd = new Array();
	$.each(factoryOrder_parameters,function(index,param){
		var tds=$(param).children("td");
		//$(tds[1]).find("select");
		arrStart[index] = Number($(tds[3]).find("input").val());
		arrEnd[index]   = Number($(tds[4]).find("input").val());
		var fod={};
		fod.factory_id=$(tds[1]).find("select").val();
		//fod.order_id=$("#editModal").data("order_id");
		fod.factory_order_id=$(param).data("factory_order_id")||"0";
		//fod.order_detail_id=$(param).data("order_detail_id")||"0";
		fod.production_qty=$(tds[2]).find("input").val()||0;
		fod.old_production_qty=$(param).data("production_qty")||"0";
		fod.busnum_start=$(tds[3]).find("input").val();
		fod.busnum_end=$(tds[4]).find("input").val();
		if(Number(fod.production_qty)>0){
			factoryOrderDetail.push(fod);
		}
	
		factoryOrderNum += $(tds[1]).find("select").val() + ":" + $(tds[2]).find("input").val() + "_" + $(tds[3]).find("input").val() + "|" + $(tds[4]).find("input").val() + "," ;
		factoryNum += Number($(tds[2]).find("input").val());
		
	});
	if(original==factoryOrderNum){
		factoryOrderNum = "";
	}
	if (factoryNum != totleNum){
		alert("产地分配数量之和与订单总数量不相等！");
		$("#btnEditConfirm").removeAttr("disabled");
		return false;
	}

	$.ajax({
		type: "get",
		dataType: "json",
		url: "/IMMS/order/editOrder",
	    data: {
			"data_order_id":$("#dialog-order").data("order_id"),
			"color":$("#edit_color").val(),
			"seats":$("#edit_seats").val(),
			"delivery_date":$("#edit_delivery_date").val(),
			"memo":$("#edit_memo").val(),
			"factoryOrderDetail":JSON.stringify(factoryOrderDetail),
			"productive_year":$("#edit_productive_year").val(),
			"del_order_list":JSON.stringify(del_order_list)
		},
		async: false,
	    success:function (response) {
	    	$("#btnEditConfirm").removeAttr("disabled");
	    	
    		if(factoryOrderDetail==""){
    			alert("订单数据编辑成功！");
    		}else{
    			alert("订单数据编辑成功，请重新发布该订单今天及以后的计划！");
    		}
    		$( "#dialog-order" ).dialog( "close" );
    		ajaxQuery();
	     
	    },
	    error:function(){alertError();$("#btnEditConfirm").removeAttr("disabled");}
	});
	
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
		alert("技改单附件 值不能为空！");
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

function ajaxEdit(techTaskId){
	//查询技改任务信息 url: "techTaskMaintain/addTechTask",
	$.ajax({
		url: "techTaskMaintain/getSingleTaskMaintain",
		dataType: "json",
		data: {"id" : techTaskId},
		async: false,
		error: function () {alertError();},
		success: function (response) {			
				$("#edit_factoryOrder_parameters").html("");
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#editOrderID").val(value.id);
						$("#editOrderNo").val(value.order_no);
						$("#editOrderName").val(value.order_name);
						$("#editOrderCode").val(value.order_code);
						$("#editOrderType").val(value.order_type);
						//$("#editBusType").val(value.bus_type_code);
						select_selectOption("#editBusType",value.bus_type_code)
						$("#edit_order_qty").val(value.order_qty);
						$("#edit_order_descriptive").val(value.order_name + value.bus_type_code + " " + value.order_qty + "台");
						$("#edit_productive_year").val(value.productive_year);
						$("#edit_delivery_date").val(value.delivery_date);
						$("#edit_memo").val(value.memo);
						$("#dialog-order").data("bus_num_start",value.busnum_start);
					}
					if(index==response.data.length-1){
						$("#dialog-order").data("bus_num_end",value.busnum_end);
					}
					//填充生产工厂信息
					var close_btn = "";
					var factory_selectable=false;
					if(value.minbusnum == 0) {
						close_btn = "<button type=\"button\" class=\"close edit\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button>";
						factory_selectable=true;
					}
					
					var tr=$("<tr/>");
					var paramHtml="<td>"+close_btn+"</td>" +
					//"<td>" + select_str + "</td>" +
					"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
					"<td><input type='text' style='width:60px' class='input-small orderNum edit' value='"+value.production_qty+"' old_value="+value.production_qty+" id='production_qty2'/></td>" +
					"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_start+"' id='busnum_start2'/></td>" +
					"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_end+"' id='busnum_end2'/></td>" +
					/*"<td ><input type='text' style='width:0px;display:none' class='input-small' value='"+value.minbusnum+"' id='minbusnum'/></td>" +
					"<td ><input type='text' style='width:0px;display:none' class='input-small' value='"+value.maxbusnum+"' id='maxbusnum'/></td>" +*/
					"";
					$(tr).html(paramHtml).appendTo("#edit_factoryOrder_parameters");
					$(tr).data("min_busnum",value.minbusnum);
					$(tr).data("max_busnum",value.maxbusnum);
					$(tr).data("production_qty",value.production_qty);
					$(tr).data("factory_order_id",value.factory_order_id);
					//$(tr).data("order_detail_id",value.id);
					$(tr).data("busnum_start",value.busnum_start);
					$(tr).data("busnum_end",value.busnum_end);
					
					if(!factory_selectable){
						$(tr).find("select").attr("disabled",true);
					}
	
					original += value.factory_id + ":" + value.production_qty + "_" + value.busnum_start + "|" + value.busnum_end + "," ;
					
				})
				$("#dialog-order").data("order_id",order_id);				
				
				var dialog = $( "#dialog-order" ).removeClass('hide').dialog({
					width:600,
					height:500,
					modal: true,
					title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>订单分配</h4></div>",
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
								//$( this ).dialog( "close" );
								ajaxEditConfirm();
							} 
						}
					]
				});
				$("#editOrderNo").focus();
		}
	})
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
	$(table).dataTable({
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		paginate:false,
		//sScrollY: $(window).height()-250,
		scrollX: "1200px",
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"请导入物料明细！"
		},
		data:data.data,
		columns: [
		            {"title":"SAP料号","class":"center","data":"sap_no","width":"90px"
		            },
		            {"title":"物料描述","class":"center","data":"material_spec","width":"140px"
		            },	
		            {"title":"物料类型","class":"center","data":"material_type","width":"90px"
		            },
		            {"title":"材料/规格","class":"center","data":"material_spec","width":"90px"
		            },
		            {"title":"单位","class":"center","data":"unit","width":"70px"
		            },
		            {"title":"供应商代码","class":"center","data":"supplier_code","width":"90px"
		            },
		            {"title":"单车损耗%","class":"center","data":"single_loss","width":"100px"
		            },
		            {"title":"层级用量","class":"center","data":"level_usage","width":"90px"
		            },
		            {"title":"单重","class":"center","data":"single_weight","width":"70px"
		            },
		            {"title":"单车用量含损耗","class":"center","data":"single_usage","width":"120px"
		            },
		            {"title":"使用车间","class":"center","data":"workshop","width":"80px"
		            },
		            {"title":"工序","class":"center","data":"process","width":"140px"
		            },
		            {"title":"装配位置","class":"center","data":"assemb_site","width":"140px"
		            },
		            {"title":"备注","class":"center","data":"remark"}
		          ]	
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
