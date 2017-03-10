<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
	<head>
		<title>订单评审流程</title>
		<link rel="stylesheet" href="../../../snaker/css/style.css" type="text/css" media="all" />
		<script src="../../../snaker/jquery-1.8.3.min.js" type="text/javascript"></script>
		<script src="../../../snaker/snaker.util.js" type="text/javascript"></script>
	</head>

	<body>
		<form id="inputForm" action="<%=basePath%>/snaker/flow/process" method="post" target="mainFrame">
			<input type="hidden" name="processId" value="${processId }" />
			<input type="hidden" name="orderId" value="${orderId }" />
			<input type="hidden" name="taskId" value="${taskId }" />
			<table class="table_all" align="center" border="0" cellpadding="0"
			cellspacing="0" style="margin-top: 0px">
				<tr>
					<td class="td_table_1"><span>发起人：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" readonly="readonly" name="S_apply.operator" value="${operator  }" />
					</td>
				</tr>
				<tr>
					<td class="td_table_1"><span>客户：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" readonly="readonly" name="S_customer" value="${customer  }" />
					</td>
					<td class="td_table_1"><span>车型：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" readonly="readonly" name="S_bustype" value="${bustype  }" />
					</td>					
				</tr>
				<tr>
					<td class="td_table_1"><span>请假理由：</span></td>
					<td class="td_table_2" colspan="3">
						<textarea class="input_textarea_320" id="reason" name="S_reason"></textarea>
					</td>
				</tr>
				<tr>
					<td class="td_table_1"><span>请假天数：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" id="day" name="I_day" value="" />天
					</td>
				</tr>
				<tr>
					<td class="td_table_1"><span>部门经理：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" name="S_approveDept.operator" value="${operator }" />
					</td>
				</tr>
				<tr>
					<td class="td_table_1"><span>总经理：</span></td>
					<td class="td_table_2" colspan="3">
						<input type="text" class="input_240" name="S_approveBoss.operator" value="${operator }" />
					</td>
				</tr>
			</table>
			<table align="center" border="0" cellpadding="0"
				cellspacing="0">
				<tr align="left">
					<td colspan="1">
						<input type="submit" class="button_70px" name="submit" value="提交">
						&nbsp;&nbsp;
						<input type="button" class="button_70px" name="reback" value="返回"
							onclick="history.back()">
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
