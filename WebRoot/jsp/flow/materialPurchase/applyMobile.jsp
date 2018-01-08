<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../assets/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">
label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}
.newDiv {
    height: 25px;
    margin-top: 2px;
}
.table, .table * {margin: 0 auto; padding: 0;font-size: 14px;font-family: Arial, 宋体, Helvetica, sans-serif;}   
.table {display: table; width: 80%; border-collapse: collapse;}   
.table-tr {display: table-row; height: 30px;}   
.table-th {display: table-cell;font-weight: bold;height: 100%;border: 1px solid gray;text-align: center;vertical-align: middle;}   
.table-td {display: table-cell; height: 100%;border: 0px solid gray; text-align: center;vertical-align: middle;}   


</style>
<jsp:include page="../../common.jsp"></jsp:include>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<%-- <jsp:include page="../top.jsp" flush="true" /> --%>
	<!-- 身 -->
	<div class="main-container" id="main-container" style="height:100%">
		<!-- 左边菜单 -->
		<%-- <jsp:include page="../left.jsp" flush="true" /> --%>
		<!-- 主体 -->
		<div class="main-content">
			<div class="col-sm-6 widget-container-col">
				<div class="widget-box transparent">
					<div class="widget-header">
						<h4 class="widget-title lighter">流程申请</h4>
					</div>
                    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>">
					<div class="widget-body">
						<div class="widget-main padding-12 no-padding-left no-padding-right">
                                <div id="info2" class="tab-pane">
									<div class="scrollable" data-size="400">
										<div class="tab-content no-border padding-24" id="tab-content">
										
										<div id="faq-tab-1" class="tab-pane fade in active">

       										<div id="faq-list-1" class="panel-group accordion-style1 accordion-style2">
												
												<div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-2-${status.index}" id="div-${item['task_name'] }" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right"  data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-user bigger-130">基本信息</i>
															
														</a>
													</div>
                                                    <div class="panel-collapse collapse" id="faq-1-2-${status.index}">
														<div class="panel-body">
															<div id="faq-list-nested-1" class="panel-group accordion-style1 accordion-style2">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>&nbsp;
									                                                                                                    申请人:  
																	</div>
																</div>

																<div class="panel panel-default" style="height:2px">
																	<div class="panel-heading">	
																	<input value="${userName}" id="applier" style="width:120px" class="col-sm-10" type="text">																	
																	</div>
												                </div>
                                                            </div>
                                                            <div id="faq-list-nested-1" class="panel-group accordion-style1 accordion-style2">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>&nbsp;
									                                                                                                    申请部门:  
																	</div>
																</div>

																<div class="panel panel-default" style="height:2px">
																	<div class="panel-heading">	
																	<input id="department" value="${department }" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
														</div>
													</div>
												</div>
						
											</div>
										</div>
									</div>
									</div>
								</div>
                                <input type="hidden" name="processId" id="processId" value="${processId }" />
								<input type="hidden" name="orderId" id="orderId" value="${orderId }" />
								<input type="hidden" name="taskId" id="taskId" value="${taskId }" />
								<input type="hidden" name="taskName" id="taskName" value="${taskName }" />
								<input type="hidden" name="displayName" id="displayName" value="${displayName }" />
							</div>
						</div>
					</div>
				</div>
			</div>
					
			<!-- /.main-container -->
		</div>
		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
	    <script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/flow/materialPurchase/applyMobile.js"></script>
</body>
</html>