var pageSize=1;
var table;
var dt;

var datalist=[];//表格数据对象
var header_id = '0';
var addList=[];
var save_flag=true;

var upload_in_progress = false;

$(document).ready(function(){
	getFactorySelect("zzj/importPMD",'',"#search_factory",null,'id');
	getWorkshopSelect("zzj/importPMD",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	getOrderNoSelect("#search_order_no","#orderId",fn_cb_getOrderInfo,null,"#search_factory");
	
	//工厂切换
	$("#search_factory").on("change",function(){
		getWorkshopSelect("zzj/importPMD",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	}); 
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	});
	
	$('#file').ace_file_input({
		no_file:'请选择待导入下料明细文件(xlsx)...',
		btn_choose:'选择文件',
		btn_change:'重新选择',
		droppable:false,
		onchange:null,
		thumbnail:false, //| true | large
		allowExt: ['xlsx','xls'],
	}).on('file.error.ace', function(event, info) {
		alert("请选择EXCEL文件!");
    });
	$("#btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	
	//ajaxQuery();
	$("#btn_upload").click (function () {
		save_flag=true;
		//判断订单、工厂、车间、线别是否为空
		var order_id = $("#search_order_no").attr("order_id")||'';
		var factory_id = $("#search_factory").val()||'';
		var factory_name = $("#search_factory").find("option:selected").text()||'';
		var workshop_name = $("#search_workshop").find("option:selected").text()||'';
		var line_name = $("#search_line").find("option:selected").text()||'';
		if(undefined == order_id || order_id==''){
			save_flag=false;
			alert("请选择订单！");
			return false;
		}
		if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
			save_flag=false;
			alert("请选择生产工厂！");
			return false;
		}
		if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
			save_flag=false;
			alert("请选择车间！");
			return false;
		}
		if(undefined == line_name || line_name=='' ||line_name=='请选择'){
			save_flag=false;
			alert("请选择线别！");
			return false;
		}
		
		var files = $("#file").data('ace_input_files');
		if( !files || files.length == 0 ) {
			save_flag=false;
			alert("请选择需上传的模板文件！");
			return false;//no files selected
		}
		
/*		if($("#file").val()==''){
			alert("请选择模板文件！");
			return false;
		}*/
		$("#btn_upload").attr("disabled",true);
		$(".divLoading").addClass("fade in").show();
		upload_in_progress = true;
		$("#uploadForm").ajaxSubmit({
			url:"uploadPMD",
			type: "post",
			dataType:"json",
			async: false,
			success:function(response){
				$("#btn_upload").removeAttr("disabled");  
				if(response.success){	
						//导入成功
						pmd_head_id = response.data.pmd_head_id;
						addList = response.data.addList;
						datalist=response.data.addList;
						//处理表格数据
						if($.fn.dataTable.isDataTable("#tableResult")){
							$('#tableResult').DataTable().destroy();
							$('#tableResult').empty();
						}
						var columns=[
				            {"title":"序号","class":"center","width":"50px","data":"no","defaultContent": ""},
				            {"title":"SAP","class":"center","width":"90px","data":"sap_mat","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>自制件类别","class":"center","width":"100px","data":"zzj_type","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>物料描述","class":"center","width":"200px","data": "mat_description","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>物料类型","class":"center","width":"130px","data":"mat_type","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>材料/规格","class":"center","width":"145px","data": "specification","defaultContent": ""},
				            {"title":"单位","class":"center","width":"45px","data": "unit","defaultContent": ""},
				            {"title":"单车损耗%","class":"center","width":"75px","data": "loss","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>单车用量","class":"center","width":"70px","data": "quantity","defaultContent": ""},
				            {"title":"单重","class":"center","width":"70px","data": "weight","defaultContent": ""},
				            {"title":"总重(含损耗)","class":"center","data": "weight_total","width":"90px","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>使用车间","class":"center","width":"80px","data": "use_workshop","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>使用线别","class":"center","width":"80px","data": "use_line","defaultContent": ""},
				            {"title":"工序","class":"center","width":"120px","data": "process","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>装配位置","class":"center","width":"100px","data": "assembly_position","defaultContent": ""},
				            {"title":"工艺标识","class":"center","width":"150px","data": "crafts_identification","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>下料尺寸","class":"center","width":"120px","data": "filling_size","defaultContent": ""},
				            {"title":"精度要求","class":"center","width":"100px","data": "accuracy_demand","defaultContent": ""},
				            {"title":"表面处理","class":"center","width":"100px","data": "surface_treatment","defaultContent": ""},
				            {"title":"备注","class":"center","width":"220px","data": "memo","defaultContent": ""},
				            {"title":"工艺备注","class":"center","data": "crafts_memo","width":"100px","defaultContent": ""},
				            {"title":"分包类型","class":"center","data": "subcontracting_type","width":"180px","defaultContent": ""},
				            {"title":"加工顺序","class":"center","data": "process_sequence","width":"100px","defaultContent": ""},
				            {"title":"工艺流程","class":"center","data": "process_flow","width":"150px","defaultContent": ""},
				            {"title":"所属班组","class":"center","data": "team","width":"120px","defaultContent": ""},
				            {"title":"变更说明","class":"center","data": "change_escription","width":"120px","defaultContent": ""},
				            {"title":"变更主体","class":"center","data": "change_subject","width":"120px","defaultContent": ""},
				            {"title":"消息","class":"center","data": "error","defaultContent": "","render":function(data,type,row){
				            	return data;
				            }}
				        ];
						$("#tableResult").DataTable({
							paiging:false,
							dom: 'Bfrtip',
							fixedColumns:   { //固定列，行有错位现象
					            leftColumns: 5,
					            rightColumns:0
					        },
							ordering:false,
							processing:true,
							searching: false,
							autoWidth:false,
							paginate:false,
							sScrollY: $(window).height()-140,
							scrollX: true,
							scrollCollapse: false,
							lengthChange:false,
							orderMulti:false,
							info:false,
							language: {
								
							},
							columnDefs: [
				                {
				                "targets" :[27],
				                "createdCell": function (nTd, sData, oData, iRow, iCol) { 
				                	if($(nTd).text()!=''){
				                		save_flag=false;
				                		//数据格式错误 整行用红色字体标示
				                		$(nTd).parent().css('color', '#ff0000');
					                	$(nTd).css('color', '#ff0000').css('font-weight', 'bold').css('width','200px');
				                	}
				                }   
				                },
				                {
				                	"targets":[4,6,18,19,20,21,22,27],
				                	"render":function(data,type,row,meta){
				                		return "<span title='"+data+"'>"+data+"</span>"
				                	}
				                }
				            ],
							data:datalist,
							columns:columns
						});
				}else{
					//后台处理失败，提示错误消息
					alert(response.message);
				}
				var head_width=$(".dataTables_scrollHead").width();
                $(".dataTables_scrollHead").css("width",head_width-17);
				$(".divLoading").hide();
			},
			complete:function(){
				$("#uploadForm")[0].reset();
			},
			always:function() {//called on both success and failure
				upload_in_progress = false;
				$("#btn_upload").removeAttr("disabled");  
			}
		});
	});
	$('#btnSave').click(function(event) {
		
		//判断订单、工厂、车间、线别是否为空
		var order_id = $("#search_order_no").attr("order_id")||'';
		var factory_id = $("#search_factory").val()||'';
		var factory_name = $("#search_factory").find("option:selected").text()||'';
		var workshop_name = $("#search_workshop").find("option:selected").text()||'';
		var line_name = $("#search_line").find("option:selected").text()||'';
		if(undefined == order_id || order_id==''){
			save_flag = false;
			alert("请选择订单！");
			return false;
		}
		if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
			save_flag = false;
			alert("请选择生产工厂！");
			return false;
		}
		if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
			save_flag = false;
			alert("请选择车间！");
			return false;
		}
		if(undefined == line_name || line_name=='' ||line_name=='请选择'){
			save_flag = false;
			alert("请选择线别！");
			return false;
		}
		
		var trs=$("#tableResult tbody").find("tr");
		if(trs.length==0){
			addList=[];
			save_flag=false;
			alert("请选择模板导入数据后再保存！");
			return false;
		}
		$.each(trs,function(i,tr){
			var tds=$(tr).children("td");
			var error = $(tds).eq(27).html();
			if(error!=''){
				var item_no = $(tds).eq(0).html();
				save_flag=false;
				addList=[];
				alert("行号："+item_no+"错误信息："+error);
				return false;
			}
		});
		if(save_flag){
			$("#btnSave").attr("disabled",true);
			console.log(addList);
			ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList,header_id);
		}else{
			alert('数据有误，请修改后重新导入！');
		}
	});
	$('#btnBack').click(function(event) {
		self.location.reload(true);
	})

});


function fn_cb_getOrderInfo(order){
	$("#searchOrderInfo").html(order.name+" "+order.busType+order.orderQty + "台");
}

function ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList_d,header_id_d){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'savePMD',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(addList_d),
			"modifyList":JSON.stringify([]),
			"deleteList":JSON.stringify([]),
			"order_id":order_id,
			"factory_id":factory_id,
			"factory_name":factory_name,
			"workshop_name":workshop_name,
			"line_name":line_name,
			"header_id":header_id_d
		},
		success:function(response){
			$("#btnSave").removeAttr("disabled"); 
			$(".divLoading").hide();
            if(response.success){
            	$('#tableResult tbody').html("");
            	datalist=[];//表格数据对象
            	header_id = '0';
            	addList=[];
            	alert("导入成功！");
            	self.location.reload(true);
            }else{
            	datalist=[];//表格数据对象
            	header_id = '0';
            	addList=[];
            	alert("导入失败！");
            }
		}
	});
}