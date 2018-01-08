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
		<title>审批结果</title>
<%-- 		<link rel="stylesheet" href="<%=basePath%>/snaker/css/style.css" type="text/css" media="all" /> --%>
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.custom.min.css" />
	</head>

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
				
							<td>审批结果：</td>
							<td>${item['approvals.result'] }</td>
							<td>&nbsp;审批人：</td>
							<td>${item['approvals.operator'] }</td>
							<td>审批日期：</td>
							<td>${item['approvals.operate_time'] }</td>
						</tr>
						<tr>
							<td>&nbsp;审批意见：</td>
							<td>${item['approvals.description'] }</td>
							
						</tr>
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
