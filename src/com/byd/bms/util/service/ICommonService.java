package com.byd.bms.util.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.ui.ModelMap;

import com.byd.bms.util.model.BmsBaseProcess;

public interface ICommonService {

	List<Map<String,Object>> getOrderFuzzySelect(Map<String, Object> condMap);

	List<Map<String,Object>> getFactorySelect(Map<String, Object> condMap);
	
	List<Map<String,Object>> getFactorySelectAuth(Map<String, Object> condMap);

	List<Map<String,Object>> getBusTypeSelect();

	List<Map<String,Object>> getKeysSelect(String string);
	
	List<Map<String,Object>> getDepartmentByFactory(String factory_id);
	
	List<String> getAllRoleAuthority();
	
	List<String> getRoleAuthority(String staff_number);
	
	List<Map<String,Object>> getWorkshopSelect(Map<String,Object> condMap);
	
	List<Map<String,Object>> getWorkshopSelectAuth(Map<String,Object> condMap);
	
	public List<Map<String,String>> getAllReasonType();

	List<Map<String,Object>> getLineSelect();
	
	List<Map<String,Object>> getLineSelectAuth(Map<String, Object> condMap);

	List<BmsBaseProcess> queryProcessList(Map<String, Object> condMap);
	
	List<Map<String,String>> getWorkshopSelect_Key();

	List<Map<String,Object>> getOrderConfigSelect(String order_id);
	
	public List<Map<String,String>> getPartsSelect(String parts);

	List<Map<String, String>> getBusNumberList(@Param(value="bus_input") String bus_input);
	
	List<Map<String,Object>> getWorkgroupSelect(Map<String,Object> condMap);
	
	List<Map<String,Object>> getWorkgroupSelectAll(Map<String,Object> condMap);
	
	public List<Map<String,String>> getUserInfoByCard(String string);//刷厂牌获取用户信息

	/**
	 * @author xiong.jianwu
	 * @param actYear
	 * @param model 
	 */
	void getIndexOrderData(String actYear, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	void getIndexFactoryDailyData(Map<String, Object> condMap, ModelMap model);
	

    Map<String,Object> getTaskList(Map<String, Object> condMap);
	
	public int createTask(String task_type,String count,String param,String factoryCode);
	
	public int updateTask(String task_type,String finish_count);
	
}
