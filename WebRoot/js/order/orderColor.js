var pageSize=1;
var table;
var select_str = "";
var select_str1 = "";
var select_str2 = "";
var cur_year="";
var original = "";
var reduce_series_list=new Array();
var max_num = 0;		var sum_num = 0;
var edit_max_num = 0;	var edit_sum_num = 0;
var del_order_list=new Array();
var dt;
/*$.extend( true, $.fn.dataTable.defaults, {
    "searching": false,
    "ordering": false,
    "rowsGroup":[0,1,2,3,4,5]
} );*/
$(document).ready(function(){
	$('#order_color').tag();
	
	//getBusNumberSelect('#nav-search-input');
	cur_year = new Date().getFullYear();
	$("#search_productive_year").val(cur_year);
	/*cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#new_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#edit_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	*/
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect();
	getBusType();
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
})

function ajaxQuery(){
	//alert("调用");
	dt=$("#tableOrder").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:1
        },
		dom: 'Bfrtip',
		lengthMenu: [
		             [ 20, 30, 50, -1 ],
		             [ '显示20行', '显示30行', '显示50行', '全部' ]
		         ],
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'pageLength',/*text:'显示行'*/}
	       
	    ],
        rowsGroup:[0,1,2,3,4,5],
		paiging:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		scrollY: $(window).height()-140,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: 20,
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
				"orderNo":$("#search_order_no").val(),
				"orderName":$("#search_order_name").val(),
				"actYear":$("#search_productive_year").val(),
				"factory":getAllFromOptions("#search_factory","val"),/*$("#search_factory").val(),*/
				"orderColumn":"order_no"
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "showOrderList",
                cache: true,  //禁用缓存
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
                 // settings.rowsGroup=[0,1,2,3,4,5];
                   //alert("分页调用");
                    callback(returnData);
                    var head_width=$(".dataTables_scrollHead").width();
                    //alert(head_width)
                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		
		},
		columns: [
		            {"title":"订单编号","class":"center","width":"100","data":"order_no",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"订单描述","class":"center","data":"order_name_str","defaultContent": ""},
		            {"title":"订单类型","class":"center","data":"order_type","defaultContent": ""},
		            {"title":"订单区域","class":"center","data":"order_area","defaultContent": ""},
		            {"title":"客户","class":"center","data":"customer","defaultContent": ""},
		            {"title":"颜色","class":"center","data":"order_color","defaultContent": ""},
		            {"title":"生产年份","class":"center","data":"productive_year","defaultContent": ""},
		            {"title":"订单交期","class":"center","data": "delivery_date","defaultContent": ""},
		            {"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},		            
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},		            
		            {"title":"生产数量","class":"center","data": "production_qty","defaultContent": ""},
		            {"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },
		            {"title":"车号信息","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"glyphicon glyphicon-search bigger-110 showbus\" onclick = 'ajaxShowBusNumber(" + row.id+ ","+row.factory_id+");' style='color:blue;cursor: pointer;'></i>";
		            },"defaultContent": "<i class=\"glyphicon glyphicon-search bigger-110 showbus\" title=\"车辆详情\" style='color:blue;cursor: pointer;'></i>"},
		            {"title":"起始车号流水","class":"center","data":"bus_number_start","defaultContent": ""},
		            {"title":"结束车号流水","class":"center","data":"bus_number_end","defaultContent": ""},		            
		            {"title":"编辑者","class":"center","data": "user_name","defaultContent": ""},
		            {"title":"编辑时间","class":"center","data":"edit_date","defaultContent": ""},
		            {"title":"编辑","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick = 'ajaxEdit(" + row.id+ ");' style='color:green;cursor: pointer;'></i>"},
		            	"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" style='color:green;cursor: pointer;'></i>"}
		          ],
		
	});
/*	dt.on('page.dt', function ( e, settings) {
		new $.fn.dataTable.RowsGroup( dt.datatable, [0,1,2,3,4,5] );
	})*/
	$("#tableOrder_info").addClass('col-xs-6');
	$("#tableOrder_paginate").addClass('col-xs-6');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}
function setInput(value){
	var input="<input type='text' value='"+value+"' />";
	return input;
} 

function getFactorySelect() {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {"function_url":"order/maintain"},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data, "", "#search_factory","全部");
			getSelects_noall(response.data, "", "#factory_id1");
			
			select_str = "<select name='' disabled id='factory_id1' class='input-small'>";
			select_str1 = "<select name='' disabled id='factory_id2' class='input-small'>";
			$.each(response.data, function(index, value){
				select_str += "<option value=" + value.id + ">" + value.name + "</option>";
				select_str2 += "<option value=" + value.id + ">" + value.name + "</option>";
			});
			select_str += "</select>";
			select_str2 += "</select>";
			
			var paramHtml="<tr><td><button disabled=\"disabled\" type=\"button\" class=\"close add\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
			"<td>" + select_str + "</td>" +
			"<td><input type='text' style='width:60px' class='input-small orderNum add' value='0' id='production_qty1'/></td>" +
			"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_start1'/></td>" +
			"<td><input type='text' style='width:60px' disabled='disabled' class='input-small busNum' value='0' id='busnum_end1'/></td>" +
			"</tr>";
			$(paramHtml).appendTo("#factoryOrder_parameters");
		}
	});
}

function getBusType(){
	$.ajax({
		url: "/BMS/common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			options = $.templates("#tmplBusTypeSelect").render(response.data);
			$(".busType").append(options);
		}
	})
}

function getLatestSeris(cur_year){
	var bus_num=0;
	$.ajax({
		url: "/BMS/order/getLatestBusSeries",
		dataType: "json",
		data: {"productive_year" : cur_year},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			bus_num= response.latest_num_start;
		}
	})
	return bus_num;	
}

/**
 * 使用剩余流水段时，判断剩余流水段，优先使用数量相等的流水段，其次使用数量有余的流水段，最后提示使用不足的流水段
 */
function getMatchSeries(riseNum){
	var series={};		
	$.each(reduce_series_list,function(i,s){//可用流水段等于增加数量	
		var seriesNum=(s.num_end-s.num_start+1);
		if(seriesNum==riseNum){
			series.index=i;
			series.num_start=s.num_start;
			series.num_end=s.num_end;
			series.message="相等";
			return false;
		}
	})
	if(series.index==undefined){
		$.each(reduce_series_list,function(i,s){//可用流水段超出增加数量
			var seriesNum=(s.num_end-s.num_start+1);
			if(seriesNum>riseNum){
				series.index=i;
				series.num_start=s.num_end-riseNum+1;
				series.num_end=s.num_end;
				series.message="未超出";
				return false;
			}
		})
	}
	if(series.index==undefined){
		$.each(reduce_series_list,function(i,s){//可用流水段小于增加数量
			var seriesNum=(s.num_end-s.num_start+1);
			if(seriesNum<riseNum){
				series.index=i;
				series.num_start=s.num_start;
				series.num_end=s.num_end;
				series.message="超出";
				return false;
			}
		})
	}
	//alert("匹配的流水段："+series.num_start+"-"+series.num_end);
	return series;
}

/**
 * 往剩余流水段列表中增加流水段，判断是否有接续的流水，有的话合并，没有
 */
function mergeReduceSeriesList(series){
	var s_merge={};
	$.each(reduce_series_list,function(i,s){			
		if(series.num_end==parseInt(s.num_start)-1){
			s.num_start=series.num_start;
			s_merge.index=i;
			s_merge.num_start=s.num_start;
			s_merge.num_end=s.num_end;
			reduce_series_list[i].num_start=s_merge.num_start;
			reduce_series_list[i].num_end=s_merge.num_end;
			return false;
		}
		if(series.num_start==parseInt(s.num_end)+1){
			s.num_end=series.num_end;
			//alert(s.num_end);
			s_merge.index=i;
			s_merge.num_start=s.num_start;
			s_merge.num_end=s.num_end;
			reduce_series_list[i].num_start=s_merge.num_start;
			reduce_series_list[i].num_end=s_merge.num_end;
			//alert(reduce_series_list[i].num_start+"-"+reduce_series_list[i].num_end)
			return false;
		}
	});
	if(s_merge.index==undefined){
		reduce_series_list.push(series);
	}
}

function ajaxEditConfirm (argument){
	//alert(original);
	var tags=$('#order_color').data('tag');
	var order_color=tags.values.join(",");
	
	$("#btnEditConfirm").attr("disabled","disabled");

	$.ajax({
		type: "get",
		dataType: "json",
		url: "/BMS/order/editOrderColor",
	    data: {
			"order_id":$("#dialog-order").data("order_id"),
			"order_color":order_color,
		},
		async: false,
	    success:function (response) {
	    	$("#btnEditConfirm").removeAttr("disabled");
    		$( "#dialog-order" ).dialog( "close" );
    		ajaxQuery();
	     
	    },
	    error:function(){alertError();$("#btnEditConfirm").removeAttr("disabled");}
	});
	
}


function ajaxEdit(order_id){
	original="";
	var tags=$('#order_color').data('tag')
	var color_spans=$(".tags").find(".tag");
	var colors_old=tags.values.join(",");
	//alert(colors_old)
	var color_list=colors_old.split(",")
	for(var i=0;i<color_spans.length;i++){
		var color=color_list[i];
		//alert(color)
		var index=tags.inValues(color)
		tags.remove(index)
	}
	
	
	reduce_series_list=new Array();//重置减少分配数量时剩余流水段
	//查询订单信息
	$.ajax({
		url: "/BMS/order/showOrderDetailList",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {			
				$("#edit_factoryOrder_parameters").html("");
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						
						var colors=value.order_color||"";
						$.each(colors.split(","),function(i,color){
							if(color.trim().length>0){
								tags.add(color)
							}
							
						})
						//alert(tags.values.join(","));
						
						$("#editOrderID").val(value.id);
						$("#editOrderNo").val(value.order_no);
						$("#editOrderName").val(value.order_name);
						$("#editOrderCode").val(value.order_code);
						$("#editOrderType").val(value.order_type);
						$("#editOrderArea").val(value.order_area);
						$("#edit_customer").val(value.customer);
						//$("#editBusType").val(value.bus_type_code);
						select_selectOption("#editBusType",value.bus_type_code)
						$("#edit_order_qty").val(value.order_qty);
						$("#edit_order_descriptive").val(value.order_name + value.bus_type_code + " " + value.order_qty + "台");
						$("#edit_productive_year").val(value.productive_year).attr("disabled",true);
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
					var paramHtml="<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
					"<td><input type='text' disabled style='width:60px' class='input-small orderNum edit' value='"+value.production_qty+"' old_value="+value.production_qty+" id='production_qty2'/></td>" +
					"<td><input type='text' disabled style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_start+"' id='busnum_start2'/></td>" +
					"<td><input type='text' disabled style='width:60px' disabled='disabled' class='input-small busNum' value='"+value.busnum_end+"' id='busnum_end2'/></td>" +
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
					title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 订单分配</h4></div>",
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

function ajaxShowBusNumber(order_id,factory_id){
	$.ajax({
		url: "/BMS/order/showBusNumber",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tableBusNumber tbody").html("");
				drawBusInfoTable(response.data)
			} else {
				alert(response.message);
			}
			var dialog = $( "#dialog-message" ).removeClass('hide').dialog({
				width:1000,
				height:500,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 车辆明细</h4></div>",
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
							$( this ).dialog( "close" ); 
						} 
					}
				]
			});
		}
	})
}

function drawBusInfoTable(data){

	var t=$("#tableBusNumber").dataTable({
		paiging:false,
		showRowNumber:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		fixedColumns: {
            leftColumns:1,
        },
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"未查询到车辆信息！"
		},
		data:data,
		columns: [
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"VIN","class":"center","data":"vin","defaultContent": ""},
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"当前车间","class":"center","data":"workshop","defaultContent": ""},
		            {"title":"当前工序","class":"center","data":"process_name","defaultContent": ""},
		            {"title":"焊装上线","class":"center","data":"welding_online_date","defaultContent": ""},
		            {"title":"焊装下线","class":"center","data":"welding_offline_date","defaultContent": ""},
		            {"title":"涂装上线","class":"center","data":"painting_online_date","defaultContent": ""},
		            {"title":"涂装下线","class":"center","data":"painting_offline_date","defaultContent": ""},
		            {"title":"底盘上线","class":"center","data":"chassis_online_date","defaultContent": ""},
		            {"title":"底盘下线","class":"center","data":"chassis_offline_date","defaultContent": ""},
		            {"title":"总装上线","class":"center","data":"assembly_online_date","defaultContent": ""},
		            {"title":"总装下线","class":"center","data":"assembly_offline_date","defaultContent": ""},
		            {"title":"入库","class":"center","data":"warehousing_date","defaultContent": ""},
		            {"title":"发车","class":"center","data":"dispatch_date","defaultContent": ""}
		          ]	      
	});
}