var cur_year="";
var pageSize=10;
var extArray = new Array(".xls");
var json_configList=null;
$(document).ready(function(){
	initPage();
	$(".btnQuery").on("click",function(){
		ajaxQuery();
	}); 
	
});

function initPage(){
	cur_year = new Date().getFullYear();
	cur_year = new Date().getFullYear();
	$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
	getOrderNoSelect("#search_order_no","#orderId");
	ajaxQuery();
}

function ajaxQuery(){
	$("#tableOrder").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 1,
            rightColumns:1
        },
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: "1500px",
		/*scrollCollapse: true,*/
		pageLength: pageSize,
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
				"orderName":$("#search_order_name").val(),
				"actYear":$("#search_productive_year").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "showOrderConfigList",
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
		            {"title":"订单编号","class":"center","data":"order_no","defaultContent": ""},
		            {"title":"订单描述","class":"center","data":"order_name_str","defaultContent": ""},
		            {"title":"生产年份","class":"center","data":"productive_year","defaultContent": ""},
		            {"title":"订单交期","class":"center","data": "delivery_date","defaultContent": ""},
		            {"title":"订单数量","class":"center","data":"order_qty","defaultContent": ""},		            
		            {"title":"配置名称","class":"center","data":"order_config_name","defaultContent": ""},		            
		            {"title":"配置数量","class":"center","data": "config_qty","defaultContent": ""},
		            {"title":"总成料号","class":"center","data":"sap_materialNo","defaultContent":""},
		            {"title":"物料描述","class":"center","data":"material","defaultContent": ""},
		            {"title":"操作","class":"center","data":null,"render":function(data,type,row){
		            	return "<i class=\"glyphicon glyphicon-search bigger-110 showbus\" title='查看' onclick = 'ajaxShowBusNumber(" + row.id+ ","+row.factory_id+");' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;&nbsp;"+ 
		            	"<i class=\"ace-icon fa fa-pencil bigger-110 editorder\" title='导入' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";
		            		
		            	},
		            }
		          ],
		
		
	});
}

function showEditPage(row){
	//显示订单配置数据
	$("#order").html(row.order_no+" "+row.order_name_str);
	$("#configName").val(row.order_config_name);
	$("#configQty").val(row.config_qty);
	$("#materialNo").val(row.sap_materialNo);
	$("#customer").val(row.customer);
	$("#material").val(row.material);
	$("#tire_type").val(row.tire_type);
	$("#spring_num").val(row.spring_num);
	$("#bus_seats").val(row.bus_seats);
	$("#rated_voltage").val(row.rated_voltage);
	$("#battery_capacity").val(row.battery_capacity);
	$("#passenger_num").val(row.passenger_num);
	
	var param ={
			"configId":row.config_id
		};
	//显示订单配置明细列表
	$.ajax({
		type: "post",
        url: "getConfigDetailList",
        cache: false,  //禁用缓存
        data: param,  //传入组装的参数
        dataType: "json",
        success: function (result) {
        	drawConfigListTable(result)
        }
	});
	
	var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
		width:900,
		height:600,
		modal: true,
		title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 配置导入</h4></div>",
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
					ajaxEidt(); 
				} 
			}
		]
	});
	$( "#dialog-config" ).data("config_id",row.config_id);
}
function drawConfigListTable(data){
	$("#orderConfigTable").dataTable({
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		paginate:false,
		//sScrollY: $(window).height()-250,
		scrollX: "1200px",
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"请导入配置明细！"
		},
		data:data.data,
		columns: [
		            {"title":"零部件类别","class":"center","data":"parts_type","defaultContent": ""},
		            {"title":"物料编码","class":"center","data":"sap_mat","defaultContent": ""},
		            {"title":"零部件编号","class":"center","data":"components_no","defaultContent": ""},
		            {"title":"零部件名称","class":"center","data": "components_name","defaultContent": ""},
		            {"title":"材料/规格","class":"center","data":"size","defaultContent": ""},		            
		            {"title":"类别","class":"center","data":"type","defaultContent": ""},		            
		            {"title":"供应商名称","class":"center","data": "vendor","defaultContent": ""},
		            {"title":"装配车间","class":"center","data":"workshop","defaultContent":""},
		            {"title":"备注","class":"center","data":"notes","defaultContent": ""}		          
		          ]	
	});
}

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
			url : 'uploadConfigListFile', // 需要提交的 url
			data : {
				
			},
			success : function(response) {
				//alert(response.data);
				json_configList=response.data;
				drawConfigListTable(response);
				$("#uploadForm").resetForm();
			}
		})
		
	}
	
}