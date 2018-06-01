<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>车间供货新增</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">

			<div id="form" class="well form-search">
				<table>
					<tr>
						<td><font size="3" color="red">*</font>订单编号：</td>
						<td><input type="text" style="height: 30px;width:90px"
							class="input-medium revise" placeholder="订单编号..." 
							id="search_order_no" /></td>
						<td>&nbsp;订单描述：</td>
						<td>
						    <input type="text" style="height:30px;width:180px;" readonly=readonly
							class="input-medium revise" id="search_order_desc" />
						</td>
						<td>&nbsp;<font size="3" color="red">*</font>生产工厂：</td>
						<td>
							<select name="" id="search_factory" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产车间：</td>
						<td>
							<select id="search_workshop" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产线别：</td>
						<td>
							<select id="search_line" class="input-small">
							</select>
						</td>
						
					</tr>
					<tr>
					    <td>自制件类别：</td>
						<td>
							<select name="" id="search_zzj_type" class="input-small" style="width:90px">
								<option value=''>全部</option>
							</select>							 
						</td>
						<td>&nbsp;物料描述：</td>
						<td><input type="text" style="height: 30px;width:180px;"
							class="input-medium revise" placeholder="物料描述..." id="search_mat_desc" />
						</td>
						<td>&nbsp;使用车间：</td>
						<td>
							<select id="search_use_workshop" class="input-small">
							</select>
						</td>
					    <td>&nbsp;供应车付：</td>
						<td>
						    <input type="text" style="height:30px;width:80px" 
							class="input-medium revise" id="prodction_qty" />
						</td>
						<td>车付</td>
						<td colspan='2'>
						    <input type="button"
							class="btn btn-sm btn-primary" id="btnConfirm" value="确认" style="margin-left: 2px;"></input>
							<input type="button"
							class="btn btn-sm btn-success" id="btnSave" value="保存" style="margin-left: 2px;"></input>
							<input type="button"
							class="btn btn-sm btn-info" id="btnBack" value="返回" style="margin-left: 2px;"></input>
						</td>
					</tr>
				</table>
			</div>

			<div class="row"  >
				<div class="col-xs-12"  style="width:100%">
					<table id="tableResult" 
						class="table table-striped table-bordered table-hover "
						style="font-size: 12px; width:100%;overflow-y:auto" >
					</table>
				</div>
			</div>
		</div><!-- /.main-content -->
		
	</div><!-- /.main-container -->
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/ace-elements.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
    <script src="../assets/js/buttons.html5.js"></script>
    <script src="../assets/js/bootstrap-tag.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/zzj/zzjWorkshopSupplyAdd.js"></script>
</body>
	
</html>