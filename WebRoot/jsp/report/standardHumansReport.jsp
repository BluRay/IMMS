<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>标准人力报表</title>
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
						<table style="line-height:1.7">
						    <tr>
                                <td>工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:100px"></select></td>
<!-- 								<td>&nbsp;日期：</td> -->
<!-- 								<td><input id="start_date" placeholder="日期..." style="height: 30px;width:125px" type="text" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"> -  -->
								
								<td>
								   <input id="btnQuery" type="button" class="btn btn-sm btn-success" value="查询" style="margin-left: 2px;">&nbsp;
								   <input id="btnExport" type="button" class="btn btn-sm btn-success" value="导出" style="margin-left: 2px;">
								</td>
								<td></td>
						    </tr>						
						</table>
					</form>	
					
					<div class="row">
						<div class="col-xs-12" style="width:100%">				
							
							<table id="tableResult" style="font-size:12px;overflow:auto"  class="table table-striped table-bordered table-hover">
						        <thead></thead>
						        <tbody></tbody>
						    </table>
						</div>
					</div>
					
				
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
	<script>
		var $table = $('#table'),$remove = $('#remove'),selections = [];
	</script>
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/tableExport.js"></script>
	<script src="../js/report/standardHumansReport.js"></script>
</html>
