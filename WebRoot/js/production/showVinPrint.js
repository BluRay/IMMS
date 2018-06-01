var pageSize=1;
var table;
var table_height = $(window).height()-140;
var vinList;
var buslist=[];
$(document).ready(function(){
	window.onafterprint=function(){
		 ajaxUpdatePrint(vinList);
	}
	initPage();
	function initPage(){
		getOrderNoSelect("#search_order","#orderId");
		var buslist=[];
		ajaxQuery();
	}

	$("#btnQuery").click (function () {
		ajaxQuery();
	});
	//打印
	$('body').on('click', '.btnPrint',function(e){
		$("#printarea").html("");
		var printFlag=true;
		vinList="";//获取要打印的车号列表
		var tr=$(e.target).parent("td").parent("tr");
		
		var printhtml="<div class=\"printConfigure printable toPrint\" style=\"padding-top:10px;padding-bottom:10px;line-height:40px;\" ><table border=0><tr ><td style=\"text-align:right; font-size:26px;font-weight:bold; height:35px; padding-left:0px\">订单：</td>"
			+"<td style=\"text-align:left; font-size:26px;font-weight:bold; width:270px;height:35px \">"+$(tr).find(".orderCodeDesc").text()+"</td></tr>"+
			"<tr><td style=\"text-align:right; font-size:26px; font-weight:bold;height:35px; padding-left:0px;\">车号：</td>"
			+"<td style=\"text-align:left; font-size:26px; font-weight:bold;width:270px;height:35px;\">"+$(tr).find(".busNumber").text()+"</td></tr>"+
			"<tr><td style=\"text-align:right; font-size:26px;font-weight:bold;height:35px;padding-left:0px\">VIN：</td>"
			+"<td style=\"text-align:left; font-size:26px;font-weight:bold ;width:270px;height:35px; \">"+$(tr).find(".vin").val()+"</td></tr></table>"
			+"<div id=\"bcTarget"+"\" style=\"width:300px; height:70px;margin-left:10px;margin-top:10px\"></div></div>";
		$("#printarea").append(printhtml);
		$("#bcTarget").barcode($(tr).find(".vin").val(), "code128",{barWidth:2, barHeight:70,showHRI:false});
		/*vinList=vinList.substring(0,vinList.length-1); $(tr).data("vin").trim() */
		if($(tr).find(".vin").val().trim().length==0){
			printFlag=false;
		}else
		vinList=$(tr).find(".vin").val();
		 setTimeout(function (){
			 if(printFlag){
				 window.print();
			 }else{
				 alert("VIN为空，请先绑定车号和VIN!");
			 }
						       				
			},0);
	});
	$('body').on('focus', ".vin,.leftMotor,.rightMotor",function(event){
		var tds=$(this).parent("td").siblings();
		var className=$(this).attr("class");
		var classHide="."+className+"Hide";
		//alert(classHide);
		var placeHolder=className=="vin"?"请扫描VIN编码！":(className=='leftMotor'?"请扫描左电机号！":"请扫描右电机号！");
		
		$(this).parent("td").find(classHide).val("");
		if(!$(this).attr("readonly")){
			$(this).val("");
			$(this).css("border","1px solid").attr("placeHolder",placeHolder);
		}
		$(this).blur();
		$(this).parent("td").find(classHide).focus();
		
	});
	$('body').on('keydown', ".vinHide,.leftMotorHide,.rightMotorHide",function(event){
		
		var classHide=$(this).attr("class");

		var className="."+classHide.substring(0,classHide.indexOf('Hide'));
		
		if (event.keyCode == "13") {
			if(className==".vin"){
				if($(this).val().trim().length==17){
					$(this).parent("td").find(className).css("border","0px").val($(this).val().toUpperCase());	
				}else{
					$(this).parent("td").find(className).css("border","0px").val("");
					alert("请扫描VIN编码！");
					$(this).parent("td").find(className).trigger("focus");
					return false;
				}				
				$(this).parent("td").find(className).trigger("change");
				
				//vin码扫描后跳入左电机号输入框
				var tr=$(this).parent("td").parent("tr");
				var leftMotorInput=$(tr).find(".leftMotor").eq(0);
				//$(leftMotorInput).focus();
				$(leftMotorInput).trigger("focus");
			}else{
				if($(this).val().trim().length>9&&$(this).val().trim().length!=31){
					$(this).parent("td").find(className).css("border","0px").val($(this).val().substr(-9).toUpperCase());	
				}else if($(this).val().trim().length==31){
					$(this).parent("td").find(className).css("border","0px").val($(this).val().toUpperCase());	
				}else{
					$(this).parent("td").find(className).css("border","0px").val("");
					alert("请扫描电机号！");	
					$(this).parent("td").find(className).trigger("focus");
					return false;
				}	
				
				//左右电机号扫描后光标自动移动到另外一个电机号输入框
				var index=$(this).parent("td").find(className).attr("id").split("_")[1];
				console.info(index)
				if(className=='.leftMotor'){
					//$("#rightMotor_"+index).focus();
					$("#leftMotor_"+index).trigger("change");
					$("#rightMotor_"+index).trigger("focus");
				}
				if(className=='.rightMotor'){
					//$("#leftMotor_"+index).focus();		
					$("#rightMotor_"+index).trigger("change");
					if($("#leftMotor_"+index).val().trim().length==0){
						$("#leftMotor_"+index).trigger("focus");
					}
				}
				
			}
				
		}
		
	});
	
	//vin输入框change事件
	$('body').on('change',".vin",function(e){
		var vin=$(e.target).val();
		var busNumber=$(e.target).parent("td").parent("tr").find(".busNumber").val();
		var leftMotorNumber=$(e.target).parent("td").parent("tr").find(".leftMotor").val();
		var rightMotorNumber=$(e.target).parent("td").parent("tr").find(".rightMotor").val();
		var busList=ajaxValidateBusVin(vin,busNumber);
		if(vin.trim().length>0&&!ajaxValidateVin(vin)){
			alert("请输入有效VIN码！");
			$(e.target).val("");
			$(e.target).focus();
			return false;
		}else if(busList.length>0){
			if(busList[0].bus_number!=busNumber){
				alert("该VIN码已经绑定了一个车号，不能重复绑定！");
				$(e.target).val("");
				$(e.target).focus();
				return false;
			}				
		}else if(isContain(vin,buslist,'vin')&&vin.trim().length>0){
			alert("VIN码不能重复绑定！");
			$(e.target).val("");
			$(e.target).focus();
			return false;
		}
	});
	
	//左电机号校验
	$('body').on('change',".leftMotor",function(e){
		var busNumber=$(e.target).parent("td").parent("tr").find(".busNumber").val();
		var leftMotorNumber=$(e.target).parent("td").parent("tr").find(".leftMotor").val();
		var rightMotorNumber=$(e.target).parent("td").parent("tr").find(".rightMotor").val();
		var busList=[];
		if(leftMotorNumber.trim().length>0&&leftMotorNumber!='/'){
			busList=ajaxValidateBusMotor(leftMotorNumber,busNumber,"left_motor_number");
		}	
		 if(busList.length>0){
			if(busList[0].bus_number!=busNumber){
				alert("该电机号已经绑定了一个车号，不能重复绑定！");
				$(e.target).val("");
				$(e.target).focus();
				return false;
			}				
		}else if(isContain(leftMotorNumber,buslist,'left_motor_number')&&leftMotorNumber.trim().length>0&&leftMotorNumber!='/'){
			alert("电机号不能重复绑定！");
			$(e.target).val("");
			$(e.target).focus();
			return false;
		}
		 //判断左电机号是否符合新旧规则
/*		 if(leftMotorNumber.trim().length==31){
			 var motor_f=leftMotorNumber.substring(2,4)
			 if(motor_f!='00'){//左电机号00表示，右电机号01表示
				 alert("请输入有效左电机号！")
				 $(e.target).val("");
				 $(e.target).focus();
				 return false;
			 }			
		 }*/
		 
	});
	
	//右电机号校验
	$('body').on('change',".rightMotor",function(e){
		var busNumber=$(e.target).parent("td").parent("tr").find(".busNumber").val();
		var leftMotorNumber=$(e.target).parent("td").parent("tr").find(".leftMotor").val();
		var rightMotorNumber=$(e.target).parent("td").parent("tr").find(".rightMotor").val();
		var busList=[];
		if(rightMotorNumber.trim().length>0&&rightMotorNumber!='/'){
			busList=ajaxValidateBusMotor(rightMotorNumber,busNumber,"right_motor_number");
		}	
		 if(busList.length>0){
			if(busList[0].bus_number!=busNumber){
				alert("该电机号已经绑定了一个车号，不能重复绑定！");
				$(e.target).val("");
				$(e.target).focus();
				return false;
			}				
		}else if(isContain(rightMotorNumber,buslist,'right_motor_number')&&rightMotorNumber.trim().length>0&&rightMotorNumber!='/'){
			alert("电机号不能重复绑定！");
			$(e.target).val("");
			$(e.target).focus();
			return false;
		}
		 //判断左电机号是否符合新旧规则
/*		 if(leftMotorNumber.trim().length==31){
			 var motor_f=rightMotorNumber.substring(2,4)
			 if(motor_f!='01'){//左电机号00表示，右电机号01表示
				 alert("请输入有效右电机号！")
				 $(e.target).val("");
				 $(e.target).focus();
			 }			
		 }*/
		 
	});
	
	
	$("#btnSave").click(function(){
		var trs=$("#tableData tbody").find("tr");
		var ids = '';
		$(":checkbox").each(function(){
			if($(this).prop("checked")){
				if($(this).attr('fid')){
					ids += $(this).attr('fid').split('_')[1] + ',';
				}
			}
		});
		if(ids===''){
			alert("请至少勾选一条记录");
			return false;
		}
		var msg="确认保存？";
		var saveFlag = true;
		var addbuslist=[];
		$.each(trs,function(i,tr){
			if($(tr).find(".check").prop("checked")){
				var busNumber=$(tr).find(".busNumber").text();
				var vin=$(tr).find(".vin").val();
				var leftMotorNumber=$(tr).find(".leftMotor").val();
				var rightMotorNumber=$(tr).find(".rightMotor").val();
				if(leftMotorNumber.trim().length==0 && rightMotorNumber.trim().length==0){
					alert("请至少输入一个左电机或者右电机，再保存！");
					saveFlag = false;
					return false;
				}else{
					if(leftMotorNumber.trim().length==0){
						leftMotorNumber = '/';
					}
					if(rightMotorNumber.trim().length==0){
						rightMotorNumber = '/';
					}
					if(vin.trim().length==0/*||leftMotorNumber.trim().length==0||rightMotorNumber.trim().length==0*/){
						msg="VIN码未填写的无法保存,是否确认保存？"
					}else{
						var obj={};
						obj.bus_number=busNumber;
						obj.vin=vin;
						obj.left_motor_number=leftMotorNumber;
						obj.right_motor_number=rightMotorNumber;
						addbuslist.push(obj);
					}
				}
			}
		});
		console.log("addbuslist",addbuslist);
		if(saveFlag){
			if(confirm(msg)){
				if(addbuslist.length>0){
					$.ajax({
						url:"saveMotorNumber",
						type: "post",
						dataType:"json",
						data:{"conditions":JSON.stringify(addbuslist)},
						success:function(response){
							alert(response.message);	
							if(response.success){
								ajaxQuery();
							}					
						}		
					});
				}else{
					alert("没有填写需要绑定的VIN码和左右电机号！");
				}
				
			}
		}
	});
	
});
function ajaxQuery(){
	$("#tableData").dataTable({
		serverSide: true,paiging:true,ordering:false,searching: false,bAutoWidth:false,
		destroy: true,sScrollY: table_height,sScrollX:true,orderMulti:false,
		pageLength: 25,pagingType:"full_numbers",lengthChange:false,
		language: {
			emptyTable:"抱歉，未查询到数据！",
			info:"共计 _TOTAL_ 条，当前第 _PAGE_ 页 共 _PAGES_ 页",
			infoEmpty:"",
			paginate: { first:"首页",previous: "上一页",next:"下一页",last:"尾页",loadingRecords: "请稍等,加载中..."}
		},
		ajax:function (data, callback, settings) {
			var param ={
				"draw":1,
				"busNumber" : $("#search_busNumber").val(),
				"orderNo" : $("#search_order").val()
			};
            param.length = data.length;					//页面显示记录条数，在页面显示每页显示多少项的时候
            param.start = data.start;					//开始的记录序号
            param.page = (data.start / data.length)+1;	//当前页码

            $.ajax({
                type: "post",
                url: "getVinPrintList",
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
                    callback(returnData);
                }
            });
		},
		columns: [
			{"title":"<input type='checkbox' id='selectAll' onclick='selectAll()'/>","class":"center","data":"bus_number","render": function ( data, type, row ) {
			    return "<input id='id' type='hidden' /><input class='check' type='checkbox' fid='cb_"+data+"'>";
			},"defaultContent": ""},
            {"title":"订单描述","class":"center orderCodeDesc","data":"order_desc","defaultContent": ""},
            {"title":"车号","class":"center busNumber","data":"bus_number","defaultContent": ""},
            {"title":"VIN","class":"center","data":"vin","defaultContent": "","render":function(data,type,row){
            	return (data==undefined || data==null || data=='')? "<input style='border:0;width:98%;text-align:center;background-color:white;' class='vin' " +
						" value=''/><input class='vinHide' style='width:0px;position:absolute;z-index: -1;margin-left: -10px;border: 0px;' />": 
							"<input style='border:0;width:98%;text-align:center;background-color:white;' class='vin' " +
						" value='"+data+"' readonly='true'/>"}

			},
			{"title":"左电机号","class":"center","data":"left_motor_number","defaultContent": "","render":function(data,type,row,meta){ // margin-top:-2000px
				return "<input id=leftMotor_"+(meta.row + meta.settings._iDisplayStart + 1)+" style='border:0;width:98%;text-align:center;background-color:white;' class='leftMotor' " +
						" value='"+((data!=undefined && data!=null && data!='') ? data : '')+"'/><input class='leftMotorHide' style='width:0px;position:absolute;z-index: -1;margin-left: -10px;border: 0px;' />";
			}
			},
			{"title":"右电机号","class":"center","data":"right_motor_number","defaultContent": "","render":function(data,type,row,meta){
				//alert(data);
				var right_motor_number=((data!=undefined && data!=null && data!='') ? data : '');
				
				
				var str= "<input id=rightMotor_"+(meta.row + meta.settings._iDisplayStart + 1)+" style='border:0;width:98%;text-align:center;background-color:white;' class='rightMotor' " +
						" value='"+right_motor_number+"'/><input type='text' class='rightMotorHide' style='width:0px;position:absolute;z-index: -1;margin-left: -10px;border: 0px;' />";
				//console.log("strstr = ",str);
				return str;
			}
			}/*,
            {"title":"打印状态","class":"center","data":"print_sign","defaultContent": ""},
            {"title":"最近打印人","class":"center","data":"printer","defaultContent": ""},
            {"title":"最近打印日期","class":"center","data":"print_date","defaultContent": ""},
            {"title":"打印次数","class":"center","data":"print_times","defaultContent": ""},
            {"title":"操作","class":"center","data":"","render":function(data,type,row){
            	return "<i class=\"glyphicon glyphicon-print bigger-130 btnPrint\" title=\"打印\" style='color:blue;cursor: pointer;'></i>";		            		
            	} 
            }*/
          ],
	});
}
//打印后更新打印信息
function ajaxUpdatePrint(busNoList){
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "afterVinPrint",
		data : {
			"conditions" : vinList
		},
		success:function(response){
			if(response.success){
				//alert("打印成功！");
				 setTimeout(function (){
					 ajaxQuery();				
					},1000);
			}
		}
	});
}
//检查vin码是否绑定了车号
function ajaxValidateBusVin(vin,busNumber){
	var busList;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "getBusNumberByVin",
		data : {
			"vin" : vin
		},
		success:function(response){		
			busList=response.data;	
		}
	});

	return busList;
}
//检查电机号是否绑定了车号
function ajaxValidateBusMotor(motorNumber,busNumber,motor_field){
	var busList;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "getBusNumberByMotor",
		data : {
			"motor_number" : motorNumber,
			"motor_field":motor_field
		},
		success:function(response){		
			busList=response.data;	
		}
	});

	return busList;
}
//检查vin码是否有效
function ajaxValidateVin(vin){
	var flag=false;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "validateVin",
		data : {
			"vin" : vin
		},
		success:function(response){	
			if(response.data.length>0){
				flag=true;	
			}
			
		}
	});
	return flag;
}
function isContain(o,list,p){
	var flag=false;
	$.each(list,function(index,obj){
		if(o==obj[p]){
			flag=true;
			return;
		}
	})
	return flag;
}
//复选框全选或反选
function selectAll() {
    if ($("#selectAll").prop("checked")) {
        $(":checkbox").prop("checked", true);
    } else {
        $(":checkbox").prop("checked", false);
    }
}
