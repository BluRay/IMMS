var factory="";
var workshop="";
var workgroup="";
var team="";
var org = "";
var staff_list=[];
$(document).ready(function() {
    initPage();
	
	function initPage() {
		getOrgAuthTree($("#workGroupTree"),'production/waitWorkTimeVerify',"1,2,3,4",'1',3);
		$('#workGroupTree').height($(window).height()-110)
		$('#workGroupTree').ace_scroll({
			size:$(this).attr('data-size')|| $(window).height()-110,
			mouseWheelLock: true,
			alwaysVisible : true
		});
	}

	$("#btnQuery").click(function(e) {
		ajaxQuery();
	});

	// 审核
	$("#btnVerify").click(function() {
		var edit_list=getSelectList("verify");
		if(!edit_list){
			return false;
		}
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),"verify");			
		}
		
	});
	// 驳回
	$("#btnReturn").click(function() {
		var edit_list=getSelectList("reject");
		if(!edit_list){
			return false;
		}
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),"reject");			
		}
		
	});
})
//获取选中的checkbox
function getSelectList(flag){
	var boxList=$("#tableResult tbody :checked");
	var swhList=[];
	if(boxList.length==0){
		alert("请选择至少一个记录");
		return false;
	}
	$.each(boxList,function(index,box){
		
		var swhids=$(box).parent().attr("swhids");
		//alert(swhids);
		swhids=swhids.substring(0,swhids.length-1);
		var swhidlist=swhids.split(",");
		$.each(swhidlist,function(index,swhlist_index){
			if(flag=='verify'){
				var obj=swhlist[swhlist_index];
				obj.status='1';
				obj.wpay=parseFloat(obj.hour_price)*parseFloat(obj.work_hour);
			}
			if(flag=='reject'){
				var obj=swhlist[swhlist_index];
				obj.status='2';
			}
			swhList.push(obj);
		});
		
	});
	return swhList;
}
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.org_type=='1'){
		factory=treeNode.displayName;
	}	
	if(treeNode.org_type == '2'){
		factory=treeNode.getParentNode().displayName;
		workshop=treeNode.displayName;
	}
	
	if(treeNode.org_type == '3'){
		factory=treeNode.getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().displayName;
		workgroup=treeNode.displayName;
	}
	if(treeNode.org_type == '4'){
		factory=treeNode.getParentNode().getParentNode().getParentNode().displayName;
		workshop=treeNode.getParentNode().getParentNode().displayName;
		workgroup=treeNode.getParentNode().displayName;
		team=treeNode.displayName;
	}
	ajaxQuery();

};
function ajaxQuery(){
	if(workshop == ''){
		alert("请选择车间！");
		return false;
	}
	swhlist=[];
	swhupdatelist=[];
	swhdelids="";
	var returnData = {};
	$("#tableResult").dataTable({
		serverSide: true,
		
        //rowsGroup:[1,2,3,4],
        paging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		scrollY: $(window).height()-200+"px",
		scrollX: true,
		lengthChange:false,
		orderMulti:false,
		language: {

		},
		
		ajax:function (data, callback, settings) {
			var status=$("#status").val();
			var wait_reason=$("#wait_reason").val();
			var date_start=$("#date_start").val();
			var date_end=$("#date_end").val();
			var staff_number=$("#staff_number").val();
			var conditions = "{factory:'"+ factory + "',workshop:'"+workshop+ "'," +
			        "wait_reason:'"+wait_reason+"',staff_number:'"+staff_number+"',"+
			        "date_start:'"+date_start+"',date_end:'"+date_end+"',"+
					"status:'"+status+"'}";	
			var param ={
				conditions:conditions
			};
			
            $.ajax({
                type: "post",
                url: "getWaitWorkTimeList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                async :false,
                success: function (result) {
                	$("#tableResult_info").remove();
                	//封装返回数据
                	swhlist = result.data;
                    returnData.data = result.data;//返回的数据列表
                    
                    callback(returnData);
                }
            });
		
		},
		
		columns: [
			{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","width":"25px","class":"center","data":"id","render": function ( data, type, row ) {
			    return "<input id='id' value='"+data+"' type='hidden' /><input type='checkbox' fid='cb_"+data+"'>";
			},"defaultContent": ""},
            {"title":"等待日期","class":"center","data":"","defaultContent": ""},
            {"title":"等待类别","class":"center","data":"","defaultContent": ""},
            {"title":"等待原因","class":"center","data": "","defaultContent": ""},
            {"title":"详细原因","class":"center","data":"detail_reason","defaultContent":""},
            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},	
            {"title":"姓名","class":"center","data":"staff_name","defaultContent":""},
            {"title":"岗位","class":"center","data":"job","defaultContent": ""},
            {"title":"工时","class":"center","data":"work_hour","render":function(data,type,row){
            	return "<input type='text' class='input-small workhour' value='"+data+"' style='width:60px;height:28px;'>";
            }},
            {"title":"人员去向","class":"center","data":"whereabouts","width":"200px","render":function(data,type,row){
            	return "<input type='text' class='input-small whereabouts' value='"+data+"' style='width:198px;height:28px;'>";
            }},
            {"title":"小班组","class":"center","data":"","defaultContent":""},
            {"title":"班组","class":"center","data":"","defaultContent": ""},	
            {"title":"状态","class":"center","data":"","defaultContent": ""},
        ],
	});
	generateTb(returnData.data);
}
function generateTb(swhlist){
	$("#tableResult").find('tbody').find('tr').remove();
	var last_workdate="";
	var last_detail_reason="";
	var last_wait_reason="";
	var last_wait_type="";
	var workdateId="";
	var delTdId="";
	var delbuttonId="";
	var waitReasonId="";
	var waitTypeId="";
	var detailReasonId="";
	$.each(swhlist,function(index,swh){
		//var disabled = (status_arr[swh.STATUS] != '已驳回') ? 'disabled' : "";
		var disabled=swh.status!='0' ? 'disabled' : "";
		var tr=$("<tr />");	
		//操作日期合并单元格
		if(swh.work_date==last_workdate){
			var rowspan=parseInt($(workdateId).attr("rowspan"));
			$(workdateId).attr("rowspan",rowspan+1);
			$(checkboxId).attr("rowspan",rowspan+1);
			swhids+=index+",";
			$(checkboxId).attr("swhids",swhids);
		}else{
			workdateId="#wd_"+index;
			checkboxId="#chk_"+index;
			swhids=index+",";
			
			if(wh.status=='0'){
				$("<td id='chk_"+index+"' rowspan=1 swhids="+swhids+"/>").html("<input type='checkbox' >").appendTo(tr);
			}
			else{
				$("<td id='chk_"+index+"' rowspan=1 swhids="+swhids+"/>").html("").appendTo(tr);
			}
			$("<td id='wd_"+index+"' rowspan=1/>").html(swh.work_date).appendTo(tr);
		}
		//等待原因合并单元格
		if(swh.work_date==last_workdate&&swh.wait_type==last_wait_type){
			var rowspan=parseInt($(waitTypeId).attr("rowspan"));
			$(waitTypeId).attr("rowspan",rowspan+1);
		}else{
			waitTypeId="#rt_"+index;
			$("<td class=\"center\" id='rt_"+index+"' rowspan=1/>").html(swh.wait_type).appendTo(tr);
		}
		//等待原因合并单元格
		if(swh.work_date==last_workdate&&swh.wait_type==last_wait_type&&swh.wait_reason==last_wait_reason){
			var rowspan=parseInt($(waitReasonId).attr("rowspan"));
			$(waitReasonId).attr("rowspan",rowspan+1);
		}else{
			waitReasonId="#rs_"+index;
			$("<td class=\"center\" id='rs_"+index+"' rowspan=1/>").html(swh.wait_reason).appendTo(tr);
		}
		//详细原因合并单元格
		if(swh.work_date==last_workdate&&swh.wait_type==last_wait_type&&swh.wait_reason==last_wait_reason&&swh.detail_reason==last_detail_reason){
			var rowspan=parseInt($(detailReasonId).attr("rowspan"));
			$(detailReasonId).attr("rowspan",rowspan+1);
		}else{
			detailReasonId="#drs_"+index;
			$("<td class=\"center\" id='drs_"+index+"' rowspan=1/>").html(swh.detail_reason).appendTo(tr);
		}
		
		$("<td class=\"center\" />").html(swh.staff_number).appendTo(tr);
		$("<td class=\"center\" />").html(swh.staff_name).appendTo(tr);
		$("<td class=\"center\"/>").html(swh.job).appendTo(tr);
		$("<td class=\"center\" />").html(swh.work_hour).appendTo(tr);
		$("<td class=\"center\"/>").html(swh.whereabouts).appendTo(tr);
		$("<td class=\"center\" />").html(swh.team_org).appendTo(tr);
		$("<td class=\"center\" />").html(swh.workgroup_org).appendTo(tr);
		$("<td class=\"center\" />").html(swh.status=='0' ? '已维护' : (swh.status=='1' ? '已审核' :(swh.status=='2' ? '已驳回' :'已锁定'))).appendTo(tr);
		$("#tableResult tbody").append(tr);
		$(tr).data("swhid",swh.id);
		$(tr).data("swhlist_index",index);
		$(tr).data("workdateId",workdateId);
		last_workdate=swh.work_date;
		last_wait_reason=swh.wait_reason;
		last_wait_type=swh.wait_type;
		last_detail_reason=swh.detail_reason;
		
	});
}
function ajaxUpdate(conditions,flag) {
	$.ajax({
		url : "updateWaitWorkTimeInfo",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {	
				if(flag=="verify"){alert("审核成功");}
				if(flag=="reject"){alert("驳回成功");}
				ajaxQuery();
			} else {
				if(flag=="verify"){alert("审核失败");}
				if(flag=="reject"){alert("驳回失败");}
			}

		}
	});
}

//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}
function ajaxDelete(){
	var ids = '';
	$(":checkbox").each(function(){
		if($(this).prop("checked")){
			//alert($(this).attr('fid'));
			if($(this).attr('fid')){
				ids += $(this).attr('fid').split('_')[1] + ',';
			}
		}
	});
	if(ids===''){
		$.gritter.add({
			title: '系统提示：',
			text: '<h5>请至少勾选一个要删除的记录！</h5>',
			class_name: 'gritter-info'
		});
		return false;
	}
	$.ajax({
	    url: "deleteWaitWorkTimeInfo",
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
}