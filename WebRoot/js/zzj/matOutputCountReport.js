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
			//getBatchSelects();
		}	
	})
	
	$("#search_factory").change(function(){
		if($("#search_order").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			//getBatchSelects();
		}
		
		$("#search_workshop").empty();
		if($("#search_factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			getAllProcessSelect();
		}
	});
	
	$("#search_workshop").change(function(){
		$("#search_line").empty();
		if($("#search_workshop").val() !=''){
			getAllLineSelect();
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
			getSelects(response.data, "", "#search_line",null,"name"); 
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
			var strs = "";
		    $("#search_process").html("");
		    var process_id_default="";
		    var process_name_default="";
 
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.process_name + " process='"+value.process_code+"' plan_node='"+(value.plan_node_name||"")
		    	+"' field_name='" +(value.field_name||"")+ "'>" + value.process_name + "</option>";
		    });
		    $("#search_process").append(strs);
		    if("自制件"==$("#search_workshop :selected").text()){
		    	$("#search_process").val("入库");
		    }
		    
		}
	});
}

function ajaxQuery_jqgrid(){
	$("#tableResult").jqGrid( { 
		url : 'getOutputCountData',
		datatype : "json", 
		mtype : "post", 
		postData:{
			
		},
		/*styleUI : 'Bootstrap',*/
		/*width:1360,*/
		forceFit:true,
		height:$(window).height()-210,
		colNames : [ '订单', '自制件类别', '需求种类', '已完成种类', '欠产种类' ], 
		colModel : [ 
		             {name : 'mat_description',index : 'mat_description'}, 
		             {name : 'zzj_type',index : 'zzj_type',}, 
		             {name : 'mat_count',index : 'mat_count',}, 
		             {name : 'done_count',index : 'done_count',align : "right"}, 
		             {name : '',index : '',sortable : false,formatter:function(cellvalue, options, rowObject){
		            	 var html="";
		            	 return html;
		             }} 
		             ], 
		rowNum : 10, 
		rowList : [ 10, 20, 50 ], 
		pager : '#pager', 
		sortname : 'id', 
		viewrecords : true, 
		sortorder : "desc", 
		//caption : "产量达成汇总" 
	}); 
	$("#tableResult").jqGrid('navGrid', '#pager', {edit : false,add : false,del : false}); 
}


function ajaxQuery(){
	$("#tableResult").DataTable({
		serverSide: true,
		paginate:false,
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-170,
		scrollX: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			zeroRecords:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..."
		},
		ajax:function (data, callback, settings) {
			var param ={
					"draw":1,
					"order_id":$("#search_order").attr("order_id"),
					"factory":$("#search_factory").val(),
					"zzj_type":$("#search_zzj_type").val(),
					//"mat_desc":$("#search_mat_desc").val(),
					"workshop":$("#search_workshop :selected").text(),
					"line":$("#search_line").val(),
					//"batch":$("#search_batch").val(),
					"process":$("#search_process").val(),
				};
  /*          param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码
*/
            $.ajax({
                type: "post",
                url: "getOutputCountData",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    //returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = 0;//返回数据全部记录
                    returnData.recordsFiltered =0;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		
		},
		columns: [
		            {"title":"订单","class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"自制件类别","class":"center","data":"zzj_type","defaultContent": ""},
		            {"title":"需求种类","class":"center","data":"mat_count","defaultContent": ""},
		            {"title":"已完成种类","class":"center","data":"done_type_count","defaultContent": ""},
		            {"title":"欠产种类","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	var html="";
		            	if(row.mat_count-row.done_type_count>0){
		            		html="<span onclick='showCountDetail(\""+row.zzj_type+"\")' style='color:red;cursor: pointer;'>"+(row.mat_count-row.done_type_count)+"</span>"
		            	}else
		            		html=row.mat_count-row.done_type_count;
		            	return html;
		            }}	
		          ],

		
	});
}

function showCountDetail(zzj_type){
	var obj = {id:"产量达成明细",title:"产量达成明细",close:'true',url: "/BMS/zzj/matOutputCountDetail?" +
			"factory="+$("#search_factory").val()+"&workshop="+$("#search_workshop :selected").text()+
			"&line="+$("#search_line").val()+"&process="+$("#search_process").val()+"&batch="+
			$("#search_batch").val()+"&zzj_type="+zzj_type+"&order_id="+$("#search_order").attr("order_id")+
			"&order_no="+$("#search_order").val()
			,icon:''};
	window.parent.addTabs(obj);
}