<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>techFinanceReport</title>		
		<link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css">
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container" id="main-container"  style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
					<div class="tablediv page-content-area"  style="padding-bottom: 0px;">
					<div class="well">
						<table>
							<tr>
								<td>生产工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:100px"></select></td>
								<td>&nbsp;技改工厂：</td>
								<td><select id="search_prod_factory" class="input-small" style="height: 30px;width:80px"></select></td>
								<td>&nbsp;技改单编号：</td>
								<td><input id="search_tech_order_no" placeholder="技改单编号..." style="height: 30px;width:100px" type="text"></td>
								<td>&nbsp;技改任务：</td>
								<td><input id="search_task_content" placeholder="技改任务..." style="height: 30px;width:100px" type="text"></td>
								<td>&nbsp;责任单位：</td>
								<td><input id="search_duty_unit" placeholder="责任单位..." style="height: 30px;width:80px" type="text"></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>生产订单：</td>
								<td><input id="search_order_no" placeholder="生产订单..." style="height: 30px;width:100px" type="text"></td>
								<td>&nbsp;车间：</td>
								<td><select id="search_workshop" class="input-small" style="height: 30px;width:80px"></select></td>
								<td>&nbsp;跟进台数：</td>
								<td><input id="search_follow_num" placeholder="跟进台数..." style="height: 30px;width:100px" type="text"></td>
								<td>&nbsp;技改月份：</td>
								<td><input id="search_month" placeholder="技改月份..." style="height: 30px;width:100px" type="text" onClick="WdatePicker({el:'search_month',dateFmt:'yyyy-MM'});"></td>
								<td>&nbsp;单车工时：</td>
								<td><input id="search_single_time" placeholder="单车工时..." style="height: 30px;width:80px" type="text"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input>&nbsp;&nbsp;</td>
							</tr>
						</table>
					</div>
					<div id="toolbar"></div>
					<table  style="font-weight:normal;width:100%;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
				           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
				           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
				           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
				           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
				    </table>
			</div><!-- /.main-content -->
			
			<input type="hidden" id="login_user" value="<%=session.getAttribute("display_name")%>" />
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script>
		var $table = $('#table'),$remove = $('#remove'),selections = [];
	</script>
	<style type="text/css">
	.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
		position: absolute;
		margin-top: 88px;
		right: 0px;
		top: -49px;
	}
	.btn-default {
		color: #333;
		background-color: #fff;
		border-color: #ccc;
		height: 40px;
		color: #fff;
		background-color: #333;
	}
	
</style>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>	
	<script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>	
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/tech/techFinanceReport.js"></script>
</html>
