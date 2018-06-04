var pageSize=1;
var table;
var dt;
var newList = [];
var addList=[];
var modifyList=[];
var deleteList = [];
var allPmdList = [];
var pmd_header_id="0";
var production_qty = 0;//订单工厂生产数量
var editTr = null;
var editTd = null;
var save_flag = false;
var save_type = 'modify';

$(document).ready(function(){
	getOrderNoSelect("#search_order_no","#orderId",fn_cb_getOrderInfo);
	getFactorySelect("zzj/changePMD",'',"#search_factory",null,'id');
	getWorkshopSelect("zzj/changePMD",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	//工厂切换
	$("#search_factory").on("change",function(){
		getWorkshopSelect("zzj/changePMD",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	}); 
	//车间切换
	$("#search_workshop").change(function(){
		getLineSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),'','#search_line',null,'id');
	});
	
	$("#btn_search").on("click",function(){
		ajaxQuery();
	}); 
	
	$(document).on("click",".close.edit",function(e){
		var tr=$(e.target).closest("tr");
		$(tr).remove();
	});
	$(document).on("click","#addPmdItem",function (argument) {
	//$("#addPmdItem").on("click",function (argument) {
		var length=$("#tableResult tbody tr").eq(0).find("td").length;
		if(length==1){
			$("#tableResult tbody").html("");
		}
		var tr=$("<tr dataType='new' />");
		$("<td class='center'/>").html('<button type="button" class="close pdmItems" aria-label="Close" style="float: none;"><span aria-hidden="true">×</span></button>').appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='sap_mat' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text'  style='width:100%;border: 0px;' data='zzj_type' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='mat_description' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text'  style='width:100%;border: 0px;' data='mat_type' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='specification' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='unit' value='PCS' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text'  style='width:100%;border: 0px;' data='loss' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='quantity' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='weight' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='weight_total' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='use_workshop' type='input' class='changeInputValue' onchange='changeInputValue(this)'  >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='use_line' value='全部' type='input' class='changeInputValue' onchange='changeInputValue(this)'  >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='process' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='assembly_position' type='input' class='changeInputValue' onchange='changeInputValue(this)'  >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='crafts_identification' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='filling_size' type='input' class='changeInputValue' onchange='changeInputValue(this)'  >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='accuracy_demand' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='surface_treatment' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='memo' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='crafts_memo' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='subcontracting_type' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='process_sequence' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='process_flow' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='team' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='change_escription' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input type='text' style='width:100%;border: 0px;' data='change_subject' type='input' class='changeInputValue' onchange='changeInputValue(this)' >").appendTo(tr);
		$("<td class='center'/>").html("<input style='width:100%;border: 0px;' data='change_type' type='input' class='changeInputValue' onchange='changeInputValue(this)'  >").appendTo(tr);
		$("<td class='center'/>").html("<a href='javascript:void(0);'  style='text-align:center;width:100%;' data='ecn_quantity'  onclick='edtitECN(this)'>变更范围</a>").appendTo(tr);
		var dataObj={"no":"","sap_mat":"","zzj_type":"","mat_description":"","mat_type":"","specification":"","unit":"","loss":"","quantity":"","weight":"","weight_total":"","use_workshop":"",
				"use_line":"","id":"","pmd_head_id":pmd_header_id,"process":"","assembly_position":"","crafts_identification":"",
				"filling_size":"","accuracy_demand":"","memo":"","crafts_memo":"","subcontracting_type":"","process_sequence":"","process_flow":"",
				"team":"","change_escription":"","surface_treatment":"","change_subject":"","change_type":"","change_from":"","ecn_quantity":"","operation_type":"新增"};
		newList.push(dataObj);
		$("#tableResult tbody").prepend(tr);
	});
	
	$("#editEcnQuantity").click( function (argument) {
		var last_end = 0;
		var edit_ecnQuantity_parameters=$("#edit_ecnQuantity_parameters").find("tr");
		$.each(edit_ecnQuantity_parameters,function(index,param){
			var tds=$(param).children("td");
			last_end   = Number($(tds[2]).find("input").val())+1;
		});
		var paramHtml="<tr><td><button type=\"button\" class=\"close edit\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		"<td><input type='text' style='width:60px'  class='input-small busNum' value='"+last_end+"' /></td>" +
		"<td><input type='text' style='width:60px;' class='input-small' value='"+production_qty+"' id='minbusnum'/></td>" +
		"<td><input type='text' style='width:60px;' class='input-small' value='"+$("#dialog_ecn_old_quantity").val()+"' id='maxbusnum'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#edit_ecnQuantity_parameters");
		return false;
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
	
	$("#btn_upload").click (function () {
		//判断是否存在已操作的数据提示用户保存
		if(save_flag&&(addList.length>0 || modifyList.length>0 || deleteList.length>0 || newList.length>0)) {
			//存在已操作的数据提示用户保存
			//触发保存按钮单击事件
			$('#btnSave').click();
		}
		
		save_flag=true;
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
		$("#btn_upload").attr("disabled",true);
		$(".divLoading").addClass("fade in").show();
		upload_in_progress = true;
		$("#uploadForm").ajaxSubmit({
			url:"uploadPMD",
			type: "post",
			dataType:"json",
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name
			},
			async: false,
			success:function(response){
				$("#btn_upload").removeAttr("disabled");  
				if(response.success){	
						save_type = 'upload';
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
				                		//数据格式错误 整行用红色字体标示
				                		save_flag=false;
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
		if(save_flag&&(addList.length>0 || modifyList.length>0 || deleteList.length>0 || newList.length>0)) {

			if(!confirm("存在已导入(新增、修改)的数据，确定保存?")){
				newList = [];
				addList=[];
				modifyList=[];
				deleteList = [];
				return false;
			}
			var alldata=$('#tableResult').dataTable().fnGetData();
			console.log(alldata);
			//判断订单、工厂、车间、线别是否为空
			var order_id = $("#search_order_no").attr("order_id")||'';
			var factory_id = $("#search_factory").val()||'';
			var factory_name = $("#search_factory").find("option:selected").text()||'';
			var workshop_name = $("#search_workshop").find("option:selected").text()||'';
			var line_name = $("#search_line").find("option:selected").text()||'';
			var mat_description = $("#search_mat_description").val()||'';
			var zzj_type = $("#search_zzj_type").val()||'';
			var use_workshop = $("#search_use_workshop").val()||'';
			
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
			//判断是何种数据保存类型：save_type  modify , upload
			if(save_type=='modify'&&save_flag){
				//修改需要校验
				for(var i=0;i<alldata.length;i++){
					var rowData = alldata[i];
					if(undefined !=rowData.changed && rowData.changed =='true'){
						//数据有改动
							if(undefined== rowData.ecn_quantity||rowData.ecn_quantity==''){
								alert("第"+(i+newList.length+1)+"行必须维护变更起始台数！");
								return false;
							}
							if(undefined!= rowData.ecn_quantity&&rowData.ecn_quantity!=''){
								var rowDataArr = rowData.ecn_quantity.split(",");
								var ecnChangeStr = rowDataArr[rowDataArr.length-1];
								if(Number(production_qty) != Number(ecnChangeStr.split("-")[1])){
									alert("第"+(i+newList.length+1)+"行变更结束号必须等于订单工厂生产数量值！");
									return false;
								}
							}
							if(rowData.operation_type=="修改"){
								//modifyList.push(rowData);
							}else if(rowData.operation_type=="新增"){
								addList.push(rowData);
							}
					}
				}
				for(var x=0;x<newList.length;x++){
					//校验数据完整性和准确性
					var newObj = newList[x];
					if(undefined ==newObj.zzj_type || ""==newObj.zzj_type){
						alert("第"+(x+1)+"行必须维护：自制件类别！");
						return false;
					}
					if(undefined ==newObj.mat_description || ""==newObj.mat_description){
						alert("第"+(x+1)+"行必须维护：物料描述！");
						return false;
					}
					if(undefined ==newObj.mat_type || ""==newObj.mat_type){
						alert("第"+(x+1)+"行必须维护：物料类型！");
						return false;
					}
					if(undefined ==newObj.specification || ""==newObj.specification){
						alert("第"+(x+1)+"行必须维护：材料/规格！");
						return false;
					}
					if(undefined ==newObj.quantity || ""==newObj.quantity){
						alert("第"+(x+1)+"行必须维护：单车用量！");
						return false;
					}
					if(undefined ==newObj.use_workshop || ""==newObj.use_workshop){
						alert("第"+(x+1)+"行必须维护：使用车间！");
						return false;
					}
					if(undefined ==newObj.assembly_position || ""==newObj.assembly_position){
						alert("第"+(x+1)+"行必须维护：装配位置！");
						return false;
					}
					if(undefined== newObj.ecn_quantity||newObj.ecn_quantity==''){
						alert("第"+(x+1)+"行必须维护变更起始台数！");
						return false;
					}
					if(undefined!= newObj.ecn_quantity&&newObj.ecn_quantity!=''){
						var rowDataArr = newObj.ecn_quantity.split(",");
						var ecnChangeStr = rowDataArr[rowDataArr.length-1];
						if(Number(production_qty) != Number(ecnChangeStr.split("-")[1])){
							alert("第"+(x+1)+"行变更结束号必须等于订单工厂生产数量值！");
							return false;
						}
					}
					addList.push(newObj);
				}
				
				$("#btnSave").attr("disabled",true);
				ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList,modifyList,deleteList,pmd_header_id);
				
			}
			
			if(save_flag&&save_type=='upload'){
				$("#btnSave").attr("disabled",true);
				addList = alldata;
				modifyList = [];
				deleteList = [];
				newList = [];
				ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList,modifyList,deleteList,pmd_header_id);
				ajaxQuery();
			}
			if(!save_flag){
				alert('数据存在错误信息，不允许保存！');
			}
		}else{
			alert('没有修改数据，无需保存！');
		}
	});
	
	// 数据删除
	$(document).on("click",".close.pdmItems",function(e){
        if (confirm("确定要删除该行数据？")) {  
            var myTable = $('#tableResult').DataTable();  
        	//得到编辑的数据行
            var tr = $(this).parents('tr');
            if(undefined !=$(tr).attr('dataType') && $(tr).attr('dataType') =='new'){
            	newList.splice($(tr).index(),1);
            	$(this).parents('tr').remove();
            }else{
            	var dataTable = $('#tableResult').dataTable();
            	var dataObj = dataTable.fnGetData($(tr));
            	if(dataObj.operation_type=='修改'){
            		//加入到删除的数组里
            		dataObj.operation_type = '删除';
            		deleteList.push(dataObj);
            	}
            	//myTable.row($(this).parents('tr')).remove().draw();	
            	$(this).parents('tr').remove();
            }
        }
		
	});
	
	$("#headChangeType").on("change",function(){
		var dataTable = $('#tableResult').dataTable();
		var changeType = $(this).val();
		var trs=$("#tableResult tbody").find("tr");
		$.each(trs,function(i,tr){
			var tds=$(tr).children("td");
			$(tds).eq(27).find("input").val(changeType);
			
			var dataObj = dataTable.fnGetData($(tr));
			dataObj['change_type'] = changeType;
		});
	}); 
	
	$("#headChangeFrom").on("change",function(){
		var dataTable = $('#tableResult').dataTable();
		
		var changeFrom = $(this).val();
		var trs=$("#tableResult tbody").find("tr");
		$.each(trs,function(i,tr){
			var tds=$(tr).children("td");
			$(tds).eq(28).find("input").val(changeFrom);
			
			var dataObj = dataTable.fnGetData($(tr));
			dataObj['change_from'] = changeFrom;
		});
	}); 
	
});

function ajaxQuery(){
	//判断是否存在已操作的数据提示用户保存
	if(save_flag&&(addList.length>0 || modifyList.length>0 || deleteList.length>0 || newList.length>0)) {
		//存在已操作的数据提示用户保存
		//触发保存按钮单击事件
		$('#btnSave').click();
	}
	
	save_flag=true;
	
	//判断订单、工厂、车间、线别是否为空
	var order_id = $("#search_order_no").attr("order_id")||'';
	var factory_id = $("#search_factory").val()||'';
	var factory_name = $("#search_factory").find("option:selected").text()||'';
	var workshop_name = $("#search_workshop").find("option:selected").text()||'';
	var line_name = $("#search_line").find("option:selected").text()||'';
	var mat_description = $("#search_mat_description").val()||'';
	var zzj_type = $("#search_zzj_type").val()||'';
	var use_workshop = $("#search_use_workshop").val()||'';
	
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
	if(save_flag){
		$(".divLoading").addClass("fade in").show();
		$.ajax({
			url:"changePDMSearch",
			type: "post",
			dataType:"json",
			data:{
				"order_id":order_id,
				"factory_id":factory_id,
				"factory_name":factory_name,
				"workshop_name":workshop_name,
				"line_name":line_name,
				"mat_description":mat_description,
				"zzj_type":zzj_type,
				"use_workshop":use_workshop
			},
			success:function(response){
				if(response.success && !$.isEmptyObject(response.data.result)){
					save_type="modify";
					deleteList = [];
					newList = [];
					addList =[];
					modifyList = [];
					allPmdList = response.data.allResult.pmdItems;
					production_qty = response.data.result.production_qty;
					pmd_header_id = response.data.result.pmdHead.id;
					if($.fn.dataTable.isDataTable("#tableResult")){
						$('#tableResult').DataTable().destroy();
						$('#tableResult').empty();
					}
					var datalist=response.data.result.pmdItems;
					
					var columns=[
					    {"title":"<i id='addPmdItem' class='fa fa-plus' style='cursor: pointer;color: blue;'>","class":"center","width":"45px","data":"","defaultContent": "","render":function(data,type,row){
			            	return '<button type="button" class="close pdmItems" aria-label="Close" style="float: none;"><span aria-hidden="true">×</span></button>';
			            }},
			            {"title":"SAP","class":"center","width":"90px","data":"sap_mat","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>自制件类别","class":"center","width":"100px","data":"zzj_type","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>物料描述","class":"center","width":"200px","data": "mat_description","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>物料类型","class":"center","width":"130px","data":"mat_type","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>材料/规格","class":"center","width":"145px","data": "specification","defaultContent": ""},
			            {"title":"单位","class":"center","width":"45px","data": "unit","defaultContent": ""},
			            {"title":"单车损耗%","class":"center","width":"75px","data": "loss","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>单车用量","class":"center","width":"70px","data": "quantity","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='quantity' type='input' class='changeInputValue' onchange='changeInputValue(this)'  value='"+data+"'>";
			            }},
			            {"title":"单重","class":"center","width":"70px","data": "weight","defaultContent": ""},
			            {"title":"总重(含损耗)","class":"center","data": "weight_total","width":"90px","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>使用车间","class":"center","width":"80px","data": "use_workshop","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='use_workshop' type='input' class='changeInputValue' onchange='changeInputValue(this)'   value='"+data+"'>";
			            }},
			            {"title":"<span style=\"color: red;\">*</span>使用线别","class":"center","width":"80px","data": "use_line","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='use_line' type='input' class='changeInputValue' onchange='changeInputValue(this)'  value='"+data+"'>";
			            }},
			            {"title":"工序","class":"center","width":"120px","data": "process","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>装配位置","class":"center","width":"100px","data": "assembly_position","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='assembly_position' type='input' class='changeInputValue' onchange='changeInputValue(this)'  value='"+data+"'>";
			            }},
			            {"title":"工艺标识","class":"center","width":"150px","data": "crafts_identification","defaultContent": ""},
			            {"title":"<span style=\"color: red;\">*</span>下料尺寸","class":"center","width":"120px","data": "filling_size","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='filling_size' type='input' class='changeInputValue' onchange='changeInputValue(this)'  value='"+data+"'>";
			            }},
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
			            {"title":"变更类型","class":"center","data": "change_type","width":"90px","defaultContent": "","render":function(data,type,row){
			            	return "<input style='width:100%;border: 0px;' data='change_type' type='input' class='changeInputValue' onchange='changeInputValue(this)'  value='"+(data==undefined?"":data)+"'>";
			            }},
			            {"title":"变更起始台数","class":"center","data": "ecn_quantity","width":"120px","defaultContent": "","render":function(data,type,row){
			            	if(undefined ==data||''==data){
			            		return "<a href='javascript:void(0);'  style='text-align:center;width:100%;' data='ecn_quantity'  onclick='edtitECN(this)'>变更范围</a>";
			            	}else{
			            		return "<a href='javascript:void(0);'  style='text-align:center;width:100%;' data='ecn_quantity'  onclick='edtitECN(this)'>"+data+"</a>";
			            	}
			            	
			            }},
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
						scrollX: true,
						scrollCollapse: false,
						lengthChange:false,
						orderMulti:false,
						info:false,
						language: {
							emptyTable:"抱歉，未查询到数据！",
							infoEmpty:""
						},
						aoColumnDefs : [
			                {
			                "aTargets" :[24],
			                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { 
			  /*              	if($(nTd).text()!=''){
			                		//数据格式错误 整行用红色字体标示
			                		$(nTd).parent().css('color', '#ff0000');
				                	$(nTd).css('color', '#ff0000').css('font-weight', 'bold').css('width','200px');
			                	}*/
			                }   
			                },
			            ],
						data:datalist,
						columns:columns
					});

				}else{
					alert("未导入下料明细信息！");
				}
				if(!response.success){
					//后台处理失败，提示错误消息
					alert(response.message);
				}
				var head_width=$(".dataTables_scrollHead").width();
                $(".dataTables_scrollHead").css("width",head_width-17);
				$(".divLoading").hide();
			}
		});
		
	}
	
}

//datatable行里面的input事件
function changeInputValue(input){
	$(input).css("border","1px solid red");
	//得到编辑的数据行
	var tr=$(input).parent("td").parent("tr");
	
	if(undefined !=$(tr).attr('dataType') && $(tr).attr('dataType') =='new'){
		//新增的行
		var myDataObj = newList[$(tr).index()];
		var cellName = $(input).attr('data');
		myDataObj[cellName] = $(input).val();
		//校验新增的数据是否与已导入数据重复
		for(var i =0;i<allPmdList.length;i++){
			var pmdIndex = allPmdList[i];
			if(myDataObj.zzj_type == pmdIndex.zzj_type && 
			   myDataObj.mat_description == pmdIndex.mat_description &&
			   myDataObj.assembly_position == pmdIndex.assembly_position){
				//重复
				alert('此零部件在系统已存在，不允许重复维护！');
				$(input).val("");
				myDataObj[cellName] = $(input).val();
				return;
			}
		}

	}else{
		//原有的数据行
		//得到编辑的数据对象名称
		var dataTable = $('#tableResult').dataTable();
		var cellName = $(input).attr('data');
		var dataObj = dataTable.fnGetData($(tr));
		modifyList.push(dataObj);
		console.log(dataObj);
		dataObj[cellName] = $(input).val();
		if(cellName=='quantity'){
			dataObj.changed = 'true';
		}
		console.log(dataObj);
	}

};
//datatable行里面的edtitECN事件
function edtitECN(span){
	$("#edit_ecnQuantity_parameters").html("");
	editTr = null;
	editTd = null;
	var dataObj = {};
	//得到编辑的数据行
	var tr=$(span).parent("td").parent("tr");
	if(undefined !=$(tr).attr('dataType') && $(tr).attr('dataType') =='new'){
		//新增的行
		dataObj = newList[$(tr).index()];
	}else{
		var dataTable = $('#tableResult').dataTable();
		var dataObj = dataTable.fnGetData($(tr));
	}
	dataObj.changed = 'true';
	editTr = tr;
	editTd = $(span).parent("td");
	//得到编辑行的单车用量
	var quantity=dataObj.quantity;
	$("#dialog_ecn_old_quantity").val(quantity);
	var ecn_changeStr = $(span).html().trim();
	if(ecn_changeStr!='变更范围'){
		//存在ecn_change(1-20-2,21-30-1)遍历生成表格行 
		var ecn_changeArr = ecn_changeStr.split(",");
		for(var j = 0,len = ecn_changeArr.length; j < len; j++){
		    console.log(ecn_changeArr[j]);
		    var arr = ecn_changeArr[j].split("-");
			var tr=$("<tr/>");
			var paramHtml="<td></td>" ;
			if(arr[0]==1||arr[0]=='1'){
				paramHtml =paramHtml+"<td><input type='text' style='width:60px' disabled='disabled' class='input-small' value='"+arr[0]+"' /></td>";
			}else{
				paramHtml = "<td><button type=\"button\" class=\"close edit\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>";
				paramHtml =paramHtml+"<td><input type='text' style='width:60px' class='input-small' value='"+arr[0]+"' /></td>";
			}
			paramHtml =paramHtml+"<td><input type='text' style='width:60px'  class='input-small' value='"+arr[1]+"' /></td>" +
			"<td><input type='text' style='width:60px'  class='input-small' value='"+arr[2]+"' /></td>";
			$(tr).html(paramHtml).appendTo("#edit_ecnQuantity_parameters");
		}
	}else{
		//不存在，直接生成一行表格数据
		var tr=$("<tr/>");
		var paramHtml="<td></td>" +
		"<td><input type='text' style='width:60px' disabled='disabled' class='input-small' value='1' /></td>" +
		"<td><input type='text' style='width:60px'  class='input-small' value='"+production_qty+"' /></td>" +
		"<td><input type='text' style='width:60px'  class='input-small' value='"+quantity+"' /></td>";
		$(tr).html(paramHtml).appendTo("#edit_ecnQuantity_parameters");
	}
	
	var dialog = $( "#dialog-ecn" ).removeClass('hide').dialog({
		width:350,
		height:450,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 变更起始台数</h4></div>",
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
					//$( this ).dialog( "close" );
					var rtnStr="";
					var arrStart = new Array();
					var arrEnd = new Array();
					var edit_ecnQuantity_parameters=$("#edit_ecnQuantity_parameters").find("tr");
					$.each(edit_ecnQuantity_parameters,function(index,param){
						var tds=$(param).children("td");
						arrStart[index] = Number($(tds[1]).find("input").val());
						arrEnd[index]   = Number($(tds[2]).find("input").val());
						rtnStr+=Number($(tds[1]).find("input").val())+'-'+Number($(tds[2]).find("input").val())+'-'+Number($(tds[3]).find("input").val())+",";
					});
					rtnStr = rtnStr.substr(0,rtnStr.length-1);
					for(var i=1;i<arrStart.length;i++){
						if((arrStart[i])!=arrEnd[i-1]+1){
							alert('流水不连续！');
							return false;
							break;
						}
						if(arrStart[i]>=arrEnd[i]){
							alert('开始台数号必须小于结束台数号！');
							return false;
						}
					}
					if(arrEnd[arrEnd.length-1]!=Number(production_qty)){
						alert('结束流水号必须等于订单工厂生产数量：'+production_qty);
						return false;
					}
					var dataObj  ={};
					if(undefined !=$(editTr).attr('dataType') && $(editTr).attr('dataType') =='new'){
						//新增的行
						dataObj = newList[$(editTr).index()];
					}else{
						var dataTable = $('#tableResult').dataTable();
						//得到编辑的数据行
						dataObj = dataTable.fnGetData($(editTr));
					}
				
					console.log(dataObj);
					dataObj.ecn_quantity = rtnStr;
					console.log(dataObj);
					$(editTd).html("<a href='javascript:void(0);'  style='text-align:center;width:100%;' data='ecn_quantity'  onclick='edtitECN(this)'>"+rtnStr+"</a>")
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
}

function fn_cb_getOrderInfo(order){
	$("#searchOrderInfo").html(order.name+" "+order.busType+order.orderQty + "台");
}

function ajaxSave(order_id,factory_id,factory_name,workshop_name,line_name,addList_d,modifyList_d,deleteList_d,header_id_d){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'savePMD',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(addList_d),
			"modifyList":JSON.stringify(modifyList_d),
			"deleteList":JSON.stringify(deleteList_d),
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
            	newList = [];
    			addList = [];
    			modifyList = [];
    			deleteList = [];
    			
            	//$('#tableResult tbody').html("");
            	$.gritter.add({
					title: 'Message：',
					text: "<h5>"+response.message+"</h5>",
					class_name: 'gritter-info'
				});
            	ajaxQuery();
            }else{
            	$.gritter.add({
					title: 'Message：',
					text: "<h5>"+response.message+"</h5>",
					class_name: 'gritter-info'
				});
            }
		}
	});
}