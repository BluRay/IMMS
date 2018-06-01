<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>自制件产量录入</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" /> 

</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">
				<div id="form" class="well form-search">
					<table>
						<tr>
							<td><span style="color: red;">*</span>订单编号：</td>
							<td style="min-width: 250px;"><input id="search_order_no" placeholder="请输入订单编号..." style="height: 30px;width:90px" type="text"><span id="searchOrderInfo"></span></td>
							<td>&nbsp;<span style="color: red;">*</span>工厂：</td>
							<td><select id="search_factory" class="input-small" style="height: 30px;width:120px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>车间：</td>
							<td><select id="search_workshop" class="input-small" style="height: 30px;width:90px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>线别：</td>
							<td><select id="search_line" class="input-small" style="height: 30px;width:70px"></select></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td><span style="color: red;">*</span>产量导入：</td>
							<td colspan=3 style="padding-top:5px">
								<form id="uploadForm" action="#" enctype="multipart/form-data" method="post">
									<table>
										<tr>
											<td width="300px"><input id="file" type="file" name="file" accept="*.xlsx"/></td>
											<td></td>
										</tr>
									</table>
						        </form>
							</td>
							<td colspan=4><a href="../docs/zzjOutput.xlsx">&nbsp;&nbsp;下载导入模板</a></td>
							<td colspan=3>
							<input id="btn_upload" style="margin-top: 5px;margin-left:2px;" 
							    type="button" class="btn btn-sm btn-primary" value="导入"/>&nbsp;&nbsp;
							<input type="button"
								class="btn btn-sm btn-success btnSave" id="btnSave" value="保存"
								style="margin-top: 5px;margin-right: 2px"></input>&nbsp;&nbsp;
							<input type="button"
							    class="btn btn-sm btn-info" id="btnBack" value="取消"
							    style="margin-top: 5px;margin-right: 2px;"></input>&nbsp;&nbsp;
							</td>
						</tr>
					</table>
				</div>
				<div class="row"  >
					<div class="col-xs-12" style="width: calc(100vw + 22px)">
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;table-layout:fixed;width:100%;" >
						    <thead>
 						       <tr>
						          <th align="center">序号</th>
						          <th align="center"><span style="color: red;">*</span>自制件类别</th>
						          <th align="center"><span style="color: red;">*</span>物料描述</th>
						          <th align="center"><span style="color: red;">*</span>生产批次</th>
						          <th align="center"><span style="color: red;">*</span>生产数量</th>
						          <th align="center"><span style="color: red;">*</span>生产日期</th>
						          <th align="center"><span style="color: red;">*</span>生产工序</th>
						          <th align="center">生产班组</th>
						          <th align="center">备注</th>
						          <th align="center"></th>
						       </tr>
						    </thead>
						</table>
					</div>
				</div>
         		<div style="position:absolute;z-index:999;top:50%;left:50%;display: none;" class="divLoading" >
			          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
			    </div>
         </div>
	</div>	
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/tableExport.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
    <script src="../js/zzj/zzjOutput.js"></script>
</body>

</html>
