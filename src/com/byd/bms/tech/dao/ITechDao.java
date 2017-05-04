package com.byd.bms.tech.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.byd.bms.order.model.BmsFactoryOrderDetail;
import com.byd.bms.order.model.BmsOrder;
@Repository(value="techDao")
public interface ITechDao {
	/**
	 * 技改任务维护
	 */
	public List<Map<String,Object>> queryTechTaskMaintainList(Map<String,Object> conditionMap);
	public int queryTechTaskMaintainListTotalCount(Map<String,Object> conditionMap);
	public int addTechTask(Map<String, Object> conditionMap);
	public int addChangedMaterialList(List<Map<String, Object>> conditionList);

	public List<Map<String,Object>> querySingleTechTaskMaintain(Map<String,Object> conditionMap);
	public int updateTechTaskMaintain(List<Map<String, Object>> conditionList);
	public int deleteChangedMaterialList(Map<String,Object> conditionMap);
	public List<Map<String,Object>> queryChangedMaterialList(Map<String,Object> conditionMap);	
	
}
