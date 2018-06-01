var pageSize=1;
var table;
var dt;
$(document).ready(function(){
	getKeysSelect("INTERNAL_BUS_TYPE", "车型内部名称", "#add_internalName","请选择","keyName");
	getKeysSelect("INTERNAL_BUS_TYPE", "车型内部名称", "#edit_internalName","请选择","keyName");
	
	ajaxQuery();

	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	$(document).on("click","#btnAdd",function(){
		
		var dialog = $( "#dialog_add" ).removeClass('hide').dialog({
			width:600,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 新增车型</h4></div>',
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
						ajaxAdd();
					} 
				}
			]
		});
	}); 
});

function ajaxQuery(){
	dt=$("#tableData").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 1,
            rightColumns:1
        },
        serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-140,
		scrollX: true,
		/*scrollCollapse: true,*/
		pageLength: 10,
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
				"busTypeCode":$("#search_busTypeCode").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getBusTypeList",
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
                }
            });
		
		},
		columns: [
            {"title":"车型编号","class":"center","data":"busTypeCode","defaultContent": ""},
            {"title":"车型内部名称(车系)","class":"center","data":"internalName","defaultContent": ""},
            {"title":"平台车型","class":"center","data":"busSeries","defaultContent": ""},
            //{"title":"编辑","class":"center","data":null,"defaultContent": "<i onclick = 'ajaxEdit(" + row.id+ ");' class=\"ace-icon fa fa-pencil bigger-130 editBusType\" style='color:green;cursor: pointer;'></i>"}
            {"title":"编辑","class":"center","data":null,"render":function(data,type,row){
            	return "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick = 'ajaxEdit(" + row.id+ ");' style='color:green;cursor: pointer;'></i>"},
            	"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130 editBusType\" style='color:green;cursor: pointer;'></i>"}
          ],
	});

}

function ajaxAdd (argument) {
	if($("#add_busTypeCode").val()===""){
		alert("车辆型号不能为空！");
		$("#add_busTypeCode").focus();
		return false;
	}
	if($("#add_internalName").val()===""){
		alert("车辆内部名称不能为空！");
		$("#add_internalName").focus();
		return false;
	}

    $.ajax({
		type: "post",
		dataType: "json",
		url: "/BMS/setting/addBusType",
	    data: {
			"busTypeCode":$("#add_busTypeCode").val(),
			"internalName":$("#add_internalName").val(),
			"bus_series":$("#add_bus_series").val()
		},
		async: false,
	    success:function (response) {
	    	
	    	if (response.success) {
	    		$( "#dialog_add" ).dialog( "close" ); 
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>保存成功！</h5>',
					class_name: 'gritter-info'
				});
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alert();}
	});
	
}

function ajaxEdit(id){

	//查询订单信息
	$.ajax({
		url: "/BMS/setting/getBusTypeById",
		dataType: "json",
		data: {"id" : id},
		async: false,
		error: function () {alert();},
		success: function (response) {			
			$('#editId').val(id);
			$('#edit_busTypeCode').val(response.data.busTypeCode);
			$('#edit_internalName').val(response.data.internalName);
			$('#edit_bus_series').val(response.data.busSeries);
			var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
				width:600,
				height:520,
				modal: true,
				title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>编辑车型</h4></div>",
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
							if($("#edit_busTypeCode").val()===""){
								alert("车辆型号不能为空！");
								$("#edit_busTypeCode").focus();
								return false;
							}
							if($("#edit_internalName").val()===""){
								alert("车系内部名称不能为空！");
								$("#edit_internalName").focus();
								return false;
							}

							$.ajax({
							    url: "updateBusType",
							    dataType: "json",
								type: "get",
							    data: {
							    	"id" : $("#editId").val(),
							    	"busTypeCode":$("#edit_busTypeCode").val(),
									"internalName":$("#edit_internalName").val(),
									"bus_series":$("#edit_bus_series").val()
				
							    },
							    success:function(response){
							    	if(response.success){
							    	$.gritter.add({
										title: '系统提示：',
										text: '<h5>编辑成功！</h5>',
										class_name: 'gritter-info'
									});
							    	ajaxQuery();
							    	}else{
							    		$.gritter.add({
											title: '系统提示：',
											text: '<h5>编辑失败！</h5><br>'+response.message,
											class_name: 'gritter-info'
										});
							    	}
							    }
							});
							$( this ).dialog( "close" );
						} 
					}
				]
			});
		}
	})
}
