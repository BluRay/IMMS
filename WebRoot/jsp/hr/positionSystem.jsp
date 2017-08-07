<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS 标准岗位库</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						href="<%=request.getContextPath()%>/index">首页</a></li>
					<li><a href="#">计件工资</a></li>
					<li><a href="#">基础数据</a></li>
					<li class="active">标准岗位库</li>
				</ul>
				<!-- /.breadcrumb -->

				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<span class="input-icon"> <input type="text"
							placeholder="Search ..." class="nav-search-input"
							id="nav-search-input" autocomplete="off" /><i
							class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</form>
				</div>
				<!-- /.nav-search -->
			</div>

			<div class="page-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>岗位编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="岗位编号..." value=""
								id="search_job_no" /></td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
								<button id='btnBulkAdd' class="btn btn-sm btn-success">导入</button>
								<button id='btnDelete' class="btn btn-sm btn-delete">删除</button>
							</td>
						</tr>
					</table>
				</div>
                <div id="divBulkAdd" class="well" style="display:none;">
				    <button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
					<form id="uploadMasterPlanForm" action="#" enctype="multipart/form-data" method="post">
					<table>
						<tr>
							<td><input id="file" type="file" name="file" accept="*.xls"/></td>
							<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/></td>
							<td></td><td><a href="../docs/positionSystem.xls">下载批导模板</a></td>
						</tr>
					</table>
					</form>
				</div>
				<div class="row"  >
					<div class="col-xs-12"  style="width:100%">
						<table id="tableData" 
							class="table table-striped table-bordered table-hover"
							style="font-size: 12px;overflow:auto;table-layout:fixed" >
						</table>
					</div>
				</div>
			</div>

			<div id="dialog-edit" class="hide">
				<form id="" class="form-horizontal">
				    <input type="hidden" id="editId">
					<div class="form-group">
					    <div>
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;岗位编号</label>
							<div class="col-sm-8">
							    <input type="hidden" id="editId" />
								<input type="text" class="input-medium" id="edit_job_no" />
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div>
							<label  class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;岗位名称</label>
							<div class="col-sm-8">
								<input type="text" class="input-medium" id="edit_job_name" />
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div>
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newBrand">*&nbsp;基本职责</label>
							<div class="col-sm-8">
								<textarea class="input-medium" id="edit_basic_besponsibilit" style="width: 355px" rows="3"></textarea>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div>
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newManufacturer">*&nbsp;任职资格	</label>
							<div class="col-sm-8">
								<textarea class="input-medium" id="edit_requirements" style="width: 355px" rows="3"></textarea>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div>
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newVehicleModel">*&nbsp;具备技能</label>
							<div class="col-sm-8">
								<textarea class="input-medium" id="edit_skill_and_capability" style="width: 355px" rows="3"></textarea>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div>
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newDriveMotor">*&nbsp;上岗所需培训</label>
							<div class="col-sm-8">
								<textarea class="input-medium" id="edit_required_train" style="width: 355px" rows="3"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>	
		<!-- /.main-container -->
	</div>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	
	 <script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../assets/js/buttons.flash.js"></script> 
	
	<script src="../js/jquery.form.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/hr/positionSystem.js"></script>
	
</body>

</html>
