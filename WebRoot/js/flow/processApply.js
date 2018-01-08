
$(document).ready(function(){
	initPage();
	function initPage(){
		getBusNumberSelect('#nav-search-input');
		ajaxQuery();
	}
	$('#nav-search-input').bind('keydown', function(event) {
		if (event.keyCode == "13") {
			window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
			return false;
		}
	})
});

function ajaxQuery(){
	$.ajax({
        type: "post",
        url: "../process/processList",
        data: {
        },  //传入组装的参数
        dataType: "json",
        success: function (result) {
        	var str="";
        	$.each(result.data,function(index,value){
         	   str+="<div style='text-align:center;cursor:pointer;height:45px;width:160px;margin:20px;padding-top:5px;float:left;border:1px solid #ffffff;background-color:#ddddff;border-radius:10px; line-height:35px'" +
         	   		"onclick=openWin('"+value.instance_Url+"','"+value.id+"','"+value.name+"')>"+value.display_Name+"</div>"
            });
            $("#dialog-show").html(str);
        }
    });
}
function openWin(url,processId,processName){
	var param="?processId="+processId+"&processName="+processName;
	var path=$("#urlPath").val()+url.substring(1)+param;
	window.location.href=path;
}
