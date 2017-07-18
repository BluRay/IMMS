<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>员工库</title>
		<link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css">
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						<li><a href="#">计件工资</a></li>
						<li class="active">员工库</li>
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
				<div class="row">
					<div class="col-xs-12">
						<div class="row">
							<div class="col-sm-3">
								<div id="div_tree1" class="widget-box widget-color-blue2" style="height:350px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">组织结构&nbsp;&nbsp;&nbsp;&nbsp;</h4>
										
									</div>

									<div class="widget-body">
										<div class="widget-main padding-8">
											<div id="tree1" class="tree"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-9">
								<div id="div_tree2" class="widget-box widget-color-blue2" style="height:350px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">员工信息&nbsp;&nbsp;&nbsp;&nbsp;</h4>
										
									</div>
									<div class="well">
										<table>
											<tr>
												<td>工号/姓名：</td>
												<td colspan=3><input id="search_staff_number" style="height: 30px;width:100%" placeholder="请输入工号/姓名..." class="col-sm-10" type="text"></td>
												<td align="right">&nbsp;员工级别：</td>
												<td><input id="search_staff_level" style="height:30px;width:120px" placeholder="如F3" class="col-sm-6" type="text"></td>
												<td>&nbsp;计资方式：</td>
												<td><select style="width:80px;height:30px;" name="search_salary_type" id="salary_type" class="input-small carSeries">
												<option value="">全部</option><option value="计时">计时</option><option value="计件" >计件</option>
												</select></td>
												<td></td><td></td>
											</tr>
											<tr>
												<td>工作地点：</td>
												<td><input id="search_workplace" style="height: 30px;" placeholder="工作地点..." class="col-sm-10" type="text"></td>
												<td>&nbsp;岗位：</td>
												<td><select id="search_job_type" style='width:80px;height: 30px;' class="input-small carSeries">
													<option value="">全部</option><option value="0">管理类</option><option value="1">技术专家</option><option value="2">技能型</option><option value="3">操作型</option>
												</select></td>
												<td><input id="search_job"  style="height: 30px; width:100px;" type="text" class="input-medium revise" placeholder="岗位名称" />
												<select id="search_stauts"><option value="在职">在职</option><option value="离职">离职</option></select>
												</td>
												<td align="right"><input type="button" class="btn btn-sm btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;
												<input type="button" class="btn btn-sm btn-warning" id="btnDimission" value="离职" style="margin-left: 2px;"></input></td>
												<td>&nbsp;<input id="btnBulkAdd" class="btn btn-sm btn-info" value="批量导入" type="button">&nbsp;</td>
												
											</tr>
										</table>
									</div>
									
									<div id="divBulkAdd" class="well" style="display:none;">
									<button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
										<form id="uploadMasterPlanForm" action="#" enctype="multipart/form-data" method="post">
										<table>
											<tr>
												<td><input id="file" type="file" name="file" accept="*.xlsx"/></td>
												<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/></td>
												<td></td><td><a href="../docs/masterPlan.xls">下载批导模板</a></td>
											</tr>
										</table>
										</form>
									</div>
									
									<div id="toolbar"></div>
									<table  style="font-weight:normal;width:3000px;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
								           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
								           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
								           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
								           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
								    </table>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- /.main-content -->
			
			<div id="dialog-confirm" class="hide" style="width:800px;height:500px">
				<form>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 工号： </label>
							<div class="col-sm-9"><input id="edit_staff_number" placeholder="请输入工号后回车..." style="width:270px" class="col-sm-9" type="text"></div>

						</div>
					</fieldset>
					<fieldset>
						<div style="margin-top:10px" class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 姓名： </label>
							<div class="col-sm-3"><input id="edit_name" placeholder="姓名" style="width:100px" disabled="disabled" type="text"></div>
							<label style="width:60px" for="form-field-1"> 性别： </label>
							<input id="edit_sex" placeholder="性别" style="width:100px" disabled="disabled" type="text">
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 工厂： </label>
							<div class="col-sm-3"><input id="edit_plant_org" placeholder="工厂" style="width:100px" disabled="disabled" type="text"></div>
							<label style="width:60px" for="form-field-1"> 车间： </label>
							<input id="edit_workshop_org" placeholder="车间" style="width:100px" disabled="disabled" type="text">
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 班组： </label>
							<div class="col-sm-3"><input id="edit_workgroup_org" placeholder="班组" style="width:100px" disabled="disabled" type="text"></div>
							<label style="width:60px" for="form-field-1"> 小班组： </label>
							<input id="edit_team_org" placeholder="小班组" style="width:100px" disabled="disabled" type="text">
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 岗位： </label>
							<div class="col-sm-3"><input id="edit_job" placeholder="岗位" style="width:100px" disabled="disabled" type="text"></div>
						</div>
					</fieldset>
					
				</form>
			
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script>
		var $table = $('#table'),$remove = $('#remove'),selections = [];
	</script>
	<style type="text/css">
	.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
		position: absolute;
		margin-top: 102px;
		right: 12px;
		top: -99px;
	}
	.btn-default {
		color: #333;
		background-color: #fff;
		border-color: #ccc;
		height: 40px;
		color: #fff;
		background-color: #333;
	}
	
</style>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script src="../js/hr/staffManager.js"></script>
</html>
