<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>等待工时统计</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<!-- <link rel="stylesheet" href="../css/bootstrap.3.2.css">	 -->
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<!-- <link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css"> -->
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 

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
						<li class="active">等待工时统计</li>
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
				<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td>
								<select name="" id="search_factory" class="input-medium" style="width:100px;"></select>
							</td>
							<td style="text-align:right">车间：</td>
							<td>
								<select name="" id="search_workshop" class="input-medium" style="width:100px;"></select>
							</td>
							<td style="text-align:right">班组：</td>
							<td>
								<select name="" id="search_workgroup" class="input-medium" style="width:100px;">
									<option value=''>全部</option>
								</select>
							</td>
							
<!-- 						</tr> -->
<!-- 						<tr> -->
						    <td style="text-align:right">小班组：</td>
							<td>
								<select name="" id="search_team" class="input-medium" style="width:100px;">
									<option value=''>全部</option>
								</select>
							</td>							
							
						<td style="text-align:right" >姓名/工号：</td>
							<td >
								<input id="staff_number" class="input-medium" style="width:100px;height: 30px;" placeholder="姓名/工号" type="text">
							</td>
						<td style="text-align:right" >统计月份：</td>
						<td>
							<input type="text" id="waitmanhourdate" class="input-medium"style="width:100px;height: 30px;" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
						</td>
						<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 10px;top:1px;" type="button">							
						</td>
						</tr>
						</table>
					</form>
					<div class="row">
						<div class="col-xs-12" style="width: calc(100vw + 20px)">
							<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow-x:auto;width:1150px;table-layout:fixed">
							</table>
						</div>
					</div>
			</div><!-- /.main-content -->

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	    <script>
			var $table = $('#table'),$remove = $('#remove'),selections = [];
		</script>
	    <script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/dataTables.rowGroup.js"></script>
		<script src="../assets/js/dataTables.rowGroup.min.js"></script>
		<script src="../assets/js/ace/elements.onpage-help.js"></script>
		<script src="../assets/js/ace/ace.onpage-help.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/hr/waitReport.js"></script>
	</body>
</html>