var pageSize=1;
var table;
var dt;

var datalist=[];//表格数据对象
var addList=[];
var modifyList=[];
var save_flag=true;

var upload_in_progress = false;

$(document).ready(function(){
	
	getFactorySelect("hr/importJobUnitPrice",'',"#search_factory","全部",'id');
	
	$('#file').ace_file_input({
		no_file:'请选择待导入文件(xlsx)...',
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
			url:"uploadJobUnitPrice",
			type: "post",
			dataType:"json",
			async: false,
			success:function(response){
				$("#btn_upload").removeAttr("disabled");  
				if(response.success){	
						//导入成功
						addList = response.data.addList;
						modifyList = response.data.modifyList;
						datalist=response.data.allList;
						//处理表格数据
						if($.fn.dataTable.isDataTable("#tableResult")){
							$('#tableResult').DataTable().destroy();
							$('#tableResult').empty();
						}
						var columns=[
				            {"title":"序号","class":"center","width":"50px","data":"no","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>工厂","class":"center","width":"120px","data":"factory_name","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>标准岗位","class":"center","data":"job","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>等待工时单价","class":"center","width":"100px","data": "unit_price","defaultContent": ""},
				            {"title":"<span style=\"color: red;\">*</span>生效日期","class":"center","width":"100px","data":"effective_date","defaultContent": ""},
				            {"title":"导入人","class":"center","data":"","defaultContent": ""},
				            {"title":"导入时间","class":"center","data":"","defaultContent": ""},
				            {"title":"消息","class":"center","data": "error","defaultContent": "","render":function(data,type,row){
				            	return data;
				            }}
				        ];
						$("#tableResult").DataTable({
							paiging:false,
							dom: 'Bfrtip',
							ordering:false,
							processing:true,
							searching: false,
							autoWidth:false,
							paginate:false,
							sScrollY: $(window).height()-115,
							scrollX: false,
							scrollCollapse: false,
							lengthChange:false,
							orderMulti:false,
							info:false,
							language: {
								emptyTable:"抱歉，未查询到数据！",
							},
							columnDefs: [
				                {
				                "targets" :[7],
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
				                	"targets":[7],
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
		
		var trs=$("#tableResult tbody").find("tr");
		if(trs.length==0){
			addList=[];
			modifyList=[];
			save_flag=false;
			alert("请选择模板导入数据后再保存！");
			return false;
		}
		$.each(trs,function(i,tr){
			var tds=$(tr).children("td");
			var error = $(tds).eq(7).html();
			if(error!=''){
				var item_no = $(tds).eq(0).html();
				save_flag=false;
				addList=[];
				modifyList=[];
				alert("行号："+item_no+"错误信息："+error);
				return false;
			}
		});
		if(save_flag){
			$("#btnSave").attr("disabled",true);
			console.log(addList);
			console.log(modifyList);
			ajaxSave(addList,modifyList);
		}else{
			alert('数据有误，请修改后重新导入！');
		}
	});
	$('#btnBack').click(function(event) {
		self.location.reload(true);
	})

});

function ajaxQuery(){
	var factory_name = $("#search_factory").find("option:selected").text()||'';
	var job = $("#search_job").val()||'';
	var effective_date = $("#search_effective_date").val()||'';
		$(".divLoading").addClass("fade in").show();
		$.ajax({
			url:"queryJobUnitPrice",
			type: "post",
			dataType:"json",
			data:{
				"factory_name":factory_name,
				"job":job,
				"effective_date":effective_date
			},
			success:function(response){
				var i=1;
				if(response.success && !$.isEmptyObject(response.data)){	
					if($.fn.dataTable.isDataTable("#tableResult")){
						$('#tableResult').DataTable().destroy();
						$('#tableResult').empty();
					}
					var datalist=response.data;
					var columns=[
					            {"title":"序号","class":"center","width":"50px","data":"","defaultContent": "","render":function(data,type,row){
					            	return i++;
					            }},
					            {"title":"工厂","class":"center","width":"120px","data":"factory_name","defaultContent": ""},
					            {"title":"标准岗位","class":"center","data":"job","defaultContent": ""},
					            {"title":"等待工时单价","class":"center","width":"100px","data": "unit_price","defaultContent": ""},
					            {"title":"生效日期","class":"center","width":"100px","data":"effective_date","defaultContent": ""},
					            {"title":"导入人","class":"center","data":"editor","defaultContent": ""},
					            {"title":"导入时间","class":"center","data":"edit_date","defaultContent": ""}
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
						sScrollY: $(window).height()-115,
						scrollX: true,
						scrollCollapse: false,
						lengthChange:false,
						orderMulti:false,
						info:false,
						language: {
							emptyTable:"抱歉，未查询到数据！",
							infoEmpty:""
						},
				        data:datalist,
						columns:columns
					});

				}else{
					alert("未查询到岗位单价信息！");
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

function ajaxSave(addList_d,modifyList_d){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'saveJobUnitPrice',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			"addList":JSON.stringify(addList_d),
			"modifyList":JSON.stringify(modifyList_d)
		},
		success:function(response){
			$("#btnSave").removeAttr("disabled"); 
			$(".divLoading").hide();
            if(response.success){
            	$('#tableResult tbody').html("");
            	datalist=[];//表格数据对象
            	addList=[];
            	modifyList = [];
            	alert("导入成功！");
            	self.location.reload(true);
            }else{
            	datalist=[];//表格数据对象
            	addList=[];
            	modifyList = [];
            	alert("导入失败！");
            }
		}
	});
}