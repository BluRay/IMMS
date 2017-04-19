package com.byd.bms.plan.service.impl;

import java.util.Map;
import org.springframework.transaction.annotation.Transactional;

import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.service.IPlanService;
import com.byd.bms.util.ExcelModel;

public class PlanServiceImpl implements IPlanService {

	@Override
	public String checkImportPlanFactory(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public int savePlanMaster(ExcelModel excelModel) {
		int lineCount = excelModel.getData().size();
		for(int i=0;i<lineCount;i++){
			String plan_no = "";		//订单编号 同一个文件只能导入一个订单
			String factory_name = "";
			String plan_date = "";
			if (i==0){
				plan_no = excelModel.getData().get(i)[0].toString().trim();
				factory_name = excelModel.getData().get(i)[1].toString().trim();
				plan_date = excelModel.getData().get(i)[2].toString().trim();
			}
			PlanMasterPlan plan = new PlanMasterPlan();
			
		}
		
		return 0;
	}
	
	

}
