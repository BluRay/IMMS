var factory="";
var workshop="";
var workgroup="";
var team="";
var salary_model="技能系数";
var staff_list=[];
var org_id="";
var is_customer="0";
$(document).ready(function() {
	initPage();
	
	$(document).on("input","#bus_number",function(){
		//alert("aa");
		$("#bus_number").attr("order_id","");
	});
	$(document).on("input","#order_no",function(){
		//alert("aa");
		$("#order_no").attr("order_id","");
	});
	
	$(document).on("click","#dstcopy",function(){
		//$(".distribution :eq(0)").focus();
		var workhourlist=$(".workhour");
		if(workhourlist.length==0){
			workhourlist=$(".distribution");
		}
		//alert(workhourlist.length);
		$(workhourlist).eq(0).css("display","none");
		$("#copy_paste").val($(workhourlist).eq(0).val()).css("display","").css("background-color","rgb(191, 237, 245)").select();
		$(workhourlist).css("background-color","rgb(191, 237, 245)");
	});
	
	$(document).on("paste","#copy_paste",function(e){
		 setTimeout(function(){
			 var copy_text=$(e.target).val();
			 $(e.target).val("");
			 var dist_list=copy_text.split(" ");
			 var workhourlist=$(".workhour")||$(".distribution");
			 $(workhourlist).eq(0).css("display","");
				$("#copy_paste").css("display","none");
			 $.each(dist_list,function(i,value){
				 $(workhourlist).eq(i).val(value);								 
			 });
			 $(workhourlist).css("background-color","white");
			 //alert(dist_list.length);
			 //alert(copy_text);
		 },1);
	});
	
	// 工时删除
	$(document).on("click",".fa-times", function(e) {
		$(e.target).closest("tr").remove();
	});
	
	// 新增额外工时
	$(document).on("click", "#addStaff",function() {
		var tr1=$("#tableResult tbody").find("tr").eq(0);
		
		var tr=$("<tr />");
		if(salary_model=='技能系数'){
			var price=$(tr1).children("td").eq(4).html();
			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;margin: 0;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html(price).appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium workhour' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		if(salary_model=='承包制'){
			var price=$(tr1).children("td").eq(4).html();
			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;margin: 0;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html(price).appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium distribution' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		if(salary_model=='辅助人力'||salary_model=='底薪模式'){
			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium workhour' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		$("#tableResult tbody").prepend(tr);
	});
	
	$(document).on("change","#customer_number",function(){
		ajaxQueryTeamStaffDetail();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
	})
	
	$(document).on("change",".staff_number",function(){
		 var staff=ajaxGetStaffDetail($(this).val());
		 if(!staff){
			 $(this).val("");
		 }
		 var tds=$(this).parent("td").siblings();
		 if(staff){
			 if(salary_model=='技能系数'){
				 $(tds[1]).html(staff.name);
				 $(tds[2]).html(staff.job);
				 $(tds[4]).html(staff.skill_parameter);
				 $(tds[6]).html(staff.team_org);
				 $(tds[7]).html(staff.workgroup_org);
				 $(tds[8]).html(staff.workshop_org);
				 $(tds[9]).html(staff.plant_org);
			}
			if(salary_model=='承包制'){
				$(tds[1]).html(staff.name);
				 $(tds[2]).html(staff.job);
				 $(tds[4]).find(".distribution").eq(0).val(staff.distribution)
				 $(tds[5]).html(staff.team_org);
				 $(tds[6]).html(staff.workgroup_org);
				 $(tds[7]).html(staff.workshop_org);
				 $(tds[8]).html(staff.plant_org);		
			}
			if(salary_model=='辅助人力'||salary_model=='底薪模式'){
				 $(tds[1]).html(staff.name);
				 $(tds[2]).html(staff.job);
				 $(tds[3]).html(staff.skill_parameter);
				 $(tds[5]).html(staff.team_org);
				 $(tds[6]).html(staff.workgroup_org);
				 $(tds[7]).html(staff.workshop_org);
				 $(tds[8]).html(staff.plant_org);
			}
		 }
	});
	
	$(document).on("input",".workhour",function(){
		if(isNaN(Number($(this).val()))){
			alert("参与度/工时只能为数字！");
			$(this).val("");
			return false;
		}
	})
	
	$(document).on("input",".distribution",function(){
		if(isNaN(Number($(this).val()))){
			alert("分配金额只能为数字！");
			$(this).val("");
			return false;
		}
	})
	
	//保存工时信息
	$(document).on("click","#btnSave",function(){
		var bus_number=$("#bus_number").val();
		var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
		var work_date=$("#work_date").val();
		var cutormer_number=$("#customer_number").val()
		
		if(salary_model=='技能系数'){
			//判断车号、操作日期是否有效填写（自编号模式判断订单、自编号、操作日期是否有效填写）		
			if(is_customer=='1'){
				if(cutormer_number.trim().length==0){
					alert("请填写自编号！");
					return false;
				}
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效订单！")
					return false;
				}				
			}else{
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效车号！")
					return false;
				}		
			}
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				return false;
			}
			/**判断车辆是否在车间上线
			*判断车号、操作日期是否已经录入过记录（自编号模式下判断自编号、操作日期是否已经录入过记录）
			**/
			if(is_customer=='0'){
				validateBus(bus_number,is_customer,work_date);
			}else{
				validateBus(cutormer_number,is_customer);
			}
			//判断参与度/工时有无为空
			
		}
		if(salary_model=='承包制'){
			//判断车号、操作日期是否有效填写（自编号模式判断订单、自编号、操作日期是否有效填写）
			if(is_customer=='1'){
				if(cutormer_number.trim().length==0){
					alert("请填写自编号！");
					return false;
				}
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效订单！")
					return false;
				}				
			}else{
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效车号！")
					return false;
				}		
			}
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				return false;
			}
			/**判断车辆是否在车间上线
			*判断车号、操作日期是否已经录入过记录（自编号模式下判断自编号、操作日期是否已经录入过记录）
			**/
			if(is_customer=='0'){
				validateBus(bus_number,is_customer,work_date);
			}else{
				validateBus(cutormer_number,is_customer);
			}
			//判断分配金额有无为空
			
			//判断分配金额之和是否等于班组承包单价
			
		}
		if(salary_model=='辅助人力'||salary_model=='底薪模式'){
			//判断操作日期有无填写
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				return false;
			}			
			//判断该小班组、操作日期是否已经录入过记录
			validateRecordIn();
			
			//判断参与度/工时有无为空
			
		}
	})
	
})

function initPage() {
	getOrgAuthTree($("#workGroupTree"),'production/pieceWorkhourMtn',"1,2,3,4",'1',3);
	$('#workGroupTree').height($(window).height()-110)
	$('#workGroupTree').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-110,
		mouseWheelLock: true,
		alwaysVisible : true
	});
	
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
		org_id=treeNode.id;
	}
	
	if(treeNode.org_type != '4'){
		alert("请选择小班组！");
		return false;
	}
	
	ajaxQueryTeamStaffDetail();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	$("#form").css("display","none");
	
	if(salary_model ==undefined){
		alert(team+"未维护计件模式，请联系人资维护计件模式！");
		return false;
	}	

	var table=$("<table />");
	if(salary_model=='技能系数'||salary_model=='承包制'){
		var tr=$("<tr />");
		if(is_customer=="1"){
			$("<td />").html("订单：").appendTo(tr);
			$("<td />").html("<input type=\"text\" id=\"order_no\" class=\"input-medium carType\" style=\"height: 30px; width: 100px;\"></input>").appendTo(tr);
			$("<td />").html("自编号：").appendTo(tr);
			$("<td />").html("<input type=\"text\" id=\"customer_number\" class=\"input-medium carType\" style=\"height: 30px; width: 150px;\"></input>").appendTo(tr);
		}else{
			$("<td />").html("车号：").appendTo(tr);
			$("<td />").html("<input type=\"text\" id=\"bus_number\" class=\"input-medium carType\" style=\"height: 30px; width: 150px;\"></input>").appendTo(tr);
		}

		$("<td />").html("操作日期：").appendTo(tr);
		$("<td />").html("<input id=\"work_date\" class=\"input-medium\" style=\"width: 90px;height: 30px;\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){changeWorkDate()}})\" type=\"text\">").appendTo(tr);
		$("<td />").html("补贴车：").appendTo(tr);
		$("<td />").html("<input style=\"height: 30px; width: 50px;\" type=\"text\" class=\"input-medium revise\" id=\"bonus\" />").appendTo(tr);		
		$("<td />").html("<input type=\"button\" class=\"btn btn-sm btn-info\" id=\"btnSave\" value=\"保存\" style=\"margin-left: 10px;\"></input>").appendTo(tr);
		$(table).append(tr);
		$("#form").html(table).css("display","");
	}else{
		var tr=$("<tr />");
		$("<td />").html("操作日期：").appendTo(tr);
		$("<td />").html("<input id=\"work_date\" class=\"input-medium\" style=\"width: 90px\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){changeWorkDate()}})\" type=\"text\">").appendTo(tr);
		$("<td />").html("<input type=\"button\" class=\"btn btn-sm btn-info\" id=\"btnSave\" value=\"保存\" style=\"margin-left: 10px;\"></input>").appendTo(tr);
		$(table).append(tr);
		$("#form").html(table).css("display","");
	}	
	getOrderNoSelect("#order_no", "", function(obj){
		var order_id=obj.order_id;
		ajaxQueryTeamStaffDetail();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
	}, null,null,null);
	
	getBusNumberSelect("#bus_number", "", function(obj){		
		var order_id=obj.order_id;
		ajaxQueryTeamStaffDetail();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
	});
	
	//显示选择的小班组人员列表
	showStaffList(staff_list)
};

function ajaxQueryTeamStaffDetail(){
	//var bus_type="";
	var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
/*	if($("#customer_number").val()!=null&&$("#customer_number").val().length>0){
		bus_type=$("#customer_number").val().split("-")[0];
	}*/
	
	//alert(bus_type)
	$.ajax({
		url:'getTeamStaffDetail',
		type:'post',
		dataType:'json',
		async:false,
		data:{
			factory:factory,
			workshop:workshop,
			workgroup:workgroup,
			team:team,
			org_id:org_id,
			order_id:order_id,
			work_date:$("#work_date").val()
		},
		success:function(response){
			if(response.salary_model){
				salary_model=response.salary_model.salary_model;
				is_customer=response.salary_model.customer_no_flag;
			}
			if(response.staff_list.length>0){
				staff_list=response.staff_list;
			}
			
		}
	})
}

function showStaffList(staff_list){
	var columns=[];
	if(salary_model=='技能系数'){
		columns= [
		            {"title":"<i id=\"addStaff\" class=\"fa fa-plus bigger-110\" style=\"cursor: pointer;color: blue;\"></i>","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},
		            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},		            
		            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},		            
		            {"title":"参与度/工时"+"&nbsp;<i id='dstcopy' title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium workhour' style='width:60px;height:28px;text-align:center'  />"+
		            	"<input type='text' id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            }},
		            {"title":"小班组","class":"center","data":"team_org","defaultContent":""},
		            {"title":"班组","class":"center","data":"workgroup_org","defaultContent": ""},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		          ]	;
	}
	if(salary_model=='承包制'){
		columns= [
		            {"title":"<i id=\"addStaff\" class=\"fa fa-plus bigger-110\" style=\"cursor: pointer;color: blue;\"></i>","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},
		            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},		            	            
		            {"title":"分配金额"+"&nbsp;<i id='dstcopy' title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "distribution","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium distribution' style='width:60px;height:28px;text-align:center'  value='"+data+"'/>"+
		            	"<input type='text' id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            }},
		            {"title":"小班组","class":"center","data":"team_org","defaultContent":""},
		            {"title":"班组","class":"center","data":"workgroup_org","defaultContent": ""},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		          ]	;
	}
	if(salary_model=='辅助人力'||salary_model=='底薪模式'){
		columns= [
		            {"title":"<i id=\"addStaff\" class=\"fa fa-plus bigger-110\" style=\"cursor: pointer;color: blue;\"></i>","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},	  
		            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": ""},		
		            {"title":"参与度/工时"+"&nbsp;<i id='dstcopy' title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium workhour' style='width:60px;height:28px;text-align:center'  />"+
		            	"<input type='text' id='copy_paste' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            }},
		            {"title":"小班组","class":"center","data":"team_org","defaultContent":""},
		            {"title":"班组","class":"center","data":"workgroup_org","defaultContent": ""},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		          ]	;
	}
	
	$("#tableResult").DataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-210,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			emptyTable:"",					     
			infoEmpty:"",
			zeroRecords:"未查询到人员数据！"
		},
		data:staff_list,
		columns:columns
	});
	
	
/*	$('#tableReusltDiv').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-210,
		mouseWheelLock: true,
		alwaysVisible : false
	});*/
}

function changeWorkDate(){
	//alert($("#work_date").val());
		ajaxQueryTeamStaffDetail();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
	
}

function ajaxGetStaffDetail(staff_number){
	var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
	var staff={};
		$.ajax({
			url:'getTeamStaffDetail',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				factory:factory,
				workshop:workshop,
				workgroup:workgroup,
				team:team,
				org_id:org_id,
				order_id:order_id,
				staff_number:staff_number,
				work_date:$("#work_date").val()
			},
			success:function(response){
				if(response.staff_list.length==0){
					alert("请输入有效员工号！");
				}
				staff=response.staff_list[0];				
			}
		})
		return staff;
}

function validateBus(bus_number,is_customer,work_date){
	var flag=true;
	$.ajax({
		url:'workhourValidateBus',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			factory:factory,
			workshop:workshop,
			workgroup:workgroup,
			team:team,
			bus_number:bus_number,
			work_date:work_date,
			salary_model:salary_model,
			is_customer:is_customer
		},
		success:function(response){
			if(!response.success){
				alert(response.message);
				flag= false;
			}
		}
	})
	return flag;
}
/**
 * 校验（小班组、操作日期）条件下是否已经维护过工时信息（辅助人力、底薪模式）
 * @returns {Boolean}
 */
function validateRecordIn(){
	var flag=true;
	$.ajax({
		url:'workhourValidateRecordIn',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			factory:factory,
			workshop:workshop,
			workgroup:workgroup,
			team:team,
			work_date:work_date,
			salary_model:salary_model
		},
		success:function(response){
			if(!response.success){
				alert(response.message);
				flag= false;
			}
		}
	})
	return flag;
}
