<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
			<div class="breadcrumbs ace-save-state" id="breadcrumbs">
				<ul class="breadcrumb">
					<li><i class="ace-icon fa fa-home home-icon"></i><a
						href="<%=request.getContextPath()%>/index">首页</a></li>
					<li><a href="#">订单导入</a></li>
					<li class="active">订单配置导入</li>
				</ul>
				<!-- /.breadcrumb -->

				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<span class="input-icon"> <input type="text"
							placeholder="Search ..." class="nav-search-input"
							id="nav-search-input" autocomplete="off" /><i
							class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</form>
				</div>
				<!-- /.nav-search -->
			</div>

			<div class="page-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单编号..." value=""
								id="search_order_no" /></td>
							<td>订单名称：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单名称..." value=""
								id="search_order_name" /></td>
							<td>生产年份：</td>
							<td><select name="" id="search_productive_year"
								class="input-small">
							</select></td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
							</td>
						</tr>
					</table>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<table id="tableOrder"
							class="table table-striped table-bordered table-hover"
							style="font-size: 12px;">
						</table>
					</div>
				</div>
			</div>

			<div id="dialog-config" class="hide">
				<div id="" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="order">*&nbsp;订单：</label>
						<div class="col-sm-9">
							<p style="width:98%;margin-bottom: 4px;font-size: 14px;margin-top: 4px;"id="order" >D2017003 K7 200台</p>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="configName">*&nbsp;配置名称：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:98%"
								placeholder="配置名称..." id="configName" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="configQty">*&nbsp;配置数量：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:98%"
								placeholder="配置数量..." id="configQty" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="materialNo">*&nbsp;总成料号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:98%"
								placeholder="总成料号..." id="materialNo" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="materialNo">*&nbsp;物料描述：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:98%"
								placeholder="物料描述..." id="materialNo" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">*&nbsp;配置信息：</label>
						<div class="col-sm-9">
							<form id="uploadForm" action="techTask!uploadChangedMaterialList.action" enctype="multipart/form-data" method="post">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xlsx" type="file"> 				
								</div>
								<div class="col-sm-4">
									<input id="btn_upload" style="margin-left: -10px;padding:0px 0px;font-size: 12px;height:35px" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach2(this.form, this.form.file.value)" type="button"> 
									<a href="../files/configDetail.xlsx">下载批导模板</a>
								</div>							
							</form>
						</div>
						
					</div>

					<div class="form-group">
						
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover">
								<thead>
									<tr>										
										<td>零部件类别</td>
										<td>物料编码</td>
										<td>零部件编号</td>
										<td>零部件名称</td>	
										<td>材料/规格</td>
										<td>类别</td>
										<td>供应商名称</td>
										<td>装配车间</td>
										<td>备注</td>										
									</tr>
								</thead>
								<tbody id="edit_factoryOrder_parameters" class="exp-table">
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			
			<div id="dialog-order_new" class="hide">
				<form id="" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">*&nbsp;订单名称</label>
						<div class="col-sm-9">
							<input type="text" class="input-medium"
								placeholder="订单名称..." id="newOrderName" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderCode">*&nbsp;订单简码</label>
						<div class="col-sm-9">
							<input type="text" class="input-medium"
								placeholder="订单简码..." id="newOrderCode" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderCode">*&nbsp;订单类型</label>
						<div class="col-sm-9">
							<select name="" id="newOrderType" class="input-medium"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="">*&nbsp;车型</label>
						<div class="col-sm-9">
							<select name="" id="newBusType"
								class="input-medium busType">
							</select>

						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="new_order_qty">*&nbsp;订单数量</label>
						<div class="col-sm-9">
							<input type="text" class="input-medium"
								placeholder="订单数量..." id="new_order_qty" />
						</div>
					</div>
 					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="">&nbsp;客户</label>
						<div class="col-sm-9">
							<input type="text" class="input-medium"
								placeholder="客户..." id="new_customer" />
						</div>
					</div> 
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="new_productive_year">*&nbsp;生产年份</label>
						<div class="col-sm-9">
							<select name="" id="new_productive_year"
								class="input-medium">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="new_delivery_date">*&nbsp;订单交期</label>
						<div class="col-sm-9">
							<input type="text" class="input-medium" placeholder="选择订单交期..."
								id="new_delivery_date"
								onClick="WdatePicker({el:'new_delivery_date',dateFmt:'yyyy-MM-dd'});" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="">产地分配</label>
						<div class="col-sm-9">
							<!-- <input type="text" class="input-medium" placeholder="选择订单交期..." id="bmsFactoryOrder" /> -->
							<table class="exp-table table">
								<thead>
									<tr>
										<th><i id="newFactoryOrder" class="fa fa-plus"
											style="cursor: pointer;color: blue;"></i>
											<%-- <button style="height:24px" class="btn btn-success btn-xs" id="editFactoryOrder"><span class="glyphicon glyphicon-plus">+</span></button> --%></th>
										<th class="col-sm-3">生产工厂</th>
										<th class="col-sm-3">数量</th>
										<th class="col-sm-3">开始</th>
										<th class="col-sm-3">结束</th>
										<!-- <th></th><th></th> -->
									</tr>
								</thead>
								<tbody id="new_factoryOrder_parameters" class="exp-table">
								</tbody>
							</table>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label no-padding-right" for="new_memo">备注</label>
						<div class="col-sm-9">
							<textarea class="input-xlarge" style="width: 355px"
								id="new_memo" rows="2"></textarea>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>	
		<!-- /.main-container -->
	</div>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/order/configUpload.js"></script>
</body>

</html>
