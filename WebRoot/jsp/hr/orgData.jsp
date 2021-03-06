<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="../includ.jsp" flush="true"/>
<html lang="zh-CN">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>BMS 组织架构</title>
		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../assets/css/jquery.gritter.css" />
	</head>
	<body class="no-skin" style="font-family: 'Microsoft YaHei';">
		<!-- 头 -->
		<!-- 身 -->
		<div id="div_row" class="main-container" id="main-container" style="overflow: hidden;">
			<!-- 左边菜单 -->
			<!-- 主体 -->
			
<!-- 				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="ace-icon fa fa-home home-icon"></i><a href="/BMS/index">首页</a></li>
						<li><a href="#">计件工资</a></li>
						<li class="active">组织架构</li>
					</ul>
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" /><i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div>
				</div> -->
				
					
					<div class="row">
						<div class="col-xs-12">
							<div class="row">
								<div class="col-sm-4">
									<div id="div_tree1" class="widget-box widget-color-blue2" style="height:800px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller">组织架构&nbsp;&nbsp;&nbsp;&nbsp;</h4>
										</div>

										<div class="widget-body">
											<div class="widget-main padding-8">
												<div id="tree2" class="tree tree-unselectable"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div id="div_tree2" class="widget-box widget-color-green2" style="height:900px;OVERFLOW-X:auto;OVERFLOW-Y:auto;OVERFLOW:auto">
										<div class="widget-header">
											<h4 class="widget-title lighter smaller" id="nodeName">&nbsp;</h4>
											
											<button id="btn_add" style="float:right;margin-top:2px" class="btn btn-sm btn-success">新增</button>
											<button id="btn_delete" style="float:right;margin-top:2px" class="btn btn-sm btn-purple">删除</button>&nbsp;&nbsp;
<!-- 											<button id="btn_add" style="float:right;margin-top:2px" class="btn btn-sm btn-success">新增</button> -->
										</div>

										<div class="widget-body">
											<div class="widget-main padding-8">
											<div class="form-group">
											    <table id="tableData" class="table table-striped table-bordered table-hover" style="font-size: 12px;"></table>
											</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
						</div>							
					</div>
			<div id="dialog-confirm" class="hide" style="width:800px;height:600px">
				<form class="form-horizontal">
			        <input type="hidden" id="org_type"><input type="hidden" id="parent_id">
			        <input type="hidden" id="org_kind">
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 上级部门： </label>
							<div class="col-sm-9">
								<select name="" id="new_p_id" class="input-large carType"></select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织层级： </label>
							<div class="col-sm-9">
							    <select name="" id="new_org_type" class="input-large carType">
<!-- 			                    	<option value='0'>事业部</option> -->
<!-- 			                    	<option value='1'>片区</option> -->
<!-- 			                    	<option value='2'>工厂</option> -->
<!-- 			                    	<option value='5'>车间</option> -->
<!-- 			                    	<option value='7'>班组</option> -->
<!-- 			                    	<option value='8'>小班组</option> -->
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织类型： </label>
							<div class="col-sm-9">
								<select name="" id="new_org_kind" class="input-large carType">
									<option value=''>--请选择--</option>
			                    	<option value='1'>生产型</option>
			                    	<option value='0'>管理型</option>
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织名称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" 
                                class="input-medium revise carType" id="new_name" 
                                onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" 
                                onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))"/>							</div>
						    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 英文名称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" 
                                class="input-medium revise carType" id="new_name_en" 
                                onkeyup="value=value.replace(/[\W]/g,'') " 
                                onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>							</div>
						    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 简称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="new_org_code" />
                            </div>
                        </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 计资模式： </label>
							<div class="col-sm-9">
								<select name="" id="new_salary_model" class="input-large carType">
								</select>
                            </div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 自编号： </label>
							<div class="col-sm-9">
                               	<select name="" id="new_customer_no_flag" class="input-large carType">
                               		<option value=''>--请选择--</option>
                               		<option value='0'>否</option>
			                    	<option value='1'>是</option>
								</select>
                            </div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 管理者： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="new_manager" />				
                                </div>
						    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 职责： </label>
							<div class="col-sm-9">
                                <textarea style="width:280px" name="" id="new_responsibilities" class="input-medium carType"></textarea>
                            </div>
					    </div>
					</fieldset>
				</form>
            </div>
			<div id="dialog-edit" class="hide" style="width:800px;height:600px">
				<form class="form-horizontal">
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 上级部门： </label>
							<div class="col-sm-9">
								<input type="hidden" id="editId" />
								<select name="" id="p_id" class="input-large carType"></select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织层级： </label>
							<div class="col-sm-9">
							    <select name="" id="edit_org_type" class="input-large carType">
<!-- 			                    	<option value='0'>事业部</option> -->
<!-- 			                    	<option value='1'>片区</option> -->
<!-- 			                    	<option value='2'>工厂</option> -->
<!-- 			                    	<option value='3'>科室</option> -->
<!-- 			                    	<option value='5'>车间</option> -->
<!-- 			                    	<option value='7'>班组</option> -->
<!-- 			                    	<option value='8'>小班组</option> -->
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织类型： </label>
							<div class="col-sm-9">
								<select name="" id="edit_org_kind" class="input-large carType">
			                    	<option value='1'>生产型</option>
			                    	<option value='0'>管理型</option>
								</select>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 组织名称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" 
                                class="input-medium revise carType" id="edit_name" readonly="readonly"/>							
                            </div>
					    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 英文名称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" 
                                class="input-medium revise carType" id="edit_name_en" 
                                onkeyup="value=value.replace(/[\W]/g,'') " 
                                onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>							</div>
						    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 简称： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="edit_org_code" />
                            </div>
                        </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 计资模式： </label>
							<div class="col-sm-9">
								<select name="" id="edit_salary_model" class="input-large carType">
								</select>
                            </div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 自编号： </label>
							<div class="col-sm-9">
                               	<select name="" id="edit_customer_no_flag" class="input-large carType">
                               	    <option value=''>--请选择--</option>
                               		<option value='0'>否</option>
			                    	<option value='1'>是</option>
								</select>
                            </div>
						</div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 管理者： </label>
							<div class="col-sm-9">
                                <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="edit_manager" />				
                                </div>
						    </div>
					</fieldset>
					<fieldset>
						<div class="form-group form-horizontal">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-1"> 职责： </label>
							<div class="col-sm-9">
                                <textarea style="width:280px" name="" id="edit_responsibilities" class="input-medium carType"></textarea>
                            </div>
					    </div>
					</fieldset>
				</form>
            </div>
			<!-- 脚 -->
			<%-- <jsp:include page="footer.jsp" flush="true"/> --%>
			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse"><i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i></a>
		</div><!-- /.main-container -->
		<script src="../assets/js/fuelux/fuelux.tree.min.js"></script>
		<script src="../assets/js/jquery.dataTables.min.js"></script>
		<script src="../assets/js/jquery.dataTables.bootstrap.js"></script>
		<script src="../assets/js/bootstrap3-typeahead.js"></script>
		<script src="../js/hr/orgData.js"></script>
		<script src="../js/common.js"></script>
		<script src="../assets/js/jquery-ui.min.js"></script>
		<script src="../assets/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../assets/js/jquery.gritter.min.js"></script>
	</body>
</html>
