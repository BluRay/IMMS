<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>车型成品记录表模板</title>
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
									<select id="search_node" class="input-medium" style="height: 30px;width:120px;" >
										<option value=''>全部</option>
									</select>
								</td>						
								<td><input type="button" class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>						
									<input type="button" class="btn btn-sm btn-success" id="btnImport" value="导入" style="margin-left: 2px;"></input>
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
				<div id="create_form" class="form-horizontal">					
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="" >*&nbsp;订单：</label>
						<div class="col-sm-2">
							<input id="order" type="text" class="input-medium" style="height: 30px;width:100%;" ></input>
						</div>	
						<label class="col-sm-2 control-label no-padding-right" style="width:70px;" >*&nbsp;配置：</label>
						<div class="col-sm-2">
							<select id="order_config" class="input-medium" style="height: 30px;width:100%;" >
								<option value=''>请选择</option>
							</select>						
						</div>					
						<label class="col-sm-2 control-label no-padding-right " style="width:90px;" >*&nbsp;检验节点：</label>
						<div class="col-sm-2">
							<select id="node" class="input-medium" style="height: 30px;width:100%" ></select>
						</div>					
					</div>
					<!-- <div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="" >*&nbsp;备注：</label>
						<div class="col-sm-6">
							<textarea class="input-xlarge" style="width: 100%" id="memo" rows="2"></textarea>
						</div>
					</div> -->
					<div class="form-group">					
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">*&nbsp;模板明细：</label>
						<div class="col-sm-9">
							<form id="uploadForm" action="" enctype="multipart/form-data" method="post">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xls" type="file"> 				
								</div>
								<div class="col-sm-4">
									<input id="btn_upload" style="padding:0px 0px;font-size: 12px;height:35px" class="btn btn-primary" value="上传并导入" onclick="javascript:return upload(this.form, this.form.file.value)" type="button"> 
									<a href="../docs/prdRcdBusTypeTpl.xls">下载批导模板</a>
								</div>							
							</form>
						</div>									
					</div>
					<div class="form-group">					
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover" style="width: 872px;font-size:12px;" id="tplDetailTable">
							</table>
						</div>
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
	<script src="../js/quality/productRecordBusTypeTpl.js"></script>
</body>

</html>
