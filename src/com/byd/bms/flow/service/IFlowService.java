package com.byd.bms.flow.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.ui.ModelMap;

import com.byd.bms.flow.model.Approval;

public interface IFlowService {
	// 获取历史任务数据
	public void getHistoryTaskList(Map<String, Object> condMap,ModelMap model);
	// 获取当前任务数据(主办、协办)
	public void getCurrentTaskList(Map<String, Object> condMap,ModelMap model);
	// 获取当前抄送任务数据
	public void getCCTaskList(Map<String, Object> condMap, ModelMap model);
	// 获取流程Process数据
	public void getProcessList(Map<String, Object> condMap, ModelMap model);
	// 获取流程实例Process Instance数据
	public void getProcessInstanceList(Map<String, Object> condMap, ModelMap model);
	// 添加紧急物料采购申请记录
	public int saveMaterialPurchase(String processId, String orderId, String taskId, Map<String, Object> map);
	// 根据审批组名称查询改组下用户信息记录
	public void getGroupListByGroupName(Map<String, Object> condMap, ModelMap model);
	// 添加审批记录
	public int saveApprovalInfo(Map<String, Object> map);
	// 根据流程实例Id、任务名称查询审批信息
	public List<Map<String,Object>> findByFlow(String orderId, String taskName);
	// 根据流程实例Id采购表信息
	public Map<String,Object> getMaterialPurchaseByOrderId(String orderId);
	// 根据流程实例Id查询审批信息
	public List<Map<String,Object>> findApprovalInfoByFlow(String orderId,String taskName);
	// 资源开发工程师审批{arg[map:业务参数；params：流程实例参数]}
	public int doDeveloper(Map<String, Object> map, Map<String, Object> params);
	// 根据流程实例Id查询wf_hist_task信息
	public List<Map<String,Object>> getOrderInstanceByOrderId(String orderId);
}
