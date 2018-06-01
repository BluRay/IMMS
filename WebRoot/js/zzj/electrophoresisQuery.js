$(document).ready(function(){
	initPage();
	$("#btnQuery").click(function(){
		$("#search_totalkind").val("");// 清空从按订单汇总页面跳转的参数
		var type=$('input:radio:checked').val();
    	if(type=='0'){
    		ajaxBatchQuery(); // 按批次维度
    	}else if(type=='1'){
    		ajaxOrderQuery(); //按订单维度
    	}
	});
	$(':radio').click(function(){
		var type=$('input:radio:checked').val();
		if(type=='0'){
    		$("#search_batch").removeAttr("disabled");
    		ajaxBatchQuery(); // 按批次维度
    	}else if(type=='1'){
    		$("#search_batch").attr("disabled","disabled");
    		ajaxOrderQuery(); //按订单维度
    	}
	});
	$('#search_factory').change(function(){ 
		getWorkshopSelect("zzj/electrophoresisQuery",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
	});
	$('#search_workshop').change(function(){ 
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line",null,"name");
	});
	
	$(document).on("change","#search_order_no",function(){
		$("#search_order_desc").val("");
        if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			getZzjBatchs();
		}	
	});
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			getZzjBatchs();
		}
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
});

function ajaxBatchQuery(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择生产工厂");
		return false;
	}
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	var dt=$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-175,
		scrollX: true,
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"抱歉，未查询到数据！",
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
				"order_id":$("#search_order_no").attr("order_id"),
				"factory_id":$("#search_factory").val(),
				"workshop_name":$("#search_workshop :selected").text(),
				"use_workshop":$("#search_use_workshop :selected").text(),
				"line_name":$("#search_line").val(),
				"zzj_type":$("#search_zzj_type").val(),
				"mat_description":$("#search_mat_desc").val(),
				"batch":$("#search_batch").val(),
				"kind":$("#search_kind").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getEelectrophoresisByBatch",
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
                    callback(returnData);
//                    var head_width=$(".dataTables_scrollHead").width();
//                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		},
		columns: [
            {"title":"序号","class":"center","data":"","defaultContent": "","render" : function(data, type, full, meta){
            	return meta.row + 1 + meta.settings._iDisplayStart;
            }}, // 序号
            {"title":"自制件类型","class":"center","data":"zzj_type","defaultContent": ""},
            {"title":"使用车间","class":"center","data":"use_workshop","defaultContent": ""},
            {"title":"生产批次","class":"center","data":"batch","defaultContent": ""},
            {"title":"物料描述","class":"center","data":"mat_description","defaultContent": ""},		            
            {"title":"单车用量","class":"center","data":"unit_quantity","defaultContent": ""},		            
            {"title":"单重","class":"center","data":"weight","defaultContent": ""},
            {"title":"批次需求数量","class":"center","data":"demand_quantity","defaultContent": ""},
            {"title":"自制入库数量","class":"center","data":"zzj_input_quantity","defaultContent": ""},		            
            {"title":"累计外发数量","class":"center","data":"output_quantity","defaultContent": ""},
            {"title":"未外发数量","class":"center","data":"un_output_quantity","defaultContent": ""},
            {"title":"累计进仓数量","class":"center","data":"input_quantity","defaultContent": ""},
            {"title":"已外发未进仓数量","class":"center","data":"output_un_input_quantity","defaultContent": ""}
        ],
	});
}
function ajaxOrderQuery(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择生产工厂");
		return false;
	}
	var url="getEelectrophoresisByOrder";
	var totalkind=$("#search_totalkind").val();
	if(totalkind=='un_output'){
		url="getElectrophoresisUnOuterList";
	}
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	var dt=$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-175,
		scrollX: true,
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"抱歉，未查询到数据！",
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
				"order_id":$("#search_order_no").attr("order_id"),
				"factory_id":$("#search_factory").val(),
				"workshop_name":$("#search_workshop :selected").text(),
				"use_workshop":$("#search_use_workshop :selected").text(),
				"line_name":$("#search_line").val(),
				"zzj_type":$("#search_zzj_type").val(),
				"mat_description":$("#search_mat_desc").val(),
				"batch":$("#search_batch").val(),
				"kind":$("#search_kind").val(),
				"total_kind":$("#search_totalkind").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: url,
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
                    callback(returnData);
//                    var head_width=$(".dataTables_scrollHead").width();
//                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		},
		columns: [
            {"title":"序号","class":"center","render" : function(data, type, full, meta){
            	return meta.row + 1 + meta.settings._iDisplayStart;
            }}, // 序号
            {"title":"自制件类型","class":"center","data":"zzj_type","defaultContent": ""},
            {"title":"使用车间","class":"center","data":"use_workshop","defaultContent": ""},
            {"title":"物料描述","class":"center","data":"mat_description","defaultContent": ""},		            
            {"title":"单车用量","class":"center","data":"unit_quantity","defaultContent": ""},		            
            {"title":"单重","class":"center","data":"weight","defaultContent": ""},
            {"title":"批次需求数量","class":"center","data":"demand_quantity","defaultContent": ""},
            {"title":"自制入库数量","class":"center","data":"zzj_input_quantity","defaultContent": ""},		            
            {"title":"累计外发数量","class":"center","data":"output_quantity","defaultContent": ""},
            {"title":"未外发数量","class":"center","data":"un_output_quantity","render": function(data,type,row){
            	var demand_quantity=toNumber(row.demand_quantity);
            	var output_quantity=toNumber(row.output_quantity);
            	return demand_quantity-output_quantity;
            }},		            
            {"title":"累计进仓数量","class":"center","data":"input_quantity","defaultContent": ""},
            {"title":"已外发未进仓数量","class":"center","data":"output_un_input_quantity","render": function(data,type,row){
            	var input_quantity=toNumber(row.input_quantity);
            	var output_quantity=toNumber(row.output_quantity);
            	return output_quantity-input_quantity;
            }}		            
        ],
	});
}
function initPage(){
	getFactorySelect("zzj/electrophoresisQuery",$("#search_default_factory_id").val(),"#search_factory",null,"id");
	getWorkshopSelect("zzj/electrophoresisQuery",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line",null,"name");
	getOrderNoSelect("#search_order_no","#orderId");
	if($("#search_order_no").attr("order_id")!='' &&
			$("#search_factory").val()!=''){
		$(":radio[name='type'][value='1']").prop("checked", "checked");
		getZzjTypes($("#search_default_zzj_type").val());
		getZzjBatchs();
		$("#search_batch").attr("disabled","disabled");
		ajaxOrderQuery();
	}
}
/**
 * 自制件模块获取自制件类别下拉选项
 */
function getZzjTypes(selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjTypeList",
		data : {
			"factory" : $("#search_factory").val(),
			"order_no":$("#search_order_no").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_zzj_type","全部", "name");	
		}	
	});
}
function getZzjBatchs(selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjBatchList",
		data : {
			"factory_id" : $("#search_factory").val(),
			"order_id":$("#search_order_no").attr("order_id")
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_batch","全部", "name");	
		}	
	});
}
function toNumber(str){
	var ret=0;
	if(str==null) return ret;
	if(str=='') return ret;
	if(str==undefined) return ret;
	if(str=='undefined') return ret;
	return parseInt(str);
}