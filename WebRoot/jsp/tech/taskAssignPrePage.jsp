<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>技改任务分配-前段</title>
		<link rel="stylesheet" href="../css/bootstrap-table.css">
		<link rel="stylesheet" href="../css/bootstrap-editable.css">
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						<li><a href="#">工程变更</a></li>
						<li class="active">技改任务分配-前段</li>
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
					<div class="well">
						<table>
							<tr>
								<td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="width:120px"></select></td>
								<td>&nbsp;订单：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="width:110px" class="input-small" type="text"></td>
								<td>&nbsp;技改单编号：</td>
								<td><input id="search_tech_order_no" placeholder="技改单编号..." style="width:110px" type="text"></td>
								<td>&nbsp;技改任务：</td>
								<td><input id="search_tech_task_content" placeholder="技改任务..." style="width:110px" type="text"></td>
							</tr>
							<tr>
								<td>状态：</td>
								<td>
									<select class="input-small" id="status" style="width:120px">
										<option value="全部">全部</option>
										<option value="已创建" selected>已创建</option>
										<option value="已分配">已分配</option>
										<option value="已评估">已评估</option>
										<option value="已完成">已完成</option>
									</select>
								</td>
								<td>&nbsp;技改单日期：</td>
								<td colspan=3><input id="search_date_start" placeholder="开始时间..." style="width:110px" type="text" onClick="WdatePicker({el:'search_date_start',dateFmt:'yyyy-MM-dd'});"> - <input id="search_date_end" placeholder="结束时间..." style="width:110px" type="text" onClick="WdatePicker({el:'search_date_end',dateFmt:'yyyy-MM-dd'});"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</div>

					<div id="toolbar"></div>
					<table  style="font-weight:normal;" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
				           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
				           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
				           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
				           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
				    </table>
					</div>
					
					<div id="dialog-assessModal" class="hide" style="align:center;width:700px;height:500px">
					<form id="task_assess">
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">技改任务：</td><td style="width:250px"><input type="text" style="width:250px" disabled="disabled" id="v_task_content" class="input-small" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">技改单编号：</td><td style="width:250px"><input type="text" style="width:250px" disabled="disabled" id="v_tech_order_no" class="input-small" /></td>
					</tr>
					<tr style="height:40px">
						<td align="right" style="width:100px">切换方式：</td>
						<td>
							<input checked name="switch_mode" value="全部切换" type="radio"><span>全部切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点前切换" type="radio"><span>节点前切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点后切换" type="radio"><span>节点后切换&nbsp;&nbsp;</span>
						</td>
					</tr>
					<tr id="tr_switch_node" style="display:none;height:40px">
						<td align="right" style="width:100px">切换节点：</td>
						<td style="width:250px">
							<select id="switch_node" class="input-medium">
								<option value='焊装'>焊装</option>
								<option value='玻璃钢'>玻璃钢</option>
								<option value='涂装'>涂装</option>
								<option value='底盘'>底盘</option>
								<option value='总装'>总装</option>
								<option value='检测线'>检测线</option>
							</select>
						</td>
					</tr>
					</table>
					<div class="control-group">
						<label class="control-label" for="" style="font-weight:bold">技改实施范围：</label>
						<div class="controls">
							<div style="width: 100%">
							<ul class="nav nav-tabs" id="new_tab" role="tablist">
								<li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">订单1</a></li>
								<li><i id="add_tech_detail" class="fa fa-plus"
								style="cursor: pointer; padding-top: 12px; color: blue;"></i></li>							
							</ul>
							</div>
							<div class="tab-content" id="new_accordion">
								<div class="tab-pane active" role="tabpanel" id="new_task1">
								<div class="panel panel-default">
								<div id="collapseTask1" class="panel-collapse collapse in" role="tabpanel">
									<div class="panel-body">
									<div>
										<span>订单：</span>
										<input type="text" class="assess_order_no" class="input-medium">
									</div>
									<div>
										<span>长沙工厂</span>
										<input style="height:30px" name="new_tecn_flag" class="input-medium" id="new_tecn_flag" type="checkbox">
									</div>
									<div>
									<table id="tb_factory_1" class="table table-bordered table-striped" style="margin-bottom: 0px;">
										<tr>
										<td>自制件</td>
										<td>部件</td>
										<td>焊装</td>
										<td>玻璃钢</td>
										<td>涂装</td>
										<td>底盘</td>
										<td>总装</td>
										<td>检测线</td>
										</tr>									
										<tr>
										<td></td>
										<td></td>
										<td>100</td>
										<td>80</td>
										<td>50</td>
										<td>50</td>
										<td>50</td>
										<td>20</td>
										</tr>	
									</table>
									</div>
									
									</div>									
								</div>	
								</div>
								</div>
							</div>
						</div>
					</div>
					
					</form>
					</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script>
		var $table = $('#table'),$remove = $('#remove'),selections = [];
	</script>
	<style type="text/css">
	.fixed-table-toolbar .bs-bars, .fixed-table-toolbar .search, .fixed-table-toolbar .columns {
		position: absolute;
		margin-top: 102px;
		right: 20px;
		top: -45px;
	}
	.btn-default {
		color: #333;
		background-color: #fff;
		border-color: #ccc;
		height: 40px;
		color: #fff;
		background-color: #333;
	}
</style>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	
	<script type="text/javascript" src="../assets/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/tech/taskAssignPrePage.js"></script>
</html>
