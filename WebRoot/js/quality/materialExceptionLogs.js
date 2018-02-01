var pageSize=1;
var table;
var table_height = $(window).height()-160;
$(document).ready(function(){
	initPage();
	$("#breadcrumbs").resize(function() {
		ajaxQuery();
	});

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getBusType("#search_bustype");
		getOrderNoSelect("#search_orderno","#orderId");
		getOrderNoSelect("#new_orderNo","#orderId",setBusType);
		getOrderNoSelect("#edit_orderNo","#orderId");
		getFactorySelect("quality/materialExceptionLogs",'',"#search_factory","全部",'id');
		//getWorkshopSelect("quality/materialExceptionLogs",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		$('#new_bphoto,#new_fphoto,#edit_bphoto,#edit_fphoto').ace_file_input({
			no_file:'请选择要上传的文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			width:"300px",
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['pdf','PDF'],
		}).on('file.error.ace', function(event, info) {
			alert("请上传正确的文件!");
			return false;
	    });
		$('#file').ace_file_input({
			no_file:'请选择要上传的文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['xlsx','xls'],
		}).on('file.error.ace', function(event, info) {
			alert("请上传正确的文件!");
	    });
		ajaxQuery();
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	$('#search_factory').change(function(){ 
		//getWorkshopSelect("quality/materialExceptionLogs",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
		if($(this).val()!=''){
			getWorkshop($(this).val(),$("#search_workshop"));
		}
	});
	$('#new_factory').change(function(){ 
		//getWorkshopSelect("quality/materialExceptionLogs",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		if($(this).val()!=''){
			getWorkshop($(this).val(),$("#new_workshop"));
		}
	});
	$('#edit_factory').change(function(){ 
		//getWorkshopSelect("quality/materialExceptionLogs",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
		if($(this).val()!=''){
			getWorkshop($(this).val(),$("#edit_workshop"));
		}
	});
	
	
	$("#btnAdd").on('click', function(e) {
		getBusType("#new_bus_type");
		getFactorySelect("quality/materialExceptionLogs",'',"#new_factory","全部",'id');
		//getWorkshopSelect("quality/materialExceptionLogs",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
//		if($("#new_factory").val()!=''){
//			getWorkshop($(this).val(),$("#new_workshop"));
//		}
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加物料异常记录</h4></div>',
			title_html: true,
			width:800,
			height:600,
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "增加",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							btnNewConfirm();
						} 
					}
				]
		});
	});
	$("#btnImport").click(function(){
		if($.fn.dataTable.isDataTable("#importData")){
			$('#importData').DataTable().destroy();
			$('#importData').empty();
		}
		$("#importDiv").show();
		var dialog = $( "#dialog-import" ).removeClass('hide').dialog({
			width:1200,
			height:600,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>物料异常记录导入</h4></div>",
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
					text: "保存",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						var trs=$("#importData tbody").find("tr");
						if(trs.length==0){
							alert("没有可保存的数据");
							return false;
						}
						var save_flag=true;
						var addList=[];
						$.each(trs,function(i,tr){
							var tds=$(tr).children("td");
							var error=$(tds).eq(17).children().eq(0).text();
							if(error!=''){
								save_flag=false;
							}
							var data={};
							data.material = $(tds).eq(0).html();
							data.occur_date = $(tds).eq(1).html();
							data.factory = $(tds).eq(2).html();
							data.workshop = $(tds).eq(3).html();
							data.factory_id = $(tds).eq(17).children().eq(1).val();
							data.workshop_id = $(tds).eq(17).children().eq(2).val();
							data.order_id = $(tds).eq(17).children().eq(3).val();
							data.bus_type_id = $(tds).eq(17).children().eq(4).val();
							data.description = $(tds).eq(6).html();
							data.tmp_measures = $(tds).eq(7).html();
							data.fault_reason = $(tds).eq(8).html();
							data.imp_measure = $(tds).eq(9).html();
							data.bug_level = $(tds).eq(10).html();
							data.resp_unit = $(tds).eq(11).html();
							data.resp_person = $(tds).eq(12).html();
							data.verify_result = $(tds).eq(13).html();
							data.verifer = $(tds).eq(14).html();
							data.expc_finish_date = $(tds).eq(15).html();
							data.memo = $(tds).eq(16).html();
							addList.push(data);
						});
						if(save_flag){
							$.ajax({
								url:'saveMaterialExceptionLogsByBatch',
								method:'post',
								dataType:'json',
								async:false,
								data:{
									"addList":JSON.stringify(addList)
								},
								success:function(response){
						            if(response.success){
						            	$( "#dialog-import" ).dialog("close");
						            	$.gritter.add({
											title: '系统提示：',
											text: "<h5>保存成功</h5>",
											class_name: 'gritter-info'
										});
						            }else{
						            	$.gritter.add({
											title: '系统提示：',
											text: "<h5>保存失败</h5>",
											class_name: 'gritter-info'
										});
						            }
								}
							});
						}else{
							alert("导入数据存在异常,请修改后在导入");
						}
					} 
				}
			]
		});
	});
	$("#btn_upload").click (function () {
		if($("#file").val()==''){
			alert("请选择导入文件");
			return false;
		}
		$("#uploadForm").ajaxSubmit({
			url:"uploadMaterialExceptionLogs",
			type: "post",
			dataType:"json",
			success:function(response){
				if(response.success){	
					if($.fn.dataTable.isDataTable("#importData")){
						$('#importData').DataTable().destroy();
						$('#importData').empty();
					}
					var datalist=response.data;
					var columns=[
			            {"title":"物料名称","class":"center","data":"material","defaultContent": ""},
			            {"title":"发生日期","width":"80","class":"center","data":"occur_date","defaultContent": ""},
			            {"title":"发生工厂","width":"75","class":"center","data": "factory","defaultContent": ""},
			            {"title":"发生车间","width":"70","class":"center","data":"workshop","defaultContent": ""},
			            {"title":"订单编号","width":"80","class":"center","data":"order_no","defaultContent": ""},
			            {"title":"车型","width":"50","class":"center","data": "bus_type","defaultContent": ""},
			            {"title":"异常描述","class":"center","data":"description","defaultContent": ""},
			            {"title":"临时措施","class":"center","data":"tmp_measures","defaultContent": ""},
			            {"title":"原因分析","class":"center","data": "fault_reason","defaultContent": ""},
			            {"title":"改善措施","class":"center","data":"imp_measure","defaultContent": ""},
			            {"title":"严重等级","width":"70","class":"center","data":"bug_level","defaultContent": ""},
			            {"title":"责任单位","width":"80","class":"center","data": "resp_unit","defaultContent": ""},
			            {"title":"责任人","width":"70","class":"center","data":"resp_person","defaultContent": ""},
			            {"title":"验证结果","width":"70","class":"center","data":"verify_result","defaultContent": ""},
			            {"title":"验证人","width":"70","class":"center","data": "verifer","defaultContent": ""},
			            {"title":"计划完成日期","width":"100","class":"center","data":"expc_finish_date","defaultContent": ""},
			            {"title":"备注","class":"center","data": "memo","defaultContent": ""},
			            {"title":"数据校验结果","class":"center","data": "error","defaultContent": "","render":function(data,type,row){
			            	var error=(data!=undefined ? data : '');
			            	return "<label>"+error+"</label><input type='hidden' value='"+row.factory_id+"' class='factory_id'/>"+
			            	 "<input type='hidden' value='"+row.workshop_id+"' class='workshop_id'/>"+
			            	 "<input type='hidden' value='"+row.order_id+"' class='order_id'/>"+
                             "<input type='hidden' value='"+row.bus_type_id+"' class='bus_type_id'/>";
			               }
			            }
			        ];

					$("#importData").DataTable({
						paiging:false,
						ordering:false,
						fixedColumns:   {
				            leftColumns: 0,
				            rightColumns:1
				        },
						processing:true,
						searching: false,
						autoWidth:false,
						paginate:false,
						sScrollY: $(window).height()-300,
						scrollX: true,
						scrollCollapse: true,
						lengthChange:false,
						orderMulti:false,
						info:false,
						aoColumnDefs : [
		                    {
			                "aTargets" :[17],
			                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { 
			                	if($(nTd).children().eq(0).text()!=''){
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
				}
				//$(".divLoading").hide();
			},
			complete:function(){
				$(".remove").click();
			}				
		});
	});
});

function showExceptionLogs(id){
	clear();
	getBusType("#edit_bus_type");
	getFactorySelect("quality/materialExceptionLogs",'',"#edit_factory",null,'id');
	//getWorkshopSelect("quality/materialExceptionLogs",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	if($("#edit_factory").val()!=''){
		getWorkshop($("#edit_factory").val(),$("#edit_workshop"));
	}
	$.ajax({
		url: "showMaterialExceptionLogs",
		dataType: "json",
		data: {"id":id},
		async: false,
		error: function () {},
		success: function (response) {
			$("#edit_factory option[value='"+response.data.factroy_id+"']").attr("selected",true);
			$("#edit_bus_type option[value='"+response.data.bus_type_id+"']").attr("selected",true);
			$("#edit_material").val(response.data.material);
			$("#edit_orderNo").val(response.data.order_no);
			$("#edit_occurDate").val(response.data.occur_date);
			$("#edit_description").val(response.data.description);
			$("#edit_tmpMeasures").val(response.data.tmp_measures);
			$("#edit_faultReason").val(response.data.fault_reason);
			$("#edit_impMeasures").val(response.data.imp_measure);
			$("#edit_expcFinishDate").val(response.data.expc_finish_date);
			$("#edit_respUnit").val(response.data.resp_unit);
			$("#edit_respPerson").val(response.data.resp_person);
			$("#edit_factory").val(response.data.factory_id);
			//$("#edit_workshop option[value='"+response.data.workshop_id+"']").attr("selected",true);
			$("#edit_workshop").find("option:contains('"+response.data.workshop+"')").attr("selected",true);
			$("#edit_verifier").val(response.data.verifier);
			$("#edit_verifyResult option[value='"+response.data.verify_result+"']").attr("selected",true);
			$("#edit_bugLevel option[value='"+response.data.verify_result+"']").attr("selected",true);
			$("#edit_memo").val(response.data.memo);
			if(response.data.bphoto != null){
				$('#bphoto').show();
				$('#bphoto').attr('href',response.data.bphoto); 
				$('#edit_bphoto').hide();
			}else{
				$('#bphoto').hide();
			}
			if(response.data.fphoto != null){
				$('#fphoto').show();
				$('#fphoto').attr('href',response.data.fphoto); 
				$('#edit_fphoto').hide();
			}else{
				$('#fphoto').hide();
			}
			
			$(".div-dialog input").prop("disabled",true);  
		    $(".div-dialog select").prop("disabled",true);  
		    $(".div-dialog textarea").prop("disabled",true);
			$("#dialog-edit").removeClass('hide').dialog({
				resizable: false,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 查看物料异常记录</h4></div>',
				title_html: true,
				width:800,
				height:600,
				modal: true,
				buttons: [{
							text: "关闭",
							"class" : "btn btn-minier",
							click: function() {$( this ).dialog( "close" );} 
						}
					]
			});
			
		}
	})
}

function editExceptionLogs(id){
	getBusType("#edit_bus_type");
	getFactorySelect("quality/materialExceptionLogs",'',"#edit_factory",null,'id');
	//getWorkshopSelect("quality/materialExceptionLogs",$("#edit_factory :selected").text(),"","#edit_workshop",null,"id");
	if($("#edit_factory").val()!=''){
		getWorkshop($("#edit_factory").val(),$("#edit_workshop"));
	}
	$(".div-dialog input").prop("disabled",false);  
    $(".div-dialog select").prop("disabled",false); 
    $(".div-dialog textarea").prop("disabled",false); 
	$.ajax({
		url: "showMaterialExceptionLogs",
		dataType: "json",
		data: {"id":id},
		async: false,
		error: function () {alert("查询异常");},
		success: function (response) {
			$("#edit_factory option[value='"+response.data.factroy_id+"']").attr("selected",true);
			$("#edit_bus_type option[value='"+response.data.bus_type_id+"']").attr("selected",true);
			$("#edit_material").val(response.data.material);
			$("#edit_orderNo").val(response.data.order_no);
			$("#edit_occurDate").val(response.data.occur_date);
			$("#edit_description").val(response.data.description);
			$("#edit_tmpMeasures").val(response.data.tmp_measures);
			$("#edit_faultReason").val(response.data.fault_reason);
			$("#edit_impMeasures").val(response.data.imp_measure);
			$("#edit_expcFinishDate").val(response.data.expc_finish_date);
			$("#edit_respUnit").val(response.data.resp_unit);
			$("#edit_respPerson").val(response.data.resp_person);
			$("#edit_factory").val(response.data.factory_id);
			//$("#edit_workshop option[value='"+response.data.workshop_id+"']").attr("selected",true);
			$("#edit_workshop").find("option:contains('"+response.data.workshop+"')").attr("selected",true);
			$("#edit_verifier").val(response.data.verifier);
			$("#edit_verifyResult option[value='"+response.data.verify_result+"']").attr("selected",true);
			$("#edit_memo").val(response.data.memo);
			if(response.data.bphoto != null){
				$('#edit_bphoto').show();
				$('#bphoto').show();
				$('#bphoto').attr('href',response.data.bphoto); 
			}else{
				$('#bphoto').hide();
			}
			if(response.data.fphoto != null){
				$('#edit_fphoto').show();
				$('#fphoto').show();
				$('#fphoto').attr('href',response.data.fphoto); 
			}else{
				$('#fphoto').hide();
			}
			$("#dialog-edit").removeClass('hide').dialog({
				resizable: false,
				title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 编辑制程异常</h4></div>',
				title_html: true,
				width:800,
				height:600,
				modal: true,
				buttons: [{
							text: "关闭",
							"class" : "btn btn-minier",
							click: function() {
								clear();
								$( this ).dialog( "close" );} 
						},{
							text: "保存",
							id:"btn_ok",
							"class" : "btn btn-success btn-minier",
							click: function() {
								btnEditConfirm(id);
							} 
						}
					]
			});
			
		}
	})
}

function btnEditConfirm(id){
	if($("#edit_occurDate").val()==''){
		alert("请输入发生日期！");
		$("#edit_occurDate").focus();
		return false;
	}
	if($("#edit_material").val()==''){
		alert("请输入物料名称！");
		$("#edit_material").focus();
		return false;
	}
	if($("#edit_orderNo").val()==''){
		alert("请输入订单编号！");
		$("#edit_orderNo").focus();
		return false;
	}
	if($("#edit_description").val()==''){
		alert("请输入问题描述！");
		$("#edit_description").focus();
		return false;
	}
	//console.log("-->id = "+ id);
	$('#form_edit').ajaxSubmit({
		url: "editMaterialExceptionLogs",
		dataType : "json",
		type : "post",
	    data: {
	    	"id":id,
	    	"occurDate" : $("#edit_occurDate").val(),
	    	"bus_type" : $("#edit_bus_type").val(),
			"factory_id":$("#edit_factory").val(),
			"factory":$("#edit_factory :selected").text(),
			"material" : $("#edit_material").val(),
			"orderNo" : $("#edit_orderNo").val(),
			"description" : $("#edit_description").val(),
			"tmpMeasures" : $("#edit_tmpMeasures").val(),
			"faultReason" : $("#edit_faultReason").val(),
			"impMeasures" : $("#edit_impMeasures").val(),
			"workshop_id" : $('#edit_workshop').val(),
			"workshop" : $('#edit_workshop :selected').text(),
			"bugLevel" : $("#edit_bugLevel").val(),
			"expcFinishDate" : $("#edit_expcFinishDate").val(),
			"respUnit" : $("#edit_respUnit").val(),
			"respPerson" : $("#edit_respPerson").val(),
			"verifier" : $("#edit_verifier").val(),
			"verifyResult" : $("#edit_verifyResult").val(),
			"memo" : $("#edit_memo").val()
	    },
		async: false,
	    success:function (response) {
	    	if (response.success) {
	    		clear();
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>编辑成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-edit" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>编辑失败！</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alert("编辑异常");}
	});
	
}

function btnNewConfirm(){
	if($("#new_occurDate").val()==''){
		alert("请输入发生日期！");
		$("#new_occurDate").focus();
		return false;
	}
	if($("#new_material").val()==''){
		alert("请输入物料名称！");
		$("#new_material").focus();
		return false;
	}
	if($("#new_orderNo").val()==''){
		alert("请输入订单编号！");
		$("#new_orderNo").focus();
		return false;
	}
	if($("#new_description").val()==''){
		alert("请输入问题描述！");
		$("#new_description").focus();
		return false;
	}
	$('#form_add').ajaxSubmit({
		url: "addMaterialExceptionLogs",
		dataType : "json",
		type : "post",
	    data: {
	    	"occurDate" : $("#new_occurDate").val(),
	    	"bus_type" : $("#new_bus_type").val(),
			"factory_id":$("#new_factory").val(),
			"factory":$("#new_factory :selected").text(),
			"material" : $("#new_material").val(),
			"orderNo" : $("#new_orderNo").val(),
			"description" : $("#new_description").val(),
			"bphoto" : $("#new_bphoto").val(),
			"fphoto" : $("#new_fphoto").val(),
			"tmpMeasures" : $("#new_tmpMeasures").val(),
			"faultReason" : $("#new_faultReason").val(),
			"impMeasures" : $("#new_impMeasures").val(),
			"workshop_id" : $('#new_workshop').val(),
			"workshop" : $('#new_workshop :selected').text(),
			"bugLevel" : $("#new_bugLevel").val(),
			"expcFinishDate" : $("#new_expcFinishDate").val(),
			"respUnit" : $("#new_respUnit").val(),
			"respPerson" : $("#new_respPerson").val(),
			"verifier" : $("#new_verifier").val(),
			"verifyResult" : $("#new_verifyResult").val(),
			"memo" : $("#new_memo").val()
	    },
		async: false,
	    success:function (response) {
	    	if (response.success) {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增成功！</h5>',
					class_name: 'gritter-info'
				});
	    		$( "#dialog-add" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>新增失败！</h5>',
					class_name: 'gritter-info'
				});
	    	}
	    },
	    error:function(){alert("新增异常");}
	});
	
}

function setBusType(order){
	//alert(order.busType);
	$("#new_bus_type").find("option:contains('"+order.busType+"')").attr("selected",true);
	//$("#edit_bus_type").find("option:contains('"+order.busType+"')").attr("selected",true);
    //$("#new_bus_type").val('3');
   // $("#edit_bus_type").val(order.busType);
}

function getBusType(element){
	$(element).empty();
	//$("#new_bus_type").empty();
	//$("#edit_bus_type").empty();
	$.ajax({
		url: "../common/getBusType",
		dataType: "json",
		data: {},
		async: false,
		error: function () {},
		success: function (response) {
			var strs = "";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.id + ">" + value.name + "</option>";
		    });
		    if(element=="#search_bustype"){
		    	$("#search_bustype").append("<option value=''>全部</option>" + strs);
		    }else{
		    	 $(element).append(strs);
		    }
		   
		    //$("#search_bustype").append("<option value=''>全部</option>" + strs);
		    //$("#new_bus_type").append(strs);
		    //$("#edit_bus_type").append(strs);
		    //$("#search_bustype").append(strs);
		}
	})
}
function ajaxQuery(){
	var bugLevel = [];
	$('input[name="search_bugLevel"]:checked').each(function() {
		bugLevel.push($(this).val());
	});
	bugLevel=bugLevel.join(",");
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"orderColumn":"id",
				"factory" : $("#search_factory :selected").text(),
				"workshop" : $("#search_workshop :selected").text(),
				"bustypeId" : $("#search_bustype").val(),
				"material" : $("#search_material").val(),
				"orderNo" : $("#search_orderno").val(),
				"occurDateStart" : $("#search_date_start").val(),
				"occurDateEnd" : $("#search_date_end").val(),
				"bugLevel" : bugLevel
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getMaterialExceptionLogsList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		},
		columns: [
		            {"title":"工厂",width:'80',"class":"center","data":"factory","defaultContent": ""},
		            {"title":"车间",width:'75',"class":"center","data":"workshop","defaultContent": ""},
		            {"title":"车型",width:'80',"class":"center","data":"bus_type_code","defaultContent": ""},
		            {"title":"订单",width:'100',"class":"center","data":"order_name","defaultContent": ""},
		            {"title":"物料名称",width:'80',"class":"center","data":"material","defaultContent": ""},
		            {"title":"缺陷等级",width:'70',"class":"center","data":"bug_level","defaultContent": ""},
		            {"title":"责任单位",width:'80',"class":"center","data":"resp_unit","defaultContent": ""},
		            {"title":"责任人",width:'80',"class":"center","data":"resp_person","defaultContent": ""},
//		            {"title":"预计完成时间",width:'100',"class":"center","data":"expc_finish_date","defaultContent": ""},
//		            {"title":"验证结果",width:'80',"class":"center","data":"verify_result","defaultContent": ""},
//		            {"title":"验证人",width:'60',"class":"center","data":"verifier","defaultContent": ""},
		            {"title":"发生日期",width:'120',"class":"center","data":"occur_date","defaultContent": ""},
		            {"title":"录入人",width:'120',"class":"center","data":"username","defaultContent": ""},
		            {"title":"录入日期",width:'120',"class":"center","data":"creat_date","defaultContent": ""},
		            {"title":"操作",width:'80',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title=\"查看\" onclick='showExceptionLogs(" 
		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>" + 
		            		"&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editExceptionLogs(" 
		            		+ row['id'] + ")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
}
function getWorkshop(factory_id,element){
	$.ajax({
		url: "getWorkshopByFactoryId",
		dataType: "json",
		data: {"factory_id":factory_id},
		async: false,
		error: function () {},
		success: function (response) {
			$(element).empty();
			var strs = "<option value=''>全部</option>";
		    $.each(response.data, function(index, value) {
                strs += "<option value=" + value.id + ">" + value.name + "</option>";
		    });
		    $(element).append(strs);
		}
	});
}
function clear(){ 
	$(".ace-file-name").attr("data-title","");
	$("#edit_material").val("");
	$("#edit_orderNo").val("");
	$("#edit_occurDate").val("");
	$("#edit_description").val("");
	$("#edit_tmpMeasures").val("");
	$("#edit_faultReason").val("");
	$("#edit_impMeasures").val("");
	$("#edit_expcFinishDate").val("");
	$("#edit_respUnit").val("");
	$("#edit_respPerson").val("");
	$("#edit_verifier").val("");
	$("#edit_memo").val("");
    $('#edit_bphoto').val("");
    $('#edit_fphoto').val("");
}