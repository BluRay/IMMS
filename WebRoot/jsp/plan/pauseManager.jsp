<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>计划停线</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
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
						<li><a href="#">生产计划</a></li>
						<li class="active">计划停线</li>
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
								<td><select id="search_factory" class="form-control" style="width:100px"></select></td>
								<td>&nbsp;车间：</td>
								<td><select id="search_workshop" class="form-control" style="width:80px"></select></td>
								<td>&nbsp;线别：</td>
								<td><select id="search_line" class="form-control" style="width:60px"><option value='A'>A线</option><option value='B'>B线</option></select></td>
								<td>&nbsp;订单：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="width:110px" type="text"></td>
								<td>&nbsp;原因：</td>
								<td><select id="search_reason" class="form-control" style="width:120px"></select></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>停线时间：</td>
								<td colspan=3><input id="pause_date_start" placeholder="开始时间..." style="width:125px" type="text" onClick="WdatePicker({el:'pause_date_start',dateFmt:'yyyy-MM-dd HH:mm'});"> - <input id="pause_date_end" placeholder="结束时间..." style="width:125px" type="text" onClick="WdatePicker({el:'pause_date_end',dateFmt:'yyyy-MM-dd HH:mm'});"></td>
								<td>&nbsp;恢复时间：</td>
								<td colspan=3><input id="resume_date_start" placeholder="开始时间..." style="width:125px" type="text" onClick="WdatePicker({el:'resume_date_start',dateFmt:'yyyy-MM-dd HH:mm'});"> - <input id="resume_date_end" placeholder="结束时间..." style="width:125px" type="text" onClick="WdatePicker({el:'resume_date_end',dateFmt:'yyyy-MM-dd HH:mm'});"></td>								
								<td></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input>&nbsp;&nbsp;<input id="btnAdd" class="btn btn-sm btn-info" value="增加" type="button">&nbsp;</td>
								<td></td>
							</tr>
						</table>
					</div>	
					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					</table>
					<!-- <table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					<thead>
					<tr>
						<th style="text-align:center;">生产工厂</th>
						<th style="text-align:center;">车间</th>
						<th style="text-align:center;">线别</th>
						<th style="text-align:center;">订单</th>
						<th style="text-align:center;">停线时间</th>
						<th style="text-align:center;">预计恢复时间</th>
						<th style="text-align:center;">实际恢复时间</th>
						<th style="text-align:center;">累计时长</th>
						<th style="text-align:center;">停线原因</th>
						<th style="text-align:center;">详细原因</th>
						<th style="text-align:center;">责任部门</th>
						<th style="text-align:center;">损失人数</th>
						<th style="text-align:center;">损失工时</th>
						<th style="text-align:center;">损失产能</th>
						<th style="text-align:center;">状态</th>
						<th style="text-align:center;">录入人</th>
						<th style="text-align:center;">操作</th>
						
					</tr>
					</thead>
					</table> -->
					</div>
			</div><!-- /.main-content -->
			<div id="dialog-add" class="hide" style="align:center;width:700px;height:500px">
				<form>
					<table>
					<tr style="height:40px">
						<td align="right" style="width:100px">生产工厂：</td><td style="width:150px"><select id="new_factory" class="form-control" style="width:150px"></select></td>
						<td align="right" style="width:100px">生产车间：</td><td style="width:150px"><select id="new_workshop" class="form-control" style="width:120px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right">生产线别：</td><td colspan=3><label><input id="A" class="ace" onclick='checkLine(this)' type="checkbox"><span class="lbl"> A线</span></label>&nbsp;&nbsp;<label><input id="B" class="ace" onclick='checkLine(this)' type="checkbox"><span class="lbl"> B线</span></label><input style="height: 30px;display:none" id="line_str" type="text" class="input-small revise"/></td>
					</tr>
					<tr style="height:40px">
						<td align="right">订单范围：</td><td><input id="new_order_list" placeholder="请输入订单范围..." style="width:150px" type="text"></td>
						<td align="right">车辆型号：</td><td><select id="new_bus_type" class="form-control" style="width:120px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right">停线原因：</td><td><select id="new_reason_type" class="form-control" style="width:150px"></select></td>
						<td align="right">责任部门：</td><td><select id="new_dep_id" class="form-control" style="width:120px"></select></td>
					</tr>
					<tr style="height:40px">
						<td align="right">停线时间：</td><td colspan=3><input id="new_pause_date_start" placeholder="请输入开始时间..." style="width:150px" type="text" onClick="WdatePicker({el:'new_pause_date_start',dateFmt:'yyyy-MM-dd HH:mm'});"> - <input id="new_pause_date_end" placeholder="请输入结束时间..." style="width:150px" type="text" onClick="WdatePicker({el:'new_pause_date_end',dateFmt:'yyyy-MM-dd HH:mm'});"></td>
					</tr>
					<tr style="height:40px">
						<td align="right">停线时长：</td><td><input id="new_pause_hours" placeholder="停线时长..." style="width:100px" type="text">H</td>
						<td align="right">浪费人数：</td><td><input id="new_human_lossed" placeholder="浪费人数..." style="width:100px" type="text">人</td>
					</tr>
					<tr style="height:40px">
						<td align="right">损失产能：</td><td><input id="new_capacity" placeholder="损失产能..." style="width:100px" type="text">台</td>
						<td></td><td></td>
					</tr>
					<tr style="height:40px">
						<td align="right">详细原因：</td><td colspan=3><input id="new_reason_detailed" placeholder="详细原因..." style="width:350px" type="text"></td>
					</tr>
					<tr style="height:40px">
						<td align="right">备注：</td><td colspan=3><input id="new_memo" placeholder="备注..." style="width:350px" type="text"></td>
					</tr>
					<tr style="height:40px">
						<td align="right">邮件收件人：</td><td colspan=3><input id="new_pause_email_send" placeholder="邮件收件人..." style="width:350px" type="text"></td>
					</tr>
					<tr style="height:40px">
						<td align="right">邮件抄送人：</td><td colspan=3><input id="new_pause_email_cc" placeholder="邮件抄送人..." style="width:350px" type="text"></td>
					</tr>
					
					</table>
				</form>
			</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
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
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/plan/pauseManager.js"></script>
</html>
