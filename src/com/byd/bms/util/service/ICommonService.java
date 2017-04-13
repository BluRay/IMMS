package com.byd.bms.util.service;

import java.util.List;
import java.util.Map;

public interface ICommonService {

	List<Map<String,Object>> getOrderFuzzySelect(Map<String, Object> condMap);
	
}
