<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>订单总计划导入</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 身 -->
		<div class="main-container" id="main-container" style="overflow:hidden; ">
			<!-- 主体 -->
			<div class="main-content">			

		
					<div class="well">
						<table>
							<tr>
								<td>生产工厂：</td>
								<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
								<td>&nbsp;订单编号：</td>
								<td><input id="search_order_name" style="height: 30px;" placeholder="请输入订单编号..." class="col-sm-10" type="text"></td>
								<td>&nbsp;<input type="button" class="btn btn-sm btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;</td>
								<td>&nbsp;<input id="btnBulkAdd" class="btn btn-sm btn-info" value="批量导入" type="button">&nbsp;</td>
							</tr>
						</table>
					</div>
					
					<div id="divBulkAdd" class="well" style="display:none;">
					<button id="btnBulkHide" type="button" class="close"><i class="ace-icon fa fa-times"></i></button>
						<form id="uploadMasterPlanForm" action="#" enctype="multipart/form-data" method="post">
						<table>
							<tr>
								<td><input id="file" type="file" name="file" accept="*.xlsx"/></td>
								<td><input id="btn_upload" type="button" class="btn btn-sm btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/></td>
								<td></td><td><a href="../docs/masterPlan.xls">下载批导模板</a></td>
							</tr>
						</table>
						</form>
					</div>
					<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
					</table>
			</div><!-- /.main-content -->

			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
	</body>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script type="text/javascript" src="../assets/js/bootstrap3-typeahead.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
	<script type="text/javascript" src="../js/jquery.form.js"></script>
	<script type="text/javascript" src="../js/plan/importMaster.js"></script>
</html>
