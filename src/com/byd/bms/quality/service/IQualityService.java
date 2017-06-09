package com.byd.bms.quality.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.ui.ModelMap;

public interface IQualityService {

	void getOrderConfigList(Map<String, Object> condMap, ModelMap model);

	void saveKeyPartsDetail(Map<String, Object> keyParts);

	void getKeyPartsList(HashMap<String, Object> condMap, ModelMap model);
	
}
