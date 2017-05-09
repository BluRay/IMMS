package com.byd.bms.plan.dao;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.plan.model.PlanBus;
import com.byd.bms.plan.model.PlanBusNumber;
import com.byd.bms.plan.model.PlanConfigIssedQty;
import com.byd.bms.plan.model.PlanIssuance;
import com.byd.bms.plan.model.PlanIssuanceCount;
import com.byd.bms.plan.model.PlanIssuanceTotal;
import com.byd.bms.plan.model.PlanMasterIndex;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.model.PlanPause;
import com.byd.bms.plan.model.PlanProductionPlan;
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
	public List<Map<String,String>> checkPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuance> getPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuanceTotal> getPlanIssuanceTotal(Map<String,Object> queryMap);
	public List<PlanProductionPlan> getProductionPlanIssuanceList(Map<String,Object> queryMap);
	public List<PlanIssuanceCount> getPlanIssuanceCount(Map<String,Object> queryMap);
	public int getPlanConfigQty(int order_config_id);
	public List<PlanConfigIssedQty> getPlanConfigIssedQty(Map<String,Object> queryMap);//获取当前配置已发布数量
	public String getOrderIdByConfigId(String config_id);
	public BmsOrder getOrderInfoByOrderID(String order_id);
	public int insertPlanIssuance(PlanProductionPlan productionPlan);
	public List<Map<String, Object>> getFactoryOrderDetail(Map<String,Object> queryMap);
	public int insertPlanBusNumber(PlanBusNumber busNumber);
	public int insertPlanBus(PlanBus bus);
	public int updateFactoryOrder(int factory_order_id);
	public int addPause(PlanPause pause);
	public List<PlanPause> getPauseList(Map<String,Object> queryMap);
	public int getPauseTotalCount(Map<String,Object> queryMap);
}
