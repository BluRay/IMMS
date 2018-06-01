<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>配置导入</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow: hidden;">
		<div class="main-content">

				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单编号..." value=""
								id="search_order_no" /></td>
							<td>订单名称：</td>
							<td><input type="text" style="height: 30px;"
								class="input-medium revise" placeholder="请输入订单名称..." value=""
								id="search_order_name" /></td>
							<td>生产年份：</td>
							<td>
								<input class="input-small"  style="height: 30px;" id="search_productive_year" onclick="WdatePicker({el:'search_productive_year',dateFmt:'yyyy'});" type="text">
							</td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
								<!-- <input type="button"
								class="btn btn-sm btn-success btnQuery" id="btnAdd" value="新增"
								style="margin-left: 2px;"></input> -->
							</td>
						</tr>
					</table>
				</div>

				<div class="row">
					<div class="col-xs-12">
						<table id="tableOrder" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
						</table>
					</div>
				</div>
			</div>
	</div>
	<div id="dialog-config" class="hide">
				<div id="config_form" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="order">*&nbsp;订单：</label>
						<div class="col-sm-3">
							<!-- <p style="width:98%;margin-bottom: 4px;font-size: 14px;margin-top: 4px;"id="order" >D2017003 K7 200台</p> -->
							<input type="text"  class="input-medium" style="width:100%"  id="order"  placeholder="订单编号.." />
							<input type="text" style="display:none" id="order_id" />
						</div>
						<div id="order_desc"></div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="configName">*&nbsp;配置名称：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="配置名称..." id="configName" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="configQty">*&nbsp;配置数量：</label>
						<div class="col-sm-3">
							<input type="text" class="input-medium" style="width:100%"
								placeholder="配置数量..." id="configQty" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="materialNo">&nbsp;总成料号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="总成料号..." id="materialNo" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="customer">&nbsp;客户：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="客户..." id="customer" />
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="material">&nbsp;物料描述：</label>
						<div class="col-sm-8">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="物料描述..." id="material" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vehicle_length">&nbsp;品牌：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="品牌..." id="brand"  value="比亚迪牌"  readonly="readonly"/>
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="wheelbase">&nbsp;制造商：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="制造商..." id="manufacturer" value="比亚迪汽车工业有限公司" readonly="readonly" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vehicle_length">&nbsp;车辆类型：</label>
						<div class="col-sm-3">
							<select name="vehicle_type" id="vehicle_type" class="input-medium vehicle_type" style="width:100%" >
								<option value="客车">客车</option>
								<option value="乘用车" >乘用车</option>
								<option value="货车" >货车</option>
								<option value="专用车" >专用车</option>
							</select>
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="wheelbase">&nbsp;动力类型：</label>
						<div class="col-sm-3">
							<select name="power_type" id="power_type" class="input-medium power_type" style="width:100%" >
								<option value="纯电动" >纯电动</option>
								<option value="插电混合" >插电混合</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vehicle_length">&nbsp;车辆长度：</label>
						<div class="col-sm-3">
							<span class="input-icon input-icon-right">
								<input type="text"  class="input-medium" style="width:100%" placeholder="车辆长度..." id="vehicle_length" />
								<span style="margin-left:-30px;">mm</span>
							</span>
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="wheelbase">&nbsp;轴距：</label>
						<div class="col-sm-3">
							<span class="input-icon input-icon-right">
								<input type="text"  class="input-medium" style="width:100%" placeholder="轴距..." id="wheelbase" />
								<span style="margin-left:-30px;">mm</span>
							</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="max_weight">&nbsp;最大允许总质量：</label>
						<div class="col-sm-3">
							<span class="input-icon input-icon-right">
								<input type="text"  class="input-medium" style="width:100%" placeholder="最大允许总质量..." id="max_weight" />
								<span style="margin-left:-25px;">KG</span>
							</span>
						</div>
						
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="max_speed">&nbsp;最高车速：</label>
						<div class="col-sm-3">
							<span class="input-icon input-icon-right">
								<input type="text"  class="input-medium" style="width:100%" placeholder="最高车速..." id="max_speed" />
								<span style="margin-left:-45px;">KM/H</span>
							</span>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="drive_motor">&nbsp;驱动电机：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="驱动电机..." id="drive_motor" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="motor_power">&nbsp;电机最大功率：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="电机最大功率..." id="motor_power" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="battery_capacity">&nbsp;电池容量：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="电池容量..." id="battery_capacity" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="battery_model">&nbsp;电池型号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="电池型号..." id="battery_model" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="rated_voltage">&nbsp;额定电压：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="额定电压..." id="rated_voltage" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="light_downdip">&nbsp;灯光下倾值：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="灯光下倾值..." id="light_downdip" />
						</div>
					</div>
					
					<div class="form-group" id="upload_div">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderCode">&nbsp;配置信息：</label>
						<div class="col-sm-9">
							<form id="uploadForm" action="" enctype="multipart/form-data" method="post">
								<div class="col-sm-4">
									<input id="file" style="margin-left: -10px;padding:0px 0px;font-size: 12px" class="btn btn-info btn-small" name="file" accept=".xls" type="file"> 				
								</div>
								<div class="col-sm-4">
									<input id="btn_upload" style="padding:0px 0px;font-size: 12px;height:35px" class="btn btn-primary" value="上传并导入" onclick="javascript:return upload(this.form, this.form.file.value)" type="button"> 
									<a href="../docs/configDetail.xls">下载批导模板</a>
								</div>							
							</form>
						</div>
						
					</div>

					<div class="form-group">					
						<div class="col-sm-12">			
							<table class="table table-striped table-bordered table-hover" style="width:1000px;overflow-x:auto;font-size:12px;" id="orderConfigTable">
							</table>
						</div>
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
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	
	 <script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
	<script src="../assets/js/buttons.html5.js"></script>
	<script src="../assets/js/buttons.flash.js"></script> 
	
	<script src="../js/jquery.form.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/order/configUpload.js"></script>
</body>
</html>
