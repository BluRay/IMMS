<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>工时单价维护</title>
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
		<div class="main-container" id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
<!-- 			<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">计件工资</a></li>
						<li class="active">工时单价维护</li>
					</ul>

					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->
				
					<!-- /section:settings.box -->
					
					<div class="well">
						<table>
							<tr>
								<td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:100px"></select></td>
								<td>&nbsp;有效期：</td>
								<td><input id="effective_date" type="text" placeholder="有效期.." style="width:100px" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/></td>
								<td>工时类型：</td>
								<td>
									<select id="search_type" class="input-small" style="height: 30px;width:100px">
									</select>
								</td>
								<td>&nbsp;&nbsp;<input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input>&nbsp;&nbsp;<input id="btnAdd" class="btn btn-sm btn-info" value="增加" type="button">&nbsp;</td>
							</tr>
						</table>
					</div>
					
					<div id="toolbar"></div>
					<table  style="font-weight:normal;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
				           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
				           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
				           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
				           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
				    </table>
				    
			
			<div id="dialog-add" class="hide" style="align:center;width:700px;height:500px">
				<table>
					<tr style="height:40px">
						<td align="right" style="width:200px">生产工厂：</td><td style="width:150px"><select id="new_factory" class="form-control" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">工时类型：</td><td style="width:150px"><select id="new_hour_type" class="form-control" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">生效日期：</td><td style="width:150px"><input id="new_effective_date" placeholder="生效日期..." style="width:150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">工时单价：</td><td style="width:150px"><input id="new_price" placeholder="工时单价..." style="width:150px" type="text"></td>
					</tr>
					
				</table>
			</div>
			<div id="dialog-edit" class="hide" style="align:center;width:700px;height:500px">
				<table>
					<tr style="height:40px">
						<td align="right" style="width:200px">生产工厂：</td><td style="width:150px"><select id="edit_factory" class="form-control" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">工时类型：</td><td style="width:150px"><select id="edit_hour_type" class="form-control" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">生效日期：</td><td style="width:150px"><input id="edit_effective_date" placeholder="生效日期..." style="width:150px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:200px">工时单价：</td><td style="width:150px"><input id="edit_price" placeholder="工时单价..." style="width:150px" type="text"></td>
					</tr>
					
				</table>
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
		margin-top: 90px;
		right: 20px;
		top: -79px;
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
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/hr/workTimePrice.js"></script>
</html>
