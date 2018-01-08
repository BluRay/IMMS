var pageSize=1;
var table;
var table_height = $(window).height()-250;
$(document).ready(function(){
	initPage();
	$("#breadcrumbs").resize(function() {
		//ajaxQuery();
	});
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		ajaxQuery();
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
	});
	$(document).on("click","#btnDeploy",function(){
		var dialog = $( "#dialog-add" ).removeClass('hide').dialog({
			width:450,
			height:200,
			modal: true,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-gear green"></i>流程部署</h4></div>',
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
						
						if($("#file").val()===""){
							alert("请选择流程文件！");
							$("#file").focus();
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
		serverSide: true,paiging:false,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 10,
		pagingType:"full_numbers",
		lengthChange:false,
		orderMulti:false,
		
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"displayName":$("#displayName").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码
            $.ajax({
                type: "post",
                url: "../flow/orderList",
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
                    returnData.data = result.data;//返回的数据列表						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                }
            });
		},
		columns: [
          	{"title":"名称 ","class":"center","data":"display_Name","defaultContent": ""},
            {"title":"流程启动时间","class":"center","data":"create_Time","defaultContent": ""},
            {"title":"流程结束时间 ","class":"center","data":"end_Time","defaultContent": ""},
            {"title":"期望完成时间","class":"center","data":"expire_Time","defaultContent": ""},
            {"title":"流程创建人 ","class":"center","data":"create_Time","defaultContent": ""},
            {"title":"流程状态 ","class":"center","data":"create_Time","defaultContent": "","render":function(data,type,row){
            	var result=(data==0 ? '已结束' : '运行中');
            	return result;
            }},
            {"title":"操作 ","class":"center","data":"order_State","defaultContent": "","render":function(data,type,row){
            	var str='<a href=/BMS/process/display?processId='+row.process_Id+'&orderId='+row.id+' " class="btnPict" title="查看流程图">查看流程图</a>'+
				'  <a href=/BMS/flow/all?processId='+row.process_Id+'&orderId='+row.id+'&type=cc class="btnEdit" title="处理">处理</a>';
            	return str;
            }}
        ],
	});
}
function addNew(url) {
	window.location.href=url;
}