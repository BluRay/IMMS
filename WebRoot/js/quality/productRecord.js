var detail_list=[];
$(document).ready(function(){
	initPage();
	
	//新增记录
	$("#btnAdd").click(function(){
		getKeysSelect("CHECK_NODE", "", "#check_node","请选择","id");
		$("#tableDetail").html("");
		$("#testResult").val("");
		$("#bus_number").val("");
		$("#factory").val("");
		$("#test_node").val("");
		$("#order").html("");
		$("#test_date").val("");
		
		getBusNumberSelect("#bus_number", "", function(obj){
			$("#order").html(obj.order_desc);
			var factory_id=obj.factory_id+"";
			//alert(factory_id)
			if(factory_id.indexOf(getAllFromOptions("#search_factory","id"))<0){
				alert('抱歉，您没有该车辆的操作权限！');			
			}else
				getFactorySelect("quality/prdRcdIn",factory_id,"#factory","","id");
		});
		
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:1100,
			height:550,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>成品记录表录入</h4></div>",
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
	});
	/**
	 * 点击“确定”查询成品记录表订单模板
	 */
	$("#btnShowTpl").click(function(){
		var tpl_detail=ajaxGetTplDetail();
		detail_list=tpl_detail;
		drawTplDetailTable("#tableDetail",tpl_detail,true);
	});
	
	
	/**
	 * 标准故障库查询
	 */
	$("#btnLibQuery").click(function(){
		$.ajax({
			url:"getFaultLibFuzzyList",
			async:false,
			type:"post",
			dataType:"json",
			data:{
				"bugType":$("#bug_type").val(),
				"bug":$("#bug").val(),
				"seriousLevel":$("#fault_level").val(),
				"faultType":$("#fault_type").val()
			},
			success:function(response){
				detail=response.data;
				drawFaultLibTable(detail,"#faultLibTable");
			}
		})
	});
	
	
});

function initPage(){
	getKeysSelect("CHECK_NODE", "", "#search_node","全部","id");
	getFactorySelect("quality/prdRcdIn","","#search_factory","全部","id")
	getOrderNoSelect("#search_order_no","#orderId");
}

function drawTplDetailTable(tableId,data,editable){
	var workshop_list=null;
	var workgroup_list=null;
	//alert(JSON.stringify(data))
	editable=editable||false;
	var tb=$(tableId).DataTable({
		paiging:false,
		 keys: true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		rowsGroup:[0],
		fixedColumns:   {
            leftColumns: 2,
        },
		sScrollY: 310,
		scrollX: true,
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"未匹配到订单模板！",					     
			infoEmpty:"未匹配到订单模板！",
			zeroRecords:"未匹配到订单模板！"
		},
		data:data||{},
		columns: [
		            {"title":"检验项目","class":"center","width":"5%","data":"test_item","defaultContent": ""},
		            {"title":"检验标准","class":"center","width":"20%","data":"test_standard","defaultContent": ""},
		            {"title":"要求","class":"center","width":"10%","data": "test_request","defaultContent": ""},
		            {"title":"检验结果","class":"center","data": "test_result","defaultContent": "","render":function(data,type,row){
		            	var el= "<span class=\"block input-icon input-icon-right\"><input  class=\"input-medium test_result\" type=\"text\" value=\""+(data||"")+"\">"+
	            		"<i class=\"ace-icon fa fa-arrow-up\" style='cursor:pointer;z-index: 0' title='选择标准故障' onclick='return showQuaStd()'></i> </span>";
		            	if(!editable){
		            		el=data;
		            	}
		            	return el;
		            }},
		            {"title":"判定","class":"center","data": "result_judge","defaultContent": "","render":function(data,type,row){
		            	var el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' selected>合格</option><option value='不合格'>不合格</option></select>";
		            	if(data=="不合格"){
		            		el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' >合格</option><option value='不合格' selected>不合格</option></select>";
		            	}
		            	if(!editable){
		            		el=data;
		            	}
		            	return el;
		            }},
		            {"title":"复检判定","class":"center","data": "rework","defaultContent": "","render":function(data,type,row){
		            	var el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' selected>合格</option><option value='不合格'>不合格</option></select>";
		            	if(data=="不合格"){
		            		el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' >合格</option><option value='不合格' selected>不合格</option></select>";
		            	}
		            	if(!editable){
		            		el=data;
		            	}
		            	return el;
		            }},
		            {"title":"检验员","class":"center","data": "tester","defaultContent": "","render":function(data,type,row){
		            	return "<input  class=\"input-medium tester\" type=\"text\" value='"+(data||"")+"'>";
		            }},
		            {"title":"责任车间","class":"center","data": "workshop","defaultContent": "","render":function(data,type,row){
		            	return "<input  class=\"input-medium workshop\" type=\"text\" value='"+(data||"")+"' workshop_id='"+row.workshop_id+"'>";
		            }},
		            {"title":"责任班组","class":"center","data": "workgroup","defaultContent": "","render":function(data,type,row){
		            	return "<input  class=\"input-medium workgroup\" type=\"text\" value='"+(data||"")+"' workgroup_id='"+row.workgroup_id+"'>";
		            }},
		            {"title":"备注","class":"center","data": "memo","defaultContent": "","render":function(data,type,row){
		            	return "<input  class=\"input-medium memo\" type=\"text\" value=\""+(data||"")+"\">";
		            }},
		            {"title":"是否必录项","class":"center","width":"10%","data":"is_null","defaultContent": ""},		            	            
		          ]	
	});
		
}

/**
 * 查询成品记录表模板明细
 */
function ajaxGetTplDetail(){
	var detail=null;
	$.ajax({
		url:"getPrdRcdOrderTpl",
		async:false,
		type:"post",
		dataType:"json",
		data:{
			"bus_number":$("#bus_number").val(),
			"test_node":$("#check_node :selected").text()
		},
		success:function(response){
			detail=response.data;
			/*var tpl=response.tpl_header;
			if(response.tpl_header){
				$("#bus_number").attr("order_id",tpl.order_id);
				$("#bus_number").attr("order_config_id",tpl.order_config_id);
				$("#order").html(tpl.order_desc);
			}*/
		}
	})
	return detail;
}

function showQuaStd(index){
	var dialog = $( "#dialog-config-quaStad" ).removeClass('hide').dialog({
		width:780,
		height:450,
		modal: false,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>检验结果录入</h4></div>",
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
					fillResult(index); 
				} 
			}
		]
	});
}


function fillResult(index){
	
}

function drawFaultLibTable(data,tableId){
	$(tableId).DataTable({
		paiging:false,
		 keys: true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
/*		rowsGroup:[0],
		fixedColumns:   {
            leftColumns: 2,
        },*/
		sScrollY: 250,
		scrollX: false,
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"未查询到数据！",					     
			infoEmpty:"未查询到数据！",
			zeroRecords:"未查询到数据！"
		},
		data:data||{},
		columns: [
		          	{"title":"","class":"center","width":"20","data":null,"defaultContent": "","render":function(data,type,row){
		          		return "<input type='radio' name='check_fault'/>"
		          	}},
		            {"title":"缺陷类别","class":"center","data":"bugType","defaultContent": ""},
		            {"title":"质量缺陷","class":"center","data":"bug","defaultContent": ""},
		            {"title":"严重等级","class":"center","width":"80","data": "faultLevel","defaultContent": ""},
		            {"title":"缺陷分类","class":"center","data": "faultType","defaultContent": ""}
		          ]	
	});
}
