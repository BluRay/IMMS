
<!-- <!DOCTYPE html> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>流程部署</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="${ctx}/snaker/css/style.css" type="text/css" media="all" />
		<link rel="stylesheet" href="${ctx}/snaker/css/snaker.css" type="text/css" media="all" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<jsp:include page="../top.jsp" flush="true"/>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="../left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">			
			<!-- 路径和搜索框 -->
			<div class="breadcrumbs" id="breadcrumbs">
				<ul class="breadcrumb">
					<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
					<li>流程管理</li>
					<li class="active">流程部署</li>
				</ul><!-- /.breadcrumb -->

				<!-- #section:basics/content.searchbox -->
				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<span class="input-icon">
							<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</form>
				</div><!-- /.nav-search -->
			</div>	
			<div class="page-content">
				<div class="page-content-area">
				    <form id="inputForm" action="${ctx}/process/deploy" method="post" enctype="multipart/form-data">
						<table width="100%" border="0" align="center" cellpadding="0"
								class="table_all_border" cellspacing="0" style="margin-bottom: 0px;border-bottom: 0px">
							<tr>
								<td class="td_table_top" align="center">
									流程部署
								</td>
							</tr>
						</table>
						<table class="table_all" align="center" border="0" cellpadding="0"
							cellspacing="0" style="margin-top: 0px">
								<tr>
									<td class="td_table_1">
										<span>上传流程定义文件：</span>
									</td>
									<td class="td_table_2" colspan="3">
										<input type="file" class="input_file" id="snakerFile" name="snakerFile"/>
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
				</div>
			</div><!-- /.main-content -->
			
			</div>
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
    
</html>
