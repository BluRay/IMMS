
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>流程定义</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="${ctx}/assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="${ctx}/assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="${ctx}/assets/css/jquery.gritter.css" />
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
					<li class="active">流程定义</li>
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
			    <div class="well">
						<table>
							<tr>
								<td>&nbsp;流程名称：</td>
							    <td>
								   <input type="text" class="input_240" style="height:30px" id="displayName" name="displayName" value=""/>
							    </td>	
								<td>
								    <input type='button' onclick="addNew('designer')" class="btn btn-sm btn-warn" value='设计' style="margin-left: 10px;"></input>
									<input id="btnDeploy" type='button' class="btn btn-sm btn-info" value='部署' style="margin-left: 10px;"></input>
							        <input id="btnQuery" type="button" class="btn btn-sm btn-primary" value="查询" style="margin-left: 10px;"></input>
								</td>
							</tr>
						</table>	
					</div>	
                    <table id="tableData" class="table table-striped table-bordered table-hover" style="overflow-x:auto;font-size: 12px;">
				    </table>
                    <div id="dialog-add" class="hide">
                        <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>/">
						<form id="addForm" class="form-horizontal" method="post" enctype="multipart/form-data" action="<%=request.getContextPath()%>/process/deploy">
							<table>
								<tr style="height:40px">
									<td align="right" style="width:100px">请选择文件：</td>
									<td colspan=3><label class="control-label" style="padding-left:2px;align:left"><input class="maintain" type="file" name="snakerFile" id="file" style="width:210px"/></label></td>
								</tr>
							</table>
						</form>
					</div>		
				</div>
			
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
    <script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../js/common.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
    <script src="${ctx}/snaker/raphael-min.js" type="text/javascript"></script>
	<script src="${ctx}/snaker/snaker.designer.js" type="text/javascript"></script>
	<script src="${ctx}/snaker/snaker.model.js" type="text/javascript"></script>
	<script src="${ctx}/js/flow/processList.js" type="text/javascript" ></script>
</html>
