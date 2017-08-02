package com.byd.bms.hr.service;

import java.util.Map;

import org.springframework.ui.ModelMap;

public interface IHrReportService {
	
	public Map<String, Object> getRewardsList(Map<String,Object> queryMap);

	public void getStaffPieceHours(Map<String, Object> conditionMap,
			ModelMap model);
}
