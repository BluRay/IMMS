<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>自制件条码打印</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
<link rel="stylesheet" href="../css/printable.css" type="text/css" media="print">
<style type="text/css" media="screen">
       .printable{
           display: none;
       }
 </style> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container notPrintable" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">

				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单编号..." value=""
								id="search_order_no" /></td>
							<td>生产工厂：</td>
							<td><select name="" id="search_factory" class="input-small">
							</select>
							 <td>自制件类别：</td>
							<td><select name="" id="search_zzj_type" class="input-small">
								<option value=''>全部</option>
							</select>							 
							</td>
							<td>物料描述：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入物料描述..." value=""
								id="search_mat_desc" /></td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
								<input type="button"
								class="btn btn-sm btn-success" id="btnPrint" value="打印"
								style="margin-left: 2px;"></input>
							</td>
						</tr>
					</table>
				</div>

				<div class="row"  >
					<div class="col-xs-12"  style="width:100%">
						<table id="tableResult" 
							class="table table-striped table-bordered table-hover "
							style="font-size: 12px; width:100%;overflow-x:auto" >
						</table>
					</div>
				</div>
		</div><!-- /.main-content -->
		
	</div><!-- /.main-container -->
	<!-- 打印区域 -->
	<div id="printarea" class="printConfigure printable toPrint" style="width:374px;"></div>
	
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace-elements.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
    <script src="../assets/js/buttons.html5.js"></script>
    <script src="../assets/js/bootstrap-tag.min.js"></script>
    <script src="../js/jquery-qrcode-0.14.0.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/zzj/matPrint.js"></script>
</body>
	
</html>