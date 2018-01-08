<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<html lang="zh-CN">
	<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta charset="utf-8" />
	<title>流程审批</title>
	<meta name="description" content="Common Buttons &amp; Icons" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />	
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/jquery.gritter.css" />
		<link rel="stylesheet" href="<%=basePath%>/assets/css/bootstrap.min.css" />
	</head>

	<body>
	    <div style="border:1px;overflow:auto;height:345px">
		    <c:forEach items="${apply}" var="item">
			    <div style="margin-top:2px;">
					<table class="table table-striped table-bordered table-hover dataTable no-footer"
					     style="font-size: 13px;margin-top:-2px;" role="grid" aria-describedby="tableData_info">
						<tr class="odd">
				            <td colspan="10">拟稿人</td>
						</tr>
						<tr class="odd">
				            <td style="width:12%">申请人：</td>
							<td style="width:8%">${item['user_name'] }</td>
							<td style="width:8%">申请部门：</td>
							<td style="width:12%">${item['department'] }</td>
							<td style="width:10%">申请日期：</td>
							<td style="width:10%">${item['apply_date'] }</td>
							<td style="width:8%">采购类型：</td>
							<td style="width:12%">${item['purchase_type'] }</td>
							<td style="width:8%">项目类型：</td>
							<td style="width:12%">${item['apply_type'] }</td>
						</tr>
						<tr>
							<td>&nbsp;物料编号：</td>
							<td>${item['material_code'] }</td>
							<td>&nbsp;物料名称：</td>
							<td>${item['material_name'] }</td>
							<td>&nbsp;规格/型号：</td>
							<td>${item['specification'] }</td>
							<td>&nbsp;成本中心：</td>
							<td>${item['cost_center'] }</td>
							<td>&nbsp;成本会计：</td>
							<td>${item['accountant'] }</td>
						</tr>
						<tr>
							<td style="width:12%">采购项目负责人：</td>
							<td>${item['purchase_leader'] }</td>
							<td>使用地区：</td>
							<td>${item['useage_place'] }</td>
							<td>采购数量：</td>
							<td>${item['quntity'] }</td>
							<td>技术要求：</td>
							<td>${item['techcical_require'] }</td>
							<td>附件：</td>
							<td>
							    <c:if test="${item['file']!=''}">
							       <a href=<%=basePath %>/${item['file']}>查看</a>
							    </c:if>
							</td>
						</tr>
						<tr>
						    <td style="width:12%">要求到位时间：</td>
							<td>${item['require_date'] }</td>
							<td>申请理由：</td>
							<td colspan='3'>${item['apply_reason'] }</td>
							
						    <td>备注：</td>
							<td colspan='3'>${item['remark'] }</td>
						</tr>
					</table>
			    </div>
			</c:forEach>
			<c:forEach items="${developerStart}" var="item">
				<div style="margin-top:2px;">
					<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
					     style="font-size: 13px;margin-top:-20px;" role="grid" aria-describedby="tableData_info">
						<tr class="odd">
				            <td colspan='10'>资源开发工程师</td>
						</tr>
						<tr>
							<td style="width:12%">紧急/特采项目：</td>
							<td style="width:8%">${item['urgent_item'] }</td>
							<td style="width:9%">&nbsp;供应商类别：</td>
							<td style="width:11%">${item['vendor_type'] }</td>
							<td style="width:10%">&nbsp;供应商名称：</td>
							<td style="width:14%">${item['vendor_name'] }</td>
							<td style="width:8%">&nbsp;单价：</td>
							<td style="width:10%">${item['price'] }</td>
							<td style="width:8%">&nbsp;金额：</td>
							<td style="width:10%">${item['amount'] }</td>
						</tr>
					</table>
				</div>
			</c:forEach>
			<c:forEach items="${approvalData}" var="item">
                <div style='text-align:left;height:30px;margin:2px;padding:2px;border:1px solid #000000'>
                   ${item['display_name'] } <font color="red">${item['operator'] } ${item['result']=='0' ? '同意' : '不同意' }</font>
                   ${item['description'] } ${item['operate_time'] }
                </div>
			</c:forEach>
			<div style='text-align:left;height:30px;margin:2px;padding:2px;border:1px solid #000000'>
               ${displayName } 处理中......
            </div>
		</div>
		<form id="inputForm" action="${ctx }/materialPurchase/doApproval" method="post" target="mainFrame">
			<input type="hidden" name="processId" id="processId" value="${processId }" />
			<input type="hidden" name="orderId" id="orderId" value="${orderId }" />
			<input type="hidden" name="taskId" id="taskId" value="${taskId }" />
			<input type="hidden" name="taskName" id="taskName" value="${taskName }" />
			<input type="hidden" name="displayName" id="displayName" value="${displayName }" />
			<table id="tableData" class="table table-striped table-bordered table-hover dataTable no-footer"
		            style="font-size: 14px;margin-top:2px;margin-bottom:2px" role="grid">
				<tr>
					<td>
						<span>审批意见：</span>
					</td>
					<td>
						<textarea style="width:500px;height:30px" id="description" name="description"></textarea>
					</td>
					<!-- 采购项目负责人预设资源开发工程师 -->
					<c:if test="${taskName=='purchaseBoss' || displayName=='采购项目负责人'}">
		
						<td>
							<span>资源开发工程师：</span>
						</td>
						<td>
							<select style="width:120px" id="developer"></select>
						</td>
					</c:if>
				</tr>
				<tr>
					<td colspan="4"  align="right" style="padding-right:50px">
						<input type="button" class="btn btn-sm btn-info" id="btnAgree" value="同意">
						&nbsp;&nbsp;
						<input type="button" class="btn btn-sm btn-info" id="btnDisagree" value="不同意">
						&nbsp;&nbsp;
						<input type="button" class="btn btn-sm btn-info" name="reback" value="取消"
							onclick="history.back()">
					</td>
				</tr>
			</table>
		</form>
	</body>
	<script src="<%=basePath%>/js/jquery-2.1.0.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery-ui.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.gritter.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.min.js"></script>
	<script src="<%=basePath%>/assets/js/jquery.dataTables.bootstrap.js"></script>
	<script src="<%=basePath%>/assets/js/bootstrap3-typeahead.js"></script>
	<script src="<%=basePath%>/js/jquery.form.js"></script>
	<script type="text/javascript">
		$(function(){
        	$("#btnAgree").click(function(){
        		save("0");
        	});
        	$("#btnDisagree").click(function(){
        		save("1");
        	});
        	$("#developer").one("click",function(){
        		// 加载资源开发工程师select表单
    			$.ajax({
    		        type: "post",
    		        url: "getGroupListByGroupName",
    		        cache: false,  //禁用缓存
    		        data: {
    		        	"group_name":"资源开发工程师审批组",
    		        	"process_name":"materialPurchase"
    		        },  
    		        dataType: "json",
    		        success: function (result) {
    		        	var optStr="<option value=''>请选择</option>";
    		            $.each(result.data,function(index,value){
    		        	   optStr+="<option value='"+value.user_id+"'>"+value.username+"</option>"
    		            });
    		            $("#developer").html(optStr);
    		        }
    		    });
        	});
        })
        function save(result){
        	$.ajax({
    			type:"post",
    			url: "/BMS/materialPurchase/doApproval",
    			dataType: "json",
    			data: {
    				"result" : result,
    				"description" : $("#description").val(),
    				"orderId" : $("#orderId").val(),
    				"taskId" : $("#taskId").val(),
    				"taskName" : $("#taskName").val(),
    				"displayName" : $("#displayName").val(),
    				"developer" : $("#developer").val(),
    			},
    			error: function () {},
    			success: function (response) {
    				if(response.success){
    					alert("审批成功");
    					var url="/BMS/task/active";
    					window.open(url,"_parent");     
    				}else{
    					alert("审批失败");
    				}
    			}
    		})
        }
    </script>
</html>
