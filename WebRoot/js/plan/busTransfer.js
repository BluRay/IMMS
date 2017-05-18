var div_height = $(window).height()-180;

$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect("plan/planSearch",'',"#transfer_in_factory",null,'id');
		$("#btnTransferOut").attr("disabled","disabled"); 
		$("#out").css("height",div_height);
		$("#in").css("height",div_height);
		$("#his").css("height",div_height);
	}
	
	$("#btnTransferOutQuery").click (function () {
		if($("#transfer_out_busnumber").val() == ""){
			alert("请输入车号！");
			$("#transfer_out_busnumber").focus();
			return false;
		}
		ajaxQueryOut();
	});
	
	$("#btnTransferOut").click (function () {
		var bus_numbers = "";
		$('#tableBusInfoOut tr').each(function(e){
			var id = $(this).attr("id");
			if(id != "0"){
				if($('#check_' + id).is(':checked')==true){
					bus_numbers+=$(this).attr("id")+",";
				}
			}
		});
		console.log("---->bus_numbers=" + bus_numbers);
		if(bus_numbers == ""){
			$.gritter.add({
				title: '系统提示：',
				text: '<h5>请选择要调动的车号！</h5>',
				class_name: 'gritter-error'
			});
			return false;
		}
		
	});
	
	
	function ajaxQueryOut(){
		$.ajax({
		    url: "busTransferOutQuery",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#transfer_in_factory').val(),
		    	"busNumbers": "'" + $('#transfer_out_busnumber').val().replace(/\r/ig, "','").replace(/\n/ig, "','") + "'"
		    },
		    success:function(response){
		    	$("#btnTransferOut").removeAttr("disabled");
		    	$("#tableBusInfoOut tbody").html("");
		    	$.each(response.data,function (index,value) {
		    		var tr = "";
	    			if((value.status==0)){
	    				tr = $("<tr id =\""+value.bus_number+"\" />");
	    				$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" type=\"checkbox\">").appendTo(tr);
	    			}else{
	    				tr = $("<tr id =\"0\" />");
	    				$("<td style=\"text-align:center;\" />").html("<input disabled=\"disabled\" type=\"checkbox\">").appendTo(tr);
	    			}
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.order_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number.substr(0,value.bus_number.indexOf("-"))).appendTo(tr);
	    			var bus_numberstr = value.bus_number.substr(value.bus_number.indexOf("-")+1,value.bus_number.length);
	    			var bus_numberstr2 = bus_numberstr.substr(bus_numberstr.indexOf("-")+1,bus_numberstr.length);
	    			$("<td style=\"text-align:center;\" />").html(bus_numberstr2.substr(0,4)).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.customer).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.order_config_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html("").appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html((value.status==0)?"正常":"冻结").appendTo(tr);
	    			$("#tableBusInfoOut tbody").append(tr);
		    	});
		    }
		});
	}
	
});