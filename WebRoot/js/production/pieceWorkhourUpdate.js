var factory="";
var workshop="";
var workgroup="";
var team="";
var salary_model="技能系数";
var staff_hour_list=[];
var org_id="";
var is_customer="0";
$(document).ready(function() {
	initPage();

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	$(document).on("click","#btnQuery",function(){
		if(!team){
			alert("请选择小班组！");
			return false;
		}
	/*	if($("#wdate_start").val().trim().length==0||$("#wdate_end").val().trim().length==0){
			alert("请选择日期范围！");
			return false;
		}*/
		//先destroy datatable，隐藏form
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		
		//显示选择的小班组人员列表
		ajaxGetStaffHoursDetail();
		if(staff_hour_list.length>0){
			showStaffList(staff_hour_list);
		}
	});
	
	$(document).on("input","#bus_number",function(){
		//alert("aa");
		$("#bus_number").attr("order_id","");
	});
	
	//全选反选
	$(document).on("click","#checkall",function(){
		//alert("aa");
		if ($('#checkall').is(":checked")) {
			//alert("选中")
			check_All_unAll("#tableResult",true);
		}
		if($('#checkall').is(":checked")==false){
			
			check_All_unAll("#tableResult",false);
		}
		
	})
	
	// 工时删除
	$(document).on("click",".fa-times", function(e) {
		var del_flag=$(e.target).attr("del_flag");
		var cboxlist=$("#tableResult tbody :checked");
		var bus_list=[];
		var work_date_list=[];
		var swh_id=null;
		var order_list=[];
		var rowdata=null;
		if(del_flag=='del_all'){//车号(操作日期)批量删除
			if(cboxlist.length==0){
				alert("请选择需要删除的工时信息！");
				return false;
			}
			$.each(cboxlist,function(i,cbox){
				var td=$(cbox).parent("td");
				if(td.css("display")!='none'){
					if(salary_model=='技能系数' ||salary_model=='承包制'||salary_model=='自制件承包' ){
						var bus_number=$(td).next().html();
						var work_date=$(td).next().next().html();
						work_date_list.push(work_date);
						bus_list.push(bus_number)
					}
					if(salary_model=='辅助人力'  ){
						var order_id=$(cbox).attr("order_id");
						var work_date=$(td).next().next().html();
						work_date_list.push(work_date);
						order_list.push(order_id);
					}
					if(salary_model=='底薪模式' ){
						var work_date=$(td).next().html();
						work_date_list.push(work_date);
					}

				}
			})
			
			/*if(salary_model=="技能系数"||salary_model=="承包制"||salary_model=="自制件承包"){
				bus_number=$(e.target).parent("td").next("td").html();
				work_date=$(e.target).parent("td").next("td").next("td").html();
			}else if(salary_model=="辅助人力"){
				order_id=$(e.target).attr("order_id");
				work_date=$(e.target).parent("td").next("td").next("td").html();
			}
			else{
				work_date=$(e.target).parent("td").next("td").html();
			}*/
			
		}else{//单条数据删除
			swh_id=$(e.target).attr("swh_id");
			rowdata=JSON.parse($(e.target).attr("row"));
			/*bus_number=rowdata.bus_number;
			work_date=rowdata.work_date;*/
			//bus_list.push(rowdata.bus_number)
			//work_date_list.push(rowdata.work_date);
			
			
		}
		if(confirm("是否确认删除？"))
		$.ajax({
			url:'deleteStaffHours',
			type:'post',
			dataType:'json',
			data:{
				factory:factory,
				workshop:workshop,
				workgroup:workgroup,
				team:team,
				bus_number:bus_list.join(","),
				work_date:work_date_list.join(","),
				swh_id:swh_id,
				salary_model:salary_model,
				order_id:order_list.join(",")
			},
			success:function(response){
				if(response.success){
					//alert("删除成功！")
					fadeMessageAlert("",response.message, "gitter-success")
					//先destroy datatable
					if($.fn.dataTable.isDataTable("#tableResult")){
						$('#tableResult').DataTable().destroy();
						$('#tableResult').empty();
					}
					
					//显示选择的小班组人员列表
					ajaxGetStaffHoursDetail();
					if(staff_hour_list.length>0){
						showStaffList(staff_hour_list);
					}
				}else{
					fadeMessageAlert("",response.message, "gitter-error")
				}
			}
		})
	});

	$(document).on("input",".work_hour",function(){
		var swh_index=Number($(this).attr("swh_index"));
		if(isNaN(Number($(this).val()))){
			alert("参与度/工时只能为数字！");
			$(this).val("");
			return false;
		}
		staff_hour_list[swh_index].work_hour=$(this).val();
	})
	
	$(document).on("input",".distribution",function(){
		var swh_index=Number($(this).attr("swh_index"));
		if(isNaN(Number($(this).val()))){
			alert("分配金额只能为数字！");
			$(this).val("");
			return false;
		}
		staff_hour_list[swh_index].distribution=$(this).val();
	})
	
	$(document).on("input",".bonus",function(){
		var swh_index=Number($(this).attr("swh_index"));
		var rowspan=$(this).parent("td").attr("rowspan");
		rowspan=Number(rowspan);
		var bonus=$(this).val();
		if(isNaN(Number(bonus))){
			alert("补贴车只能为数字！");
			$(this).val("");
			return false;
		}
		
		for(var i=0;i<=rowspan-1;i++){
			staff_hour_list[swh_index+i].bonus=bonus;
		}
	})
	
	$(document).on("input",".skill_parameter",function(){
		var swh_index=Number($(this).attr("swh_index"));
		if(isNaN(Number($(this).val()))){
			alert("技能系数只能为数字！");
			$(this).val("");
			return false;
		}
		//alert($(this).val())
		staff_hour_list[swh_index].skill_parameter=$(this).val();
	})
	
	//保存工时信息
	$(document).on("click","#btnSave",function(){
		var bus_number=$("#bus_number").val();
		var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
		var work_date=$("#work_date").val();
		var cutomer_number=$("#customer_number").val()
		var trs=$("#tableResult tbody").find("tr");
		var total_distribution=0;
		var standard_price=0;
		var save_flag=true;
		var bus_count=1;
		var bonus=$("#bonus").val();	
		
		if(trs.length==0){
			save_flag=false;
			return false;
		}
		
		/**
		 *技能系数 判断逻辑
		 */
		if(salary_model=='技能系数'){
			standard_price=Number($(trs[0]).children("td").eq(4).html());

			//判断参与度/工时有无为空
			$.each(trs,function(i,tr){
				var work_hour=$(tr).find(".work_hour").val();
				if(work_hour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
			})
			if(!save_flag){
				return false;
			}
		}
		/**
		 *承包制 判断逻辑
		 */
		if(salary_model=='承包制'){
			standard_price=Number($(trs[0]).children("td").eq(3).html());
			$.each(trs,function(i,tr){
				var distribution=$(tr).find(".distribution").val();
				if(distribution.trim().length==0){
					alert("分配金额不能为空！");
					save_flag=false;
					return false;
				}
				//total_distribution=numAdd(total_distribution,Number(distribution));
			})
			if(!save_flag){
				return false;
			}
			//判断分配金额之和是否等于班组承包单价

			if(!validateDistribution()){
				alert("分配金额之和必须等于班组承包单价！");
				save_flag = false;
				return false;	
			}
			
		}
		/**
		 * 辅助人力 、底薪模式 判断逻辑
		 */
		if(salary_model=='辅助人力'||salary_model=='底薪模式'){
			$.each(trs,function(i,tr){
				var work_hour=$(tr).find(".work_hour").val();
				if(work_hour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
			})
			if(salary_model=='辅助人力'){
				$.each(trs,function(i,tr){
					var work_hour=$(tr).find(".skill_parameter").val();
					if(work_hour.trim().length==0){
						alert("技能系数不能为空！");
						save_flag=false;
						return false;
					}
				})
			}
		}
		
		//所有条件检验合格后保存计件工时信息
		if(save_flag){
			ajaxSave(staff_hour_list,salary_model,is_customer);
		}
	
})
});

function initPage() {
	//getBusNumberSelect('#nav-search-input');
	getOrgAuthTree($("#workGroupTree"),'production/pieceWorkhourUpdate',"1,2,3,4",'1',3);
	$('#workGroupTree').height($(window).height()-20)
	$('#workGroupTree').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-20,
		mouseWheelLock: true,
		alwaysVisible : true
	});
	
	getBusNumberSelect("#bus_number", "", null);
	
}	

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	factory=null;
	workshop=null;
	workgroup=null;
	team=null;
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
	
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	if(treeNode.org_type != '4'){
		alert("请选择小班组！");
		return false;
	}

	
	//显示选择的小班组人员列表
/*	ajaxGetStaffHoursDetail();
	if(staff_hour_list.length>0){
		showStaffList(staff_hour_list);
	}else{
		alert("未查询到数据！");
	}*/
	
};

function showStaffList(staff_hour_list){
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[];
	if(salary_model=='技能系数'){
		fixedColumns={
	            leftColumns: 5,
	            rightColumns:0
	        };
		rowsGroup=[0,1,2,3,4];
		columns= [
		            {"title":"<input id=\"checkall\" type=\"checkbox\" />","width":"30","class":"center","data":"bus_number","defaultContent": "","render":function(data,type,row){
		            	var html="<input  type=\"checkbox\" bus='"+data+"'/>";
		            		/*"<i class=\"fa fa-times bigger-110\" del_flag='del_all' style=\"cursor: pointer;color: red;\"></i>";*/
		            	return html;
		            }},
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
		            {"title":"单价","width":"50","class":"center","data":"standard_price","defaultContent": ""},
		            {"title":"补贴车","width":"60","class":"center","data":"bonus","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium bonus' style='width:100%;height:28px;text-align:center' value='"+data+"' />";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},		            
		            {"title":"技能系数","width":"70","class":"center","data":"skill_parameter","defaultContent": ""},		            
		            {"title":"参与度/工时","width":"70","class":"center","data": "work_hour","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center' value='"+data+"' />";
		            }},
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		            {"title":"","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" del_flag='del_single' style=\"cursor: pointer;color: red;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}
		          ]	;
	}
	if(salary_model=='承包制'){
		fixedColumns={
	            leftColumns: 5,
	            rightColumns:0
	        };
		rowsGroup=[0,1,2,3,4];
		columns= [
		            {"title":"<input id=\"checkall\" type=\"checkbox\" />","width":"30","class":"center","data":"bus_number","defaultContent": "","render":function(data,type,row){
		            	return "<input  type=\"checkbox\" bus='"+data+"'/>";
		            	//"<i class=\"fa fa-times bigger-110\" del_flag='del_all' style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
		            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},
		            {"title":"补贴车","class":"center","data":"bonus","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium bonus' style='width:60px;height:28px;text-align:center' value='"+data+"' />";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},         	            
		            {"title":"分配金额","width":"100","class":"center","data": "distribution","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium distribution' style='width:60px;height:28px;text-align:center'  value='"+data+"'/>"
		            }},
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		            {"title":"","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" del_flag='del_single' style=\"cursor: pointer;color: red;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}
		          ]	;
	}
	if(salary_model=='辅助人力'){
		fixedColumns={
	            leftColumns: 2,
	            rightColumns:0
	        };
		rowsGroup=[0,1,2,3];
		columns= [
		            {"title":"<input id=\"checkall\" type=\"checkbox\" />","width":"30","class":"center","data":"order_id","defaultContent": "","render":function(data,type,row){
		            	return "<input  type=\"checkbox\" order_id='"+data+"'/>";
		            	//"<i class=\"fa fa-times bigger-110\" del_flag='del_all' order_id='"+data+"' style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"订单","class":"center","data":"order_desc","defaultContent": ""},
		            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
		            {"title":"补贴车","class":"center","data":"bonus","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium bonus' style='width:60px;height:28px;text-align:center' value='"+data+"' />";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},	  
		            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": "","render":function(data,type,row){
		            	var html="";
		            	if(salary_model=='辅助人力'){
		            		html="<input type='text' class='input-medium skill_parameter' style='width:60px;height:28px;text-align:center' value='"+data+"'  />";
		            	}
		            	return html;
		            }},		
		            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center'  value='"+data+"'/>";
		            }},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		            {"title":"","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" del_flag='del_single' style=\"cursor: pointer;color: red;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}
		          ]	;
	}
	if(salary_model=='底薪模式'){
		fixedColumns={
	            leftColumns: 2,
	            rightColumns:0
	        };
		rowsGroup=[0,1];
		columns= [
		            {"title":"<input id=\"checkall\" type=\"checkbox\" />","width":"30","class":"center","data":"work_date","defaultContent": "","render":function(data,type,row){
		            	return "<input  type=\"checkbox\" work_date='"+data+"'/>";
		            	//"<i class=\"fa fa-times bigger-110\" del_flag='del_all' style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"操作日期","class":"center","data":"work_date","defaultContent": ""},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},	  
		            {"title":"技能系数","width":"80","class":"center","data":"skill_parameter","defaultContent": "","render":function(data,type,row){
		            	var html="";
		            	if(salary_model=='辅助人力'){
		            		html="<input type='text' class='input-medium skill_parameter' style='width:60px;height:28px;text-align:center' value='"+data+"'  />";
		            	}
		            	return html;
		            }},		
		            {"title":"参与度/工时","width":"100","class":"center","data": "work_hour","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center'  value='"+data+"'/>";
		            }},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		            {"title":"","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" del_flag='del_single' style=\"cursor: pointer;color: red;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}
		          ]	;
	}
	
	if(salary_model=='自制件承包'){
		fixedColumns={
	            leftColumns: 5,
	            rightColumns:0
	        };
		rowsGroup=[0,1,2,3,4];
		columns= [
		            {"title":"<input id=\"checkall\" type=\"checkbox\" />","width":"30","class":"center","data":"bus_number","defaultContent": "","render":function(data,type,row){
		            	return "<input  type=\"checkbox\" bus_number='"+data+"'/>";
		            	//"<i class=\"fa fa-times bigger-110\" del_flag='del_all' style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},
		            {"title":"操作日期","width":"90","class":"center","data":"work_date","defaultContent": ""},
		            {"title":"单价","width":"50","class":"center","data":"standard_price","defaultContent": ""},
		            {"title":"补贴车","width":"60","class":"center","data":"bonus","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium bonus' style='width:50px;height:28px;text-align:center;margin:0px' value='"+data+"' />";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""}, 
		            {"title":"参与度<br/>/工时","width":"70","class":"center","data": "work_hour","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:100%;height:28px;text-align:center;margin:0px'  value='"+(data||0)+"'/>"
		            }},
		            {"title":"分配金额","width":"70","class":"center","data": "distribution","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium distribution' style='width:100%;height:28px;text-align:center;margin:0px'  value='"+data+"'/>"
		            }},
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		            {"title":"","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" del_flag='del_single' style=\"cursor: pointer;color: red;\" row='"+JSON.stringify(row)+"' swh_id='"+row.id+"'></i>";
		            }}
		          ]	;
	}
	
	$("#tableResult").DataTable({
		paiging:false,
		ordering:false,
		searching: false,
		autoWidth:false,
		/*fixedColumns:fixedColumns,*/
		rowsGroup:rowsGroup,
		paginate:false,
		sScrollY: $(window).height()-110,
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
		createdRow: function ( row, data, index ) {
			//alert(index)
			 $('td', row).find("input").attr("swh_index",index);
        },
		data:staff_hour_list,
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

function ajaxGetStaffHoursDetail(staff_number){
	var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
		$.ajax({
			url:'getStaffHoursDetail',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				org_id:org_id,
				factory:factory,
				workshop:workshop,
				workgroup:workgroup,
				team:team,
				bus_number:$("#bus_number").val(),
				wdate_start:$("#wdate_start").val(),
				wdate_end:$("#wdate_end").val(),
				status:'2'
			},
			success:function(response){
				if(response.salary_model){
					salary_model=response.salary_model.salary_model;
					is_customer=response.salary_model.customer_no_flag;
				}
				staff_hour_list=response.staff_hour_list;	
				if(staff_hour_list.length<=0){
					alert("未查询到数据！");
				}
			}
		})
}

function ajaxSave(staffHourList,salary_model,is_customer){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'updateStaffHours',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			staffHourList:JSON.stringify(staffHourList),
			is_customer:is_customer,
			salary_model:salary_model
		},
		success:function(response){
			$(".divLoading").hide();	
			fadeMessageAlert("",response.message, "gitter-success")			
			//先destroy datatable，隐藏form
			if($.fn.dataTable.isDataTable("#tableResult")){
				$('#tableResult').DataTable().destroy();
				$('#tableResult').empty();
			}
			
			//显示选择的小班组人员列表
			ajaxGetStaffHoursDetail();
			if(staff_hour_list.length>0){
				showStaffList(staff_hour_list);
			}
		}
	});

}
//限制开始和结束时间为同一个月
function limitMonthDate(e) {
	var DateString;
	if (e == 2) {
		var beginDate = $dp.$("wdate_start").value;
		if (beginDate != "" && beginDate != null) {
			var limitDate = new Date(beginDate);
			limitDate.setDate(new Date(limitDate.getFullYear(), limitDate
					.getMonth() + 1, 0).getDate()); //获取此月份的天数
			DateString = limitDate.getFullYear() + '-'
					+ (limitDate.getMonth() + 1) + '-'
					+ limitDate.getDate();
			return DateString;
		}
	}
	if (e == 1) {
		var endDate = $dp.$("wdate_end").value;
		if (endDate != "" && endDate != null) {
			var limitDate = new Date(endDate);
			limitDate.setDate("1"); //设置闲置时间为月初
			DateString = limitDate.getFullYear() + '-'
					+ (limitDate.getMonth() + 1) + '-'
					+ limitDate.getDate();
			return DateString;
		}
	}
	
}
/**
 * 校验每一台车每天所有人的分配金额之和是否等于班组承包单价
 */
function validateDistribution(){
	var flag=true;
	var standar_price_arr={};
	var total_distribution_arr={};
	var last_bus_number="";
	var last_order_id="";
	var last_work_date="";
	var arr_count=0;
 
	for(var i in staff_hour_list){
		
		if(staff_hour_list[i].bus_number!=last_bus_number||staff_hour_list[i].work_date!=last_work_date||staff_hour_list[i].order_id!=last_order_id){
			standar_price_arr[arr_count]=parseFloat(staff_hour_list[i].standard_price);
			total_distribution_arr[arr_count]=parseFloat(staff_hour_list[i].distribution);
			arr_count++;
		}else{
			total_distribution_arr[arr_count-1]=numAdd(total_distribution_arr[arr_count-1],parseFloat(staff_hour_list[i].distribution));
		}
		last_bus_number=staff_hour_list[i].bus_number;
		last_order_id=staff_hour_list[i].order_id;
		last_work_date=staff_hour_list[i].work_date;		
	}
	
	for(var j in standar_price_arr){
		if(standar_price_arr[j]!=total_distribution_arr[j]){
			flag=false;
			return false;
		}
	}
	return flag;
}
