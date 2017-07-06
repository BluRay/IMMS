var cur_tab = "01";
var test_card_infos=new Array();
var prod_track_infos=new Array();
var oc_infos=new Array();
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		cur_tab = "01";
		if(Request("bus_number")!=""){
			$("#search_busnumber").val(Request("bus_number"));
			ajaxQuery();
		}
	}
	
	$("li").on('click',function(e){
		if(this.id == "div1"){			//基本信息
			cur_tab = "01";
			ajaxQuery();
		}else if(this.id == "div2"){	//生产信息
			cur_tab = "02";
			ajaxQueryTab02();
		}else if(this.id == "div3"){
			cur_tab = "03";
			
		}else if(this.id == "div4"){
			cur_tab = "04";
			
		}else if(this.id == "div5"){
			cur_tab = "05";
			
		}else if(this.id == "div6"){	//底盘铭牌
			cur_tab = "06";
			ajaxQueryTab06();
		}else if(this.id == "div7"){
			cur_tab = "07";
			ajaxQueryTab07();
		}else if(this.id == "div8"){
			cur_tab = "08";
			
		}else if(this.id == "div9"){
			cur_tab = "09";
			
		}else if(this.id == "div10"){
			cur_tab = "10";
			
		}
	});
	
	$("#btnQuery").click (function () {
		if($("#search_busnumber").val()==""){
			alert("请输入车号或VIN号！");
			return false;
		}
		if(cur_tab == "01")ajaxQuery();
		if(cur_tab == "02")ajaxQueryTab02();
		
		if(cur_tab == "06")ajaxQueryTab06();
		if(cur_tab == "07")ajaxQueryTab07();
	});
	
});

function ajaxQuery(){
	clear_baseinfo();
	$.ajax({
	    url: "getProductionSearchBusInfo",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val()
	    },
	    success:function(response){
	    	$.each(response.data,function (index,value) {
	    		$("#tab01_order_no").html(value.order_no + " " + value.order_name + value.bus_type_code + value.order_qty + "辆");
	    		$("#tab01_bus_number").html(value.bus_number);
	    		$("#tab01_vin").html(value.vin);
	    		$("#tab01_factory_name").html(value.factory_name);
	    		$("#tab01_order_config_name").html(value.order_config_name);
	    		$("#tab01_customer").html(value.customer);
	    		$("#tab01_productive_date").html(value.productive_date);
	    		$("#tab01_left_motor_number").html(value.left_motor_number);
	    		$("#tab01_right_motor_number").html(value.right_motor_number);
	    		$("#tab01_bus_color").html(value.bus_color);
	    		$("#tab01_bus_seats").html(value.bus_seats);
	    		var production_status = "正常";
	    		if(value.production_status == '1')production_status = "返修";
		    	if(value.production_status == '2')production_status = "技改";
	    		$("#tab01_production_status").html(production_status);
	    		$("#tab01_dispatch_date").html(value.dispatch_date);
	    		$("#tab01_customer_number").html(value.customer_number);
	    		$("#tab01_welding_online_date").html(value.welding_online_date);
	    		$("#tab01_welding_offline_date").html(value.welding_offline_date);
	    		$("#tab01_fiberglass_offline_date").html(value.fiberglass_offline_date);
	    		$("#tab01_painting_online_date").html(value.painting_online_date);
	    		$("#tab01_painting_offline_date").html(value.painting_offline_date);
	    		$("#tab01_chassis_online_date").html(value.chassis_online_date);
	    		$("#tab01_chassis_offline_date").html(value.chassis_offline_date);
	    		$("#tab01_assembly_online_date").html(value.assembly_online_date);
	    		$("#tab01_assembly_offline_date").html(value.assembly_offline_date);
	    		$("#tab01_debugarea_online_date").html(value.debugarea_online_date);
	    		$("#tab01_debugarea_offline_date").html(value.debugarea_offline_date);
	    		$("#tab01_testline_online_date").html(value.testline_online_date);
	    		$("#tab01_testline_offline_date").html(value.testline_offline_date);
	    		$("#tab01_warehousing_date").html(value.warehousing_date);	    		
	    		
	    		$("#tab01_config_file").html('<a target="blank" href="images/upload/orderConfig/'+value.config_file+'">查看</a>');
	    	})
	    }
	});
	
}

function ajaxQueryTab02(){
	$.ajax({
	    url: "getProductionSearchScan",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val()
	    },
	    success:function(response){
	    	$("#table02 tbody").html("");
	    	$.each(response.data,function (index,value) {
	    		var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.line_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.scan_time).appendTo(tr);
    			var status = "正常";
    			if (value.repair == "1")status = "返修";
    			if (value.ecn == "1")status = "技改";
    			if (value.onlineflag == "1")status += "返修";
    			if (value.offlineflag == "1")status += "技改";
    			$("<td style=\"text-align:center;padding:3px\" />").html(status).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.display_name).appendTo(tr);
    			$("#table02 tbody").append(tr);
	    	});
	    }
	});
	
}


function ajaxQueryTab06(){
	$.ajax({
	    url: "getNamePlateInfo",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val()
	    },
	    success:function(response){
	    	$.each(response.data,function (index,value) {
    			$("#tab06_VIN").html(value.vin);
    			$("#tab06_vehicle_model").html(value.vehicle_model);
	    		$("#tab06_brand").html(value.brand);
	    		$("#tab06_motor_model").html(value.motor_model);
	    		$("#tab06_chassis_model").html(value.chassis_model);
	    		$("#tab06_passenger").html(value.passenger_num);
	    		$("#tab06_motor_power").html((typeof(value.motor_power) == "undefined")?'':value.motor_power+' KW');
	    		$("#tab06_max_weight").html((typeof(value.max_weight) == "undefined")?'':value.max_weight+' KG');
	    		$("#tab06_battery_model").html(value.battery_model);
	    		$("#tab06_sequence").html(value.bus_number);
	    		$("#tab06_battery_capacity").html((typeof(value.battery_capacity) == "undefined")?'':value.battery_capacity+' AH');
	    		$("#tab06_productive_date").html(value.productive_date);
	    		$("#tab06_rated_voltage").html((typeof(value.rated_voltage) == "undefined")?'':value.rated_voltage+' V');
	    		$("#tab06_max_speed").html((typeof(value.max_speed) == "undefined")?'':value.max_speed+' km/h');
	    		$("#tab06_light_downdip").html(value.light_downdip);
    		});	
	    }
	});
	
}

function ajaxQueryTab07(){
	$.ajax({
	    url: "getNamePlateInfo",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val()
	    },
	    success:function(response){
	    	$.each(response.data,function (index,value) {
	    		$("#tab07_VIN").html(value.vin);
    			$("#tab07_vehicle_model").html(value.vehicle_model);
	    		$("#tab07_brand").html(value.brand);
	    		$("#tab07_motor_model").html(value.motor_model);
	    		$("#tab07_chassis_model").html(value.chassis_model);
	    		$("#tab07_motor_power").html((typeof(value.motor_power) == "undefined")?'':value.motor_power+' KW');
	    		$("#tab07_max_weight").html((typeof(value.max_weight) == "undefined")?'':value.max_weight+' KG');
	    		$("#tab07_battery_model").html(value.battery_model);
	    		$("#tab07_sequence").html(value.bus_number);
	    		$("#tab07_battery_capacity").html((typeof(value.battery_capacity) == "undefined")?'':value.battery_capacity+' AH');
	    		$("#tab07_productive_date").html(value.zc_production_date);
	    		$("#tab07_rated_voltage").html((typeof(value.rated_voltage) == "undefined")?'':value.rated_voltage+' V');
	    		$("#tab07_max_speed").html((typeof(value.max_speed) == "undefined")?'':value.max_speed+'km/h ');
	    		$("#tab07_light_downdip").html(value.light_downdip);
	    		$("#tab07_passenger").html(value.passenger_num);
    		});	
	    }
	});
}

function Request(strName){  
	var strHref = location.href; 
	var intPos = strHref.indexOf("?");  
	var strRight = strHref.substr(intPos + 1);  
	var arrTmp = strRight.split("&");  
	for(var i = 0; i < arrTmp.length; i++) {  
		var arrTemp = arrTmp[i].split("=");  
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];  
	}  
	return "";  
} 

function clear_baseinfo(){
	$("#tab01_order_no").html("");
	$("#tab01_bus_number").html("");
	$("#tab01_vin").html("");
	$("#tab01_factory_name").html("");
	$("#tab01_order_config_name").html("");
	$("#tab01_customer").html("");
	$("#tab01_productive_date").html("");
	$("#tab01_left_motor_number").html("");
	$("#tab01_right_motor_number").html("");
	$("#tab01_bus_color").html("");
	$("#tab01_bus_seats").html("");
	$("#tab01_production_status").html("");
	$("#tab01_dispatch_date").html("");
	$("#tab01_customer_number").html("");
	$("#tab01_welding_online_date").html("");
	$("#tab01_welding_offline_date").html("");
	$("#tab01_fiberglass_offline_date").html("");
	$("#tab01_painting_online_date").html("");
	$("#tab01_painting_offline_date").html("");
	$("#tab01_chassis_online_date").html("");
	$("#tab01_chassis_offline_date").html("");
	$("#tab01_assembly_online_date").html("");
	$("#tab01_assembly_offline_date").html("");
	$("#tab01_debugarea_online_date").html("");
	$("#tab01_debugarea_offline_date").html("");
	$("#tab01_testline_online_date").html("");
	$("#tab01_testline_offline_date").html("");
	$("#tab01_warehousing_date").html("");	    			
	$("#tab01_config_file").html("");
}