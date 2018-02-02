<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>个人中心</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
<!-- 			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">设置</a></li>
						<li class="active">个人中心</li>
					</ul>
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->
				
					<div class="profile-user-info profile-user-info-striped">
						<div class="profile-info-row">
							<div class="profile-info-name"> 姓名： </div>
							<div class="profile-info-value">
								<input id="username" disabled="disabled" placeholder="姓名" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 工厂： </div>
							<div class="profile-info-value">
								<input id="factory_name" disabled="disabled" placeholder="工厂" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 工号： </div>
							<div class="profile-info-value">
								<input id="staff_number" disabled="disabled" placeholder="工号" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 厂牌芯片号： </div>
							<div class="profile-info-value">
								<input id="card_8H10D" disabled="disabled" placeholder="厂牌芯片号" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 邮箱地址： </div>
							<div class="profile-info-value">
								<input id="email" placeholder="邮箱地址" style="width:240px" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 电话号码： </div>
							<div class="profile-info-value">
								<input id="telephone" placeholder="电话号码" style="width:240px" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 手机号码： </div>
							<div class="profile-info-value">
								<input id="cellphone" placeholder="手机号码" style="width:240px" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 登录次数： </div>
							<div class="profile-info-value">
								<input id="login_count" disabled="disabled" placeholder="登录次数" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> 最后登录时间： </div>
							<div class="profile-info-value">
								<input id="last_login_time" disabled="disabled" placeholder="最后登录时间" style="width:240px;background-color:gainsboro" type="text">
							</div>
						</div>
						
						<div class="profile-info-row">
							<div class="profile-info-name"></div>

							<div class="profile-info-value">
								<input id="btnEditInfo" type="button" class="btn btn-sm btn-success" value="更新个人信息"></input>
								<input id="btnEditPassword" type="button" class="btn btn-sm btn-info" value="修改登录密码"></input>
							</div>
						</div>
					</div>
			
			<div id="dialog-edit" class="hide" style="width:800px;height:500px">
				<fieldset>
					<div class="form-group form-horizontal">
						<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 原密码： </label>
						<div class="col-sm-9"><input id="old_password" placeholder="原密码" class="col-sm-9" type="password"></div>
					</div>
				</fieldset><br/>
				<fieldset>
					<div class="form-group form-horizontal">
						<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 新密码： </label>
						<div class="col-sm-9"><input id="new_password" placeholder="新密码" class="col-sm-9" type="password"></div>
					</div>
				</fieldset><br/>
				<fieldset>
					<div class="form-group form-horizontal">
						<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 确认新密码： </label>
						<div class="col-sm-9"><input id="new_password2" placeholder="请重复输入新密码" class="col-sm-9" type="password"></div>
					</div>
				</fieldset>
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/setting/userProfilePage.js"></script>
</html>
