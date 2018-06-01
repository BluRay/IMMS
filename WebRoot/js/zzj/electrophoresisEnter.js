
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	$('#search_factory').change(function(){ 
		getWorkshopSelect("zzj/electrophoresisEnter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	});
	$('#search_workshop').change(function(){ 
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_line","全部","name");
	});
	
	$(document).on("change","#search_order_no",function(){
		
		$("#search_order_desc").val("");

		if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			var order_id=$('#search_order_no').attr("order_id");
			var factory_id=$("#search_factory").val();
			getZzjBatchs(order_id,factory_id,$("#search_batch"));
		}	
	})
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
			var order_id=$('#search_order_no').attr("order_id");
			var factory_id=$("#search_factory").val();
			getZzjBatchs(order_id,factory_id,$("#search_batch"));
		}
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	})
	$(document).on("click","#btnAdd",function(){
		window.open("/BMS/zzj/electrophoresisAdd?business_type=2","_self");
	});
	$(document).on("blur","#edit_quantity",function(){
		$(this).css("border-color",'');
		var quantity=$(this).val();
		if(quantity==''){
			return false;
		}
		
		if(!const_float_validate.test(quantity) && quantity!=""){
			alert("只能录入数字类型！");
			$(this).val("");
			$(this).css("border-color",'red');
			$(this).focus();
			return false;
		}
		$.ajax({
	        type: "post",
	        url: "checkEelectroEnterQuantity",
	        cache: false,  //禁用缓存
	        data: {
	        	"order_id":$("#search_order_no").attr("order_id"),
	        	"factory_name":$("#edit_factory_name").val(),
	        	"workshop_name":$("#edit_workshop_name").val(),
	        	"line_name":$("#edit_line_name").val(),
	        	"zzj_type":$("#edit_zzj_type").val(),
	        	"batch":$("#edit_batch").val(),
	        	"mat_description":$("#edit_mat_description").val(),
	        	"quantity":quantity
	        	},  //传入组装的参数
	        dataType: "json",
	        success: function (response) {
	        	if(!response.success){
	        		var max=(response.maxQuantity!='' ? parseInt(response.maxQuantity) : 0)+
	        		     ($("#edit_old_quantity").val()!='' ? parseInt($("#edit_old_quantity").val()) : 0);
	        		alert("进仓数量不能大于已外发未进仓数量:"+max);
	    			$("#edit_quantity").val($("#edit_old_quantity").val());
	    			$("#edit_quantity").css("border-color",'red');
	    			$("#edit_quantity").focus();
				}
	        }
		});
	});
//	$(document).on("click","#btnAdd",function(){
//		
//		var dialog = $("#dialog_add").removeClass('hide').dialog({
//			width:600,
//			modal: true,
//			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 电泳件进仓新增</h4></div>',
//			title_html: true,
//			buttons: [ 
//				{
//					text: "取消",
//					"class" : "btn btn-minier",
//					click: function() {
//						$( this ).dialog( "close" ); 
//					} 
//				},
//				{
//					text: "确定",
//					"class" : "btn btn-primary btn-minier",
//					click: function() {
//						ajaxAdd();
//					} 
//				}
//			]
//		});
//	}); 
});

function ajaxQuery(){
	if($("#search_order_no").val()==''){
		alert("请输入订单编号");
		return false;
	}
	if($("#search_factory").val()==''){
		alert("请选择生产工厂");
		return false;
	}
	var dt=$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		fixedColumns:   {
            rightColumns:1
        },
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
				"factory_name":$("#search_factory :selected").text(),
				"workshop_name":$("#search_workshop :selected").text(),
				"line_name":$("#search_line").val(),
				"zzj_type":$("#search_zzj_type").val(),
				"mat_description":$("#search_mat_desc").val(),
				"batch":$("#search_batch").val(),
				"business_type":"2", // 进仓：2
				"business_date_start":$("#search_date_start").val(),
				"business_date_end":$("#search_date_end").val(),
				"type":'电泳件'
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getElectrophoresisList",
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
            {"title":"序号","class":"center","data":"","defaultContent": "","render" : function(data, type, full, meta){
            	return meta.row + 1 + meta.settings._iDisplayStart;
            }}, // 序号
            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
            {"title":"生产车间","class":"center","data":"workshop_name","defaultContent": ""},
            {"title":"生产线别","class":"center","data":"line_name","defaultContent": ""},
            {"title":"生产批次","class":"center","data":"batch","defaultContent": ""},
            {"title":"自制件类型","class":"center","data": "zzj_type","defaultContent": ""},
            {"title":"物料描述","class":"center","data":"mat_description","defaultContent": ""},		            
            {"title":"进仓数量","class":"center","data":"quantity","defaultContent": ""},		            
            {"title":"进仓日期","class":"center","data": "business_date","defaultContent": ""},
            {"title":"电泳加工商","class":"center","data":"vendor","defaultContent": ""},
            {"title":"备注","class":"center","data":"memo","defaultContent": ""},		            
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
	getFactorySelect("zzj/electrophoresisEnter","","#search_factory",null,"id");
	getWorkshopSelect("zzj/electrophoresisEnter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line','全部','name');
	getOrderNoSelect("#search_order_no","#orderId");
}
function edit(row){
	clear();
	$("#edit_mat_description").val(row.mat_description!=undefined ?row.mat_description:"");
	$("#edit_zzj_type").val(row.zzj_type!=undefined ?row.zzj_type:"");
	$("#edit_order_no").val(row.order_no!=undefined ?row.order_no:"");
	$("#edit_order_desc").val(row.order_desc!=undefined ?row.order_desc:"");
	getZzjBatchs(row.order_id,row.factory_id,$("#edit_batch"),row.batch);
	$("#edit_quantity").val(row.quantity!=undefined ?row.quantity:"");
	$("#edit_old_quantity").val(row.quantity!=undefined ?row.quantity:"");
	$("#edit_business_date").val(row.business_date!=undefined ?row.business_date:"");
	$("#edit_vendor").val(row.vendor!=undefined ?row.vendor:"");
	$("#edit_memo").val(row.memo!=undefined ?row.memo:"");
	$("#edit_factory_name").val(row.factory_name!=undefined ?row.factory_name:"");
	$("#edit_workshop_name").val(row.workshop_name!=undefined ?row.workshop_name:"");
	$("#edit_line_name").val(row.line_name!=undefined ?row.line_name:"");
	
	var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
		width:700,
		height:450,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>电泳件进仓编辑</h4></div>",
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
	if($("#edit_quantity").val()==''){
		alert("请录入进仓数量");
		return false;
	}
	if($("#edit_business_date").val()==''){
		alert("请录入进仓日期");
		return false;
	}
	$.ajax({
        type: "post",
        url: "updateElectrophoresis",
        cache: false,  //禁用缓存
        data: {
        	"id":id,
        	"batch":$("#edit_batch").val(),
        	"quantity":$("#edit_quantity").val(),
        	"business_date":$("#edit_business_date").val(),
        	"vendor":$("#edit_vendor").val(),
        	"memo":$("#edit_memo").val()
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
        url: "delElectrophoresis",
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
function getZzjBatchs(order_id,factory_id,element,selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",// 返回json格式的数据
		url : "/BMS/zzj/getZzjBatchList",
		data : {
			"factory_id" : factory_id,
			"order_id":order_id
		},
		success:function(response){
			getSelects(response.data,selectval,$(element),"全部", "name");	
		}	
	});
}
function clear(){
	$("#edit_mat_description").val("");
	$("#edit_zzj_type").val("");
	$("#edit_order_no").val("");
	$("#edit_order_desc").val("");
	$("#edit_batch").val(""),
	$("#edit_quantity").val("");
	$("#edit_business_date").val("");
	$("#edit_vendor").val("");
	$("#edit_memo").val("");
	$("#edit_factory_name").val("");
	$("#edit_workshop_name").val("");
	$("#edit_line_name").val("");
}