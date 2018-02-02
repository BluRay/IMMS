<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>奖惩汇总</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet"
	href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet"
	href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/zTreeStyle/metro.css"
	type="text/css">
	<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<!-- 身 -->
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<!-- 左边菜单 -->
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->

					<div class="row" style="margin-left: 0px;">
						<div id="zztree" class="col-xs-2" style="position: relative; left: 0; float: left; border: 1px solid #ccebf8; overflow: auto;color:#616161">
							<ul id="workGroupTree" class="ztree" style="padding-left:0px;"></ul>
						</div>
						<div class="col-xs-10">
							<div class="well">
								<table>
									<tr>
										<td>工号/姓名：</td>
										<td><input type="text" style="height: 30px;width: 150px;margin-right: 3px;"
											class="input-medium revise" placeholder="请输入工号或姓名..." value=""
											id="search_staff_number" /></td>
										<td>月份：</td>	
										<td><input id="search_rewards_date" placeholder="月份..." onclick="WdatePicker({el:'search_rewards_date',dateFmt:'yyyy-MM'});" style="height: 30px;width: 100px;" class="input-small carSeries" type="text"></td>	
										<td><input type="button"
											class="btn btn-sm btn-primary btnQueryRewards" id="btnQueryRewards" value="查询"
											style="margin-left: 10px;"></input>
										</td>
									</tr>
								</table>
							</div>
							<div class="row" >
								<div class="col-xs-12"  id="tableReusltDiv" style="">
									<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px; width:1800px;overflow-x:auto;">
									</table>
								</div>
							</div>
						</div>
					</div>
				
			</div>
			<!-- /.main-container -->
		</div>

		<script src="../js/datePicker/WdatePicker.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/ztree/jquery.ztree.core-3.5.min.js"></script>
		<script src="../assets/js/jszip.min.js"></script>
		<script src="../assets/js/dataTables.buttons.js"></script>
		<script src="../assets/js/buttons.colVis.js"></script>
		<script src="../assets/js/buttons.html5.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/hr/rewardsCollect.js"></script>
		
</body>

</html>
