<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
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
						<li><a href="#">车间供应新增</a></li>
					</ul>
					<!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">						
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_back" class="ace-icon fa fa-arrow-circle-left red bigger-160" onclick="window.history.go(-1)"style="cursor:pointer;"></i>
					</div>
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<form class="form-horizontal" id="scan_form">
					<div class="ace-scroll" data-size="800" style="padding-right:5px">
					    <div class="form-group has-info" style="margin-bottom: 5px;">
							<label class="col-xs-3 control-label no-padding-right">物料描述:</label>
							<div class="col-xs-9">
								<!-- <input id="vinText"  type="text" class="input-medium" style="width:100%;height:30px;"/> -->
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="mat_desc" type="text" class="input-medium" style="width:100%;height:30px;">
										<i id="btn_scan" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>
								</span>
							</div>
						</div>
					    <div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">订单:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="order" type="text" class="input-medium"
										style="width:100%;height:30px;">			
								</span>
							</div>
						</div>
<!-- 					    <div class="form-group has-info"> -->
<!-- 							<label class="col-xs-3 control-label no-padding-right">订单描述:</label> -->
<!-- 							<div class="col-xs-9"> -->
<!-- 								<span class="input-icon input-icon-right" style="width: 100%;"> -->
<!-- 										<input id="order_desc" type="text" class="input-medium" -->
<!-- 										style="width:100%;height:30px;" readonly>			 -->
<!-- 								</span> -->
<!-- 							</div> -->
<!-- 						</div> -->
					    <div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产工厂:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
									<select id="factory" class="input-small" style="width:100%;height:30px;">
							        </select>			
								</span>
							</div>
						</div>
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产车间:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
									<select id="workshop" class="input-small" style="width:100%;height:30px;">
							        </select>			
								</span>
							</div>
						</div>
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">生产线别:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
									<select id="line" class="input-small" style="width:100%;height:30px;">
							        </select>			
								</span>
							</div>
						</div>
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">自制件类别:</label>
							<div class="col-xs-9">
								<select id="zzj_type" class="input-medium" style="width:100%">
								</select>
							</div>
						</div>
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">接收车间:</label>
							<div class="col-xs-9">
								<select id="receiving_workshop" class="input-medium" style="width:100%" >
								</select>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right" style="text-align:right">需求数量:</label>
							<div class="col-xs-9">
								<input id="demand_quantity" type="text" class="input-medium" style="width:100%;height:30px;" readonly/>
							</div>
						</div>
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right" style="text-align:right">累计供应数量:</label>
							<div class="col-xs-9">
								<input id="received_quantity" type="text" class="input-medium" style="width:100%;height:30px;" readonly/>
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">供应数量:</label>
							<div class="col-xs-9">
								<input id="quantity" type="text" class="input-medium" style="width:100%;height:30px;" />
							</div>
						</div>
						
						<div class="form-group has-info">
							<label class="col-xs-3 control-label no-padding-right">供应日期:</label>
							<div class="col-xs-9">
								<input id="business_date" type="text" class="input-medium" style="width:100%;height:30px;" 
								onclick="WdatePicker({el:'business_date',dateFmt:'yyyy-MM-dd'});" />
							</div>
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
		<script src="../js/zzj/zzjWorkshopSupplyAdd_Mobile.js"></script>
    </div>
</body>
</html>