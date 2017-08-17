<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>额外工时统计</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
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
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">计件工资</a></li>
						<li class="active">额外工时统计</li>
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
					<!-- /section:settings.box -->
					<div class="page-content-area">
					
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td><select name="" id="search_factory" class="input-medium" style="width:120px;"></select></td>
							<td style="text-align:right">&nbsp;车间：</td>
							<td><select name="" id="search_workshop" class="input-medium" style="width:100px;"></select></td>
							<td style="text-align:right">&nbsp;班组：</td>
							<td>
								<select name="" id="search_workgroup" class="input-medium" style="width:100px;"><option value=''>全部</option></select>
							</td>
							<td style="text-align:right">&nbsp;小班组：</td>
							<td>
								<select name="" id="search_team" class="input-medium" style="width:100px;"><option value=''>全部</option></select>
							</td>							
							<td style="text-align:right" >&nbsp;统计日期：</td>
							<td colspan=3>
								<input id="wdate_start" style="width:90px;height: 30px;" placeholder="开始日期" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{limitMonthDate(1);}',maxDate:'#F{$dp.$D(\'wdate_end\',{d:0})}'})" type="text">
								<span>-</span>
								<input id="wdate_end" style="width:90px;height: 30px;" placeholder="结束日期" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'wdate_start\',{d:0})}',maxDate:'#F{limitMonthDate(2);}'})" type="text">
							</td>
							<td></td>
						</tr>
						<tr>
						<td style="text-align:right">工号/姓名：</td>
						<td ><input id="search_staff" style="width:120px;height: 30px;" class="input-medium" placeholder="工号/姓名" type="text"></td>
						<td colspan='2' style="text-align:right">派工流水号/作业内容：</td>
						<td colspan='2'><input id="search_task" style="width:143px;height: 30px;" class="input-medium" placeholder="派工流水号/作业内容" type="text"></td>
						<td>&nbsp;统计维度：</td>
						<td>
							<select name="" id="search_count_flag" class="input-medium" style="width:100px;">
								<option value="工单维度">工单维度</option>
								<option value="人员维度">人员维度</option>
							</select>
						</td>
						<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 10px;top:1px;" type="button">							
						</td>
						</tr>
						</table>
					</form>	
					
					<div class="row">
						<div class="col-xs-12" style="width:100%">				
							
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow-x:auto;width:1600px;table-layout:fixed">
						</table>
						</div>
					</div>
					
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
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
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/hr/tmpReport.js"></script>
</html>
