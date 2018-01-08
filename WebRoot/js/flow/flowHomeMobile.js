
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		ajaxQuery();
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
	});
	$("#apply").click(function(){
		$.ajax({
	        type: "post",
	        url: "../process/processList",
	        data: {
	        },  //传入组装的参数
	        dataType: "json",
	        success: function (result) {
	        	var str="";
	        	$.each(result.data,function(index,value){
	         	   str+="<div style='text-align:center;cursor:pointer;height:45px;width:280px;margin:20px;padding-top:5px;border:1px solid #ffffff;background-color:#ddddff;border-radius:10px; line-height:35px'" +
	         	   		"onclick=openWin('"+value.instance_Url+"','"+value.id+"','"+value.name+"')>"+value.display_Name+"</div>"
	            });
	            $("#applyDiv").html(str);
	        }
	    });
	})
	
});
function openWin(url,processId,processName){
	var param="?processId="+processId+"&processName="+processName;
	var path=$("#urlPath").val()+url.substring(1)+"Mobile"+param;
	window.location.href=path;
}

function ajaxQuery(){
	$.ajax({
	    url: "../task/homeTaskList",
	    dataType: "json",
		type: "post",
	    data: {
	    	"taskType":'Major'
	    },
	    success:function(response){
	    	$("#table01 tbody").html("");
	    	var url=$("#urlPath").val();
	    	$.each(response.data,function (index,value) {
	    		var path=url+(value.instance_Url=='' ? value.action_Url : value.instance_Url );
	    		var tr = $("<div class='table-tr' id='tr"+(index+1)+"'></div>");
    			$("<div class='table-td'></div>").html('<a href='+path+'Mobile?processId='+value.process_Id+'&taskId='+value.task_Id+'&orderId='+value.order_Id+' title="处理">'+value.process_Name+'</a>').appendTo(tr);
    			$("<div class='table-td'></div>").html(value.apply_username).appendTo(tr);
    			$("<div class='table-td'></div>").html(value.department).appendTo(tr);
    			$("<div class='table-td'></div>").html(value.order_Create_Time).appendTo(tr);
    			$("<div class='table-td'></div>").html(value.task_Name).appendTo(tr);
    			$("#tr"+index).after(tr);
    			url=$("#urlPath").val();
	    	});
	    }
	});
}