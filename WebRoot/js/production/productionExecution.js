var cur_key_name = "";
var vin="";
var left_motor_number="";
var right_motor_number="";
var bus_production_status="0";
var bus_color;
var bus_seats;
var workshop_name;
var process_name;
var order_name;
var bus_type_code;
var order_qty;
var orderType;
var status;
var line_selects_data;
var parts_list;
var parts_update_list=new Array();//非车间上下线工序提交该零部件信息
 
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		//alert(location.href.substr(location.href.indexOf("action?")+7,location.href.length));
		$('#rightlink').attr('href','production!exception.action?' + location.href.substr(location.href.indexOf("action?")+7,location.href.length)); 
		if($("#exec_type").children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}		
		getFactorySelect();
		$('#vinText').focus();
		//alert(getQueryString("factory_name"));
	};
	
	function resetPage () {
        $("#vinText").removeAttr("disabled");
        $("#vinText").attr("value","");
        $("#vinText").focus();
        toggleVinHint(true);
        $("#btnSubmit").attr("disabled","disabled");
        $("#partsListTable tbody").html("");
        $("#configListTable tbody").html("");
    }
	
	function ajaxEnter(){
		var repair = "0";	//返修
		var ecn = "0";		//技改
		var onlineflag = "0";
		var offlineflag = "0";
		var enterflag=true;
		if($('#exec_type').val() == "返修"){
			repair = "1";
			if($('#exec_onoff').val() == "上线")onlineflag ="1";
			if($('#exec_onoff').val() == "下线")offlineflag ="1";
		}else if($('#exec_type').val() == "技改"){
			ecn = "1";
			if($('#exec_onoff').val() == "上线")onlineflag ="1";
			if($('#exec_onoff').val() == "下线")offlineflag ="1";
		}else{
			onlineflag = "0";
			offlineflag = "0";
		}
		//alert("onlineflag = " + onlineflag + "\n offlineflag = " + offlineflag + 
		//		"\n repair = " + repair + "\n ecn = " + ecn);
		
		
		/**
		 * 增加校验逻辑：总装下线校验VIN与车载终端是否绑定成功
		 */
		if(cur_key_name.indexOf("下线")>=0&&$('#exec_workshop :selected').text()=='总装'){
			//alert(cur_key_name);
			var conditions={};
			conditions.vin=$('#vinText').data("vin");
			//conditions.flag=Number($('#clientFlag').val());
			$("#gpsModal").modal("hide");
			 $.ajax({
				 type:"post",
				 dataType:"json",
				 async:false,
				 url:"production!gpsValidate.action",
				 data:{
					 "conditions":JSON.stringify(conditions)
				 },
				 success: function(response){
					 //alert(JSON.parse(response.data).rebackResut);
					 var reback_data=JSON.parse(response.data);
					 var reabck_msg="";
					 reabck_msg+="企标绑定结果："+reback_data.rebackDesc+"\n";
					 reabck_msg+="国标绑定结果："+reback_data.rebackDesc_gb+"\n";
					 if(!reback_data.rebackResut){
						 enterflag=false;
						// reabck_msg+=reback_data.rebackDesc+"\n";
						 //alert(reback_data.rebackDesc);
					 }
					 if(!reback_data.rebackResut_gb){
						 enterflag=false;						 
						 //alert(reback_data.rebackDesc);
						 //reabck_msg+=reback_data.rebackDesc_gb+"\n";
					 }
				/*	 if(enterflag){
						 reabck_msg="成功！";
					 }*/
					 alert(reabck_msg);
					 
				 },
				 error:function(){
					 enterflag=false;
				 }
			 });
			 if(!enterflag){
				 $("#btnSubmit").attr("disabled",false);
				 return false;
			 }
		}
		
		if(/*cur_key_name.indexOf("下线")>=0&&*/$('#exec_workshop :selected').text()=='底盘'){
			//alert(cur_key_name);
			$.each(parts_list,function(i,parts){
				if(parts.id !==0&&parts.process_name==$("#exec_processname").val()&&(parts.parts=='VIN编码'||parts.parts=='左电机号'||parts.parts=='右电机号')){
					if((parts.parts_num==undefined||parts.parts_num.trim().length==0)&&(parts.batch==undefined||parts.batch.trim().length==0)){
						enterflag=false;
						return false;
					}
				}
				if(parts.parts=='VIN编码'&&parts.parts_num!=vin&&parts.process_name==$("#exec_processname").val()){
					alert("VIN编码校验失败，请核对该车的VIN编码！");
					enterflag=false;
					return false;
				}
				if(parts.parts=='左电机号'&&parts.parts_num!=left_motor_number&&parts.process_name==$("#exec_processname").val()){
					alert("左电机号校验失败，请核对该车的左电机号！");
					enterflag=false;
					return false;
				}
				if(parts.parts=='右电机号'&&parts.parts_num!=right_motor_number&&parts.process_name==$("#exec_processname").val()){
					alert("右电机号校验失败，请核对该车的右电机号！");
					enterflag=false;
					return false;
				}
			});
			if(!enterflag){
				alert(cur_key_name+"扫描前，请将零部件信息录入完整！");
				$("#btnSubmit").attr("disabled",false);
				 return false;
			 }
		}
		
		if(cur_key_name.indexOf("下线")>=0&&$('#exec_workshop :selected').text()=='检测线'){
			//alert(cur_key_name);
			$.each(parts_list,function(i,parts){
				if(parts.id !==0){
					if((parts.parts_num==undefined||parts.parts_num.trim().length==0)&&(parts.batch==undefined||parts.batch.trim().length==0)){
						enterflag=false;
						return false;
					}
				}
			});
			if(!enterflag){
				alert(cur_key_name+"扫描前，请将零部件信息录入完整！");
				$("#btnSubmit").attr("disabled",false);
				 return false;
			 }
		}
		
		if(enterflag){
			 $.ajax({
		            type: "post",
		            dataType: "json",
		            url : "production!enterExecution.action",
		            data: {
		            	"factory_id" : $('#exec_factory').val(),
		            	"workshop_id":$('#exec_workshop').val(),
		                "bus_number":$('#vinText').val(),
		                "process_id":$('#exec_process').val(),
		                "factory_name":$('#exec_factory').find("option:selected").text(),
		                "workshop_name":$('#exec_workshop').find("option:selected").text(),
		                "line_name":$('#exec_line').find("option:selected").text(),
		                "line_id":$('#exec_line').val(),
		                "process_name":$('#exec_process').find("option:selected").text(),
		                "scanner_id":$('#exec_user').val(),
		                "repair":repair,
		                "ecn":ecn,
		                "onlineflag":onlineflag,
		                "offlineflag":offlineflag,
		                "cur_key_name":cur_key_name,
		                "bus_production_status":bus_production_status,
		                "orderType":orderType,
		                "exec_process_name":$("#exec_processname").val(),
		                "parts_list":cur_key_name.indexOf("上线")>0?JSON.stringify(parts_list):JSON.stringify(parts_update_list)
		            },
		            success: function(response){
		                resetPage();
		                if(response.success){ 
		                    fadeMessageAlert(response.message,"alert-success");
		                    resetPage();
		                }
		                else{
		                    fadeMessageAlert(response.message,"alert-error");
		                }

		                setTimeout(function() {
		                    $("#vinHint").hide().html("未输入车号");
		                    toggleVinHint(true);
		                },60000);
		                $("#partsListDiv").hide();
		            },
		            error:function(){alertError();$("#partsListDiv").hide();}
		        });
		}
       
    }
	
	function ajaxValidate (){
		$.ajax({
            type: "get",
            dataType: "json",
            url : "production!validateBusInfo.action",
            data: {
            	"bus_number": $('#vinText').attr("value"),
                "factory_id":$("#exec_factory").val(),
                "exec_process_name":$("#exec_processname").val(),
                "workshop_name":$('#exec_workshop').find("option:selected").text()
            },
            success: function(response){
                if(response.success){
                    $("#vinText").attr("disabled","disabled");
                    //show car infomation
                    if(response.data == ""){
                    	fadeMessageAlert("没有对应车号的车辆信息！","alert-error");
                    }else{
                    	
                    	var bus = response.data[0];
                    	$('#vinText').data("vin",bus.vin);
                    	bus_production_status=bus.production_status;
                    	orderType=bus.order_type;
                    	vin=bus.vin;
                		left_motor_number=bus.left_motor_number;
                		right_motor_number=bus.right_motor_number;
                    	
                    	if('检测线上线'==$("#exec_processname").val()){
                    		bus_color=bus.bus_color;
                    		bus_seats=bus.bus_seats;
                    		workshop_name=bus.workshop_name;
                    		process_name=bus.process_name;
                    		order_name=bus.order_name;
                    		bus_type_code=bus.bus_type_code;
                    		order_qty=bus.order_qty;
                    		status=bus.status;                   		
                    		initEditModel();
                    		$("#newModal").modal("show");
                    	}else{
                    		toggleVinHint(false);
                    		$("#infoColor").html(bus.bus_color);
                    		$("#infoSeats").html(bus.bus_seats);
                    		$("#infoWorkShop").html(bus.workshop_name);
                    		$("#infoLine").html(bus.line);
                    		$("#infoProcess").html(bus.process_name);
                    		$("#infoOrder").html(bus.order_name + bus.bus_type_code + " " + bus.order_qty + "台");
                    		$("#infoStatus").html((bus.status=="0")?"正常":"冻结");
                    		$("#btnSubmit").removeAttr("disabled");
                    		var cur_line=$("#exec_line option:selected").text();
                    		//alert(cur_line);
                    		if(bus.line !=$("#exec_line option:selected").text()&&bus.workshop_name==$("#exec_workshop option:selected").text()){
                    			fadeMessageAlert("该车辆已在"+bus.line+"扫描，不能跨线扫描！","alert-error");
                    			//added by xjw 20160513 根据车号查出当前线别锁定线别，不允许跨线扫描,带出相应工序
                        		getSelects_noall(line_selects_data, bus.line, "#exec_line"); 
                        		getAllProcessSelect();
                    		}   
                    		//added by xjw 20160513 根据车号查出当前线别锁定线别，不允许跨线扫描                    		
                    		$("#exec_line").attr("disabled",true);
                    		
                    	}
                    }

                }
                else{
                    resetPage();
                    fadeMessageAlert(response.message,"alert-error");
                }
            },
            error:function(){alertError();}
       });
	}
	
	function ajaxGetPartsList(){
		$.ajax({
            type: "get",
            dataType: "json",
            url : "getPartsList",
            data: {
                "bus_number": $('#vinText').attr("value"),
                "exec_process_name":$("#exec_processname").val(),
                "workshop_name":$('#exec_workshop').find("option:selected").text()
            },
            success: function(response){
            	$("#partsListTable tbody").html("");
            	parts_update_list=[];
            	parts_list=response.data;
            	$.each(response.data,function(index,parts){
            		//if(parts.id !== 0){
            			if((parts.process_name==$("#exec_processname").val()||$("#exec_processname").val()=='检测线下线')&&parts.parts){
	            			var tr=$("<tr />");
	            			if(parts.parts==''||parts.parts==null){
	            				$(tr).css('display','none');
	            			}
	            			
	                		$("<td align=\"left\" height=36px style=\"padding-left:5px\">"+parts.parts+"</td>").appendTo(tr);
	                		if(parts.parts_num){
	                			$("<td align=\"left\" height=36px style=\"padding-left:5px\"><input class='partsNum' style=\"border:0px;width:90%;font-size:14px\" disabled value='"+parts.parts_num+"' /></td>").appendTo(tr);
	                		}else
	                		$("<td align=\"left\" height=36px style=\"padding-left:5px\"><input class='partsNum' placeholder=\"请扫描零部件编号\" style=\"border:0px;width:90%;font-size:14px\" /></td>").appendTo(tr);
	                		if(parts.batch){
	                			$("<td align=\"left\" height=36px style=\"padding-left:5px\"><input class='batch' style=\"border:0px;width:90%;font-size:14px\" disabled value='"+parts.batch+"' /></td>").appendTo(tr);
	                		}else if(parts.parts=='VIN编码'||parts.parts=='左电机号'||parts.parts=='右电机号'){
	                			$("<td align=\"left\" height=36px style=\"padding-left:5px\"><input class='batch' placeholder=\"请填写厂商零部件批次\" style=\"border:0px;width:90%;font-size:14px\" disabled /></td>").appendTo(tr);
	                		}else
	                		$("<td align=\"left\" height=36px style=\"padding-left:5px\"><input class='batch' placeholder=\"请填写厂商零部件批次\" style=\"border:0px;width:90%;font-size:14px\" /></td>").appendTo(tr);
	                		if(parts.parts_num||parts.batch){
	                			$("<td align=\"left\" style=\"width:36px;padding-left:10px\"><i class=\"fa fa-2x fa-check-circle-o\" style=\"color:green\" aria-hidden=\"true\"></i></td>").appendTo(tr);
	                		}else{
	                			$("<td align=\"left\" style=\"width:36px;padding-left:10px\"></td>").appendTo(tr);
	                		}
	                		$("#partsListTable tbody").append(tr);
	                		$(tr).data("parts_index",index);
	            		}  	
            		//}

            	});
            }
		}) 
	}
	
	$(".partsNum,.batch").on("input",function(e){
		var patsNumInput=$(e.target).parent("td").parent("tr").find(".partsNum");
		var batchInput=$(e.target).parent("td").parent("tr").find(".batch");
		if($(patsNumInput).val()||$(batchInput).val()){
			$(e.target).parent("td").parent("tr").find("td").eq(3).html("<i class=\"fa fa-2x fa-check-circle-o\" style=\"color:green\" aria-hidden=\"true\"></i>");
		}else{
			$(e.target).parent("td").parent("tr").find("td").eq(3).html("");
		}
		
	});
	
	$(".partsNum,.partsHide,.batch").on("change",function(e){
		var tr=$(e.target).parent("td").parent("tr");
		var patsNumInput=$(tr).find(".partsNum");
		var batchInput=$(tr).find(".batch");
		var parts_index=$(tr).data("parts_index");
		parts_list[parts_index].parts_num=$(patsNumInput).val();
		parts_list[parts_index].batch=$(batchInput).val();
		parts_update_list.push(parts_list[parts_index]);
		
	});
	
	
/*	$(".partsNum").live("focus",function(event){
		var tds=$(this).parent("td").siblings();
		var parts_name=$(tds[0]).html();
		if(parts_name=='VIN编码'||parts_name=='左电机号'||parts_name=='右电机号'){
			 //alert("aaa")
			$(this).val("");
			$(this).parent("td").find(".partsHide").val("");
			$(this).css("border","1px solid");
			$(this).blur();
			$(this).parent("td").find(".partsHide").focus();
		}
		
	});*/
	
	
	$(".partsNum").on("keydown",function(event){	
		if (event.keyCode == "13") {
			var nxinput=$(event.target).parent("td").parent("tr").find(".batch");
			//alert($(nxinput).attr("class"));
			$(nxinput).focus();
		}
		
	});
	
/*	$(".partsHide").live("keydown",function(event){
		if (event.keyCode == "13") {
			$(this).parent("td").find(".partsNum").css("border","0px").val($(this).val());
			var nxinput=$(event.target).parent("td").parent("tr").find(".batch");
			//$(nxinput).focus();
			$(event.target).parent("td").parent("tr").find("td").eq(3).html("<i class=\"fa fa-2x fa-check-circle-o\" style=\"color:green\" aria-hidden=\"true\"></i>");
		}
		
	});*/
	
	
	$("#btnAddConfirm").click( function (argument) {
		if(vin===$("#vin").val() && left_motor_number===$("#left_motor_number").val() && right_motor_number===$("#right_motor_number").val()){
			toggleVinHint(false);
			$("#infoColor").html(bus_color);
    		$("#infoSeats").html(bus_seats);
    		$("#infoWorkShop").html(workshop_name);
    		$("#infoProcess").html(process_name);
    		$("#infoOrder").html(order_name + bus_type_code + " " + order_qty + "台");
    		$("#infoStatus").html((status=="0")?"正常":"冻结");
    		$("#btnSubmit").removeAttr("disabled");
			
    		$('#newModal').modal('hide');
		}else{
			
			alert("校验失败！");
		}
		return false;
	});
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#vinText').bind('keydown', function(event) {
        //if vinText disable,stop propogation
        if($(this).attr("disabled") == "disabled")
            return false;
        if (event.keyCode == "13"){	
            if(jQuery.trim($('#vinText').val()) != ""){
                ajaxValidate();
                ajaxGetPartsList();
                $("#partsListDiv").show();
            }
            return false;
        }
    });
    //输入车号后，切换监控点，当选择的为J01时弹出vin校验
    $("#exec_process").on("change",function(){
    	var bus_number=$('#vinText').attr("value");
    	if(bus_number&&bus_number!=''&&$("#exec_process :selected").text()=='J01'){
    		$("#btnSubmit").attr("disabled","disabled");
    		ajaxValidate();
    	}else{
    		$("#btnSubmit").removeAttr("disabled");
    	}
    });
    
    $("#btnSubmit").click(function() {
        if(!($("#btnSubmit").hasClass("disabled"))){
            $("#btnSubmit").attr("disabled","disabled");
            if(cur_key_name.indexOf("下线")>=0&&$('#exec_workshop :selected').text()=='总装'){
        		$("#clientVin").val($('#vinText').data("vin"));
        		$("#gpsModal").modal("show");
        	}else{
        		ajaxEnter();
        	}            
            //$("#gpsModal").modal("hide");
        }
        return false;
    });
    
    $("#clientValidate").click(function(){
    	ajaxEnter();
    });
    
    $("#reset").click(function() {
        resetPage();
        return false;
    });
	
	$("#exec_type").change(function(){
		if($(this).children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}
	});
	
	$("#exec_factory").change(function(){
		$("#exec_workshop").empty();
		if($("#exec_factory").val() !=''){
			getAllWorkshopSelect();
		}
	});
	
	$("#exec_workshop").change(function(){
		$("#exec_line").empty();
		if($("#exec_workshop").val() !=''){
			getAllLineSelect();
		}
	});
	
	$("#exec_line").change(function(){
		$("#exec_process").empty();
		if($("#exec_line").val() !=''){
			getAllProcessSelect();
		}
	});
	
	$("#exec_process").change(function(){
		$("#exec_processname").val('');
		alert($(this).find("").attr("process"));
		if($("#exec_line").val() !=''){
			$("#exec_processname").val($(this).attr("process"));
			ajaxGetPartsList();
		}
	});
	
	function getFactorySelect() {
		$.ajax({
			url : "/IMMS/common/getFactorySelectAuth",
			dataType : "json",
			data : {},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				getSelects_noall(response.data, "", "#exec_factory");
				$("#exec_factory").val(getQueryString("factory_id"));
				//$("#exec_factory option:contains('武汉工厂')").attr("selected", true);
				getAllWorkshopSelect();
				$("#exec_workshop").val(getQueryString("workshop_id"));
				getAllLineSelect();
				$("#exec_line").val(getQueryString("line"));		
				getAllProcessSelect();
				$("#exec_process").val(getQueryString("process_id"));
				getProcessInfo($("#exec_process").val());
			}
		});
	}
	
	   
	
})


function getAllWorkshopSelect() {
	$("#exec_workshop").empty();
	$.ajax({
		url : "/IMMS/common/getWorkshopSelectAuth",
		dataType : "json",
		data : {
				factory:$("#exec_factory :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response.data, "", "#exec_workshop",null,"id");
		}
	});
}

function getAllLineSelect() {
	$("#exec_line").empty();
	$.ajax({
		url : "/IMMS/common/getLineSelectAuth",
		dataType : "json",
		data : {
				factory:$("#exec_factory :selected").text(),
				workshop:$("#exec_workshop :selected").text()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			line_selects_data=response.data;
			getSelects(response.data, "", "#exec_line",null,"name"); 
		}
	});
}

function getAllProcessSelect() {
	$("#exec_process").empty();
	$.ajax({
		url : "/IMMS/common/getProcessMonitorSelect",
		dataType : "json",
		data : {
			factory:$("#exec_factory :selected").text(),
			workshop:$("#exec_workshop :selected").text(),
			line:$("#exec_line").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";
		    $("#exec_process").html("");
		    $.each(response.data, function(index, value) {
		    	if (index == 0) $("#exec_processname").val(value.process_name);
		    	strs += "<option value=" + value.id + " process='"+value.process_name+"'>" + value.process_code + "</option>";
		    });
		    $("#exec_process").append(strs);
		}
	});
}

/*function getProcessInfo(processID){
	$.ajax({
		url : "common!getProcessInfo.action",
		dataType : "json",
		data : {processID:processID},
		async : false,
		error : function(response) {
			alert(response.message);
		},
		success : function(response) {
			var list = response.data;
			//alert(list[0].process_name);
			$("#exec_processname").val(list[0].process_name);
			cur_key_name = list[0].cur_key_name;
		}
	});
}*/

function toggleVinHint (showVinHint) {
    if(showVinHint){
        $("#carInfo").hide();
        $("#vinHint").fadeIn(1000);

    }else{
        $("#vinHint").hide();
        $("#carInfo").fadeIn(1000);
    }
}

function initEditModel() {
    $('#vin').val('');
    $('#left_motor_number').val('');
    $('#right_motor_number').val('');
}
