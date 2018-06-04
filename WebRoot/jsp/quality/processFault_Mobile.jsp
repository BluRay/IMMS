<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
						<li><a href="#">售后问题反馈</a></li>
					</ul>
					<!-- /.breadcrumb -->
					<div class="nav-search" id="nav-search" style="margin-top: 5px;margin-right:10px;">
						<i id="btn_clear" class="ace-icon fa fa-refresh  red bigger-160" style="cursor:pointer;margin-right:20px;"></i>
						<i id="btn_save" class="ace-icon fa fa-floppy-o green bigger-160" style="cursor:pointer"></i>
					</div>
				</div>

				<div class="page-content" style="position:fixed;top:38px;bottom:10px;width:100%;overflow-y:auto;padding-left: 0px;padding-right:12px;">
					<form class="form-horizontal" id="scan_form">
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">VIN号:</label>
							<div class="col-xs-9">
								<span class="input-icon input-icon-right" style="width: 100%;">
										<input id="new_vin" type="text" class="input-medium" style="width:100%;height:30px;">
										<i id="btn_scan" class="ace-icon fa fa-barcode green bigger-160" style="cursor:pointer"></i>
								</span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">销售地区:</label>
							<div class="col-xs-9">
								<select id="new_area" class="form-control" style="width:100%"></select>
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">车牌号码:</label>
							<div class="col-xs-9">
								<input id="new_license_number" class="input-medium" style="width:100%;height:30px;" placeholder="车牌号码..." type="text">
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">反馈日期:</label>
							<div class="col-xs-9">
								<input id="new_fault_date" class="input-medium" style="width:100%;height:30px;" placeholder="选择反馈日期..." onclick="WdatePicker({el:'new_fault_date',dateFmt:'yyyy-MM-dd'});" type="text">
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">故障里程:</label>
							<div class="col-xs-9">
								<input id="new_fault_mils" class="input-medium" style="width:100%;height:30px;" placeholder="故障里程..." type="text">
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">故障等级:</label>
							<div class="col-xs-9">
								<select id="new_fault_level" class="input-medium" style="width:100%">
								<option value="">请选择</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="S">S</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">故障性质:</label>
							<div class="col-xs-9">
								<select id="new_is_batch" class="input-medium" style="width:100%">
								<option value="">请选择</option>
								<option value="0">非批量</option>
								<option value="1">批量</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">故障描述:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="new_fault_phenomenon" rows="2" style="width:100%;"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">故障原因:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="new_fault_reason" rows="2" style="width:100%;"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理方法:</label>
							<div class="col-xs-9">
								<textarea style="width:100%" class="input-xlarge" id="new_resolve_method" rows="2" style="width:100%;"></textarea>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理前照片:</label>
							<div id="photo_div" class="col-xs-9">
							<img onclick="fun_openCamera(0);" width="100%" height="200" id='img_src_0'></img><br/>
							*点击上方图片框拍摄照片<br/>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理后照片:</label>
							<div id="photo_div2" class="col-xs-9">
							<img onclick="fun_openCamera2(0);" width="100%" height="200" id='img2_src_0'></img><br/>
							*点击上方图片框拍摄照片<br/>
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">生产订单:</label>
							<div class="col-xs-9">
								<input id="new_order_no" class="input-medium" style="width:100%;height:30px;" placeholder="生产订单..." type="text">
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">生产工厂:</label>
							<div class="col-xs-9">
								<select id="new_factory" class="input-medium" style="width:100%"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">车辆型号:</label>
							<div class="col-xs-9">
								<select id="new_bus_type" class="input-medium" style="width:100%">
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">责任工厂:</label>
							<div class="col-xs-9">
								<select id="new_response_factory" class="input-small" style="width:100%"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">责任车间:</label>
							<div class="col-xs-9">
								<select id="new_workshop" class="input-small" style="width:100%"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理人:</label>
							<div class="col-xs-9">
								<input id="new_resolve_user" class="input-medium" style="width:100%;height:30px;" placeholder="处理人..." type="text">
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理结果:</label>
							<div class="col-xs-9">
								<select class="input-medium" id="new_resolve_result" style="width:100%"><option value="0">关闭</option><option value="1">受理</option></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处理日期:</label>
							<div class="col-xs-9">
								<input id="new_resolve_date" class="input-medium" style="width:100%;height:30px;" placeholder="选择处理日期..." onclick="WdatePicker({el:'new_resolve_date',dateFmt:'yyyy-MM-dd'});" type="text">
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">处罚情况:</label>
							<div class="col-xs-9">
								<input id="new_punish" class="input-medium" style="width:100%;height:30px;" placeholder="处罚情况..." type="text">
							</div>
						</div>	
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">索赔情况:</label>
							<div class="col-xs-9">
								<input id="new_compensation" class="input-medium" style="width:100%;height:30px;" placeholder="索赔情况..." type="text">
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-3 control-label no-padding-right">备注信息:</label>
							<div class="col-xs-9">
								<input id="new_memo" class="input-medium" style="width:100%;height:30px;" placeholder="备注信息..." type="text">
								<input type="text" class="input-medium" id="new_order_desc" style="display:none;width:40px"/>
							</div>
						</div>
						
					</form>
				</div>
			<!-- /.main-container -->
		</div>
		<script src="../assets/js/jquery.min.js"></script>
		<script src="../js/datePicker/WdatePicker.js"></script>		
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
		<script src="../js/jquery.form.js"></script>
		<script src="../js/common.js"></script>
		<script src="../js/quality/processFault_Mobile.js"></script>
</div>
</body>
</html>