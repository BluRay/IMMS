<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>自制件下料明细变更</title>
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
							<td><select id="search_factory" class="input-small" style="height: 30px;width:100px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>车间：</td>
							<td><select id="search_workshop" class="input-small" style="height: 30px;width:70px"></select></td>
							<td>&nbsp;<span style="color: red;">*</span>线别：</td>
							<td><select id="search_line" class="input-small" style="height: 30px;width:70px"></select></td>
							<td>自制件类别:</td>
							<td><input id="search_zzj_type" placeholder="请输入自制件类别..." style="height: 30px;width:100px" type="text"></td>
							<td>使用车间:</td>
							<td><input id="search_use_workshop" placeholder="" style="height: 30px;width:60px" type="text"></td>
						</tr>
						<tr>
							<td>物料描述：</td>
							<td style="min-width: 250px;" ><input id="search_mat_description" placeholder="" style="height: 30px;width:240px" type="text"></td>
<!-- 							<td><select id="headChangeType" class="input-small" style="height: 30px;width:90px">
							<option value="">请选择</option>
							<option value="技改">技改</option><option value="非技改">非技改</option></select>
							</td> -->
							<td></td>
							<td><span style="color: red;">*</span>下料明细导入：</td>
							<td  colspan="4" style="padding-top:5px">
								<form id="uploadForm" action="#" enctype="multipart/form-data" method="post">
									<table>
										<tr>
											<td width="300px"><input id="file" type="file" name="file" accept="*.xlsx"/></td>
											<td></td>
										</tr>
									</table>
						        </form>
							</td>
							<td style="text-align: center;"><a href="../docs/zzjPMD.xlsx">&nbsp;&nbsp;下载模板</a></td>
							<td colspan=2>
							<input id="btn_upload" style="margin-top: 5px;margin-left:2px;" 
							    type="button" class="btn btn-sm btn-primary" value="导入"/>&nbsp;&nbsp;
							<input id="btn_search" style="margin-top: 5px;margin-left:2px;" 
							    type="button" class="btn btn-sm btn-primary" value="查询"/>&nbsp;&nbsp;
							<input type="button"
								class="btn btn-sm btn-success btnSave" id="btnSave" value="保存"
								style="margin-top: 5px;margin-right: 2px"></input>&nbsp;&nbsp;
							</td>
							<td></td>
						</tr>
					</table>
				</div>
				<div class="row"  >
					<div class="col-xs-12" style="width: calc(100vw + 25px)">
						<table id="tableResult" class="table table-striped table-bordered table-hover" style="font-size: 12px;table-layout:fixed;width:3500px;overflow-x:auto;" >
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
			    
			 <div id="dialog-addRow" class="hide">
			    <form id="" class="form-horizontal">
					<div class="form-group">
						<label class="col-sm-2 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderName">&nbsp;SAP</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium"
								placeholder="sap料号..." id="add_sap_mat" />
						</div>
						<label class="col-sm-2 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderCode">*&nbsp;自制件类别</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="自制件类别..." id="add_zzj_type" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 col-sm-3 control-label no-padding-right no-padding-right" for="newOrderCode">*&nbsp;物料描述</label>
						<div class="col-sm-10">
								<input type="text" class="input-medium"  style="width: 420px;" placeholder="物料描述..." id="add_mat_description" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;物料类型</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_mat_type" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;材料规格</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_specification" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;单位</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_unit" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;单车损耗</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_loss" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;单车用量</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_quantity" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;单重</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_weight" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;总重(含损耗)</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_weight_total" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;使用车间</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_use_workshop" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;使用线别</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_use_line" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;工序</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_process" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;装配位置</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_assembly_position" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;工艺标识</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_crafts_identification" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">*&nbsp;下料尺寸</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_filling_size" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;精度要求</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_accuracy_demand" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;表面处理</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_surface_treatment" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;分包类型</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_subcontracting_type" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;加工顺序</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_process_sequence" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;工艺流程</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_process_flow" />
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;所属班组</label>
						<div class="col-sm-4">
							<input type="text" class="input-medium" placeholder="" id="add_team" />
						</div>
						<label class="col-sm-2 control-label no-padding-right" for="">&nbsp;备注</label>
						<div class="col-sm-4">
							<textarea class="input-xlarge" style="width: 355px" id="add_memo" rows="2"></textarea>
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="">工艺备注</label>
						<div class="col-sm-10">
							<textarea class="input-xlarge" style="width: 355px" id="add_crafts_memo" rows="2"></textarea>
						</div>
					</div>
			</form>
	</div>
		
			<div id="dialog-ecn" class="hide">
				<form id="" class="form-horizontal">
					<input type="hidden" id="dialog_ecn_old_quantity">
					<div class="form-group">
						<div class="col-sm-12">
							<table class="exp-table table">
								<thead>
									<tr>
										<th width="50px;"><i id="editEcnQuantity" class="fa fa-plus" style="cursor: pointer;color: blue;"></i>
										<th class="col-sm-3">开始台数</th>
										<th class="col-sm-3">结束台数</th>
										<th class="col-sm-3">单车用量</th>
									</tr>
								</thead>
								<tbody id="edit_ecnQuantity_parameters" class="exp-table">
								</tbody>
							</table>
						</div>
					</div>
				</form>
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
    <script src="../js/zzj/changePMD.js"></script>
</body>

</html>
