package com.byd.bms.plan.service;

import java.util.List;
import java.util.Map;

import com.byd.bms.util.ExcelModel;
import com.byd.bms.plan.model.PlanMasterPlan;

public interface IPlanService {
	public String checkImportPlanFactory(Map<String,Object> queryMap);
	public int savePlanMaster(ExcelModel excelModel,String userid);
	public Map<String,Object> getPlanMasterIndex(Map<String,Object> queryMap);
	public List<PlanMasterPlan> showPlanMasterList(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanIssed(Map<String,Object> queryMap);
	public int reVisionPlan(String factory_id,String order_no,String revision_str,String plan_month,String userId);
	public List<Map<String,String>> checkPlanIssuanceList(Map<String,Object> queryMap);
}
