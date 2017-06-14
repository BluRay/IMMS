var pageSize=1;
var table;
var table_height = $(window).height()-270;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("quality/processFault",'',"#search_factory",null,'id');
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
});

function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
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
				"orderColumn":"id",
				"factory_id" : $("#search_factory").val(),
				"customer_name" : $("#search_customer_name").val(),
				"status" : $("#search_status").val(),
				"fault_phenomenon" : $("#search_fault_phenomenon").val(),
				"fault_date_start" : $("#search_date_start").val(),
				"fault_date_end" : $("#search_date_end").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getProcessFaultList",
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
		            {"title":"工厂",width:'80',"class":"center","data":"factory_name","defaultContent": ""},
		            {"title":"车间",width:'80',"class":"center","data":"workshop_name","defaultContent": ""},
		            {"title":"参数类别",width:'80',"class":"center","data":"target_type","defaultContent": ""},
		            {"title":"目标值",width:'80',"class":"center","data":"target_value","defaultContent": ""},
		            {"title":"有效起始日",width:'80',"class":"center","data":"estart_date","defaultContent": ""},
		            {"title":"有效结束日",width:'80',"class":"center","data":"eend_date","defaultContent": ""},
		            {"title":"维护人",width:'80',"class":"center","data":"username","defaultContent": ""},
		            {"title":"维护时间",width:'80',"class":"center","data":"edit_date","defaultContent": ""},
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editTargetParamete(" 
		            		+ row['id'] + ",\"" + row['factory_id'] + "\",\"" + row['workshop_id'] + "\",\"" + row['target_type_id'] + "\",\""
		            		+ row['target_value'] + "\",\"" + row['estart_date'] + "\",\"" + row['eend_date'] 
		            		+ "\")' style='color:blue;cursor: pointer;'></i>" + 
		            		"&nbsp;&nbsp;&nbsp;<i class=\"glyphicon glyphicon-remove bigger-130 showbus\" title=\"删除\" onclick='deleteTargetParamete(" 
		            		+ row['id'] + ",\"" + row['factory_id'] + "\",\"" + row['workshop_id'] + "\",\"" + row['target_type_id'] + "\",\""
		            		+ row['target_value'] + "\",\"" + row['estart_date'] + "\",\"" + row['eend_date'] 
		            		+ "\")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
}