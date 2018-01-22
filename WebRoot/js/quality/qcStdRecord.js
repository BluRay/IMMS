
$(document).ready(function(){
	getBusNumberSelect('#nav-search-input');
	initPage();
	function initPage(){
		$("#addForm")[0].reset()
		ajaxQuery();
		getFactorySelect("quality/qcStdRecord",'',"#multiple_factory",null,'name');
		getBusTypeSelect("","#search_bustype","全部","name");
		getBusTypeSelect("","#bus_type",null,"name");
		getOrderNoSelect("#order_no","#orderId");
		getOrderNoSelect("#search_order","#orderId");
		getWorkshop();
		getBusNumberSelect('#busnumber_submit');
		var now = new Date(); //当前日期
		$("#confirm_date_submit").val(formatDate(now));
	}
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	$('#factory').change(function(){ 
		getWorkshopSelect("quality/qcStdRecord",$("#factory :selected").text(),"","#workshop",null,"id");
	});
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	});
	$("#scope_show").focus(function(){
		$(this).hide();
		var val=$(this).val();
		$("#multiple_factory_show").siblings().find('.ms-choice').children('span').text(val);
		$("#multiple_factory_show").siblings().find('.ms-choice').show();
	});
//	$("#multiple_factory_show").siblings().find('.ms-choice').children('span').on("change",function(){
//		alert($(this).text());
//		$("#scope_show").val($("#multiple_factory_show").siblings().find('.ms-choice').children('span').text());
//	}); 
	
	$(document).on("click","#btnAdd",function(){
		$("#afile").val("");
    	$("#recordNo").val("");
    	$("#stdFileName").val("");
    	$("#usynopsis").val("");
    	$("#bfile").val("");
    	$("#memo").val("");
    	$("#bus_type").multipleSelect({
	        selectAll: true
	    });
    	$("#multiple_factory").multipleSelect({
	        selectAll: true
	    });
		var dialog = $( "#dialog-add" ).removeClass('hide').dialog({
			width:650,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 品质标准更新记录新增</h4></div>',
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
						if($("#recordNo").val()===""){
							alert("记录编号不能为空！");
							$("#recordNo").focus();
							return false;
						}
						
						if($("#stdFileName").val()===""){
							alert("标准文件名称不能为空！");
							$("#stdFileName").focus();
							return false;
						}
						if($("#usynopsis").val()===""){
							alert("更新摘要内容不能为空！");
							$("#usynopsis").focus();
							return false;
						}
						if($("#afile").val()===""){
							alert("请选择更替后附件！");
							$("#afile").focus();
							return false;
						}
						
						$("#addForm").submit();
						$( this ).dialog( "close" ); 
					} 
				}
			]
		});
		return false;
	}); 
});

function ajaxQuery(){

	$("#tableData").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 0,
            rightColumns:0
        },
        paging:true,
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
				"recordno":$("#search_recordno").val(),
				"bustype":$("#search_bustype").val(),
				"workshop":$("#search_workshop").val(),
				"orderno":$("#search_order").val(),
				"usynopsis":$("#search_usynopsis").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "showRecordList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	
                    console.log(result);
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
            {"title":"记录编号","class":"center","data":"record_num","defaultContent": ""},
            {"title":"适用车型","class":"center","data":"bus_type","defaultContent": ""},
            {"title":"适用订单","class":"center","data":"order_id","defaultContent": "","render":function(data, type, row){
            	var html=""
                	data=data.replace(/'/g,"&apos;").replace(/\r/ig, "&nbsp;").replace(/\n/ig, "&nbsp;");
            	if(data.length>9){
            		html="<i title='"+data+"' style='font-style: normal'>"+data.substring(1,9)+"...</i>"
            	}else{
            		html=data;
            	}
            	return html;
            }},
            {"title":"适用车间","class":"center","data":"workshop","defaultContent": ""},
            {"title":"更新内容摘要","class":"center","data":"usynopsis","defaultContent": "","render":function(data, type, row){
            	var html=""
            	data=data.replace(/'/g,"&apos;").replace(/\r/ig, "&nbsp;").replace(/\n/ig, "&nbsp;");
        	if(data.length>15){
        		html="<i title='"+data+"' style='font-style: normal'>"+data.substring(1,10)+"...</i>"
        	}else{
        		html=data;
        	}
        	return html;
        	}},
            {"title":"发布范围","class":"center","data":"scope","defaultContent": "","render":function(data, type, row){
            	var result="";
            	if(data!=undefined && data!=''){
            		var dataArr=data.split(",");
                	var implement_factory=row.implement_factory;
                	for(var i=0;i<dataArr.length;i++){
                		if(implement_factory!=undefined && implement_factory.indexOf(dataArr[i])>=0){
                			result+=dataArr[i]+";";
                		}else{
                			if((i+1)%2==0){
                				result+= "<a style='cursor:pointer' onclick=openDialogEdit(\'"+$.trim(dataArr[i])+"\',\'"+row.id+"\')>"+dataArr[i]+"</a>"+";<br>";
                			}else{
                				result+="<a style='cursor:pointer' onclick=openDialogEdit(\'"+$.trim(dataArr[i])+"\',\'"+row.id+"\')>"+dataArr[i]+"</a>"+";";
                			}
                			
                		}
                	}
                	result=result.substring(0,result.length-1);
            	}   	
            	return result;
            }},  
            {"title":"发布人","class":"center","data":"editor","defaultContent": ""}, 
            {"title":"发布日期","class":"center","data": "creat_date","defaultContent": "","render":function(data, type, row){
            	var html=""
            	if(data.length>10){
            		html=data.substring(0,10);
            	}
            	return html;
            	}},
            {"title":"工厂反馈进度","class":"center","data":"implement_factory","defaultContent": "","render":function(data, type, row){
            	var result="";
            	if(data!='' && data!=undefined){
            		var dataArr=data.split(",");
                	for(var i=0;i<dataArr.length;i++){
            			if((i+1)%2==0){
            				result+= "<a style='cursor:pointer' onclick=openDialogDisplay(\'"+$.trim(dataArr[i])+"\',\'"+row.id+"\')>"+dataArr[i]+"</a>"+";<br>";
            			}else{
            				result+="<a style='cursor:pointer' onclick=openDialogDisplay(\'"+$.trim(dataArr[i])+"\',\'"+row.id+"\')>"+dataArr[i]+"</a>"+";";
            			}
                	}
                	result=result.substring(0,result.length-1);
            	}
            	return result;
            }},  
            {"title":"","class":"center","data":null,"defaultContent":"","render":function(data, type, row){ 
            	return "<i class=\"glyphicon glyphicon-search bigger-130 show\" onclick='show(" 
		            		+ row['id']+ ")' style='color:green;cursor: pointer;'></i>" 
		            	},
		            },
            {"title":"","class":"center","data":null,"defaultContent":"","render":function(data, type, row){ 
            	return "<i class=\"ace-icon fa fa-pencil bigger-130\" title=\"编辑\" onclick='edit(" 
		            		+ row['id'] + ")' style='color:green;cursor: pointer;'></i>"
		            	},
		            }
          ],
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
function getWorkshop(){
	$(".workshop").empty();
	$.ajax({
		url: "../setting/getWorkshopList",
		dataType: "json",
		data: {},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			var strs = "";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.workshopName + ">" + value.workshopName + "</option>";
		    });
		    $(".workshop").append("<option value=''>全部</option>" + strs);
		}
	})
}
function openDialogEdit(factory,id){
	$('#implement_factory_submit').val("");
	$("#busnumber_submit").val("");
	$("#confirmor_submit").val("");
	$("#confirm_date_submit").val("");
	$("#edit_info_tr").hide();
	$('#busnumber_submit').removeAttr("readonly");
	$('#confirmor_submit').removeAttr("readonly");
	$('#confirm_date_submit').removeAttr("readonly");
	$.ajax({
		url:"showStdRecord",
		type: "post",
		data:{
			"id":id,
			"implement_factory":factory
		},
		dataType:"json",
		success:function(response){
			$('#recordno_submit').val(response.stdRecord.record_num);
			$('#bustype_submit').val(response.stdRecord.bus_type);
			$('#afile_path').attr("href",val+response.stdRecord.afile_path);
			$('#usynopsis_submit').val(response.stdRecord.usynopsis);
			$('#order_submit').val(response.stdRecord.order_id);
			$('#workshop_submit').val(response.stdRecord.workshop);
			$('#scope_submit').val(response.stdRecord.scope);
			$('#before_desc_submit').val(response.stdRecord.before_desc);
			$('#after_desc_submit').val(response.stdRecord.after_desc);
			$('#implement_factory_submit').val(factory);
			if(response.stdRecord.implement_bus_number!=''){
				$("#busnumber_submit").val(response.stdRecord.implement_bus_number);
			}
			if(response.stdRecord.confirmor!=''){
			    $("#confirmor_submit").val(response.stdRecord.confirmor);
			}
			if(response.stdRecord.confirm_date!=''){
			    $("#confirm_date_submit").val(response.stdRecord.confirm_date);
			}
			$("#id_submit").val(response.stdRecord.implement_info_id);
			
			var val=$('#urlPath').val();
			if(response.stdRecord.bfile_path!=null){
				$('#bfile_path_submit').text("查看");
				$('#bfile_path_submit').attr("href",val+response.stdRecord.bfile_path);
			}else{
				$('#bfile_path_submit').text("");
			}
			$('#afile_path_submit').attr("href",val+response.stdRecord.afile_path);
		}
	})
	var dialog = $( "#dialog-factory" ).removeClass('hide').dialog({
		width:660,
		height:600,
		modal: true,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 工厂反馈编辑</h4></div>',
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
				"class" : "confirm btn btn-primary btn-minier",
				click: function() {
			        update(id);
				} 
			}
		]
	});
}
function openDialogDisplay(factory,id){
	$('#implement_factory_submit').val("");
	$("#busnumber_submit").val("");
	$("#confirmor_submit").val("");
	$("#confirm_date_submit").val("");
	$("#edit_info_tr").show();
	$('#busnumber_submit').attr("readonly",true);
	$('#confirmor_submit').attr("readonly",true);
	$('#confirm_date_submit').attr("readonly",true);
	$.ajax({
		url:"showStdRecord",
		type: "post",
		data:{
			"id":id,
			"implement_factory":factory
		},
		dataType:"json",
		success:function(response){
			$('#recordno_submit').val(response.stdRecord.record_num);
			$('#bustype_submit').val(response.stdRecord.bus_type);
			$('#afile_path').attr("href",val+response.stdRecord.afile_path);
			$('#usynopsis_submit').val(response.stdRecord.usynopsis);
			$('#order_submit').val(response.stdRecord.order_id);
			$('#workshop_submit').val(response.stdRecord.workshop);
			$('#scope_submit').val(response.stdRecord.scope);
			$('#before_desc_submit').val(response.stdRecord.before_desc);
			$('#after_desc_submit').val(response.stdRecord.after_desc);
			$('#editor_submit').val(response.stdRecord.implement_editor);
			$('#edit_date_submit').val(response.stdRecord.implement_edit_date);
			$('#implement_factory_submit').val(factory);
			var val=$('#urlPath').val();
			if(response.stdRecord.bfile_path!=null){
				$('#bfile_path_submit').text("查看");
				$('#bfile_path_submit').attr("href",response.stdRecord.bfile_path);
			}else{
				$('#bfile_path_submit').text("");
			}
			$('#afile_path_submit').attr("href",response.stdRecord.afile_path);
           
			
			$("#busnumber_submit").val(response.stdRecord.implement_bus_number);
			$("#confirmor_submit").val(response.stdRecord.confirmor);
			$("#confirm_date_submit").val(response.stdRecord.confirm_date);
		}
	})
	var dialog = $( "#dialog-factory" ).removeClass('hide').dialog({
		width:660,
		height:620,
		modal: true,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 工厂反馈查看</h4></div>',
		title_html: true,
		buttons: [ 
			{
				text: "关闭",
				"class" : "btn btn-minier",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
}
function show(id){
	$('.updatefile').hide();
	$("#multiple_factory_show").hide();
	getFactorySelect("quality/qcStdRecord",'',"#multiple_factory_show",null,'name');
	$('#usynopsis_show').attr("readonly",true);
	$('#order_show').attr("readonly",true);
	$('#workshop_show').attr("readonly",true);
	$('#bustype_show').attr("readonly",true);
	$('#before_desc_show').attr("readonly",true);
	$('#after_desc_show').attr("readonly",true);
	$('#memo_show').attr("readonly",true);
	$("#multiple_factory_show").multipleSelect({
        selectAll: true
    });
	$("#scope_show").hide();
	$.ajax({
		url:"showStdRecord",
		type: "post",
		data:{
			"id":id
		},
		dataType:"json",
		success:function(response){
			$('#recordno_show').val(response.stdRecord.record_num);
			$('#bustype_show').val(response.stdRecord.bus_type);
			$('#afile_path_show').attr("href",val+response.stdRecord.afile_path);
			$('#usynopsis_show').val(response.stdRecord.usynopsis);
			$('#order_show').val(response.stdRecord.order_id);
			$('#workshop_show option[value='+response.stdRecord.workshop+']').attr("selected",true);
			$('#scope_show').val(response.stdRecord.scope);
			$("#multiple_factory_show").siblings().find('.ms-choice').children('span').text(response.stdRecord.scope);
			$('#before_desc_show').val(response.stdRecord.before_desc);
			$('#after_desc_show').val(response.stdRecord.after_desc);
			var val=$('#urlPath').val();
			if(response.stdRecord.bfile_path!=null){
				$('#bfile_path_show').text("查看");
				$('#bfile_path_show').attr("href",response.stdRecord.bfile_path);
			}else{
				$('#bfile_path').text("");
			}
			
			$('#afile_path_show').attr("href",response.stdRecord.afile_path);
			$("#memo_show").val(response.stdRecord.memo);
		}
	})
	var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
		width:620,
		height:600,
		modal: true,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 品质标准更新记录查看</h4></div>',
		title_html: true,
		buttons: [ 
			{
				text: "关闭",
				"class" : "btn btn-minier",
				click: function() {
					$( this ).dialog( "close" ); 
					$("#editForm")[0].reset();
				} 
			},
		]
	});
}; 
function edit(id){
	$('.updatefile').show();
	$("#scope_show").hide();
	getFactorySelect("quality/qcStdRecord",'',"#multiple_factory_show",null,'name');
	$("#multiple_factory_show").hide();
	$('#usynopsis_show').removeAttr("readonly");
	$('#order_show').removeAttr("readonly");
	$('#workshop_show').removeAttr("readonly");
	$('#bustype_show').removeAttr("readonly");
	$('#before_desc_show').removeAttr("readonly");
	$('#after_desc_show').removeAttr("readonly");
	$('#memo_show').removeAttr("readonly");
	$("#multiple_factory_show").multipleSelect({
        selectAll: true
    });
	$.ajax({
		url:"showStdRecord",
		type: "post",
		data:{
			"id":id
		},
		dataType:"json",
		success:function(response){
			$("#id_show").val(response.stdRecord.id);
			$('#recordno_show').val(response.stdRecord.record_num);
			$('#bustype_show').val(response.stdRecord.bus_type);
			$('#afile_path_show').attr("href",val+response.stdRecord.afile_path);
			$('#usynopsis_show').val(response.stdRecord.usynopsis);
			$('#order_show').val(response.stdRecord.order_id);
			$('#workshop_show option[value='+response.stdRecord.workshop+']').attr("selected",true);
			var scope=response.stdRecord.scope;
			$('#scope_show').val(scope);
			$("#multiple_factory_show").siblings().find('.ms-choice').children('span').text(scope);
			var scopeArr=scope.split(",");
			for(var i=0;i<scopeArr.length;i++){
				$("#table-edit").children().find("ul").children().each(function(){
					var objval=$(this).children().children().eq(0).val();
					if($.trim(scopeArr[i])==objval){
						$(this).children().children().eq(0).prop("checked",true);
					}
				});
			}
			$('#before_desc_show').val(response.stdRecord.before_desc);
			$('#after_desc_show').val(response.stdRecord.after_desc);
			var val=$('#urlPath').val();
			if(response.stdRecord.bfile_path!=null){
				$('#bfile_path_show').text("查看");
				$('#bfile_path_show').attr("href",response.stdRecord.bfile_path);
			}else{
				$('#bfile_path').text("");
			}
			
			$('#afile_path_show').attr("href",response.stdRecord.afile_path);
			$("#memo_show").val(response.stdRecord.memo);
		}
	})
	var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
		width:620,
		height:600,
		modal: true,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 品质标准更新记录查看</h4></div>',
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
				text: "确认",
				"class" : "btn btn-primary btn-minier",
				click: function() {
					var scope=$("#multiple_factory_show").siblings().find('.ms-choice').children('span').text();
					if(scope!=''){
						$("#scope_show").val(scope);
					}
					if(scope=='全选'){
						var all="";
						$("#multiple_factory_show option").each(function(){
							all+=$(this).val()+",";
						});
						alert(all.substring(0,all.length-1)); return false;
						$("#scope_show").val(all.substring(0,all.length-1));
					}

					$("#editForm").submit();
					$( this ).dialog( "close" ); 
					//$("#editForm")[0].reset();
				} 
			}
		]
	});
}; 
function updateStd(id){
	if($("#implement_factory_submit").val()==''){
		alert("实施工厂不能为空");
		$("#implement_factory_submit").focus();
		return false;
	}
	if($("#busnumber_submit").val()==''){
		alert("实施车号不能为空");
		$("#busnumber_submit").focus();
		return false;
	}
	if($("#confirmor_submit").val()==''){
		alert("确认人不能为空");
		$("#confirmor_submit").focus();
		return false;
	}
	if($("#confirm_date_submit").val()==''){
		alert("确认日期不能为空");
		$("#confirm_date_submit").focus();
		return false;
	}
	$.ajax({
		url:"updateStdRecord",
		type: "post",
		data:{
			"id":id,
			"scope":$("#multiple_factory_show").val(),
			"implement_bus_number":$("#busnumber_submit").val(),
			"confirmor":$("#confirmor_submit").val(),
			"confirm_date":$("#confirm_date_submit").val()
		},
		dataType:"json",
		success:function(response){
			if(response.success){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>保存成功！</h5>',
					class_name: 'gritter-info'
				});
		    	$( "#dialog-factory" ).dialog( "close" );
		    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>保存失败！</h5><br>',
					class_name: 'gritter-info'
				});
	    	}
		}
	});
}
function update(id){
	if($("#implement_factory_submit").val()==''){
		alert("实施工厂不能为空");
		$("#implement_factory_submit").focus();
		return false;
	}
	if($("#busnumber_submit").val()==''){
		alert("实施车号不能为空");
		$("#busnumber_submit").focus();
		return false;
	}
	if($("#confirmor_submit").val()==''){
		alert("确认人不能为空");
		$("#confirmor_submit").focus();
		return false;
	}
	if($("#confirm_date_submit").val()==''){
		alert("确认日期不能为空");
		$("#confirm_date_submit").focus();
		return false;
	}
	$.ajax({
		url:"addStdImplementInfo",
		type: "post",
		data:{
			"id":$("#id_submit").val(),
			"quality_standard_id":id,
			"implement_factory":$("#implement_factory_submit").val(),
			"implement_bus_number":$("#busnumber_submit").val(),
			"confirmor":$("#confirmor_submit").val(),
			"confirm_date":$("#confirm_date_submit").val()
		},
		dataType:"json",
		success:function(response){
			if(response.success){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>保存成功！</h5>',
					class_name: 'gritter-info'
				});
		    	$( "#dialog-factory" ).dialog( "close" );
		    	ajaxQuery();
	    	}else{
	    		$.gritter.add({
					title: '系统提示：',
					text: '<h5>保存失败！</h5><br>',
					class_name: 'gritter-info'
				});
	    	}
		}
	});
}
//格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}