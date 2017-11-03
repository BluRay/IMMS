var timeConfigCount = 0;
var ready_hour = 0;
var edit_list = [];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;// 浮点数正则表达式
var ECN_CHANGE_TYPE = [];
var pageSize=1;
var table;
var table_height = $(window).height()-270;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("tech/followingUpPage",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
		getWorkshopSelect("tech/followingUpPage",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("tech/followingUpPage",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	})
	
	// 技改信息查询
	$("#btnQuery").click(function() {
		ajaxQuery();
		return false;
	});
	
	$("#btn_single_bus_num_query").click(function() {
		ajaxQueryDetail($("#selectBusNumber_table_tbody"), $('#select_factory').val(), $('#select_workshop').val(), $('#select_order_no').val(), $('#select_tech_task_id').val(), null);
		return false;
	});
	
	$("#btn_single_bus_num_query_view").click(function() {
		ajaxQueryDetail($("#selectBusNumber_table_tbody_view"), $('#select_factory_view').val(), $('#select_workshop_view').val(), $('#select_order_no_view').val(), $('#select_tech_task_id_view').val(), "view");
		return false;
	});
	
	$("#btn_follow_num_confirm").click(function() {
		ajaxEdit1();
		return false;
	});
	
	// 复选框全选、反选
	$(".checkall").click(function() {
		if ($(this).prop("checked")) {
			$(".cbox").prop("checked", true);
		} else {
			$(".cbox").removeAttr("checked");
		}
	});
	

});


function ajaxQuery() {
	$("#btnQuery").prop("disabled","disabled");
	$("#btnQuery").val("查询中...");
	$('#tableData').empty();
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,scrollX: "100%",orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"factory" : $('#search_factory').find("option:selected").text(),
				"workshop" : ($('#search_workshop').find("option:selected").text()=="全部")?'':$('#search_workshop').find("option:selected").text(),
				"order_no" : $('#search_order_no').val(),
				"task_content" : $('#search_tech_task_content').val(),
				"tech_order_no" : $('#search_tech_order_no').val(),
				"status" : $('#status').val(),
				"tech_date_start" : $('#search_date_start').val(),
				"tech_date_end" : $('#search_date_end').val(),
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getFollowingUpList",
                cache: false,  //禁用缓存
                data: param,   //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    $("#btnQuery").removeAttr("disabled");
                	$("#btnQuery").val("查询");
                }
            });
		},
		columns: [
		            {"title":"技改任务","class":"center","data":"task_content","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if(data.length > 10){
		            			return "<p title="+data.replace(/\r/ig, "").replace(/\n/ig, "")+">" + data.substring(0,10) + "...</p>";
		            		}else{
		            			return "<p>" + data + "</p>";
		            		}
		            	}
		            },
		            {"title":"类型","class":"center","data":"tech_order_type_name","defaultContent": ""},
		            {"title":"技改单号","class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"技改单日期","class":"center","data":"tech_date","defaultContent": ""},
		            {"title":"切换方式","class":"center","data":"switch_mode","defaultContent": ""},
		            {"title":"切换节点","class":"center","data":"switch_node","defaultContent": ""},
		            {"title":"订单","class":"center","data":"order_no","defaultContent": ""},
		            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
		            {"title":"车间","class":"center","data":"ws","defaultContent": ""},
		            {"title":"技改台数","class":"center","data":"total","defaultContent": ""},
		            {"title":"工时","class":"center","data":"time_list","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if(typeof(data) != "undefined"){
			            		if(data.indexOf(row.ws) >= 0){
			            			var time = "";
				            		if(data.substring(data.indexOf(row.ws),data.length).indexOf(",") >= 0){
										time = (data.substring(data.indexOf(row.ws),data.length)).substring(0,data.substring(data.indexOf(row.ws),data.length).indexOf(","));
									}else{
										time = data.substring(data.indexOf(row.ws),data.length);
									}
				            		return time;
			            		}else{
			            			return "-";
			            		}
							}else{
								return "-";
							}
		            	},
		            },
		            {"title":"完成台数","class":"center","data":"complete","defaultContent": ""},
		            {"title":"技改跟进","class":"center","data":"single_time_total","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if (parseInt(row.total) - parseInt(row.complete) <= 0) {
		            			return "-";
		            		}else{
		            			if(typeof(row.time_list) != "undefined"){
			            			if(row.time_list.indexOf(row.ws) >= 0){
			            				var time = (row.time_list.substring(row.time_list.indexOf(row.ws),row.time_list.length)).substring(0,row.time_list.substring(row.time_list.indexOf(row.ws),row.time_list.length).indexOf(","));
				            			var price = time.substring(time.indexOf(":")+1,time.length);
				            			//console.log(price);
				            			if(price == "0"){
				            				return "-";
				            			}else{
				            				if (row.ws == "自制件" || row.ws == "部件") {
					            				return "<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal1(\"" + row.factory + "\",\"" + row.ws + "\",\"" + row.order_no + "\"," + row.tech_task_id + "," + row.total + "," + row.task_detail_id + ");' ></i>";
					    					} else {
					    						return "<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal(\"" + row.factory + "\",\"" + row.ws + "\",\"" + row.order_no + "\"," + row.tech_task_id + "," + row.task_detail_id + ");' ></i>";
					    					}
				            			}
			            			}else{
			            				return "-";
			            			}
		            			}else{
		            				return "-";
		            			}
		            		}
		            	},
		            },
		            {"title":"已跟进清单","class":"center","data":"single_time_total","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		if (parseInt(row.complete) <= 0) {
		            			return "-";
		            		}else{
		            			if (row.ws == "自制件" || row.ws == "部件") {
		            				return "<i name='edit' class=\"fa fa-search\" rel=\"tooltip\"  title='查看'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal_view1(\"" + row.factory + "\",\"" + row.ws + "\",\"" + row.order_no + "\"," + row.tech_task_id + ");' ></i>";
		    					} else {
		    						return "<i name='edit' class=\"fa fa-search\" rel=\"tooltip\"  title='查看'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal_view(\"" + row.factory + "\",\"" + row.ws + "\",\"" + row.order_no + "\"," + row.tech_task_id + ");' ></i>";
		    					}
		            		}
		            	}
		            }
		          ],
	});
	
}

function showSelectBusNumberModal(factory, workshop, order_no, tech_task_id, task_detail_id) {
	$('#select_tech_task_id').val(tech_task_id);
	$('#select_factory').val(factory);
	$('#select_workshop').val(workshop);
	$('#select_order_no').val(order_no);
	$('#bus_num_start').val("");
	$('#bus_num_end').val("");
	$(".checkall").removeAttr("checked");
	$('#task_detail_id').val(task_detail_id);
	ajaxQueryDetail($("#selectBusNumber_table_tbody"), factory, workshop, order_no, tech_task_id, null);
	$("#selectBusNumberModal").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 技改确认</h4></div>',
		title_html: true,
		width:900,
		height:600,
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
						ajaxEdit();
					} 
				}
			]
	});
}

function showSelectBusNumberModal1(factory, workshop, order_no, tech_task_id, total_num, task_detail_id) {
	$('#select_tech_task_id1').val(tech_task_id);
	$('#select_factory1').val(factory);
	$('#select_workshop1').val(workshop);
	$('#select_order_no1').val(order_no);
	$('#total_num1').val(total_num);
	$('#follow_num').val("");
	$('#task_detail_id1').val(task_detail_id);
	ajaxQueryDetail1($("#selectBusNumber_table_tbody1"), factory, workshop, order_no, tech_task_id);
	$("#selectBusNumberModal1").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 技改确认</h4></div>',
		title_html: true,
		width:900,
		height:600,
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				}
			]
	});
}

function ajaxQueryDetail(tbody, factory, workshop, order_no, tech_task_id, view) {
	$.ajax({
		url : "getFollowingUpDetailList",
		dataType : "json",
		type : "post",
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"order_no" : order_no,
			"tech_task_id" : tech_task_id,
			"bus_num_start" : "view" != view ? $('#bus_num_start').val() : $('#bus_num_start_view').val(),
			"bus_num_end" : "view" != view ? $('#bus_num_end').val() : $('#bus_num_end_view').val(),
			"view" : view
		},
		error : function(response) {},
		success : function(response) {
			tbody.html("");
			$.each(response.data, function(index, value) {
				var tr = $("<tr />");
				if ("view" != view) {
					if (!value.confirmor) {
						$("<td style='text-align: center;'/>").html("<input type='checkbox' class='cbox' >").appendTo(tr);
					} else {
						$("<td style='text-align: center;'/>").html("").appendTo(tr);
					}
				}
				$("<td style='text-align: center;'/>").html(index + 1).appendTo(tr);
				$("<td style='text-align: center;'/>").html(value.bus_number).appendTo(tr);
				$("<td style='text-align: center;'/>").html(value.factory).appendTo(tr);
				$("<td style='text-align: center;'/>").html(value.process_name).appendTo(tr);
				$("<td style='text-align: center;'/>").html(value.confirmor).appendTo(tr);
				$("<td style='text-align: center;'/>").html(value.confirmor_date).appendTo(tr);
				$(tr).data("id", value.id);
				tbody.append(tr);
			});
		}
	});
}

function ajaxQueryDetail1(tbody, factory, workshop, order_no, tech_task_id) {
	$.ajax({
		url : "getFollowingUpDetailList1",
		dataType : "json",
		type : "get",
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"order_no" : order_no,
			"tech_task_id" : tech_task_id
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			tbody.html("");
			var year = "";
			var month = "";
			var count = 0;
			$.each(response.data, function(index, value) {
				if (year != "") {
					if (value.confirmor_date.split("-")[0] == year && value.confirmor_date.split("-")[1] == month) {
						count += parseInt(value.follow_num);
					} else {
						var counttr = $("<tr />");
						$("<td colspan='3' />").html(year + "-" + month + " 合计:" + count).appendTo(counttr);
						tbody.append(counttr);
						count = 0;
						count += parseInt(value.follow_num);
					}
				}else{
					count += parseInt(value.follow_num);
				}
				year = value.confirmor_date.split("-")[0];
				month = value.confirmor_date.split("-")[1];
				
				var tr = $("<tr />");
				$("<td />").html(value.follow_num).appendTo(tr);
				$("<td />").html(value.confirmor).appendTo(tr);
				$("<td />").html(value.confirmor_date).appendTo(tr);

				$(tr).data("id", value.id);
				tbody.append(tr);
				
				if(index==(response.data.length-1)){
					var counttr = $("<tr />");
					$("<td colspan='3' />").html(year + "-" + month + " 合计:" + count).appendTo(counttr);
					tbody.append(counttr);
					count = 0;
				}
			});
		}
	});
	
}

function ajaxEdit() {
	var ids = [];
	$('.cbox').each(function(e) {
		if ($(this).prop("checked")) {
			ids.push($(this).closest("tr").data('id'));
		}
	});
	if (ids.length == 0) {
		alert('至少勾选一个项！');
		return false;
	}
	$.ajax({
		url : "editFollowingUp",
		dataType : "json",
		type : "post",
		data : {
			"ids" : JSON.stringify(ids),
			"task_detail_id" : $('#task_detail_id').val(),
			"workshop" : $('#select_workshop').val(),
			"update_status" : $('.cbox').length == ids.length ? 1 : 0
		},
		success : function(response) {
			if (response.success) {
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>操作成功！</h5>',
					class_name: 'gritter-info'
				});
				$("#selectBusNumberModal").dialog( "close" );
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
	
}

function ajaxEdit1() {
	if ($('#follow_num').val() == "" || $('#follow_num').val() == "0") {
		alert("产量必须大于0！");
		$('#follow_num').focus();
		return false;
	}
	var total_num = parseInt($('#total_num1').val());
	var follow_num = parseInt($('#follow_num').val());
	var complete_num = 0;
	$("#selectBusNumber_table_tbody1 tr").each(function(e) {
		if(!($(this).find("td").eq(0).attr("colspan"))){
			complete_num += parseInt($(this).find("td").eq(0).html());
		}
	});
	if (complete_num + follow_num > total_num) {
		alert("产量不能超过技改总台数与已完成台数的差！");
		$('#follow_num').focus();
		return false;
	}
	$.ajax({
		url : "editFollowingUp1",
		dataType : "json",
		type : "post",
		data : {
			"factory" : $('#select_factory1').val(),
			"workshop" : $('#select_workshop1').val(),
			"order_no" : $('#select_order_no1').val(),
			"tech_task_id" : $('#select_tech_task_id1').val(),
			"follow_num" : $('#follow_num').val(),
			"task_detail_id" : $('#task_detail_id1').val(),
			"update_status" : complete_num + follow_num == total_num ? 1 : 0
		},
		success : function(response) {
			alert("维护成功！");
			$("#selectBusNumberModal1").dialog( "close" );
			//ajaxQueryDetail1($("#selectBusNumber_table_tbody1"), $('#select_factory1').val(), $('#select_workshop1').val(), $('#select_order_no1').val(), $('#select_tech_task_id1').val());
		}
	});
	
}

function showSelectBusNumberModal_view(factory, workshop, order_no, tech_task_id) {
	$('#select_tech_task_id_view').val(tech_task_id);
	$('#select_factory_view').val(factory);
	$('#select_workshop_view').val(workshop);
	$('#select_order_no_view').val(order_no);
	$('#bus_num_start_view').val("");
	$('#bus_num_end_view').val("");
	ajaxQueryDetail($("#selectBusNumber_table_tbody_view"), factory, workshop, order_no, tech_task_id, "view");

	$("#selectBusNumberModal_view").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 技改查询</h4></div>',
		title_html: true,
		width:900,
		height:600,
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				}
			]
	});
}

function showSelectBusNumberModal_view1(factory, workshop, order_no, tech_task_id) {
	$('#select_tech_task_id_view1').val(tech_task_id);
	$('#select_factory_view1').val(factory);
	$('#select_workshop_view1').val(workshop);
	$('#select_order_no_view1').val(order_no);

	ajaxQueryDetail1($("#selectBusNumber_table_tbody_view1"), factory, workshop, order_no, tech_task_id);

	$("#selectBusNumberModal_view1").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 技改查询</h4></div>',
		title_html: true,
		width:900,
		height:600,
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				}
			]
	});
}



