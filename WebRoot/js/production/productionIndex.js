var workshopAuthList=[];// 当前用户员工信息 
$(document).ready(function () {
	initPage();
	setInterval(function () {
		ajaxQuery();
	},1000*60*5);
	
	$("#search_factory").bind("change",function(){
		ajaxQuery();
	});
	
	function initPage(){
		getFactorySelect("","","#search_factory",null,"id");
		getWorkshopAuthList();
		ajaxQuery();
	}
	
})


/**
	 * 点击车间判断是否有该车间的扫描权限，有就跳转到对应车间生产执行页面
	 */
	function executionFoward(workshop){
		if(workshopAuthList!=null && workshopAuthList.indexOf(workshop)>=0){
			window.location.href='executionindex?workshop='+workshop;
		}else{
			alert("对不起，您没有该车间扫描权限！");
		}
	}

	function getWorkshopAuthList(){
		$.ajax({
			url : "/IMMS/common/getWorkshopSelectAuth",
			dataType : "json",
			data : {"function_url":'production/index',"factory":$("#search_factory :selected").text()},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				$.each(response.data,function(index,workshop){
					workshopAuthList.push(workshop.name);
				});
			}
		});
	}
	
	
function imgFoward(name,workshop){
		
	if(name=='VIN'){
		window.location.href='/IMMS/production/showVinPrint';
	}
	if(name=='车身号'){
		window.location.href='/IMMS/production/showBusNoPrint';
	}
	
}