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
						   			  	'</div>';
						   			  	
		$(".page-content-area").html(pageContentDiv); 
		
	});
</script>
<script src="/BMS/js/bootstrap-tab.js"></script>
</head>