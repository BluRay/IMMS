<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS 车型</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
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
<!-- 			<div class="breadcrumbs ace-save-state" id="breadcrumbs">
				<ul class="breadcrumb">
					<li><i class="ace-icon fa fa-home home-icon"></i><a
						href="/BMS/index">首页</a></li>
					<li><a href="#">系统设置</a></li>
					<li class="active">车型</li>
				</ul>
				<div class="nav-search" id="nav-search">
					<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
					</form>
				</div>
			</div> -->

				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>车型编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入车型编号..." value=""
								id="search_busTypeCode" /></td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
								<button id='btnAdd' class="btn btn-sm btn-success">新增</button></td>
						</tr>
					</table>
				</div>

				<div class="row"  >
					<div class="col-xs-12"  style="width:100%">
						<table id="tableData" 
							class="table table-striped table-bordered table-hover"
							style="font-size: 12px; width:100%;" >
						</table>
					</div>
				</div>

			<div id="dialog-edit" class="hide">
				<form id="" class="form-horizontal">
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;车型编号</label>
							<div style="float:left;width:70%" class="col-sm-8">
							    <input type="hidden" id="editId" />
								<input type="text" class="input-medium" id="edit_busTypeCode" />
							</div>
						</div>
						<div  style="float:left;width:55%">
							<label style="float:left;width:40%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;内部名称(车系)</label>
							<div style="float:left;width:60%" class="col-sm-8">
								<select name="" id="edit_internalName" class="input-medium"></select>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newBrand">&nbsp;平台车型</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" placeholder="平台..." id="edit_bus_series" />
							</div>
						</div>

					</div>

				</form>
			</div> 
			
 			<div id="dialog_add" class="hide" >
				<form id="" class="form-horizontal">
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;车型编号</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" placeholder="车辆型号..." id="add_busTypeCode" />
							</div>
						</div>
						<div  style="float:left;width:55%">
							<label style="float:left;width:40%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;内部名称(车系)</label>
							<div style="float:left;width:60%" class="col-sm-8">
								<select name="" id="add_internalName" class="input-medium"></select>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newBrand">&nbsp;平台车型</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="add_bus_series" placeholder="平台..." id="add_internalName"   />
							</div>
						</div>

					</div>

				</form>
			</div> 
			
		</div>
	</div>	
		<!-- /.main-container -->
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/setting/busType.js"></script>
</body>

</html>
