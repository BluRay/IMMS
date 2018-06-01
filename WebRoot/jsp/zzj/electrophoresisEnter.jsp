<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>电泳件进仓</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">
            <form id="form" class="well form-search">
				<table>
					<tr>
						<td><font size="3" color="red">*</font>订单编号：</td>
						<td><input type="text" style="height: 30px;width:90px"
							class="input-medium revise" placeholder="订单编号..." 
							id="search_order_no" /></td>
						<td>&nbsp;订单描述：</td>
						<td>
						    <input type="text" style="height:30px;width:180px;" placeholder="订单描述..."
							class="input-medium revise" id="search_order_desc" />
						</td>
						<td>&nbsp;<font size="3" color="red">*</font>生产工厂：</td>
						<td>
							<select name="" id="search_factory" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产车间：</td>
						<td>
							<select name="" id="search_workshop" class="input-small">
							</select>
						</td>
						<td>&nbsp;进仓日期：</td>
						<td>
						    <input id="search_date_start" class="input-medium" style="width:90px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"> -
						</td>
						<td>
							<input id="search_date_end" class="input-medium" style="width:90px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">						
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
						<td>&nbsp;计划批次：</td>
						<td>
							<select name="" id="search_batch" class="input-small">
								<option value=''>全部</option>
							</select>							 
						</td>
						<td>&nbsp;生产线别：</td>
						<td>
							<select name="" id="search_line" class="input-small">
							</select>
						</td>
						<td style="padding-right:2px">
						    &nbsp;&nbsp;<input type="button"
							class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						<td>
						    <input type="button"
							class="btn btn-sm btn-success" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						</td>
					</tr>
				</table>
             </form>

			 <div class="row">
				<div class="col-xs-12" style="width: calc(100vw + 20px)">
					<table id="tableResult"
						class="table table-striped table-bordered table-hover" style="font-size: 12px; width:1300px;overflow-x:auto ">
					</table>	
				</div>
			</div>
			<div id="dialog-edit" class="hide">
				<form id="" class="form-horizontal">
					<div class="form-group">
					    <div  style="float:left;width:100%">
							<label style="float:left;width:13%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;物料描述</label>
							<div style="float:left;width:73%" class="col-sm-8">
								<input type="text" id="edit_mat_description" class="input-medium" style="width:100%" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;自制件类型</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_zzj_type" readonly="readonly"/>
							</div>
						</div>
					    <div style="float:left;width:55%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>*&nbsp;订单编号</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_order_no" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;订单描述</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_order_desc" readonly="readonly"/>
							</div>
						</div>
					    <div style="float:left;width:55%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;生产工厂</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_factory_name" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div  style="float:left;width:45%">
						    <label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;生产车间</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_workshop_name" readonly="readonly"/>
							</div>
						</div>
						<div  style="float:left;width:55%">
						    <label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;生产线别</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_line_name" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div  style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;生产批次</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<select class="input-medium" id="edit_batch" ></select>
							</div>
						</div>
						<div  style="float:left;width:55%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;进仓数量</label>
							<div style="float:left;width:70%" class="col-sm-8">
							    <input type="hidden" id="edit_old_quantity" />
								<input type="text" class="input-medium" id="edit_quantity" />
							</div>
						</div>
					</div>
					<div class="form-group">
					    <div style="float:left;width:45%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right"><font size="3" color="red">*</font>&nbsp;进仓日期</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input id="edit_business_date" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">						
							</div>
						</div>
					    <div  style="float:left;width:55%">
							<label style="float:left;width:30%" class="col-sm-3 control-label no-padding-right">&nbsp;电泳加工商</label>
							<div style="float:left;width:70%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_vendor" />
							</div>
						</div>
					</div>
					
					<div class="form-group">
					    <div style="float:left;width:100%">
							<label style="float:left;width:13%" class="col-sm-3 control-label no-padding-right">&nbsp;备注</label>
							<div style="float:left;width:73%" class="col-sm-8">
								<input type="text" class="input-medium" id="edit_memo" style="width:100%"/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div><!-- /.main-content -->
		
		</div><!-- /.main-container -->
		<script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../assets/js/ace/elements.onpage-help.js"></script>
		<script src="../assets/js/ace/ace.onpage-help.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
	    <script src="../assets/js/buttons.html5.js"></script>
	    <script src="../assets/js/bootstrap-tag.min.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/zzj/electrophoresisEnter.js"></script>
    </body>
</html>