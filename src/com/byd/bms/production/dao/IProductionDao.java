package com.byd.bms.production.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository(value="productionDao")
public interface IProductionDao {

	List queryLineProcessList(Map<String, Object> condMap);

	List<Map<String, Object>> queryProcessMonitorList(Map<String, Object> condMap);
	
}
