<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>车辆信息查询</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
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
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="<%=request.getContextPath()%>/index">首页</a></li>
						<li><a href="#">生产</a></li>
						<li class="active">车辆信息查询</li>
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
					<!-- /section:settings.box -->
					<div class="page-content-area">
					
					<div class="well">
						<table>
							<tr>
								<td>车号/VIN号：</td>
								<td><input id="search_order_no" placeholder="请输入车号/VIN号..." style="width:200px" type="text"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></td>
								<td></td>
							</tr>
						</table>
					</div>
					
					<div class="tabbable">
						<ul class="nav nav-tabs" id="myTab">
							<li id="div1" class="active"><a data-toggle="tab" href="#div_1">基本信息</a></li>
							<li id="div2"><a data-toggle="tab" href="#div_2">生产信息</a></li>
							<li id="div3"><a data-toggle="tab" href="#div_3">检验流程卡</a></li>
							<li id="div4"><a data-toggle="tab" href="#div_4">关键零部件</a></li>
							<li id="div5"><a data-toggle="tab" href="#div_5">订单配置一致性</a></li>
							<li id="div6"><a data-toggle="tab" href="#div_6">底盘铭牌</a></li>
							<li id="div7"><a data-toggle="tab" href="#div_7">整车铭牌</a></li>
							<li id="div8"><a data-toggle="tab" href="#div_8">合格证</a></li>
							<li id="div9"><a data-toggle="tab" href="#div_9">异常信息</a></li>
							<li id="div10"><a data-toggle="tab" href="#div_10">技改信息</a></li>
						</ul>
						
						<div class="tab-content" id="tab-content">
							<div id="div_1" class="tab-pane fade in active">
								<table id="table01" style="text-align:center;table-layout:fixed;font-size:12px;width:850px" class="table table-bordered table-striped">
									<tr>
										<td width="105px">生产订单：</td><td id="tab01_order_no"></td><td width="105px">车号：</td><td id="tab01_bus_number"></td><td width="105px">VIN：</td><td id="tab01_vin"></td>
									</tr>
									<tr>
										<td>生产工厂：</td><td id="tab01_factory_name"></td><td>车辆配置：</td><td id="tab01_order_config_name"></td><td>客户名称：</td><td id="tab01_customer"></td>
									</tr>
									<tr>
										<td>生产日期：</td><td id="tab01_productive_date"></td><td>左电机号：</td><td id="tab01_left_motor_number"></td><td>右电机号：</td><td id="tab01_right_motor_number"></td>
									</tr>
									<tr>
										<td>车辆颜色：</td><td id="tab01_bus_color"></td><td>座位数量：</td><td id="tab01_bus_seats"></td><td>车辆状态：</td><td id="tab01_production_status"></td>
									</tr>
									<tr>
										<td>客户自编号：</td><td id="tab01_customer_number"></td><td>焊装上线日期：</td><td id="tab01_welding_online_date"></td><td>焊装下线日期：</td><td id="tab01_welding_offline_date"></td>
									</tr>
									<tr>
										<td>玻璃钢下线：</td><td id="tab01_fiberglass_offline_date"></td><td>涂装上线日期：</td><td id="tab01_painting_online_date"></td><td>涂装下线日期：</td><td id="tab01_painting_offline_date"></td>
									</tr>
									<tr>
										<td>底盘上线日期：</td><td id="tab01_chassis_online_date"></td><td>底盘下线日期：</td><td id="tab01_chassis_offline_date"></td><td>总装上线日期：</td><td id="tab01_assembly_online_date"></td>
									</tr>
									<tr>
										<td>总装下线日期：</td><td id="tab01_assembly_offline_date"></td><td>调试区上线：</td><td id="tab01_debugarea_online_date"></td><td>调试区下线：</td><td id="tab01_debugarea_offline_date"></td>
									</tr>
									<tr>
										<td>检测线上线：</td><td id="tab01_testline_online_date"></td><td>检测线下线：</td><td id="tab01_testline_offline_date"></td><td>入库日期：</td><td id="tab01_warehousing_date"></td>
									</tr>
									<tr>
										<td>出厂日期：</td><td id="tab01_dispatch_date"></td><td>配置附件：</td><td id="tab01_config_file"></td><td></td><td></td>
									</tr>
								
								</table>
							</div>
							
							<div id="div_2" style="overflow:auto" class="tab-pane fade">
								div_2
							</div>
							
							<div id="div_3" style="overflow:auto" class="tab-pane fade">
								div_3
							</div>
							
							<div id="div_4" style="overflow:auto" class="tab-pane fade">
								div_4
							</div>
							
							<div id="div_5" style="overflow:auto" class="tab-pane fade">
								div_5
							</div>
							
							<div id="div_6" style="overflow:auto" class="tab-pane fade">
								div_6
							</div>
							
							<div id="div_7" style="overflow:auto" class="tab-pane fade">
								div_7
							</div>
							
							<div id="div_8" style="overflow:auto" class="tab-pane fade">
								div_8
							</div>
							
							<div id="div_9" style="overflow:auto" class="tab-pane fade">
								div_9
							</div>
							
							<div id="div_10" style="overflow:auto" class="tab-pane fade">
								div_10
							</div>
							
						</div>
						
					</div>
					
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/production/productionsearchbusinfo.js"></script>
</html>
