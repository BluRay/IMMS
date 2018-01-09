<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>BMS</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../css/bootstrap.3.2.css">
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
						<li><a href="/BMS/report/reportIndexMobile">报表</a></li>
					</ul>
					<!-- /.breadcrumb 
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">
						<i id="btn_clear" class="ace-icon fa fa-refresh  red bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer"></i>
					</div> -->
				</div>
				
				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;padding-left: 5px;padding-right:5px;font-size: 12px;" >
					<!-- /section:settings.box -->
					<div class="page-content-area">
					<form id="search_form" class="well form-search">
						<table style="padding-left: 5px;">
							<tr>
								<td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:90px"></select></td>
								<td><input hidden="hidden" id="start_date" placeholder="开始日期..." style="height: 30px;width:80px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"><input hidden="hidden" id="end_date" placeholder="结束日期..." style="height: 30px;width:80px" type="text" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});"></td>
								<td>
									<select id="search_index" class="input-small" style="height: 30px;width:60px">
										<option value="0">今天</option>
										<option value="1">本周</option>
										<option value="2">本月</option>
									</select>
								</td>
								<td></td>
							</tr>
						</table>
					</form>	
					
					<div class="row" style="height:350px;overflow-y:auto;font-size: 12px;">
						<div class="col-xs-12" style="width:100%;">				
								
							<div id="faq-list-1" class="panel-group accordion-style1 accordion-style2" >
<!-- 											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-1-1" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="pull-right ace-icon fa fa-chevron-left" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>
	
														<i class="ace-icon fa fa-user bigger-130"></i>
														&nbsp; High life accusamus terry richardson ad squid?
													</a>
												</div>
	
												<div class="panel-collapse collapse" id="faq-1-1" style="height: 0px;">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
													</div>
												</div>
											</div> -->

							</div>
								
						</div> <!-- /.col-xs-12t -->
					</div>  <!-- row -->
				</div>
		 </div><!-- /.page-content -->
					
	</div><!-- /.main-content -->
	
	<script src="../js/datePicker/WdatePicker.js"></script>		
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/report/staffUseRate_Mobile.js"></script>
</div>
</body>
</html>