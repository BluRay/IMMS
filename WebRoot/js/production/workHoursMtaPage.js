var pageSize=1;
var table;
var table_height = $(window).height()-270;

$(document).ready(function () {	
	initPage();
	
	function initPage(){
		$("#status").val("3");
		getFactorySelect("production/workHoursMtaPage",'',"#q_factory",null,'id');
		getWorkshopSelect("production/workHoursMtaPage",$("#q_factory :selected").text(),"","#q_workshop","全部","id");
	}
	
	$("#q_factory").change(function() {
		getWorkshopSelect("production/workHoursMtaPage",$("#q_factory :selected").text(),"","#q_workshop","全部","id");
	})
	
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
		fixedColumns: {
            leftColumns:0,
            rightColumns:1
        },
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var orderNo = $('#tmp_order_no').val();
			var applyDateStart = $('#start_date').val();
			var applyDateEnd = $('#end_date').val();
			var status = $('#status').val();
			var factory = $("#q_factory :selected").text();
			var workshopAll = "";
			$("#q_workshop option").each(function() {
				if($(this).text()!=="全部") workshopAll += $(this).text() + ",";
			});
			var workshop = $("#q_workshop :selected").text() == "全部" ? workshopAll : $("#q_workshop :selected").text();
			var conditions = "{orderNo:'" + orderNo + "',applyDateStart:'"
			+ applyDateStart + "',applyDateEnd:'" + applyDateEnd + "',status:'"
			+ status + "',factory:'" + factory + "',workshop:'" + workshop
			+ "'}";
			console.log('-->conditions = ' + conditions);
			
			
			var workshopAll="";
        	$("#search_workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
        	var conditions={};
        	conditions.task_content=$("#search_tech_task_content").val();
        	conditions.tech_order_no=$("#search_tech_order_no").val();
        	conditions.order_no=$("#search_order_no").val();
        	conditions.factory=$("#search_factory :selected").text();
        	conditions.workshop_list=workshop;
        	conditions.tech_date_start=$("#search_date_start").val();
        	conditions.tech_date_end=$("#search_date_end").val();
        	conditions.status=$("#status").val();        	
        	conditions.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
        	conditions.start = data.start;						//开始的记录序号
        	conditions.page = (data.start / data.length)+1;		//当前页码
        	var query_str = JSON.stringify(conditions); 
        	//return params;
        	//console.log("-->conditions = " + JSON.stringify(conditions));

            $.ajax({
                type: "post",
                url: "querySingleTasklist",
                cache: false,  //禁用缓存
                data: {"conditions":query_str},  //传入组装的参数
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
		            {"title":"技改任务",width:'120',"class":"center","data":"task_content","defaultContent": ""},
		            {"title":"变更单类型",width:'80',"class":"center","data":"tech_order_type","defaultContent": ""},
		            {"title":"技改单号",width:'80',"class":"center","data":"tech_order_no","defaultContent": ""},
		            {"title":"重复变更",width:'60',"class":"center","data":"repeat_change","defaultContent": ""},
		            {"title":"技改类型",width:'60',"class":"center","data":"tech_type","defaultContent": ""},
		            {"title":"切换方式",width:'60',"class":"center","data":"switch_mode","defaultContent": ""},
		            {"title":"完成台数",width:'60',"class":"center","data":"follow_num","defaultContent": ""},
		            {"title":"已录入工时",width:'80',"class":"center","data":"ready_hour","defaultContent": ""},
		            {"title":"车号信息",width:'60',"class":"center","data":"-","defaultContent": ""},
		            {"title":"成本可否转移",width:'80',"class":"center","data":"order_desc","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return row.tech_order_type=='ECN'?'否':'是';
		            	},
		            },
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-plus bigger-130 showbus\" title=\"维护\" onclick='addWorkTime(\"" + row['order_no'] + "\",\""+ row['tech_order_no'] +"\",\""+ row['task_content'] +"\",\""+ row['task_detail_id'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\")' style='color:blue;cursor: pointer;'></i>&nbsp;&nbsp;" + 
		            		"<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editWorkTime(\"" + row['order_no'] + "\",\""+ row['tech_order_no'] +"\",\""+ row['task_content'] +"\",\""+ row['task_detail_id'] +"\",\""+ row['factory'] +"\",\""+ row['workshop'] +"\",\""+ row['tech_list'] +"\")' style='color:blue;cursor: pointer;'></i>";
		            	},
		            }
		          ],
	});
	
}

