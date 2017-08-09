package com.byd.bms.hr.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

public interface IHrReportService {
	
	public Map<String, Object> getRewardsList(Map<String,Object> queryMap);

	public void getStaffPieceHours(Map<String, Object> conditionMap,ModelMap model);

	public void getStaffPieceSalary(Map<String, Object> conditionMap,ModelMap model);

	public void submitStaffSalary(Map<String, Object> conditionMap,ModelMap model);
	
	public List<Map<String,Object>> getEcnReportData(Map<String, Object> conditionMap);
	
	public void getStaffWaitHours(Map<String, Object> conditionMap,ModelMap model);

	public void getStaffPieceSalaryToBal(Map<String, Object> conditionMap,
			ModelMap model);

	public void rejectStaffSalary(Map<String, Object> conditionMap,
			ModelMap model);

	public void balanceStaffSalary(Map<String, Object> conditionMap,
			ModelMap model);
}
