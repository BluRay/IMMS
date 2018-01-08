<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>代办任务</title>
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
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">流程管理</a></li>
						<li class="active">代办任务</li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" onkeydown="EnterPress()" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div><!-- /.nav-search -->
				</div>
				
			<div class="page-content">
					<!-- /section:settings.box -->
					<div class="page-content-area">
					
<!-- 					<div class="well"> -->
<!-- 						<table> -->
<!-- 							<tr> -->
<!-- 								<td>车号/VIN号：</td> -->
<!-- 								<td><input id="search_busnumber" placeholder="请输入车号/VIN号..." style="height: 30px;width:200px" type="text"> -->
<!-- 								<input id="order_id"   type="hidden"> -->
<!-- 								<input id="order_config_id"   type="hidden"> -->
<!-- 								</td> -->
<!-- 								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></td> -->
<!-- 								<td></td> -->
<!-- 							</tr> -->
<!-- 						</table> -->
<!-- 					</div> -->
					
					<div class="tabtable">
					    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>">
<!-- 						<ul class="nav nav-tabs" id="myTab"> -->
<!-- 							<li id="div1" class="active"><a data-toggle="tab" href="#div_1">主办任务</a></li> -->
<!-- 							<li id="div2"><a data-toggle="tab" href="#div_2">协办任务</a></li> -->
<!-- 							<li id="div3"><a data-toggle="tab" href="#div_3">抄送任务</a></li> -->
<!-- 						</ul> -->
						
<!-- 						<div class="tab-content" id="tab-content"> -->
<!-- 							<div id="div_1" class="tab-pane fade in active" style="overflow:auto;height:450px"> -->
								<table id="table01" style="text-align:center;font-size:12px;" class="table table-bordered">
									<thead>
									    <tr>
									        <th style="text-align:center;">序号 </th>
									        <th style="text-align:center;">流程名称 </th>
									        <th style="text-align:center;">拟稿人</th>
									        <th style="text-align:center;">拟稿人科室</th>
									        <th style="text-align:center;">申请时间</th>
									        <th style="text-align:center;">任务节点</th>
									        <th style="text-align:center;">任务到达时间 </th>
<!-- 									        <td>操作 </td> -->
									    </tr>
									</thead>
									<tbody>
									</tbody>
								</table>
<!-- 							</div> -->
							
<!-- 							<div id="div_2" class="tab-pane fade" style="overflow:auto;height:450px"> -->
<!-- 								<table id="table02" style="text-align:center;font-size:12px" class="table table-bordered"> -->
<!-- 									<thead> -->
<!-- 									    <tr> -->
<!-- 									        <td>序号 </td> -->
<!-- 									        <td>流程名称 </td> -->
<!-- 									        <td>流程编号</td> -->
<!-- 									        <td>流程启动时间</td> -->
<!-- 									        <td>任务名称</td> -->
<!-- 									        <td>任务创建时间 </td> -->
<!-- 									        <td>操作 </td> -->
<!-- 									    </tr> -->
<!-- 									</thead> -->
<!-- 									<tbody> -->
<!-- 									</tbody> -->
<!-- 								</table> -->
<!-- 							</div> -->
							
<!-- 							<div id="div_3" class="tab-pane fade" style="overflow:auto;height:450px"> overflow:auto -->
<!-- 								<table id="table03" class="table table-bordered" style="text-align:center;font-size: 12px;"> -->
<!-- 									<thead> -->
<!-- 									    <tr> -->
<!-- 									        <td>序号 </td> -->
<!-- 									        <td>流程名称 </td> -->
<!-- 									        <td>流程编号</td> -->
<!-- 									        <td>流程启动时间</td> -->
<!-- 									        <td>任务名称</td> -->
<!-- 									        <td>任务创建时间 </td> -->
<!-- 									        <td>操作 </td> -->
<!-- 									    </tr> -->
<!-- 									</thead> -->
<!-- 									<tbody> -->
<!-- 									</tbody> -->
<!-- 								</table> -->
<!-- 							</div> -->
<!-- 						</div>				 -->
					</div>
				</div>
			</div><!-- /.main-content -->

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jsrender.min.js"></script>
	<script type="text/javascript" src="../js/flow/activeTask.js"></script>
</html>
