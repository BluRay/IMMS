var extArray = new Array(".xls");
var json_tpl_list=null;
$(document).ready(function(){
	initPage();
	$("#btnQuery").on("click",function(){
		ajaxQuery();
	}); 

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	$(document).on("input","#search_order_no,#order",function(){
		//alert("change");
		$(this).attr("order_id","");
	})
	
	$("#search_order_no").change(function(){
		getOrderConfigSelect($(this).attr("order_id")||"","","#search_order_config","全部","id") ;
	})
	
	$("#btnImport").click(function(){
		$("#order").val("").attr("order_id","").attr("disabled",false);
		$("#order_config").val("").attr("disabled",false);
		getOrderNoSelect("#order","#orderId",function(obj){
			//alert(obj.busType);
			$("#bus_type").val(obj.busType).attr("bus_type_id",obj.bus_type_id);
			getOrderConfigSelect(obj.id,"","#order_config","请选择","id") ;
		});
		//getBusTypeSelect('','#bus_type','请选择','id')
		//$("#bus_type").prop("disabled",false);
		getKeysSelect("CHECK_NODE", "", "#node","请选择","id")
		$("#node").prop("disabled",false); 
		drawTplDetailTable("#tplDetailTable");
		//$("#memo").val("").prop("disabled",false);
		$("#uploadForm").show();
		
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:900,
			height:520,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>车型成品记录表模板导入</h4></div>",
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
						ajaxSave(); 
					} 
				}
			]
		});
	})
	
	

})
function initPage(){
	//getBusNumberSelect('#nav-search-input');
	getOrderNoSelect("#search_order_no","#orderId",null,$('#search_bus_type').val());
	getBusTypeSelect('','#search_bus_type','全部','id');
	getKeysSelect("CHECK_NODE", "", "#search_node","全部","id") 
	ajaxQuery();
}

function ajaxQuery(){
	$(".divLoading").addClass("fade in").show();
	$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-140,
		scrollX: true,
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
					"bus_type_id":$("#search_bus_type").val(),
					"order_id": $("#search_order_no").attr("order_id"),
					"order_config_id":$("#search_order_config").val(),
					"test_node_id":$("#search_node").val()
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getPrdRcdOrderTplList",
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
		          	{"title":"订单","class":"center","data":"order_desc","defaultContent": ""},
		          	{"title":"配置","class":"center","data":"order_config","defaultContent": ""},
		            {"title":"检验节点","class":"center","data":"test_node","defaultContent": ""},
		            /*{"title":"版本号","class":"center","data":"version","defaultContent": ""},*/
		            /*{"title":"备注","class":"center","data":"memo","defaultContent": ""},*/
		            {"title":"维护人","class":"center","data": "editor","defaultContent": ""},
		            {"title":"维护时间","class":"center","data":"edit_date","defaultContent": ""},		            	            
		            {"title":"操作","width":"60","class":"left","data":"","render":function(data,type,row){
		            	var html="<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title='查看' onclick = 'showInfoPage(" + JSON.stringify(row)+");' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;&nbsp;";
		            	if(row.record_num==0){
		            		html+="<i class=\"ace-icon fa fa-upload bigger-130 editorder\" title='编辑' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";
		            	}
		            	return html;
		            	
		            	}
		            }
		          ]
	});
	$(".divLoading").hide();
}

/**
 * 上传导入
 */
function upload(form,file){
	if (file == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
		ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		$("#uploadForm").ajaxSubmit({
			dataType : "json",
			type : 'post', // 提交方式 get/post
			url : 'uploadPrdRcdBusTypeTpl', // 需要提交的 url
			data : {
				
			},
			success : function(response) {
				//alert(response.data);
				json_tpl_list=response.data;
				if(response.success){
					drawTplDetailTable("#tplDetailTable",response.data);
				}else{
					alert(response.message)
				}
				$("#uploadForm").resetForm();
			}
		})	
	}
}

function drawTplDetailTable(tableId,data){
	var startIndex= 0;

	var tb=$(tableId).dataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		rowsGroup:[0,1],
		/*//sScrollY: $(window).height()-250,
		scrollX: true,*/
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"请导入模板明细！"
		},
	/*	fnCreatedRow : function(nRow, aData, iDisplayIndex){  //datatable 添加序列号
			
			var td=$("td:first",nRow);
			//alert($(td)[0].hidden)
			if($(td).css("display") !="none"){				
				startIndex++;
			}
			jQuery("td:first", nRow).html(startIndex);
            //jQuery("td:first", nRow).html(iDisplayIndex +1);  
              return nRow; 			
			var api = this.api();
			var startIndex= api.context[0]._iDisplayStart;//获取到本页开始的条数
			var j=0;
			api.column(0).nodes().each(function(cell, i) {
				//alert($(cell).css("display"))
				if($(cell).css("display")!="none"){
					j++;
				}
				cell.innerHTML = startIndex + j;
			}); 
        },  */
		data:data||{},
		columns: [
		          	{"title":"序号","class":"center","width":"5%","data":"test_item","defaultContent": ""},
		            {"title":"检验项目","class":"center","width":"15%","data":"test_item","defaultContent": ""},
		            {"title":"检验标准","class":"center","width":"65%","data":"test_standard","defaultContent": ""},
		            /*{"title":"要求","class":"center","data": "test_request","defaultContent": ""},*/
		            {"title":"是否必录项","class":"center","width":"10%","data":"is_null","defaultContent": ""},		            	            
		          ]	
	});
	
	var api = tb.api();
	var startIndex= api.context[0]._iDisplayStart;//获取到本页开始的条数
	var j=0;
	api.column(0).nodes().each(function(cell, i) {
		//alert($(cell).css("display"))
		if($(cell).css("display")!="none"){
			j++;
		}
		cell.innerHTML = startIndex + j;
	}); 
}

function ajaxSave(tpl_header_id){
	var bus_type_id=$("#order").attr("bus_type_id");
	var order_id=$("#order").attr("order_id");
	var order_config_id=$("#order_config").val();
	var test_node_id=$("#node").val();
	var test_node=$("#node :selected").text();
	//var memo=$("#memo").val();
	var tpl_header_id=tpl_header_id;
	/*if(bus_type_id==""){
		alert("请选择车型！");
		return false;
	}*/
	
	
	
	if(order_id==""||order_id==undefined){
		alert("请输入有效订单！");
		return false;
	}
	if(order_config_id==""){
		alert("请选择订单配置！");
		return false;
	}
	if(test_node_id==""){
		alert("请选择检验节点！");
		return false;
	}
	if(!json_tpl_list){
		alert("请导入模板明细！");
		return false;
	}
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:"savePrdRcdBusTypeTpl",
		type:"post",
		dataType:"json",
		data:{
			bus_type_id:bus_type_id,
			order_id:order_id,
			order_config_id:order_config_id,
			test_node_id:test_node_id,
			test_node:test_node,
			//memo:memo,
			tpl_list_str:JSON.stringify(json_tpl_list),
			tpl_header_id:tpl_header_id
		},
		success:function(response){
			$(".divLoading").hide();
			alert(response.message);
			ajaxQuery();
			$( "#dialog-config" ).dialog("close");
		}
	})
}

function showEditPage(row){
	//getBusTypeSelect(row.bus_type_id,'#bus_type','请选择','id');
	//$("#bus_type").prop("disabled",true);
	$("#order").attr("order_id",row.order_id);
	$("#order").val(row.order_no).prop("disabled",true);
	$("#order").attr("tpl_header_id",row.id);
	getKeysSelect("CHECK_NODE", row.test_node_id, "#node","请选择","id");
	$("#node").prop("disabled",true);
	$("#memo").val(row.memo).prop("disabled",false);
	getOrderConfigSelect(row.order_id||"",row.order_config_id,"#order_config","请选择","id") ;
	$("#order_config").prop("disabled",true);
	$("#uploadForm").show();
	var detail_list=getTplDetailByHeader(row.id)
	json_tpl_list=detail_list;
	
	var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
		width:920,
		height:520,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>车型成品记录表模板导入</h4></div>",
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
					ajaxSave(row.id); 
				} 
			}
		]
	});
	drawTplDetailTable("#tplDetailTable",detail_list);
}

function getTplDetailByHeader(tpl_header_id){
	var detail_list=null;
	$.ajax({
		url:"getPrdRcdBusTypeTplDetail",
		type:"post",
		async:false,
		dataType:"json",
		data:{
			tpl_header_id:tpl_header_id
		},
		success:function(response){
			detail_list=response.data;
		}
	})
	return detail_list;
}

function showInfoPage(row){
	//getBusTypeSelect(row.bus_type_id,'#bus_type','请选择','id');
	//$("#bus_type").prop("disabled",true);
	$("#order").attr("order_id",row.order_id);
	$("#order").val(row.order_no).prop("disabled",true);
	$("#order").attr("tpl_header_id",row.id);
	getKeysSelect("CHECK_NODE", row.test_node_id, "#node","请选择","id");
	$("#node").prop("disabled",true);
	$("#memo").val(row.memo).prop("disabled",true);
	getOrderConfigSelect(row.order_id||"",row.order_config_id,"#order_config","请选择","id") ;
	$("#order_config").prop("disabled",true);
	var detail_list=getTplDetailByHeader(row.id)
	drawTplDetailTable("#tplDetailTable",detail_list);
	$("#uploadForm").hide();
	var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
		width:920,
		height:520,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>车型成品记录表模板查看</h4></div>",
		title_html: true,
		buttons: [ 
		/*	{
				text: "取消",
				"class" : "btn btn-minier",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			},*/
			{
				text: "关闭",
				"class" : "btn btn-primary btn-minier",
				click: function() {
					$( this ).dialog( "close" ); 
				} 
			}
		]
	});
}