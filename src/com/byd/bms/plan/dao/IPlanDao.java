package com.byd.bms.plan.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

import com.byd.bms.plan.model.PlanMasterIndex;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.util.model.BmsBaseOperateChangeLog;

@Repository(value="planDao")
public interface IPlanDao {
	public String checkImportPlanFactory(Map<String,Object> queryMap);
	public int insertPlanMaster(PlanMasterPlan masterPlan);
	public List<PlanMasterIndex> getPlanMasterIndex(Map<String,Object> queryMap);
	public int getPlanMasterCount(Map<String,Object> queryMap);
	public List<PlanMasterPlan> getPlanMasterList(Map<String,Object> queryMap);
	public List<Map<String,String>> getPlanIssed(Map<String,Object> queryMap);
	public int insertMasterPlan(PlanMasterPlan masterPlan);
	public int updatePlanMasterInfo(PlanMasterPlan masterPlan);
	public int insertOperateChangeLog(BmsBaseOperateChangeLog changLog);
}
