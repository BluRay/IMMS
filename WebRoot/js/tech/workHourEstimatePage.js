var pageSize=1;
var table;
var table_height = $(window).height()-270;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("tech/workHourEstimatePage",'',"#search_factory","全部",'id');
		getOrderNoSelect("#search_order_no","#orderId");
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	$("#btnQuery").click(function() {
		ajaxQuery();
		return false;
	});
	
});

function ajaxQuery(){

	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,scrollX: "100%",orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"factory":$('#search_factory').find("option:selected").text(),
				"order_no":$("#search_order_no").val(),
				"task_content":$("#search_task_content").val(),
				"tech_order_no":$("#search_tech_order_no").val(),
				"status":$("#search_status").val(),
				"tech_date_start":$("#search_date_start").val(),
				"tech_date_end":$("#search_date_end").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getWorkHourEstimateList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		},
		columns: [
		            {"title":"技改任务","class":"center","data":"task_content","defaultContent": ""},
		            {"title":"变更单类型","class":"center","data":"tech_order_type_name","defaultContent": ""},
		            {"title":"技改单号","class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"技改单日期","class":"center","data":"tech_date","defaultContent": ""},
		            {"title":"订单","class":"center","data":"order_no","defaultContent": ""},
		            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
		            {"title":"单车总工时","class":"center","data":"single_time_total","defaultContent": ""},
		            {"title":"操作","class":"center","data": null,"id":"staff_number",
		            	"render": function ( data, type, row ) {
		                    return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"修改\" onclick='showConfigModal("+row.id+","+row.tech_task_id+",\""+row.factory+"\",\""+row.time_list+"\",\""+row.tech_list+"\")' style='color:blue;cursor: pointer;'></i>&nbsp;";
		                },
		            }
		          ],
	});
	
}

function showConfigModal(id,tech_task_id,factory,time_list,tech_list){
	re1 = new RegExp(":","g"); //定义正则表达式//第一个参数是要替换掉的内容，第二个参数"g"表示替换全部（global）。
	re2 = new RegExp(",","g");
	var jsonobj;
	if(time_list && time_list!=''){
		str = "{\""+time_list.replace(re1,"\":").replace(re2,",\"")+"}";
		jsonobj = JSON.parse(str);
	}
	$("#tableDepartment tbody").html("");
	$.each(getWorkshopOrg(), function(index, value){
		var tr=$("<tr />");
		$("<td />").html(value).appendTo(tr);
		var unitTimeInput=$("<input type=\"text\" class=\"unit_time\" style=\"text-align: center;ime-mode: disabled;\" onkeyup=\"gaga(this);\" onpaste=\"return false;\" >");
		if(jsonobj){
			for (key in jsonobj) {
				if(key==value){
					unitTimeInput.val(jsonobj[key]);
					break;
				}
			}
		}
		$("<td />").append(unitTimeInput).appendTo(tr);
		$("<td />").html("H").appendTo(tr);
		$("#tableDepartment tbody").append(tr);
	});
	var total_hour = 0;
	$(".unit_time").each(function(index, value){
		total_hour += Number($(this).val());
	});
	$("#config_totalhour").html(total_hour);
	
	$(".unit_time").blur(function(){
		total_hour = 0;
		$(".unit_time").each(function(index, value){
			total_hour += Number($(this).val());
		});
		$("#config_totalhour").html(total_hour);
	});
	
	$("#tech_task_id").val(tech_task_id);
	$("#tech_list").val(tech_list);
	$("#id").val(id);
	
	$("#configModal").removeClass('hide').dialog({
		resizable: false,
		title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 技改任务工时分配</h4></div>',
		title_html: true,
		width:'500px',
		modal: true,
		buttons: [{
					text: "取消",
					"class" : "btn btn-minier",
					click: function() {$( this ).dialog( "close" );} 
				},
				{
					text: "保存",
					id:"btn_ok",
					"class" : "btn btn-success btn-minier",
					click: function() {
						var time_list="";
						$("#tableDepartment tbody tr").each(function(e){
							var workshop = $(this).find("td").eq(0).html();
							var workhour = $(this).find("td").eq(1).find("input").eq(0).val();
							if(workhour==''){
							}else{
								time_list += workshop + ":" + workhour + ",";
							}
						});
						console.log("time_list = " + time_list);
						
						var total_hour = 0;
						var tech_list = $('#tech_list').val();
						var jsonobj;
						if(tech_list && tech_list!=''){
							str = "{\""+tech_list.replace(re1,"\":").replace(re2,",\"")+"}";
							jsonobj = JSON.parse(str);
						}
						
						if(time_list==""){
							$.ajax({
								url : "editTechWorkHourEstimate",
								dataType : "json",
								type : "post",
								data : {
									"time_list": "",
									"single_time_total": "",
									"id": $("#id").val(),
									"tech_task_id": $("#tech_task_id").val(),
									"total_hour" : "",
									"flg": 1
								},
								success : function(response) {
									$.gritter.add({
										title: '系统提示：',
										text: '<h5>操作成功！</h5>',
										class_name: 'gritter-info'
									});
									ajaxQuery();
								}
							});
							
						}else{
							time_list = time_list.substring(0,time_list.length-1);
							var jsonobj1;
							if(time_list && time_list!=''){
								str = "{\""+time_list.replace(re1,"\":").replace(re2,",\"")+"}";
								jsonobj1 = JSON.parse(str);
							}
							if(jsonobj){
								for (key in jsonobj) {
									for (key1 in jsonobj1) {
										if(key==key1){
											total_hour += parseFloat(jsonobj1[key1]) * parseFloat(jsonobj[key]);
										}
									}
								}
							}
							$.ajax({
								url : "editTechWorkHourEstimate",
								dataType : "json",
								type : "post",
								data : {
									"time_list": time_list,
									"single_time_total": $("#config_totalhour").html(),
									"id": $("#id").val(),
									"tech_task_id": $("#tech_task_id").val(),
									"total_hour" : total_hour,
									"flg": 0
								},
								success : function(response) {
									$("#configModal").dialog( "close" );
									$.gritter.add({
										title: '系统提示：',
										text: '<h5>操作成功！</h5>',
										class_name: 'gritter-info'
									});
									ajaxQuery();
								}
							});
							
						}
						
					} 
				}
			]
	});
}

function getWorkshopOrg() {
	var result = [];
	$.ajax({
		url : "../common/getWorkshopSelect_Key",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			$.each(response.data, function(index, value) {
				result.push(value.name);
			});
		}
	});
	return result;
}

