/*var pageSize=1;
var table;
var cur_year="";*/
$(document).ready(function(){
	/*cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	$("#edit_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	getOrderNoSelect("#search_order_no","#orderId");
	getFactorySelect();
	getBusType();*/
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	});
	
	/*$("#btnAdd").on("click",function(){
		ajaxAdd();
	});*/
	
	$("#btnDelete").on("click",function(){
		ajaxDelete();
	});
	
	$(document).on("click","#btnAdd",function(){
		var dialog = $( "#dialog-add" ).removeClass('hide').dialog({
			width:600,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 新增车间</h4></div>',
			title_html: true,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {
						$( this ).dialog( "close" ); 
						$("#addForm")[0].reset();
					} 
				},
				{
					text: "确定",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						if($("#addWorkshopName").val()===""){
							alert("车间名称不能为空！");
							$("#addWorkshopName").focus();
							return false;
						}
						if($("#addWorkshopCode").val()===""){
							alert("车间代码不能为空！");
							$("#addWorkshopCode").focus();
							return false;
						}
						$.ajax({
						    url: "addWorkshop",
						    dataType: "json",
							type: "get",
						    data: {
						    	"workshop_name" : $("#addWorkshopName").val(),
						    	"workshop_code" : $("#addWorkshopCode").val(),
						    	"memo" : $("#addMemo").val(),
						    },
						    success:function(response){
						    	if(response.success){
						    	$.gritter.add({
									title: '系统提示：',
									text: '<h5>增加车间成功！</h5>',
									class_name: 'gritter-info'
								});
						    	$("#addForm")[0].reset();
						    	ajaxQuery();
						    	}else{
						    		$.gritter.add({
										title: '系统提示：',
										text: '<h5>增加车间失败！</h5><br>'+response.message,
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
	}); 
	
	$(document).on("click",".editfactory",function(){
		$('#editId').val($(this).closest('tr').find('td').eq(0).find('input').eq(0).val());
		$('#editWorkshopName').val($(this).closest('tr').find('td').eq(1).html());
		$('#editWorkshopCode').val($(this).closest('tr').find('td').eq(2).html());
		$('#editMemo').val($(this).closest('tr').find('td').eq(3).html());
		
		var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
			width:600,
			/*height:500,*/
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 编辑车间</h4></div>',
			title_html: true,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {
						$( this ).dialog( "close" ); 
						$("#editForm")[0].reset();
					} 
				},
				{
					text: "确定",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						if($("#editWorkshopName").val()===""){
							alert("车间名称不能为空！");
							$("#editWorkshopName").focus();
							return false;
						}
						if($("#editWorkshopCode").val()===""){
							alert("车间代码不能为空！");
							$("#editWorkshopCode").focus();
							return false;
						}
					$.ajax({
					    url: "updateWorkshop",
					    dataType: "json",
						type: "get",
					    data: {
					    	"id" : $("#editId").val(),
					    	"workshop_name" : $("#editWorkshopName").val(),
					    	"workshop_code" : $("#editWorkshopCode").val(),
					    	"memo" : $("#editMemo").val(),
					    },
					    success:function(response){
					    	if(response.success){
					    	$.gritter.add({
								title: '系统提示：',
								text: '<h5>编辑车间成功！</h5>',
								class_name: 'gritter-info'
							});
					    	$("#editForm")[0].reset();
					    	ajaxQuery();
					    	}else{
					    		$.gritter.add({
									title: '系统提示：',
									text: '<h5>编辑车间失败！</h5><br>'+response.message,
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
	}); 
	
	
});

function ajaxDelete(){
	var ids = '';
	$(":checkbox").each(function(){
		if($(this).prop("checked")){
			//alert($(this).attr('fid'));
			if($(this).attr('fid')){
				ids += $(this).attr('fid').split('_')[1] + ',';
			}
		}
	});
	if(ids===''){
		$.gritter.add({
			title: '系统提示：',
			text: '<h5>请至少勾选一个要删除的车间！</h5>',
			class_name: 'gritter-info'
		});
		return false;
	}
	$.ajax({
	    url: "deleteWorkshop",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ids" : ids.substring(0,ids.length-1)
	    },
	    success:function(response){
	    	if(response.success){
	    	$.gritter.add({
				title: '系统提示：',
				text: '<h5>删除车间成功！</h5>',
				class_name: 'gritter-info'
			});
	    	
	    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除车间失败！</h5><br>'+response.message,
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
}

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 0,
            rightColumns:0
        },
        paging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: document.documentElement.clientHeight-250 + 'px',
		scrollX: "100%",
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
				"workshopName":$("#search_workshop").val(),
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getWorkshopList",
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
		          	{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","class":"center","data":"id","render": function ( data, type, row ) {
	                    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
	                },"defaultContent": ""},
		            {"title":"车间名称","class":"center","data":"workshopName",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"车间代码","class":"center","data":"workshopCode","defaultContent": ""},
		            
		            {"title":"备注","class":"center","data": "memo","defaultContent": ""},
		            /*{"title":"工厂地址","class":"center","data":null,"defaultContent": ""},*/		            
		            {"title":"维护人","class":"center","data":"editor","defaultContent": ""},		            
		            {"title":"维护时间","class":"center","data": "editDate","defaultContent": ""},
		            /*{"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },*/
		            
		            {"title":"编辑","class":"center","data":null,"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130 editfactory\" style='color:green;cursor: pointer;'></i>"}
		          ],
		
		
	});

}
function setInput(value){
	var input="<input type='text' value='"+value+"' />";
	return input;
} 

//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}