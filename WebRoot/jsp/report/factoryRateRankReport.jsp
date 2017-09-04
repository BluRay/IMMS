<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>车间计划达成率</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- 		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" /> -->
<!-- 		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" /> -->
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
						<li><a href="#">报表</a></li>
						<li class="active">生产报表</li>
						<li class="active">车间计划达成率</li>
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
						<table>
							<tr>
							    <td>日期：</td>
								<td style="padding-left:5px;width:120px">
<!-- 								<label><input type="radio" name="xx" class="radio" id="week" checked="checked" value="W" style="margin-left: 2px;"/>本周</label> -->
<!-- 								<label><input type="radio" name="xx" class="radio" id="month" value="M" style="margin-left: 2px;"/>本月</label> -->
<!-- 								<label><input type="radio" name="xx" class="radio" id="season" value="S" style="margin-left: 2px;"/>季度</label> -->
<!-- 								<label><input type="radio" name="xx" class="radio" id="year" value="Y" style="margin-left: 2px;"/>本年</label> -->
								    <select id="date_type" style="padding-left:5px;width:150px">
								        <option value='d'>今日</option>
								        <option value='w'>本周</option>
								        <option value='m'>本月</option>
								        <option value='s'>季度</option>
								        <option value='y'>本年</option>
								    </select>
								</td>
								<td style="display:none" id="season_td">
								    <select id="season" style="padding-left:5px;width:150px">
								        <option value='1'>第一季度</option>
								        <option value='2'>第二季度</option>
								        <option value='3'>第三季度</option>
								        <option value='4'>第四季度</option>
								    </select>
								</td>
								<td >
									<input type="text"   type="text" name="start_date" id="start_date"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"/>
									至&nbsp;<input type="text" type="text" name="end_date" id="end_date" class="Wdate" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});" style="height:30px;background-color: white;width:120px" />
								</td>
								
								
								<td><input type="button" class="btn btn-primary"
										id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>		
							</tr>

						</table>
					</form>	
					
					<div class="row">
						<div id="containerReport" style="max-width: 1200px;min-width: 500px;margin: auto;" align="center">
				
			            </div>
					</div>
					<div class="row">
					<div class="col-xs-12"  style="width:100%">
						<table id="tableData" 
							class="table table-striped table-bordered table-hover"
							style="font-size: 12px;overflow-x:auto" >
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
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script type="text/javascript" src="../js/highcharts.js"></script>
	<script type="text/javascript" src="../js/exporting.js"></script>
	<script src="../js/report/factoryRateRankReport.js"></script>
</html>
