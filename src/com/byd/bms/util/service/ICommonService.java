package com.byd.bms.util.service;

import java.util.List;
import java.util.Map;

public interface ICommonService {

	List<Map<String,Object>> getOrderFuzzySelect(Map<String, Object> condMap);

	List<Map<String,Object>> getFactorySelect();

	List<Map<String,Object>> getBusTypeSelect();

	List<Map<String,Object>> getKeysSelect(String string);
	
	List<Map<String,Object>> getDepartmentByFactory(String factory_id);
	
	List<String> getRoleAuthority(String staff_number);
	
}
