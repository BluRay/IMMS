var cur_year="";
var pageSize=10;

$(document).ready(function(){
	initPage();
	$("#btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	
	$("#btnAdd").on("click",function(){
		getOrderNoSelect("#order","#order_id");
		
	})
});

function initPage(){
	cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect(false,"","","#search_factory","全部","id")
	ajaxQuery();
}
function ajaxQuery(){
	$("#tableOrder").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 1,
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
		pageLength: pageSize,
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
					"factory":$("#search_factory").val(),
					"orderColumn":"order_no"
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getConfigAllotList",
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
		            {"title":"订单编号","class":"center","data":"order_no","defaultContent": ""},
		            {"title":"订单描述","class":"center","data":"order_name_str","defaultContent": ""},
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"生产数量","class":"center","data":"production_qty","defaultContent": ""},
		            {"title":"配置","class":"center","data": "order_config_name","defaultContent": ""},
		            {"title":"配置数量","class":"center","data":"product_qty","defaultContent": ""},		            
		            {"title":"生产顺序","class":"center","data":"sequence","defaultContent": ""},		            
		            {"title":"客户","class":"center","data": "customer","defaultContent": ""},
		            {"title":"操作","class":"center","data":"order_id","render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-110 editorder\" title='编辑' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";		            		
		            	}
		            }
		          ],
		rowsGroup:[0,1,2,3,8]
		
	});
}

function showEditPage(data){
	var CheckOrder = true;
	$("#configStr").val("");
	$.ajax({
		//url: "order!showOrderReviewList.action",
		url: "getOrderConfigList",
		dataType: "json",
		data: {"order_id" : data.order_id,
			"factory_id" : data.factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#editOrderConfig_parameters").html("");
				//先判断订单是否存在配置
				$.each(response.data,function(index,value){
					if(index == 0){
						if(value.order_config_name == ""){
							alert("该订单还没有配置信息，请先进行配置！");
							CheckOrder = false;
						}else{
							//填充订单基本信息
							$("#ConfigOrderNo").val(value.order_no);
							$("#ConfigOrderfactory").val(factory_name);
							$("#ConfigOrderfactoryQty").val(production_qty);
							$("#ConfigOrderDescriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");	
							$("#order_id").val(value.o_id);
							$("#factory_id").val(factory_id);
						}						
					}
					//填充配置项
					var paramHtml="<tr height=\"40px\">" +
							"<td width=\"40px\"></td>" +
							"<td width=\"80px\"><input type=\"text\" disabled=\"disabled\" class=\"input-small revise\" placeholder=\"配置编号...\" value=\""+value.id+"\" id=\"order_config_id_"+value.id+"\"/></td>" +
							"<td width=\"100px\"><input type=\"text\" disabled=\"disabled\" class=\"input-medium revise\" placeholder=\"配置简称...\" value=\""+value.order_config_name+"\" id=\"order_config_name_"+value.id+"\"/></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" value=\""+ (index+1) +"\" id=\"config_qty_0\" /></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" onclick=\"javascript:$(this).select();\" value=\""+value.allot_qty+"\" id=\"config_qty_0\" /></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" onclick=\"javascript:$(this).select();\" disabled = \"disabled\" value=\""+value.online_count+"\" id=\"config_qty_0\" /></td>" +
							"</tr>";
					$(paramHtml).appendTo("#editOrderConfig_parameters");
				})
				
				if(CheckOrder) $("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}