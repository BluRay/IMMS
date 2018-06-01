$(document).ready(function(){
	initPage();
	$("#btnQuery").click(function(){
		var type=$('input:radio:checked').val();
    	if(type=='0'){
    		ajaxQuery(''); // 查询最新
    	}else if(type=='1'){
    		ajaxChangeDataQuery(); //变更数据
    	}
	});
	$('#search_factory').change(function(){ 
		getWorkshopSelect("zzj/zzjPMDQuery",$("#search_factory :selected").text(),"","#search_workshop","全部","id");
	});
	$(document).on("change","#search_order_no",function(){
		$("#search_order_desc").val("");
        if($(this).val().trim().length>0&&$("#search_factory").val()!=''){
			getZzjTypes();
		}	
	});
	
	$(document).on("change","#search_factory",function(){
		if($("#search_order_no").val().trim().length>0 && $("#search_factory").val()!=''){
			getZzjTypes();
		}
	});
	$(document).on("click",".typeahead li",function(){
		var order_desc=$(this).find("a").text();
		$("#search_order_desc").val(order_desc);
	});
	$(document).on("click","#btnBack",function(){
		var order_id=$("#search_old_order_no").attr("order_id");
		var order_no=$("#search_old_order_no").val();
		var factory_id=$("#default_factory").val();
		var zzj_type=$('#default_zzj_type').attr("default_zzj_type");
		var order_desc=$("#search_old_order_desc").val();
		window.location.href="/BMS/zzj/zzjPMDQuery?order_id="+order_id+"&factory_id="+factory_id+
		"&order_no="+order_no+"&zzj_type="+zzj_type+"&order_desc="+order_desc+"";
	});
	$(":radio").click(function(){
    	var type=$(this).val();
    	if(type=='0'){
    		ajaxQuery(''); 
    	}else if(type=='1'){
    		ajaxChangeDataQuery(); 
    	}
    });
});
function ajaxQuery(zzj_type){
	var order_id = $("#search_order_no").attr("order_id");
	var factory_id = $("#search_factory").val();
	var mat_description = $.trim($("#search_mat_description").val());
	if(zzj_type==''){
		zzj_type = $("#search_zzj_type").val();
	} 
	$.ajax({
		url:"getPmdDetailByMap",
		type: "post",
		dataType:"json",
		data:{
			"order_id":order_id,
			"factory_id":factory_id,
			"mat_description":mat_description,
			"zzj_type":zzj_type,
			"type":"0" // 0：最新数据
		},
		success:function(response){
			if($.fn.dataTable.isDataTable("#tableResult")){
				$('#tableResult').DataTable().destroy();
				$('#tableResult').empty();
			}
			var datalist=response.data;
			var columns=[
			    {"title":"序号","class":"center","data":"","width":"50px","render" : function(data, type, full, meta){
	            	return meta.row + 1 + meta.settings._iDisplayStart;
	            }},
	            {"title":"SAP","class":"center","width":"90px","data":"sap_mat","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>自制件类别","class":"center","width":"100px","data":"zzj_type","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>物料描述","class":"center","width":"200px","data": "mat_description","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>物料类型","class":"center","width":"150px","data":"mat_type","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>材料/规格","class":"center","width":"145px","data": "specification","defaultContent": ""},
	            {"title":"单位","class":"center","width":"45px","data": "unit","defaultContent": ""},
	            {"title":"单车损耗%","class":"center","width":"75px","data": "loss","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>单车用量","class":"center","width":"70px","data": "quantity"},
	            {"title":"单重","class":"center","width":"70px","data": "weight","defaultContent": ""},
	            {"title":"总重(含损耗)","class":"center","data": "weight_total","width":"90px","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>使用车间","class":"center","width":"80px","data": "use_workshop"},
	            {"title":"<span style=\"color: red;\">*</span>使用线别","class":"center","width":"80px","data": "use_line","defaultContent": ""},
	            {"title":"工序","class":"center","width":"120px","data": "process","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>装配位置","class":"center","width":"100px","data": "assembly_position","defaultContent": ""},
	            {"title":"工艺标识","class":"center","width":"150px","data": "crafts_identification","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>下料尺寸","class":"center","width":"120px","data": "filling_size","defaultContent": ""},
	            {"title":"精度要求","class":"center","width":"100px","data": "accuracy_demand","defaultContent": ""},
	            {"title":"表面处理","class":"center","width":"100px","data": "surface_treatment","defaultContent": ""},
	            {"title":"备注","class":"center","width":"100px","data": "memo","defaultContent": ""},
	            {"title":"工艺备注","class":"center","data": "crafts_memo","width":"100px","defaultContent": ""},
	            {"title":"分包类型","class":"center","data": "subcontracting_type","width":"80px","defaultContent": ""},
	            {"title":"加工顺序","class":"center","data": "process_sequence","width":"100px","defaultContent": ""},
	            {"title":"工艺流程","class":"center","data": "process_flow","width":"150px","defaultContent": ""},
	            {"title":"所属班组","class":"center","data": "team","width":"120px","defaultContent": ""},
	            {"title":"变更说明","class":"center","data": "change_escription","width":"120px","defaultContent": ""},
	            {"title":"变更主体","class":"center","data": "change_subject","width":"120px","defaultContent": ""},
	            {"title":"变更类型","class":"center","data": "change_type","width":"90px","defaultContent": ""},
	        ];
			$("#tableResult").DataTable({
				paiging:false,
				fixedColumns:   { 
		            leftColumns: 4,
		            rightColumns:0
		        },
				ordering:false,
				processing:true,
				searching: false,
				autoWidth:false,
				paginate:false,
				sScrollY: $(window).height()-125,
				scrollX: true,
				scrollCollapse: false,
				lengthChange:false,
				orderMulti:false,
				info:false,
				language: {},
				data:datalist,
				columns:columns
			});
            var head_width=$(".dataTables_scrollHead").width();
            $(".dataTables_scrollHead").css("width",head_width-17);
			$(".divLoading").hide();
		}
	});	
}
function ajaxChangeDataQuery(){

	var order_id = $("#search_order_no").attr("order_id");
	var factory_id = $("#search_factory").val();
	var mat_description = $.trim($("#search_mat_description").val());
	var zzj_type = $("#search_zzj_type").val();
	$.ajax({
		url:"getPmdDetailByMap",
		type: "post",
		dataType:"json",
		data:{
			"order_id":order_id,
			"factory_id":factory_id,
			"mat_description":mat_description,
			"zzj_type":zzj_type,
			"type":"1" // 1：变更数据
		},
		success:function(response){
			if($.fn.dataTable.isDataTable("#tableResult")){
				$('#tableResult').DataTable().destroy();
				$('#tableResult').empty();
			}
			var datalist=response.data;
			var columns=[
			    {"title":"变更类型","class":"center","data":"operation_type","width":"120px"}, 
	            {"title":"SAP","class":"center","width":"90px","data":"sap_mat","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>自制件类别","class":"center","width":"100px","data":"zzj_type","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>物料描述","class":"center","width":"200px","data": "mat_description","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>装配位置","class":"center","width":"100px","data": "assembly_position","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>物料类型","class":"center","width":"150px","data":"mat_type","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>材料/规格","class":"center","width":"145px","data": "specification","defaultContent": ""},
	            {"title":"单位","class":"center","width":"45px","data": "unit","defaultContent": ""},
	            {"title":"单车损耗%","class":"center","width":"75px","data": "loss","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>单车用量","class":"center","width":"70px","data": "quantity"},
	            {"title":"单重","class":"center","width":"70px","data": "weight","defaultContent": ""},
	            {"title":"总重(含损耗)","class":"center","data": "weight_total","width":"90px","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>使用车间","class":"center","width":"80px","data": "use_workshop"},
	            {"title":"<span style=\"color: red;\">*</span>使用线别","class":"center","width":"80px","data": "use_line","defaultContent": ""},
	            {"title":"工序","class":"center","width":"120px","data": "process","defaultContent": ""},
	            {"title":"工艺标识","class":"center","width":"150px","data": "crafts_identification","defaultContent": ""},
	            {"title":"<span style=\"color: red;\">*</span>下料尺寸","class":"center","width":"120px","data": "filling_size","defaultContent": ""},
	            {"title":"精度要求","class":"center","width":"100px","data": "accuracy_demand","defaultContent": ""},
	            {"title":"表面处理","class":"center","width":"100px","data": "surface_treatment","defaultContent": ""},
	            {"title":"备注","class":"center","width":"100px","data": "memo","defaultContent": ""},
	            {"title":"工艺备注","class":"center","data": "crafts_memo","width":"100px","defaultContent": ""},
	            {"title":"分包类型","class":"center","data": "subcontracting_type","width":"80px","defaultContent": ""},
	            {"title":"加工顺序","class":"center","data": "process_sequence","width":"100px","defaultContent": ""},
	            {"title":"工艺流程","class":"center","data": "process_flow","width":"150px","defaultContent": ""},
	            {"title":"所属班组","class":"center","data": "team","width":"120px","defaultContent": ""},
	            {"title":"变更说明","class":"center","data": "change_escription","width":"120px","defaultContent": ""},
	            {"title":"变更主体","class":"center","data": "change_subject","width":"120px","defaultContent": ""},
	            {"title":"变更类型","class":"center","data": "change_type","width":"90px","defaultContent": ""},
	        ];
			$("#tableResult").DataTable({
				paiging:false,
				fixedColumns:   { 
		            leftColumns: 4,
		            rightColumns:0
		        },
		        rowsGroup:[3],
				ordering:false,
				processing:true,
				searching: false,
				autoWidth:false,
				paginate:false,
				sScrollY: $(window).height()-125,
				scrollX: true,
				scrollCollapse: false,
				lengthChange:false,
				orderMulti:false,
				info:false,
				language: {},
//	            "fnDrawCallback":function(){
//	            	var trs=$("#tableResult tbody").find("tr");
//	            	var init_mat_description="";
//	            	var init_assembly_position="";
//	            	var init_quantity="";
//	            	var init_array=new Array();
//	            	for(var i=0;i<=22;i++){
//	            		init_array[i]="";
//	            	}
//	            	$.each(trs,function(i,tr){
//	            		var cur_mat_description=$(tr).children().eq(3).text();
//	            		var cur_assembly_position=$(tr).children().eq(4).text();		
//	            		if(init_mat_description==cur_mat_description &&
//	            				init_assembly_position==cur_assembly_position){
//	            			for(var i=5;i<=27;i++){
//		            			if(init_array[i-5]==$(tr).children().eq(i).text()){
//		            				continue;
//		            			}else{
//		            				$(tr).children().eq(i).css("background-color","#ff0000");
//		            				$(tr).children().eq(i).parent().prev().children().eq(i).css("background-color","#ff0000");
//		            			}
//		            		}
//	            		}else{
//	            			init_mat_description=cur_mat_description;
//	            			init_assembly_position=cur_assembly_position;
//	            			for(var i=0;i<init_array.length;i++){
//	            				init_array[i]=$(tr).children().eq(i+5).text();
//	            			}
//	            		}
//	            	});
//	            },
				data:datalist,
				columns:columns
			});
            var head_width=$(".dataTables_scrollHead").width();
            $(".dataTables_scrollHead").css("width",head_width-17);
			$(".divLoading").hide();
		}
	});	
}

function initPage(){
	getFactorySelect("zzj/zzjPMDQuery","","#search_factory","全部","id");
	var factory_id=$("#default_factory").val();
	$("#search_factory option[value='"+factory_id+"']").prop("selected",true);
	getOrderNoSelect("#search_order_no","#orderId");
	getZzjTypes($("#default_zzj_type").val());
	ajaxQuery($("#default_zzj_type").val());
}

/**
 * 自制件模块获取自制件类别下拉选项
 */
function getZzjTypes(selectval){
	selectval=selectval||"";
	$.ajax({
		type : "post",
		dataType : "json",
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