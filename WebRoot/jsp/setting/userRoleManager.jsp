<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS 设置 帐号授权</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">系统设置</a></li>
						<li class="active">帐号授权</li>
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
				<div class="row">
					<div class="col-xs-12">
						<div class="row">
							<div class="col-sm-4">
								<div id="div_tree1" class="widget-box widget-color-blue2" style="height:350px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">选择用户&nbsp;&nbsp;&nbsp;&nbsp;</h4>
									</div>
									<div class="widget-body">
										<input id="search_key" type="text" placeholder="Search ..." style="margin-top:1px;margin-left:1px;width:100px"/>
										<button id="btn_search_user" style="margin-top:-2px" class="btn btn-sm btn-purple">查询</button>
										<button id="btn_save" style="margin-top:-2px" class="btn btn-sm btn-success">保存</button>
										<div class="widget-main padding-8">
											<div id="tree1" class="tree"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div id="div_tree2" class="widget-box widget-color-blue2" style="height:350px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">选择角色&nbsp;&nbsp;&nbsp;&nbsp;</h4>
									</div>
									<div class="widget-body">
										<div class="widget-main padding-8">
											<div id="tree2" class="tree"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div id="div_tree3" class="widget-box widget-color-green2" style="height:350px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">查看程序权限 <span id="role_name2"></span></h4>
									</div>
									<div class="widget-body">
										<div class="widget-main padding-8">
											<div id="tree3" class="tree"></div>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						
						<div class="row">
							<div class="col-sm-12">
								<div id="div_3" class="widget-box widget-color-blue2" style="height:180px">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">数据权限配置 <span id="role_name"></span></h4>
									</div>
									<div class="widget-body">
										<div class="widget-main padding-8">
										<table>
											<tr>
												<td width="100px">权限对象:</td><td width="510px">对象值:</td>
											</tr>
											<tr>
												<td><input disabled="disabled" type="text" value="工厂权限" style="width:80px"/></td>
												<td><input id="permission_1" type="text" placeholder="工厂权限值...." style="width:500px"/></td>
											</tr>
											<tr>
												<td><input disabled="disabled" type="text" value="车间权限" style="width:80px"/></td>
												<td><input id="permission_2" type="text" placeholder="车间权限值...." style="width:500px"/></td>
											</tr>
											<tr>
												<td><input disabled="disabled" type="text" value="线别权限" style="width:80px"/></td>
												<td><input id="permission_3" type="text" placeholder="线别权限值...." style="width:500px"/></td>
											</tr>
										</table>										
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
	<script src="../js/setting/userRoleManager.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	</body>
</html>
