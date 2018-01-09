<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>流程发起</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.custom.min.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	
	<!-- 身  -->
	<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
				
				<div class="page-content">
					<form action="<%=basePath%>/materialPurchase/applySave" method="post" id="form"> <!-- b103b4fc137743979aa248307c4bf553 -->
					<input type="hidden" id="processId" value="${processId}" />
					<input type="hidden" id="orderId" value="${orderId}" />
					<input type="hidden" id="taskId" value="${taskId}" />
					<input type="hidden" id="divisionId"  value="${divisionId}" />
					<input type="hidden" id="departmentId" value="${departmentId}" />
					<input type="hidden" id="departmentManager"/>
					<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
					            style="font-size: 14px;" role="grid">
						 <tr role="row" class="odd">
				            <td>&nbsp;申请人工号：</td>
							<td>
							    <input value="${staffNumber}" placeholder="" style="width:120px" class="col-sm-10" type="text">
							    <input value="${userId}" id="userId" type="hidden">
							</td>
							<td>&nbsp;申请人姓名：</td>
							<td><input value="${userName}" id="applier" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;申请部门：</td>
							<td><input id="department" value="${department }" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;申请日期：</td>
							<td><input id="apply_date" value="${materialPurchase.apply_date }" onClick="WdatePicker({el:'paintonlineDate',dateFmt:'yyyy-MM-dd'});" placeholder="" style="width:120px" class="col-sm-10" type="text"></td>
						</tr>
						<tr>
						    <td>&nbsp;采购类型：</td>
							<td><select id="apply_type" style="width:120px" class="col-sm-10"></select></td>
							<td>&nbsp;成本中心：</td>
							<td><input id="cost_center" value="${materialPurchase.cost_center }" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;申请类别：</td>
							<td><select id="apply_kind" style="width:120px" class="col-sm-10"></select></td>
							<td>&nbsp;成本会计：</td>
							<td><select id="accountant" style="width:120px" class="col-sm-10" disabled="disabled"></select></td>
						</tr>
					    <tr>
					        <td>&nbsp;采购项目负责人：</td>
							<td><select id="purchase_leader" style="width:120px" class="col-sm-10"></select></td>						
							<td>&nbsp;物料名称：</td>
							<td><input id="material_name" value="${materialPurchase.material_name }" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;物料编码：</td>
							<td><input id="material_code" value="${materialPurchase.material_code }" style="width:120px" class="col-sm-10" type="text"></td>	    
							<td>&nbsp;规格/型号：</td>
							<td><input id="specification" value="${materialPurchase.specification }" style="width:120px" class="col-sm-10" type="text"></td>						
				        </tr>
						<tr>
						    <td>&nbsp;使用地区：</td>
							<td><input id="useage_place" value="${materialPurchase.useage_place }" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;需求数量：</td>
							<td><input id="quantity" value="${materialPurchase.quantity }" style="width:120px" class="col-sm-10" type="text"></td>
							<td>&nbsp;要求到位时间：</td>
							<td><input id="require_date" value="${materialPurchase.require_date }" onClick="WdatePicker({el:'require_date',dateFmt:'yyyy-MM-dd'});" style="width:120px" class="col-sm-10" type="text"></td>
						    <td>&nbsp;主管领导：</td>
							<td><select id="apply_leader" style="width:120px" class="col-sm-10"></select></td>						
						</tr>
						<tr role="row" class="even">
							<td>&nbsp;技术要求：</td>
							<td colspan=7>
							<input id="techcical_require" style="width: 720px;" placeholder="..."></input>
							</td>
						</tr>
						<tr role="row" class="even">
							<td>&nbsp;申请理由：</td>
							<td colspan=7>
							<textarea id="apply_reason" style="width: 720px;" placeholder="..." rows="2"></textarea>
							</td>
						</tr>
						<tr role="row" class="even">
							<td>&nbsp;附件：</td>
							<td colspan=7>
							<input id="file" style="width: 720px;" name="file" type="file"></input>
							</td>
						</tr>
						<tr role="row" class="even">
							<td>&nbsp;备注：</td>
							<td colspan=7>
							<textarea id="remark" style="width: 720px;" placeholder="..." rows="2"></textarea>
							</td>
						</tr>
                         <tr>
						    <td colspan=8 align="right">
						        <input type="button" class="btn btn-sm btn-info" id="btnSave" value="提交" style="margin-left: 2px;"></input>&nbsp;
						        <input type="button" class="btn btn-sm btn-info" id="btnBack" value="返回" style="margin-left: 2px;"></input>&nbsp;&nbsp;&nbsp;
						    </td>
						</tr>
					</table>
					</form>
                </div>
			</div>
			<!-- /.main-container -->
		</div>
		<script src="<%=basePath%>/js/jquery-2.1.0.min.js"></script>
		<script src="<%=basePath%>/js/datePicker/WdatePicker.js"></script>
		<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.gritter.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.dataTables.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="<%=basePath%>/assets/js/bootstrap3-typeahead.js"></script>
		<script src="<%=basePath%>/js/jquery.form.js"></script>
		<script src="<%=basePath%>/js/common.js"></script>
		<script src="<%=basePath%>/js/flow/materialPurchase/apply.js"></script>
   </body>

</html>
