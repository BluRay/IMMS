/*
 *  Copyright 2013-2014 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.Approval/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package com.byd.bms.flow.service.imp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.byd.bms.flow.dao.IApprovalDao;
import com.byd.bms.flow.dao.IFlowDao;
import com.byd.bms.flow.model.Approval;
import com.byd.bms.flow.service.IApprovalService;
import com.byd.bms.flow.service.IFlowService;

import org.apache.commons.lang.StringUtils;
import org.snaker.engine.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

/**
 * @author yuqs
 */
@Service
public class FlowService implements IFlowService{
    @Autowired
    private IFlowDao flowDao;
    @Autowired
    private SnakerEngineFacets facets;
    public void getHistoryTaskList(Map<String, Object> conMap,ModelMap model){
    	int totalCount=flowDao.getHistoryTaskCount(conMap);
		List<Map<String,Object>> datalist =flowDao.getHistoryTaskList(conMap);	
		model.put("recordsTotal", totalCount);
		model.put("draw", conMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
    }
    // 获取主办、协办任务数据
	@Override
	public void getCurrentTaskList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=flowDao.getCurrentTaskCount(condMap);
		List<Map<String,Object>> datalist =flowDao.getCurrentTaskList(condMap);	
		model.put("recordsTotal", totalCount);
		model.put("draw", condMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}
	// 获取抄送任务数据
	@Override
	public void getCCTaskList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=flowDao.getCCTaskCount(condMap);
		List<Map<String,Object>> datalist =flowDao.getCCTaskList(condMap);	
		model.put("recordsTotal", totalCount);
		model.put("draw", condMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}
	// 获取流程数据
	@Override
	public void getProcessList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=flowDao.getProcessCount(condMap);
		List<Map<String,Object>> datalist =flowDao.getProcessList(condMap);	
		model.put("recordsTotal", totalCount);
		model.put("draw", condMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}
	// 获取流程数据
	@Override
	public void getProcessInstanceList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=flowDao.getProcessInstanceCount(condMap);
		List<Map<String,Object>> datalist =flowDao.getProcessInstanceList(condMap);	
		model.put("recordsTotal", totalCount);
		model.put("draw", condMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}
	@Override
	@Transactional
	public int saveMaterialPurchase(String processId, String orderId, String taskId, Map<String, Object> map) {
		int result=0;
		/** 流程数据构造开始 */
		String userId=map.get("user_id").toString();
//        Map<String, Object> params = new HashMap<String, Object>();
//        params.putAll(map);
//        params.put("apply.operator", userId);
//        params.put("approval.operator", userId);
        /** 流程数据构造结束 */

        /**
         * 启动流程并且执行申请任务
         */
        if (StringUtils.isEmpty(orderId) && StringUtils.isEmpty(taskId)) {
            Order order = facets.startAndExecute(processId, userId, map);
            map.put("order_id", order.getId());
            result=flowDao.addMaterialPurchase(map);
            Map<String,Object> approvalMap=new HashMap<String,Object>();
            approvalMap.put("orderId", order.getId());
            approvalMap.put("operator", map.get("user_name"));
            approvalMap.put("operateTime", map.get("edit_date"));
            approvalMap.put("taskName", "apply");
            approvalMap.put("displayName", "拟稿人");
            flowDao.addApproval(approvalMap);
        } else {
            facets.execute(taskId, userId, map);    
            map.put("order_id", orderId);
            result=flowDao.updateMaterialPurchase(map);
        }
        return result;
	}
	@Override
	public void getGroupListByGroupName(Map<String, Object> condMap,
			ModelMap model) {
		List<Map<String,Object>> datalist =flowDao.getGroupListByGroupName(condMap);
		model.put("data", datalist);
	}
	@Override
	public int saveApprovalInfo(Map<String, Object> map) {
		return flowDao.addApproval(map);
	}
	@Override
	public List<Map<String, Object>> findByFlow(String orderId, String taskName) {
		return flowDao.findApprovalInfoByFlow(orderId, taskName);
	}
	@Override
	public Map<String, Object> getMaterialPurchaseByOrderId(String orderId) {
		List<Map<String, Object>> list= flowDao.getMaterialPurchaseByOrderId(orderId);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("data", list);
		return result;
	}
	@Override
	public List<Map<String, Object>> findApprovalInfoByFlow(String orderId,
			String taskName) {
		return flowDao.findApprovalInfoByFlow(orderId,taskName);
	}
	@Override
	@Transactional
	public int doDeveloper(Map<String, Object> map, Map<String, Object> params) {
		String taskId=map.get("taskId").toString();
		String user_id=map.get("user_id").toString();
		if(map.get("result").toString().equals("0")){ // 同意
        	facets.execute(taskId, user_id, params);
        }else{
        	// 不同意 驳回到申请者
        	facets.executeAndJump(taskId, user_id, params, "apply");
        }
        /** 业务数据处理结束 */
        int a=flowDao.addApproval(map);
        int b=flowDao.updateMaterialPurchase(map);
        int result=(a>0 && b>0) ? 1 :0;
        return result;
	}
	@Override
	public List<Map<String, Object>> getOrderInstanceByOrderId(String orderId) {
		return flowDao.getOrderInstanceByOrderId(orderId);
	}
}
