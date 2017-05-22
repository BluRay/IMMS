package com.byd.bms.tech.service;

import java.util.List;
import java.util.Map;

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

	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);
	
	public int addTechTaskMaintain(Map<String, Object> conditionMap);
	
	public int  addChangedMaterialList(List<Map<String, Object>> conditionMap);
	
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);

	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
}
