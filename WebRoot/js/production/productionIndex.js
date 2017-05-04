var user_staff={'workshops':'焊装'};// 当前用户员工信息 
$(document).ready(function () {
	initPage();
	setInterval(function () {
		ajaxQuery();
	},1000*60*5);
	
	$("#search_factory").live("change",function(){
		ajaxQuery();
	});
	
	function initPage(){
		getFactorySelect("","","#search_factory",null,"id")
		user_staff = getStaffInfo1();		// 获取当前用户员工信息 
		ajaxQuery();
	}
	
})


/**
	 * 点击车间判断是否有该车间的扫描权限，有就跳转到对应车间生产执行页面
	 */
	function executionFoward(workshop){
		if(user_staff.workshops!=null && user_staff.workshops.indexOf(workshop)>=0){
			window.location.href='executionindex?workshop='+workshop;
		}else{
			alert("对不起，您没有该车间扫描权限！");
		}
	}