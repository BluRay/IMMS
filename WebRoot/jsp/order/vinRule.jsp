<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">

					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>订单：</td>
								<td>
									<input type="text" style="height: 30px;" class="input-medium revise" value="" id="search_order" />
								</td>
								<td>&nbsp;区域：</td>
								<td><select id="search_area" class="input-small"></select></td>
								<td><input type="button" class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
									<!-- <button id='btnAdd' class="btn btn-sm btn-success">新增</button> -->
									<!-- <button id='btnDelete' class="btn btn-sm btn-delete">删除</button> --></td>
							</tr>
						</table>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
								
							</table>
						</div>
					</div>
				
                <div id="dialog-add" class="hide">
					<form id="addForm" class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="addBusType">*&nbsp;订单</label>
							<div class="col-sm-9">
								<input type="text" id="add_order" class="input-small">
								<span id="add_order_desc"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="addArea">*&nbsp;区域</label>
							<div class="col-sm-9">
								<input type="text" id="add_area" class="input-small" disabled>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="addShortName">*&nbsp;VIN前8位</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="VIN前8位..." id="add_vinPrefix" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="addCapacity">*&nbsp;WMI扩展代码</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="WMI扩展代码..." id="add_wmiExtension" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" />
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;生成序列号位数</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="生成序列号位数..." id="add_numberSize" />
							</div>
						</div>
					</form>
				</div>
				
				<div id="dialog-edit" class="hide">
					<form id="editForm" class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="editBusType">*&nbsp;订单</label>
							<div class="col-sm-9">
								<input type="hidden" id="editId" />
								<input type="text" id="edit_order" class="input-small" disabled></input>
								<span id="edit_order_desc"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="editArea">*&nbsp;区域</label>
							<div class="col-sm-9">
								<input type="text"  id="edit_area" class="input-small" disabled>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="editShortName">*&nbsp;VIN前8位</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="VIN前8位..." id="edit_vinPrefix" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="editWmiExtension">*&nbsp;WMI扩展代码</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="WMI扩展代码..." id="edit_wmiExtension"/>
							</div>
						</div>
						
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="editNumberSize">*&nbsp;生成序列号位数</label>
							<div class="col-sm-9">
								<input type="text" class="input-medium" placeholder="生成序列号位数..." id="edit_numberSize" />
							</div>
						</div>
					</form>
				</div>
				
			</div>
		</div>
		<!-- /.main-container -->
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/order/vinRule.js"></script>
</body>

</html>
