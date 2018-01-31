<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>班组成员承包单价</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css">
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="../css/zTreeStyle/metro.css" type="text/css">
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
						<li><a href="#">计件工资</a></li>
						<li class="active">班组成员承包单价</li>
					</ul>

					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->
					
					<div class="row">
						<div class="col-xs-12">
							<div class="row">
							<div class="col-sm-3">
								<div id="div_tree1" class="widget-box widget-color-blue2" style="height:515px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">组织结构&nbsp;&nbsp;&nbsp;&nbsp;</h4>
										
									</div>
									<div class="widget-body">
										<div class="widget-main padding-8">
											<ul id="workGroupTree" class="ztree" style="padding-left:0px;"></ul>
										</div>
									</div>
											
								</div>
							</div>
							
							<div class="col-sm-9">
								<div id="div_tree2" class="widget-box widget-color-blue2" style="height:515px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
									<div class="widget-header">
										<h4 class="widget-title lighter smaller">班组成员承包单价&nbsp;&nbsp;&nbsp;&nbsp;</h4>
										
									</div>
									<div class="well">
										<table>
											<tr>
												<td>订单：</td>
												<td><input id="search_order_no" style="height: 30px;width:120px" placeholder="请输入订单..." class="col-sm-10" type="text"></td>
												<td>姓名/工号：</td>
												<td><input id="search_staff" style="height: 30px;width:120px" placeholder="请输入姓名/工号..." class="col-sm-10" type="text"></td>
												<td align="right">&nbsp;日期：</td>
												<td><input id="start_date" placeholder="开始时间..." style="height: 30px;width:90px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"> - <input id="end_date" placeholder="结束时间..." style="height: 30px;width:90px" type="text" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});"></td>
												<td align="right"><input type="button" class="btn btn-sm btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;
												</td>
												<td>&nbsp;<input id="btnBulkAdd" class="btn btn-sm btn-info" value="批量导入" type="button">&nbsp;</td>
											</tr>
										</table>
									
									</div>
									<div id="divBulkAdd" class="well" style="display:none;">
									<button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
										<form id="uploadDistributionForm" action="#" enctype="multipart/form-data" method="post">
										<table>
											<tr>
												<td>生效日期：<input id="effective_date" type="text"  class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/></td>
												<td><input id="file" type="file" name="file" accept="*.xlsx"/></td>
												<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" accept=".xls"/></td>
												<td></td><td><a href="../docs/staff_distribution_upload.xls">下载批导模板</a></td>
											</tr>
										</table>
										</form>
									</div>
									<div id="toolbar"></div>
									<table  style="font-weight:normal;width:100%;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
								           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
								           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
								           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
								           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
								    </table>
								</div>
							</div>
						
							</div>
						</div>
					</div>
					

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
		margin-top: 100px;
		right: 12px;
		top: -99px;
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
	<script src="../js/ztree/jquery.ztree.core-3.5.min.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script src="../js/hr/staffDistribution.js"></script>
</html>
