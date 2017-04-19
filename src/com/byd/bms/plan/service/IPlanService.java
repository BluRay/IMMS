package com.byd.bms.plan.service;

import java.util.Map;

import com.byd.bms.util.ExcelModel;

public interface IPlanService {
	public String checkImportPlanFactory(Map<String,Object> queryMap);
	
	public int savePlanMaster(ExcelModel excelModel);

}
