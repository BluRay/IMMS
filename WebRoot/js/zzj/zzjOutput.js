var pageSize=1;
var table;
var dt;
var addList=[];
var save_flag=true;

var upload_in_progress = false;

$(document).ready(function(){
	getOrderNoSelect("#search_order_no","#orderId",fn_cb_getOrderInfo);
	getFactorySelect("zzj/importPMD",'',"#search_factory",null,'id');
	getWorkshopSelect("zzj/importPMD",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
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
		
	}); 
	
	$("#btn_upload").click (function () {
		//判断订单、工厂、车间、线别是否为空
		var order_id = $("#search_order_no").attr("order_id")||'';
		var factory_id = $("#search_factory").val()||'';
		var factory_name = $("#search_factory").find("option:selected").text()||'';
		var workshop_name = $("#search_workshop").find("option:selected").text()||'';
		var line_name = $("#search_line").find("option:selected").text()||'';
		if(undefined == order_id || order_id==''){
			alert("请选择订单！");
			return false;
		}
		if(undefined == factory_name || factory_name=='' ||factory_name=='请选择'){
			alert("请选择生产工厂！");
			return false;
		}
		if(undefined == workshop_name || workshop_name==''||workshop_name=='请选择'){
			alert("请选择车间！");
			return false;
		}
		if(undefined == line_name || line_name=='' ||line_name=='请选择'){
			alert("请选择线别！");
			return false;
		}
		
		var files = $("#file").data('ace_input_files');
		if( !files || files.length == 0 ) {
			alert("请选择需上传的模板文件！");
			return false;//no files selected
		}
/*		if($("#file").val()==''){
			alert("请选择模板文件！");
			return false;
		}*/
		$(".divLoading").addClass("fade in").show();
		upload_in_progress = true;
		$("#uploadForm").ajaxSubmit({
			url:"uploadOutput",
			type: "post",
			dataType:"json",
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name
			},
			success:function(response){
				save_flag=true;
				if(response.success){	
					if($.fn.dataTable.isDataTable("#tableResult")){
						$('#tableResult').DataTable().destroy();
						$('#tableResult').empty();
					}
					var datalist=response.data;
					addList = datalist;
					var columns=[
			            {"title":"序号","class":"center","width":"45px","data":"no","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>自制件类别","class":"center","width":"100px","data":"zzj_type","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>物料描述","class":"center","width":"200px","data": "mat_description","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>生产批次","class":"center","width":"130px","data":"batch","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>生产数量","class":"center","width":"145px","data": "quantity","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>生产日期","class":"center","width":"120px","data": "product_date","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>生产工序","class":"center","data": "process","defaultContent": ""},
			            {"title":"生产班组","class":"center","width":"150px","data": "team","defaultContent": ""},
			            {"title":"备注","class":"center","data": "memo","defaultContent": ""},
			            {"title":"消息","class":"center","data": "error","defaultContent": "","render":function(data,type,row){
			            	return data;
			            }}
			        ];
					$("#tableResult").DataTable({
						paiging:false,
						fixedColumns:   { //固定列，行有错位现象
				            leftColumns: 0,
				            rightColumns:0
				        },
						ordering:false,
						processing:true,
						searching: false,
						autoWidth:false,
						paginate:false,
						sScrollY: $(window).height()-140,
						scrollX: false,
						scrollCollapse: false,
						lengthChange:false,
						orderMulti:false,
						info:false,
						language: {
							
						},
						aoColumnDefs : [
			                {
			                "aTargets" :[9],
			                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { 
			                	if($(nTd).text()!=''){
			                		save_flag=false;
			                		//数据格式错误 整行用红色字体标示
			                		$(nTd).parent().css('color', '#ff0000');
				                	$(nTd).css('color', '#ff0000').css('font-weight', 'bold').css('width','200px');
			                	}
			                }   
			                },
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
			var error = $(tds).eq(9).html();
			if(error!=''){
				var item_no = $(tds).eq(0).html();
				save_flag=false;
				addList=[];
				alert(item_no+error);
				return false;
			}
		});
		if(save_flag){
			ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList);
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

function ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'saveOutput',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(addList),
			"order_id":order_id,
			"factory_id":factory_id,
			"factory_name":factory_name,
			"workshop_name":workshop_name,
			"line_name":line_name
		},
		success:function(response){
			$(".divLoading").hide();
            if(response.success){
            	//$('#tableResult tbody').html("");
            	alert("导入成功！");
            	self.location.reload(true);
            }else{
            	$.gritter.add({
					title: 'Message：',
					text: "<h5>导入失败！"+response.message+"</h5>",
					class_name: 'gritter-info'
				});
            }
		}
	});
}