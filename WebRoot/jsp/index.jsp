<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<jsp:include page="top.jsp" flush="true"/>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index">首页</a></li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div><!-- /.nav-search -->
				</div>
				
			<div class="page-content">
					<!-- 设置小部件 -->
					<%-- <jsp:include page="settings.jsp" flush="true"/> --%>
					<!-- /section:settings.box -->
					<div class="page-content-area">
						<div class="row">
							<div class="col-xs-12 col-sm-6 widget-container-col ui-sortable">
										<!-- #section:custom/widget-box -->
										<div class="widget-box ui-sortable-handle">
											<div class="widget-header">
												<h5 class="widget-title">工厂日计划达成</h5>

												<!-- #section:custom/widget-box.toolbar -->
												<div class="widget-toolbar">
													<div class="widget-menu">
														<a href="#" data-action="settings" data-toggle="dropdown">
															<i class="ace-icon fa fa-bars"></i>
														</a>

														<ul class="dropdown-menu dropdown-menu-right dropdown-light-blue dropdown-caret dropdown-closer">
															<li>
																<a data-toggle="tab" href="#dropdown1">Option#1</a>
															</li>

															<li>
																<a data-toggle="tab" href="#dropdown2">Option#2</a>
															</li>
														</ul>
													</div>

													<a href="#" data-action="fullscreen" class="orange2">
														<i class="ace-icon fa fa-expand"></i>
													</a>

													<a href="#" data-action="reload">
														<i class="ace-icon fa fa-refresh"></i>
													</a>

													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>

													<a href="#" data-action="close">
														<i class="ace-icon fa fa-times"></i>
													</a>
												</div>

												<!-- /section:custom/widget-box.toolbar -->
											</div>

											<div class="widget-body">
												<div class="widget-main">
													<p class="alert alert-info">
														Nunc aliquam enim ut arcu aliquet adipiscing. Fusce dignissim volutpat justo non consectetur. Nulla fringilla eleifend consectetur.
													</p>
													<p class="alert alert-success">
														Raw denim you probably haven't heard of them jean shorts Austin.
													</p>
												</div>
											</div>
										</div>

										<!-- /section:custom/widget-box -->
									</div>
									
									<div class="col-xs-12 col-sm-6 widget-container-col ui-sortable">
										<!-- #section:custom/widget-box -->
										<div class="widget-box ui-sortable-handle">
											<div class="widget-header">
												<h5 class="widget-title">订单情况(事业部)</h5>

												<!-- #section:custom/widget-box.toolbar -->
												<div class="widget-toolbar">
													<div class="widget-menu">
														<a href="#" data-action="settings" data-toggle="dropdown">
															<i class="ace-icon fa fa-bars"></i>
														</a>

														<ul class="dropdown-menu dropdown-menu-right dropdown-light-blue dropdown-caret dropdown-closer">
															<li>
																<a data-toggle="tab" href="#dropdown1">Option#1</a>
															</li>

															<li>
																<a data-toggle="tab" href="#dropdown2">Option#2</a>
															</li>
														</ul>
													</div>

													<a href="#" data-action="fullscreen" class="orange2">
														<i class="ace-icon fa fa-expand"></i>
													</a>

													<a href="#" data-action="reload">
														<i class="ace-icon fa fa-refresh"></i>
													</a>

													<a href="#" data-action="collapse">
														<i class="ace-icon fa fa-chevron-up"></i>
													</a>

													<a href="#" data-action="close">
														<i class="ace-icon fa fa-times"></i>
													</a>
												</div>

												<!-- /section:custom/widget-box.toolbar -->
											</div>

											<div class="widget-body">
												<div class="widget-main">
													<p class="alert alert-info">
														Nunc aliquam enim ut arcu aliquet adipiscing. Fusce dignissim volutpat justo non consectetur. Nulla fringilla eleifend consectetur.
													</p>
													<p class="alert alert-success">
														Raw denim you probably haven't heard of them jean shorts Austin.
													</p>
												</div>
											</div>
										</div>

										<!-- /section:custom/widget-box -->
									</div>
						</div>
					
					
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	<script src="assets/js/jquery-ui.custom.min.js"></script>
	<script src="js/index.js"></script>
	
	</body>
</html>
