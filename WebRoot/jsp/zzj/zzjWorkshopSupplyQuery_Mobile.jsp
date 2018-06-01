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
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/common.css">
<style type="text/css" media="screen">
label {
    font-weight: 400;
    font-size: 13px;
    text-align:right;
}

.table, .table * {margin: 0 auto; padding: 0;font-size: 14px;font-family: Arial, 宋体, Helvetica, sans-serif;}   
.table {display: table; width: 80%; border-collapse: collapse;}   
.table-tr {display: table-row; height: 30px;}   
.table-th {display: table-cell;font-weight: bold;height: 100%;border-bottom: 1px solid #eef4f9;text-align: center;vertical-align: middle;}   
.table-td {display: table-cell; height: 100%;border-bottom: 1px solid #eef4f9; text-align: center;vertical-align: middle;}   

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
						<li><a href="#">车间供应查询</a></li>
					</ul>
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">	
					    <a href="/BMS/zzj/zzjWorkshopSupplyAdd_Mobile">					
						<i id="btn_add" class="ace-icon fa fa-plus-square green bigger-160" style="cursor:pointer;margin-right:5px;"></i>
					    </a>
					</div>
					<!-- /.breadcrumb -->
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;padding-left: 15px;padding-right:12px;">				
					<form class="form-horizontal" id="scan_form" >
						<div class="form-group has-info" style="margin-bottom: 5px;">
							<label class="col-xs-3 control-label no-padding-right">生产工厂:</label>
							<div class="col-xs-9">
								<select id="factory" class="input-medium" style="width:37%">
								</select>
								<select id="workshop" class="input-medium" style="width:37%">
								</select>
								<select id="line" class="input-medium" style="width:21%">
								</select>
							</div>
						</div>
						
						<div class="form-group has-info" style="margin-bottom: 5px;">
							<label class="col-xs-3 control-label no-padding-right no-padding-left" >订单:</label>
							<div class="col-xs-9">
							    <span class="input-icon input-icon-right" style="width: 100%;">
								    <input id="order" type="text" class="input-medium" style="width:100%;height:30px;" />
                                </span>
							</div>
						</div>	
						<div class="form-group has-info" style="margin-bottom: 5px;">
							<label class="col-xs-3 control-label no-padding-right no-padding-left">日期:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
									<input id="business_date" type="text" class="input-medium" style="width:100%;height:30px;" 
									onclick="WdatePicker({el:'business_date',dateFmt:'yyyy-MM-dd',onpicked:function(){ajaxQuery();}});" />
								</span>
							</div>
						</div>					
						<div class="form-group has-info" style="margin-bottom: 5px;">
							<label class="col-xs-3 control-label no-padding-right">物料描述:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
									<input id="mat_desc" type="text" class="input-medium" style="width:100%;height:30px;">
									<i id="btn_scan" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>
								</span>
							</div>
						</div>	
					</form>
					
					<div class="scrollable ace-scroll" data-size="300">
						<div style="width:100%;" align="center">											
                            <div class="table" style="float:right;">  
						        <div class="table-tr" id="tr-0" style="width:100%;margin-right:5px">  
						            <div class="table-th">物料描述</div>  
						            <div class="table-th">数量</div>  
						        </div>  
						    </div>  
						</div>		
					</div>
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
		<script src="../js/zzj/zzjWorkshopSupplyQuery_Mobile.js"></script>
     </div>
   </body>
</html>