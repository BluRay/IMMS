<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>订单配置参数维护</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" /> 
<link rel="stylesheet" href="../assets/css/buttons.dataTables.css" /> 
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<div class="main-container" id="main-container" style="overflow-x:hidden; ">
		<div class="main-content">

				<div id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号：</td>
							<td><input type="text" style="height: 30px;"
								class="input-large revise" placeholder="请输入订单编号..." value=""
								id="search_order_no" /></td>
							<td>订单名称：</td>
							<td><input type="text" style="height: 30px;"
								class="input-large revise" placeholder="请输入订单名称..." value=""
								id="search_order_name" /></td>
							<!-- <td><select id="search_order_status" class="input-large revise">
								<option value=''>全部</option>
								<option value='0'>未开始</option>
								<option value='1'>生产中</option>
								<option value='2'>已完成</option>
								</select>
							</td> -->
							<td>生产年份：</td>
							<td><!-- <select name="" id="search_productive_year"
								class="input-small">
							</select> -->
								<input class="input-small"  style="height: 30px;" id="search_productive_year" onclick="WdatePicker({el:'search_productive_year',dateFmt:'yyyy'});" type="text">
							</td>
							<td>生产工厂：</td>
							<td><select name="" id="search_factory" class="input-small">
							</select>
							 	<script id="tmplBusTypeSelect" type="text/x-jsrander">
                                    <option value='{{:id}}'>{{:name}}  ({{:vehicle_model}})</option>
                                </script>
							</td>
							<td><input type="button"
								class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询"
								style="margin-left: 2px;"></input>
							</td>
						</tr>
					</table>
				</div>

				<div class="row"  >
					<div class="col-xs-12"  style="width:100%">
						<table id="tableOrder" 
							class="table table-striped table-bordered table-hover "
							style="font-size: 12px; width:1500px;overflow-x:auto" >
						</table>
					</div>
				</div>
		</div><!-- /.main-content -->
		
	</div><!-- /.main-container -->
	<div id="dialog-message" class="hide">
			<table id="tableBusNumber" style="font-size: 12px;width:2100px;overflow-x:auto" class="table table-bordered table-striped">
			</table>
	</div>

			<div id="dialog-order" class="hide">
				<form id="" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderID">*&nbsp;订单编号</label>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" style="display: none"
								class="input-large" placeholder="订单编号..." id="editOrderID" /> <input
								type="text" disabled="disabled" class="input-large"
								placeholder="订单编号..." id="editOrderNo" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editOrderName">*&nbsp;订单名称</label>
						<div class="col-sm-3">
							<input type="text" disabled="disabled" class="input-large"
								placeholder="订单名称..." id="editOrderName" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="vehicle_length">&nbsp;整车型号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="整车型号..." id="editVehicle_model" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="wheelbase">&nbsp;底盘型号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="底盘型号..." id="editChassis_model" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="max_weight">&nbsp;电机型号：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="电机型号..." id="editMotor_model" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="editBus_seats">&nbsp;座位数</label>
						<div class="col-sm-3">
							<input type="text"  class="input-large"
								placeholder="座位数..." id="editBus_seats" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="drive_motor">&nbsp;轮胎规格：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="轮胎规格..." id="editTire_type" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="max_speed">&nbsp;额定载客人数：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="额定载客人数(乘员数)..." id="editPassenger_num" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="battery_capacity">&nbsp;底盘资质地：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="底盘资质地..." id="editDp_zzd" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="battery_model">&nbsp;整车资质地：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="整车资质地..." id="editZc_zzd" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="rated_voltage">&nbsp;底盘公告生效日期：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="底盘公告生效日期..." id="editDpgg_date"  onClick="WdatePicker({el:'editDpgg_date',dateFmt:'yyyy-MM-dd'});" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="light_downdip">&nbsp;整车公告生效日期：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="整车公告生效日期..." id="editZcgg_date" onClick="WdatePicker({el:'editZcgg_date',dateFmt:'yyyy-MM-dd'});" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="rated_voltage">&nbsp;CCC证书签发日期：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="CCC证书签发日期..." id="editCcczs_date" onClick="WdatePicker({el:'editCcczs_date',dateFmt:'yyyy-MM-dd'});" />
						</div>
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="light_downdip">&nbsp;合格证备注：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="合格证备注..." id="editHgz_note" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right no-padding-right" for="motor_power">&nbsp;弹簧片数：</label>
						<div class="col-sm-3">
							<input type="text"  class="input-medium" style="width:100%"
								placeholder="弹簧片数..." id="editSpring_num" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;颜色</label>
						<div class="col-sm-3">
							<input type="text" class="input-large" id="order_color" placeholder="" />输入一种颜色后按"Enter"键	
						</div>
					</div>
				</form>
			</div>
			
		
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/dataTables.rowGroup.js"></script>
	<script src="../assets/js/ace-elements.min.js"></script>
	<script src="../assets/js/ace/elements.onpage-help.js"></script>
	<script src="../assets/js/ace/ace.onpage-help.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/jszip.min.js"></script>
	<script src="../assets/js/dataTables.buttons.js"></script>
	<script src="../assets/js/buttons.colVis.js"></script>
    <script src="../assets/js/buttons.html5.js"></script>
    <script src="../assets/js/bootstrap-tag.min.js"></script>
	<script src="../js/jsrender.min.js"></script>
	<script src="../js/common.js"></script>
	<script src="../js/order/orderConfigParam.js"></script>
</body>

</html>
