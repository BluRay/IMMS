var whList=[];
var baseInfo={};
var assignList=[];
var dataOrderInfo = [];
$(document).ready(function(){
	var ecnTaskId = GetQueryString('taskid');
	getBaseInfo(ecnTaskId);
	
	$("#btnCheck").click(function() {
		if($("#check_id").val() === ''){
			alert("请选择需要确认的物料！");
			return false;
		}
		$.ajax({
	        url: "checkTaskMaterial",
	        dataType: "json",
	        type: "get",
	        data: {
	        	"taskid":ecnTaskId,
	        	"check_id":$("#check_id").val()
	        },
	        success: function(response) {
	        	alert("确认成功！");
	        	getBaseInfo(ecnTaskId);
	        }
		});
	});
});

function getBaseInfo(ecnTaskId){
	$("#MaterielInfoTable tbody").html('');
	$.ajax({
        url: "getTaskInfo",
        dataType: "json",
        type: "get",
        data: {
        	"taskid":ecnTaskId
        },
        success: function(response) {
        	$.each(response.dataBaseInfo, function(index, value){
        		$("#task_content").val(value.task_content);
        		$("#tech_order_no").val(value.tech_order_no);
        		$("#tech_point_num").val(value.tech_point_num);
        		$("#tech_order_type").val(value.ECN_CHANGE_TYPE);
        		$("#tech_type").val(value.ECN_TYPE);
        		$("#tech_date").val(value.tech_date);
        		$("#duty_unit").val(value.duty_unit);
        		(value.major_change=="Y")?$("#major_change").attr("checked", true):$("#major_change").attr("checked", false);
        		(value.repeat_change=="Y")?$("#repeat_change").attr("checked", true):$("#repeat_change").attr("checked", false);
        		(value.custom_change=="Y")?$("#custom_change").attr("checked", true):$("#custom_change").attr("checked", false);
        		$("#custom_change_no").val(value.custom_change_no);
        		$("#tech_date").val(value.tech_date);
        		$("#assign_date").val(value.assign_date);
        		$("#material_check_date").val(value.material_check_date);
        		$("#assess_date").val(value.assess_date);
        		$("#preassigner_id").val(value.preassigner_id);
        		$("#preassign_date").val(value.preassign_date);
        		$("#finish_date").val(value.finish_date);
                (value.tech_order_file=="")?$("#td_tech_order_file").html("无附件"):$("#tech_order_file").attr("href", value.tech_order_file);
                (value.custom_change_file=="")?$("#td_custom_change_file").html("无附件"):$("#custom_change_file").attr("href", value.custom_change_file);
        		
        		if(value.switch_mode=="全部切换")$("#type1").attr("checked", true);
        		if(value.switch_mode=="节点前切换")$("#type2").attr("checked", true);
        		if(value.switch_mode=="节点后切换")$("#type2").attr("checked", true);
        		$("#switch_node").val(value.switch_node);
        	});
        	$.each(response.dataMaterielInfo,function (index,value) {
        		var tr = $("<tr id= '"+value.ID+"'/>");
        		if(value.material_checker_id!='0'){
        			$("<td />").html('<input type="checkbox" disabled="disabled" id="check_'+value.ID+'" onclick="mat_check('+value.ID+')">').appendTo(tr);
        		}else{
        			$("<td />").html('<input type="checkbox" id="check_'+value.ID+'" onclick="mat_check('+value.ID+')">').appendTo(tr);
        		}       		
        		$("<td />").html(value.sap_no).appendTo(tr);
        		$("<td />").html(value.material_desc).appendTo(tr);
        		$("<td />").html(value.material_type).appendTo(tr);
        		$("<td />").html(value.material_spec).appendTo(tr);
        		$("<td />").html(value.unit).appendTo(tr);
        		$("<td />").html(value.supplier_code).appendTo(tr);
        		$("<td />").html(value.single_loss).appendTo(tr);
        		$("<td />").html(value.level_usage).appendTo(tr);
        		$("<td />").html(value.single_weight).appendTo(tr);
        		$("<td />").html(value.single_usage).appendTo(tr);
        		$("<td />").html(value.workshop).appendTo(tr);
        		$("<td />").html(value.process).appendTo(tr);
        		$("<td />").html(value.assemb_site).appendTo(tr);
        		$("<td />").html(value.remark).appendTo(tr);
        		$("<td />").html((value.material_checker_id===0)?'未确认':value.material_checker_id).appendTo(tr);
        		$("<td />").html(value.material_check_date).appendTo(tr);
        		
        		$("#MaterielInfoTable tbody").append(tr);	
        	});
        	
        	$("#new_tab").html('');
        	dataOrderInfo = response.dataOrderInfo;
        	$.each(response.dataOrderInfo,function (index,value) {
        		if(index==0){
        			var paramHtml = '<li class="active"><a href="#new_task1" onclick="showOrderInfo('+(index)+');" data-toggle="tab" style="font-size: 14px; color: #333">'+value.order_no+'</a></li>';
            		$(paramHtml).appendTo("#new_tab");
            		//var tech_str = '{' + value.TECH_LIST + '}';
            		//var tech_str = '{"自制件":11,"焊装":10,"玻璃钢":10,"涂装":10}';
                    var tech_str = value.tech_list;
                    $("#tech_zzj").html("");$("#tech_bj").html("");$("#tech_hz").html("");
                    $("#tech_blg").html("");$("#tech_tz").html("");
                    $("#tech_dp").html("");$("#tech_zz").html("");
                    if(tech_str != ""){
                        tech_str = tech_str.replace(/:/g,'":"');
                        tech_str = tech_str.replace(/,/g,'","');
                        tech_str = '{"' + tech_str + '"}';
                        var obj = JSON.parse(tech_str);
                        $("#tech_zzj").html(obj.自制件);$("#tech_bj").html(obj.部件);$("#tech_hz").html(obj.焊装);
                        $("#tech_blg").html(obj.玻璃钢);$("#tech_tz").html(obj.涂装);
                        $("#tech_dp").html(obj.底盘);$("#tech_zz").html(obj.总装);
                    }
            		showOrderInfo(0);
        		}else{
        			var paramHtml = '<li><a href="#new_task1" onclick="showOrderInfo('+(index)+');" data-toggle="tab" style="font-size: 14px; color: #333">'+value.order_no+'</a></li>';
            		$(paramHtml).appendTo("#new_tab");
        		}
        	});
        }
	});
}


function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function selectAll() {
	if ($("#selectAll").attr("checked")) {
		$(":checkbox").attr("checked", true);
		$(":disabled").attr("checked", false);
	} else {
		$(":checkbox").attr("checked", false);
	}
}