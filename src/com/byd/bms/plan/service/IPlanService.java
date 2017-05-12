package com.byd.bms.plan.service;

import java.util.List;
import java.util.Map;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.plan.model.PlanConfigIssedQty;
import com.byd.bms.plan.model.PlanIssuance;
import com.byd.bms.plan.model.PlanIssuanceCount;
import com.byd.bms.plan.model.PlanIssuanceTotal;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.model.PlanPause;
import com.byd.bms.plan.model.PlanProductionPlan;

public interface IPlanService {
	public String checkImportPlanFactory(Map<String,Object> queryMap);
	public int savePlanMaster(ExcelModel excelModel,String userid);
	public Map<String,Object> getPlanMasterIndex(Map<String,Object> queryMap);
	public List<PlanMasterPlan> showPlanMasterList(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanIssed(Map<String,Object> queryMap);
	public int reVisionPlan(String factory_id,String order_no,String revision_str,String plan_month,String userId);
	public List<Map<String,String>> checkPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuance> getPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuanceTotal> getPlanIssuanceTotal(Map<String,Object> queryMap);
	public List<PlanProductionPlan> getProductionPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuanceCount> getPlanIssuanceCount(Map<String,Object> queryMap);
	public int getPlanConfigQty(int order_config_id);
	public List<PlanConfigIssedQty> getPlanConfigIssedQty(Map<String,Object> queryMap);//获取当前配置已发布数量
	public int issuancePlanSubmit(String curTime,String edit_user,String issuance_date,int factory_id,String issuance_str);
	public int addPause(List<PlanPause> pauseList);
	public Map<String,Object> getPauseList(Map<String,Object> queryMap);
	public int updatePauseInfo(PlanPause pause);
	public Map<String, Object> getExceptionList(Map<String,Object> queryMap);
}
