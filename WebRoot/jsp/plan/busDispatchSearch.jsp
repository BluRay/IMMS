<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>发车查询</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
				
					<div class="well">
						<table>
							<tr>
								<td>订单编号：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:110px" type="text"></td>
								<td>&nbsp;发车时间：</td>
								<td><input id="start_date" placeholder="开始时间..." style="height: 30px;width:125px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"> - <input id="end_date" placeholder="结束时间..." style="height: 30px;width:125px" type="text" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});"></td>
								<td>
									<input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;">
								</td>
								<td></td>
							</tr>
						</table>
					</div>	
					
					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					</table>
					
			
			<div id="patchModal" class="hide" style="align:center;">
			<table id="tableData2" class="table table-striped table-bordered table-hover" style="width:1500px;text-align: center">
			
			</table>
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>

	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/plan/busDispatchSearch.js"></script>
</html>
