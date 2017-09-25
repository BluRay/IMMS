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
	public List<Map<String,Object>> getEcnReportData1(Map<String, Object> conditionMap);
	public List<Map<String,Object>> getTmpReportData(Map<String, Object> conditionMap);
	public List<Map<String,Object>> getTmpReportData1(Map<String, Object> conditionMap);
	public int queryBalanceSalaryCount(Map<String, Object> conditionMap);
	public void deletePieceSalaryHistory(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryBalanceStaffSalary(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceSalaryHistory(Map<String, Object> conditionMap);
	public int queryStaffWaitHoursCount(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffWaitHours(Map<String, Object> conditionMap);
	public List<Map<String, Object>> queryStaffPieceSalaryToBal(
			Map<String, Object> conditionMap);
	public void updateStaffSalaryStatus(Map<String, Object> conditionMap);
	public void saveAttendanceReport(List<Map<String,Object>> datalist);
	public void deleteAttendanceReport(Map<String,Object> conditionMap);

	public List<Map<String,String>> queryStaffWorkHoursList(Map<String, Object> conditionMap);
	public int queryStaffWorkHoursCount(Map<String, Object> conditionMap);
	public Map<String, Object> queryOrgInfo(Map<String, Object> condMap);
	public List<Map<String,String>> queryAttendanceDetailData(Map<String, Object> conditionMap);
	public List<Map<String,String>> queryAttendanceReportData(Map<String, Object> conditionMap);

	public List<Map<String,Object>> getSpecicalSalaryData(Map<String, Object> conditionMap);
	public int getSpecicalSalaryDataCount(Map<String, Object> conditionMap);
	public int insertSpecialSalary(List<Map<String,Object>> datalist);
	public void deleteSpecialSalary(Map map);
}
