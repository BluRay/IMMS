<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>合格证数据传输</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
		<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="../css/printable.css" type="text/css" media="print">
		<style type="text/css" media="screen">
	        .printable{
	            display: none;
	        }
	  </style> 
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div class="main-container"  id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>生产工厂：</td>
								<td><select name="" id="search_factory" class="input-medium carType"></select></td>
								<td>订单编号：</td>
								<td>
								<input type="text" class="input-medium revise" id="search_order_no" style="height: 30px;" />
								</td>
								<td>传输状态：</td>
								<td>
								<select name="" id="search_status" class="input-medium carType">
									<option value=''>全部</option>
									<option value='已传输'>已传输</option>
									<option value='未传输'>未传输</option>
								</select></td>
								<td>
								<input type="button" class="btn btn-sm  btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								<input class="btn btn-sm btn-danger" id="btnBuslist" value="指定车号" style="margin-left: 2px;" type="button">
								<input class="btn btn-sm  btn-success" id="btnImport" value="传输打印"  style="margin-left: 2px;" type="button">
								<input type="text" style="display:none;width:400px" class="input-large revise" id="bus_number_str"></input>
								</td>							
							</tr>

						</table>
					</form>
					
					<div class="row">
					<div class="col-xs-12">
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;width:2000px;overflow-x:auto">
						</table>	
					</div>
					</div>
					
					<div id="dialog-config" class="hide">
					<form id="  " class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vin">车号：</label>
							<div class="col-sm-9">
								<textarea rows="6" id="search_bus_number" style="width:300px" placeholder="每行输入一个车号后回车！"></textarea>
							</div>
						</div>
					</form>
				</div>
		</div>
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
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script src="../js/hr/mergeTableCell.js"></script>
	<script src="../js/exportTable2Excel.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jsrender.min.js"></script>
	<script type="text/javascript" src="../js/jquery-barcode.js"></script>
	<script type="text/javascript" src="../js/production/certificationPrint.js"></script>
</html>
