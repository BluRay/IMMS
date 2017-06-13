package com.byd.bms.quality.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.byd.bms.quality.model.BmsBaseQCStdRecord;

@Repository(value="qualityDao")
public interface IQualityDao {
	//======================== xjw start=================================//
	int getConfigTotalCount(Map<String, Object> condMap);
	
	List<Map<String, Object>> getOrderConfigList(Map<String, Object> condMap);

	Map<String, Object> queryKeyPartsHeader(Map<String, Object> keyParts);

	int saveKeyPartsHeader(Map<String, Object> keyParts);

	int saveKeyPartsDetails(Map<String, Object> smap);

	int updateKeyPartsHeader(Map<String, Object> keyParts);

	int deleteKeyPartsByHeader(@Param(value="header_id")int header_id);

	List<Map<String, Object>> queryKeyPartsList(Map<String, Object> condMap);
	
	List<Map<String, String>> queryWorkshopProcessList(@Param(value="addList")List<Map<String, String>> addList);
	
	//======================== xjw end=================================//
	
	
	//========================yk start=================================//
		
		
	//======================== yk end=================================//
		
		
	//========================tj start=================================//
		
	
	//======================== tj end=================================//
	

	
	//品质标准更新记录 add by tangjin
	public int insertStdRecord(BmsBaseQCStdRecord stdRecord);
	
	public BmsBaseQCStdRecord selectStdRecord(int recordId);
	
	public List<BmsBaseQCStdRecord> getStdRecordList(Map<String,Object> conditionMap);
	
	public int getStdRecordCount(Map<String,Object> conditionMap);

	public List<Map<String, String>> getFaultLibList(Map<String, Object> conditionMap);	

	public int getFaultLibCount(Map<String, Object> conditionMap);


}
