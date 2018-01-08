<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../assets/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">
label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}

.table, .table * {margin: 0 auto; padding: 0;font-size: 14px;font-family: Arial, 宋体, Helvetica, sans-serif;}   
.table {display: table; width: 80%; border-collapse: collapse;}   
.table-tr {display: table-row; height: 30px;}   
.table-th {display: table-cell;font-weight: bold;height: 100%;border: 1px solid gray;text-align: center;vertical-align: middle;}   
.table-td {display: table-cell; height: 100%;border: 1px solid gray; text-align: center;vertical-align: middle;}   


</style>
<jsp:include page="../common.jsp"></jsp:include>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<%-- <jsp:include page="../top.jsp" flush="true" /> --%>
	<!-- 身 -->
	<div class="main-container" id="main-container" style="height:100%">
		<!-- 左边菜单 -->
		<%-- <jsp:include page="../left.jsp" flush="true" /> --%>
		<!-- 主体 -->
		<div class="main-content">
		    <!-- 路径和搜索框 -->
			<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
				<ul class="breadcrumb" style="font-size:14px;">
				<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
					<li><a href="#">流程管理</a></li>
				</ul>	
			</div>
			<div class="col-sm-6 widget-container-col">
				<div class="widget-box transparent">
					<div class="widget-header">

						<div class="widget-toolbar no-border">
							<ul class="nav nav-tabs" id="myTab2">
								<li class="active">
									<a data-toggle="tab" href="#home2">待办</a>
								</li>

								<li>
									<a data-toggle="tab" href="#profile2">已办</a>
								</li>

								<li id="apply">
									<a data-toggle="tab" href="#info2">申请</a>
								</li>
							</ul>
						</div>
					</div>
                    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>">
					<div class="widget-body">
						<div class="widget-main padding-12 no-padding-left no-padding-right">
							<div class="tab-content padding-4">
								<div id="home2" class="tab-pane in active">
									<!-- #section:custom/scrollbar.horizontal -->
									<div class="scrollable-horizontal scrollable" data-size="200">
										<div style="width:800px;height:500px;border-radius:10px;">
										    <div class="table">  
										        <div class="table-tr" id="tr0">  
										            <div class="table-th">流程名称</div>  
										            <div class="table-th">拟稿人</div>  
										            <div class="table-th">拟稿人科室</div>
										            <div class="table-th">申请时间</div> 
										            <div class="table-th">节点名称</div>  
										        </div>  
										    </div>  
										</div>
									</div>

									<!-- /section:custom/scrollbar.horizontal -->
								</div>

								<div id="profile2" class="tab-pane">
									<div class="scrollable" data-size="100" data-position="left">
										<b>Scroll on Left</b>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo massa sed ipsum porttitor facilisis. Nullam interdum massa vel nisl fringilla sed viverra erat tincidunt. Phasellus in ipsum velit. Maecenas id erat vel sem convallis blandit. Nunc aliquam enim ut arcu aliquet adipiscing. Fusce dignissim volutpat justo non consectetur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo massa sed ipsum porttitor facilisis. Nullam interdum massa vel nisl fringilla sed viverra erat tincidunt. Phasellus in ipsum velit. Maecenas id erat vel sem convallis blandit. Nunc aliquam enim ut arcu aliquet adipiscing. Fusce dignissim volutpat justo non consectetur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo massa sed ipsum porttitor facilisis. Nullam interdum massa vel nisl fringilla sed viverra erat tincidunt. Phasellus in ipsum velit. Maecenas id erat vel sem convallis blandit. Nunc aliquam enim ut arcu aliquet adipiscing. Fusce dignissim volutpat justo non consectetur.
									</div>
								</div>

								<div id="info2" class="tab-pane">
									<div class="scrollable" data-size="1" id="applyDiv" data-position="left">
									  Lorem ipsum dolor
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
					
			<!-- /.main-container -->
		</div>
		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
	    <script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/flow/flowHomeMobile.js"></script>
        <script type="text/javascript">
			jQuery(function($) {
			
				$('#simple-colorpicker-1').ace_colorpicker({pull_right:true}).on('change', function(){
					var color_class = $(this).find('option:selected').data('class');
					var new_class = 'widget-box';
					if(color_class != 'default')  new_class += ' widget-color-'+color_class;
					$(this).closest('.widget-box').attr('class', new_class);
				});
			
			
				// scrollables
				$('.scrollable').each(function () {
					var $this = $(this);
					$(this).ace_scroll({
						size: $this.data('size') || 100,
						//styleClass: 'scroll-left scroll-margin scroll-thin scroll-dark scroll-light no-track scroll-visible'
					});
				});
				$('.scrollable-horizontal').each(function () {
					var $this = $(this);
					$(this).ace_scroll(
					  {
						horizontal: true,
						styleClass: 'scroll-top',//show the scrollbars on top(default is bottom)
						size: $this.data('size') || 500,
						mouseWheelLock: true
					  }
					).css({'padding-top': 12});
				});
				
				$(window).on('resize.scroll_reset', function() {
					$('.scrollable-horizontal').ace_scroll('reset');
				});
				
			});
			
		</script>
</div>
</body>
</html>