<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String staff_number = (String)session.getAttribute("staff_number");
Integer factory_id=(Integer)session.getAttribute("factory_id");
String factory=(String)session.getAttribute("factory");
%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<style>	
			.myselect {
		border: 0px none;
		-moz-appearance:none;
		-webkit-appearance:none;
		font-size: 100%;
		margin-bottom: 3px;
		color: #555;
		background-color:#f5f5f5;
		width: 80px;
		padding: 0px;
		height:27px;
		cursor: pointer;
		margin-left: -8px;
		}
	</style>
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<jsp:include page="top.jsp" flush="true"/>
		<!-- 身 -->
		<div class="main-container" id="main-container">
			<!-- 左边菜单 -->
			<jsp:include page="left.jsp" flush="true"/>
			<!-- 主体 -->
			<div class="main-content">			
			<div class="page-content" style="padding-left: 5px;padding-right: 12px;">
					<!-- 设置小部件 -->
					<%-- <jsp:include page="settings.jsp" flush="true"/> --%>
					<!-- /section:settings.box -->
					<div class="page-content-area ">
						<div class="row">
								<div class="col-xs-12 col-sm-6 widget-container-col ui-sortable" >
										<!-- #section:custom/widget-box -->
										<div class="widget-box ui-sortable-handle">
											<div class="widget-header">
												<h5 class="widget-title"><a href='#' onclick="reportFoward('plan/planSearch')">工厂日计划达成</a>
													<select id="search_factory" class="myselect">
													</select>
													<input id="factory_id_default" type="hidden" value='<%=factory_id%>'>
												</h5>
												<!-- #section:custom/widget-box.toolbar -->
												<div class="widget-toolbar">

													<a href="#" data-action="fullscreen" class="orange2">
														<i class="ace-icon fa fa-expand"></i>
													</a>

													<a href="#" data-action="reload" onclick="reload('1');">
														<i class="ace-icon fa fa-refresh"></i>
													</a>
												</div>
												<!-- /section:custom/widget-box.toolbar -->
											</div>

											<div class="widget-body">
												<div class="widget-main" style="height:210px">
													<div class="row">
															<div class="col-xs-6" >
																<div class="col-xs-6 center" style="line-height:20px;height:75px;top:10px;">
																	<p style="color:green;font-size:24px;" id="welding_plan_done"></p>
																	<p style="font-size:15px;">焊装上线</p>
																</div>
																<div class="col-xs-6 center">
																	<div id='welding_percent' class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
																	<span class="percent" >0</span>%
																	</div>
																</div>	
															</div>											
															<div class="col-xs-6 ">
																<div class="col-xs-6 center" style="line-height:20px;height:75px;top:10px;">
																	<p style="color:green;font-size:24px;" id="painting_plan_done"></p>
																	<p style="font-size:15px;">涂装上线</p>
																</div>
																<div class="col-xs-6 center">
																	<div id='painting_percent'  class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
																	<span class="percent">0</span>%
																</div>
																</div>														
															</div>												
													</div>
													<hr>
													<div class="row">
															<div class="col-xs-6 " >
																<div class="col-xs-6 center" style="line-height:20px;height:75px;top:10px;top:10px;">
																	<p style="color:green;font-size:24px;" id="chassis_plan_done"></p>
																	<p style="font-size:15px;">底盘上线</p>
																</div>
																<div class="col-xs-6 center">
																	<div id="chassis_percent" class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
																	<span class="percent">0</span>%
																	</div>
																</div>	
															</div>											
															<div class="col-xs-6 ">
																<div class="col-xs-6 center" style="line-height:20px;height:75px;top:10px;">
																	<p style="color:green;font-size:24px;" id="assembly_plan_done"></p>
																	<p style="font-size:15px;">总装下线</p>
																</div>
																<div class="col-xs-6 center">
																	<div id="assembly_percent" class="easy-pie-chart percentage" data-percent="0" data-color="#D15B47">
																	<span class="percent">0</span>%
																</div>
																</div>														
															</div>												
													</div>
										</div>
									</div>
						</div>	
					</div>
					
					<div class="col-xs-12 col-sm-6 widget-container-col ui-sortable">
					<div class="widget-box ui-sortable-handle">
								<div class="widget-header">
									<h5 class="widget-title">工厂异常停线</h5>
									<div class="widget-toolbar">
										<a href="#" data-action="fullscreen" class="orange2">
											<i class="ace-icon fa fa-expand"></i>
										</a>
										<a href="#" data-action="reload" onclick="reload('5');">
											<i class="ace-icon fa fa-refresh"></i>
										</a>
									</div>
								</div>

								<div class="widget-body">
									<div class="widget-main"  style="height:210px;overflow:hidden">		
											<ul id="exception">
											
											</ul>								
									</div>
								</div>
						</div>
				</div>
									
			</div>
			
			
				<div class="row">
				<div class="col-xs-12 col-sm-6 widget-container-col ui-sortable" >
					<div class="widget-box ui-sortable-handle" >
								<div class="widget-header">
									<h5 class="widget-title"><a href='#' onclick="reportFoward('order/orderQuery')">工厂在制订单</a></h5>
									<div class="widget-toolbar">
										<a href="#" data-action="fullscreen" class="orange2">
											<i class="ace-icon fa fa-expand"></i>
										</a>
										<a href="#" data-action="reload" onclick="reload('3');">
											<i class="ace-icon fa fa-refresh"></i>
										</a>
									</div>
								</div>

								<div class="widget-body"  >
								<div  class="widget-main" style="height:310px;overflow:hidden">
									<div style="overflow:hidden" id="factory_act_order">									
									</div>
								</div>									
								</div>
						</div>
				</div>
			
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
		</div>
		</div>
	</div>
	<script src="assets/js/jquery-ui.custom.min.js"></script>
	<script src="assets/js/jquery.easypiechart.min.js"></script>
	<script src="assets/js/bootstrap3-typeahead.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/common.js"></script>
	<script src="js/index.js"></script>
	<jsp:include page="tabPannel.jsp" flush="true"/>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#search_factory").change(function(){
				drawFactoryDailyChart();
				drawFactoryOrderChart();
				drawFactoryException();
			})
		});
	</script>
	</body>
</html>
