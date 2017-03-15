<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS 设置 角色管理</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<jsp:include page="../top.jsp" flush="true"/>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="../left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index">首页</a></li>
						<li><a href="#">设置</a></li>
						<li class="active">角色管理</li>
					</ul><!-- /.breadcrumb -->

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
					<!-- /section:settings.box -->
					
					<div class="row">
						<div class="col-xs-12">
							<div class="row">
								<div class="col-sm-4">
									<div class="widget-box widget-color-blue2" style="height:350px">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller">选择用户角色</h4>
											<button class="btn btn-xs btn-danger">增加</button>
											<button class="btn btn-xs btn-danger">保存</button>
										</div>

										<div class="widget-body">
											<div class="widget-main padding-8">
												<div id="tree1" class="tree"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="widget-box widget-color-green2" style="height:350px">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller">角色权限信息</h4>
										</div>

										<div class="widget-body">
											<div class="widget-main padding-8">
											<div id="tree2" class="tree"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-sm-12">
									<div class="widget-box widget-color-blue2" style="height:150px">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller">角色内容配置</h4>
										</div>

										<div class="widget-body">
											<div class="widget-main padding-8">
											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>							
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
		<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
		<script src="../js/setting/roleManager.js"></script>
	</body>
</html>
