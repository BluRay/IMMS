$(document).ready(function(){
	
	$("#btnQuery").click(function(){
		var batch=$("#batch").val();
		var parts_name=$("#parts_name").val();
		if(parts_name.trim().length==0 && batch.trim().length==0){
			alert("请输入零部件名称或者批次！")
			return false;
		}
		
		ajaxQuery();
	})
})


function ajaxQuery(){
	$("#tableData").DataTable({
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
					"parts_name":$("#parts_name").val(),
					"batch":$("#batch").val(),
				};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getBusByPartsBatch",
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
		            {"title":"订单","class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"工厂","class":"center","data":"factory","defaultContent": ""},
		            {"title":"车间","class":"center","data":"workshop","defaultContent": ""},
		            {"title":"零部件","class":"center","data": "parts_name","defaultContent": ""},
		            {"title":"批次","class":"center","data":"batch","defaultContent": ""},	
		            {"title":"安装日期","class":"center","data":"edit_date","defaultContent": ""},
		          ]
	});

}