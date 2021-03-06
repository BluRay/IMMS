package com.byd.bms.quality.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.ui.ModelMap;

import com.byd.bms.quality.model.BmsBaseQCStdRecord;
import com.byd.bms.quality.model.MaterialExceptionLogs;
import com.byd.bms.quality.model.ProblemImproveBean;
import com.byd.bms.quality.model.ProcessFaultBean;
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

	void getPrdRcdOrderTplList(HashMap<String, Object> condMap, ModelMap model);

	void getPrdRcdBusTypeTplDetailLatest(HashMap<String, Object> condMap,ModelMap model);

	void savePrdRcdOrderTpl(Map<String, Object> condMap);

	void getPrdRcdOrderTplDetail(String tpl_header_id, ModelMap model);
	
	void getPrdRcdOrderTpl(Map<String, Object> condMap, ModelMap model);

	void getFaultLibFuzzyList(Map<String, Object> condMap, ModelMap model);

	void saveProductRecord(Map<String,Object> condMap, ModelMap model);

	void getProductRecordList(Map<String, Object> condMap, ModelMap model);

	void getProductRecordDetail(Map<String, Object> condMap, ModelMap model);

	void getBusByPartsBatch(Map<String, Object> condMap, ModelMap model);
	//======================== xjw end=================================//
		
	
	//========================yk start=================================//
	public int insertFaultLib(StdFaultLibBean faultLib);
	public int updateFaultLib(StdFaultLibBean faultLib);
	public Map<String,Object> getQaTargetParamList(Map<String, Object> conditionMap);
	public int insertQualityTarget(QualityTargetBean qualityTarget);
	public int updateQualityTarget(QualityTargetBean qualityTarget);
	
	public Map<String,Object> getProcessFaultList(Map<String, Object> conditionMap);
	public int addProcessFault(ProcessFaultBean pocessFault);
	public int addProcessFaultMobile(Map<String, Object> conditionMap);
	public int editProcessFaultMobile(Map<String, Object> conditionMap);
	public int updateProcessFaultPics(Map<String, Object> conditionMap);
	public int addProcessFault2(ProcessFaultBean pocessFault);
	public int editProcessFault(ProcessFaultBean pocessFault);
	public ProcessFaultBean showProcessFaultInfo(int id);
	public List<Map<String,String>> getProcessFaultListFromMobile(Map<String, Object> conditionMap);
	
	public int insertProblemImprove(ProblemImproveBean problemImprove);
	public Map<String, Object> getProblemImproveList(Map<String, Object> conditionMap);
	public ProblemImproveBean showProblemImproveInfo(int id);
	public int updateProblemImprove(ProblemImproveBean problemImprove);
	
	public int getTestingDate();
	public List<Map<String,String>> getTestingBusList(Map<String, Object> conditionMap);
	public int getTestingBusListCount(Map<String, Object> conditionMap);
	public Map<String, Object> getBusTestingDateCS(Map<String, Object> conditionMap);
	public Map<String, Object> getBusTestingDateWH(Map<String, Object> conditionMap);
	public int checkJcxBusInfoId(Map<String, Object> conditionMap);
	public int insertJcxBusInfo(Map<String, Object> conditionMap);
	public int updateJcxBusInfo(Map<String, Object> conditionMap);
	public Map<String, Object> getTestingDateReport(Map<String,Object> queryMap);
	public Map<String, Object> getTestingInfo(Map<String,Object> queryMap);
	public Map<String, Object> getKeyPartsInfo(Map<String,Object> queryMap);
	public List<Map<String, Object>> getProcessFaultReportData(Map<String,Object> queryMap);
	public List<Map<String, Object>> getProcessFaultOrderReportData(Map<String,Object> queryMap);
	public List<Map<String, Object>> getProcessFaultOrderReportData2(Map<String,Object> queryMap);
	public List<Map<String, Object>> getOrderFaultReportList(Map<String,Object> queryMap);
	public List<Map<String, Object>> getFactoryIdByVin(Map<String,Object> queryMap);
	public List<Map<String, String>> getProcessFaultArea();
	public int checkOrderNo(String order_no);
	public int deleteProcessFault(String processFaultId);
	//======================== yk end=================================//
			
			
	//========================tj start=================================//

    public Map<String,Object> getKeyPartsTraceList(Map<String,Object> conditionMap);
    
    public int updateKeyParts(List<Map<String,Object>> list);
    
    public Map<String,Object> getBusNumberDetailList(Map<String,Object> conditionMap);
    
    public Map<String,Object> getMaterialExceptionLogsList(Map<String,Object> conditionMap);
    
    public int saveMaterialExceptionLogs(MaterialExceptionLogs materialExceptionLogs);
    
    public MaterialExceptionLogs selectLogsById(int id);
    
    public int updateMaterialExceptionLogs(MaterialExceptionLogs materialExceptionLogs);
    
  //品质标准更新记录  add by tangjin
	
  	public int insertStdRecord(BmsBaseQCStdRecord stdRecord);
  	
  	public int updateStdRecord(BmsBaseQCStdRecord stdRecord);
  	
  	public Map<String, Object> selectStdRecord(Map<String,Object> conditionMap);
  	
  	public Map<String, Object> getStdRecordList(Map<String,Object> conditionMap);
  	
  	public int getStdRecordCount(Map<String,Object> conditionMap);
  	
  	public Map<String, Object> getQualityAbnormalRecordList(Map<String,Object> conMap);
  	
  	public int insertQualityAbnormalRecord(Map<String, Object> conMap);
  	
  	public void deleteQualityAbnormalRecord(List ids);
    
  	public Map<String, Object> checkBusNumber(Map<String,Object> conMap);
	
  	public int insertQualityStdImplementInfo(Map<String,Object> conMap);
  	
  	public int saveMaterialExceptionLogsByBatch(Map<String, Object> conMap);
  	
  	public Map<String, Object> getWorkshopByFactoryId(String factory_id);
  	//======================== tj end=================================//
	
	
	
	
	public Map<String,Object> getFaultLibList(Map<String, Object> conditionMap);
	//======================== pengtao add start=================================//
	public List<Map<String, Object>> queryKeyPartsListByPartsNo(Map<String, Object> condMap);
	//======================== pengtao add end=================================//



}
