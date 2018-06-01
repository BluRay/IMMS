var saveflag=true;
$(document).ready(function(){
	initPage();
  
    $("#btn_save").click(function(){
        var quantity=$("#quantity").val();
    	if(quantity.trim().length==0){
    		saveflag=false
	   		alert("请填写供应数量!");
	   		return false;
    	}
    	if(!const_int_validate.test(quantity)){
    		saveflag=false
	   		alert("供应数量只能为整数!");
	   		return false;
    	}
    	if($("#business_date").val().trim().length==0){
    		saveflag=false
	   		alert("请填写供应日期!");
	   		return false;
    	}
//    	var demand_quantity=$("#demand_quantity").val();
//    	var received_quantity=$("#received_quantity").val();
//    	var check=demand_quantity-received_quantity
//    	if(quantity>check){
//    		alert("本次供货数量不能大于："+check);
//	   		return false;
//    	}
    	var demand_quantity=$("#demand_quantity").val();
    	var received_quantity=$("#received_quantity").val();
    	var old_quantity=$("#old_quantity").val();
    	received_quantity=(received_quantity!='' ? received_quantity : 0);
    	var check_quantity=parseFloat(demand_quantity)+parseFloat(old_quantity)-parseFloat(received_quantity);
    	if(parseFloat(quantity)-check_quantity>0){
    		alert("本次供货数量不大于:"+check_quantity);
    		$("#quantity").css("border-color",'red');
    		$("#quantity").focus();
    		return false;
    	}
    	if(saveflag){
    		ajaxSave();
    	}
    	
    });
})

function initPage(){

}

function clear(){
	
}

function ajaxSave(){
	$.ajax({
		url : "updateWorkshopSupply",
		dataType : "json",
		data : {
			"id":$("#id").val(),
			"quantity":$("#quantity").val(),
			"business_date":$("#business_date").val()
			},
		async : false,
		error : function(response) {
			alert("修改失败");
		},
		success:function(response){
			if(response.success){
				alert("修改成功");
				clear();
			}else{
				alert("修改失败");
			}
		}
	})
}
function clear(){
	$("#order_desc").val("");
	$("#mat_description").val("");
	$("#demand_quantity").val("");
	$("#old_quantity").val("");
	$("#received_quantity").val("");
	$("#quantity").val("");
	$("#business_date").val("");
}