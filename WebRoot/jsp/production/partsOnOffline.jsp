<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>部件上下线</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet"
	href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet"
	href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>生产工厂：</td>
								<td>
									<select name="" id="search_factory" class="input-medium carType" style="height: 30px;width:100px;" ></select>
								</td>
								<td>订单编号：</td>
								<td><input style="height: 30px;width:100px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
								<td>生产部件：</td>
								<td>
									<!-- <input type="text"  id="search_parts" class="input-medium" style="height: 30px;width:90px;" ></input> -->
									<select id="search_parts" class="input-medium" style="height: 30px;width:90px;" >
									</select>
								</td>
								<td>生产日期：</td>
								<td>
									<input id="search_date_start" class="input-medium" style="width:90px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">	
									-
									<input id="search_date_end" class="input-medium" style="width:90px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">						
								</td>							
								<td><input type="button" class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-sm btn-info" id="btnAdd" value="新增" style="margin-left: 2px;"></input>						
								</td>
							</tr>

						</table>
					</form>
						
					<div class="row">
					<div class="col-xs-12">
						<table id="tableResult"
							class="table table-striped table-bordered table-hover" style="font-size: 12px; width:1300px;overflow-x:auto ">
						</table>	
					</div>
					</div>

			<div id="dialog-config" class="hide">
				<form id="create_form" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right" for="" >*&nbsp;生产工厂：</label>
						<div class="col-sm-8">
							<select id="factory" class="input-medium" style="width:100%" >
								<option value=''>请选择</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right" >*&nbsp;订单编号：</label>
						<div class="col-sm-8" >
							<input type="text"  class="input-medium" style="width:100%"  id="order"  placeholder="订单编号.." />
							<input type="text" style="display:none" id="order_id" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right" >*&nbsp;生产部件：</label>
						<div class="col-sm-8" >
							<!-- <input type="text"  class="input-medium" style="width:100%"  id="order"  placeholder="生产部件.." />
							<input type="text" style="display:none" id="order_id" /> -->
							<select id="parts" class="input-medium" style="width:100%" >
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right"  >*&nbsp;生产日期：</label>
						<div class="col-sm-8" >
							<input id="prod_date" class="input-medium" style="width:100%" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">	
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right" for="" >*&nbsp;上线数：</label>
						<div class="col-sm-8">
							<input type="text"  class="input-medium" style="width:100%"  id="online_num"  placeholder="上线数.." />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right no-padding-right" for="" >*&nbsp;下线数：</label>
						<div class="col-sm-8">
							<input type="text"  class="input-medium" style="width:100%"  id="offline_num"  placeholder="下线数.." />
						</div>
					</div>
					
			</form>
		</div>
		
			</div>
			<!-- /.main-container -->
		</div>
	
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jquery.form.js"></script>	
	<script src="../js/common.js"></script>
	<script src="../js/production/partsOnOffline.js"></script>
</body>

</html>
