<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>计件工时统计</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 

<!-- <link rel="stylesheet" href="../assets/css/buttons.dataTables.css" />  -->

</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">		
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td>
								<select name="" id="search_factory" class="input-medium" style="width:120px;"></select>
							</td>
							<td style="text-align:right">线别：</td>
							<td>
								<select name="" id="search_line" class="input-medium" style="width:110px;"></select>
							</td>
							<td style="text-align:right">订单：</td>
							<td>
								<input name=""  type="text" id="search_order" class="input-medium" style="width:110px;height: 30px;"></input>
							</td>
							<td style="text-align:right">自制件类别：</td>
							<td>
								<select name="" id="search_zzj_type" class="input-medium" style="width:100px;">
									<option value=''>全部</option>
								</select>
							</td>											
							<td style="text-align:right">生产批次：</td>
							<td>
								<select name="" id="search_batch" class="input-medium" style="width:110px;">
									<option value=''>全部</option>
								</select>
							</td>
						</tr>
						
						<tr>
						<td style="text-align:right">车间：</td>
						<td>
							<select name="" id="search_workshop" class="input-medium" style="width:120px;"></select>
						</td>					
						<td style="text-align:right">生产工序：</td>
						<td >
							<select name="" id="search_process" class="input-medium" style="width:110px;">
									<option value=''>全部</option>
								</select>
						</td>			
						<td style="text-align:right">状态：</td>
						<td>
							<select name="" id="search_status" class="input-medium" style="width:120px;">
								<option value="">全部</option>
								<option value="欠产" selected>欠产</option>
								<option value="已完成">已完成</option>
							</select>
						</td>				
					    <td style="text-align:right">物料描述：</td>
						<td colspan=2>
							<input id="search_mat_desc" style="width:180px;height: 30px;" class="input-medium" type="text">
						</td>
						<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 10px;top:1px;" type="button">							
						</td>
						<td id="count_info" style='color:blue;padding-left: 20px;text-align:center'></td>
						</tr>
						</table>
					</form>

					<div class="row">
						<div class="col-xs-12"  style="width:100%">										
							<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;width:100%;">
							</table>
						</div>
					</div>
			<!-- /.main-container -->
		</div>
	</div>
	
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
		<script src="../js/hr/mergeTableCell.js"></script>
		<script src="../js/exportTable2Excel.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/zzj/matOutputCountDetailReport.js"></script>
</body>

</html>
