var detail_list=[];
var tb_detail;
var workshop_list=null;
var workgroup_list=[];
$(document).ready(function(){
	initPage();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	//新增记录
	$("#btnAdd").click(function(){
		//$("#tableDetail").html("");
		if($.fn.dataTable.isDataTable("#tableDetail")){
			$('#tableDetail').DataTable().destroy();
			$('#tableDetail').empty();
		}
		getFactorySelect("quality/prdRcdIn","","#factory","","id");
		getOrderNoSelect("#order", "#orderId", function(order){
			getOrderConfigSelect(order.id||"","","#order_config",null,"id") ;
		}, "","#factory",null)
		
		$("#btnShowTpl").show();
		
		//drawTplDetailTable("#tableDetail",null,true);
		
		$("#testResult").val("");
		$("#order").val("").attr("order_id","");
		$("#order_config").val("");
		$("#td_bus_lable").show();
		$("#td_bus").show();
		$("#td_customer_lable").hide();
		$("#td_customer").hide();
		$("#factory").attr("disabled",true);
		$("#order").attr("disabled",true);
		$("#bus_number").val("").attr("disabled",false);
		$("#customer_number").val("").attr("disabled",false);
		$("#order_config").css("display","none");
		$("#order_config_span").css("display","");

		$("#factory").val("");
		$("#check_node").val("").attr("disabled",false);;
		$("#order").html("");
		$("#test_date").val("").attr("disabled",false);
		$("input[name='testResult']").attr("disabled",false);
		
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:1300,
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
					text: "保存&继续",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						ajaxSave(true); 
					} 
				}
			]
		});
		$("#btnShowTpl").attr("disabled",false);
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
	
	$(document).on("input",".workshop",function(e){
		$(e.target).attr("workshop_id","");
	});
	
	$(document).on("input",".workgroup",function(e){
		$(e.target).attr("workgroup_id","");
	});
	
	$(document).on("change",".workshop",function(e){
		var element=$(e.target).parent("td").next("td").find(".workgroup");
		var workshop=$(this).find("option:selected").text();
		//alert(JSON.stringify(workgroup_list[workshop]))
		getSelects(workgroup_list[workshop], "", element,"","id");
	});
	
	$(document).on("change","#bus_number",function(e){
		if($(this).val()==""){
			$("#order_config_span").html("");
			$("#order").val("").attr("order_id","");
		}
		drawTplDetailTable("#tableDetail",null,true);
		
	})
	
	$(document).on("change","#check_node",function(e){
		drawTplDetailTable("#tableDetail",null,true);		
		
		//alert($("#check_node :selected").text());
		if($("#check_node :selected").text()=="车架"||$("#check_node :selected").text()=="车身"||
				$("#check_node :selected").text()=="五大片"||$("#check_node :selected").text()=="前围"||
				$("#check_node :selected").text()=="后围"||$("#check_node :selected").text()=="左围"||
				$("#check_node :selected").text()=="右围"||$("#check_node :selected").text()=="顶围"||
				$("#check_node :selected").text()=="后舱"||$("#check_node :selected").text()=="顶电池包"){
			$("#bus_number").val("");
			$("#order_config_span").html("");
			$("#td_bus_lable").hide();
			$("#td_bus").hide();
			$("#td_customer_lable").show();
			$("#td_customer").show();
			$("#factory").attr("disabled",false);
			$("#order").attr("disabled",false);
			$("#order_config").css("display","");
			$("#order_config_span").css("display","none");
		}else{
			//$("#order").val("").attr("order_id","");
			//$("#order_config").val("");
			$("#td_bus_lable").show();
			$("#td_bus").show();
			$("#td_customer_lable").hide();
			$("#td_customer").hide();
			$("#factory").attr("disabled",true);
			$("#order").attr("disabled",true);
			$("#order_config").css("display","none");
			$("#order_config_span").css("display","");
		}
	})
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	$(document).on("input","#order",function(){
		//alert("change");
		$("order_no").attr("order_id","");
	})
	$("#order").change(function(){
		getOrderConfigSelect($(this).attr("order_id")||"","","#order_config",null,"id") ;
	})
	
	$(document).on("change","#factory",function(e){
		$("#order").val("").attr("order_id","");
		$("#order_config").html("");
		getWorkshopSelect('',$("#factory :selected").text(),"","#workshop_tmpl","","id");
		/*alert($("#workshop_tmpl").html());*/
		var workshop_all=getAllWorkshops("#workshop_tmpl","name");
		//alert(workshop_all)
		getWorkgroupSelectAll(workshop_all);
	})
});

function initPage(){
	$("#order").val("").attr("order_id","");
	$("#factory").attr("disabled",true);
	$("#order").attr("disabled",true);
	$("#order_config").css("display","none");
	$("#order_config_span").css("display","");
	
	getBusNumberSelect('#nav-search-input');
	getBusNumberSelect('#search_bus_number');
	getKeysSelect("CHECK_NODE", "", "#search_node","全部","id");
	getKeysSelect("CHECK_NODE", "", "#check_node","请选择","id");
	getFactorySelect("quality/prdRcdIn","","#search_factory","全部","id")
	getOrderNoSelect("#search_order_no","#orderId");
	
	getBusNumberSelect("#bus_number", "", function(obj){
		$("#order").html(obj.order_desc);
		var factory_id=obj.factory_id+"";
		//alert(factory_id)
		var all_factory_ids=getAllFromOptions("#search_factory","id");
		//alert(all_factory_ids.indexOf(factory_id))
		if(all_factory_ids.indexOf(factory_id)<0){			
			alert('抱歉，您没有该车辆的操作权限！');	
			$("#bus_number").val("");
			return false;
		}else{
			//$("#btnShowTpl").attr("disabled",false);
			$("#factory").val(factory_id);
			getWorkshopSelect('',$("#factory :selected").text(),"","#workshop_tmpl","","id");
			/*alert($("#workshop_tmpl").html());*/
			var workshop_all=getAllWorkshops("#workshop_tmpl","name");
			//alert(workshop_all)
			getWorkgroupSelectAll(workshop_all);
		}
		
		$("#order").val(obj.order_no);
		$("#order").attr("order_id",obj.order_id);
		$("#order_config_span").html(obj.order_config_name);
	});
}

function drawTplDetailTable(tableId,data,editable){
	if(data==null||data==undefined){
		data={};
	}
	//alert(JSON.stringify(data))
	editable=editable||false;
	tb_detail=$(tableId).dataTable({
		paiging:false,
		ordering:false,
		deferRender: true,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		rowsGroup:[0,1,7],
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:1
        },
		/*sScrollY: 310,
		scrollX: true,*/
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"未匹配到订单模板！",					     
			infoEmpty:"未匹配到订单模板！",
			zeroRecords:"未匹配到订单模板！"
		},
	columnDefs: [
	         {
	            "targets":[4],
	            "render":function(data,type,row,meta){
	            	var el= "<span class=\"block input-icon input-icon-right\"><input  class=\"input-medium test_result\" style='text-align:center;width:100%;height:30px' type=\"text\" value=\""+(data||"")+
	            	"\" fault_id=\""+row.fault_id+"\">"
	            	+/*"<i class=\"ace-icon fa fa-arrow-up\" style='cursor:pointer;z-index: 0' title='选择标准故障' onclick='return showQuaStd("+meta.row+")'></i>"*/"</span>";
	            	if(!editable){
	            		el=data;
	            	}
	            	return el;
	            },
	            "createdCell": function (td, cellData, rowData, row, col) {
	            	var test_card_template_detail_id=rowData.test_card_template_detail_id;
	            	if(test_card_template_detail_id==null ||test_card_template_detail_id==""){
	            		test_card_template_detail_id=rowData.id;
	            	}
	            	var test_card_template_head_id=rowData.test_card_template_head_id;
	            	if(test_card_template_head_id==null||test_card_template_head_id==""){
	            		test_card_template_head_id=rowData.test_card_template_id;
	            	}
	            	$(td).data("test_card_template_detail_id",test_card_template_detail_id);
	            	$(td).data("test_card_template_head_id",test_card_template_head_id);
	            	var disabled=false;
	            	if(!editable){
	            		disabled=true;
	            	}          	
	            	/*if(rowData.test_result){
	        			$(td).find(".test_result").val(rowData.workshop_id);
	        			$(td).find(".test_result").attr("disabled",disabled)
	        		}*/
	             }
	         },
	         {
	        	 "targets":[5],
	        	 "render":function(data,type,row,meta){
		            	var el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' selected>合格</option><option value='不合格'>不合格</option><option value='让步放行'>让步放行</option></select>";
		            	if(data=="不合格"){
		            		el= "<select  class=\"input-medium judge\" style='width:80px;text-align:center'><option value='合格' >合格</option><option value='不合格' selected>不合格</option><option value='让步放行'>让步放行</option></select>";
		            	}
		            	if(!editable){
		            		el=data;
		            	}
		            	return el;
		            }
	         },
	         {
	        	 "targets":[6],
	        	 "render":function(data,type,row,meta){
		            	var el= "<select  class=\"input-medium rework\" style='width:80px;text-align:center'><option value='' selected><option value='合格'>合格</option><option value='不合格'>不合格</option><option value='让步放行'>让步放行</option></select>";
		            	if(data=="不合格"){
		            		el= "<select  class=\"input-medium rework\" style='width:80px;text-align:center'><option value=''><option value='合格' >合格</option><option value='不合格' selected>不合格</option><option value='让步放行'>让步放行</option></select>";
		            	}
		            	if(!editable){
		            		el=data;
		            	}
		            	return el;
		            }
	         },
	         {
	        	 "targets":[7],
	        	 "render":function(data,type,row,meta){
		            	var el= "<input  class=\"input-medium tester\" style='width:100%;text-align:center;height:30px'  type=\"text\" value='"+(row.tester||"")+"'>";
		            	if(!editable){
		            		el=row.tester;
		            	}
		            	return el;
		            }
	         },
        {
       	 "targets":[8],
       	 "render":function(data,type,row,meta){
	       		var el= "<input  class=\"input-medium memo\" style='width:100%;text-align:center;height:30px'  type=\"text\" value=\""+(data||"")+"\">";
	        	if(!editable){
	        		el=data;
	        	}
	        	return el;
	            }
        }],
		data:data,
		columns: [
		          	{"title":"序号","class":"center","width":"50","data":"test_item","defaultContent": ""},
		            {"title":"检验项目","width":"120","class":"center","data":"test_item","defaultContent": ""},		           
		            {"title":"检验标准","width":"200","class":"center","data":"test_standard","defaultContent": ""},	
		            {"title":"是否必录项","width":"80","class":"center is_null","data":"is_null","defaultContent": ""},	
		            {"title":"检验结果","width":"100","class":"center","data": "test_result","defaultContent": ""},
		            {"title":"判定","width":"60","class":"center","data": "result_judge","defaultContent": ""},
		            {"title":"复检判定","width":"60","class":"center","data": "rework","defaultContent": ""},
		            {"title":"检验员","width":"80","class":"center","data": "test_item","defaultContent": "",},
		            {"title":"备注","width":"100","class":"center","data": "memo","defaultContent": ""},
		           	
		         	
		          ]	
	});
	/*var head_width=$("#tableDetail_wrapper").width();
   
	if(head_width>0){
		$("#tableDetail_wrapper .dataTables_scrollHead").css("width",head_width-17);
	}*/
	var api = tb_detail.api();
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

/**
 * 查询成品记录表模板明细
 */
function ajaxGetTplDetail(){
	$(".divLoading").addClass("fade in").show();
	var detail=null;
	$.ajax({
		url:"getPrdRcdOrderTpl",
		async:false,
		type:"post",
		dataType:"json",
		data:{
			"bus_number":$("#bus_number").val(),	
			"customer_no":$("#customer_number").val(),
			"order_id":$("#order").attr("order_id"),
			"order_config_id":$("#order_config").val(),
			"test_node":$("#check_node :selected").text(),
			"test_node_id":$("#check_node").val()
		},
		success:function(response){
			$(".divLoading").hide();
			detail=response.data;
			if(!response.success){
				alert(response.message)
			}
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
	//drawFaultLibTable(null,"#faultLibTable");
	var dialog = $( "#dialog-config-quaStad" ).removeClass('hide').dialog({
		width:780,
		height:450,
		modal: true,
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
	var radio_chk=$("#faultLibTable :radio:checked");
	var fault_id=$(radio_chk).attr("fault_id");
	var bug=$(radio_chk).parent("td").next("td").next("td").html() 
	
	$(".test_result").eq(index).val(bug);
	$(".test_result").eq(index).attr("fault_id",fault_id);
	 $( "#dialog-config-quaStad" ).dialog("close");
}

function drawFaultLibTable(data,tableId){
	$(tableId).dataTable({
		paiging:false,
		keys: true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		paginate:false,
		processing:true,
/*		rowsGroup:[0],
		fixedColumns:   {
            leftColumns: 2,
        },*/
		sScrollY: 250,
		scrollX: true,
		scrollCollapse: false,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			processing: "正在查询，请稍后...",
			emptyTable:"未查询到数据！",					     
			infoEmpty:"未查询到数据！",
			zeroRecords:"未查询到数据！"
		},
		data:data||{},
		columns: [
		          	{"title":"","class":"center","width":"20","data":null,"defaultContent": "","render":function(data,type,row){
		          		return "<input type='radio' name='check_fault' fault_id='"+row.id+"'/>"
		          	}},
		            {"title":"缺陷类别","class":"center","data":"bugType","defaultContent": ""},
		            {"title":"质量缺陷","class":"center","data":"bug","defaultContent": ""},
		            {"title":"严重等级","class":"center","width":"80","data": "faultLevel","defaultContent": ""},
		            {"title":"缺陷分类","class":"center","data": "faultType","defaultContent": ""}
		          ]	
	});
}
function getWorkshopList(index){
	var element=$(".workshop").eq(index);
	var td=$(element).parent("td");
	
	$(element).typeahead({
		source : function(input, process) {
			//alert($("#factory").val());
			$.get("/BMS/common/getWorkshopSelectAuth", {
				"factory" : $("#factory :selected").text(),
				"workshop":input
			}, function(response) {
				list = response.data;
				var results = new Array();
				$.each(list, function(index, value) {
					results.push(value.name);
				})
				return process(results);
			}, 'json');
		},
		autoSelect: true,
		showHintOnFocus:true,
		appendTo:$(td),
		matcher : function(item) {
			return true;
			
		},
		items : 30,
		updater : function(item) {
			var selectId = "";
			$.each(list, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
				}
			})

			$(".workshop").eq(index).attr("workshop_id", selectId);
			return item;
		}
	})
}

function getWorkgroupList(index,workshop){
	var element=$(".workgroup").eq(index);
	var td=$(element).parent("td");
	//alert($(td).html())
	//workshop=workshop||$(td).parent("tr").find(".workshop").val();
	$(element).typeahead({
		source : function(input, process) {
			//alert($("#factory").val());
			$.get("/BMS/common/getWorkgroupSelect", {
				"factory" : $("#factory :selected").text(),
				"workshop":workshop||$(td).parent("tr").find(".workshop").val(),
				"workgroup":input
			}, function(response) {
				list = response.data;
				var results = new Array();
				$.each(list, function(index, value) {
					results.push(value.name);
				})
				return process(results);
			}, 'json');
		},
		autoSelect: true,
		showHintOnFocus:true,
		appendTo:$(td),
		matcher : function(item) {
			return true;
			
		},
		items : 30,
		updater : function(item) {
			var selectId = "";
			$.each(list, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
				}
			})

			$(element).attr("workgroup_id", selectId);
			return item;
		}
	})
}

function getWorkgroupSelectAll(workshop_list){
	workgroup_list=[];
	$.ajax({
		url:"/BMS/common/getWorkgroupSelectAll",
		async:false,
		type:"post",
		dataType:"json",
		data:{
			"factory":$("#factory :selected").text(),
			"workshop_list":workshop_list
		},
		success:function(response){
			//workgroup_list=response.data
			$.each(response.data,function(index,value){
				var item=JSON.parse(value.workgroup_list);
				workgroup_list[item.workshop]=item.workgroup_list
			})
		}
	})	
	//alert(JSON.stringify(workgroup_list))
}

function getAllWorkshops(elementId,valName){
	var selectVal_ALL="";
	$(elementId+" option").each(function(){
		if(valName=="name"){
			selectVal_ALL+=$(this).text()+",";
		}else
			selectVal_ALL+=$(this).val()+",";		
	});
	return selectVal_ALL;
	
}

function ajaxSave(continue_flag){
	$(".divLoading").addClass("fade in").show();
	var detail_list_submit=[];
	var trs=$("#tableDetail tbody").children("tr");
	var test_date=$("#test_date").val();
	var result=$("input[name='testResult']:checked").val();
	var save_flag=true;
	var test_node=$("#check_node :selected").text();
	var bus_number="";
	var order_id="";
	var order_config_id="";
	if(test_node=="车架"||test_node=="车身"|| test_node=="五大片"||
	  test_node=="前围"||test_node=="后围"||test_node=="左围"||
	  test_node=="右围"||test_node=="顶围"||test_node=="后舱"||test_node=="顶电池包"){
		bus_number=$("#customer_number").val();
		order_id=$("#order").attr("order_id");
		order_config_id=$("#order_config").val();
	}else{
		bus_number=$("#bus_number").val();
		order_id=$("#bus_number").attr("order_id");
		order_config_id=$("#bus_number").attr("order_config_id");
	}
	
	/*if(result==null||result.trim().length==0){
		alert("请选择检验结论!");
		save_flag=false;
		return false;
	}*/
	if(test_date==null||test_date.trim().length==0){
		alert("请输入检验日期!");
		save_flag=false;
		return false;
	}
	if(detail_list==undefined||detail_list.length==0){
		alert("无匹配的成品记录表模板！");
		save_flag=false;
		return false;
	}

	var test_card_template_head_id=$(trs[0]).find(".test_result").parent("span").parent("td").data("test_card_template_head_id");
	//alert(test_card_template_head_id)
	$.each(trs,function(i,tr){
		var test_result=$(tr).find(".test_result").val();
		var fault_id=$(tr).find(".test_result").attr("fault_id")=="undefined"?"0":$(tr).find(".test_result").attr("fault_id");
		var result_judge=$(tr).find(".judge").val();
		var rework=$(tr).find(".rework").val();
		var tester=$(tr).find(".tester").val();
		var workshop_id=$(tr).find(".workshop").val();
		var workgroup_id=$(tr).find(".workgroup").val();
		var memo=$(tr).find(".memo").val();
		var is_null=$(tr).find(".is_null").html();
		var test_card_template_detail_id=$(tr).find(".test_result").parent("span").parent("td").data("test_card_template_detail_id");
		
		if((workshop_id==null||workshop_id=="")){
			workshop_id=0;
		}
		if((workgroup_id==null||workgroup_id=="")){
			workgroup_id=0;
		}
		
		if(is_null=="是"&&test_result.trim().length==0){
			alert("第"+(i+1)+"行是必填项，请填写检验结果！");
			save_flag=false;
			return false;
		}
		if(result_judge=='不合格'&&test_result.trim().length==0){
			alert("第"+(i+1)+"行检验不合格，请填写检验结果！");
			save_flag=false;
			return false;
		}
		if(result_judge=='不合格'||is_null=="是"||tester.trim().length>0||test_result.trim().length>0){
			var obj={};
			obj.test_card_template_detail_id=test_card_template_detail_id;
			obj.test_card_template_head_id=test_card_template_head_id;
			obj.test_date=test_date;
			obj.bus_number=bus_number;
			obj.order_id=order_id;
			obj.order_config_id=order_config_id;
			obj.factory_id=$("#factory").val();
			obj.test_node_id=$("#check_node").val();
			obj.test_node=test_node;
			obj.result=result;
			obj.fault_id=fault_id;
			obj.test_result=test_result;
			obj.result_judge=result_judge;
			obj.rework=rework;
			obj.tester=tester;
			obj.workshop_id=workshop_id;
			obj.workgroup_id=workgroup_id;
			obj.memo=memo;
			
			detail_list_submit.push(obj);
		}
	})
	if(detail_list_submit.length==0){
		var obj={};
		obj.test_card_template_head_id=test_card_template_head_id;
		obj.test_date=test_date;
		obj.bus_number=bus_number;
		obj.order_id=order_id;
		obj.order_config_id=order_config_id;		
		obj.factory_id=$("#factory").val();
		obj.test_node_id=$("#check_node").val();
		obj.test_node=$("#check_node :selected").text();
		obj.result=result;
		
		detail_list_submit.push(obj);
	}
	
	if(save_flag==true){
		//alert(JSON.stringify(detail_list_submit))
		$.ajax({
			url:"saveProductRecord",
			async:false,
			type:"post",
			dataType:"json",
			data:{
				"bus_number":bus_number,
				"test_node":$("#check_node :selected").text(),
				'test_card_template_head_id':test_card_template_head_id,
				"record_detail":JSON.stringify(detail_list_submit)
			},
			success:function(response){
				$(".divLoading").hide();
				alert(response.message);
				$("#btnShowTpl").attr("disabled",false);
				ajaxQuery();
				if(continue_flag){//保存并继续
					detail_list_submit=[]
					drawTplDetailTable("#tableDetail",detail_list_submit,true);
				}else{
					$("#dialog-config").dialog("close");
				}
				
			}
		})	
	}

}

function ajaxQuery(){
	var factory_id=$("#search_factory").val();
	var bus_number=$("#search_bus_number").val();
	var order_no=$("#search_order_no").val();
	var test_node_id=$("#search_node").val();
	var test_result = [];
	$('input[name="search_test_result"]:checked').each(function() {
		test_result.push($(this).val());
	});
	test_result=test_result.join(",");
	
	$(".divLoading").addClass("fade in").show();
	var tb=$("#tableResult").DataTable({
		serverSide: true,
/*		fixedColumns:   {
            leftColumns: 1,
            rightColumns:1
        },*/
       /* rowsGroup:[0,1,2,3,4],*/
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: true,
		/*scrollCollapse: true,*/
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
				"bus_number":bus_number,
				"test_node_id":test_node_id,
				"factory_id":factory_id,
				"order_no":order_no,
				"result":test_result
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getProductRecordList",
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
		            {"title":"工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"检验节点","class":"center","data":"test_node","defaultContent": ""},
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"订单","class":"center","data": "order_desc","defaultContent": ""},
		            {"title":"检验员","class":"center","data":"tester","defaultContent": ""},		            
		            /*{"title":"检验结论","class":"center","data":"result","defaultContent": ""},	*/	    
		            {"title":"检验日期","class":"center","data":"test_date","defaultContent": ""},		
		            {"title":"录入人","class":"center","data": "editor","defaultContent": ""},
		            {"title":"录入时间","class":"center","data":"edit_date","defaultContent":""},
		            {"title":"操作","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"glyphicon glyphicon-search bigger-130 showbus\" title='查看' onclick = 'showInfoPage(" + JSON.stringify(row)+");' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;&nbsp;"+ 
		            	"<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" title='编辑' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";
		            		
		            	},
		            }
		          ],
	});
	$(".divLoading").hide();
}

function showInfoPage(row){
	//alert(row.bus_number);
	var result=0;
	if(row.result=='返工/返修合格'){
		result=1;
	}
	if(row.result=='让步放行'){
		result=2;
	}
	if(row.test_node=="车架"||row.test_node=="车身"||row.test_node=="五大片"||
	   row.test_node=="前围"||row.test_node=="后围"||row.test_node=="左围"||
	   row.test_node=="右围"||row.test_node=="顶围"||row.test_node=="后舱"||row.test_node=="顶电池包"){
		$("#td_bus_lable").hide();
		$("#td_bus").hide();
		$("#td_customer_lable").show();
		$("#td_customer").show();
		$("#factory").attr("disabled",true);
		$("#order").val(row.order_no).attr("disabled",true);
		getOrderConfigSelect(row.order_id||"",row.order_config_id,"#order_config",null,"id") ;
		$("#order_config").val(row.order_config_id).css("display","").attr("disabled",true);
		
		$("#order_config_span").hide();
		$("#customer_number").val(row.bus_number).attr("disabled",true);		
		
	}else{		
		$("#td_bus_lable").show();
		$("#td_bus").show();
		$("#td_customer_lable").hide();
		$("#td_customer").hide();
		$("#factory").attr("disabled",true);
		$("#order").val(row.order_no).attr("disabled",true);
		$("#order_config").hide();
		$("#order_config_span").html(row.order_config_name).show();
		$("#bus_number").val(row.bus_number).attr("disabled",true);
		$("#bus_number").attr("order_id",row.order_id);
		$("#bus_number").attr("order_config_id",row.order_config_id);
	}
	
	getFactorySelect("quality/prdRcdIn",row.factory_id,"#factory","","id");
	//$("#factory").val(row.factory_id);
	$("#check_node").val(row.test_node_id).attr("disabled",true);
	$("input[name='testResult'][value='"+result+"']").prop("checked",true); 
	$("input[name='testResult']").attr("disabled",true);
	//$("#order").html(row.order_desc);
	$("#test_date").val(row.test_date).attr("disabled",true);
	
	$("#btnShowTpl").hide();
	$(".divLoading").addClass("fade in").show();
	var detail_list=getProductRecordDetail(row.bus_number,row.test_node,row.factory_id,row.test_card_template_head_id);
	
	var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
		width:1300,
		height:550,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i>成品记录表查看</h4></div>",
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
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableDetail")){
		$('#tableDetail').DataTable().destroy();
		$('#tableDetail').empty();
	}
	drawTplDetailTable("#tableDetail",detail_list,false);
	$(".divLoading").hide();
}

function showEditPage(row){
	var result=0;
	if(row.result=='返工/返修合格'){
		result=1;
	}
	if(row.result=='让步放行'){
		result=2;
	}
	
	if(row.test_node=="车架"||row.test_node=="车身"||row.test_node=="五大片"||
			   row.test_node=="前围"||row.test_node=="后围"||row.test_node=="左围"||
			   row.test_node=="右围"||row.test_node=="顶围"||row.test_node=="后舱"||row.test_node=="顶电池包"){
		$("#td_bus_lable").hide();
		$("#td_bus").hide();
		$("#td_customer_lable").show();
		$("#td_customer").show();
		$("#factory").attr("disabled",true);
		$("#order").val(row.order_no).attr("disabled",true);
		$("#order").attr("order_id",row.order_id);
		getOrderConfigSelect(row.order_id||"",row.order_config_id,"#order_config",null,"id") ;
		$("#order_config").val(row.order_config_id).css("display","").attr("disabled",true);
		
		$("#order_config_span").hide();
		$("#customer_number").val(row.bus_number).attr("disabled",true);		
		
	}else{		
		$("#td_bus_lable").show();
		$("#td_bus").show();
		$("#td_customer_lable").hide();
		$("#td_customer").hide();
		$("#factory").attr("disabled",true);
		$("#order").val(row.order_no).attr("disabled",true);
		$("#order_config").hide();
		$("#order_config_span").html(row.order_config_name).show();
		$("#bus_number").val(row.bus_number).attr("disabled",true);
		$("#bus_number").attr("order_id",row.order_id);
		$("#bus_number").attr("order_config_id",row.order_config_id);
	}
	
	$("#btnShowTpl").hide();
	
	getFactorySelect("quality/prdRcdIn",row.factory_id,"#factory","","id");
	//$("#factory").val(row.factory_id);
	$("#check_node").val(row.test_node_id).attr("disabled",true);
	$("input[name='testResult'][value='"+result+"']").prop("checked",true); 
	$("input[name='testResult']").attr("disabled",false);
	//$("#order").html(row.order_desc);
	
	
	
	$("#test_date").val(row.test_date).attr("disabled",false);
	
	getWorkshopSelect('',$("#factory :selected").text(),"","#workshop_tmpl","","id");
	/*alert($("#workshop_tmpl").html());*/
	var workshop_all=getAllWorkshops("#workshop_tmpl","name");
	//alert(workshop_all)
	getWorkgroupSelectAll(workshop_all);
	
	$(".divLoading").addClass("fade in").show();
	var detail_list=getProductRecordDetail(row.bus_number,row.test_node,row.factory_id,row.test_card_template_head_id);
	if(detail_list.length>0){
		$("#btnShowTpl").attr("disabled",true);
	}
	var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
		width:1300,
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
					text: "保存",
					"class" : "btn btn-primary btn-minier",
					click: function() {
						ajaxSave(); 
					} 
				}
		]
	});
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableDetail")){
		$('#tableDetail').DataTable().destroy();
		$('#tableDetail').empty();
	}
	drawTplDetailTable("#tableDetail",detail_list,true);
	$(".divLoading").hide();
}

function getProductRecordDetail(bus_number,test_node,factory_id,test_card_template_head_id){
	detail_list=[];
	$.ajax({
		url:"getProductRecordDetail",
		async:false,
		type:"post",
		dataType:"json",
		data:{
			"bus_number":bus_number,
			"test_node":test_node,
			"factory_id":factory_id,
			"test_card_template_head_id":test_card_template_head_id
		},
		success:function(response){
			detail_list=response.data;
		}
	})	
	return detail_list;
}