<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>车间计划达成率</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- 		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" /> -->
<!-- 		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" /> -->
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
		<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<div class="main-container" id="main-container" style="overflow: hidden;">
			<div class="main-content">			
					
					<form id="search_form" class="well form-search">
						<table>
							<tr>
								<td>工厂：</td>
								<td>
									<select name="" id="search_factory" class="input-medium carType" style="height: 30px;width:100px;" ></select>
								</td>
								<td >
									<input type="text"   type="text" name="start_date" id="start_date"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"/>
									至&nbsp;<input type="text" type="text" name="end_date" id="end_date" class="Wdate" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});" style="height:30px;background-color: white;width:120px" />
								</td>
								
								<td colspan='3' style="padding-left:5px;width:280px">
								<label><input type="radio" name="xx" class="radio" id="week" checked="checked" value="W" style="margin-left: 2px;"/>本周</label>
								<label><input type="radio" name="xx" class="radio" id="month" value="M" style="margin-left: 2px;"/>本月</label>
								<label><input type="radio" name="xx" class="radio" id="year" value="Y" style="margin-left: 2px;"/>本年</label>
								</td>
								<td><input type="button" class="btn btn-primary"
										id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>		
							</tr>

						</table>
					</form>	
					
					<div class="row">
						<div id="containerReport" style="max-width: 1200px;min-width: 500px;margin: auto;" align="center">
				
			            </div>
					</div>
					
				</div>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
	</body>
	<script>
		var $table = $('#table'),$remove = $('#remove'),selections = [];
	</script>
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
<!-- 	<script src="../assets/js/jquery.dataTables.min.js"></script> -->
<!-- 	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script> -->
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script type="text/javascript" src="../js/highcharts.js"></script>
	<script type="text/javascript" src="../js/exporting.js"></script>
	<script src="../js/report/workshopRateReport.js"></script>
</html>
