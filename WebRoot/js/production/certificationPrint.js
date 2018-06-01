var buslist=[];
var dateCheck = true;
$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect("production/certificationPrint","","#search_factory","全部","id")
		//$("#search_factory").attr("disabled","disabled");
		getOrderNoSelect("#search_order_no","#orderId");
		dateCheck = true;
	}

	
	//导出功能
	$(document).on("click",".buttons-excel",function(){
		exportExcelTableHtml();
		//ajaxQuery(0,'all');
		//$("#tableResult tbody").children("tr").children("td:hidden").remove();
		return false;
	});
	
	$("#btnQuery").click (function () {
		//alert($("#search_bus_number").val().trim().length);
		if(($("#search_order_no").val()=='')&&($("#search_bus_number").val().trim().length==0)){
			alert("请输入订单编号或者指定车号！");
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("#btnBuslist").click(function(){
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:400,
			height:280,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 指定车号</h4></div>",
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
						if($("#search_bus_number").val().trim().length>0){
							ajaxQuery();
						}						
						$("#search_bus_number").val("");
						$( this ).dialog( "close" ); 
					} 
				}
			]
		});
	});
	
	//全选反选
	$(document).on("click","#checkall",function(){
		//alert("aa");
		if ($('#checkall').is(":checked")) {
			//alert("选中")
			check_All_unAll("#tableResult",true);
		}
		if($('#checkall').is(":checked")==false){
			
			check_All_unAll("#tableResult",false);
		}
		
	})
	
	$("#btnImport").click(function(){
		
		var datalist=getCheckedBus();
		if(datalist.length>0){
			$(".divLoading").addClass("fade in").show();
			if(!dateCheck){
				alert("底盘生产日期及整车生产日期不能超过当天日期！");
				return false;
			}
			/**
			$.ajax({
			    url: "certificatePrint",
			    dataType: "json",
				type: "post",
			    data: {
			    	"conditions":JSON.stringify(datalist)
			    },
			    success:function(){
			    	$(".divLoading").hide();
			    	ajaxQuery();
			    	alert("传输成功！");		    	
			    },
			    error:function(){
			    	$(".divLoading").hide();
			    	alert("系统异常！");
			    }
			    })**/
			   
		}else{
			alert("请选择需要传输打印的车号！");
		}
		
	});
	
	
})

function ajaxQuery(){
	$("#checkall").attr("checked",false);
	
		$("#tableResult").DataTable({
			serverSide: true,
			dom: 'Bfrtip',
			lengthMenu: [
			             [ 20, 50, 100 ],
			             [ '显示20行', '显示50行', '显示100行' ]
			         ],
		    buttons: [
		        {extend:'excelHtml5',enabled:false,title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
		        /*{extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},*/
		        {extend:'pageLength',text:'显示20行'}
		       
		    ],
			paiging:true,
			ordering:false,
			searching: false,
			bAutoWidth:false,
		/*	fixedColumns:   {
	            leftColumns: 2,
	            rightColumns:0
	        },*/
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
						"factory_id": $('#search_factory').val(),
				    	"order_no": $('#search_order_no').val(),
				    	"bus_number":$('#search_bus_number').val(),
				    	"transfer_status":$("#search_status").val()
					};
	            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
	            param.start = data.start;//开始的记录序号
	            param.page = (data.start / data.length)+1;//当前页码

	            $.ajax({
	                type: "post",
	                url: "getCertificationList",
	                cache: false,  //禁用缓存
	                aysnc:false,
	                data: {conditions:JSON.stringify(param)},  //传入组装的参数
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
	                    var head_width=$(".dataTables_scroll").width();
	                	$(".dataTables_scrollBody").scrollTop(10);
	                	//alert($(".dataTables_scrollBody").scrollTop());

	                	if($(".dataTables_scrollBody").scrollTop()>0){
	                		$(".dataTables_scrollHead").css("width",head_width-20);
	                		$(".dataTables_scrollBody").scrollTop(0);
	                	}
	                }
	            });
			
			},
			columns: [
			          	 {"title":"<input type='checkbox' id='checkall' name='check'></input>","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	var check_html="";		 
		            	if(!checkInfoEmpty(row)){
		            		check_html="<input id=\"check_"+row.bus_number+"\" disabled=\"disabled\" type=\"checkbox\">";
		            	}else{
		            		check_html="<input id=\"check_"+row.bus_number+"\" type=\"checkbox\">";
		        		}
		            	return check_html;
			          	 }},
			            {"title":"车号","class":"center","data":"bus_number","defaultContent": "","width":"150"},
			            {"title":"VIN","class":"center","data":"vin","defaultContent": "","width":"150"},
			            {"title":"整车资质地","class":"center","width":"90","data":"zc_zzd","defaultContent": ""},		            
			            {"title":"底盘资质地","class":"center","width":"90","data": "dp_zzd","defaultContent": ""},
			            {"title":"底盘型号","class":"center","width":"120","data":"chassis_model","defaultContent": ""},
			            {"title":"整车型号","class":"center","width":"120","data":"vehicle_model","defaultContent": ""},
			            {"title":"电机型号","class":"center","width":"90","data": "motor_model","defaultContent": ""},
			            {"title":"底盘生产日期","class":"center","width":"125","data":"dp_production_date","defaultContent": "","render":function(data,type,row){
			            	return (!data||data.trim().length==0)?'<a href="javascript:window.parent.addTabs({id:\'车辆信息维护\',title:\'车辆信息维护\',close: \'true\',url: \'/BMS/production/busInfoMtn?bus_number=' + row.bus_number + '\'});">请维护底盘生产日期</a>':data;
			            }},		            
			            {"title":"整车生产日期","class":"center","width":"125","data":"productive_date","defaultContent": "","render":function(data,type,row){
			            	return (!data||data.trim().length==0)?'<a href="javascript:window.parent.addTabs({id:\'车辆信息维护\',title:\'车辆信息维护\',close: \'true\',url: \'/BMS/production/busInfoMtn?bus_number=' + row.bus_number + '\'});">请维护底盘生产日期</a>':data;
			            }},		            
			            {"title":"电机号（左/右）","class":"center","width":"130","data": "motor_number","defaultContent": ""},
			            {"title":"颜色","class":"center","width":"80","data":"bus_color","defaultContent": ""},
			            {"title":"轮胎规格","class":"center","width":"100","data":"tire_type","defaultContent": ""},
			            {"title":"座位数","class":"center","width":"60","data": "bus_seats","defaultContent": ""},
			            {"title":"核定载客人数","class":"center","width":"90","data":"passengers","defaultContent": ""},		            
			            {"title":"弹簧片数","class":"center","width":"70","data":"spring_num","defaultContent": ""},		            
			            {"title":"备注项","class":"center","data": "hgz_note","defaultContent": ""},
			            {"title":"传输人","class":"center","data": "hgz_printer","defaultContent": ""},
			            {"title":"传输时间","class":"center","data": "hgz_print_date","defaultContent": ""}
			            
			          ]		
		});
		$("#tableResult_info").addClass('col-xs-6');
		$("#tableResult_paginate").addClass('col-xs-6');
		$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}

function checkInfoEmpty(row){
	var flag=true;
	if((row.productive_date == null)||(row.vin == null)||(row.productive_date == "")||(row.vin == "")){
		flag=false;
	}
	if((row.zc_zzd == null)||(row.dp_zzd == null)||(row.zc_zzd == "")||(row.dp_zzd == "")){
		flag=false;
	}
	if((row.vehicle_model == null)||(row.chassis_model == null)||(row.vehicle_model == "")||(row.chassis_model == "")){
		flag=false;
	}
	if((row.motor_model == null)||(row.motor_number == null)||(row.motor_model == "")||(row.motor_number == "")){
		flag=false;
	}
	if((row.dp_production_date == null)||(row.bus_color == null)||(row.dp_production_date == "")||(row.bus_color == "")||(row.bus_color == "暂无")){
		flag=false;
	}
	if((row.tire_type == null)||(row.hgz_note == null)||(row.tire_type == "")||(row.hgz_note == "")){
		flag=false;
	}
	return flag;
}

function getCheckedBus(){
	var arrChk=$("#tableResult tbody :checked");
	dateCheck = true;
	var LSTR_ndate=new Date(); 
	var LSTR_MM=LSTR_ndate.getMonth()+1;
	var LSTR_DD=LSTR_ndate.getDate();
	LSTR_MM=parseInt(LSTR_MM) >= 10?LSTR_MM:("0"+LSTR_MM);
	LSTR_DD=parseInt(LSTR_DD) >= 10?LSTR_DD:("0"+LSTR_DD);
	var curDate = LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-" + LSTR_DD;
	console.log(curDate);
	
	//alert(arrChk.length)
	var checked_buslist=[];
    $(arrChk).each(function(){
    	var tr=$(this).parent("td").parent("tr");
    	var bus_obj=$("#tableResult").dataTable().fnGetData($(tr));
    	bus_obj.order_no=$("#search_order_no").val();
    	
    	console.log("-->dp_production_date = " + bus_obj.dp_production_date);
    	console.log("-->productive_date = " + bus_obj.productive_date);
    	if(bus_obj.dp_production_date > curDate){
    		dateCheck = false;
    	}
    	if(bus_obj.productive_date > curDate){
    		dateCheck = false;
    	}
    	
    	//console.log(dateCheck);
    	checked_buslist.push(bus_obj); 
    	
    }); 
    return checked_buslist;
}

function exportExcelTableHtml(){
	/**
	 * 获取全部数据
	 */
	$(".divLoading").addClass("fade in").show();

	var result=null;
	var param ={
			"draw":1,
			"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"bus_number":$('#search_bus_number').val(),
	    	"transfer_status":$("#search_status").val()
		};
	
	$.ajax({
        type: "post",
        url: "getCertificationList",
        cache: false,  //禁用缓存
        async:false,
        data: {conditions:JSON.stringify(param)},  //传入组装的参数
        dataType: "json",
        success: function (response) {       	
        	result=response.data;       	    	
        }
    });
	
	
	
	/**
	 * 封装excel数据
	 */
	var rowsGroup=[];
	var excel_html="";
	var columns=[
			            {"title":"车号","class":"center","data":"bus_number","defaultContent": "","width":"150"},
			            {"title":"VIN","class":"center","data":"vin","defaultContent": "","width":"150"},
			            {"title":"整车资质地","class":"center","width":"90","data":"zc_zzd","defaultContent": ""},		            
			            {"title":"底盘资质地","class":"center","width":"90","data": "dp_zzd","defaultContent": ""},
			            {"title":"底盘型号","class":"center","width":"120","data":"chassis_model","defaultContent": ""},
			            {"title":"整车型号","class":"center","width":"120","data":"vehicle_model","defaultContent": ""},
			            {"title":"电机型号","class":"center","width":"90","data": "motor_model","defaultContent": ""},
			            {"title":"底盘生产日期","class":"center","width":"125","data":"dp_production_date","defaultContent": ""},		            
			            {"title":"整车生产日期","class":"center","width":"125","data":"productive_date","defaultContent": ""},		            
			            {"title":"电机号（左/右）","class":"center","width":"130","data": "motor_number","defaultContent": ""},
			            {"title":"颜色","class":"center","width":"80","data":"bus_color","defaultContent": ""},
			            {"title":"轮胎规格","class":"center","width":"100","data":"tire_type","defaultContent": ""},
			            {"title":"座位数","class":"center","width":"60","data": "bus_seats","defaultContent": ""},
			            {"title":"核定载客人数","class":"center","width":"90","data":"passengers","defaultContent": ""},		            
			            {"title":"弹簧片数","class":"center","width":"70","data":"spring_num","defaultContent": ""},		            
			            {"title":"备注项","class":"center","data": "hgz_note","defaultContent": ""},
			            {"title":"传输人","class":"center","data": "hgz_printer","defaultContent": ""},
			            {"title":"传输时间","class":"center","data": "hgz_print_date","defaultContent": ""}
			            
			          ]	;
	
	/**
	 * 创建table
	 */
	var table=document.createElement("table");
	table.id="tb_excel";
	table.style.display="none";
	/**
	 * 创建table head
	 */
	var table_head=$("<tr />");
	$.each(columns,function(i,column){
		var th=$("<th />");
		th.attr("class",column.class);
		th.attr("width",column.width);
		th.html(column.title);
		$(table_head).append(th);
	})
	$(table).append(table_head);
	
	var warp = document.createDocumentFragment();//创建文档碎片节点,最后渲染该碎片节点，减少浏览器渲染消耗的资源
	
	var data_process={};
	data_process.result=result;
	data_process.columns=columns;
	data_process.rowsGroup=rowsGroup;
	

    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    //获取带"/"的项目名，如：/uimcardprj  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    var baseRoot = localhostPaht+projectName;  
	
	var worker=new Worker(baseRoot+"/js/hr/mergeTableCell.js")
	worker.postMessage(data_process);
	worker.onmessage=function(event){
		
	var trs_data=event.data;
	$.each(trs_data,function(i,tr_obj){
		var tr=$("<tr />");
		$.each(tr_obj,function(j,td_obj){
			var td=$("<td />");
			td.attr("class",td_obj.class);
			td.attr("id",td_obj.id);
			td.attr("rowspan",td_obj.rowspan);
			td.attr("width",td_obj.width);
			td.html(td_obj.html);

			if(!td_obj.hidden){
				$(td).appendTo(tr)
			}
			
		});
		$(warp).append(tr);
	})
	
	$(table).append($(warp));
		
		
	document.body.appendChild(table);
		
	/**
	 * 导出excel
	 */
	htmlToExcel("tb_excel", "", "","合格证传输","合格证传输");
	
	
	//导出后清除表格
	document.body.removeChild(table);
	worker.terminate();
	$(".divLoading").hide();	
	}

	  
}
