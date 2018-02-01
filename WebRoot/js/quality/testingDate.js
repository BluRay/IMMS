var pageSize=1;
var table;
var sync_list=[];
var table_height = $(window).height()-140;
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		getFactorySelect("quality/testingDate",'',"#search_factory",null,'id');
		getOrderNoSelect("#search_order_no","#orderId");
	}

	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
	
	$("#btnQuery").on('click', function(e) {
		if($("#search_order_no").val()==''){
			alert("请输入订单号!");
			return false;
		}
		ajaxQuery();
	});
	
	$("#btnSync").on('click', function(e) {
		sync_list=[];
		var trs=$("#tableData").children("tbody").children("tr");
		var tr_count = 0;
		$.each(trs,function(index,tr){
			var cbx=$(tr).find("td").find("input").attr("type");
			if(cbx!=undefined){	
				var c_checkbox=$(tr).find('input[type=checkbox]');
				var ischecked=$(c_checkbox).is(":checked");
				if(ischecked){
					sync_list[tr_count] = $(c_checkbox).attr("id").substring(9);
					tr_count ++;
				}
			}
			
		});
		console.log(sync_list);
		if(tr_count==0){
			alert("请选择需要同步的数据！");
			return false;
		}
		$("#btnQuery").attr("disabled","disabled");
		$("#btnSync").attr("disabled","disabled");
		$("#btnSync").val("同步中,请稍候...");
		
		$.ajax({
			url: "getTestingDateSync",
			dataType: "json",
			type: "get",
			data: {
				"factory_id":$("#search_factory").val(),
				"vin":JSON.stringify(sync_list),
			},
			async: false,
			error: function () {
				alert(response.message);
				$("#btnQuery").removeAttr("disabled");
				$("#btnSync").removeAttr("disabled");
            	$("#btnSync").val("同步");
				},
			success: function (response) {
				alert("同步成功！");
				$("#btnQuery").removeAttr("disabled");
				$("#btnSync").removeAttr("disabled");
            	$("#btnSync").val("同步");
			}
		});
		
	});

});


function ajaxQuery(){
	$("#btnQuery").attr("disabled","disabled");
	$("#btnQuery").val("查询中,请稍候...");
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,scrollX: "100%",orderMulti:false,
		pageLength: 20,pagingType:"full_numbers",lengthChange:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"factory_id":$("#search_factory").val(),
				"order_no":$("#search_order_no").val(),
				"bus_number":$("#search_busNum").val(),
				"start_busNum":$("#start_busNum").val(),
				"end_busNum":$("#end_busNum").val(),
				"orderColumn":"id"
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getTestingDateList",
                cache: false,  //禁用缓存
                data: param,  //传入组装的参数
                dataType: "json",
                success: function (result) {
                    //console.log(result);
                	//封装返回数据
                    var returnData = {};
                    returnData.draw = data.draw;						//这里直接自行返回了draw计数器,应该由后台返回
                    returnData.recordsTotal = result.recordsTotal;		//返回数据全部记录
                    returnData.recordsFiltered = result.recordsTotal;	//后台不实现过滤功能，每次查询均视作全部结果
                    returnData.data = result.data;						//返回的数据列表
                    //console.log(returnData);
                    //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                    //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                    callback(returnData);
                    $("#btnQuery").removeAttr("disabled");
                    $("#btnQuery").val("查询");
                    
                    /* var head_width=$(".dataTables_scrollHead").width();
                    $(".dataTables_scrollHead").css("width",head_width-20);*/
                	
                    var head_width=$(".dataTables_scroll").width();
                	$(".dataTables_scrollBody").scrollTop(10);
                	//alert($(".dataTables_scrollBody").scrollTop());

                	if($(".dataTables_scrollBody").scrollTop()>0){
                		$(".dataTables_scrollHead").css("width",head_width-5);
                		$(".dataTables_scrollBody").scrollTop(0);
                	}
                },
                error:function (result) {
                	alert("连接检测线数据失败，请联系系统管理员");
                	$("#btnQuery").removeAttr("disabled");
                	$("#btnQuery").val("查询");
                }
            });
		},
		columns: [
		            {"title":"<input id='checkall' onclick='check_all(this);' type='checkbox'>","class":"center","data":"","defaultContent": "",
		            	"render":function(data,type,row){
		            		if(typeof(row['motor_number']) == "undefined"){
		            			return "<input disabled='disabled' id='checkBox_"+row['VIN']+"' type='checkbox'>";
		            		}else{
		            			return "<input id='checkBox_"+row['VIN']+"' type='checkbox'>";
		            		}
		            	} 
		            },
		            {"title":"VIN号","class":"center","data":"VIN","defaultContent": ""},
		            {"title":"车号","class":"center","data":"bus_number","defaultContent": ""},	
		            {"title":"电机号","class":"center","data":"motor_number","defaultContent": ""},
		            {"title":"车辆型号","class":"center","data":"bus_type","defaultContent": ""},
		            {"title":"号牌种类","class":"center","data": "license_type","defaultContent": ""},
		            {"title":"车辆类型","class":"center","data":"bus_vehicle_type","defaultContent": ""},	
		            {"title":"燃料类别","class":"center","data": "fuel_type","defaultContent": ""},
		            {"title":"驱动型式","class":"center","data": "chassis_model","defaultContent": ""},
		            {"title":"底盘号码","class":"center","data": "chassis_number","defaultContent": ""},
		            {"title":"检验类别","class":"center","data": "check_type","defaultContent": ""},
		            {"title":"登记日期","class":"center","data": "register_date","defaultContent": ""},
		            {"title":"出厂日期","class":"center","data": "manufacture_date","defaultContent": ""},
		            {"title":"检测日期","class":"center","data": "check_date","defaultContent": ""},
		            {"title":"检测编号","class":"center","data": "check_number","defaultContent": ""},
		            {"title":"检测次数","class":"center","data": "check_times","defaultContent": ""},	
		            {"title":"是否合格","class":"center","data": "is_passed","defaultContent": ""},
		            {"title":"检测结论","class":"center","data": "test_results","defaultContent": ""},
		            {"title":"检测总评","class":"center","data": "is_passed_aj","defaultContent": ""},
		            {"title":"车速值","class":"center","data": "speed","defaultContent": ""},
		            {"title":"车速误差值","class":"center","data": "speed_mistake","defaultContent": ""},
		            {"title":"一轴左轮荷","class":"center","data": "s1_lft_wgt_val","defaultContent": ""},
		            {"title":"一轴右轮荷","class":"center","data": "s1_rgt_wgt_val","defaultContent": ""},
		            {"title":"一轴轴荷","class":"center","data": "s1_tot_wgt_val","defaultContent": ""},
		            {"title":"二轴左轮荷","class":"center","data": "s2_lft_wgt_val","defaultContent": ""},
		            {"title":"二轴右轮荷","class":"center","data": "s2_rgt_wgt_val","defaultContent": ""},
		            {"title":"二轴轴荷","class":"center","data": "s2_tot_wgt_val","defaultContent": ""},
		            {"title":"驻车轴荷","class":"center","data": "wgt_cal_val","defaultContent": ""},
		            {"title":"整车轴荷","class":"center","data": "tot_cal_val","defaultContent": ""},
		            {"title":"一轴左制动力(求和)","class":"center","data": "s1_lft_eff_frs_val","defaultContent": ""},
		            {"title":"一轴右制动力(求和)","class":"center","data": "s1_rgt_eff_frs_val","defaultContent": ""},
		            {"title":"一轴制动和","class":"center","data": "s1_eff_pec_val","defaultContent": ""},
		            {"title":"一轴左制动","class":"center","data": "s1_lft_equ_frs_val","defaultContent": ""},
		            {"title":"一轴右制动","class":"center","data": "s1_rgt_equ_frs_val","defaultContent": ""},
		            {"title":"一轴制动差","class":"center","data": "s1_equ_pec_val","defaultContent": ""},
		            {"title":"一轴左轮阻滞力","class":"center","data": "s1_lft_lag_frs_val","defaultContent": ""},
		            {"title":"一轴左轮阻滞比","class":"center","data": "s1_lft_lag_pec_val","defaultContent": ""},
		            {"title":"一轴右轮阻滞力","class":"center","data": "s1_rgt_lag_frs_val","defaultContent": ""},
		            {"title":"一轴右轮阻滞比","class":"center","data": "s1_rgt_lag_pec_val","defaultContent": ""},
		            {"title":"一轴制动协调时间","class":"center","data": "s1_coord_val","defaultContent": ""},
		            {"title":"二轴左制动力(求和)","class":"center","data": "s2_lft_eff_frs_val","defaultContent": ""},
		            {"title":"二轴右制动力(求和)","class":"center","data": "s2_rgt_eff_frs_val","defaultContent": ""},
		            {"title":"二轴制动和","class":"center","data": "s2_eff_pec_val","defaultContent": ""},
		            {"title":"二轴左制动","class":"center","data": "s2_lft_equ_frs_val","defaultContent": ""},
		            {"title":"二轴右制动","class":"center","data": "s2_rgt_equ_frs_val","defaultContent": ""},
		            {"title":"二轴制动差","class":"center","data": "s2_equ_pec_val","defaultContent": ""},
		            {"title":"二轴左轮阻滞力","class":"center","data": "s2_lft_lag_frs_val","defaultContent": ""},
		            {"title":"二轴左轮阻滞比","class":"center","data": "s2_lft_lag_pec_val","defaultContent": ""},
		            {"title":"二轴右轮阻滞力","class":"center","data": "s2_rgt_lag_frs_val","defaultContent": ""},
		            {"title":"二轴右轮阻滞比","class":"center","data": "s2_rgt_lag_pec_val","defaultContent": ""},
		            {"title":"二轴制动协调时间","class":"center","data": "s2_coord_val","defaultContent": ""},
		            {"title":"驻车左制动力","class":"center","data": "park_lft_eff_frs_val","defaultContent": ""},
		            {"title":"驻车右制动力","class":"center","data": "park_rgt_eff_frs_val","defaultContent": ""},
		            {"title":"驻车制动和","class":"center","data": "park_tot_wgt_val","defaultContent": ""},
		            {"title":"整车制动力","class":"center","data": "tot_eff_frs_val","defaultContent": ""},
		            {"title":"整车制动和","class":"center","data": "tot_eff_pec_val","defaultContent": ""},
		            {"title":"左远光光强","class":"center","data": "lhb_light_val","defaultContent": ""},
		            {"title":"右远光光强","class":"center","data": "rhb_light_val","defaultContent": ""},
		            {"title":"左灯灯高","class":"center","data": "lhb_height_val","defaultContent": ""},
		            {"title":"右灯灯高","class":"center","data": "rhb_height_val","defaultContent": ""},
		            {"title":"左远光水平偏移","class":"center","data": "lhb_lroff_val","defaultContent": ""},
		            {"title":"左远光垂直偏移","class":"center","data": "lhb_udobs_val","defaultContent": ""},
		            {"title":"左近光水平偏移","class":"center","data": "ldb_lroff_val","defaultContent": ""},
		            {"title":"左近光垂直偏移","class":"center","data": "ldb_udobs_val","defaultContent": ""},
		            {"title":"右远光水平偏移","class":"center","data": "rhb_lroff_val","defaultContent": ""},
		            {"title":"右远光垂直偏移","class":"center","data": "rhb_udobs_val","defaultContent": ""},
		            {"title":"右近光水平偏移","class":"center","data": "rdb_lroff_val","defaultContent": ""},
		            {"title":"右近光垂直偏移","class":"center","data": "rdb_udobs_val","defaultContent": ""},
		            {"title":"喇叭声级值","class":"center","data": "horn_level","defaultContent": ""},
		            {"title":"前轮侧滑值","class":"center","data": "side_slide_val","defaultContent": ""}
		          ],
	});
}

function check_all(e){
	if($(e).is(":checked")){
		$("#tableData tbody :checkbox").not(':disabled').prop("checked", true);
	}else{
		$("#tableData tbody :checkbox").prop("checked", false);
	}
}
