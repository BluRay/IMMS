<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>自制件下料明细变更</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" /> 

</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td><span style="color: red;">*</span>订单编号：</td>
							<td style="min-width: 250px;"><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:90px" type="text"><span id="searchOrderInfo"></span></td>
							<td>&nbsp;<span style="color: red;">*</span>工厂：</td>
							<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>车间：</td>
							<td><select id="search_workshop" class="input-small" style="height: 30px;width:90px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>线别：</td>
							<td><select id="search_line" class="input-small" style="height: 30px;width:70px"></select></td>
							<td>批次：</td>
							<td>
							<select id="search_batch" class="input-small" style="height: 30px;width:90px">
							<option value="">全部</option></select>
							</td>
							<td colspan=2>
							<input id="ajaxQuery" style="margin-top: 5px;margin-left:2px;" 
							    type="button" class="btn btn-sm btn-primary" value="查询"/>&nbsp;&nbsp;
							<input type="button"
								class="btn btn-sm btn-success btnSave" id="btnAdd" value="新增"
								style="margin-top: 5px;margin-right: 2px"></input>&nbsp;&nbsp;
							</td>
						</tr>
					</table>
				</div>
				<div class="row"  >
					<div class="col-xs-12" style="width: calc(100vw + 22px)">
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;table-layout:fixed;width:100%;overflow-x:auto;" >
						    <thead>
						       <tr>
						          <th align="center">订单编号</th>
						          <th align="center">订单描述</th>
						          <th align="center">生产工厂</th>
						          <th align="center">生产车间</th>
						          <th align="center">生产线别</th>
						          <th align="center">生产批次</th>
						          <th align="center">批次数量</th>
						          <th align="center">计划开始日期</th>
						          <th align="center">计划完成日期</th>
						          <th align="center">状态</th>
						          <th align="center">维护人</th>
						          <th align="center">维护时间</th>
						          <th align="center">操作</th>
						       </tr>
						    </thead>
						</table>
					</div>
				</div>
         		<div style="position:absolute;z-index:999;top:50%;left:50%;display: none;" class="divLoading" >
			          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
			    </div>
			    
			 <div id="dialog-add" class="hide">
			    <form id="addForm" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产工厂</label>
						<div class="col-sm-9">
							<select id="add_factory" name="factory"  class="input-small" style="height: 30px;width:120px"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产车间</label>
						<div class="col-sm-9">
							<select id="add_workshop" name="workshop" class="input-small" style="height: 30px;width:120px"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产线别</label>
						<div class="col-sm-9">
							<select id="add_line" name="line" class="input-small" style="height: 30px;width:120px"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;订单编号</label>
						<div class="col-sm-9">
							<input type="text" style="height: 30px;width:90px" class="input-medium" placeholder="订单编号..." id="add_order_no"  name="order_no"/>&nbsp;<span id="addOrderInfo"></span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产批次</label>
						<div class="col-sm-9">
							第<input type="text"  name="batch"  class="input-medium" style="width: 30px;" placeholder="" id="add_batch"  onchange="checkValue(this,'add_batch');" />批&nbsp;
							&nbsp;<input type="text" class="input-medium" style="width: 40px;" placeholder="" id="add_quantity" name="quantity" onchange="checkValue(this,'add_quantity');"  />车付
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">&nbsp;生产日期</label>
						<div class="col-sm-9">
							<input id="add_start_date"  name="start_date" placeholder="开始时间..." style="height: 30px;width:125px" onclick="WdatePicker({el:'add_start_date',dateFmt:'yyyy-MM-dd'});" type="text">-<input id="add_end_date" name="end_date" placeholder="结束时间..." style="height: 30px;width:125px" onclick="WdatePicker({el:'add_end_date',dateFmt:'yyyy-MM-dd'});" type="text">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="">备注</label>
						<div class="col-sm-9">
							<textarea class="input-xlarge"  name="memo" style="width: 355px" id="add_memo" rows="2"></textarea>
						</div>
					</div>
			</form>
	</div>
	
						 <div id="dialog-edit" class="hide">
						    <form id="editForm" class="form-horizontal">
						    	<input id="id" type="hidden" />
						    	<input id="order_id" type="hidden" />
						    	<input id="old_quantity" type="hidden" />
						    	<input id="production_qty" type="hidden" />
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产工厂</label>
									<div class="col-sm-9">
										<select disabled="disabled"  id="edit_factory" name="factory"  class="input-small" style="height: 30px;width:120px"></select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产车间</label>
									<div class="col-sm-9">
										<select id="edit_workshop"  disabled="disabled" name="workshop" class="input-small" style="height: 30px;width:120px"></select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产线别</label>
									<div class="col-sm-9">
										<select id="edit_line"  disabled="disabled"  name="line" class="input-small" style="height: 30px;width:120px"></select>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;订单编号</label>
									<div class="col-sm-9">
										<input type="text" readonly="readonly" style="height: 30px;width:90px" class="input-medium" placeholder="订单编号..." id="edit_order_no"  name="order_no"/>&nbsp;<span id="editOrderInfo"></span>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">*&nbsp;生产批次</label>
									<div class="col-sm-9">
										第<input type="text"  readonly="readonly" name="batch"  class="input-medium" style="width: 30px;" placeholder="" id="edit_batch"  onchange="checkValue(this,'edit_batch');" />批&nbsp;
										&nbsp;<input type="text" class="input-medium" style="width: 40px;" placeholder="" id="edit_quantity" name="quantity" onchange="checkValue(this,'edit_quantity');"  />车付
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="">&nbsp;生产日期</label>
									<div class="col-sm-9">
										<input id="edit_start_date"  name="start_date" placeholder="开始时间..." style="height: 30px;width:125px" onclick="WdatePicker({el:'edit_start_date',dateFmt:'yyyy-MM-dd'});" type="text">-<input id="edit_end_date" name="end_date" placeholder="结束时间..." style="height: 30px;width:125px" onclick="WdatePicker({el:'edit_end_date',dateFmt:'yyyy-MM-dd'});" type="text">
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label no-padding-right" for="">&nbsp;调整原因</label>
									<div class="col-sm-9">
										<textarea class="input-xlarge"  name="change_reason" style="width: 355px" id="edit_change_reason" rows="2"></textarea>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label no-padding-right" for="">备注</label>
									<div class="col-sm-9">
										<textarea class="input-xlarge"  name="memo" style="width: 355px" id="edit_memo" rows="2"></textarea>
									</div>
								</div>
						</form>
				</div>
			    
         </div>
	</div>	
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/tableExport.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
    <script src="../js/zzj/zzjPlan.js"></script>
</body>

</html>
