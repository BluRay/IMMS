<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>工厂计划达成率</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
		<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css"  >
		<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
		<style>
			table th,td{
				text-align:center;
			}
		</style>
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow-x:hidden; ">
			<!-- 主体 -->
			<div class="main-content">			
					
					<form id="search_form" class="well form-search">
						<table style="line-height:1.7">
						<tr>
							<td style="text-align:right">统计维度：</td>
							<td>
								<select id="search_wd" class="input-medium" style="width:120px;">
									<option value='上月'>上月</option>
									<option value='上周'>上周</option>
									<option selected value='当日'>当日</option>
									<option value='本月'>本月</option>
								</select>
							</td>							
							<td>
							<input class="btn btn-sm btn-primary" id="btnQuery" value="查询" style="margin-left: 10px;top:1px;" type="button">							
							</td>
						</tr>						
						</table>
						<div style="margin-top: -20px;" class="dt-buttons"><a style="border: 0px none;" href="#" aria-controls="tableResult" tabindex="0" class="dt-button disabled buttons-excel buttons-html5 black"><span><i class="fa fa-file-excel-o bigger-130" tooltip="导出excel"></i></span></a></div>
					</form>	
					
					<div class="row">
						<div class="col-xs-12" style="width:100%;">				
							
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;overflow-y:auto;width:100%;text-align:center;">
						</table>
						</div>
					</div>
					
				</div>

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
		
		</div><!-- /.main-container -->
	</body>

	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<!-- <script src="../assets/js/dataTables.rowGroup.min.js"></script> -->
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../js/exportTable2Excel.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/report/factoryRateReport.js"></script>
</html>
