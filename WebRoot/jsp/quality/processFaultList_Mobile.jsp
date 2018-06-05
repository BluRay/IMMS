<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
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
						<li><a href="#">售后问题查询</a></li>
					</ul>
					<!-- /.breadcrumb -->
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<form class="form-horizontal" id="scan_form">
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">VIN号:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="search_vin" type="text" class="input-medium" style="width:100%;height:30px;">
										<i id="btn_scan" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>
								</span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">销售地区:</label>
							<div class="col-xs-9">
								<select id="search_area" class="form-control" style="width:100%"></select>
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">反馈日期:</label>
							<div class="col-xs-9">
								<input id="search_fault_date_start" class="input-medium" style="width:45%;height:30px;" placeholder="选择反馈日期..." onclick="WdatePicker({el:'search_fault_date_start',dateFmt:'yyyy-MM-dd',onpicked:function(){ajaxQuery();}});" type="text">
								- <input id="search_fault_date_end" class="input-medium" style="width:45%;height:30px;" placeholder="选择反馈日期..." onclick="WdatePicker({el:'search_fault_date_end',dateFmt:'yyyy-MM-dd',onpicked:function(){ajaxQuery();}});" type="text">
							</div>
						</div>	
						
						
					</form>
					<div style="width:100%;height:320px;overflow-y:auto;overflow-x:hidden">				
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;width:100%;text-align:center;">
						</table>
					</div>
				</div>
			<!-- /.main-container -->
		</div>
		<script src="../assets/js/jquery.min.js"></script>
		<script src="../js/datePicker/WdatePicker.js"></script>		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/quality/processFaultList_Mobile.js"></script>
</div>
</body>
</html>