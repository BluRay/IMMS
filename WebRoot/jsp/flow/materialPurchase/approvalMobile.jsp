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
<!-- <link rel="stylesheet" href="../css/common.css"> -->
<style type="text/css" media="screen">

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
		    <div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
				<ul class="breadcrumb" style="font-size:14px;">
				<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
					<li><a href="#">流程审批</a></li>
				</ul>	
			</div>
			<div class="col-sm-6 widget-container-col">
				<div class="widget-box transparent">
                    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>">
					<div class="widget-body">
						<div class="widget-main padding-12 no-padding-left no-padding-right">
                                <div class="tab-pane">
									<div class="scrollable" data-size="380">
										<div class="tab-content no-border padding-24">
										
										<div id="faq-tab-1" class="tab-pane fade in active">

       										<div id="faq-list-1" class="panel-group accordion-style1 accordion-style2">
												<c:forEach items="${approvalData}" var="item" varStatus="status">
													<div class="panel panel-default" style="margin-left:-50x;margin-right:-10px">
														<div class="panel-heading">
															<a href="#faq-1-2-${status.index}" id="div-${item['task_name'] }" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
																<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>
	
																<i class="ace-icon fa fa-user bigger-130"></i>
																${item['display_name'] } <font color="red">${item['operator'] } ${item['result']=='0' ? '同意' : (item['result']=='1' ? '不同意' : '') }</font> ${item['operate_time'] }
															</a>
														</div>
	                                                    <div class="panel-collapse collapse" id="faq-1-2-${status.index}">
															<div class="panel-body">
																<div id="faq-list-nested-1" class="panel-group accordion-style1 accordion-style2">
																	<div class="panel panel-default">
																		<div class="panel-heading">
																			<a href="#faq-list-1-sub-1" data-parent="#faq-list-nested-1" data-toggle="collapse" class="accordion-toggle collapsed">
																				<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>&nbsp;
										                                                                                                       审批意见:  ${item['description'] }
																			</a>
																		</div>
																	</div>
	                                                            </div>
															</div>
														</div>
													</div>
                                                </c:forEach>						
											</div>
										</div>
									</div>
									</div>
<!-- 									<div class="scrollable" data-size="100"> -->
<!-- 										<div class="tab-content no-border padding-24"> -->
										    <div id="faq-tab-2" class="table tab-pane in active" style="margin-top:20px" data-size="100">  
											    <br>
										        <div class="table-tr" style="margin-top:5px">  
										            <div class="table-td form-group" style="margin-top:5px">
										                <div style=" float:left">&nbsp;审批意见:</div>
										                <div  style=" float:left">
										                <textarea style="width:260px;height:60px" id="description" name="description"></textarea>
										                </div>
										            </div>  
										        </div> 
										        <!-- 采购项目负责人预设资源开发工程师 -->
										        <c:if test="${taskName=='purchaseBoss' || displayName=='采购项目负责人'}">
											        <div class="table-tr">  
											            <div class="table-td">
														资源开发工程师：
														<select style="width:120px" id="developer"></select>
														</div>
											        </div> 
										        </c:if>
										        <div class="table-tr">  
										            <div class="table-td" style="float:right;margin-right:30px">
										                <input type="button" class="btn btn-sm btn-info" id="btnAgree" value="同意">
															&nbsp;&nbsp;
														<input type="button" class="btn btn-sm btn-info" id="btnDisagree" value="不同意">
															&nbsp;&nbsp;
														<input type="button" class="btn btn-sm btn-info" name="reback" value="取消"
																onclick="history.back()">
									                </div>  
										        </div> 
										    </div>
										</div>
<!-- 									</div> -->
<!-- 								</div> -->
								
								
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
		<script src="../js/flow/materialPurchase/approvalMobile.js"></script>
</body>
</html>