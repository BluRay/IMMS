var factory="";
var workshop="";
var workgroup="";
var team="";
var salary_model="技能系数";
var staff_list=[];
var org_id="";
var is_customer="0";
var order_id="0";
var standard_price=0;
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

/*	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})*/
	
	$(document).on("keydown",".work_hour",function(event){
			if (event.keyCode == "13") {								
				$(this).parent().parent().next().find(".work_hour").focus().select();
			}
	})
	
	$(document).on("keydown",".distribution",function(event){
		if (event.keyCode == "13") {								
			$(this).parent().parent().next().find(".distribution").focus().select();
		}
	})
	
	$(document).on("keydown",".skill_parameter",function(event){
		if (event.keyCode == "13") {								
			$(this).parent().parent().next().find(".skill_parameter").focus().select();
		}
	})
	
	$(document).on("click",".dstcopy",function(e){
		//$(".distribution :eq(0)").focus();
		var flag=$(e.target).attr("cp_flag");
		var cp_list=$("."+flag);
	/*	if(work_hourlist.length==0){
			work_hourlist=$(".distribution");
		}*/
		//alert(work_hourlist.length);
		$(cp_list).eq(0).css("display","none");
		$("#copy_paste_"+flag).val($(cp_list).eq(0).val()).css("display","").css("background-color","rgb(191, 237, 245)").select();
		$(cp_list).css("background-color","rgb(191, 237, 245)");
	});
	
	$(document).on("paste","#copy_paste_work_hour",function(e){
		 setTimeout(function(){
			 var copy_text=$(e.target).val();
			 $(e.target).val("");
			 var dist_list=copy_text.split(" ");
			 var work_hourlist=$(".work_hour");
			/*if(work_hourlist.length==0){
				work_hourlist=$(".distribution");
			}*/
			 $(work_hourlist).eq(0).css("display","");
				$("#copy_paste_work_hour").css("display","none");
			 $.each(dist_list,function(i,value){
				 $(work_hourlist).eq(i).val(value);								 
			 });
			 $(work_hourlist).css("background-color","white");
			 //alert(dist_list.length);
			 //alert(copy_text);
		 },1);
	});
	
	$(document).on("paste","#copy_paste_distribution",function(e){
		 setTimeout(function(){
			 var copy_text=$(e.target).val();
			 $(e.target).val("");
			 var dist_list=copy_text.split(" ");
			 var work_hourlist=$(".distribution");
	
			 $(work_hourlist).eq(0).css("display","");
				$("#copy_paste_distribution").css("display","none");
			 $.each(dist_list,function(i,value){
				 $(work_hourlist).eq(i).val(value);								 
			 });
			 $(work_hourlist).css("background-color","white");
			 //alert(dist_list.length);
			 //alert(copy_text);
		 },1);
	});
	$(document).on("paste","#copy_paste_skill_parameter",function(e){
		 setTimeout(function(){
			 var copy_text=$(e.target).val();
			 $(e.target).val("");
			 var dist_list=copy_text.split(" ");
			 var skill_parameter_list=$(".skill_parameter");
	
			 $(skill_parameter_list).eq(0).css("display","");
			 $("#copy_paste_skill_parameter").css("display","none");
			 $.each(dist_list,function(i,value){
				 $(skill_parameter_list).eq(i).val(value);								 
			 });
			 $(skill_parameter_list).css("background-color","white");
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
		
		if(order_id=='0'&&is_customer=='0'&&(salary_model=='技能系数'||salary_model=='承包制'||salary_model=='自制件承包')){
			alert("请输入有效车号/订单号!");
			return false;
		}
		if(order_id=='0'&&is_customer=='1'){
			alert("请输入有效订单号!");
			return false;
		}
		if($("#work_date").val().trim().length==0){
			alert("请输入操作日期!");
			return false;
		}
		
		var tr1=$("#tableResult tbody").find("tr").eq(0);
		
		var tr=$("<tr />");
		if(salary_model=='技能系数'){
			//var price=$(tr1).children("td").eq(4).html();
			
			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;margin: 0;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html(standard_price).appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium work_hour' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		if(salary_model=='承包制'){
			//var price=$(tr1).children("td").eq(4).html();

			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;margin: 0;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html(standard_price).appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium distribution' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste_distribution' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
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
			if(salary_model=='辅助人力'){
				$("<td class='center'/>").html("<input class='input-medium skill_parameter' style='width:60px;height:28px;text-align:center' type='text'>"+
						"<input id='copy_paste_skill_parameter' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			}else{
				$("<td class='center'/>").html("").appendTo(tr);
			}
			
			$("<td class='center'/>").html("<input class='input-medium work_hour' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		if(salary_model=='自制件承包'){
			$("<td class='center'/>").html("<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>").appendTo(tr);
			$("<td class='center'/>").html("<input type='text' class='staff_number' style='width:100%;height:28px;font-size:12px;text-align:center;' />").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium work_hour' style='width:60px;height:28px;text-align:center' type='text'>"+
					"<input id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("<input class='input-medium distribution' style='width:60px;height:28px;text-align:center' type='text'>"+
			"<input id='copy_paste_distribution' class='input-small' style='width:60px;height:28px;text-align:center;display:none' type='text'>").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
			$("<td class='center'/>").html("").appendTo(tr);
		}
		
		$("#tableResult tbody").append(tr);
	});
	
/*	$(document).on("change","#customer_number",function(){
		ajaxQueryTeamStaffDetail();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
	})*/
	
	$(document).on("change",".staff_number",function(){
		//alert($(this).val());
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
				$(this).attr("skill_parameter",staff.skill_parameter);
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
				 if(salary_model=='辅助人力'){
					 $(tds[3]).find(".skill_parameter").eq(0).val(staff.skill_parameter); 
				 }else{
					 $(tds[3]).html(staff.skill_parameter);
				 }
				 
				 $(tds[5]).html(staff.team_org);
				 $(tds[6]).html(staff.workgroup_org);
				 $(tds[7]).html(staff.workshop_org);
				 $(tds[8]).html(staff.plant_org);
			}
			if(salary_model=='自制件承包'){
				$(this).attr("skill_parameter",staff.skill_parameter);
				 $(tds[1]).html(staff.name);
				 $(tds[2]).html(staff.job);
				 $(tds[4]).find(".workhour").eq(0).val(staff.workhour)
				 $(tds[5]).find(".distribution").eq(0).val(staff.distribution)
				 $(tds[6]).html(staff.team_org);
				 $(tds[7]).html(staff.workgroup_org);
				 $(tds[8]).html(staff.workshop_org);
				 $(tds[9]).html(staff.plant_org);		
			}
		 }
	});
	
	$(document).on("input",".work_hour",function(){
		if(isNaN(Number($(this).val()))){
			$(this).val("");
			alert("参与度/工时只能为数字！");
			return false;
		}
	})
	
	$(document).on("input",".distribution",function(){
		if(isNaN(Number($(this).val()))){
			$(this).val("");
			alert("分配金额只能为数字！");
			return false;
		}
	})
	
	$(document).on("input","#bonus",function(){
		if(isNaN(Number($(this).val()))){			
			$(this).val("");
			alert("补贴车只能为数字！");
			return false;
		}
	})
	$(document).on("input",".skill_parameter",function(){
		if(isNaN(Number($(this).val()))){
			alert("技能系数只能为数字！");
			$(this).val("");
			return false;
		}
	})
	
	//保存工时信息
	$(document).on("click","#btnSave",function(){
		var bus_number=$("#bus_number").val();
		order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
		var order_no=$("#order_no").val();
		var work_date=$("#work_date").val();
		var cutomer_number="("+order_no+")"+$("#customer_number").val()
		var staffHourList=[];
		var trs=$("#tableResult tbody").find("tr");
		var total_distribution=0;
		var save_flag=true;
		var bus_count=1;
		var bonus=$("#bonus").val()||0;
		if(trs.length==0){
			save_flag=false;
			return false;
		}
		
		//判断该车间的该月工资是否已提交/结算
		if(checkSalarySubmit(factory,workshop,work_date.substring(0,7))=='true'){
			alert(factory+workshop+"车间工资已提交/结算，不允许再维护工时信息！");
			save_flag=false;
			return false;
		}		
		
		/**
		 *技能系数 判断逻辑
		 */
		if(salary_model=='技能系数'){
			//standard_price=Number($(trs[0]).children("td").eq(4).html());
			if(standard_price==0){
				saveFlag = false;
				alert("该班组未维护班组承包单价！");
				return false;
			}
			//判断车号、操作日期是否有效填写（自编号模式判断订单、自编号、操作日期是否有效填写）		
			if(is_customer=='1'){
				if(cutomer_number.trim().length==0){
					alert("请填写自编号！");
					save_flag=false;
					return false;
				}
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效订单！")
					save_flag=false;
					return false;
				}			
				var area=cutomer_number.split("_");
				if(area.length<=1 && workshop=='自制件'){
					alert("输入格式不正确，自编号格式为：车型-订单_起始号-结束号！");
					save_flag=false;
					return false;
				}
				if(area[1].split("-").length>1){
					bus_start=area[1].split("-")[0];
					bus_end=area[1].split("-")[1];
					if(isNaN(parseInt(bus_start))||isNaN(parseInt(bus_end))){
						alert("起始号和结束号必须为数字！");
						save_flag=false;
						return false;
					}else{
						bus_count=parseInt(bus_end,0)-parseInt(bus_start,0)+1;
					}					
				}
				if(area.length<=1&&workshop!='自制件'){					
					alert("输入格式不正确，自编号格式为：车型-订单-年份_编号！");
					save_flag=false;
					return false;
				}else{
					var year=area[0].split("-")[2];
					if(isNaN(parseInt(year))){
						alert("年份必须为4位数字！");
						save_flag=false;
						return false;
					}
					if(parseInt(year)<1000){
						alert("年份必须为4位数字！");
						save_flag=false;
						return false;
					}
				}
				if(area[1].split("-").length>1 && workshop!='自制件'){
					bus_start=area[1].split("-")[0];
					bus_end=area[1].split("-")[1];
					if(bus_end!=undefined|| bus_end!=null){
						alert("输入格式不正确，自编号格式为：车型-订单-年份_编号！");
						save_flag=false;
						return false;
					}
				}
				if(workshop!='自制件'){
					bus_count=1;
				}
				if(bus_count<0 && workshop=='自制件'){
					alert("结束号必须大于起始号");
					save_flag=false;
					return false;			
				}
			}else{
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效车号！")
					save_flag=false;
					return false;
				}		
			}
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				save_flag=false;
				return false;
			}
			/**判断车辆是否在车间上线
			*判断车号、操作日期是否已经录入过记录（自编号模式下判断自编号、操作日期是否已经录入过记录）
			**/
			if(is_customer=='0'){
				save_flag=validateBus(bus_number,is_customer,work_date);
			}else{
				save_flag=validateBus(cutomer_number,is_customer);
			}
			if(!save_flag){
				return false;
			}
			//判断参与度/工时有无为空
			$.each(trs,function(i,tr){
				var tds=$(tr).children("td");
				var work_hour=$(tds).eq(6).find(".work_hour").val();				
				if(work_hour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
				var staff_number = $(tds).eq(1).html();
				var input_staff_number=$(tds).eq(1).find(".staff_number");
				//alert($(input_staff_number).html())
				if(input_staff_number!=undefined&&input_staff_number.length>0){
					staff_number=$(input_staff_number).val()||"";
				}
				var staff_name=$(tds).eq(2).html();
				var job=$(tds).eq(3).html();
				if (staff_number.trim().length > 0) {
					var staff={};
					staff.staff_number=staff_number;
					staff.staff_name=staff_name;
					staff.job=job;
					staff.factory=factory;
					staff.workshop = workshop;
					staff.workgroup=workgroup;
					staff.team=team;
					staff.org_id=org_id;
					staff.salary_model=salary_model;
					staff.bus_number=bus_number||cutomer_number;
					staff.bus_count=bus_count;
					staff.bonus=bonus;
					staff.work_date=work_date;
					staff.skill_parameter=$(tds).eq(5).html();
					staff.work_hour=work_hour;
					staff.standard_price=standard_price;
					staff.status='1';
					staff.order_id=order_id;
			
					if(!isContain(staff,staffHourList)){
						staffHourList.push(staff);
					}else{
						saveFlag=false;
						alert(staff.staff_name+"不能重复维护工时！");
						return false;
						
					}
				}
			
			})
		}
		/**
		 *承包制 判断逻辑
		 */
		if(salary_model=='承包制'){
			//standard_price=Number($(trs[0]).children("td").eq(4).html());
		
			//判断车号、操作日期是否有效填写（自编号模式判断订单、自编号、操作日期是否有效填写）
			if(is_customer=='1'){
				if(cutomer_number.trim().length==0){
					alert("请填写自编号！");
					save_flag=false;
					return false;
				}
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效订单！")
					save_flag=false;
					return false;
				}			
				var area=cutomer_number.split("_");
				if(area.length<=1 && workshop=='自制件'){
					alert("输入格式不正确，自编号格式为：车型-订单_起始号-结束号！");
					save_flag=false;
					return false;
				}
				if(area[1].split("-").length>1){
					bus_start=area[1].split("-")[0];
					bus_end=area[1].split("-")[1];
					if(isNaN(parseInt(bus_start))||isNaN(parseInt(bus_end))){
						alert("起始号和结束号必须为数字！");
						save_flag=false;
						return false;
					}else{
						bus_count=parseInt(bus_end,0)-parseInt(bus_start,0)+1;
					}					
				}
				if(area.length<=1&&workshop!='自制件'){					
					alert("输入格式不正确，自编号格式为：车型-订单-年份_编号！");
					save_flag=false;
					return false;
				}else{
					var year=area[0].split("-")[2];
					if(isNaN(parseInt(year))){
						alert("年份必须为4位数字！");
						save_flag=false;
						return false;
					}
					if(parseInt(year)<1000){
						alert("年份必须为4位数字！");
						save_flag=false;
						return false;
					}
				}
				if(area[1].split("-").length>1 && workshop!='自制件'){
					bus_start=area[1].split("-")[0];
					bus_end=area[1].split("-")[1];
					if(bus_end!=undefined|| bus_end!=null){
						alert("输入格式不正确，自编号格式为：车型-订单-年份_编号！");
						save_flag=false;
						return false;
					}
				}
				if(workshop!='自制件'){
					bus_count=1;
				}
				if(bus_count<0 && workshop=='自制件'){
					alert("结束号必须大于起始号");
					save_flag=false;
					return false;
				}
			}else{
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效车号！")
					save_flag=false;
					return false;
				}		
			}
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				save_flag=false;
				return false;
			}
			if(standard_price==0){
				saveFlag = false;
				alert("该班组未维护班组承包单价！");
				return false;
			}
			/**判断车辆是否在车间上线
			*判断车号、操作日期是否已经录入过记录（自编号模式下判断自编号、操作日期是否已经录入过记录）
			**/
			if(is_customer=='0'){
				save_flag=validateBus(bus_number,is_customer,work_date);
			}else{
				save_flag=validateBus(cutomer_number,is_customer);
			}
			if(!save_flag){
				return false;
			}
			//判断分配金额有无为空
			$.each(trs,function(i,tr){
				var tds=$(tr).children("td");
				var tr_obj=$("#tableResult").dataTable().fnGetData($(tr));
				//standard_price=Number($(tr).children("td").eq(4).html());
				var distribution=$(tr).children("td").eq(5).find(".distribution").val();
				total_distribution=numAdd(total_distribution,Number(distribution));
				if(distribution.trim().length==0){
					alert("分配金额不能为空！");
					save_flag=false;
					return false;
				}
				var staff_number = $(tds).eq(1).html();
				var input_staff_number=$(tds).eq(1).find(".staff_number");
				//alert($(input_staff_number).html())
				if(input_staff_number!=undefined&&input_staff_number.length>0){
					staff_number=$(input_staff_number).val()||"";
				}
				var staff_name=$(tds).eq(2).html();
				var job=$(tds).eq(3).html();
				if (staff_number.trim().length > 0) {
					var staff={};
					staff.staff_number=staff_number;
					staff.staff_name=staff_name;
					staff.job=job;
					staff.standard_price=standard_price;
					staff.factory=factory;
					staff.workshop = workshop;
					staff.workgroup=workgroup;
					staff.team=team;
					staff.org_id=org_id;
					staff.salary_model=salary_model;
					staff.bus_number=bus_number||cutomer_number;
					staff.bus_count=bus_count;
					staff.bonus=bonus;
					staff.work_date=work_date;
					staff.skill_parameter=$(input_staff_number).attr("skill_parameter");
					staff.distribution=distribution;
					staff.status='1';
					staff.order_id=order_id;
			
					if(!isContain(staff,staffHourList)){
						staffHourList.push(staff);
					}else{
						saveFlag=false;
						alert(staff.staff_name+"不能重复维护工时！");
						return false;
						
					}
				}
			})
			if(!save_flag){
				return false;
			}
			//判断分配金额之和是否等于班组承包单价
			if(total_distribution!=standard_price){
				save_flag = false;
				alert("分配金额之和必须等于班组承包单价"+standard_price);
				return false;				
			}	
			if(!save_flag){
				return false;
			}
		}
		
		/**
		 *辅助人力 判断逻辑
		 */
		if(salary_model=='辅助人力'){
			//判断操作日期有无填写
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				save_flag=false;
				return false;
			}
			//订单校验
			if(!order_id||order_id.trim().length==0){
				alert("请填写有效订单！")
				save_flag=false;
				return false;
			}	
			work_date=getLastDayOfMonth(work_date);//辅助人力模式操作日期为月最后一天
			
			//判断该小班组、操作日期是否已经录入过记录
			save_flag=validateRecordIn(work_date,order_id);
			if(!save_flag){
				return false;
			}
			
			//判断参与度/工时有无为空
			$.each(trs,function(i,tr){
				var tds=$(tr).children("td");
				var work_hour=$(tds).eq(5).find(".work_hour").val();						
				if(work_hour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
				var staff_number = $(tds).eq(1).html();
				var input_staff_number=$(tds).eq(1).find(".staff_number");
				//alert($(input_staff_number).html())
				if(input_staff_number!=undefined&&input_staff_number.length>0){
					staff_number=$(input_staff_number).val()||"";
				}
				var staff_name=$(tds).eq(2).html();
				var job=$(tds).eq(3).html();
				var skill_parameter=$(tds).eq(4).find(".skill_parameter").val();
				if (staff_number.trim().length > 0) {
					var staff={};
					staff.staff_number=staff_number;
					staff.staff_name=staff_name;
					staff.job=job;
					staff.factory=factory;
					staff.workshop = workshop;
					staff.workgroup=workgroup;
					staff.team=team;
					staff.org_id=org_id;
					staff.salary_model=salary_model;
					staff.work_date=work_date;	
					staff.skill_parameter=skill_parameter;
					staff.work_hour=work_hour;
					staff.bonus=bonus;
					staff.status='1';
					staff.order_id=order_id;
			
					if(!isContain(staff,staffHourList)){
						staffHourList.push(staff);
					}else{
						saveFlag=false;
						alert(staff.staff_name+"不能重复维护工时！");
						return false;
						
					}
				}
			})
		}
		
		/**
		 *底薪模式 判断逻辑
		 */
		if(salary_model=='底薪模式'){
			//判断操作日期有无填写
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				save_flag=false;
				return false;
			}			
			//判断该小班组、操作日期是否已经录入过记录
			save_flag=validateRecordIn(work_date);
			if(!save_flag){
				return false;
			}
			//判断参与度/工时有无为空
			$.each(trs,function(i,tr){
				var tds=$(tr).children("td");
				var work_hour=$(tds).eq(5).find(".work_hour").val();						
				if(work_hour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
				var staff_number = $(tds).eq(1).html();
				var input_staff_number=$(tds).eq(1).find(".staff_number");
				//alert($(input_staff_number).html())
				if(input_staff_number!=undefined&&input_staff_number.length>0){
					staff_number=$(input_staff_number).val()||"";
				}
				var staff_name=$(tds).eq(2).html();
				var job=$(tds).eq(3).html();
				var skill_parameter=$(tds).eq(4).html();

				if (staff_number.trim().length > 0) {
					var staff={};
					staff.staff_number=staff_number;
					staff.staff_name=staff_name;
					staff.job=job;
					staff.factory=factory;
					staff.workshop = workshop;
					staff.workgroup=workgroup;
					staff.team=team;
					staff.org_id=org_id;
					staff.salary_model=salary_model;
					staff.work_date=work_date;	
					staff.skill_parameter=skill_parameter;
					staff.work_hour=work_hour;
					staff.bonus=bonus;
					staff.status='1';
			
					if(!isContain(staff,staffHourList)){
						staffHourList.push(staff);
					}else{
						saveFlag=false;
						alert(staff.staff_name+"不能重复维护工时！");
						return false;
						
					}
				}
			})
		}
		
		/**
		 *自制件承包制 判断逻辑
		 */
		if(salary_model=='自制件承包'){
			//standard_price=Number($(trs[0]).children("td").eq(4).html());
			
			//判断车号、操作日期是否有效填写（自编号模式判断订单、自编号、操作日期是否有效填写）
			if(is_customer=='1'){
				if(cutomer_number.trim().length==0){
					alert("请填写自编号！");
					save_flag=false;
					return false;
				}
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效订单！")
					save_flag=false;
					return false;
				}		
				
				var area=cutomer_number.split("_");
				if(area.length<=1){
					alert("输入格式不正确，自编号格式为：车型-订单_起始号-结束号！");
					save_flag=false;
					return false;
				}
				if(area[1].split("-").length>1){
					bus_start=area[1].split("-")[0];
					bus_end=area[1].split("-")[1];
					if(isNaN(parseInt(bus_start))||isNaN(parseInt(bus_end))){
						alert("起始号和结束号必须为数字！");
						save_flag=false;
						return false;
					}else{
						bus_count=parseInt(bus_end,0)-parseInt(bus_start,0)+1;
					}					
				}
				if(bus_count<0){
					alert("结束号必须大于起始号");
					save_flag=false;
					return false;
				}
			}else{
				if(!order_id||order_id.trim().length==0){
					alert("请填写有效车号！")
					save_flag=false;
					return false;
				}		
			}
			if(work_date.trim().length==0){
				alert("请填写操作日期！")
				save_flag=false;
				return false;
			}
			if(standard_price==0){
				saveFlag = false;
				alert("该班组未维护班组承包单价！");
				return false;
			}
			/**判断车辆是否在车间上线
			*判断车号、操作日期是否已经录入过记录（自编号模式下判断自编号、操作日期是否已经录入过记录）
			**/
			if(is_customer=='0'){
				save_flag=validateBus(bus_number,is_customer,work_date);
			}else{
				save_flag=validateBus(cutomer_number,is_customer);
			}
			if(!save_flag){
				return false;
			}
			//判断分配金额有无为空，参与度/工时有无为空
			$.each(trs,function(i,tr){
				var tds=$(tr).children("td");
				var tr_obj=$("#tableResult").dataTable().fnGetData($(tr));
				//standard_price=Number($(tr).children("td").eq(4).html());
				var workhour=$(tr).children("td").eq(5).find(".work_hour").val()||"";
				var distribution=$(tr).children("td").eq(6).find(".distribution").val()||"";
				total_distribution=numAdd(total_distribution,Number(distribution));
				if(workhour.trim().length==0){
					alert("参与度/工时不能为空！");
					save_flag=false;
					return false;
				}
				if(distribution.trim().length==0){
					alert("分配金额不能为空！");
					save_flag=false;
					return false;
				}
				
				var staff_number = $(tds).eq(1).html();
				var input_staff_number=$(tds).eq(1).find(".staff_number");
				//alert($(input_staff_number).html())
				if(input_staff_number!=undefined&&input_staff_number.length>0){
					staff_number=$(input_staff_number).val()||"";
				}
				var staff_name=$(tds).eq(2).html();
				var job=$(tds).eq(3).html();
				if (staff_number.trim().length > 0) {
					var staff={};
					staff.staff_number=staff_number;
					staff.staff_name=staff_name;
					staff.job=job;
					staff.standard_price=standard_price;
					staff.factory=factory;
					staff.workshop = workshop;
					staff.workgroup=workgroup;
					staff.team=team;
					staff.org_id=org_id;
					staff.salary_model=salary_model;
					staff.bus_number=bus_number||cutomer_number;
					staff.bus_count=bus_count;
					staff.bonus=bonus;
					staff.work_date=work_date;
					staff.skill_parameter=$(input_staff_number).attr("skill_parameter");
					staff.work_hour=workhour;
					staff.distribution=distribution;
					staff.status='1';
					staff.order_id=order_id;
			
					if(!isContain(staff,staffHourList)){
						staffHourList.push(staff);
					}else{
						saveFlag=false;
						alert(staff.staff_name+"不能重复维护工时！");
						return false;
						
					}
				}
			})
			if(!save_flag){
				return false;
			}
			//判断分配金额之和是否等于班组承包单价
			if(total_distribution!=standard_price){
				save_flag = false;
				alert("分配金额之和必须等于班组承包单价"+standard_price);
				return false;				
			}	
			if(!save_flag){
				return false;
			}
		}
		
		//所有条件检验合格后保存计件工时信息
		if(save_flag&&staffHourList.length>0){
			ajaxSave(staffHourList,salary_model,is_customer);
		}
	
})
});

function initPage() {
	//getBusNumberSelect('#nav-search-input');
	getOrgAuthTree($("#workGroupTree"),'production/pieceWorkhourMtn',"1,2,3,4",'1',3);
	$('#workGroupTree').height($(window).height()-20)
	$('#workGroupTree').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-20,
		mouseWheelLock: true,
		alwaysVisible : true
	});	
	
}	

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	salary_model=treeNode.salary_model;
	is_customer=treeNode.is_customer;
	//alert(is_customer)
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
	$("#factory").val(factory)
	
	if(treeNode.org_type != '4'){
		alert("请选择小班组！");
		return false;
	}
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	$("#form").css("display","none");
	
	if(salary_model ==undefined){
		alert(team+"未维护计资模式，请联系人资维护计资模式！");
		return false;
	}	

	var table=$("<table />");
	if(salary_model=='技能系数'||salary_model=='承包制'||salary_model=='自制件承包'){
		var tr=$("<tr />");
		if(is_customer=="1"){
			$("<td />").html("订单：").appendTo(tr);
			$("<td />").html("<input type=\"text\" id=\"order_no\" class=\"input-medium carType\" style=\"height: 30px; width: 100px;\"></input>").appendTo(tr);
			$("<td />").html("自编号：").appendTo(tr);
			
			if(workshop!='自制件'){
				$("<td />").html("<input type=\"text\" id=\"customer_number\" placeholder=\"车型-订单-年份_编号\" class=\"input-medium carType\" style=\"height: 30px; width: 150px;\"></input>").appendTo(tr);
			}else{
				$("<td />").html("<input type=\"text\" id=\"customer_number\" placeholder=\"车型-订单_起始号-结束号\" class=\"input-medium carType\" style=\"height: 30px; width: 150px;\"></input>").appendTo(tr);
			}
		}else{
			$("<td />").html("车号：").appendTo(tr);
			$("<td />").html("<input type=\"text\" id=\"bus_number\" class=\"input-medium carType\" style=\"height: 30px; width: 150px;\"></input>").appendTo(tr);
		}

		$("<td />").html("操作日期：").appendTo(tr);
		$("<td />").html("<input id=\"work_date\" class=\"input-medium\" style=\"width: 90px;height: 30px;\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){changeWorkDate()}})\" type=\"text\">").appendTo(tr);
		$("<td />").html("补贴车：").appendTo(tr);
		$("<td />").html("<input style=\"height: 30px; width: 50px;\" type=\"text\" class=\"input-medium revise\" id=\"bonus\" />").appendTo(tr);		
		$("<td style='padding-left:10px'/>").html("计资模式：").appendTo(tr);
		$("<td />").html(salary_model).appendTo(tr);
		$("<td />").html("<input type=\"button\" class=\"btn btn-sm btn-info\" id=\"btnSave\" value=\"保存\" style=\"margin-left: 10px;\"></input>").appendTo(tr);
		$(table).append(tr);
		$("#form").html(table).css("display","");
	}else if(salary_model=='辅助人力'){
		var tr=$("<tr />");
		$("<td />").html("订单：").appendTo(tr);
		$("<td />").html("<input type=\"text\" id=\"order_no\" class=\"input-medium carType\" style=\"height: 30px; width: 100px;\"></input>").appendTo(tr)		
		$("<td />").html("操作日期：").appendTo(tr);
		$("<td />").html("<input id=\"work_date\" class=\"input-medium\" style=\"height: 30px;width: 90px\" onclick=\"WdatePicker({dateFmt:'yyyy-MM',maxDate:new Date(),onpicked:function(){changeWorkDate()}})\" type=\"text\">").appendTo(tr);
		$("<td />").html("补贴车：").appendTo(tr);
		$("<td />").html("<input style=\"height: 30px; width: 50px;\" type=\"text\" class=\"input-medium revise\" id=\"bonus\" />").appendTo(tr);	
		$("<td />").html("车间产量：<span id=\"workshop_prd_qty\">").appendTo(tr);
		$("<td style='padding-left:10px'/>").html("计资模式：").appendTo(tr);
		$("<td />").html(salary_model).appendTo(tr);
		$("<td />").html("<input type=\"button\" class=\"btn btn-sm btn-info\" id=\"btnSave\" value=\"保存\" style=\"margin-left: 10px;\"></input>").appendTo(tr);
		$(table).append(tr);
		$("#form").html(table).css("display","");
	}else{
		var tr=$("<tr />");
		$("<td />").html("操作日期：").appendTo(tr);
		$("<td />").html("<input id=\"work_date\" class=\"input-medium\" style=\"width: 90px\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){changeWorkDate()}})\" type=\"text\">").appendTo(tr);
		$("<td style='padding-left:10px'/>").html("计资模式：").appendTo(tr);
		$("<td />").html(salary_model).appendTo(tr);
		$("<td />").html("<input type=\"button\" class=\"btn btn-sm btn-info\" id=\"btnSave\" value=\"保存\" style=\"margin-left: 10px;\"></input>").appendTo(tr);
		$(table).append(tr);
		$("#form").html(table).css("display","");
	}	
	
	getOrderNoSelect("#order_no", "", function(obj){
		ajaxQueryTeamStaffDetail();
		standard_price=ajaxGetWorkgroupPrice();
		/*if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}*/
		if(obj.id!=order_id){
			showStaffList(staff_list)	
		}else{
			updateStaffInfo(staff_list);
		}

		order_id=obj.id;
		
		/**
		 * 辅助人力模式获取订单车间产量
		 */
		if(salary_model=='辅助人力' && $("#work_date").val().trim().length>0){
			var prd_qty=ajaxGetWorkshopPrdQty(order_id,factory,workshop,$("#work_date").val());
			$("#workshop_prd_qty").html(prd_qty)
		}
		
		
	}, null,"#factory",null);
	
	getBusNumberSelect("#bus_number", "", function(obj){
		ajaxQueryTeamStaffDetail();
		standard_price=ajaxGetWorkgroupPrice();
		/*if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}*/
		if(obj.order_id!=order_id){
			showStaffList(staff_list)	
		}else{
			updateStaffInfo(staff_list);
		}	
		order_id=obj.order_id;
	});
	
	if(order_id ==undefined || order_id=='' ||order_id =='0'){
		return false;
	}
	if($("#work_date").val().trim().length ==0){
		return false;
	}
	ajaxQueryTeamStaffDetail();
	
	
	
	//显示选择的小班组人员列表
	showStaffList(staff_list)
};

function ajaxQueryTeamStaffDetail(){
	//var bus_type="";
	var order_id_update=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
	
	var work_date=$("#work_date").val();
/*	if(work_date.trim().length==0){
		alert("请输入操作日期！");
	}*/
	if(salary_model=='辅助人力'){
		work_date=getLastDayOfMonth(work_date);
	}
	
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
			order_id:order_id_update,
			work_date:work_date
		},
		success:function(response){
			if(response.salary_model){
				salary_model=response.salary_model.salary_model;
				is_customer=response.salary_model.customer_no_flag;
			}
			staff_list=response.staff_list;
			
		}
	})
}

function showStaffList(staff_list){
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
	
	if(staff_list.length==0){
		alert("未维护班组成员！");
		//return false;
	}
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
		            {"title":"参与度/工时"+"&nbsp;<i  title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='work_hour' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center'  />"+
		            	"<input type='text' id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
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
		            {"title":"分配金额"+"&nbsp;<i title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='distribution' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "distribution","defaultContent": "","render":function(data,type,row){
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
		            {"title":"技能系数"+"&nbsp;<i title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='skill_parameter'  style='cursor: pointer;color:blue'></i>","width":"80","class":"center","data":"skill_parameter","defaultContent": "","render":function(data,type,row){
		            	var html="";
		            	if(salary_model=='辅助人力'){
		            		html="<input type='text' class='input-medium skill_parameter' style='width:60px;height:28px;text-align:center' value='"+data+"'  />"+
			            	"<input type='text' id='copy_paste_skill_parameter' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            	}
		            	return html;
		            }},		
		            {"title":"参与度/工时"+"&nbsp;<i title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='work_hour'  style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center'  />"+
		            	"<input type='text' id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            }},
		            {"title":"小班组","class":"center","data":"team_org","defaultContent":""},
		            {"title":"班组","class":"center","data":"workgroup_org","defaultContent": ""},	
		            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
		            {"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
		          ]	;
	}
	if(salary_model=='自制件承包'){
		columns= [
		            {"title":"<i id=\"addStaff\" class=\"fa fa-plus bigger-110\" style=\"cursor: pointer;color: blue;\"></i>","width":"30","class":"center","data":"","defaultContent": "","render":function(data,type,row){
		            	return "<i class=\"fa fa-times bigger-110\" style=\"cursor: pointer;color: red;\"></i>";
		            }},
		            {"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
		            {"title":"姓名","class":"center","data":"name","defaultContent": ""},
		            {"title":"岗位","class":"center","data": "job","defaultContent": ""},
		            {"title":"单价","class":"center","data":"standard_price","defaultContent": ""},		            	            
		            {"title":"参与度/工时"+"&nbsp;<i title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='work_hour' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium work_hour' style='width:60px;height:28px;text-align:center' />"+
		            	"<input type='text' id='copy_paste_work_hour' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
		            }},
		            {"title":"分配金额"+"&nbsp;<i title='粘贴整列' name='edit' rel='tooltip'  class='fa fa-clipboard dstcopy' cp_flag='distribution' style='cursor: pointer;color:blue'></i>","width":"100","class":"center","data": "distribution","defaultContent": "","render":function(data,type,row){
		            	return "<input type='text' class='input-medium distribution' style='width:60px;height:28px;text-align:center'  value='"+data+"'/>"+
		            	"<input type='text' id='copy_paste_distribution' class='input-small' style='width:60px;height:28px;text-align:center;display:none'>";
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
		processing:true,
		searching: false,
		autoWidth:false,
		paginate:false,
		sScrollY: $(window).height()-110,
		scrollX: true,
		scrollCollapse: true,
		lengthChange:false,
		orderMulti:false,
		info:false,
		language: {
			processing: "正在查询，请稍后...",
			emptyTable:"",					     
			infoEmpty:"",
			/*zeroRecords:"未查询到人员数据！"*/
		},
		data:staff_list,
		columns:columns
	});
	
	$(".dataTables_empty").parent("tr").remove();
	
/*	$('#tableReusltDiv').ace_scroll({
		size:$(this).attr('data-size')|| $(window).height()-210,
		mouseWheelLock: true,
		alwaysVisible : false
	});*/
}

function changeWorkDate(){
	//alert($("#work_date").val());
		ajaxQueryTeamStaffDetail();
		standard_price=ajaxGetWorkgroupPrice();
		if($.fn.dataTable.isDataTable("#tableResult")){
			$('#tableResult').DataTable().destroy();
			$('#tableResult').empty();
		}
		showStaffList(staff_list)
				
		//updateStaffInfo(staff_list);
		/**
		 * 辅助人力模式获取订单车间产量
		 */
		if(salary_model=='辅助人力' && (order_id!=""||order_id!="0"||order_id !=undefined)){
			var prd_qty=ajaxGetWorkshopPrdQty(order_id,factory,workshop,$("#work_date").val());
			$("#workshop_prd_qty").html(prd_qty)
		}
	
}

function ajaxGetStaffDetail(staff_number){
	var order_id=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
	var staff={};
		$.ajax({
			url:'getStaffInfo',
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
					alert("请输入在职有效员工号！");
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
		type:'post',
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
		},
		error:function(){
			alert("系统异常！");
			flag= false;
		}
	})
	return flag;
}
/**
 * 校验（小班组、操作日期）条件下是否已经维护过工时信息（辅助人力、底薪模式）
 * @returns {Boolean}
 */
function validateRecordIn(work_date,order_id){
	
	var flag=true;
	$.ajax({
		url:'workhourValidateRecordIn',
		type:'post',
		dataType:'json',
		async:false,
		data:{
			factory:factory,
			workshop:workshop,
			workgroup:workgroup,
			team:team,
			work_date:work_date,
			salary_model:salary_model,
			order_id:order_id
		},
		success:function(response){
			if(!response.success){
				alert(response.message);
				flag= false;
			}
		},
		error:function(){
			alert("系统异常！");
			flag= false;
		}
	});
	return flag;
}

function ajaxSave(staffHourList,salary_model,is_customer){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url:'saveStaffHours',
		method:'post',
		dataType:'json',
		async:false,
		data:{
			staffHourList:JSON.stringify(staffHourList),
			is_customer:is_customer,
			salary_model:salary_model
		},
		success:function(response){
			//alert(response.message);
			$(".divLoading").hide();	
			fadeMessageAlert("",response.message, response.success?"gitter-success":"gitter-warning")
		}
	});

}

function updateStaffInfo(staff_list){
	var order_id_update=$("#bus_number").attr("order_id")||$("#order_no").attr("order_id");
	//alert(order_id)
	var trs=$("#tableResult tbody").find("tr");
	$.each(trs,function(i,tr){
		//$(tr).find(".staff_number").val("");
		
		
		var staff_number_v=$(tr).children("td").eq(1).html();
		
			if(salary_model=='技能系数'){
				$(tr).children("td").eq(4).html(standard_price);
				
				$.each(staff_list,function(j,staff){
					var staff_number=staff.staff_number;
					var skill_parameter=staff.skill_parameter;
					//standard_price=staff.standard_price;
					
					if(staff_number_v==staff_number){
						$(tr).children("td").eq(5).html(skill_parameter);
						return false;
					}			
				})	
			}
			if(salary_model=='承包制'){
				$(tr).children("td").eq(4).html(standard_price);
				
				$.each(staff_list,function(j,staff){
					var staff_number=staff.staff_number;
					var distribution=staff.distribution;
					//var standard_price=staff.standard_price;
					
				/*	if(staff_number_v==staff_number){
						if(order_id_update !=order_id){							
							$(tr).children("td").eq(5).find(".distribution").val(distribution);
						}
						
						return false;
					}*/
				})			
			}
			if(salary_model=='辅助人力'){
				$.each(staff_list,function(j,staff){
					var staff_number=staff.staff_number;
					var skill_parameter=staff.skill_parameter;
					
					if(staff_number_v==staff_number){
						$(tr).children("td").eq(4).find(".skill_parameter").val(skill_parameter);						
						return false;
					}
				})
			}
			if(salary_model=='底薪模式'){
				$.each(staff_list,function(j,staff){
					var staff_number=staff.staff_number;
					var skill_parameter=staff.skill_parameter;
					var basic_salary=staff.basic_salary;
					
					if(staff_number_v==staff_number){
						$(tr).children("td").eq(4).html(skill_parameter);						
						return false;
					}
				})
			}
			if(salary_model=='自制件承包'){
				$(tr).children("td").eq(4).html(standard_price);
				
				$.each(staff_list,function(j,staff){
					var staff_number=staff.staff_number;
					var work_hour=staff.work_hour;
					var distribution=staff.distribution;
					//var standard_price=staff.standard_price;
					
					/*if(staff_number_v==staff_number){
						if(order_id_update !=order_id){							
							$(tr).children("td").eq(5).find(".work_hour").val(work_hour);
							$(tr).children("td").eq(6).find(".distribution").val(distribution);
						}
						
						return false;
					}*/
				})			
			}
			
	})
}

function ajaxGetWorkgroupPrice(){
	var price=0;
	var stafflist;
	var workDate=$("#work_date").val();

	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "/BMS/common/getWorkgroupPrice",
		async :false,
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"workgroup" : workgroup,
			"team" : team,
			"workDate":workDate,
			"order_id":order_id
		},
		success : function(response) {
			
			price = response.data.length==0?0:parseFloat((response.data)[0].standard_price);
		}
	})
	return price;
}

/**
 * 获取订单车间产量(辅助人力)
 */
function ajaxGetWorkshopPrdQty(order_id,factory,workshop,work_month){
	var prd_qty=0;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "getWorkshopPrdQty",
		async :false,
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"work_month" :work_month,
			"order_id":order_id
		},
		success : function(response) {
			prd_qty=response.data
		}
	})
	
	return prd_qty;
}
