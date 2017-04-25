package com.byd.bms.util.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository(value="commonDao")
public interface ICommonDao {

	List<Map<String, Object>> queryOrderList(Map<String,Object> condMap);

	List<Map<String, Object>> queryFactoryList();

	List<Map<String, Object>> queryBusTypeList();
	
	List<Map<String, Object>> queryDepartmentByFactory(String factory_id);

	List<Map<String, Object>> queryKeysList(String keyCode);
	
	List<String> getRoleAuthority(String staff_number);

}
