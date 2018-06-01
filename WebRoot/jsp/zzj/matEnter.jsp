<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>产量录入</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 

<!-- <link rel="stylesheet" href="../assets/css/buttons.dataTables.css" />  -->
<style>
.form-group {
	margin-bottom: 4px;
 }
</style>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">		
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td>
								<select name="" id="search_factory" class="input-medium" style="width:100px;"></select>
							</td>
							<td style="text-align:right">线别：</td>
							<td>
								<select name="" id="search_line" class="input-medium" style="width:90px;"></select>
							</td>
							<td style="text-align:right">订单：</td>
							<td>
								<input name=""  type="text" id="search_order" class="input-medium" style="width:110px;height: 30px;"></input>
							</td>
							<td style="text-align:right">自制件类别：</td>
							<td>
								<select name="" id="search_zzj_type" class="input-medium" style="width:90px;">
									<option value=''>全部</option>
								</select>
							</td>											
							<td style="text-align:right">生产日期：</td>
							<td>
								<input id="start_date" placeholder="开始时间..." style="height: 30px;width:100px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"> - 
								<input id="end_date" placeholder="结束时间..." style="height: 30px;width:100px" type="text" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});">
							</td>
						</tr>
						
						<tr>
						<td style="text-align:right">车间：</td>
						<td>
							<select name="" id="search_workshop" class="input-medium" style="width:100px;"></select>
						</td>					
						<td style="text-align:right">生产班组：</td>
						<td>
							<select name="" id="search_team" class="input-medium" style="width:90px;">
									<option value=''>全部</option>
								</select>
						</td>		
						<td style="text-align:right">生产工序：</td>
						<td >
							<select name="" id="search_process" class="input-medium" style="width:110px;">
									<option value=''>全部</option>
								</select>
						</td>			
							
						<td style="text-align:right">生产批次：</td>
							<td>
								<select name="" id="search_batch" class="input-medium" style="width:90px;">
									<option value=''>全部</option>
								</select>
							</td>	
					    <td style="text-align:right">物料描述：</td>
						<td >
							<input id="search_mat_desc" style="width:180px;height: 30px;" class="input-medium" type="text">
						</td>
						<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: -20px;top:1px;" type="button">			
							<input class="btn btn-sm btn-success" id="btnAdd" value="新增" style="top:1px;" type="button">							
						</td>
						<td id="count_info" style='color:blue;padding-left: 20px;text-align:center'></td>
						</tr>
						</table>
					</form>

					<form id="add_form" class="well form-search" style="display:none">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">工厂：</td>
							<td>
								<select name="" id="add_factory" class="input-medium" style="width:100px;" disabled></select>
							</td>
							<td style="text-align:right">线别：</td>
							<td>
								<select name="" id="add_line" class="input-medium" style="width:90px;" ></select>
							</td>
							<td style="text-align:right">订单：</td>
							<td>
								<input name=""  type="text" id="add_order" class="input-medium" style="width:110px;height: 30px;"></input>
							</td>						
							<td style="text-align:right">生产批次：</td>
							<td>
								<select name="" id="add_batch" class="input-medium" style="width:90px;">
									<option value=''>全部</option>
								</select>
							</td>					
							<td style="text-align:right">生产日期：</td>
							<td>
								<input id="add_prod_date"  style="height: 30px;width:90px" type="text" onClick="WdatePicker({el:'add_prod_date',dateFmt:'yyyy-MM-dd',onpicked:function(){chageProdDate();}});"> 
							</td>
						</tr>
						
						<tr>
						<td style="text-align:right">车间：</td>
						<td>
							<select name="" id="add_workshop" class="input-medium" style="width:100px;"disabled></select>
						</td>					
						<td style="text-align:right">生产班组：</td>
						<td>
							<select name="" id="add_team" class="input-medium" style="width:90px;">
									<option value=''>全部</option>
								</select>
						</td>		
						<td style="text-align:right">生产工序：</td>
						<td >
							<select name="" id="add_process" class="input-medium" style="width:110px;">
									<option value=''>全部</option>
								</select>
						</td>			
							
					    <td style="text-align:right">物料描述：</td>
						<td colspan=3>
							<input id="add_mat_desc" style="width:100%;height: 30px;" class="input-medium" type="text">
						</td>
						<td>
							<input class="btn btn-sm btn-success" id="btnSave" value="保存" style="margin-left: 10px;top:1px;" type="button">			
							<input class="btn btn-sm btn-default " id="btnCancel" value="返回" style="top:1px;" type="button">							
						</td>
						<td id="count_info" style='color:blue;padding-left: 20px;text-align:center'></td>
						</tr>
						</table>
					</form>
					<div class="row" >
						<div class="col-xs-12"  id="div_result">										
							<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow-x:auto;width:1600px;table-layout:fixed;white-space: normal;word-break:break-all;">
							</table>	
						</div>
						<div class="col-xs-12" id="div_add" >
							<table id="tableAdd" class="table table-striped table-bordered table-hover" style="font-size: 12px;width:1350px;">
								<!-- <thead>
									<tr>
									<th>物料描述</th>
									<th>订单</th>
									<th>自制件类别</th>
									<th>生产数量</th>
									<th>线别</th>
									<th>班组</th>
									<th>生产工序</th>
									<th>生产批次</th>
									<th>生产日期</th>
									<th>材料规格</th>
									<th>下料尺寸</th>
									</tr>
								</thead>
								<tbody></tbody> -->
							</table>
						</div>
					</div>
			<!-- /.main-container -->
					<div class="form-horizontal hide" id="update_dialog"  style="width:400px;height:'400px'">
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产工厂:</label>
							<div class="col-xs-9">
								<input id="edit_factory" type="text"  class="input-medium" style="width:37%;height:30px;" disabled>
								<input id="edit_workshop" type="text"  class="input-medium" style="width:37%;height:30px;" disabled>
								<input id="edit_line" type="text"  class="input-medium" style="width:21%;height:30px;" disabled>
				
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">物料描述:</label>
							<div class="col-xs-9">
								<!-- <input id="vinText"  type="text" class="input-medium" style="width:100%;height:30px;"/> -->
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="edit_mat_desc" type="text" class="input-medium"  
										style="width:100%;height:30px;" readonly>			
								</span>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">自制件类别:</label>
							<div class="col-xs-9">
								<input type="text" id="edit_zzj_type" class="input-medium" style="width:100%" disabled>
									
							</div>
						</div>
						
						<!-- <div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">材料规格:</label>
							<div class="col-xs-9">
								<input type="text"  id="specification" class="input-medium" style="width:100%" disabled>
									
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">下料尺寸:</label>
							<div class="col-xs-9">
								<input type="text"  id="filling_size" class="input-medium" style="width:100%" disabled>
									
							</div>
						</div> -->
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right" style="text-align:right">订单:</label>
							<div class="col-xs-9">
								<input id="edit_order" type="text" class="input-medium" style="width:100%;height:30px;" value="${order_desc}" readonly/>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产批次:</label>
							<div class="col-xs-9">
								<select id="edit_batch" class="input-medium" style="width:40%">
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产数量:</label>
							<div class="col-xs-9">
								<input id="edit_output" type="text" class="input-medium" style="width:100%;height:30px;" />
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产日期:</label>
							<div class="col-xs-9">
								<input id="edit_product_date" type="text" class="input-medium" style="width:100%;height:30px;" 
								onclick="WdatePicker({el:'edit_product_date',dateFmt:'yyyy-MM-dd'});" />
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产工序:</label>
							<div class="col-xs-9">
								<select id="edit_process" class="input-medium" style="width:40%">
								</select>
							</div>
						</div>		
								
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产班组:</label>
							<div class="col-xs-9">
								<select id="edit_team" class="input-medium" style="width:100%">
								</select>
							</div>
						</div>	
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">备注:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="edit_memo" rows="1" style="width:100%;"></textarea>
							</div>
						</div>				
					</div>
		</div>
	</div>
	
	    <script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/dataTables.rowGroup.js"></script>
		<script src="../assets/js/ace/elements.onpage-help.js"></script>
		<script src="../assets/js/ace/ace.onpage-help.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/hr/mergeTableCell.js"></script>
		<script src="../js/exportTable2Excel.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/zzj/matEnter.js"></script>
</body>

</html>
