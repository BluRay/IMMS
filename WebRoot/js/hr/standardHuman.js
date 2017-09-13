var factory="";
var workshop="";
var workgroup="";
var treeNodeid="";
$(document).ready(function() {
    initPage();
	
	function initPage() {
		getBusNumberSelect('#nav-search-input');
		getOrgAuthTree($("#workGroupTree"),'hrBaseData/staffManager',"1,2,3",'',3);
		$('#workGroupTree').height($(window).height()-200)
		$('#workGroupTree').ace_scroll({
			size: $(window).height()-200
		});
		getKeysSelect("INTERNAL_BUS_TYPE", "", $("#add_bus_type"),"全部",""); 
		$('#file').ace_file_input({
			no_file:'请选择要导入的文件...',
			btn_choose:'选择文件',
			btn_change:'重新选择',
			width:"350px",
			droppable:false,
			onchange:null,
			thumbnail:false, //| true | large
			//allowExt: ['pdf','PDF'],
		}).on('file.error.ace', function(event, info) {
			alert("请选择导入文件!");
			return false;
	    });
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
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
	$("#add_capacity").blur(function(){
		if($(this).val()!='' && !const_float_validate.test($(this).val())){
			alert("产能只能输入数字！");
			$(this).val("");
			$(this).focus();
			return false;
		}
	});
	
	$("#btn_upload").click (function () {
        
		$("#uploadForm").ajaxSubmit({
			url:"uploadStandardHuman",
			type: "post",
			dataType:"json",
			success:function(response){
				
				if(response.success){	
					ajaxQuery();
					alert(response.message);
				}else{
					alert(response.message);
				}
			}			
		});
	});
	$("#btnQuery").click(function(e){
		e.preventDefault();
		if(treeNodeid==""){
			alert("请选择组织架构节点");
			return false;
		}
		ajaxQuery(treeNodeid);
	});
})

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	treeNodeid=treeNode.id;
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
		workshop = "";
		workgroup="";
		treeNode=treeNode.id;
		$(".node").text(factory);
		ajaxQuery(treeNode.id);
		getCapacityByFactory(factory);
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
	if($.fn.dataTable.isDataTable("#tableData")){
		$('#tableData').DataTable().destroy();
		$('#tableData').empty();
	}
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
		sScrollY: document.documentElement.clientHeight-290 + 'px',
		scrollX: "100%",
		lengthChange:false,
		orderMulti:false,
		language: {
			processing: "正在查询，请稍后...",
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"未查询到数据！"
		},
		dom: 'Bfrtip',
		buttons: [
			{extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
		],
		ajax:function (data, callback, settings) {
			var param ={
//				"draw":1,
				//"id":id,
				"factory":factory,
				"workshop":workshop,
				"workgroup":workgroup,
				"bus_type":$("#add_bus_type :selected").text()
			};
//            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
//            param.start = data.start;//开始的记录序号
//            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getStandardHumanData",
                cache: false,  //禁用缓存
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
            {"title":"车型","class":"center","data":"bus_type","defaultContent": ""},
			{"title":"产能","class":"center","data":"capacity","defaultContent": ""},
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
	$(".dt-buttons").css("margin-top","-110px").css("margin-right","5px").find("a").css("border","0px");
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
function getCapacityByFactory(factory){
	$.ajax({
		url:"/BMS/setting/getFactoryList",
		type: "post",
		dataType:"json",
		data: {
            'factory' : factory,
            "draw":1,
            "start":0,
            "length":10
        },
		success:function(response){
			var data=response.data[0];
			$("#add_capacity").val(data.capacity);
		}			
	});
}