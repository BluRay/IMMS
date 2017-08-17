<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>人员去向统计</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<!-- <link rel="stylesheet" href="../css/bootstrap.3.2.css">	 -->
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<!-- <link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css"> -->
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						<li class="active">人员去向统计</li>
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
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂/部门：</td>
							<td>
								<select id="factory" class="input-medium" style="width:100px; "></select>
							</td>
							<td style="text-align:right">车间/科室：</td>
							<td>
								<select id="workshop" class="input-medium" style="width:100px; "></select>
							</td>
							<td style="text-align:right" >日期：</td>
							<td >
								<input id="record_date" style="width:100px;height: 30px;" class="input-small" 
											onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">						
							</td>
							<td style="width: 50px;">维度：</td>
							<td style="width: 120px;">
								<select id="reportType" style="height:30px;width:100px"  class="input-medium">
									<option value='计件' >计件</option>
									<option value='计时'>计时</option>
								</select>
							</td>				
							
							<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left:5px;top:1px;" type="button">								
							
						</tr>						
						</table>
					</form>

					<div class="row">
						<div class="col-xs-12" >						
							<table id="attendanceTable" style="table-layout: fixed;display:none;font-size:12px;text-align:center;width: 3500px;max-width:3500px;" class="table table-bordered table-striped" > <!--  -->
								<thead>
									<tr id="">
										<th style="text-align:center;width:100px" rowspan=2>工厂/部门</th>
										<th style="text-align:center;width:100px;" rowspan=2>车间/科室</th>
										<!-- <th style="text-align:center;width:90px;" rowspan=2>班组</th> -->
										<th style="text-align:center;"colspan=2 >直接人力（计件）</th>
										<th style="text-align:center;"colspan=2>短期工</th>
										<th style="text-align:center;" colspan=5>人数差异原因分类</th>
										<th style="text-align:center;" rowspan=2>总计<br/>（实际在岗人数）</th>
										<th style="text-align:center;" colspan=13>外出支援人数</th>
										<th style="text-align:center;" colspan=13>被支援人数</th>										
									</tr>
									<tr>
										<th style="text-align:center;">应到人数</th>
										<th style="text-align:center;">实到人数</th>
										<th style="text-align:center;">应到人数</th>
										<th style="text-align:center;">实到人数</th>
										<th style="text-align:center;">请假</th>
										<th style="text-align:center;">放假</th>
										<th style="text-align:center;">旷工</th>
										<th style="text-align:center;">出差</th>
										<th style="text-align:center;">外出支援</th>

										<th style="text-align:center;">长沙</th>
										<th style="text-align:center;">南京</th>
										<th style="text-align:center;">杭州</th>
										<th style="text-align:center;">大连</th>
										<th style="text-align:center;">青岛</th>
										<th style="text-align:center;">承德</th>
										<th style="text-align:center;">武汉</th>
										<th style="text-align:center;">汕尾</th>
										<th style="text-align:center;">太原</th>
										<th style="text-align:center;">深圳</th>
										<th style="text-align:center;">天津</th>
										<th style="text-align:center;">其他</th>
										<th style="text-align:center;">备注</th>
										<th style="text-align:center;">长沙</th>
										<th style="text-align:center;">南京</th>
										<th style="text-align:center;">杭州</th>
										<th style="text-align:center;">大连</th>
										<th style="text-align:center;">青岛</th>
										<th style="text-align:center;">承德</th>
										<th style="text-align:center;">武汉</th>
										<th style="text-align:center;">汕尾</th>
										<th style="text-align:center;">太原</th>
										<th style="text-align:center;">深圳</th>
										<th style="text-align:center;">天津</th>
										<th style="text-align:center;">其他</th>
										<th style="text-align:center;">备注</th>
									</tr>
								</thead>
								<tbody>	
								</tbody>
							</table>
							
							<table id="attendanceTable_hour" style="display:none;table-layout: fixed;font-size:12px;text-align:center;width: 3500px;max-width:3500px;" class="table table-bordered table-striped" > <!--  -->
								<thead>
									<tr id="">
										<th style="text-align:center;width:100px" rowspan=2>工厂/部门</th>
										<th style="text-align:center;width:100px;" rowspan=2>车间/科室</th>
										<!-- <th style="text-align:center;width:90px;" rowspan=2>班组</th> -->
										<th style="text-align:center;"colspan=2 >辅助人力（计时）</th>
										<!-- <th style="text-align:center;"colspan=2>短期工</th> -->
										<th style="text-align:center;" colspan=6>人数差异原因分类</th>
										<th style="text-align:center;" rowspan=2>总计<br/>（实际在岗人数）</th>
										<th style="text-align:center;" colspan=13>外出支援人数</th>
										<th style="text-align:center;" colspan=13>被支援人数</th>										
									</tr>
									<tr>
										<th style="text-align:center;">应到人数</th>
										<th style="text-align:center;">实到人数</th>
										<!-- <th style="text-align:center;">应到<br>人数</th>
										<th style="text-align:center;">实到<br>人数</th> -->
										<th style="text-align:center;">请假</th>
										<th style="text-align:center;">放假</th>
										<th style="text-align:center;">旷工</th>
										<th style="text-align:center;">出差</th>
										<th style="text-align:center;">外出支援</th>
										<th style="text-align:center;">调出</th>

										<th style="text-align:center;">长沙</th>
										<th style="text-align:center;">南京</th>
										<th style="text-align:center;">杭州</th>
										<th style="text-align:center;">大连</th>
										<th style="text-align:center;">青岛</th>
										<th style="text-align:center;">承德</th>
										<th style="text-align:center;">武汉</th>
										<th style="text-align:center;">汕尾</th>
										<th style="text-align:center;">太原</th>
										<th style="text-align:center;">深圳</th>
										<th style="text-align:center;">天津</th>
										<th style="text-align:center;">其他</th>
										<th style="text-align:center;">备注</th>
										<th style="text-align:center;">长沙</th>
										<th style="text-align:center;">南京</th>
										<th style="text-align:center;">杭州</th>
										<th style="text-align:center;">大连</th>
										<th style="text-align:center;">青岛</th>
										<th style="text-align:center;">承德</th>
										<th style="text-align:center;">武汉</th>
										<th style="text-align:center;">汕尾</th>
										<th style="text-align:center;">太原</th>
										<th style="text-align:center;">深圳</th>
										<th style="text-align:center;">天津</th>
										<th style="text-align:center;">其他</th>
										<th style="text-align:center;">备注</th>
									</tr>
								</thead>
								<tbody>	
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- /.main-container -->
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
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/hr/attendanceReport.js"></script>
</body>

</html>
