var staff_salary_list=[];
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function(){
		ajaxQuery();
	})
	
	$(document).on("change","#search_factory",function(){
		var factory=$("#search_factory :selected").text();
		getWorkshopSelect("hrReport/pieceTimeReport",factory,"","#search_workshop",null,"id")
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	$(document).on("change","#search_workshop",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		getWorkgroupSelect(factory,workshop,"","#search_workgroup","全部","id")
		$("#search_team").html("<option value=''>全部</option>");
	})
	
	
	$(document).on("change","#search_workgroup",function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		var workgroup=$("#search_workgroup :selected").text();
		getTeamSelect(factory,workshop,workgroup,"","#search_team","全部","id");
	})
	
	/**
	 * 工资提交
	 */
	$("#btnSubmit").click(function(){
		var factory=$("#search_factory :selected").text();
		var workshop=$("#search_workshop :selected").text();
		var workgroup=$("#search_workgroup :selected").text();
		var team=$("#search_team :selected").text();
		var month=$("#month").val();
		
		$.ajax({
			url:"submitStaffSalary",
			type:"post",
			dataType:"json",
			data:{
				factory:factory,
				workshop:workshop,
				workgroup:workgroup,
				team:team,
				month:month,
				staff_salary_list:JSON.stringify(staff_salary_list)
			},
			success:function(response){
				fadeMessageAlert("",response.message, response.success?"success":"danger")
			},
			error:function(){
				fadeMessageAlert("","系统异常!","danger")
			}
		})
		
	})
});

function initPage(){	
	$("#search_form")[0].reset();
	getFactorySelect("hrReport/pieceTimeReport","","#search_factory",null,"id")	
	getWorkshopSelect("hrReport/pieceTimeReport",$("#search_factory :selected").text(),"","#search_workshop",null,"id")
	getWorkgroupSelect($("#search_factory :selected").text(),$("#search_workshop :selected").text(),"","#search_workgroup","全部","id")
	var cur_date=new Date();
	var c_year=cur_date.getFullYear();
	var c_month=cur_date.getMonth();
	$("#month").val(c_year+"-"+(c_month<10?("0"+c_month):c_month));
	

}

function ajaxQuery(){
	
	$(".divLoading").addClass("fade in").show();
	//先destroy datatable，隐藏form
	if($.fn.dataTable.isDataTable("#tableResult")){
		$('#tableResult').DataTable().destroy();
		$('#tableResult').empty();
	}
		
	var columns=[];
	var fixedColumns={};
	var rowsGroup=[];
	//var salary_final=0;
	rowsGroup=[0,1,2,3,4,5,6,15]
	columns= [
	          	{"title":"工号","class":"center","data":"staff_number","defaultContent": ""},
	          	{"title":"姓名","class":"center","data":"staff_name","defaultContent": ""},
	          	{"title":"工厂","class":"center","data":"plant_org","defaultContent": ""},
	            {"title":"车间","class":"center","data":"workshop_org","defaultContent":""},
	            {"title":"班组","class":"center","width":"120","data":"workgroup_org","defaultContent":""},
	            {"title":"小班组","class":"center","width":"120","data":"team_org","defaultContent":""},
	          	{"title":"岗位","class":"center","data": "job","defaultContent": ""},	
	          	{"title":"在职","class":"center","data":"status","defaultContent": ""},
	            {"title":"出勤天数","class":"center","data":"attendance_days","defaultContent": ""},
	            {"title":"车间产量","class":"center","data":"production_qty","defaultContent": ""},			            
	            {"title":"计件产量","class":"center","data":"piece_total","defaultContent": ""},
	            {"title":"补贴车","class":"center","data":"bonus_total","defaultContent": ""},
	            {"title":"计件工资","width":"80","class":"center","data":"piece_pay_total","defaultContent": ""},  		            
	            {"title":"技改工时","width":"100","class":"center","data": "ecnwh_total","defaultContent": ""},
	            {"title":"计改工资","class":"center","data": "ecn_pay_total","defaultContent": ""},
	            {"title":"额外工时","class":"center","data": "tmpwh_total","defaultContent": ""},
	            {"title":"额外工资","class":"center","data": "tmp_pay_total","defaultContent": ""},
	            {"title":"等待工时","class":"center","data": "wwh_total","defaultContent": ""},
	            {"title":"等待工资","class":"center","data": "wait_pay_total","defaultContent": ""},
	            
	            {"title":"售前工资","class":"center","data": "pre_sale_salary","defaultContent": ""},
	            {"title":"售后工资","class":"center","data": "after_sale_salary","defaultContent": ""},
	            {"title":"调休工资","class":"center","data": "paid_leave_salary","defaultContent": ""},
	            {"title":"放假工资","class":"center","data": "holiday_salary","defaultContent": ""},
	            {"title":"计时工资","class":"center","data": "hourly_salary","defaultContent": ""},
	            {"title":"支援工资","class":"center","data": "support_salary","defaultContent": ""},
	            
	            {"title":"考核扣款","class":"center","data": "deduct_pay_total","defaultContent": ""},
	            {"title":"实发工资","class":"center","data": "","defaultContent": "","render":function(data,type,row){
	            	var salary_final=0;
	            	salary_final=numAdd(salary_final,isNaN(Number(row.piece_pay_total))?0:Number(row.piece_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.ecn_pay_total))?0:Number(row.ecn_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.tmp_pay_total))?0:Number(row.tmp_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.wait_pay_total))?0:Number(row.wait_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.deduct_pay_total))?0:Number(row.deduct_pay_total));	            	
	            	salary_final=numAdd(salary_final,isNaN(Number(row.pre_sale_salary))?0:Number(row.pre_sale_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.after_sale_salary))?0:Number(row.after_sale_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.paid_leave_salary))?0:Number(row.paid_leave_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.holiday_salary))?0:Number(row.holiday_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.hourly_salary))?0:Number(row.hourly_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.support_salary))?0:Number(row.support_salary));	            	
	            	
	            	return salary_final;
	            }},
	            {"title":"日均工资","class":"center","data": "","defaultContent": "","render":function(data,type,row){
	               	var salary_final=0;
	               	salary_final=numAdd(salary_final,isNaN(Number(row.piece_pay_total))?0:Number(row.piece_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.ecn_pay_total))?0:Number(row.ecn_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.tmp_pay_total))?0:Number(row.tmp_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.wait_pay_total))?0:Number(row.wait_pay_total));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.deduct_pay_total))?0:Number(row.deduct_pay_total));	            	
	            	salary_final=numAdd(salary_final,isNaN(Number(row.pre_sale_salary))?0:Number(row.pre_sale_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.after_sale_salary))?0:Number(row.after_sale_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.paid_leave_salary))?0:Number(row.paid_leave_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.holiday_salary))?0:Number(row.holiday_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.hourly_salary))?0:Number(row.hourly_salary));
	            	salary_final=numAdd(salary_final,isNaN(Number(row.support_salary))?0:Number(row.support_salary));
	            	
	            	var salary_avg=salary_final/row.attendance_days;
	            	if(isNaN(salary_avg)){
	            		salary_avg="";
	            	}else{
	            		salary_avg=salary_avg.toFixed(2)
	            	}
	            	return salary_avg;
	            }},
	          ]	;
	
	var tb=$("#tableResult").DataTable({
		serverSide: true,
		fixedColumns:   {
            leftColumns: 2,
            rightColumns:2
        },
		dom: 'Bfrtip',
		/*lengthMenu: [
		             [ 20, 50, 100, -1 ],
		             [ '显示20行', '显示50行', '显示100行', '全部' ]
		         ],*/
	    buttons: [
	        {extend:'excelHtml5',title:'data_export',className:'black',text:'<i class=\"fa fa-file-excel-o bigger-130\" tooltip=\"导出excel\"></i>'},
	        {extend:'colvis',text:'<i class=\"fa fa-list bigger-130\" tooltip=\"选择展示列\"></i>'},
	       /* {extend:'pageLength',text:'显示行'}*/
	       
	    ],
	    paginate:false,
        rowsGroup:rowsGroup,
		paiging:false,
		ordering:false,
		searching: false,
		bAutoWidth:false,
		destroy: true,
		sScrollY: $(window).height()-220,
		scrollX: true,
		/*scrollCollapse: true,*/
/*		pageLength: 20,*/
		pagingType:"full_numbers",
		lengthChange:true,
		info:false,
		orderMulti:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			zeroRecords:"抱歉，未查询到数据！",
			loadingRecords:"正在查询，请稍后..." 
		/*	paginate: {
			  first:"首页",
		      previous: "上一页",
		      next:"下一页",
		      last:"尾页",
		      loadingRecords: "请稍等,加载中...",		     
			}*/
		},
		ajax:function (data, callback, settings) {
			
			var param ={
				"draw":1,
				"factory":$("#search_factory :selected").text(),
				"workshop":$("#search_workshop :selected").text(),
				"workgroup":$("#search_workgroup :selected").text(),
				"team":$("#search_team :selected").text(),
				"staff":$("#staff_number").val(),
				"month":$("#month").val()
			};
            /*param.length = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;//开始的记录序号
            param.page = (data.start / data.length)+1;//当前页码
*/
            $.ajax({
                type: "post",
                url: "getStaffPieceSalary",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                	$(".divLoading").hide();
                	staff_salary_list=result.data;
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.data = result.data;//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    $("#tableResult").find('.dataTables_empty').css("padding-left","350px")
                    var head_width=$(".dataTables_scrollHead").width();
                    //alert(head_width)
                    $(".dataTables_scrollHead").css("width",head_width-20);
                }
            });
		
		},
		columns: columns,
	});
	$("#tableResult_info").addClass('col-xs-6');
	$("#tableResult_paginate").addClass('col-xs-6');
	//alert('A ');
	$(".dt-buttons").css("margin-top","-50px").find("a").css("border","0px");
}