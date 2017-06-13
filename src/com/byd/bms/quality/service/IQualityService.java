package com.byd.bms.quality.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

import com.byd.bms.quality.model.BmsBaseQCStdRecord;

public interface IQualityService {
		
	//======================== xjw start=================================//
	void getOrderConfigList(Map<String, Object> condMap, ModelMap model);

	void saveKeyPartsDetail(Map<String, Object> keyParts);

	void getKeyPartsList(HashMap<String, Object> condMap, ModelMap model);
	
	void validateWorkshopProcess(List<Map<String, String>> addList) throws Exception;
	//======================== xjw end=================================//
		
	
	//========================yk start=================================//
			
			
	//======================== yk end=================================//
			
			
	//========================tj start=================================//
			
		
	//======================== tj end=================================//
	
	
	//品质标准更新记录  add by tangjin
	
	public int insertStdRecord(BmsBaseQCStdRecord stdRecord);
	
	public BmsBaseQCStdRecord selectStdRecord(int recordId);
	
	public Map<String, Object> getStdRecordList(Map<String,Object> conditionMap);
	
	public int getStdRecordCount(Map<String,Object> conditionMap);
	
	public Map<String,Object> getFaultLibList(Map<String, Object> conditionMap);
}
