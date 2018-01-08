<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- <!DOCTYPE html> -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> --%>
<html lang="zh-CN">
	<head>
	    <meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
		<title>流程定义</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- 		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> -->
<!-- 		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" /> -->
<!-- 		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" /> -->
<%-- 		<link rel="stylesheet" href="${ctx}/snaker/css/style.css" type="text/css" media="all" /> --%>
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
				<div class="page-content-area">
				    <div id="toolbox">
					<div id="toolbox_handle">工具集</div>
					<div class="node" id="save"><img src="${ctx}/snaker/images/save.gif" />&nbsp;&nbsp;保存</div>
					<div>
					<hr />
					</div>
					<div class="node selectable" id="pointer">
					    <img src="${ctx}/snaker/images/select16.gif" />&nbsp;&nbsp;Select
					</div>
					<div class="node selectable" id="path">
					    <img src="${ctx}/snaker/images/16/flow_sequence.png" />&nbsp;&nbsp;transition
					</div>
					<div>
					<hr/>
					</div>
					<div class="node state" id="start" type="start"><img
						src="${ctx}/snaker/images/16/start_event_empty.png" />&nbsp;&nbsp;start</div>
					<div class="node state" id="end" type="end"><img
						src="${ctx}/snaker/images/16/end_event_terminate.png" />&nbsp;&nbsp;end</div>
					<div class="node state" id="task" type="task"><img
						src="${ctx}/snaker/images/16/task_empty.png" />&nbsp;&nbsp;task</div>
					<div class="node state" id="task" type="custom"><img
						src="${ctx}/snaker/images/16/task_empty.png" />&nbsp;&nbsp;custom</div>
					<div class="node state" id="task" type="subprocess"><img
						src="${ctx}/snaker/images/16/task_empty.png" />&nbsp;&nbsp;subprocess</div>
					<div class="node state" id="fork" type="decision"><img
						src="${ctx}/snaker/images/16/gateway_exclusive.png" />&nbsp;&nbsp;decision</div>
					<div class="node state" id="fork" type="fork"><img
						src="${ctx}/snaker/images/16/gateway_parallel.png" />&nbsp;&nbsp;fork</div>
					<div class="node state" id="join" type="join"><img
						src="${ctx}/snaker/images/16/gateway_parallel.png" />&nbsp;&nbsp;join</div>
					</div>
					
					<div id="properties">
					<div id="properties_handle">属性</div>
					<table class="properties_all" cellpadding="0" cellspacing="0">
					</table>
					<div>&nbsp;</div>
					</div>
					
					<div id="snakerflow"></div>	
				</div>
			</div><!-- /.main-content -->
			
			</div>
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
<%--     <script src="${ctx}/assets/js/jquery-ui.min.js"></script> --%>
<%-- 	<script src="${ctx}/js/jsrender.min.js"></script> --%>
	<script src="${ctx}/js/common.js"></script>
	<script src="${ctx}/js/browser.js"></script>
	<script src="${ctx}/snaker/raphael-min.js" type="text/javascript"></script>
		<script src="${ctx}/snaker/jquery-ui-1.8.4.custom/js/jquery.min.js" type="text/javascript"></script>
		<script src="${ctx}/snaker/jquery-ui-1.8.4.custom/js/jquery-ui.min.js" type="text/javascript"></script>
		<script src="${ctx}/snaker/snaker.designer.js" type="text/javascript"></script>
		<script src="${ctx}/snaker/snaker.model.js" type="text/javascript"></script>
		<script src="${ctx}/snaker/snaker.editors.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(function() {
				var json="${process }";
				var model;
				if(json) {
					//json.replace(new RegExp("@@","gm"), "\"")
					model=eval("(" + json + ")");
				} else {
					model="";
				}
				$('#snakerflow').snakerflow({
					basePath : "${ctx}/",
                    ctxPath : "",
					restore : model,
                    formPath : "forms/",
					tools : {
						save : {
							onclick : function(data) {
								saveModel(data);
							}
						}
					}
				});
			});
			
			function saveModel(data) {
				var processId = "${processId}";
				alert(data);
				$.ajax({
					type:'POST',
					url:"deployXml",
					data:{"model":data,//encodeURIComponent(data),
						"id":	processId},
					dataType:"json",
					async: false,
					globle:false,
					error: function(){
						alert('数据处理错误！');
						return false;
					},
					success: function(data){
						if(data == true) {
							window.location.href = "list";
						} else {
							alert('数据处理错误！');
						}
					}
				});
			}
		</script>			
</html>
