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
<html lang="en">
	<head>
		<title>紧急性物料申请采购流程</title>
<%-- 		<link rel="stylesheet" href="<%=basePath%>/snaker/css/style.css" type="text/css" media="all" /> --%>
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.custom.min.css" />
<%-- 		<script src="<%=basePath%>/snaker/jquery-1.8.3.min.js" type="text/javascript"></script> --%>
<%-- 		<script src="<%=basePath%>/snaker/snaker.util.js" type="text/javascript"></script> --%>
	    
	</head>

<!-- 	<body> -->
<!-- 		<form id="inputForm" action="" method="post" target="mainFrame"> -->
<%-- 			<input type="hidden" name="processId" value="${processId }" /> --%>
<%-- 			<input type="hidden" name="orderId" value="${orderId }" /> --%>
<%-- 			<input type="hidden" name="taskId" value="${taskId }" /> --%>
<%-- 			<c:forEach items="${vars}" var="item"> --%>
<!-- 			<table class="table_all" align="center" border="0" cellpadding="0" -->
<!-- 			cellspacing="0" style="margin-top: 0px"> -->
<!-- 				<tr> -->
<!-- 					<td class="td_table_1"><span>请假人名称：</span></td> -->
<!-- 					<td class="td_table_2" colspan="3"> -->
<%-- 						&nbsp;${item['apply.operator']} --%>
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<!-- 					<td class="td_table_1"><span>请假理由：</span></td> -->
<!-- 					<td class="td_table_2" colspan="3"> -->
<%-- 						&nbsp;${item['reason'] } --%>
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<!-- 					<td class="td_table_1"><span>请假天数：</span></td> -->
<!-- 					<td class="td_table_2" colspan="3"> -->
<%-- 						&nbsp;${item['day'] }天 --%>
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<!-- 					<td class="td_table_1"><span>部门经理：</span></td> -->
<!-- 					<td class="td_table_2"> -->
<%-- 						&nbsp;${item['approveDept.operator']} --%>
<!-- 					</td> -->
<!-- 					<td class="td_table_1"><span>总经理：</span></td> -->
<!-- 					<td class="td_table_2"> -->
<%-- 						&nbsp;${item['approveBoss.operator']} --%>
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 			</table> -->
<%-- 			</c:forEach> --%>
<!-- 		</form> -->
		<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
			  
				<div class="page-content">
				    <c:forEach items="${vars}" var="item">
					<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
					     style="font-size: 14px;" role="grid" aria-describedby="tableData_info">
						
						<tr class="odd">
				
							<td>申请人：</td>
							<td>${item['user_name'] }</td>
							<td>&nbsp;申请部门：</td>
							<td>${item['department'] }</td>
							<td>&nbsp;申请日期：</td>
							<td>${item['apply_date'] }</td>
							<td>采购类型：</td>
							<td>${item['purchase_type'] }</td>
						</tr>
						<tr>
							<td>&nbsp;项目类型：</td>
							<td>${item['apply_type'] }</td>
							<td>&nbsp;物料编号：</td>
							<td>${item['material_code'] }</td>
							<td>&nbsp;物料名称：</td>
							<td>${item['material_name'] }</td>
							<td>&nbsp;规格/型号：</td>
							<td>${item['specification'] }</td>
						</tr>
						<tr>
							<td>&nbsp;采购项目负责人：</td>
							<td>${item['purchase_leader'] }</td>
							<td>&nbsp;成本中心：</td>
							<td>${item['cost_center'] }</td>
							<td>&nbsp;成本会计：</td>
							<td>${item['accountant'] }</td>
							<td>&nbsp;要求到位时间：</td>
							<td>${item['require_date'] }</td>
						</tr>
						<tr>
							<td>使用地区：</td>
							<td>${item['useage_place'] }</td>
							<td>&nbsp;采购数量：</td>
							<td>${item['quntity'] }</td>
							<td>&nbsp;BOM：</td>
							<td>${item['bomdemandNode'] }</td>
							<td>&nbsp;附件：</td>
							<td></td>
						</tr>
						<tr>
							<td>技术要求：</td>
							<td colspan='3'>${item['techcical_require'] }</td>
							<td>申请理由：</td>
							<td colspan='3'>${item['apply_reason'] }</td>
						</tr>
						<tr>
							<td>其他：</td>
							<td colspan='7'>${item['remark'] }</td>
						</tr>
<!-- 						<tr> -->
<!-- 							<td colspan=6 align="right"> -->
<!--                                <input type="button" class="btn btn-sm btn-info" id="btnBack" value="返回" style="margin-left: 2px;"></input>&nbsp;&nbsp;&nbsp; -->
<!--                             </td> -->
<!-- 						</tr>		 -->
					</table>
				</c:forEach>
                </div>
			</div>
			<!-- /.main-container -->
		</div>
		<script src="<%=basePath%>/js/jquery-2.1.0.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.gritter.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.dataTables.min.js"></script>
		<script src="<%=basePath%>/assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="<%=basePath%>/assets/js/bootstrap3-typeahead.js"></script>
		<script src="<%=basePath%>/js/jquery.form.js"></script>
		<script src="<%=basePath%>/js/common.js"></script>
		<script type="text/javascript">
// 		    $(function(){
// 		    	$("#btnBack").click(function(){
//             		window.open("/BMS/order/review/internalReview","_parent");
//                 });
// 		    });
		</script>
   </body>

</html>
