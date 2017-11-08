<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>计件工时统计</title>
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
						<li class="active">计件工时统计</li>
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
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td>
								<select name="" id="search_factory" class="input-medium" style="width:130px;"></select>
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
							<td style="text-align:right">小班组：</td>
							<td>
								<select name="" id="search_team" class="input-medium" style="width:100px;">
									<option value=''>全部</option>
								</select>
							</td>							
							<td style="text-align:right" >统计日期：</td>
							<td colspan=4>
								<input id="wdate_start" style="width:90px;height: 30px;" class="input-small" 
											onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{limitMonthDate(1);}',maxDate:'#F{$dp.$D(\'wdate_end\',{d:0})}'})" type="text">
								<span>-</span>
								<input id="wdate_end" style="width:90px;height: 30px;" class="input-small" 
											onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'wdate_start\',{d:0})}',maxDate:'#F{limitMonthDate(2);}'})" type="text">
							</td>
						</tr>
						<tr>
						<td style="text-align:right">车号：</td>
						<td >
							<input id="bus_number" style="width:130px;height: 30px;" class="input-medium" placeholder="车号" type="text">
						</td>
						<td style="text-align:right">订单：</td>
						<td >
							<input id="search_order_no" style="width:100px;height: 30px;" placeholder="订单编号" class="input-medium" type="text">
						</td>
						<td style="text-align:right" >姓名/工号：</td>
							<td >
								<input id="staff_number" class="input-medium" style="width:100px;height: 30px;" placeholder="姓名/工号" type="text">
							</td>
						<td>计资模式：</td>
						<td>
							<select name="" id="search_salary_model" class="input-medium" style="width:100px;">
								<option value="技能系数">技能系数</option>
								<option value="承包制">承包制</option>
								<option value="辅助人力">辅助人力</option>
								<option value="底薪模式">底薪模式</option>
								<option value="自制件承包">自制件承包</option>
							</select>
						</td>
						<td>统计维度：</td>
						<td>
							<select name="" id="search_count_flag" class="input-medium" style="width:100px;">
								<option value="车辆维度">车辆维度</option>
								<option value="人员维度">人员维度</option>
							</select>
						</td>
						<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 10px;top:1px;" type="button">							
						</td>
						<td id="count_info" style='color:blue;padding-left: 20px;text-align:center'></td>
						</tr>
						</table>
					</form>

					<div class="row">
						<div class="col-xs-12" style="width: calc(100vw + 20px)">
							<!-- <div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
				            	<span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
				        	</div>	 -->					
							
							<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow-x:auto;width:1600px;table-layout:fixed;white-space: normal;word-break:break-all; ">
						</table>
						</div>
					</div>
				</div>
			</div>
			<!-- /.main-container -->
		</div>
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
		<script src="../assets/js/ace/elements.onpage-help.js"></script>
		<script src="../assets/js/ace/ace.onpage-help.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/exportTable2Excel.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/hr/pieceTimeReport.js"></script>
</body>

</html>
