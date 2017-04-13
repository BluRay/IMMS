<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS 设置 用户管理</title>
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
		<div id="div_row" class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="../left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index">首页</a></li>
						<li><a href="#">设置</a></li>
						<li class="active">用户管理</li>
					</ul>

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
					<jsp:include page="../settings.jsp" flush="true"/>
					<!-- /section:settings.box -->
					<div class="page-content-area">
					
					<div class="well">
						<table>
							<tr>
								<td>关键字：</td>
								<td><input id="search_key" placeholder="工号/姓名/电话..." class="col-sm-10" type="text"></td>
								<td>&nbsp;<input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询"></input>&nbsp;</td>
								<td>&nbsp;<input id="btnAdd" type="button" class="btn btn-sm btn-info" value="新增用户">&nbsp;</td>
							</tr>
						</table>
					</div>
					
					<table id="data_table" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th>序号</th>
								<th>工号</th>
								<th>姓名</th>
								<th>电子邮件</th>
								<th>手机号码</th>
								<th>办公电话</th>
								<th>所属工厂</th>
								<th>所属部门</th>
								<th>是否管理员</th>
								<th>访问次数</th>
								<th>最后登录</th>
								<th>操作</th>
							</tr>
						</thead>

						<tbody>
						</tbody>
					</table>
					
					</div>
			</div><!-- /.main-content -->

			<div id="dialog-confirm" class="hide" style="width:800px;height:500px">
				<form>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 姓名： </label>
							<div class="col-sm-9"><input id="new_username" placeholder="姓名" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 工号： </label>
							<div class="col-sm-9"><input id="new_staff_number" placeholder="工号" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 邮箱地址： </label>
							<div class="col-sm-9"><input id="new_email" placeholder="邮箱地址" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 手机号码： </label>
							<div class="col-sm-9"><input id="new_cellphone" placeholder="手机号码" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 办公电话： </label>
							<div class="col-sm-9"><input id="new_telephone" placeholder="办公电话" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 所属工厂： </label>
							<div class="col-sm-9"><input id="new_factory_id" placeholder="所属工厂" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 所属部门： </label>
							<div class="col-sm-9"><input id="new_department_id" placeholder="所属部门" class="col-sm-9" type="text"></div>
						</div>
					</fieldset>
					<fieldset style ="padding-top:4px">
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 用户类型： </label>
							<div class="col-sm-9">
								<select id="new_admin" class="col-sm-9" id="form-field-select-1">
									<option value="0">普通用户</option>
									<option value="1">系统管理员</option>
								</select>
							</div>
						</div>
					</fieldset>
	
					<div class="form-actions center">
						<button id="btn_ok" type="button" class="btn btn-success" role="button"><span class="ui-button-text"><i class="ace-icon glyphicon glyphicon-ok"></i>&nbsp; 增加</span></button>
					<button id="btn_cancel" type="button" class="btn" role="button"><span class="ui-button-text"><i class="ace-icon glyphicon glyphicon-remove"></i>&nbsp; 取消</span></button>
					</div>
				</form>

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
	<script src="../js/setting/userManager.js"></script>
</html>