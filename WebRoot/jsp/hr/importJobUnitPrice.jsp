<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>等待工时单价导入</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" /> 
<style type="text/css">
	#tableResult,#tableResult_wrapper td{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	}
</style>
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">
				<div id="form" class="well form-search">
					<table>
						<tr>	
							<td>&nbsp;工厂：</td>
							<td><select id="search_factory" class="input-small" style="height: 30px;width:90px"></select></td>
							<td>标准岗位：</td>
							<td><input id="search_job" placeholder="请输入标准岗位..." style="height: 30px;width:100px" type="text"></td>
							<td>生效日期：</td>
							<td>
									<input id="search_effective_date" style="width:90px;height: 30px;" class="input-small"  onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">		
							</td>
							<td>
								<input id="btnQuery" style="margin-top: 5px;margin-left:10px;" 
							    type="button" class="btn btn-sm btn-primary" value="查询"/>&nbsp;&nbsp;
							</td>
							<td><span style="color: red;padding-left: 10px;">*</span>单价导入：</td>
							<td style="padding-top:5px">
								<form id="uploadForm" action="#" enctype="multipart/form-data" method="post">
									<table>
										<tr>
											<td width="220px"><input id="file" type="file" name="file" accept="*.xlsx"/></td>
											<td></td>
										</tr>
									</table>
						        </form>
							</td>
							<td style="text-align: center;"><a href="../docs/jobUnitPrice.xlsx">&nbsp;&nbsp;下载模板</a></td>
							<td >
							<input id="btn_upload" style="margin-top: 5px;margin-left:0px;" 
							    type="button" class="btn btn-sm btn-primary" value="导入"/>&nbsp;&nbsp;
							<input type="button"
								class="btn btn-sm btn-success btnSave" id="btnSave" value="保存"
								style="margin-top: 5px;margin-right: 0px"></input>&nbsp;&nbsp;
							<input type="button"
							    class="btn btn-sm btn-info" id="btnBack" value="取消"
							    style="margin-top: 5px;margin-right: 0px;"></input>&nbsp;&nbsp;
							</td>
						</tr>
					</table>
				</div>
				<div class="row"  >
					<div class="col-xs-12" style="width: 99.8%;">
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;table-layout:fixed;width:99.8%;overflow-x:hidden;" >
						    <thead>
<!-- 						       <tr>
						          <th align="center">序号</th>
						          <th align="center">SAP</th>
						          <th align="center"><span style="color: red;">*</span>自制件类别</th>
						          <th align="center"><span style="color: red;">*</span>物料描述</th>
						          <th align="center"><span style="color: red;">*</span>物料类型</th>
						          <th align="center"><span style="color: red;">*</span>材料/规格</th>
						          <th align="center">单位</th>
						          <th align="center">单车损耗%</th>
						          <th align="center"><span style="color: red;">*</span>单车用量</th>
						          <th align="center">单重</th>
						          <th align="center">总重(含损耗)</th>
						          <th align="center"><span style="color: red;">*</span>使用车间</th>
						          <th align="center"><span style="color: red;">*</span>使用线别</th>
						          <th align="center">工序</th>
						          <th align="center">装配位置</th>
						          <th align="center">工艺标识</th>
						          <th align="center"><span style="color: red;">*</span>下料尺寸</th>
						          <th align="center">精度要求</th>
						          <th align="center">表面处理</th>
						          <th align="center">备注</th>
						          <th align="center">工艺备注</th>
						          <th align="center">分包类型</th>
						          <th align="center">加工顺序</th>
						          <th align="center">工艺流程</th>
						          <th align="center">所属班组</th>
						          <th align="center">变更说明</th>
						          <th align="center">变更主体</th>
						       </tr> -->
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
    <script src="../js/hr/importJobUnitPrice.js"></script>
</body>

</html>
