<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>标准人力</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet"
	href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet"
	href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../css/zTreeStyle/metro.css"
	type="text/css">
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
			<!-- 路径和搜索框 -->
<!-- 				<div class="breadcrumbs ace-save-state" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a
							href="/BMS/index">首页</a></li>
						<li><a href="#">计件工资</a></li>
						<li><a href="#">标准人力</a></li>
					</ul>
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->

				<div class="row">
					<div class="col-xs-12">
						<div class="row">
							<div class="col-sm-3">
								<div id="div_tree1" class="widget-box widget-color-blue2" style="height:520px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">组织结构&nbsp;&nbsp;&nbsp;&nbsp;</h4>
									</div>
									<div class="widget-body">
										<div class="widget-main padding-8">
											<ul id="workGroupTree" class="ztree" style="padding-left:0px;"></ul>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-9">
							<div id="div_tree2" class="widget-box widget-color-blue2" style="height:520px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
								<div class="widget-header">
									<h4 class="widget-title lighter smaller node">&nbsp;</h4>
<!-- 									<a class="dt-button buttons-excel buttons-html5 black" tabindex="0" aria-controls="tableData" href="#"> -->
									
<!-- 									<button id="btn_delete" style="float:right;margin-top:2px" class="btn btn-sm btn-purple">导出</button>&nbsp;&nbsp; -->
<!-- 									</a> btnBulkAdd-->
<!-- 									<button id="btnQuery" style="float:right;margin-top:2px;margin-right:2px" class="btn btn-sm btn-success">查询</button> -->
								    
								</div>
								<div id="divBulkAdd" class="well" >  <!-- style="display:none;" -->
<!-- 								    <button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button> -->
									<form id="uploadForm" action="#" enctype="multipart/form-data" method="post">
									<table>
										<tr>
										    <td>车型：</td>
											<td><select id="add_bus_type" name="bus_type" style="height:30px;width:100px"></select></td>
<!--                                             <td>产能：</td>											 -->
<!--                                             <td><input id="add_capacity" name="capacity" style="height:30px;width:100px" type="text"/></td> -->
											<td><button id="btnQuery" style="margin-top:2px;margin-left:5px;margin-right:5px" class="btn btn-sm btn-success">查询</button></td>
											<td style="width:20px"></td>
											<td style="width:200px"><input id="file" type="file" name="file" accept="*.xls"/></td>
											<td>&nbsp;&nbsp;<input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入"/></td>
											<td></td><td>&nbsp;&nbsp;<a href="../docs/standardHuman.xls">下载批导模板</a></td>
										</tr>
									</table>
									</form>
								</div>
								<div class="widget-body">
									<div class="widget-main padding-8">
									<div class="form-group">
									    <table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow:auto"></table>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/ztree/jquery.ztree.core-3.5.min.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/hr/standardHuman.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
</body>

</html>
