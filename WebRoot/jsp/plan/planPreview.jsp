<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>计划预览</title>
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
						<li><a href="#">生产计划</a></li>
						<li class="active">计划预览</li>
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
						<table style="font-family: 'Microsoft YaHei';">
							<tr>
								<td style="width:130px">生产工厂</td><td style="width:140px">订单编号</td><td style="width:140px">计划版本</td><td></td><td></td>
							</tr>
							<tr>
								<td><select id="search_factory" class="form-control" style="width:130px"></select></td>
								<td><input id="search_order_no" placeholder="请输入订单编号..." class="col-sm-12" type="text"></td>
								<td><input id="search_plan_version" placeholder="请输入计划版本..." class="col-sm-12" type="text"></td>
								<td><input type="button" class="btn btn-sm btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;</td>
								<td></td>
							</tr>
						</table>
					</div>		
					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					<thead><tr>
						<th>计划预览</th><th id="th_order_no" style="text-align:center;padding-left:0px;padding-right:0px;" width="55px">D2017001</th>
						<th style="text-align:center;padding-left:0px;padding-right:0px;" width="30px">日期</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
						<th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th>
						<th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th><th>31</th>
						<th>合计</th><th>总计</th>
					</tr></thead>
					<tbody></tbody>
					</table>
					</div>
			</div><!-- /.main-content -->
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</div>
	</body>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/plan/planPreview.js"></script>
</html>
