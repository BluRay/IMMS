<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>品质异常记录</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
		<!-- <link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css"> -->
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
		<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" />
		<style type="text/css">
		.center{padding-left:0px}
		</style>
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
						<li><a href="#">制程品质</a></li>
						<li class="active">品质异常记录</li>
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
					<div class="page-content-area">
					
					<div class="well">
						<table>
							<tr>
								<td>工厂</td>
								<td>&nbsp;检验节点</td>
								<td>&nbsp;车型</td>
								<td>&nbsp;订单</td>
								<td>&nbsp;车号</td>
								<td>&nbsp;检验员</td>
								<td></td>
							</tr>
							<tr>
								<td style="padding-right:5px"><select id="search_factory" class="form-control" style="width:100px"></select></td>
								<td style="padding-right:5px"><select id="search_test_node"  class="form-control"  style="width:80px"></select></td>
								<td style="padding-right:5px"><select id="search_bustype" class="form-control busType" style="width:80px"></select></td>
								<td><input id="search_order_no" placeholder="订单..." style="width:110px" type="text">&nbsp;</td>
								<td><input id="search_bus_number" placeholder="车号..." style="width:180px" type="text">&nbsp;</td>
							    <td><input id="search_iqc" placeholder="检验员..." style="width:120px" type="text">&nbsp;</td>
							    <td>
								   <input id="btnQuery" type="button" class="btn btn-sm btn-primary" value="查询" style="margin-left: 10px;"></input>
								   <input id="btnAdd" type="button" class="btn btn-sm btn-success" value="新增" style="margin-left: 2px;"></input>
								   <input id="btnDel" type="button" class="btn btn-sm btn-warn" value="删除" style="margin-left: 2px;"></input>
								</td>
							</tr>
						</table>
					</div>	
					<table id="tableData" class="table table-striped table-bordered table-hover" style="overflow-x:auto;overflow-y:scroll;font-size: 12px;">
					</table>
					</div>
			</div><!-- /.main-content -->
			
			<div id="dialog-add" class="hide" style="align:center;width:800px;height:500px">
				<input type="hidden" id="urlPath" value="<%=request.getContextPath()%>/">
				<form id="addForm" class="form-horizontal" method="post" enctype="multipart/form-data" action="addQualityAbnormalRecord">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 订单编号：</td>
						<td style="width:150px" id="order_no_td">
							<input type="text" class="input-medium" id="new_order_no" style="width:150px"/>
							<input type='hidden' id="new_order_id">
						</td>
						<td align="right" style="width:100px">* 车型：</td><td style="width:150px"><select id="new_bus_type" name="bus_type" class="input-small" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 工厂：</td>
						<td style="width:150px">
							<select id="new_factory" class="form-control" style="width:150px"></select>
							<input type='hidden' id="default_factory" value=${factory_id }></td>
						<td align="right" style="width:100px">* 检验节点：</td><td style="width:150px"><select id="new_test_node" name="test_node_id" class="input-small" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">车号：</td><td colspan=3 id="bus_number_td"><input type="text" class="input-medium" id="new_busnumber" name="bus_number" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">问题描述：</td><td colspan=3><textarea class="input-medium" id="new_problem_desc" name="problem_desc" style="width:400px"></textarea></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障图片：</td><td colspan=3><input class="maintain" type="file" name="file" id="file" style="width:210px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">责任单位：</td><td colspan=3><input class="input-medium" id="new_resp_unit" name="resp_unit" style="width:400px"></input></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障类型：</td><td style="width:150px"><select class="form-control" id="new_bug_type" name="bug_type" style="width:150px"></select></td>
						<td align="right" style="width:100px">故障描述：</td><td style="width:150px"><select class="form-control" id="new_bug_desc" name="bug_desc" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">缺陷等级：</td><td style="width:150px"><select class="form-control" id="new_level" name="level" style="width:150px"></select></td>
						<td align="right" style="width:100px">检验员：</td><td style="width:150px"><input type="text" class="input-medium" id="new_iqc" name="iqc" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处理方式：</td><td colspan=3><input type="text" class="input-medium" id="new_solution" name="solution" style="width:400px"/></td>
					</tr>
				    <tr style="height:40px">
						<td align="right" style="width:100px">备注：</td><td colspan=3><textarea class="input-medium" id="new_remark" name="remark" style="width:400px"></textarea></td>
					</tr>
					</table>
				</form>
			</div>
			
			<div id="dialog-edit" class="hide" style="align:center;width:900px;height:500px">
			<div class = "div-dialog">
				<form id="form_edit" class="">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 问题描述：</td><td colspan=3><input type="text" class="input-medium" id="edit_fault_description" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 责任工厂：</td><td style="width:150px"><select id="edit_factory" class="form-control" style="width:150px"></select></td>
						<td align="right" style="width:100px">* 责任车间：</td><td style="width:150px"><select id="edit_workshop" class="input-small" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车辆型号：</td><td style="width:150px"><select id="edit_bus_type" class="form-control" style="width:150px"></select></td>
						<td align="right" style="width:100px">*VIN号：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_vin" name="new_vin" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车牌号码：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_license_number" name="edit_license_number" style="width:150px"/></td>
						<td align="right" style="width:100px">* 行驶里程：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_fault_mils" name="edit_fault_mils" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障现象：</td><td colspan=3><input type="text" class="input-medium" id="edit_fault_phenomenon" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障图片：</td><td colspan=2><input name="edit_fault_pic" style="width:250px" type="file" id="new_fault_pic" /></td>
						<td><a target="blank" id="file_link1">查看</a></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障等级：</td><td><select class="input-medium" id="edit_fault_level_id" style="width:150px"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="S">S</option></select></td>
						<td align="right" style="width:100px">原因分析：</td><td colspan=3><input type="text" class="input-medium" id="edit_fault_reason" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">风险预估：</td><td><input type="text" class="input-medium" id="edit_risk_evaluate" style="width:150px"/></td>
						<td align="right" style="width:100px">重点关注：</td><td><input type="text" class="input-medium" id="edit_keystone_attention" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">8D报告：</td><td colspan=2 style="width:150px"><input name="edit_8d_report" type="file" id="edit_8d_report" /></td>
						<td><a target="blank" id="file_link2">查看</a></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">关闭证据：</td><td colspan=2 style="width:150px"><input name="edit_close_evidenc" type="file" id="edit_close_evidenc" /></td>
						<td><a target="blank" id="file_link3">查看</a></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">解决方法：</td><td colspan=3><input type="text" class="input-medium" id="edit_resolve_method" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处理时间：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_resolve_date" name="edit_resolve_date" style="width:150px" onClick="WdatePicker({el:'edit_resolve_date',dateFmt:'yyyy-MM-dd'});"/></td>
						<td align="right" style="width:100px">备注：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_memo" name="edit_memo" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">问题关闭：</td><td colspan=3><input id="edit_is_closed" type="checkbox"></td>
					</tr>
				    <tr style="height:40px">
						<td align="right" style="width:100px">备注：</td><td colspan=3><input id="edit_is_closed" type="checkbox"></td>
					</tr>
					</table>
				</form>
			</div>
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/dataTables.rowGroup.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script type="text/javascript" src="../js/quality/qualityAbnormalRecord.js"></script>
</html>
