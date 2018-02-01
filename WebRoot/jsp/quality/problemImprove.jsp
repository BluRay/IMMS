<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>问题改善</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<style type="text/css">
		.center{padding-left:0px}
		</style>
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">
				<div class="page-content-area">
					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>责任工厂：</td>
								<td><select id="search_factory" class="form-control" style="width:100px"></select></td>
								<td>&nbsp;车型：</td>
								<td><select id="search_bus_type" class="form-control" style="width:80px"></select></td>
								<td>&nbsp;VIN号：</td>
								<td><input id="search_vin" placeholder="VIN号..." style="width:120px" type="text"></td>
								<td>&nbsp;问题主题：</td>
								<td><input id="search_fault_description" placeholder="问题主题..." style="width:150px" type="text"></td>
								<td>&nbsp;关闭情况：</td>
								<td><select id="search_is_closed" class="form-control" style="width:80px"><option value="">全部</option><option value="0">未关闭</option><option value="1">已关闭</option></select></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-primary" value="查询" style="margin-left: 2px;"></input><input id="btnAdd" type="button" class="btn btn-sm btn-success" value="新增" style="margin-left: 2px;"></input></td>
							</tr>
						</table>	
					</div>	
					<table id="tableData" class="table table-striped table-bordered table-hover" style="width:1600px;overflow-x:auto;overflow-y:scroll;font-size: 12px;">
					</table>
					</div>
			</div><!-- /.main-content -->
			
			<div id="dialog-add" class="hide" style="align:center;width:800px;height:500px">
				<form id="form_add" class="">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 问题描述：</td><td colspan=3><input type="text" class="input-medium" id="new_fault_description" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 责任工厂：</td><td style="width:150px"><select id="new_factory" class="form-control" style="width:150px"></select></td>
						<td align="right" style="width:100px">* 责任车间：</td><td style="width:150px"><select id="new_workshop" class="input-small" style="width:150px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车辆型号：</td><td style="width:150px"><select id="new_bus_type" class="form-control" style="width:150px"></select></td>
						<td align="right" style="width:100px">*VIN号：</td><td style="width:150px"><input type="text" class="input-medium" id="new_vin" name="new_vin" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车牌号码：</td><td style="width:150px"><input type="text" class="input-medium" id="new_license_number" name="new_license_number" style="width:150px"/></td>
						<td align="right" style="width:100px">* 行驶里程：</td><td style="width:150px"><input type="text" class="input-medium" id="new_fault_mils" name="new_fault_mils" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障现象：</td><td colspan=3><input type="text" class="input-medium" id="new_fault_phenomenon" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障图片：</td><td colspan=3><input name="new_fault_pic" type="file" id="new_fault_pic" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">故障等级：</td><td><select class="input-medium" id="new_fault_level_id" style="width:150px"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="S">S</option></select></td>
						<td align="right" style="width:100px">原因分析：</td><td><input type="text" class="input-medium" id="new_fault_reason" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">风险预估：</td><td><input type="text" class="input-medium" id="new_risk_evaluate" style="width:150px"/></td>
						<td align="right" style="width:100px">重点关注：</td><td><input type="text" class="input-medium" id="new_keystone_attention" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">8D报告：</td><td colspan=3><input name="new_8d_report" type="file" id="new_8d_report" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">关闭证据：</td><td colspan=3><input name="new_close_evidenc" type="file" id="new_close_evidenc" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">解决方法：</td><td colspan=3><input type="text" class="input-medium" id="new_resolve_method" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处理时间：</td><td style="width:150px"><input type="text" class="input-medium" id="new_resolve_date" name="new_resolve_date" style="width:150px" onClick="WdatePicker({el:'new_resolve_date',dateFmt:'yyyy-MM-dd'});"/></td>
						<td align="right" style="width:100px">备注：</td><td style="width:150px"><input type="text" class="input-medium" id="new_memo" name="new_memo" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">问题关闭：</td><td colspan=3><input id="new_is_closed" type="checkbox"></td>
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
				
					</table>
				</form>
			</div>
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jsrender.min.js"></script>
	<script type="text/javascript" src="../js/quality/problemImprove.js"></script>
</html>
