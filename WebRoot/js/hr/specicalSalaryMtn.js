var dt;
var factory="";
var workshop="";

$(document).ready(function() {
	//获取系统时间 
	var LSTR_ndate=new Date(); 
	var LSTR_MM=LSTR_ndate.getMonth()+1;
	LSTR_MM=parseInt(LSTR_MM) >= 10?LSTR_MM:("0"+LSTR_MM);
	$("#search_rewards_date").val(LSTR_ndate.getFullYear() + "-" + LSTR_MM);
	
	initPage();

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnBulkAdd").click (function () {
		$(".dt-buttons").css("margin-top","-120px");
//		var head_width=$(".dataTables_scrollHead").width();
//        $(".dataTables_scrollHead").css("width",head_width-20);
		$("#divBulkAdd").show();
	});
	
	$("#btnBulkHide").click (function () {
		$("#divBulkAdd").hide();

		$(".dt-buttons").css("margin-top","-50px");
		
//		var head_width=$(".dataTables_scrollHead").width();
//        $(".dataTables_scrollHead").css("width",head_width+20);
	});
	
	$("#btn_upload").click (function () {
		if($("#search_date").val()==''){
			alert("请选择导入月份!");
			return false;
		}
		$("#uploadRewardsForm").ajaxSubmit({
			url:"uploadSpecicalSalary",
			type: "post",
			dataType:"json",
			data:{"month":$("#search_date").val()},
			success:function(response){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>'+response.message+'！</h5>',
					class_name: 'gritter-info'
				});
				ajaxQuery();
			}			
		});
	});
})

function initPage() {
	getBusNumberSelect('#nav-search-input');
	getOrgAuthTree($("#workGroupTree"),'hr/specicalSalaryMtn',"1,2",'1',1);
	$('#workGroupTree').height($(window).height()-110)
	$('#workGroupTree').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-110,
		mouseWheelLock: true,
		alwaysVisible : true
	});
	
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length>0){
		var treeNode = nodes[0];
		if(treeNode.org_type=='1'){
			factory=treeNode.displayName;
			workshop="";
			workgroup="";
			team="";
		}	
		if(treeNode.org_type == '2'){
			factory=treeNode.getParentNode().displayName;
			workshop=treeNode.displayName;
			workgroup="";
			team="";
		}
		if(treeNode.org_type == '3'){
			factory=treeNode.getParentNode().getParentNode().displayName;
			workshop=treeNode.getParentNode().displayName;
			workgroup=treeNode.displayName;
			team="";
		}
		if(treeNode.org_type == '4'){
			factory=treeNode.getParentNode().getParentNode().getParentNode().displayName;
			workshop=treeNode.getParentNode().getParentNode().displayName;
			workgroup=treeNode.getParentNode().displayName;
			team=treeNode.displayName;
		}
	}
	
	$("#btnQuery").on('click', function(e) {
		ajaxQuery();
	});
	
	$("#btnDelete").on('click', function(e) {
		if(!confirm("您确定要删除选中的数据吗")){
			return false;
		}
		var ids = '';
		$(":checkbox").each(function(){
			if($(this).prop("checked")){
				if($(this).attr('fid')){
					ids += $(this).attr('fid').split('_')[1] + ',';
				}
			}
		});
		if(ids===''){
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>请至少勾选一个条记录！</h5>',
				class_name: 'gritter-info'
			});
			return false;
		}
		$.ajax({
		    url: "deleteSpecialSalary",
		    dataType: "json",
			type: "get",
		    data: {
		    	"ids" : ids.substring(0,ids.length-1)
		    },
		    success:function(response){
		    	if(response.success){
		    	$.gritter.add({
					title: '系统提示：',
					text: '<h5>删除成功！</h5>',
					class_name: 'gritter-info'
				});
		    	
		    	ajaxQuery();
		    	}else{
		    		$.gritter.add({
						title: '系统提示：',
						text: '<h5>删除失败！</h5><br>'+response.message,
						class_name: 'gritter-info'
					});
		    	}
		    }
		});
	});
	
	$("#new_staff_number").blur(function(){
		$.ajax({
			url: "/BMS/common/getStaffNameByNumber",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: {
		    	"staff_number":$("#new_staff_number").val(),
		    },
		    success:function(response){
		    		if(response.data==null){
		    			alert("员工不存在，请重新输入");
		    			$("#new_staff_number").val("");
		    		}else{
		    			$("#new_staff_name").html(response.data);
		    		}
		    		
		    }
		});
	});
}	

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
		workshop="";
	}	
	if(treeNode.org_type == '2'){
		factory=treeNode.getParentNode().displayName;
		workshop=treeNode.displayName;
	}
	
	ajaxQuery();
};

function ajaxQuery(){
	dt=$("#tableResult").DataTable({
		serverSide: true,
        paging:true,
        bLengthChange: true, //改变每页显示数据数量
        iDisplayLength:20,
		dom: 'Bfrtip',
		lengthMenu: [[20, 30, 50, -1], ['显示20行', '显示30行', '显示50行', "全部"]],
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'pageLength',text:'显示20行'}
	    ],
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: document.documentElement.clientHeight-250 + 'px',
		scrollX: "100%",
		/*scrollCollapse: true,*/
		pageLength: 20,
		pagingType:"full_numbers",
		lengthChange:true,
		orderMulti:false,
		language: {
			lengthMenu: "每页显示_MENU_",
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			},
			
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"factory":factory,
				"workshop":workshop,
				"staff_number":$("#search_staff_number").val(),
				"work_month":$("#search_date").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "querySpecialSalaryList",
                cache: true,  //禁用缓存
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
                    callback(returnData);
                }
            });
		
		},
		columns: [
			{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","width":"30","class":"center","data":"id","render": function ( data, type, row ) {
			    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
			},"defaultContent": ""},
            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
            {"title":"月份","class":"center","data":"month","defaultContent": ""},
            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
            {"title":"车间","class":"center","data":"workshop_org","defaultContent": ""},
            {"title":"班组","class":"center","data":"workgroup_org","defaultContent": ""},
            {"title":"小班组","class":"center","data":"team_org","defaultContent": ""},
            {"title":"售前工资","class":"center","data":"pre_sale_salary","defaultContent": ""},
            {"title":"售后工资","class":"center","data":"after_sale_salary","defaultContent": ""},
            {"title":"支援工资","class":"center","data":"support_salary","defaultContent": ""},
            {"title":"计时工资","class":"center","data":"hourly_salary","defaultContent": ""},
            {"title":"放假工资","class":"center","data":"paid_leave_salary","defaultContent": ""},
            {"title":"调休工资","class":"center","data":"holiday_salary","defaultContent": ""},
            {"title":"生产工厂","class":"center","data":"submit_factory","defaultContent": ""},
            {"title":"生产车间","class":"center","data":"submit_workshop","defaultContent": ""}
          ],
	});
	if($("#divBulkAdd").css("display")=='none'){
		$(".dt-buttons").css("margin-top","-50px").find("a").css("border","1px");
	}else{
		$(".dt-buttons").css("margin-top","-120px").find("a").css("border","1px");
	}
	
	$(".dt-buttons").css("padding-right","20px");
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
}

//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}