<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>计划预览</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow:hidden; ">
			<!-- 主体 -->
			<div class="main-content">			

					<div class="well">
						<table>
							<tr>
								<td>生产工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
								<td>&nbsp;订单编号：</td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:120px" class="col-sm-10" type="text"></td>
								<td>&nbsp;计划月份：</td>
								<td width="80px"><input id="search_plan_month" placeholder="计划月份..." onClick="WdatePicker({el:'search_plan_month',dateFmt:'yyyyMM'});" style="height: 30px;width:80px" type="text"></td>
								<td>&nbsp;计划版本：</td>
								<td><input id="search_plan_version" style="height: 30px;" placeholder="请输入计划版本..." class="col-sm-12" type="text"></td>
								<td><input type="button" class="btn btn-sm btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;</td>
								<td></td>
							</tr>
						</table>
					</div>		
					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					<thead><tr>
						<th style="text-align:center;padding-left:0px;padding-right:0px;width:60px;">计划预览</th><th id="th_order_no" style="text-align:center;padding-left:0px;padding-right:0px;" width="55px"></th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="30px">日期</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">1</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">2</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">3</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">4</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">5</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">6</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">7</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">8</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">9</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">10</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">11</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">12</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">13</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">14</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">15</th>
						
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">16</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">17</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">18</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">19</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">20</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">21</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">22</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">23</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">24</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">25</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">26</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">27</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">28</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">29</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">30</th>
						
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="23px">31</th><th style="text-align:center;padding-left:0px;padding-right:0px;" width="38px">合计</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="38px">总计</th>
					</tr></thead>
					<tbody></tbody>
					</table>

			</div><!-- /.main-content -->
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="../js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/plan/planPreview.js"></script>
</html>
