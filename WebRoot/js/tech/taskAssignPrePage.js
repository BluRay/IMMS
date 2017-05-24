var switch_node_arr="焊装,玻璃钢,涂装,底盘,总装,检测线";
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vMonBefore= d.getMonth();
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		s1=(vYear-1)+"-"+(12)+"-"+"01";	
		s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		$("#startDate").val(s1);
		$("#endDate").val(s);
	}
	
});

