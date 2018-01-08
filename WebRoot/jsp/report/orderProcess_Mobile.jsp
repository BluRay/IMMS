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
						<li><a href="/BMS/report/reportIndexMobile">报表</a></li>
					</ul>
					<!-- /.breadcrumb 
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">
						<i id="btn_clear" class="ace-icon fa fa-refresh  red bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer"></i>
					</div> -->
				</div>

				<div class="page-content" style="position:fixed;width:100%;padding-left: 5px;padding-right:5px;font-size: 12px;">
					<div class="page-content-area" style="width: 100%;">
						<form id="search_form" class="well form-search">
							<table style="line-height:1.7">
							<tr>
								<td style="text-align:right">工厂：</td>
								<td><select name="" id="factory" class="input-medium" style="width:90px;"></select></td>							
								<td>
									<select id="status" class="input-small" style="height: 30px;width:80px">
										<option value="0">未开始</option>
										<option value="1" selected>生产中</option>
										<option value="2">已完成</option>
									</select>
								</td>
								<td>
									<input type="text" id="prod_year" onclick="WdatePicker({el:'prod_year',dateFmt:'yyyy',enableKeyboard:false});" class="input-small" style="height: 30px;width:60px"/>
								</td>								
							</tr>						
							</table>
						</form>
					</div>
					<div id="order_process" style="width:100%;height:300px;overflow-y:auto;overflow-x:hidden">				
					
					</div>
			
			<!-- /.main-container -->
		</div>
		</div>
		<script src="../js/datePicker/WdatePicker.js"></script>		
		<script src="assets/js/jquery.easypiechart.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/report/orderProcess_Mobile.js"></script>
</div>
</body>
</html>