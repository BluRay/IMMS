<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>供应商报价导入</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 

</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
				<div class="breadcrumbs ace-save-state" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a
							href="/BMS/index">首页</a></li>
						<li><a href="#">计件工资</a></li>
						<li><a href="#">基础数据</a></li>
						<li><a href="#">供应商报价导入</a></li>
					</ul>
					<!-- /.breadcrumb -->

					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
					<!-- /.nav-search -->
				</div>

				<div class="page-content">
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>供应商名称：</td>
								<td>
									<input style="height: 30px;width:180px;" type="text" class="input-medium revise" placeholder="供应商名称..." id="search_supplier" />
								</td>
 								<td>车间：</td>
								<td><select id="search_workshop" class="input-small"> <option value="">全部</option></select></td> 	
								<td>班组：</td>
								<td><select id="search_workgroup" class="input-medium"> <option value="">全部</option> </select></td> 					
								<td>
									<input type="button" class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>						
									<input type="button" class="btn btn-sm btn-danger" id="btnDelete" value="删除" style="margin-left: 2px;"></input>	
									<input type="button" class="btn btn-sm btn-success" id="btnImport" value="导入" style="margin-left: 2px;"></input>
								</td>
							</tr>

						</table>
					</form>
						
					<div class="row">
					<div class="col-xs-12" >
						<table id="tableResult" class="table table-striped table-bordered table-hover " style="font-size: 12px;overflow-x:auto" >
						</table>	
					</div>
					</div>
				</div>

			<div id="dialog-config" class="hide">
				<div id="create_form" class="form-horizontal">					
					<div class="form-group">					
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">*&nbsp;供应商：</label>
						<div class="col-sm-9">
							<form id="uploadForm" action="" enctype="multipart/form-data" method="post">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xls" type="file"> 				
								</div>
								<div class="col-sm-6">
									<input id="btn_upload" style="padding:0px 0px;font-size: 12px;height:35px" class="btn btn-primary" value="上传并导入" onclick="javascript:return upload(this.form, this.form.file.value)" type="button"> 
									<a href="../docs/supplierListTpl.xlsl.xls">下载导入模板</a>
								</div>							
							</form>
						</div>									
					</div>
					<div class="form-group">					
						<div class="col-sm-12" style="width:100%">			
							<table class="table table-striped table-bordered table-hover" style="font-size:12px;" id="uploadTable">
							</table>
						</div>
					</div>
					
			</div>
		</div>
		
		</div>
			<!-- /.main-container -->
		</div>
	
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
    <script src="../assets/js/buttons.html5.js"></script>
    <script src="../assets/js/jszip.min.js"></script>
	<script src="../js/jquery.form.js"></script>	
	<script src="../js/common.js"></script>
	<script src="../js/hr/supplierPriceData.js"></script>
</body>

</html>
