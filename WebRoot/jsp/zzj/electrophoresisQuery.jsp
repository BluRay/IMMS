<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>电泳件查询</title>
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
						<td>
						<input type="text" style="height: 30px;width:90px"
							class="input-medium revise" placeholder="订单编号..." 
							id="search_order_no" value='${order_no }' order_id="${order_id }"/>
						<input type="hidden" id="search_totalkind" value="${total_kind }"/>
						</td>
						<td>&nbsp;订单描述：</td>
						<td>
						    <input type="text" style="height:30px;width:180px;" placeholder="订单描述..."
							class="input-medium revise" id="search_order_desc" value="${order_desc}"/>
						</td>
						<td>&nbsp;<font size="3" color="red">*</font>生产工厂：</td>
						<td>
							<select name="" id="search_factory" class="input-small">
							</select>
							<input type="hidden" id="search_default_factory_id" value="${factory_id }"/>
						</td>
						<td>&nbsp;生产车间：</td>
						<td>
							<select name="" id="search_workshop" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产线别：</td>
						<td>
							<select name="" id="search_line" class="input-small">
							</select>
						</td>
						<td>&nbsp;使用车间：</td>
						<td>
							<select name="" id="search_use_workshop" class="input-small">
							</select>
						</td>
					</tr>
					<tr>
						<td>自制件类别：</td>
						<td>
							<select name="" id="search_zzj_type" class="input-small" style="width:90px">
								<option value=''>全部</option>
							</select>
							<input type="hidden" id="search_default_zzj_type" value="${zzj_type }"/>							 
						</td>
						<td>&nbsp;物料描述：</td>
						<td><input type="text" style="height: 30px;width:180px;"
							class="input-medium revise" placeholder="物料描述..." id="search_mat_desc" />
						</td>
						<td class="batch">&nbsp;计划批次：</td>
						<td class="batch">
							<select name="" id="search_batch" class="input-small">
								<option value=''>全部</option>
							</select>							 
						</td>
						<td>&nbsp;筛选：</td>
						<td>
							<select name="" id="search_kind" class="input-small">
								<option value=''>全部</option>
								<option value='1'>已自制入库</option>
								<option value='2'>已外发</option>
								<option value='3'>未外发</option>
								<option value='4'>已进仓</option>
								<option value='5'>已外发未进仓</option>
							</select>							 
						</td>
						<td>
							<label>
								<input name="type" type="radio" value="0" checked>按批次 
							</label> 
							<label>
								<input name="type" type="radio" value="1" />按订单
							</label> 
						</td>
						<td style="padding-right:2px">
						    &nbsp;&nbsp;<input type="button"
							class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						</td>
					</tr>
				</table>
             </form>

			 <div class="row">
				<div class="col-xs-12" style="width: calc(100vw + 20px)">
					<table id="tableResult"
						class="table table-striped table-bordered table-hover" style="font-size: 12px; ">
					</table>	
				</div>
			</div>
		</div><!-- /.main-content -->
		
		</div><!-- /.main-container -->
		<script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/ace-elements.min.js"></script>
		<script src="../assets/js/ace/elements.onpage-help.js"></script>
		<script src="../assets/js/ace/ace.onpage-help.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
	    <script src="../assets/js/buttons.html5.js"></script>
	    <script src="../assets/js/bootstrap-tag.min.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/zzj/electrophoresisQuery.js"></script>
    </body>
</html>