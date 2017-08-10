var factory="";
var workshop="";
var workgroup="";
$(document).ready(function() {
    initPage();
	
	function initPage() {
		getOrgAuthTree($("#workGroupTree"),'hrBaseData/staffManager',"1,2,3",'1',3);
		$('#workGroupTree').height($(window).height()-200)
		$('#workGroupTree').ace_scroll({
			size: $(window).height()-200
		});
	}
	if($(window).height() * 0.6 > 350){
		$("#div_tree1").height($(window).height()-120);
		$("#div_tree2").height($(window).height()-120);
	}
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
		$(".dt-buttons").css("margin-top","-108px").css("margin-right","50px").find("a").css("border","0px");
	});
	
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();
		$(".dt-buttons").css("margin-top","-40px").css("margin-right","50px").find("a").css("border","0px");
	});
	$("#btn_upload").click (function () {
		$("#uploadForm").ajaxSubmit({
			url:"uploadStandardHuman",
			type: "post",
			dataType:"json",
			success:function(response){
				
				//ajaxQuery();
				if(response.success){					
					alert(response.message);
				}else{
					alert(response.message);
				}
			}			
		});
	});
	
})

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
		workshop = "";
		workgroup="";
		$(".node").text(factory);
		ajaxQuery(treeNode.id);
	}	
	if(treeNode.org_type == '2'){
		factory=treeNode.getParentNode().displayName;
		workshop=treeNode.displayName;
		workgroup="";
		$(".node").text(factory+"->"+workshop);
		ajaxQuery(treeNode.id);
	}
	if(treeNode.org_type == '3'){
		factory=treeNode.getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().displayName;
		workgroup=treeNode.displayName;
		$(".node").text(factory+"->"+workshop+"->"+workgroup);
		ajaxQuery(treeNode.id);
	}

	
};
function ajaxQuery(id){
	$("#tableData").dataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 0,
            rightColumns:0
        },
        paging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: document.documentElement.clientHeight-250 + 'px',
		scrollX: "100%",
		lengthChange:false,
		orderMulti:false,
		language: {

		},
		dom: 'Bfrtip',
		buttons: [
			{extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
		],
		ajax:function (data, callback, settings) {
			var param ={
//				"draw":1,
				"id":id,
				"factory":factory,
				"workshop":workshop,
				"workgroup":workgroup
			};
//            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
//            param.start = data.start;//开始的记录序号
//            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getStandardHumanData",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$("#tableData_info").remove();
                	//封装返回数据
                    var returnData = {};
//                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
//                    returnData.recordsTotal = result.total;//返回数据全部记录
//                    returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;//返回的数据列表
                    callback(returnData);
                }
            });
		
		},
		columns: [
			
            {"title":"工厂/部门","class":"center","data":"factory","defaultContent": ""},
            {"title":"科室/车间","class":"center","data":"workshop","defaultContent": ""},
            {"title":"班组","class":"center","data":"workgroup","defaultContent": ""},
            {"title":"岗位名称","class":"center","data":"job_name","defaultContent": ""},
            {"title":"标准人力","class":"center","data":"standard_humans","defaultContent": ""},
            {"title":"现有人力","class":"center","data":"realHuman","defaultContent": ""},
            {"title":"差异人力","class":"center","data":"","render":function(data,type,row){
            	return row.realHuman-row.standard_humans }},
            {"title":"删除","class":"center","data":null,"render":function(data,type,row){
            	return "<i class=\"ace-icon glyphicon glyphicon-trash delete\" onclick=\'deleteData("+row.id+","+id+")\' style='color:green;cursor: pointer;'></i>"},
            	"defaultContent": ""}
          ],
	});
	$(".dt-buttons").css("margin-top","-40px").css("margin-right","50px").find("a").css("border","0px");
}
function deleteData(id,nodeId){
	$.ajax({
		url:"deleteStandardHumanData",
		type: "post",
		dataType:"json",
		data: {
            'id' : id
        },
		success:function(response){
			
			//ajaxQuery();
			if(response.success){					
				alert("删除成功");
				ajaxQuery(nodeId);
			}else{
				alert("删除失败");
			}
		}			
	});
}