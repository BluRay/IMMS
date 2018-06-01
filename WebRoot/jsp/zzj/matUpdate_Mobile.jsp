<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap-editable.css">
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">
label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}
</style>
<jsp:include page="../common.jsp"></jsp:include>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<%-- <jsp:include page="../top.jsp" flush="true" /> --%>
	<!-- 身 -->
	<div class="main-container" id="main-container" style="height:100%">
		<!-- 左边菜单 -->
		<%-- <jsp:include page="../left.jsp" flush="true" /> --%>
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
				<div class="breadcrumbs breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb" style="font-size:14px;">
					<li><a href="/BMS/index_mobile"><i class="ace-icon fa fa-home home-icon bigger-160"></i>BMS</a></li>
						<li><a href="#">产量修改</a></li>
					</ul>
					<!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">						
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_delete" class="ace-icon fa fa-trash-o red bigger-160" style="cursor:pointer;"></i>
					</div>
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<input type="hidden" id="factory_prepage" value="${factory_id}">
					<input type="hidden" id="workshop_prepage" value="${workshop}">
					<input type="hidden" id="line_prepage" value="${line}">
					<input type="hidden" id="team_prepage" value="${team}">
					<input type="hidden" id="process_prepage" value="${process}">
					<input type="hidden" id="order_prepage" value="${order_no}">
					<input type="hidden" id="zzj_type_prepage" value="${zzj_type}">
					<input type="hidden" id="batch_prepage" value="${batch}">
					<input type="hidden" id="output_id" value="${output_id}">
					
					
					<form class="form-horizontal" id="scan_form">
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产工厂:</label>
							<div class="col-xs-9">
								<select id="factory" class="input-medium" style="width:37%" disabled>
								</select>
								<select id="workshop" class="input-medium" style="width:37%" disabled>
								</select>
								<select id="line" class="input-medium" style="width:21%" disabled>
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">物料描述:</label>
							<div class="col-xs-9">
								<!-- <input id="vinText"  type="text" class="input-medium" style="width:100%;height:30px;"/> -->
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="mat_desc" type="text" class="input-medium"  value="${mat_desc}"
										style="width:100%;height:30px;" readonly>			
								</span>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">自制件类别:</label>
							<div class="col-xs-9">
								<select id="zzj_type" class="input-medium" style="width:100%" disabled>
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">材料规格:</label>
							<div class="col-xs-9">
								<select id="specification" class="input-medium" style="width:100%" disabled>
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">下料尺寸:</label>
							<div class="col-xs-9">
								<select id="filling_size" class="input-medium" style="width:100%" disabled>
									<!-- <option value=''>请选择</option> -->
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right" style="text-align:right">订单:</label>
							<div class="col-xs-9">
								<input id="order" type="text" class="input-medium" style="width:100%;height:30px;" value="${order_desc}" readonly/>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产批次:</label>
							<div class="col-xs-9">
								<select id="batch" class="input-medium" style="width:40%">
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产数量:</label>
							<div class="col-xs-9">
								<input id="product_num" type="text" value="${output}" class="input-medium" style="width:100%;height:30px;" />
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产日期:</label>
							<div class="col-xs-9">
								<input id="product_date" type="text" class="input-medium" style="width:100%;height:30px;" 
								value="${product_date}"
								onclick="WdatePicker({el:'product_date',dateFmt:'yyyy-MM-dd'});" />
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产工序:</label>
							<div class="col-xs-9">
								<select id="process" class="input-medium" style="width:40%">
								</select>
							</div>
						</div>		
								
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产班组:</label>
							<div class="col-xs-9">
								<select id="team" class="input-medium" style="width:100%">
								</select>
							</div>
						</div>	
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">备注:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="memo" rows="2" style="width:100%;"></textarea>
							</div>
						</div>				
					</form>
				</div>
			<!-- /.main-container -->
		</div>
		
		<script src="../js/datePicker/WdatePicker.js"></script>	
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/zzj/matUpdate_Mobile.js"></script>
</div>
</body>
</html>