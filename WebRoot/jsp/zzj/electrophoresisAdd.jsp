<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>电泳件新增</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">

			<div id="form" class="well form-search">
				<table>
					<tr>
					    <td><font size="3" color="red">*</font>订单编号：</td>
						<td><input type="text" style="height: 30px;width:90px"
							class="input-medium revise" placeholder="订单编号..." 
							id="search_order_no" /></td>
						<td>&nbsp;订单描述：</td>
						<td>
						    <input type="text" style="height:30px;width:220px;" placeholder="订单描述..."
							class="input-medium revise" id="search_order_desc" />
						</td>
						<td>&nbsp;<font size="3" color="red">*</font>生产工厂：&nbsp;
							<select id="search_factory" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产车间：</td>
						<td>
							<select id="search_workshop" class="input-small">
							</select>
						</td>
						<td>&nbsp;生产线别：</td>
						<td>
							<select id="search_line" class="input-small">
							</select>
						</td>
					<tr>	
					<tr>
					    <td class="business_date_search">&nbsp;&nbsp;发货日期：</td>
						<td>
						    <input id="business_date" class="input-medium" style="width:90px" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">	
						</td>
						<td>
						    <font size="3" color="red">*</font>物料描述：
			            </td>
						<td><input type="text" style="width:220px;height: 30px;"
							class="input-medium revise"  value=""
							id="search_mat_desc" placeholder="请输入物料描述..."/>
							<i id="" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>&nbsp;&nbsp;
						</td>
						<td>
						    <input type="button"
							class="btn btn-sm btn-primary" id="btnConfirm" value="确认" style="margin-left: 2px;"></input>
							<input type="button"
							class="btn btn-sm btn-success" id="btnSave" value="保存" style="margin-left: 2px;"></input>
							<input type="button"
							class="btn btn-sm btn-info" id="btnBack" value="返回" style="margin-left: 2px;"></input>
						</td>
					</tr>
				</table>
			</div>
<!--             <div class="row"> -->
				<div  data-spy="scroll" data-target="#navbar-example" data-offset="0" 
	               style="height:420px;overflow:auto; position: relative;margin-top:2px;">
					<table id="tableResult"
						class="table table-striped table-bordered table-hover" style="font-size: 12px;table-layout:fixed;width:1800px;overflow-x:auto;">
					     <thead>
					        <tr>
					            <th style="text-align:center;width:30px"></th>
					            <th style="text-align:center;width:40px">序号</th>
					            <th style="text-align:center">物料描述</th>
					            <th style="text-align:center;width:80px">自制件类别</th>
					            <th style="text-align:center">订单</th>
					            <th style="text-align:center;width:80px">生产批次</th>
					            <th style="text-align:center;width:75px" id="quantity">发货数量</th>
					            <th style="text-align:center;width:100px" class="business_date_title">发货日期</th>
					            <th style="text-align:center">电泳加工商</th>
					            <th style="text-align:center">备注</th>
					            <th style="text-align:center;width:80px">生产工厂</th>
					            <th style="text-align:center;width:65px">生产车间</th>
					            <th style="text-align:center;width:65px">生产线别</th>
					        </tr>
					    </thead>
					    <tbody></tbody>
					</table>	
				</div>
<!-- 			</div> -->
<!-- 			<div class="row"> -->
<!-- 				<div style="height:440px;overflow-y:auto"> -->
<!-- 					<table id="tableResult"  -->
<!-- 						class="table table-striped table-bordered table-hover" -->
<!-- 						style="font-size: 12px;"> -->
<!-- 					    <thead> -->
<!-- 					        <tr> -->
<!-- 					            <th style="text-align:center"></th> -->
<!-- 					            <th style="text-align:center">序号</th> -->
<!-- 					            <th style="text-align:center">物料描述</th> -->
<!-- 					            <th style="text-align:center">自制件类别</th> -->
<!-- 					            <th style="text-align:center">订单</th> -->
<!-- 					            <th style="text-align:center">生产批次</th> -->
<!-- 					            <th style="text-align:center">发货数量</th> -->
<!-- 					            <th style="text-align:center">发货日期</th> -->
<!-- 					            <th style="text-align:center">电泳加工商</th> -->
<!-- 					            <th style="text-align:center">备注</th> -->
<!-- 					            <th style="text-align:center">生产工厂</th> -->
<!-- 					            <th style="text-align:center">生产车间</th> -->
<!-- 					            <th style="text-align:center">生产线别</th> -->
<!-- 					        </tr> -->
<!-- 					    </thead> -->
<!-- 					    <tbody></tbody> -->
<!-- 					</table> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div><!-- /.main-content -->
		
	</div><!-- /.main-container -->
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/ace-elements.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
    <script src="../assets/js/buttons.html5.js"></script>
    <script src="../assets/js/bootstrap-tag.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/zzj/electrophoresisAdd.js"></script>
</body>
	
</html>