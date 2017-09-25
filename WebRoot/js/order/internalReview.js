var pageSize=1;
var table;
var select_str = "";
var select_str1 = "";
var select_str2 = "";
var cur_year="";
var dt;

$(document).ready(function(){
	getBusNumberSelect('#nav-search-input');
	cur_year = new Date().getFullYear();
	$("#search_productive_year").val(cur_year)
	//getFactorySelect();
	getFactorySelect("order/internalReview",'',"#search_factory","全部",'id');
	getOrderNoSelect("#search_order_no","#orderId");
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	//评审页面进入到评审查询页面，设置查询条件
	var message = getParamValue("message");
	if(message=="success"){
    	$.gritter.add({
			title: '系统提示：',
			text: '<h5>评审提交成功！</h5>',
			class_name: 'gritter-info'
		});
    }
	ajaxQuery();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
});


function ajaxQuery(){
	dt=$("#tableOrder").DataTable({
		serverSide: true,
//		fixedColumns:   {
//            leftColumns: 3,
//            rightColumns:3
//        },
        rowsGroup:[0,1,2,3,4,5],
		paiging:true,
		ordering:false,
		searching: false,
		autoWidth:false,
		destroy: true,
		scrollY: $(window).height()-245,
		scrollX: $(window).width(),
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
				"orderNo":$("#search_order_no").val(),
				"orderId":$("#search_order_id").val(),
				"reviewStatus":$("#search_review_status").val(),
				"actYear":$("#search_productive_year").val(),
				"factory":getAllFromOptions("#search_factory","val"),
				"orderColumn":"order_no"
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "/BMS/order/review/showOrderReviewList",
                cache: true,  //禁用缓存
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
                 // settings.rowsGroup=[0,1,2,3,4,5];
                   //alert("分页调用");
                    callback(returnData);
                }
            });
		
		},
		columns: [
		            {"title":"订单编号",width:'100',"class":"center","data":"order_no",/*"render": function ( data, type, row ) {
	                    return "<input style='border:0;width:100%;height:100%;background-color:transparent;text-align:center;' value='"+data+"' />";
	                },*/"defaultContent": ""},
		            {"title":"订单描述",width:'180',"class":"center","data":"order_name_str","defaultContent": ""},
		            //{"title":"客户","class":"center","data":"customer","defaultContent": ""},
		            {"title":"生产工厂",width:'100',"class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"生产数量",width:'80',"class":"center","data": "production_qty","defaultContent": ""},
		            {"title":"生产年份",width:'80',"class":"center","data":"productive_year","defaultContent": ""},
		            {"title":"订单交期",width:'100',"class":"center","data": "delivery_date","defaultContent": ""},
		            //{"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},		            
		            {"title":"订单状态","class":"center","data":"status","render":function(data,type,row){
		            	return data=="0"?"未开始":(data=="1"?"生产中":"已完成")},"defaultContent":""
		            },
		            {"title":"评审状态",width:'80',"class":"center","data":"review_status","render":function(data,type,row){
		            	var result="";
		            	if(data=="2"){
		            		result="已评审";
		            	}else if(data=="1"){
		            		result="<a onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\");' style='cursor:pointer'>评审中</a>"
		            	}else{
		            		result="未评审";
		            	}
		            	return result},"defaultContent":""
		            },
		            {"title":"评审结果",width:'80',"class":"center","data":"review_status","render":function(data,type,row){
		            	return data=="2"? "<i class=\"glyphicon glyphicon-search bigger-110 editorder\" onclick = 'ajaxSearch(" + row.reviewId+ ");' style='color:green;cursor: pointer;'></i>": ""},
		            	"defaultContent": ""
		            },
		            {"title":"评审",width:'60',"class":"center","data":"review_status","render":function(data,type,row){
		            	return row.permission==true ? 
		            			(data!="2"? "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" onclick ='ajaxReview(\""+ row.factory_order_id+"\",\""+row.factory_id+"\");' style='color:green;cursor: pointer;'></i>"
		            					: "") : ""},
		            	"defaultContent": ""},
		            ],
		
	});
}
function ajaxSearch(id){
	$.ajax({
		url:"/BMS/order/review/getOrderReviewById",
		type: "post",
		data:{
			"id":id
		},
		dataType:"json",
		success:function(response){
			$('#tableData tr').unbind("mouseover mouseout");
			var data=response.data;
			$('#partsonlineDate').text(data.partsonline_date);
			$('#weldingonlineDate').text(data.weldingonline_date);
			$('#paintonlineDate').text(data.paintonline_date);
			$('#chassisonlineDate').text(data.chassisonline_date);
			$('#assemblyonlineDate').text(data.assemblyonline_date);
			$("#warehousingDate").text(data.warehousing_date);
			$('#modelexportDate').text(data.modelexport_date);
			$('#detaildemandNode').text(data.detaildemand_node);
			$('#bomdemandNode').text(data.bomdemand_node);
			$('#drawingexportDate').text(data.drawingexport_date);
			$('#sopdemandNode').text(data.sopdemand_node);
			$("#sipdemandNode").text(data.sipdemand_node);
			$("#applyInfo").text(data.apply_info);
			$('#configTable').text(data.config_table);
			$('#proximatematter').text(data.proximatematter);
			$('#modeljudging').text(data.modeljudging);
			$('#drawingearlierjudging').text(data.drawingearlierjudging);
			$('#purchasedetail').text(data.purchasedetail);
			$("#mintechInfo").text(data.mintech_info);
			$("#technical_operator").text(data.technical_operator);
			$("#technical_create_time").text(data.technical_create_time);
			$("#technicaldatanode").text(data.technicaldatanode);
			$('#technicsNode').text(data.technics_node);
			$('#technicsInfo').text(data.technics_info);
			$("#technology_operator").text(data.technology_operator);
			$("#technology_create_time").text(data.technology_create_time);
			$('#qualityNode').text(data.quality_node);
			$('#qualityInfo').text(data.quality_info);
			$("#quality_operator").text(data.quality_operator);
			$("#quality_create_time").text(data.quality_create_time);
			$('#factoryNode').text(data.factory_node);
			$("#factoryInfo").text(data.factory_info);
			$("#factory_operator").text(data.factory_operator);
			$("#factory_create_time").text(data.factory_create_time);
			$('#materialcontrolNode').text(data.materialcontrol_node);
			$('#materialcontrolInfo').text(data.materialcontrol_info);
			$("#planning_operator").text(data.planning_operator);
			$("#planning_create_time").text(data.planning_create_time);
			$('#plandepNode').text(data.plandep_node);
			$('#plandepInfo').text(data.plandep_info);
			$("#plandep_operator").text(data.plandep_operator);
			$("#plandep_create_time").text(data.plandep_create_time);
			$('#revisionpartsonlineDate').text(data.revisionpartsonline_date);
			$("#revisionweldingonlineDate").text(data.revisionweldingonline_date);
			$('#revisionpaintonlineDate').text(data.revisionpaintonline_date);
			$('#revisionchassisonlineDate').text(data.revisionchassisonline_date);
			$('#revisionassemblyonlineDate').text(data.revisionassemblyonline_date);
			$('#revisionwarehousingDate').text(data.revisionwarehousing_date);
			$('#revisiondetailNode').text(data.revisiondetail_node);
			$("#revisionbomNode").text(data.revisionbom_node);
			$('#revisionsopNode').text(data.revisionsop_node);
			$("#revisionsipNode").text(data.revisionsip_node);
			$('#busType').text(data.bus_type_code);
			$("#productionQty").text(data.production_qty);
			$('#factoryName').text(data.factory_name);
			$("#order_type").text(data.order_type);
			$("#delveryDate").text(data.delivery_date);
			$("#capacity").text(data.capacity);
			$("#customer").text(data.customer);
		}
	})
	var dialog = $( "#dialog-edit" ).removeClass('hide').dialog({
	width:950,
	height:550,
	modal: true,
	title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i> 评审结果</h4></div>',
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
			text: "导出",
			"class" : "btn btn-primary btn-minier",
			click: function() { 
				$('#tableData').tableExport({type:'excel',escape:'false'});
			} 
		}
	]
});
}
function ajaxReview(factoryOrderId,factoryId){
	/*
	 * orderId:工厂订单ID;factoryId:工厂ID;
	 */
	$.ajax({
		url: "/BMS/order/review/getReviewResult",
		dataType: "json",
		data: {
			"factoryOrderId" : factoryOrderId,
			"factoryId":factoryId
			},
		error: function () {},
		success: function (response) {
			if(response.bmsOrderReviewResults==null){ // 评审未发起
				// 查看是否有发起评审权限
				var isPermission=isApplyPermission(factoryId,"start");
				var url="";
				var processId=getProcessByName("orderReview");
				if(isPermission==false){ // 暂未发起，其他评审节点不能进入页面
					$.gritter.add({
						title: '系统提示：',
						text: '<h5></h5><br>'+"暂未发起评审,请等待",
						class_name: 'gritter-info'
					});
				}else{  // 已发起，其他评审节点进入页面url
					url="/BMS/snaker/flow/all?processId="+processId+"&processName=orderReview&reviewOrderId="+factoryOrderId+"&factoryId="+factoryId; // +"&orderNo="+orderNo+""
					window.open(url,"_self");
				}
				
			}else{ // // 评审已发起
				var isPermission=isApplyPermission(factoryId);
				if(isPermission==false){
					$.gritter.add({
						title: '系统提示：',
						text: '<h5></h5><br>'+"您没有操作评审权限",
						class_name: 'gritter-info'
					});
				}else{
					var id=response.bmsOrderReviewResults.id;
					var wfOrderId=response.bmsOrderReviewResults.wfOrderId;
					var processId=response.bmsOrderReviewResults.wfProcessId;
					var taskId=getTaskByOrderId(wfOrderId);
					var url="/BMS/snaker/flow/all?processId="+processId+"&orderId="+wfOrderId+"&factoryId="+factoryId+"&reviewOrderId="+factoryOrderId+"";
					
					if(taskId!=null && taskId!="" && taskId!=undefined){
						var taskActor=getTaskActorId(taskId);
						if(taskActor!=""){
							url+="&taskId="+taskId+"&reviewResultId="+id;
						}
					}
					window.open(url,"_self");
				}
			}
		}
	})
}
function getProcessByName(processName){
	var processId="";
	$.ajax({
		url: "/BMS/order/review/getProcessByName",
		dataType: "json",
		async: false,
		data: {
			"processName" : processName,
			},
		error: function () {},
		success: function (response) {
			
			if(response.processId!=null){
				processId=response.processId;
			}
		}
	})
	return processId;
}
function getTaskByOrderId(orderId){
	var taskId="";
	$.ajax({
		url: "/BMS/order/review/getTaskByOrderId",
		dataType: "json",
		async: false,
		data: {
			"orderId" : orderId,
			},
		error: function () {},
		success: function (response) {
			
			if(response.taskId!=null){
				taskId=response.taskId;
			}
		}
	})
	return taskId;
}
function getTaskActorId(taskId){
	var taskActor="";
	$.ajax({
		url: "/BMS/order/review/getTaskActorId",
		dataType: "json",
		async: false,
		data: {
			"taskId" : taskId,
			},
		error: function () {},
		success: function (response) {
			
			if(response.taskActor!=null){
				taskActor=response.taskActor;
			}
		}
	})
	return taskActor;
}
function isApplyPermission(factoryId,type){
	var isPermission="";
	$.ajax({
		url: "/BMS/order/review/isApplyPermission",
		dataType: "json",
		async: false,
		data: {
			"factoryId" : factoryId,
			"type":type
			},
		error: function () {},
		success: function (response) {
			
			if(response.isPermission!=null){
				isPermission=response.isPermission;
			}
		}
	})
	return isPermission;
}
function pdfForElement(id) {
	  function ParseContainer(cnt, e, p, styles) {
	    var elements = [];
	    var children = e.childNodes;
	    if (children.length != 0) {
	      for (var i = 0; i < children.length; i++) p = ParseElement(elements, children[i], p, styles);
	    }
	    if (elements.length != 0) {
	      for (var i = 0; i < elements.length; i++) cnt.push(elements[i]);
	    }
	    return p;
	  }

	  function ComputeStyle(o, styles) {
	    for (var i = 0; i < styles.length; i++) {
	      var st = styles[i].trim().toLowerCase().split(":");
	      if (st.length == 2) {
	        switch (st[0]) {
	          case "font-size":
	            {
	              o.fontSize = parseInt(st[1]);
	              break;
	            }
	          case "text-align":
	            {
	              switch (st[1]) {
	                case "right":
	                  o.alignment = 'right';
	                  break;
	                case "center":
	                  o.alignment = 'center';
	                  break;
	              }
	              break;
	            }
	          case "font-weight":
	            {
	              switch (st[1]) {
	                case "bold":
	                  o.bold = true;
	                  break;
	              }
	              break;
	            }
	          case "text-decoration":
	            {
	              switch (st[1]) {
	                case "underline":
	                  o.decoration = "underline";
	                  break;
	              }
	              break;
	            }
	          case "font-style":
	            {
	              switch (st[1]) {
	                case "italic":
	                  o.italics = true;
	                  break;
	              }
	              break;
	            }
	        }
	      }
	    }
	  }

	  function ParseElement(cnt, e, p, styles) {
	    if (!styles) styles = [];
	    if (e.getAttribute) {
	      var nodeStyle = e.getAttribute("style");
	      if (nodeStyle) {
	        var ns = nodeStyle.split(";");
	        for (var k = 0; k < ns.length; k++) styles.push(ns[k]);
	      }
	    }

	    switch (e.nodeName.toLowerCase()) {
	      case "#text":
	        {
	          var t = {
	            text: e.textContent.replace(/\n/g, "")
	          };
	          if (styles) ComputeStyle(t, styles);
	          p.text.push(t);
	          break;
	        }
	      case "b":
	      case "strong":
	        {
	          //styles.push("font-weight:bold");
	          ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
	          break;
	        }
	      case "u":
	        {
	          //styles.push("text-decoration:underline");
	          ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
	          break;
	        }
	      case "i":
	        {
	          //styles.push("font-style:italic");
	          ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
	          //styles.pop();
	          break;
	          //cnt.push({ text: e.innerText, bold: false });
	        }
	      case "span":
	        {
	          ParseContainer(cnt, e, p, styles);
	          break;
	        }
	      case "br":
	        {
	          p = CreateParagraph();
	          cnt.push(p);
	          break;
	        }
	      case "table":
	        {
	          var t = {
	            table: {
	              widths: [],
	              body: []
	            }
	          }
	          var border = e.getAttribute("border");
	          var isBorder = false;
	          if (border)
	            if (parseInt(border) == 1) isBorder = true;
	          if (!isBorder) t.layout = 'noBorders';
	          ParseContainer(t.table.body, e, p, styles);

	          var widths = e.getAttribute("widths");
	          if (!widths) {
	            if (t.table.body.length != 0) {
	              if (t.table.body[0].length != 0)
	                for (var k = 0; k < t.table.body[0].length; k++) t.table.widths.push("*");
	            }
	          } else {
	            var w = widths.split(",");
	            for (var k = 0; k < w.length; k++) t.table.widths.push(w[k]);
	          }
	          cnt.push(t);
	          break;
	        }
	      case "tbody":
	        {
	          ParseContainer(cnt, e, p, styles);
	          //p = CreateParagraph();
	          break;
	        }
	      case "tr":
	        {
	          var row = [];
	          ParseContainer(row, e, p, styles);
	          cnt.push(row);
	          break;
	        }
	      case "td":
	        {
	          p = CreateParagraph();
	          var st = {
	            stack: []
	          }
	          st.stack.push(p);

	          var rspan = e.getAttribute("rowspan");
	          if (rspan) st.rowSpan = parseInt(rspan);
	          var cspan = e.getAttribute("colspan");
	          if (cspan) st.colSpan = parseInt(cspan);

	          ParseContainer(st.stack, e, p, styles);
	          cnt.push(st);
	          break;
	        }
	      case "div":
	      case "p":
	        {
	          p = CreateParagraph();
	          var st = {
	            stack: []
	          }
	          st.stack.push(p);
	          ComputeStyle(st, styles);
	          ParseContainer(st.stack, e, p);

	          cnt.push(st);
	          break;
	        }
	      default:
	        {
	          console.log("Parsing for node " + e.nodeName + " not found");
	          break;
	        }
	    }
	    return p;
	  }

	  function ParseHtml(cnt, htmlText) {
	    var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
	    var p = CreateParagraph();
	    for (var i = 0; i < html.length; i++) ParseElement(cnt, html.get(i), p);
	  }

	  function CreateParagraph() {
	    var p = {
	      text: []
	    };
	    return p;
	  }
	  content = [];
	  ParseHtml(content, document.getElementById(id).outerHTML);
	  return pdfMake.createPdf({
	    content: content
	  });
	}

//function ParseContainer(cnt, e, p, styles) {
//	var elements = [];
//	var children = e.childNodes;
//	if (children.length != 0) {
//	    for (var i = 0; i < children.length; i++) p = ParseElement(elements, children[i], p, styles);
//	}
//	if (elements.length != 0) {            
//	    for (var i = 0; i < elements.length; i++) cnt.push(elements[i]);
//	}
//	return p;
//	}
//
//	function ComputeStyle(o, styles) {
//	for (var i = 0; i < styles.length; i++) {
//	    var st = styles[i].trim().toLowerCase().split(":");
//	    if (st.length == 2) {
//	        switch (st[0]) {
//	            case "font-size":{
//	                o.fontSize = parseInt(st[1]);
//	                break;
//	            }
//	            case "text-align": {
//	                switch (st[1]) {
//	                    case "right": o.alignment = 'right'; break;
//	                    case "center": o.alignment = 'center'; break;
//	                }
//	                break;
//	            }
//	            case "font-weight": {
//	                switch (st[1]) {
//	                    case "bold": o.bold = true; break;
//	                }
//	                break;
//	            }
//	            case "text-decoration": {
//	                switch (st[1]) {
//	                    case "underline": o.decoration = "underline"; break;
//	                }
//	                break;
//	            }
//	            case "font-style": {
//	                switch (st[1]) {
//	                    case "italic": o.italics = true; break;
//	                }
//	                break;
//	            }
//	        }
//	    }
//	}
//	}
//
//	function ParseElement(cnt, e, p, styles) {
//	if (!styles) styles = [];
//	if (e.getAttribute) {
//	    var nodeStyle = e.getAttribute("style");
//	    if (nodeStyle) {
//	        var ns = nodeStyle.split(";");
//	        for (var k = 0; k < ns.length; k++) styles.push(ns[k]);
//	    }
//	}
//
//	switch (e.nodeName.toLowerCase()) {
//	    case "#text": {
//	        var t = { text: e.textContent.replace(/\n/g, "") };
//	        if (styles) ComputeStyle(t, styles);
//	        p.text.push(t);
//	        break;
//	    }
//	    case "b":case "strong": {
//	        //styles.push("font-weight:bold");
//	        ParseContainer(cnt, e, p, styles.concat(["font-weight:bold"]));
//	        break;
//	    }
//	    case "u": {
//	        //styles.push("text-decoration:underline");
//	        ParseContainer(cnt, e, p, styles.concat(["text-decoration:underline"]));
//	        break;
//	    }
//	    case "i": {
//	        //styles.push("font-style:italic");
//	        ParseContainer(cnt, e, p, styles.concat(["font-style:italic"]));
//	        //styles.pop();
//	        break;
//	        //cnt.push({ text: e.innerText, bold: false });
//	    }
//	    case "span": {
//	        ParseContainer(cnt, e, p, styles);
//	        break;
//	    }
//	    case "br": {
//	        p = CreateParagraph();
//	        cnt.push(p);
//	        break;
//	    }
//	    case "table":
//	        {
//	            var t = {
//	                table: {
//	                    widths: [],
//	                    body: []
//	                }
//	            }
//	            var border =1;// e.getAttribute("border");
//	            var isBorder = false;
//	            if (border) if (parseInt(border) == 1) isBorder = true;
//	            if (!isBorder) t.layout = 'noBorders';
//	            ParseContainer(t.table.body, e, p, styles);
//
//	            var widths = e.getAttribute("widths");
//	            if (!widths) {
//	                if (t.table.body.length != 0) {
//	                    if (t.table.body[0].length != 0) for (var k = 0; k < t.table.body[0].length; k++) t.table.widths.push("*");
//	                }
//	            } else {
//	                var w = widths.split(",");
//	                for (var k = 0; k < w.length; k++) t.table.widths.push(w[k]);
//	            }
//	            cnt.push(t);
//	            break;
//	        }
//	    case "tbody": {
//	        ParseContainer(cnt, e, p, styles);
//	        //p = CreateParagraph();
//	        break;
//	    }
//	    case "tr": {
//	        var row = [];
//	        ParseContainer(row, e, p, styles);
//	        cnt.push(row);
//	        break;
//	    }
//	    case "td": {
//	        p = CreateParagraph();
//	        var st = {stack: []}
//	        st.stack.push(p);
//
//	        var rspan = e.getAttribute("rowspan");
//	        if (rspan) st.rowSpan = parseInt(rspan);
//	        var cspan = e.getAttribute("colspan");
//	        if (cspan) st.colSpan = parseInt(cspan);
//
//	        ParseContainer(st.stack, e, p, styles);
//	        cnt.push(st);
//	        break;
//	    }
//	    case "div":case "p": {
//	        p = CreateParagraph();
//	        var st = {stack: []}
//	        st.stack.push(p);
//	        ComputeStyle(st, styles);
//	        ParseContainer(st.stack, e, p);
//
//	        cnt.push(st);
//	        break;
//	    }
//	    default: {
//	        console.log("Parsing for node " + e.nodeName + " not found");
//	        break;
//	    }
//	}
//	return p;
//	}
//
//	function ParseHtml(cnt, htmlText) {
//	var html = $(htmlText.replace(/\t/g, "").replace(/\n/g, ""));
//	var p = CreateParagraph();
//	for (var i = 0; i < html.length; i++) ParseElement(cnt, html.get(i), p);
//	}
//
//	function CreateParagraph() {
//	var p = {text:[]};
//	return p;
//	}


