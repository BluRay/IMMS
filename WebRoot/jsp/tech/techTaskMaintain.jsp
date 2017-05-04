<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS 标题</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
			<div class="breadcrumbs ace-save-state" id="breadcrumbs">
				<ul class="breadcrumb">
					<li><i class="ace-icon fa fa-home home-icon"></i><a
						href="<%=request.getContextPath()%>/index">首页</a></li>
					<li><a href="#">工程变更</a></li>
					<li class="active">技改任务维护</li>
				</ul>
				<!-- /.breadcrumb -->

				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<span class="input-icon"> <input type="text"
							placeholder="Search ..." class="nav-search-input"
							id="nav-search-input" autocomplete="off" /><i
							class="ace-icon fa fa-search nav-search-icon"></i>
						</span>
					</form>
				</div>
				<!-- /.nav-search -->
			</div>

			<div class="page-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>技改单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入技改单编号..." value=""
								id="search_tech_order_no" /></td>
							<td>技改内容：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入任务内容..." value=""
								id="search_tech_task_content" /></td>
							<!-- <td><select id="search_order_status" class="input-medium revise">
								<option value=''>全部</option>
								<option value='0'>未开始</option>
								<option value='1'>生产中</option>
								<option value='2'>已完成</option>
								</select>
							</td> -->
							<td>技改单日期：</td>
							<td>
								<div class="input-daterange input-group">
									<input type="text" class="input-sm form-control" name="tech_date_start" data-date-format="yyyy-mm-dd" id="tech_date_start"  />
									<span class="input-group-addon">
										<i class="fa fa-exchange"></i>
									</span>

									<input type="text" class="input-sm form-control" name="tech_date_end" data-date-format="yyyy-mm-dd" id="tech_date_end"  />
								</div>
							<td>状态：</td>
							<td><select class="input-medium carType" id="search_tech_task_status" style="width: 80px">
											<option value="">全部</option>
											<option value="已创建">已创建</option>
											<option value="已分配">已分配</option>
											<option value="已评估">已评估</option>
											<option value="已完成">已完成</option>
								</select>
							</td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
								<button id='btnAdd' class="btn btn-sm btn-success">新增</button></td>
						</tr>
					</table>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<table id="tableTechTask"
							class="table table-striped table-bordered table-hover"
							style="font-size: 12px;">
						</table>
					</div>
				</div>


			</div>
			
			<div id="dialog-teckTask_new" class="hide">
				<form id="teckTaskForm_new" enctype="multipart/form-data" method="post" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="new_task_content">*&nbsp;技改任务：</label>
						<div class="col-sm-9">
							<textarea class="form-control" placeholder="" id="new_task_content" name="new_task_content" ></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="new_tech_order_no">*&nbsp;技改单号：</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="new_tech_order_no" name="new_tech_order_no" />
						</div>
						<label class="col-sm-2 col-sm-2 control-label no-padding-right no-padding-right" for="new_tech_point_num">*&nbsp;技改点数：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="new_tech_point_num" name="new_tech_point_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 col-sm-2 control-label no-padding-right no-padding-right" for="newOrderCode">*&nbsp;变更单类型：</label>
						<div class="col-sm-3">
							<select name="new_tech_order_type" id="new_tech_order_type" style="width:100%;" class="input-medium" >
								<option>请选择</option>
							</select>
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="new_tech_type">*&nbsp;技改类型：</label>
						<div class="col-sm-3">
							<select name="new_tech_type" id="new_tech_type" style="width:100%;"
								class="input-medium">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="new_tech_date">*&nbsp;技改单日期：</label>
						<div class="col-sm-3">
							<div class="input-group">
							  <input class="form-control date-picker" id="new_tech_date" name="new_tech_date" type="text" data-date-format="yyyy-mm-dd">
								<span class="input-group-addon">
									<i class="fa fa-calendar bigger-110"></i>
								</span>
							</div>
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="new_duty_unit">*&nbsp;责任单位：</label>
						<div class="col-sm-3">
							<select name="new_duty_unit" id="new_duty_unit" style="width:100%;"
								class="input-medium">
							</select>
						</div>
					</div>
 					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;重大变更：</label>
						<div class="col-sm-3">
							<input value='重大变更' type="checkbox" name="new_major_change" title="" id="new_major_change"/>&nbsp;是
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="new_productive_year">*&nbsp;重复变更：</label>
						<div class="col-sm-3">
							<input value='重复变更' type="checkbox" name="new_repeat_change" title="" id="new_repeat_change"/>&nbsp;是
						</div>
					</div> 
 					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="new_custom_change">&nbsp;顾客变更：</label>
						<div class="col-sm-3">
							<input value='重大变更' type="checkbox" name="new_custom_change" title="" id="new_custom_change"/>&nbsp;是
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="new_custom_change_no">*&nbsp;顾客变更单号：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="new_custom_change_no" name="new_custom_change_no" />
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="new_tech_order_file">&nbsp;技改单附件：</label>
						<div class="col-sm-4">
							<input multiple="" name="new_tech_order_file" type="file" id="new_tech_order_file" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="new_custom_change_no">*&nbsp;顾客变更单附件：</label>
						<div class="col-sm-4">
							<input multiple="" name="new_custom_change_no" type="file" id="new_custom_change_file" />
						</div>
					</div>

				</form>
				<form id="uploadForm" class="form-horizontal" action="" enctype="multipart/form-data" method="post">
					<div class="form-group" id="upload_div">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">*&nbsp;配置信息：</label>
						<div class="col-sm-9">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xlsx" type="file"> 				
								</div>
								<div class="col-sm-4">
									<input id="btn_upload" style="margin-left: 20px;padding:0px 0px;font-size: 12px;height:32px;" class="btn btn-primary" value="上传并导入" onclick="javascript:return upload(this.form, this.form.file.value)" type="button"> 
									<a style="padding-left: 25px;" href="../docs/Tech_ChangedMaterialList.xlsx">下载批导模板</a>
								</div>							
						</div>
					</div>
					<div class="form-group">					
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover" id="Tech_ChangedMaterialTable">
							</table>
						</div>
					</div>
				</form>
			</div>
			
			<div id="dialog-teckTask_moidfy" class="hide">
				<form id="teckTaskForm_moidfy" enctype="multipart/form-data" method="post" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="modify_task_content">*&nbsp;技改任务：</label>
						<div class="col-sm-9">
							<textarea class="form-control" placeholder="" id="modify_task_content" name="modify_task_content" ></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="modify_tech_order_no">*&nbsp;技改单号：</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="modify_tech_order_no" name="modify_tech_order_no" />
						</div>
						<label class="col-sm-2 col-sm-2 control-label no-padding-right no-padding-right" for="modify_tech_point_num">*&nbsp;技改点数：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="modify_tech_point_num" name="modify_tech_point_num" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 col-sm-2 control-label no-padding-right no-padding-right" for="modify_tech_order_type">*&nbsp;变更单类型：</label>
						<div class="col-sm-3">
							<select name="modify_tech_order_type" id="modify_tech_order_type" style="width:100%;" class="input-medium" >
								<option>请选择</option>
							</select>
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="modify_tech_type">*&nbsp;技改类型：</label>
						<div class="col-sm-3">
							<select name="modify_tech_type" id="modify_tech_type" style="width:100%;"
								class="input-medium">
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="modify_tech_date">*&nbsp;技改单日期：</label>
						<div class="col-sm-3">
							<div class="input-group">
							  <input class="form-control date-picker" id="modify_tech_date" name="modify_tech_date" type="text" data-date-format="yyyy-mm-dd">
								<span class="input-group-addon">
									<i class="fa fa-calendar bigger-110"></i>
								</span>
							</div>
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="modify_duty_unit">*&nbsp;责任单位：</label>
						<div class="col-sm-3">
							<select name="modify_duty_unit" id="modify_duty_unit" style="width:100%;"
								class="input-medium">
							</select>
						</div>
					</div>
 					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;重大变更：</label>
						<div class="col-sm-3">
							<input value='重大变更' type="checkbox" name="modify_major_change" title="" id="modify_major_change"/>&nbsp;是
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="modify_productive_year">*&nbsp;重复变更：</label>
						<div class="col-sm-3">
							<input value='重复变更' type="checkbox" name="modify_repeat_change" title="" id="modify_repeat_change"/>&nbsp;是
						</div>
					</div> 
 					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="modify_custom_change">&nbsp;顾客变更：</label>
						<div class="col-sm-3">
							<input value='重大变更' type="checkbox" name="modify_custom_change" title="" id="modify_custom_change"/>&nbsp;是
						</div>
						<label class="col-sm-3 control-label no-padding-right" for="modify_custom_change_no">*&nbsp;顾客变更单号：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:100%;"
								placeholder="" id="modify_custom_change_no" name="modify_custom_change_no" />
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="modify_tech_order_file">&nbsp;技改单附件：</label>
						<div class="col-sm-4">
							<input multiple="" name="modify_tech_order_file" type="file" id="modify_tech_order_file" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="modify_custom_change_no">*&nbsp;顾客变更单附件：</label>
						<div class="col-sm-4">
							<input multiple="" name="modify_custom_change_no" type="file" id="modify_custom_change_file" />
						</div>
					</div>

				</form>
				<form id="uploadForm_moidfy" class="form-horizontal" action="" enctype="multipart/form-data" method="post">
					<div class="form-group" id="upload_div_modify">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">*&nbsp;配置信息：</label>
						<div class="col-sm-9">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xlsx" type="file"> 				
								</div>
								<div class="col-sm-4">
									<input id="btn_upload_moidfy" style="margin-left: 20px;padding:0px 0px;font-size: 12px;height:32px;" class="btn btn-primary" value="上传并导入" onclick="javascript:return upload(this.form, this.form.file.value,this.parent().parent().parent().siblings(1).children().children()" type="button"> 
									<a style="padding-left: 25px;" href="../docs/Tech_ChangedMaterialList.xlsx">下载批导模板</a>
								</div>							
						</div>
					</div>
					<div class="form-group">					
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover" >
							</table>
						</div>
					</div>
				</form>
			</div>
			
		</div>
	</div>	
		<!-- /.main-container -->
	</div>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/date-time/bootstrap-datepicker.min.js"></script>
	<script src="../assets/js/date-time/locales/bootstrap-datepicker.zh-CN.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script src="../assets/js/bootbox.min.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../js/tech/techTaskMaintain.js"></script>
</body>

</html>
