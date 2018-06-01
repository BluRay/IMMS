
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	$(document).on("change","#search_order_no",function(){
		$("#search_order_desc").val("");
        if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	})
	
	$(document).on("change","#search_factory",function(){
		if($(this).val()!=''){
			getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
			getWorkshopSelect("zzj/zzjWorkshopSupply",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
			getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',"全部",'id');
		}
		if($("#search_order_no").val().trim().length>0 && $("#search_factory").val()!=''){
			getZzjTypes();
		}
	});
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',"全部",'id');
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
	$(document).on("click","#btnAdd",function(){
		window.open("/BMS/zzj/zzjWorkshopSupplyAdd","_self");
	});
	$(document).on("blur","#edit_supply_quantity",function(){
		var quantity=$(this).val();
		$(this).css("border-color",'');
		if(!const_float_validate.test(quantity) && quantity!=""){
			alert("只能录入数字类型！");
			$(this).val("");
			$(this).css("border-color",'red');
			$(this).focus();
			return false;
		}
		var demand_quantity=$("#edit_demand_quantity").val();
		var received_quantity=$("#edit_received_quantity").val();
		var old_quantity=$("#edit_old_quantity").val();
		received_quantity=(received_quantity!='' ? received_quantity : 0);
		var check_quantity=parseFloat(demand_quantity)+parseFloat(old_quantity)-parseFloat(received_quantity);
		if(parseFloat(quantity)-check_quantity>0){
			alert("本次供货数量不大于:"+check_quantity);
			$(this).css("border-color",'red');
			$(this).focus();
			return false;
		}
	});
});

function ajaxQuery(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择工厂");
		return false;
	}

	var dt=$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		fixedColumns:   {
            rightColumns:1
        },
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-170,
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
				"delivery_workshop":$("#search_workshop :selected").text(),
				"line_name":$("#search_line :selected").text(),
				"receiving_workshop":$("#search_use_workshop :selected").text(),
				"zzj_type":$("#search_zzj_type").val(),
				"mat_description":$("#search_mat_desc").val(),
				"business_type":"1", // 发货：1
				"business_date_start":$("#search_date_start").val(),
				"business_date_end":$("#search_date_end").val(),
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码
            $.ajax({
                type: "post",
                url: "getWorkshopSupplyList",
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
                    var head_width=$(".dataTables_scrollHead").width();
                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		},
		columns: [
			{"title":"生产车间","class":"center","data": "delivery_workshop","defaultContent": ""},
			{"title":"生产线别","class":"center","data": "line_name","defaultContent": ""},
            {"title":"自制件类型","class":"center","data": "zzj_type","defaultContent": ""},
            {"title":"物料描述","class":"center","data":"mat_description","defaultContent": ""},		            
            {"title":"材料/规格","class":"center","data":"specification","defaultContent": ""},
            {"title":"单位","class":"center","data":"unit","defaultContent": ""},
            {"title":"单车用量","class":"center","data":"quantity","defaultContent": ""},
            {"title":"使用车间","class":"center","data":"receiving_workshop","defaultContent": ""},
            {"title":"下料尺寸","class":"center","data": "filling_size","defaultContent": ""},
            {"title":"订单需求数量","class":"center","data":"demand_quantity","defaultContent": ""},		            
            {"title":"本次收货数量","class":"center","data":"receiving_quantity","defaultContent": ""},		            
            //{"title":"累计收货数量","class":"center","data":"received_quantity","defaultContent": ""},		            		            
            {"title":"操作人","class":"center","data": "username","defaultContent": ""},
            {"title":"操作日期","class":"center","data":"edit_date","defaultContent": ""},
            {"title":"操作","class":"center","data":null,"render":function(data,type,row){
            	return "<i class=\"ace-icon fa fa-pencil bigger-130\" title='编辑' onclick = 'edit(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>&nbsp;&nbsp;"+
		            	"<i class=\"ace-icon glyphicon glyphicon-trash delete\" onclick=\'deleteData("+row.id+")\' style='color:green;cursor: pointer;'></i>";
               }
		    }
          ],
	});
}

function initPage(){
	getFactorySelect("zzj/zzjWorkshopSupply","","#search_factory",null,"id");
	getWorkshopSelect("",$("#search_factory :selected").text(),"","#search_use_workshop","全部","id");
	getWorkshopSelect("zzj/zzjWorkshopSupply",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',"全部",'id');
	getOrderNoSelect("#search_order_no","#orderId");
	$("#search_order_no").val("");
	$("#search_order_no").attr("order_id","");
	$("#search_order_desc").val("");
}
function edit(row){
	clear();
	$("#edit_factory").val(row.factory_name!=undefined ?row.factory_name:"");
	$("#edit_delivery_workshop").val(row.delivery_workshop!=undefined ?row.delivery_workshop:"");
	$("#edit_line_name").val(row.line_name!=undefined ?row.line_name:"");
	$("#edit_mat_description").val(row.mat_description!=undefined ?row.mat_description:"");
	$("#edit_zzj_type").val(row.zzj_type!=undefined ?row.zzj_type:"");
	$("#edit_order_desc").val(row.order_desc!=undefined ?row.order_desc:"");
	$("#edit_receiving_workshop").val(row.receiving_workshop!=undefined ?row.receiving_workshop : ""),
	$("#edit_demand_quantity").val(row.demand_quantity!=undefined ?row.demand_quantity:"");
	$("#edit_business_date").val(row.business_date!=undefined ?row.business_date:"");
	$("#edit_supply_quantity").val(row.receiving_quantity!=undefined ?row.receiving_quantity:"");
	$("#edit_old_quantity").val(row.receiving_quantity!=undefined ?row.receiving_quantity:"");
	$("#edit_received_quantity").val(row.received_quantity!=undefined ?row.received_quantity:"");
	var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
		width:600,
		height:500,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 车间供货编辑</h4></div>",
		title_html: true,
		zIndex: 1, 
		buttons: [ 
			{
				text: "取消",
				"class" : "btn btn-minier",
				click: function() {
					$( this ).dialog( 'close' ); 
				} 
			},
			{
				text: "确定",
				"class" : "btn btn-primary btn-minier",
				click: function() {
					updateData(row.id); 
				} 
			}
		]
	});
}
function updateData(id){
	if($("#edit_supply_quantity").val()==''){
		alert("请录入供货数量");
		return false;
	}

	var quantity=$("#edit_supply_quantity").val();
	var demand_quantity=$("#edit_demand_quantity").val();
	var received_quantity=$("#edit_received_quantity").val();
	var old_quantity=$("#edit_old_quantity").val();
	received_quantity=(received_quantity!='' ? received_quantity : 0);
	var check_quantity=parseFloat(demand_quantity)+parseFloat(old_quantity)-parseFloat(received_quantity);
	if(parseFloat(quantity)-check_quantity>0){
		alert("本次供货数量不大于:"+check_quantity);
		$("#edit_supply_quantity").css("border-color",'red');
		$("#edit_supply_quantity").focus();
		return false;
	}
	$.ajax({
        type: "post",
        url: "updateWorkshopSupply",
        cache: false,  //禁用缓存
        data: {
        	"id":id,
        	"quantity":quantity,
        	"business_date":$("#edit_business_date").val()
        	},  //传入组装的参数
        dataType: "json",
        success: function (response) {
        	if(response.success){
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>更新成功</h5>',
					class_name: 'gritter-info'
				});
				$( "#dialog-edit" ).dialog( 'close' ); 
				ajaxQuery();
			}else{
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>更新失败</h5><br>',
					class_name: 'gritter-info'
				});
			}
        }
	});
}
function deleteData(id){
	if(!confirm("确认删除该条数据？")){
		return false;
	}
	$.ajax({
        type: "post",
        url: "delWorkshopSupply",
        cache: false,  //禁用缓存
        data: {id:id},  //传入组装的参数
        dataType: "json",
        success: function (response) {
        	if(response.success){
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除成功</h5>',
					class_name: 'gritter-info'
				});
				ajaxQuery();
			}else{
				$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除失败</h5><br>',
					class_name: 'gritter-info'
				});
			}
        }
	});
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
//function getAllWorkshopSelect() {
//	$("#search_workshop").empty();
//	$.ajax({
//		url : "/BMS/common/getWorkshopSelectAuth",
//		dataType : "json",
//		data : {
//				factory:$("#search_factory :selected").text(),
//				org_kind:'1',
//				function_url:'zzj/zzjWorkshopSupply'
//			},
//		async : false,
//		error : function(response) {
//			alert(response.message)
//		},
//		success : function(response) {
//			var strs ="";
//			
//			$("#search_workshop").html("");
//			$.each(response.data, function(index, value) {
//				strs += "<option value=" + value.id+(value.org_id?(" org_id="+value.org_id):"") +
//				" customer_no_flag='"+value.customer_no_flag+"' "+
//				">" + value.name
//				+ "</option>";
//			});
//			$("#search_workshop").append(strs);
//		}
//	});
//}
function clear(){
	$("#edit_mat_description").val("");
	$("#edit_zzj_type").val("");
	$("#edit_order_desc").val("");
	$("#edit_receiving_workshop").val("");
	$("#edit_receiving_quantity").val("");
	$("#edit_demand_quantity").val("");
	$("#edit_business_date").val("");
	$("#edit_supply_quantity").val("");
}