package com.byd.bms.quality.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

import com.byd.bms.quality.model.BmsBaseQCStdRecord;
import com.byd.bms.quality.model.QualityTargetBean;
import com.byd.bms.quality.model.StdFaultLibBean;

public interface IQualityService {
		
	//======================== xjw start=================================//
	void getOrderConfigList(Map<String, Object> condMap, ModelMap model);

	void saveKeyPartsDetail(Map<String, Object> keyParts);

	void getKeyPartsList(HashMap<String, Object> condMap, ModelMap model);
	
	void validateWorkshopProcess(List<Map<String, String>> addList) throws Exception;
	
	void getPrdRcdBusTypeTplList(HashMap<String, Object> condMap, ModelMap model);
	
	void savePrdRcdBusTypeTpl(Map<String, Object> condMap);

	void getPrdRcdBusTypeTplDetail(String tpl_header_id, ModelMap model);
	//======================== xjw end=================================//
		
	
	//========================yk start=================================//
	public int insertFaultLib(StdFaultLibBean faultLib);
	public int updateFaultLib(StdFaultLibBean faultLib);
	public Map<String,Object> getQaTargetParamList(Map<String, Object> conditionMap);
	public int insertQualityTarget(QualityTargetBean qualityTarget);		
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
