$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		if($("#search_order").val().trim().length==0){
			alert("请输入订单！");
			return false;
		}
		ajaxQuery();
	})
	
	$(document).on("change","#search_order",function(){
		if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			getBatchSelects();
		}	
	})
	
	$("#search_factory").change(function(){
		if($("#search_order").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			getBatchSelects();
		}
		
		$("#search_workshop").empty();
		if($("#search_factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			getTeamSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),
					"","","#search_team","全部","name");
			getAllProcessSelect();
		}
	});
	
	$("#search_workshop").change(function(){
		$("#search_line").empty();
		if($("#search_workshop").val() !=''){
			getAllLineSelect();
			getTeamSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),
					"","","#search_team","全部","name");
			getAllProcessSelect();
		}
	});
	
	$("#search_line").change(function(){
		$("#search_process").empty();
		if($("#search_line").val() !=''){
			getAllProcessSelect();
		}
	});
	
	
})

function initPage(){
	getFactorySelect()
	getOrderNoSelect("#search_order","#orderId");

}

function getFactorySelect() {
	$.ajax({
		url : "/BMS/common/getFactorySelectAuth",
		dataType : "json",
		data : {
			function_url:'zzj/matEnter'
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response.data, "", "#search_factory");
			getAllWorkshopSelect();
			getAllLineSelect();
			getAllProcessSelect();
			getTeamSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),
					"","","#search_team","全部","name");
		}
	});
}

function getAllWorkshopSelect() {
	$("#search_workshop").empty();
	$.ajax({
		url : "/BMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {
				factory:$("#search_factory :selected").text(),
				org_kind:'1',
				function_url:'zzj/matOutputReport'
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs ="";
			
			$("#search_workshop").html("");
			$.each(response.data, function(index, value) {
				strs += "<option value=" + value.id+(value.org_id?(" org_id="+value.org_id):"") +
				" customer_no_flag='"+value.customer_no_flag+"' "+
				">" + value.name
				+ "</option>";
			});
			$("#search_workshop").append(strs);
		}
	});
}

function getAllLineSelect() {
	$("#search_line").empty();
	$.ajax({
		url : "/BMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:$("#search_factory :selected").text(),
				workshop:$("#search_workshop :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			line_selects_data=response.data;
			getSelects(response.data, "", "#search_line","全部","name"); 
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
			"order_no":$("#search_order").val()
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_zzj_type","全部", "name");	
		}	
	});
}


/**
 * 自制件模块获取批次下拉选项
 */
function getBatchSelects(selectval){
	selectval=selectval||"";
	
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getBatchList",
		data : {
			"factory" : $("#search_factory").val(),
			"order_id":$("#search_order").attr("order_id")
		},
		success:function(response){
			getSelects(response.data,selectval,"#search_batch","全部", "name");	
		}	
	});
}

function getAllProcessSelect(order_type,process_default) {
	order_type=order_type||'标准订单';
	$("#search_process").empty();		
	$.ajax({
		url : "/BMS/common/getProcessMonitorSelect",
		dataType : "json",
		data : {
			factory:$("#search_factory :selected").text(),
			workshop:$("#search_workshop :selected").text(),
			line:$("#search_line").val(),
			order_type:order_type
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "<option value=''>全部</option>";
		    $("#search_process").html("");
		    var process_id_default="";
		    var process_name_default="";
 
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.process_name + " process='"+value.process_code+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		    $("#search_process").append(strs);

		}
	});
}

function ajaxQuery(){
	$("#tableResult").DataTable({
		columnDefs: [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        fixedColumns:   {
            leftColumns: 3,
            rightColumns:0
        },
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-170,
		scrollX: true,
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
					"order_no":$("#search_order").val(),
					"factory":$("#search_factory").val(),
					"zzj_type":$("#search_zzj_type").val(),
					"mat_desc":$("#search_mat_desc").val(),
					"workshop":$("#search_workshop :selected").text(),
					"line":$("#search_line").val(),
					"team":$("#search_team").val(),
					"process":$("#search_process").val(),
					"start_date":$("#wdate_start").val(),
					"end_date":$("#wdate_end").val(),
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getOutputDetailList",
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
		            {"title":"物料描述","class":"center","width":"220","data":"mat_description","defaultContent": ""},
		            {"title":"自制件类别","class":"center","width":"100","data":"zzj_type","defaultContent": ""},
		            {"title":"订单","class":"center","width":"150","data":"order_desc","defaultContent": ""},
		            {"title":"生产工厂","class":"center","width":"100","data":"factory_name","defaultContent": ""},
		            {"title":"车间","class":"center","width":"90","data":"workshop_name","defaultContent": ""},
		            {"title":"线别","class":"center","width":"90","data":"line_name","defaultContent": ""},
		            {"title":"班组","class":"center","width":"100","data":"team","defaultContent": ""},
		            {"title":"生产批次","class":"center","width":"90","data": "batch","defaultContent": ""},
		            {"title":"生产数量","class":"center","width":"80","data":"quantity","defaultContent": ""},		            
		            {"title":"生产日期","class":"center","width":"100","data":"product_date","defaultContent": ""},		            
		            {"title":"生产工序","class":"center","width":"120","data": "process","defaultContent": ""},
		            {"title":"操作人","class":"center","width":"80","data":"editor","defaultContent": ""},		            
		            {"title":"操作时间","class":"center","width":"150","data":"edit_date","defaultContent": ""},	
		          ],

		
	});
}