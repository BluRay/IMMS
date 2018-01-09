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
		    <div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
				<ul class="breadcrumb" style="font-size:14px;">
				<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
					<li><a href="#">流程申请</a></li>
				</ul>
			</div>
			<div class="col-sm-6 widget-container-col">
				<div class="widget-box transparent">
                    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>">
					<div class="widget-body">
						<div class="widget-main padding-12 no-padding-left no-padding-right">
                                <div id="info2" class="tab-pane">
                                    <div class="panel-heading" style="margin-left:10px;margin-right:-30px;margin-top:-20px">
										<a href="#faq-1-2" data-parent="#faq-list-1" class="accordion-toggle collapsed">
											<i class="ace-icon fa pull-right"  data-icon-show="ace-icon fa"></i>
                                                        <i class="ace-icon fa bigger-130">基本信息</i>
										</a>
									</div>
									<div class="scrollable" data-size="310">
										<div class="tab-content no-border padding-24" id="tab-content">
										
										<div id="faq-tab-1" class="tab-pane fade in active" style="margin-top:-30px">

       										<div id="faq-list-1" class="panel-group accordion-style1 accordion-style2">
												
												<div class="panel panel-default">
													<div class=""><!-- panel-collapse collapse -->
														<div class="panel-body">
															<div class="panel-group accordion-style1 accordion-style2" style="margin-top:-10px">
																<div class="panel panel-default" >
																	<div class="panel-heading" style="margin:3px">
																		<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                    <font style="color:red;">*</font>申请人:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input value="${userName}" id="applier" style="width:120px" class="col-sm-10" type="text">																	
																	</div>
												                </div>
                                                            </div>
<!--                                                             <br/> -->
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading" style="margin:2px">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>申请部门:  
																	</div>
																</div>

																<div class="panel panel-default" style="">
																	<div class="panel-heading">	
																	<input id="department" value="${department }" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>&nbsp;
									                                        <font style="color:red;">*</font> 申请日期:  
																	</div>
																</div>

																<div class="panel panel-default" style="">
																	<div class="panel-heading">	
																	<input id="apply_date" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font> 申请类型:  
																	</div>
																</div>

																<div class="panel panel-default" style="">
																	<div class="panel-heading">	
																	    <select id="apply_type" style="width:120px"></select>			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>采购项目:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	    <select id="apply_kind" style="width:120px"></select>		
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>成本中心:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="cost_center" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>成本会计:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	    <select id="accountant" style="width:120px"></select>			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>采购项目负责人:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	    <select id="purchase_leader" style="width:120px"></select>			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>物料编号:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="material_code" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>物料名称:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="material_name" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>规格/型号:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="specification" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>使用地区:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="useage_place" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>需求数量:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="quantity" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>要求到位时间:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="require_date" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                                                                                    技术要求:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="techcical_require" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>申请理由:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="apply_reason" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                        <font style="color:red;">*</font>附件:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="apply_date" style="width:120px" class="col-sm-10" type="text">			
																	</div>
												                </div>
                                                            </div>
                                                            <div class="panel-group accordion-style1 accordion-style2" style="margin-top:-12px">
																<div class="panel panel-default">
																	<div class="panel-heading">
																			<i class="ace-icon fa smaller-80 middle" data-icon-hide="ace-icon fa" data-icon-show="ace-icon fa"></i>
									                                                                                                    备注:  
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">	
																	<input id="remark" style="width:120px" class="col-sm-10" type="text">			
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
									<div id="faq-tab-2" class="table tab-pane in active" style="margin-top:20px" data-size="100">  
									    <br>
								        <div class="table-tr" style="margin-top:5px">  
								            <div class="table-td form-group" style="margin-top:5px">
								                <div style=" float:left">&nbsp;审批意见:</div>
								                <div  style=" float:left">
								                <textarea style="width:260px;height:30px" id="description" name="description"></textarea>
								                </div>
								            </div>  
								        </div> 
								       
								        <div class="table-tr">  
								            <div class="table-td" style="float:right;margin-right:10px">
								                <input type="button" class="btn btn-sm btn-info" id="btnAgree" value="提交">
													&nbsp;&nbsp;
												<input type="button" class="btn btn-sm btn-info" name="reback" value="取消"
													onclick="history.back()">
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