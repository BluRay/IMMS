package com.byd.bms.tech.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.byd.bms.order.model.BmsOrder;
import com.google.gson.JsonArray;

public interface ITechService {
	
	/**
	 * 技改任务维护查询
	 */
	public Map<String,Object> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	/**
	 * 新增技改任务
	 * @param conditionMap
	 * @return
	 */
	public void addTechTask(Map<String, Object> conditionMap);
	
	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);
	
}
