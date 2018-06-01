<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>售后问题报表</title>
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
<!-- 			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">报表</a></li>
						<li class="active">制程问题严重等级分布报表</li>
					</ul>
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->
				
					<div class="well">
						<table>
							<tr>
								<td>维度：</td>
								<td><select id="report_type"><option value="1">工厂维度</option><option value="2">区域维度</option><option value="3">车型维度</option><option value="4">订单维度</option></select></td>
								<td>日期：</td>
								<td><input id="start_date" placeholder="开始时间..." style="height: 30px;width:125px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"> - <input id="end_date" placeholder="结束时间..." style="height: 30px;width:125px" type="text" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});"></td>
								<td colspan='3' style="padding-left:5px;width:280px">
								<label><input type="radio" name="xx" class="radio" id="week" checked="checked" value="W" style="margin-left: 2px;"/>本周</label>
								<label><input type="radio" name="xx" class="radio" id="month" value="M" style="margin-left: 2px;"/>本月</label>
								<label><input type="radio" name="xx" class="radio" id="season" value="S" style="margin-left: 2px;"/>本季</label>
								<label><input type="radio" name="xx" class="radio" id="year" value="Y" style="margin-left: 2px;"/>本年</label>
								</td>
								
								<td>&nbsp;<input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></td>
								<td></td>
							</tr>
						</table>
					</div>
					
					<div class="widget-main"  id="chartsContainer" style="min-width: 1000px; max-width: 500px; margin: auto;height: 400px;"></div>
					<table align="center" id="tableData"  class="table table-striped table-bordered table-hover" style="algin:center;width:80%;font-size: 12px;">
					<thead>
						<tr>
						<th style="text-align:center;width:100px">序号</th><th style="text-align:center"><span id="th_title">工厂维度</span></th><th style="text-align:center">故障数量</th><th style="text-align:center">故障比例</th>
						</tr>
					</thead>
					<tbody></tbody>
					</table>
					<table id="charts_table" style="width:100%;height:430px">
					<tr>
					<td style="width:50%"><div class="widget-main"  id="chartsContainer_1" style=""></div></td>
					<td style="width:50%"><div class="widget-main"  id="chartsContainer_2" style=""></div></td>
					</tr>
					</table>
					<table id="tableOrder" class="table table-striped table-bordered table-hover" style="font-size: 12px;width:100%;overflow-x:auto;padding-right: 20px;table-layout:fixed">
					</table>
					
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/highcharts.js"></script>
	<script type="text/javascript" src="../js/exporting.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script type="text/javascript" src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script type="text/javascript" src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="../assets/js/dataTables.rowGroup.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/quality/processFaultReport.js"></script>
</html>
