<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>技改工时审核</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">
				<div class="page-content-area">
					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
								<td>&nbsp;技改车间：</td>
								<td><select id="search_workshop" class="input-small" style="height: 30px;width:110px"></select></td>
								<td>&nbsp;订单：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:110px" type="text"></td>
								<td>&nbsp;技改单编号：</td>
								<td><input id="search_tech_order_no" placeholder="技改单编号..." style="height: 30px;width:110px" type="text"></td>
								<td>&nbsp;技改任务：</td>
								<td><input id="search_tech_task_content" placeholder="技改任务..." style="height: 30px;width:110px" type="text"></td>
							</tr>
							<tr>
								<td>&nbsp;状态：</td>
								<td>
									<select class="input-small" id="status" style="height: 30px;width:120px">
										<option value="全部">全部</option>
										<option value="已创建" selected>已创建</option>
										<option value="已分配">已分配</option>
										<option value="已评估">已评估</option>
										<option value="已完成">已完成</option>
									</select>
								</td>
								<td>&nbsp;技改单日期：</td>
								<td colspan=3><input id="search_date_start" placeholder="开始时间..." style="height: 30px;width:110px" type="text" onClick="WdatePicker({el:'search_date_start',dateFmt:'yyyy-MM-dd'});"> - <input id="search_date_end" placeholder="结束时间..." style="height: 30px;width:110px" type="text" onClick="WdatePicker({el:'search_date_end',dateFmt:'yyyy-MM-dd'});"></td>
								<td><input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</div>
					
					<table id="tableData" class="table table-striped table-bordered table-hover" style="width:2000px;overflow-x:auto;font-size: 12px;">
					</table>	
					
					</div>
			</div><!-- /.main-content -->
			
			<div id="dialog-edit" class="hide" style="align:center;width:780px;height:500px">
				<table style="line-height:30px" >
					<tr>
						<td width="140px" style="text-align:right">派工单号：</td><td id="edit_orderNo" colspan="5"></td>
					</tr>
					<tr>
						<td width="140px" style="text-align:right">技改任务：</td><td id="edit_task" colspan="5"></td>	
					</tr>
					<tr>
						<td width="140px" style="text-align:right">技改台数：</td><td id="edit_ecnNumber" width="50px" ></td>
						<td width="120px" style="text-align:right">单车总工时：</td><td id="edit_singleHour"  ></td>
						<td width="120px" style="text-align:right">工时单价：</td>								
						<td><input type="text" id="edit_singlePrice" class="input-medium" style="margin-bottom: 0px;height:30px"></td>
					</tr>
				</table>
				<table class="form-search">
					<tr>
					<td width="50px" style="text-align:right">工号：</td>
					<td width="70px"><input type="text" style="width:70px" class="input-medium" style="margin-bottom: 0px;height:30px" id="edit_cardNumber"/></td>
					<td width="80px" style="text-align:right">操作月份：</td>
					<td width="80px"><input type="text" style="width:80px" class="input-medium" style="margin-bottom: 0px;height:30px" id="edit_workDate" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/></td>
					<td width="80px" style="text-align:right">员工车间：</td>
					<td width="80px" style="text-align:right"><select id="edit_workshop_search"></select></td>
					<td width="80px" style="text-align:right">技改车间：</td>
					<td width="80px" style="text-align:right"><select id="edit_tech_workshop_search"></select></td>
					<td><input type="button" class="btn btn-primary" id="btnSwhQuery" value="查询" style="margin-left: 2px;line-height:0; height:32px"></input></td>
					<td></td>
					</tr>								
				</table>
				<h5 class="section-head">技改工时<span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></h5>
				<div style="width:100%;height:300px;">
				<table id="work_hour_tb" style="margin-left:0px;margin-top:15px;width: 100%;"class="exp-table table">
					<thead style="background-color: rgb(225, 234, 240)">
					<tr>
					<td><input type="checkbox" id="checkall"></td>
					<td >工号</td>
					<td >姓名</td>
					<td >岗位</td>
					<td >额外工时</td>
					<td >小班组</td>
					<td >班组</td>
					<td >车间</td>
					<td >工厂</td>
					<td >操作日期</td>
					<td >状态</td>
					</tr>
					</thead>
					<tbody class="exp-table" id="workhour_list">
					</tbody>
				</table>
				
				
				</div>
			</div>

			<div id="dialog-busnumber" class="hide" style="align:center;width:780px;height:500px">
				<div style="width:100%;height:300px;">
					<table style="margin-left:0px;width: 100%;text-align:center"class="exp-table table" id="busnumber_tb">
						<thead style="background-color: rgb(225, 234, 240)">
						<tr>
						<td style="text-align:center">序号</td>
						<td style="text-align:center">车号</td>
						<td style="text-align:center">生产工厂</td>
						<td style="text-align:center">当前工序</td>
						<td style="text-align:center">确认人</td>
						<td style="text-align:center">确认日期</td>
						</tr>
						</thead>
						<tbody class="exp-table" id="busnumber_list">
						</tbody>
					</table>
				</div>
			</div>
			
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/tech/worktimeVerify.js"></script>
</html>
