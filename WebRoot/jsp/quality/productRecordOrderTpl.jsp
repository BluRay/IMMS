<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>订单成品记录表模板</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">
				<div class="page-content-area">
					<div id="form" class="well form-search">
					<form id="form">
						<table>
							<tr>
								<td>车型：</td>
								<td>
									<select name="" id="search_bus_type" class="input-medium carType" style="height: 30px;width:100px;" ></select>
								</td>
 								<td>订单：</td>
								<td><input style="height: 30px;width:130px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td> 
								<td>配置：</td>
								<td>
									<select name="" id="search_order_config" class="input-medium carType" style="height: 30px;width:100px;" >
										<option value=''>全部</option>
									</select>
								</td>
								<td>检验节点：</td>
								<td>
									<!-- <input type="text"  id="search_parts" class="input-medium" style="height: 30px;width:90px;" ></input> -->
									<select id="search_node" class="input-medium" style="height: 30px;width:120px;" >
										<option value=''>全部</option>
									</select>
								</td>						
								<td><input type="button" class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>						
										 <input type="button" class="btn btn-sm btn-success" id="btnCopy" value="复制" style="margin-left: 2px;"></input>
								</td>
							</tr>

						</table>
					</form>
					</div>	
					<div class="row">
					<div class="col-xs-12" id="scroll_div">
						<table id="tableResult" class="table table-striped table-bordered table-hover " style="font-size: 12px;" >
						</table>	
					</div>
					</div>
				</div>
			</div>
			<div id="dialog-config" class="hide">
				<form id="create_form" class="form-horizontal">
					<div class="form-group">							
						<div class="col-sm-4">
							<label class="control-label no-padding-right" for="" style="width: 30%;">*&nbsp;订单：</label>
							<input id="order" type="text" class="input-medium" style="height: 30px;width:50%;" ></input>
						</div>	
						<div class="col-sm-4">
							<label class="control-label no-padding-right" for="" style="width: 40%;">*&nbsp;车型：</label>
							<input id="bus_type" type="text" class="input-medium" style="height: 30px;width:50%;background-color:white" disabled></input>
						</div>					
					</div>
					<div class="form-group">	
						<div class="col-sm-4">
							<label class="control-label no-padding-right" for="" style="width: 30%;">*&nbsp;配置：</label>
							<select id="order_config" class="input-medium" style="height: 30px;width:50%;" >
								<option value=''>请选择</option>
							</select>
						</div>				
						<div class="col-sm-4">
							<label class="control-label no-padding-right " for=""  style="width: 40%;">*&nbsp;检验节点：</label>
							<select id="node" class="input-medium" style="height: 30px;width:50%" >
							</select>
						</div>		
						<div class="col-sm-4">
							<input type="button" class="btn btn-sm btn-primary" id="btnQueryTpl" value="查询" style="margin-left: 2px;"></input>						
							
						</div>		
					</div>
					<div class="form-group">					
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover" style="width: 860px;font-size:12px;" id="tplDetailTable">
							</table>
						</div>
					</div>
					
			</form>
		</div>
		
		<div id="dialog-editTplTable" class="hide">
			<div class="form-group">					
					<div class="col-sm-12">	
						<textarea rows="2"  class="input-xlarge"  style="width:100%" id="edit_content"></textarea>
					</div>
			</div>			
		</div>
		
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
	<script src="../js/quality/productRecordOrderTpl.js"></script>
</body>

</html>
