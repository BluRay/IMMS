var pageSize=1;
var table;
var cur_year="";
$(document).ready(function(){
	cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#edit_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect();
	getBusType();
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	});
	
	$(document).on("click",".showbus",function(){
		var dialog = $( "#dialog-message" ).removeClass('hide').dialog({
			width:600,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>车辆明细</h4></div>",
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
	}); 
	
	$(document).on("click",".editorder",function(){
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
						$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	}); 
	
	
});

function ajaxQuery(){
	$("#tableOrder").dataTable({
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
		sScrollY: "405px",
		scrollX: "1500px",
		/*scrollCollapse: true,*/
		pageLength: 10,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"显示 页 _PAGE_ of _PAGES_",
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
				"factory":$("#search_factory").val(),
				"orderColumn":"order_no"
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "showOrderList",
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
		            {"title":"订单编号","class":"center","data":"order_no",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"订单描述","class":"center","data":"order_name_str","defaultContent": ""},
		            {"title":"客户","class":"center","data":"customer","defaultContent": ""},
		            {"title":"生产年份","class":"center","data":"productive_year","defaultContent": ""},
		            {"title":"订单交期","class":"center","data": "delivery_date","defaultContent": ""},
		            {"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},		            
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},		            
		            {"title":"生产数量","class":"center","data": "production_qty","defaultContent": ""},
		            {"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },
		            {"title":"车号信息","class":"center","data":null,"defaultContent": "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"车辆详情\" style='color:blue;cursor: pointer;'></i>"},
		            {"title":"起始车号流水","class":"center","data":"bus_number_start","defaultContent": ""},
		            {"title":"结束车号流水","class":"center","data":"bus_number_end","defaultContent": ""},		            
		            {"title":"编辑者","class":"center","data": "user_name","defaultContent": ""},
		            {"title":"编辑时间","class":"center","data":"edit_date","defaultContent": ""},
		            {"title":"分配","class":"center","data":null,"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" style='color:green;cursor: pointer;'></i>"}
		          ],
		
		
	});

}
function setInput(value){
	var input="<input type='text' value='"+value+"' />";
	return input;
} 

function getFactorySelect() {
	$.ajax({
		url : "/IMMS/common/getFactorySelect",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data, "", "#search_factory");
			getSelects_noall(response.data, "", "#factory_id1");
			
			select_str = "<select name='' id='factory_id1' class='input-small'>";
			select_str1 = "<select name='' id='factory_id2' class='input-small'>";
			$.each(response.data, function(index, value){
				select_str += "<option value=" + value.id + ">" + value.name + "</option>";
				select_str1 += "<option value=" + value.id + ">" + value.name + "</option>";
			});
			select_str += "</select>";
			select_str1 += "</select>";
			
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
		url: "/IMMS/common/getBusType",
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