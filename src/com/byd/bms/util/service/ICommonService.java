package com.byd.bms.util.service;

import java.util.List;
import java.util.Map;

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

	List<Map<String,Object>> getProcessMonitorSelect(Map<String, Object> condMap);
}
