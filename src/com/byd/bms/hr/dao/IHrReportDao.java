package com.byd.bms.hr.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository(value="hrReportDao")
public interface IHrReportDao {
	
	public List<Map<String,Object>> getRewardsCollectList(Map<String, Object> conditionMap);	//查询奖惩汇总数据
	public int getRewardsCollectTotalCount(Map<String, Object> conditionMap);					//查询奖惩汇总数据数量
	public int queryStaffPieceHoursCount(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceHours(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceSalary(Map<String, Object> conditionMap);
	public void saveSubmitStaffSalary(Map<String, Object> conditionMap);
	public List<Map<String,Object>> getEcnReportData(Map<String, Object> conditionMap);
	public int queryBalanceSalaryCount(Map<String, Object> conditionMap);
	public void deletePieceSalaryHistory(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryBalanceStaffSalary(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceSalaryHistory(Map<String, Object> conditionMap);
}
