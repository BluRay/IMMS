<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>售后问题反馈</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css">
		
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">
				<div class="page-content-area">
					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>责任工厂：</td>
								<td><select id="search_factory" class="form-control" style="width:90px"></select></td>
								<td>&nbsp;客户：</td>
								<td><input id="search_customer_name" placeholder="客户..." style="width:115px" type="text"></td>
								<td>&nbsp;处理结果：</td>
								<td><select id="search_resolve_result" class="input-small" style="width:90px"><option value="">全部</option><option value="0">已关闭</option><option value="1">处理中</option></select></td>
							</tr>
							<tr>
								<td>故障现象：</td>
								<td colspan=3><input id="search_fault_phenomenon" placeholder="故障现象..." style="width:250px" type="text"></td>
								<td>&nbsp;反馈日期：</td>
								<td colspan=3><input id="search_date_start" placeholder="开始时间..." style="width:90px" type="text" onClick="WdatePicker({el:'search_date_start',dateFmt:'yyyy-MM-dd'});"> - <input id="search_date_end" placeholder="结束时间..." style="width:90px" type="text" onClick="WdatePicker({el:'search_date_end',dateFmt:'yyyy-MM-dd'});"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-primary" value="查询" style="margin-left: 2px;"></input><input id="btnAdd" type="button" class="btn btn-sm btn-success" value="新增" style="margin-left: 2px;"></input></td>
								<td><input id="btnBulkAdd" style="margin-left: 2px;" class="btn btn-sm btn-info" value="批导" type="button"></td>								
							</tr>
						</table>	
					</div>
					
					<div id="divBulkAdd" class="well" style="display:none;">
					<button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
						<form id="uploadProcessFaultForm" action="#" enctype="multipart/form-data" method="post">
						<table>
							<tr>
								<td><input id="file" type="file" name="file" accept="*.xlsx"/></td>
								<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/></td>
								<td></td><td><a href="../docs/processFault.xls">下载批导模板</a></td>
							</tr>
						</table>
						</form>
					</div>
					
					<div id="toolbar"></div>
					<table  style="font-weight:normal;width:1500px;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
				           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
				           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
				           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
				           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
				    </table>
					</div>
			</div><!-- /.main-content -->
			
			<div id="dialog-add" class="hide" style="align:center;width:800px;height:500px">
				<form id="form_add" class="">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车辆型号：</td><td style="width:150px">
						<select name="" id="new_bus_type" class="input-medium busType">
							</select>
							<script id="tmplBusTypeSelect" type="text/x-jsrander">
                            	<option value='{{:id}}'>{{:name}}</option>
                            </script>
						</td>
						<td align="right" style="width:100px">*故障反馈日期：</td><td style="width:150px"><input type="text" class="input-medium" id="new_fault_date" name="new_fault_date" onClick="WdatePicker({el:'new_fault_date',dateFmt:'yyyy-MM-dd'});" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障里程：</td><td style="width:150px"><input type="text" class="input-medium" id="new_fault_mils" name="new_fault_mils" style="width:150px" /></td>
						<td align="right" style="width:100px">*客户名称：</td><td style="width:150px"><input type="text" class="input-medium" id="new_customer_name" name="new_customer_name" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车牌号码：</td><td style="width:150px"><input type="text" class="input-medium" id="new_license_number" name="new_license_number" style="width:150px" /></td>
						<td align="right" style="width:100px">*VIN号：</td><td style="width:150px"><input type="text" class="input-medium" id="new_vin" name="new_vin" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障等级：</td><td style="width:150px"><select class="input-medium" id="new_fault_level_id" style="width:150px"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="S">S</option></select></td>
						<td align="right" style="width:100px">*问题性质：</td><td style="width:150px"><select class="input-medium" id="new_is_batch" style="width:150px"><option value="0">非批量</option><option value="1">批量</option></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障现象：</td><td colspan=3><input type="text" class="input-medium" id="new_fault_phenomenon" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障原因：</td><td colspan=3><input type="text" class="input-medium" id="new_fault_reason" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">责任工厂：</td><td style="width:150px"><select id="new_factory" class="input-small" style="width:150px"></select></td>
						<td align="right" style="width:100px">责任车间：</td><td style="width:150px"><select id="new_workshop" class="input-small" style="width:80px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">解决方法：</td><td colspan=3><input type="text" class="input-medium" id="new_resolve_method" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处理时间：</td><td style="width:150px"><input type="text" class="input-medium" id="new_resolve_date" style="width:150px" onClick="WdatePicker({el:'new_resolve_date',dateFmt:'yyyy-MM-dd'});"/></td>
						<td align="right" style="width:100px">处理结果：</td><td style="width:150px"><select class="input-medium" id="new_resolve_result" style="width:150px"><option value="0">关闭</option><option value="1">受理</option></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">问题报告：</td><td colspan=3><input name="new_report_file" type="file" id="new_report_file" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处罚情况：</td><td style="width:150px"><input type="text" class="input-medium" id="new_punish" style="width:150px" /></td>
						<td align="right" style="width:100px">索赔情况：</td><td style="width:150px"><input type="text" class="input-medium" id="new_compensation" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">备注信息：</td><td colspan=3><input type="text" class="input-medium" id="new_memo" style="width:400px"/></td>
					</tr>
					</table>
				</form>
			</div>
			
			<div id="dialog-edit" class="hide" style="align:center;width:800px;height:500px">
			<div class = "div-dialog">
				<form id="form_edit">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车辆型号：</td><td style="width:150px">
							<select name="" id="edit_bus_type" class="input-medium busType">
							</select>
							<script id="tmplBusTypeSelect" type="text/x-jsrander">
                            	<option value='{{:id}}'>{{:name}}</option>
                            </script>
						</td>
						<td align="right" style="width:100px">*故障反馈日期：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_fault_date" name="new_fault_date" onClick="WdatePicker({el:'new_fault_date',dateFmt:'yyyy-MM-dd'});" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障里程：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_fault_mils" name="new_fault_mils" style="width:150px" /></td>
						<td align="right" style="width:100px">*客户名称：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_customer_name" name="new_customer_name" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 车牌号码：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_license_number" name="new_license_number" style="width:150px" /></td>
						<td align="right" style="width:100px">*VIN号：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_vin" name="new_vin" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障等级：</td><td style="width:150px"><select class="input-medium" id="edit_fault_level_id" style="width:150px"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="S">S</option></select></td>
						<td align="right" style="width:100px">*问题性质：</td><td style="width:150px"><select class="input-medium" id="edit_is_batch" style="width:150px"><option value="0">非批量</option><option value="1">批量</option></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障现象：</td><td colspan=3><input type="text" class="input-medium" id="edit_fault_phenomenon" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">* 故障原因：</td><td colspan=3><input type="text" class="input-medium" id="edit_fault_reason" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">责任工厂：</td><td style="width:150px"><select id="edit_factory" class="input-small" style="width:150px"></select></td>
						<td align="right" style="width:100px">责任车间：</td><td style="width:150px"><select id="edit_workshop" class="input-small" style="width:80px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">解决方法：</td><td colspan=3><input type="text" class="input-medium" id="edit_resolve_method" style="width:400px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处理时间：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_resolve_date" style="width:150px" onClick="WdatePicker({el:'edit_resolve_date',dateFmt:'yyyy-MM-dd'});"/></td>
						<td align="right" style="width:100px">处理结果：</td><td style="width:150px"><select class="input-medium" id="edit_resolve_result" style="width:150px"><option value="0">关闭</option><option value="1">受理</option></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">问题报告：</td><td colspan=3><input name="edit_report_file" type="file" id="edit_report_file" style="width:300px"/><a target="blank" id="file_link">查看</a></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">处罚情况：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_punish" style="width:150px" /></td>
						<td align="right" style="width:100px">索赔情况：</td><td style="width:150px"><input type="text" class="input-medium" id="edit_compensation" style="width:150px"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">备注信息：</td><td colspan=3><input type="text" class="input-medium" id="edit_memo" style="width:400px"/></td>
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
<script>
	var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
<style type="text/css">
.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
	position: absolute;
	margin-top: 88px;
	right: 1px;
	top: -40px;
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
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jsrender.min.js"></script>
	<script type="text/javascript" src="../js/quality/processFault.js"></script>
</html>
