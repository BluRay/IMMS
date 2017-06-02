$(document).ready(function(){
	initPage();
	
	//新增
	$("#btnAdd").click(function(e){
		$("#create_form")[0].reset();
		
		getFactorySelect("production/busInfoMtn","","#factory","请选择","id");
		var dialog = $( "#dialog-config" ).removeClass('hide').dialog({
			width:750,
			height:500,
			modal: true,
			title: "<div class='widget-header widget-header-small'><h4 class='smaller'><i class='ace-icon glyphicon glyphicon-list-alt' style='color:green'></i> 新增车辆信息</h4></div>",
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
						ajaxAdd(); 
					} 
				}
			]
		});
	})
	
	//点击查询
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
	
});

function initPage(){
	getFactorySelect("production/busInfoMtn","","#search_factory","全部","id");
	getBusTypeSelect("","#search_bus_type","全部","id");
	getOrderNoSelect("#search_order_no","#orderId");
}

function ajaxQuery(){
	$("#tableResult").DataTable({
		serverSide: true,
		paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		fixedColumns:   {
            leftColumns: 1,
            rightColumns:1
        },
		destroy: true,
		sScrollY: $(window).height()-250,
		scrollX: true,
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
					"orderNo":$("#search_order_no").val(),
					"orderName":$("#search_order_name").val(),
					"actYear":$("#search_productive_year").val(),
					"factory":/*$("#search_factory").val(),*/getAllFromOptions("#search_factory","val"),
					"orderColumn":"order_no"
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getBusInfoList",
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
		          	{"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"生产工厂","class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"订单描述","class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"颜色","class":"center","data":"bus_color","defaultContent": ""},
		            {"title":"座位数","class":"center","data":"bus_seats","defaultContent": ""},
		            {"title":"额定载客人数","class":"center","data": "passenger_num","defaultContent": ""},
		            {"title":"轮胎规格","class":"center","data":"tire_type","defaultContent": ""},		            
		            {"title":"电池容量","class":"center","data":"battery_capacity","defaultContent": ""},		            
		            {"title":"额定电压","class":"center","data": "rated_voltage","defaultContent": ""},		            
		            {"title":"弹簧片数","class":"center","data":"spring_num","defaultContent": ""},
		            {"title":"底盘生产日期","class":"center","data":"dp_production_date","defaultContent": ""},
		            {"title":"底盘资质地","class":"center","data":"dp_zzd","defaultContent": ""},
		            {"title":"整车生产日期","class":"center","data":"zc_production_date","defaultContent": ""},
		            {"title":"整车资质地","class":"center","data": "zc_zzd","defaultContent": ""},
		            {"title":"合格证备注","class":"center","data":"hgz_note","defaultContent": ""},		            
		            {"title":"CCC证书签发日期","class":"center","data":"ccczs_date","defaultContent": ""},		            
		            {"title":"底盘公告生效日期","class":"center","data": "dpgg_date","defaultContent": ""},
		            {"title":"整车公告生效日期","class":"center","data": "zcgg_date","defaultContent": ""},
		            {"title":"操作","class":"center","data":"order_id","render":function(data,type,row){
		            	return "<i class=\"ace-icon fa fa-pencil bigger-130 editorder\" title='编辑' onclick = 'showEditPage(" + JSON.stringify(row)+ ");' style='color:green;cursor: pointer;'></i>";		            		
		            	}
		            }
		          ]
	});
}
