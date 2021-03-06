<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet"
	href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">

label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}
</style>
<jsp:include page="../common.jsp"></jsp:include>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<%-- <jsp:include page="../top.jsp" flush="true" /> --%>
	<!-- 身 -->
	<div class="main-container" id="main-container" style="height:100%">
		<!-- 左边菜单 -->
		<%-- <jsp:include page="../left.jsp" flush="true" /> --%>
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
				<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb" style="font-size:14px;">
					<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
						<li><a href="#">生产异常</a></li>
					</ul>
					<!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">
						<i id="btn_clear" class="ace-icon fa fa-refresh  red bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer"></i>
					</div>
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<form class="form-horizontal" id="scan_form">
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">车号:</label>
							<div class="col-xs-9">
								<!-- <input id="vinText"  type="text" class="input-medium" style="width:100%;height:30px;"/> -->
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="vinText" type="text" class="input-medium" style="width:100%;height:30px;">
										<i id="btn_scan" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>
								</span>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">工厂:</label>
							<div class="col-xs-9">
								<select id="exec_factory" class="input-medium" style="width:100%" >
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">车间:</label>
							<div class="col-xs-9">
								<select id="exec_workshop" class="input-medium" style="width:100%">
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">线别:</label>
							<div class="col-xs-9">
								<select id="exec_line" class="input-medium" style="width:100%">
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right" style="text-align:right">工序:</label>
							<div class="col-xs-9">
								<select id="exec_process" class="input-medium" style="width:40%">
									<!-- <option value=''>请选择</option> -->
								</select>
								<span id="exec_processname"></span>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">异常类别:</label>
							<div class="col-xs-9">
								<select id="reason_type" class="input-medium" style="width:100%">
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group" id="lack_reason_div">
							<label class="col-xs-3 control-label no-padding-right">缺料原因:</label>
							<div class="col-xs-9">
								<select id="lack_reason" class="input-medium" style="width:100%">
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">严重等级:</label>
							<div class="col-xs-9">
								<select id="severity_level" class="input-medium" style="width:100%">
									<option value="0">不影响</option>
									<option value="1">普通</option>
									<option value="2">严重</option>
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">开始时间:</label>
							<div class="col-xs-9">
								<input class="input-medium" style="width:100%;height:30px;" placeholder="选择开始时间..." id="start_time" onclick="WdatePicker({el:'start_time',dateFmt:'yyyy-MM-dd HH:mm'});" type="text">
							</div>
						</div>		
									
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">详细原因:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="detailed_reasons" rows="2" style="width:100%;"></textarea>
							</div>
						</div>			
					</form>
				</div>
			<!-- /.main-container -->
		</div>
		
		<script src="../js/datePicker/WdatePicker.js"></script>		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/production/productionException_Mobile.js"></script>
</div>
</body>
</html>