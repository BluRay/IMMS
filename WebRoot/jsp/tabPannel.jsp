<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript">
	$(document).ready(function () {
		
		//获取页面 class为 page-content 的DIV内容 
		var pageContentDiv = $(".page-content-area").html();
		 		pageContentDiv = '<div class="row">'+
								  					'<div class="col-xs-12" >'+
								   						'<ul class="nav nav-tabs" role="tablist">'+
								   							'<li class="active"><a href="#Index" role="tab" data-toggle="tab"><i class="menu-icon fa fa-home green"></i>&nbsp;&nbsp;首页</a></li>'+
								   						'</ul>'+
								   						'<div class="tab-content" style="padding:5px 0px 0px;border:0px;">'+
								   			  				'<div role="tabpanel" class="tab-pane active" id="Index" >'+pageContentDiv+
								   			  				'</div>'+
								   			  			'</div>'+
								   			  		'</div>'+
													'<div class="nav-search" id="nav-search">'+
														'<form class="form-search">'+
															'<span><i class="ace-icon fa fa-book blue"></i><a href="../BMS平台操作手册.pptx">《BMS操作手册》</a></span> '+
															'<span class="input-icon">'+
																'<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>'+
															'</span>'+
														'</form>'+
													'</div>'+
						   			  	'</div>';
						   			  	
		$(".page-content-area").html(pageContentDiv); 
		
		getBusNumberSelect('#nav-search-input');
		$('#nav-search-input').bind('keydown', function(event) {
			if (event.keyCode == "13") {
				//window.open("/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val());
				var url = "/BMS/production/productionsearchbusinfo?bus_number=" + $("#nav-search-input").val();
				var obj ={"id":"车辆信息查询","title":"车辆信息查询","close": "true","url": url};
				addTabs(obj);
				return false;
			}
		});
	});
</script>
<script src="/BMS/js/bootstrap-tab.js"></script>
</head>