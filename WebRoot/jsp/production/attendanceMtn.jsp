<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>考勤导入</title>
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
			
<!-- 				<div class="breadcrumbs ace-save-state" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a
							href="/BMS/index">首页</a></li>
						<li><a href="#">生产执行</a></li>
						<li><a href="#">考勤导入</a></li>
					</ul>

					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>

				</div> -->

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
										<td><input id="search__date" placeholder="月份..." onclick="WdatePicker({el:'search__date',dateFmt:'yyyy-MM'});" style="height: 30px;width: 100px;" class="input-small carSeries" type="text"></td>	
										<td><input type="button"
											class="btn btn-sm btn-primary btnQueryRewards" id="btnQueryRewards" value="查询"
											style="margin-left: 10px;"></input>
											<button id='btnBulkAdd' class="btn btn-sm btn-info btnImport">导入</button>
										</td>
									</tr>
								</table>
							</div>
							<div id="divBulkAdd" class="well" style="display:none;">
								<button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
									<form id="uploadRewardsForm" action="#" enctype="multipart/form-data" method="post">
									<table>
										<tr>
											<td><input id="file" type="file" name="file" accept="*.xlsx"/></td>
											<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/></td>
											<td></td><td><a href="../docs/attendance_upload.xls">下载批导模板</a></td>
										</tr>
									</table>
									</form>
							</div>
							<div class="row" >
							<div class="col-xs-12"  id="tableReusltDiv"  style="width: calc(83vw + 18px)">
									<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 10px;">
									</table>
								</div>
							</div>
						</div>
					</div>
				
				<div id="dialog-add" class="hide" style="align:center;width:800px;height:450px">
				<form id="form_add" class="form-horizontal">
					<table>
					<tr style="height:36px">
						<td align="right" style="width:180px">*工号：</td>
						<td style="width:150px">
							<input type="text" class="input-medium" id="new_staff_number" name="new_staff_number" style="width:150px;height:30px;"/><span id="new_staff_name"></span>
						</td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">奖惩工厂：</td>
						<td style="width:150px"><select id="new_rewards_factory" class="input-small" style="width:150px;height:30px;"></select></td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">*奖惩车间：</td>
						<td style="width:150px"><select id="new_rewards_workshop" class="input-small" style="width:150px;height:30px;"></select></td>
					</tr>
					<tr style="height:36px;">
					    <td align="right">* 奖惩日期：</td>
						<td>
							<input type="text" class="input-medium" id="new_rewards_date" name="new_rewards_date" onClick="WdatePicker({el:'new_rewards_date',dateFmt:'yyyy-MM-dd'});" style="width:150px;height:30px;"/>
						</td>
					</tr>
					<tr style="height:36px">
					    <td align="right">* 奖惩事由：</td>
						<td>
							<textarea id="new_reasons" name="new_reasons" style="width: 300px;margin-top: 5px;" rows="1"></textarea>
						</td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">奖分：</td>
						<td><input type="text" class="input-medium" id="new_add" style="width:150px;height:30px;"/></td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">扣分：</td>
						<td><input type="text" class="input-medium" id="new_deduct" style="width:150px;height:30px;"/></td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">* 班组长：</td>
						<td><input type="text" class="input-medium" id="new_group_leader" style="width:150px;height:30px;"/></td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">领班：</td>
						<td><input type="text" class="input-medium" id="new_gaffer" style="width:150px;height:30px;"/></td>
					</tr>
					<tr style="height:36px">
						<td align="right" style="width:180px">处罚建议人：</td>
						<td><input type="text" class="input-medium" id="new_proposer" style="width:150px;height:30px;"/></td>
					</tr>
					</table>
				</form>
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
		<script src="../js/production/attendanceMtn.js"></script>
		
</body>

</html>
