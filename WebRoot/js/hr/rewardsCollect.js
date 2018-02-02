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

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
})

function initPage() {
	//getBusNumberSelect('#nav-search-input');
	getOrgAuthTree($("#workGroupTree"),'hrReport/rewardsCollect',"1,2",'1',1);
	$('#workGroupTree').height($(window).height()-15)
	$('#workGroupTree').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-15,
		mouseWheelLock: true,
		alwaysVisible : true
	});
	
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length>0){
		var treeNode = nodes[0];
		if(treeNode.org_type=='1'){
			factory=treeNode.displayName;
			workshop = "";
			var mynodes = treeNode.children;
			for(var x in mynodes){
				if(mynodes[x].org_type == '2'){
					workshop +=mynodes[x].displayName+",";
				}
			}
		}	
		if(treeNode.org_type == '2'){
			factory=treeNode.getParentNode().displayName;
			workshop=treeNode.displayName;
		}
	}
	
	
	$("#btnQueryRewards").on('click', function(e) {
		ajaxQuery();
	});
	
}	

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
		workshop = "";
		var mynodes = treeNode.children;
		for(var x in mynodes){
			if(mynodes[x].org_type == '2'){
				workshop +=mynodes[x].displayName+",";
			}
		}
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
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:0
        },
        paging:true,
        bLengthChange: true, //改变每页显示数据数量
        iDisplayLength:20,
		dom: 'Bfrtip',
		lengthMenu: [[20, 30, 50, -1], ['显示20行', '显示30行', '显示50行', "全部"]],
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'pageLength',text:'显示20行'}
	    ],
	    rowsGroup:[0,1,2],
	    paiging:true,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: document.documentElement.clientHeight-140,
		scrollX: true,
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
				"rewards_date":$("#search_rewards_date").val()
			};
            param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码

            $.ajax({
                type: "post",
                url: "getRewardsCollectList",
                cache: true,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.total;//返回数据全部记录
                    returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.rows;//返回的数据列表
                    callback(returnData);
                }
            });
		
		},
		columns: [
            {"title":"工号","width":"60","class":"center","data":"staff_number","defaultContent": ""},
            {"title":"姓名","width":"80","class":"center","data":"name","defaultContent": ""},
            {"title":"班组","width":"120","class":"center","data":"workgroup_org","defaultContent": ""},
            {"title":"小班组","width":"120","class":"center","data":"team_org","defaultContent": ""},
            {"title":"奖惩工厂","width":"80","class":"center","data":"rewards_factory","defaultContent": ""},
            {"title":"奖惩车间","width":"60","class":"center","data":"rewards_workshop","defaultContent": ""},
            {"title":"正常考核分数","width":"120","class":"center","data":"","defaultContent": "100"},
            {"title":"加分","width":"60","class":"center","data":"add","defaultContent": ""},
            {"title":"扣分","width":"60","class":"center","data":"deduct","defaultContent": ""},
            {"title":"本月考核分数","width":"120","class":"center","data":"mark","defaultContent": ""},
            {"title":"日期","width":"120","class":"center","data":"rewards_date","defaultContent": ""},
            {"title":"事由","width":"250","class":"center","data":"reasons","defaultContent": ""},
            {"title":"奖励","width":"60","class":"center","data":"add_","defaultContent": ""},
            {"title":"扣分","width":"60","class":"center","data":"deduct_","defaultContent": ""},
            {"title":"班组长","width":"90","class":"center","data":"group_leader","defaultContent": ""},
            {"title":"领班","width":"90","class":"center","data":"gaffer","defaultContent": ""},
            {"title":"处罚建议人","width":"90","class":"center","data":"proposer","defaultContent": ""}
          ],
	});
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","1px");
	$(".dt-buttons").css("padding-right","20px");
	//$(".dt-buttons").css("position","absolute");
	
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
}