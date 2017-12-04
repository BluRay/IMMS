<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<title>品质标准更新记录</title>
<meta name="description" content="Common Buttons &amp; Icons" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<link rel="stylesheet" href="../assets/css/fixedColumns.bootstrap.min.css" />
<link rel="stylesheet" href="../assets/css/fixedColumns.dataTables.min.css" />
<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
<link rel="stylesheet" href="../css/multiple-select/multiple-select.css" />
<!-- <link rel="stylesheet" href="../css/bootstrap.css" /> -->
</head>
<body class="no-skin" style="font-family: 'Microsoft YaHei';">
	<!-- 头 -->
	<jsp:include page="../top.jsp" flush="true" />
	<!-- 身 -->
	<div class="main-container" id="main-container">
		<!-- 左边菜单 -->
		<jsp:include page="../left.jsp" flush="true" />
		<!-- 主体 -->
		<div class="main-content">
			<!-- 路径和搜索框 -->
			<div class="main-content-inner">
				<div class="breadcrumbs ace-save-state  breadcrumbs-fixed" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">制程品质</a></li>
						<li class="active">品质标准更新记录</li>
					</ul>
					<!-- /.breadcrumb -->

					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon"> <input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
					<!-- /.nav-search -->
				</div>

				<div class="page-content">
					<div id="form" class="well form-search">
						<table>
							<tr>
								<td>记录编号：</td>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="记录编号..." value="" id="search_recordno" /></td>
								<td>&nbsp;适用车型：</td>
								<td>
								    <select name="search_bustype" id="search_bustype" style="width:80px;height:30px;">
								    </select>
							    </td>
								<td>适用订单：</td>
								<td><input id="search_order" placeholder="订单编号..." style="width:100px" type="text"/></td>
                                <td>适用车间：</td>
								<td>
								    <select name="search_workshop" id="search_workshop" class="workshop" style="width:80px;height:30px;">
								    </select>
								</td>
                                <td>更新摘要内容：</td>
								<td><input id="search_usynopsis" placeholder="更新摘要内容..." style="width:125px" type="text"/></td>
                                
								<td><input type="button" class="btn btn-sm btn-primary btnQuery" id="btnQuery" value="查询" style="margin-left: 10px;"></input>
									<button id='btnAdd' class="btn btn-sm btn-success">新增</button>
							</tr>
						</table>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;">
							</table>
						</div>
					</div>
                </div>
				
                <div id="dialog-add" class="hide">
                    <input type="hidden" id="urlPath" value="<%=request.getContextPath()%>/">
					<form id="addForm" class="form-horizontal" method="post" enctype="multipart/form-data" action="addRecord">
						<table>
							<tr style="height:40px">
								<td align="right" style="width:100px">* 记录编号：</td>
								<td style="width:150px">
									<input type="text" class="input-medium" id="recordNo" name="recordNo" style="width:150px"/>
								</td>
								<td align="right" style="width:100px">* 适用车间：</td>
								<td style="width:150px">
								    <select name="workshop" id="workshop" class="workshop" style="width:150px;height:30px;">
								    </select>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">* 适用订单：</td>
								<td colspan=3>
								    <input type="text" name="orderId" class="input-medium" id="order_no" style="width:400px;height:30px;"/>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">* 适用车型：</td>
								<td colspan=3>
								    <select multiple="multiple" name="busType" id="bus_type" style="width:400px;height:30px;">
								    </select>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">适用范围：</td>
								<td colspan=3>
								   <select multiple="multiple" name="scope" id="multiple_factory" style="width:400px;height:30px;">
                                   </select>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新内容摘要：</td>
								<td colspan=3>
                                   <textarea class="input-xlarge" id="usynopsis" style="width:400px;" rows="1" name="usynopsis"></textarea>
							    </td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更替前附件：</td>
								<td colspan=3><label class="control-label" style="padding-left:2px;align:left"><input class="maintain" type="file" name="bfile" id="bfile" style="width:210px"/></label></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新前描述：</td>
								<td colspan=3><textarea class="input-medium" style="width:400px;" rows="1" name="beforeDesc"></textarea></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更替后附件：</td>
								<td colspan=3><label class="control-label" style="padding-left:2px;align:left"><input class="maintain" type="file" name="afile" id="afile" style="width:210px"/></label></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新后描述：</td>
								<td colspan=3><textarea class="input-xlarge" style="width:400px;" rows="1" name="afterDesc"></textarea></td>
							</tr>
							<tr style="height:10px;">
								<td colspan=4></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">备注：</td>
								<td colspan=3>
								    <textarea class="input-xlarge" style="width:400px;" id="memo" rows="1" name="memo"></textarea>
                                </td>
							</tr>
						</table>
					</form>
				</div>	
				<div id="dialog-factory" class="hide">
				    <table>
						<tr style="height:40px">
							<td align="right" style="width:100px">* 记录编号：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" id="recordno_submit" style="width:150px" readonly="readonly"/>
								<input type='hidden' id="id_submit">
							</td>
							<td align="right" style="width:100px">* 适用车型：</td>
							<td style="width:150px"><input type="text" class="input-medium" id="bustype_submit" style="width:150px" readonly="readonly"/></td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">* 适用订单：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="order_submit" readonly="readonly"/>
							<td align="right" style="width:100px">* 适用车间：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="workshop_submit" readonly="readonly"/>
							</td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">适用范围：</td>
							<td colspan=3><input type="text" class="input-medium" id="scope_submit" style="width:400px" readonly="readonly"/></td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">更新内容摘要：</td>
							<td colspan=3><textarea class="input-medium" id="usynopsis_submit" style="width:400px" readonly="readonly"></textarea></td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">更替前附件：</td>
							<td colspan=3><label class="control-label" style="padding-left:2px;align:left"><a href="" class="text-info" id="bfile_path_submit" target="_blank">查看</a></label></td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">更新前描述：</td>
							<td colspan=3><textarea class="input-medium" id="before_desc_submit" style="width:400px;" rows="1" name="before_desc" readonly="readonly"></textarea></td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">更替后附件：</td>
							<td colspan=3><label class="control-label" style="padding-left:2px;align:left"><a href="" class="text-info" id="afile_path_submit" target="_blank">查看</a></label></td>
						</tr>
						<tr style="height:40px;">
							<td align="right" style="width:100px">更新后描述：</td>
							<td colspan=3><textarea class="input-medium" id="after_desc_submit" style="width:400px;margin-buttom:5px" rows="1" name="after_desc" readonly="readonly"></textarea></td>
						</tr>
						<tr style="height:10px;">
							<td colspan=4></td>
						</tr>
					    <tr style="height:40px">
							<td align="right" style="width:100px">* 实施工厂：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="implement_factory_submit" readonly="readonly"/>
							<td align="right" style="width:100px">* 实施车号：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="busnumber_submit"/>
							</td>
						</tr>
						<tr style="height:40px">
							<td align="right" style="width:100px">* 确认人：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="confirmor_submit"/>
							<td align="right" style="width:100px">* 确认时间：</td>
							<td style="width:150px">
								<input id="confirm_date_submit" style="width:150px" type="text" onClick="WdatePicker({el:'confirm_date_submit',dateFmt:'yyyy-MM-dd'});">
							</td>
						</tr>
						<tr style="height:40px;display:none" id="edit_info_tr">
							<td align="right" style="width:100px">* 录入人：</td>
							<td style="width:150px">
								<input type="text" class="input-medium" style="width:150px;height:30px;" id="editor_submit" readonly="readonly"/>
							<td align="right" style="width:100px">* 录入时间：</td>
							<td style="width:150px">
								<input id="edit_date_submit" style="width:150px" type="text" readonly="readonly"/>
							</td>
						</tr>
					</table>
				</div>
				<div id="dialog-edit" class="hide">
					<form id="editForm" class="form-horizontal" class="form-horizontal" method="post" enctype="multipart/form-data" action="updateStdRecord">
						<table id="table-edit">
							<tr style="height:40px">
								<td align="right" style="width:100px">* 记录编号：</td>
								<td style="width:150px">
									<input type="text" class="input-medium" id="recordno_show" style="width:150px" readonly="readonly"/>
									<input type='hidden' id="id_show" name="id">
								</td>
								<td align="right" style="width:100px">* 适用车间：</td>
								<td style="width:150px">
<!-- 									<input type="text" class="input-medium" name="workshop" style="width:150px;height:30px;" id="workshop_show" readonly="readonly"/> -->
								    <select name="workshop" id="workshop_show" class="workshop" style="width:150px;height:30px;">
								    </select>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">* 适用订单：</td>
								<td colspan=3>
									<input type="text" class="input-medium" name="orderId" style="width:400px;height:30px;" id="order_show"/>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">* 适用车型：</td>
								<td colspan=3><input type="text" name="busType" class="input-medium" id="bustype_show" style="width:400px"/></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">适用范围：</td>
								<td colspan=3>
								   <input type="text" class="input-medium" name="scope" style="width:400px;height:30px;" id="scope_show"/>
								    <select multiple="multiple" id="multiple_factory_show" style="width:400px;height:30px;">
                                    </select>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新内容摘要：</td>
								<td colspan=3><textarea class="input-medium" name="usynopsis" id="usynopsis_show" style="width:400px"></textarea></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更替前附件：</td>
								<td colspan=3>
									<label class="control-label updatefile" style="padding-left:2px;align:left">
									    <input class="maintain" type="file" name="bfile" id="bfile_show" style="width:210px"/>
									</label>
									<label class="control-label" style="padding-left:2px;align:left">
									    <a href="" class="text-info" id="bfile_path_show" target="_blank">查看</a>
									</label>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新前描述：</td>
								<td colspan=3><textarea class="input-medium" name="beforeDesc" id="before_desc_show" style="width:400px;" rows="1" name="before_desc"></textarea></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更替后附件：</td>
								<td colspan=3>
								<label class="control-label updatefile" style="padding-left:2px;align:left">
								    <input class="maintain" type="file" name="afile" id="afile_show" style="width:210px"/>
								</label>
								<label class="control-label" style="padding-left:2px;align:left">
								    <a href="" class="text-info" id="afile_path_show" target="_blank">查看</a>
								</label>
								</td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">更新后描述：</td>
								<td colspan=3><textarea class="input-medium" name="afterDesc" id="after_desc_show" style="width:400px;" rows="1" name="after_desc"></textarea></td>
							</tr>
							<tr style="height:10px;">
								<td colspan=4></td>
							</tr>
							<tr style="height:40px">
								<td align="right" style="width:100px">备注：</td>
								<td colspan=3>
								    <textarea class="input-xlarge" style="width:400px;" name="memo" id="memo_show" rows="1" name="memo"></textarea>
                                </td>
							</tr>
						</table>
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;记录编号</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<input type="text" class="input-medium" style="width:360px;height:30px;" id="recordNo_show" readonly="readonly"/> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;适用车型</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<input type="text" class="input-medium" style="width:360px;height:30px;" id="bustype_show" readonly="readonly"/> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;适用订单</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<input type="text" class="input-medium" style="width:360px;height:30px;" id="order_show" readonly="readonly"/> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;适用车间</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 							    <select name="workshop" id="workshop_show" style="width:360px;height:30px;"> -->
<!-- 								</select> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;适用范围</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<input type="text" class="input-medium" style="width:360px;height:30px;" id="scope_show" readonly="readonly"/> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;更新内容摘要</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<textarea class="input-xlarge" style="width:360px;" id="usynopsis_show" rows="1" name="usynopsis" readonly="readonly"></textarea> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right">&nbsp;更替前附件</label>&nbsp;&nbsp; -->
<!--                             <label class="control-label" style="padding-left:2px;align:left"><a href="" class="text-info" id="bfile_path_show" target="_blank">查看</a></label> -->
<!--                         </div> -->
<!--                         <div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;更新前描述</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<textarea class="input-xlarge" id="before_desc_show" style="width:360px;" rows="1" name="before_desc"></textarea> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right">*&nbsp;更替后附件</label>&nbsp;&nbsp; -->
<!-- 							<label class="control-label" style="padding-left:2px;align:left"><a href="" class="text-info" id="afile_path_show" target="_blank">查看</a></label> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">*&nbsp;更新后描述</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<textarea class="input-xlarge" id="after_desc_show" style="width:360px;" rows="1" name="before_desc"></textarea> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="form-group"> -->
<!-- 							<label class="col-sm-3 control-label no-padding-right" for="add">&nbsp;备注</label> -->
<!-- 							<div class="col-sm-9"> -->
<!-- 								<textarea class="input-xlarge" style="width:360px;" id="memo_show" rows="1" name="memo" readonly="readonly"></textarea> -->
<!-- 							</div> -->
<!-- 						</div> -->
					</form>
				</div>
			</div>
		</div>
		<!-- /.main-container -->
	</div>
	<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
	<script src="../assets/js/jquery-ui.min.js"></script>
	<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
	<script src="../assets/js/jquery.gritter.min.js"></script>
	<script src="../assets/js/jquery.dataTables.min.js"></script>
	<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables.fixedColumns.min.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../assets/js/ace/elements.fileinput.js"></script>
	<script src="../js/jquery.form.js"></script>
	<script src="../js/datePicker/WdatePicker.js"></script>
	<script src="../js/common.js"></script>
	<script src="../assets/js/bootstrap3-typeahead.js"></script>
	<script src="../js/jsrender.min.js"></script>
<!-- 	<script src="../js/bootstrap.js"></script> -->
	<script src="../js/multiple-select.js"></script>
	<script src="../js/quality/qcStdRecord.js"></script>
</body>

</html>
