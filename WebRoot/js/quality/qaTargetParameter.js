var pageSize=1;
var table;
var table_height = $(window).height()-270;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("quality/qaTargetParameter",'',"#search_factory",null,'id');
		getKeysSelect("QUALITY_TARGET_PARAM", "", "#search_targetType","全部","value");
		getWorkshopSelect("quality/qaTargetParameter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("quality/qaTargetParameter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	});
	$('#new_factory').change(function(){ 
		getWorkshopSelect("quality/qaTargetParameter",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
	});
	
	$("#btnAdd").on('click', function(e) {
		getFactorySelect("quality/qaTargetParameter",'',"#new_factory",null,'id');
		getWorkshopSelect("quality/qaTargetParameter",$("#new_factory :selected").text(),"","#new_workshop",null,"id");
		getKeysSelect("QUALITY_TARGET_PARAM", "", "#new_targetType","全部","value");
		e.preventDefault();
		$("#dialog-add").removeClass('hide').dialog({
			resizable: false,
			title: '<div class="widget-header"><h4 class="smaller"><i class="ace-icon fa fa-users green"></i> 增加质量目标参数</h4></div>',
			title_html: true,
			width:'550px',
			modal: true,
			buttons: [{
						text: "取消",
						"class" : "btn btn-minier",
						click: function() {$( this ).dialog( "close" );} 
					},
					{
						text: "增加",
						id:"btn_ok",
						"class" : "btn btn-success btn-minier",
						click: function() {
							btnNewConfirm();
						} 
					}
				]
		});
	});
	
});

function btnNewConfirm(){
	var factory=$("#new_factory").val();
	var workshop=$("#new_workshop").val();
	var paramType=$("#new_targetType").val();
	var targetVal=$("#new_targetVal").val();
	var effectDateStart=$("#new_date_start").val();
	var effectDateEnd=$("#new_date_end").val();
	if(factory==''){
		alert("请选择工厂！");
		return false;
	}
	if(workshop==''){
		alert("请选择车间！");
		return false;
	} 
	if(paramType==''){
		alert("请选择参数类别！");
		return false;
	} 
	if(targetVal==''){
		alert("请输入目标值！");
		return false;
	}
	if(effectDateStart==''){
		alert("请输入有效日期！");
		return false;
	}
	if(effectDateEnd==''){
		alert("请输入有效日期！");
		return false;
	}
	
	
	
}

function ajaxQuery(){
	var factoryId=isNaN(parseInt($("#search_factory").val()))?0:parseInt($("#search_factory").val());
	var workshopId=isNaN(parseInt($("#search_workshop").val()))?0:parseInt($("#search_workshop").val());
	var targetTypeId=isNaN(parseInt($("#search_targetType").val()))?0:parseInt($("#search_targetType").val());
	var conditions="{factoryId:"+factoryId+",workshopId:"+workshopId+",targetTypeId:"+targetTypeId+
		",effecDateStart:'"+$("#date_start").val()+"',effecDateEnd:'"+$("#date_end").val()+"'}";
	
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
				"conditions":conditions
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getQaTargetParamList",
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
		            {"title":"零部件名称",width:'80',"class":"center","data":"parts","defaultContent": ""},
		            {"title":"缺陷类别",width:'80',"class":"center","data":"bug_type","defaultContent": ""},
		            {"title":"质量缺陷",width:'80',"class":"center","data":"bug","defaultContent": ""},
		            {"title":"严重等级",width:'80',"class":"center","data":"serious_level","defaultContent": ""},
		            {"title":"缺陷分类",width:'80',"class":"center","data":"fault_type","defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return data == '0'?'非尺寸':'尺寸';
		            	}
		            },
		            {"title":"维护人",width:'80',"class":"center","data":"display_name","defaultContent": ""},
		            {"title":"维护时间",width:'80',"class":"center","data":"edit_date","defaultContent": ""},
		            {"title":"操作",width:'60',"class":"center","data":null,"defaultContent": "",
		            	"render": function ( data, type, row ) {
		            		return "<i class=\"glyphicon glyphicon-edit bigger-130 showbus\" title=\"编辑\" onclick='editFault(" 
		            		+ row['id'] + ",\"" + row['parts'] + "\",\"" + row['bug_type'] + "\",\"" + row['bug'] + "\",\""
		            		+ row['serious_level'] + "\",\"" + row['fault_type'] + "\")' style='color:blue;cursor: pointer;'></i>"
		            	},
		            }
		          ],
	});
	
}

