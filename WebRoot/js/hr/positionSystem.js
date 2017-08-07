var pageSize=1;
var table;
var dt;
$(document).ready(function(){
	
	ajaxQuery();
	
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
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
	$("#btnDelete").on("click",function(){
		ajaxDelete();
	});
	$("#btn_upload").click (function () {
		$("#uploadMasterPlanForm").ajaxSubmit({
			url:"uploadPositionSystem",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				ajaxQuery();
				if(response.success){					
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}
			}			
		});
	});
	$(document).on("click",".edit",function(){
		var id=$(this).closest('tr').find('td').eq(0).find('input').eq(0).val();
		
		//查询订单信息
		$.ajax({
			url: "getPositionData",
			dataType: "json",
			data: {"id" : id},
			async: false,
			error: function () {alert();},
			success: function (response) {			
				$('#editId').val(id);
				$('#edit_job_no').val(response.data.job_no);
				$('#edit_job_name').val(response.data.job_name);
				$('#edit_basic_besponsibilit').val(response.data.basic_besponsibilit);
				$('#edit_requirements').val(response.data.requirements);
				$('#edit_skill_and_capability').val(response.data.skill_and_capability);
				$('#edit_required_train').val(response.data.required_train);
				var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
					width:600,
					height:520,
					modal: true,
					title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>编辑标准岗位库</h4></div>",
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
								if($("#edit_job_no").val()===""){
									alert("岗位编号不能为空！");
									$("#edit_job_no").focus();
									return false;
								}
								if($("#edit_job_name").val()===""){
									alert("岗位名称不能为空！");
									$("#edit_job_name").focus();
									return false;
								}	
								$.ajax({
								    url: "editPositionData",
								    dataType: "json",
									type: "post",
								    data: {
								    	"id" : $("#editId").val(),
								    	"job_no":$("#edit_job_no").val(),
										"job_name":$("#edit_job_name").val(),
										"basic_besponsibilit":$("#edit_basic_besponsibilit").val(),
										"requirements":$("#edit_requirements").val(),
										"skill_and_capability":$("#edit_skill_and_capability").val(),
										"required_train":$("#edit_required_train").val()
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
		
	});
});

function ajaxQuery(){
	dt=$("#tableData").DataTable({
		serverSide: true,
		
        paging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: document.documentElement.clientHeight-250 + 'px',
		scrollX: "100%",
		scrollCollapse: true,
		pageLength: 20,
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
				"job_no":$("#search_job_no").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getPositionList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.total;//返回数据全部记录
                    returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.rows;//返回的数据列表
                    callback(returnData);
                }
            });
		
		},
		columns: [
			{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","class":"center","data":"id","render": function ( data, type, row ) {
			    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
			},"defaultContent": ""},
            {"title":"岗位编号","class":"center","data":"job_no","defaultContent": ""},
            {"title":"岗位名称","class":"center","data":"job_name","defaultContent": ""},
            {"title":"基本职责","class":"center","data":"basic_besponsibilit","render": function ( data, type, row ) {
			    return data!='' ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : '';
			},"defaultContent": ""},
            {"title":"任职资格","class":"center","data":"requirements","render": function ( data, type, row ) {
			    return data!='' ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : '';
			},"defaultContent": ""},
            {"title":"具备技能","class":"center","data":"skill_and_capability","render": function ( data, type, row ) {
			    return data!='' ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : '';
			},"defaultContent": ""},	            
            {"title":"上岗所需培训","class":"center","data":"required_train","render": function ( data, type, row ) {
			    return data!='' ? '<div title=\''+data+'\'>'+data.substring(0,8)+'...</div>' : '';
			},"defaultContent": ""},	            		            
            {"title":"维护人","class":"center","data": "editor","defaultContent": ""},
            {"title":"维护时间","class":"center","data":"edit_date","defaultContent": ""},
            {"title":"编辑","class":"center","data":null,"render":function(data,type,row){
            	return "<i class=\"ace-icon fa fa-pencil bigger-130 edit\" style='color:green;cursor: pointer;'></i>"},
            	"defaultContent": "<i class=\"ace-icon fa fa-pencil bigger-130\" style='color:green;cursor: pointer;'></i>"}
          ],
	});

}

function ajaxAdd (argument) {

    $.ajax({
		type: "post",
		dataType: "json",
		url: "",
	    data: {
			
		},
		async: false,
	    success:function (response) {
	    	
	    	if (response.success) {
	    		$( "#dialog_add" ).dialog( "close" ); 
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alert();}
	});
	
}
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
			text: '<h5>请至少勾选一个要删除的岗位！</h5>',
			class_name: 'gritter-info'
		});
		return false;
	}
	$.ajax({
	    url: "deletePositionData",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ids" : ids.substring(0,ids.length-1)
	    },
	    success:function(response){
	    	if(response.success){
	    	$.gritter.add({
				title: '系统提示：',
				text: '<h5>删除岗位成功！</h5>',
				class_name: 'gritter-info'
			});
	    	
	    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除岗位失败！</h5><br>'+response.message,
					class_name: 'gritter-info'
				});
	    	}
	    }
	});
}

//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}
