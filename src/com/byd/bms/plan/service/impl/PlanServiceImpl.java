package com.byd.bms.plan.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Resource;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.model.PlanMasterIndex;
import com.byd.bms.plan.service.IPlanService;
import com.byd.bms.util.ExcelModel;

@Service
public class PlanServiceImpl implements IPlanService {
	@Resource(name="planDao")
	private IPlanDao planDao;
	
	@Override
	public String checkImportPlanFactory(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public int savePlanMaster(ExcelModel excelModel,String userid) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dd = new Date();
		String curTime = df.format(dd);
		int lineCount = excelModel.getData().size();
		int result = 0;
		String order_no = "";		//订单编号 同一个文件只能导入一个订单
		String factory_name = "";
		String plan_month = "";
		for(int i=0;i<lineCount;i++){
			if (i==0){
				order_no = excelModel.getData().get(i)[0].toString().trim();
				factory_name = excelModel.getData().get(i)[1].toString().trim();
				plan_month = excelModel.getData().get(i)[3].toString().trim();
			}
			PlanMasterPlan newMasterPlan = new PlanMasterPlan();
			newMasterPlan.setVersion(new SimpleDateFormat("yyyyMMddHHmmss").format(dd));
			newMasterPlan.setOrder_no(order_no);
			newMasterPlan.setFactory_name(factory_name);
			newMasterPlan.setPlan_code_keyname(excelModel.getData().get(i)[2].toString().trim());
			newMasterPlan.setPlan_month(plan_month);
			newMasterPlan.setFlag("0");
			if (!excelModel.getData().get(i)[4].toString().trim().equals("")) newMasterPlan.setD1(Integer.parseInt(excelModel.getData().get(i)[4].toString().trim()));
			if (!excelModel.getData().get(i)[5].toString().trim().equals("")) newMasterPlan.setD2(Integer.parseInt(excelModel.getData().get(i)[5].toString().trim()));
			if (!excelModel.getData().get(i)[6].toString().trim().equals("")) newMasterPlan.setD3(Integer.parseInt(excelModel.getData().get(i)[6].toString().trim()));
			if (!excelModel.getData().get(i)[7].toString().trim().equals("")) newMasterPlan.setD4(Integer.parseInt(excelModel.getData().get(i)[7].toString().trim()));
			if (!excelModel.getData().get(i)[8].toString().trim().equals("")) newMasterPlan.setD5(Integer.parseInt(excelModel.getData().get(i)[8].toString().trim()));
			if (!excelModel.getData().get(i)[9].toString().trim().equals("")) newMasterPlan.setD6(Integer.parseInt(excelModel.getData().get(i)[9].toString().trim()));
			if (!excelModel.getData().get(i)[10].toString().trim().equals("")) newMasterPlan.setD7(Integer.parseInt(excelModel.getData().get(i)[10].toString().trim()));
			if (!excelModel.getData().get(i)[11].toString().trim().equals("")) newMasterPlan.setD8(Integer.parseInt(excelModel.getData().get(i)[11].toString().trim()));
			if (!excelModel.getData().get(i)[12].toString().trim().equals("")) newMasterPlan.setD9(Integer.parseInt(excelModel.getData().get(i)[12].toString().trim()));
			if (!excelModel.getData().get(i)[13].toString().trim().equals("")) newMasterPlan.setD10(Integer.parseInt(excelModel.getData().get(i)[13].toString().trim()));

			if (!excelModel.getData().get(i)[14].toString().trim().equals("")) newMasterPlan.setD11(Integer.parseInt(excelModel.getData().get(i)[14].toString().trim()));
			if (!excelModel.getData().get(i)[15].toString().trim().equals("")) newMasterPlan.setD12(Integer.parseInt(excelModel.getData().get(i)[15].toString().trim()));
			if (!excelModel.getData().get(i)[16].toString().trim().equals("")) newMasterPlan.setD13(Integer.parseInt(excelModel.getData().get(i)[16].toString().trim()));
			if (!excelModel.getData().get(i)[17].toString().trim().equals("")) newMasterPlan.setD14(Integer.parseInt(excelModel.getData().get(i)[17].toString().trim()));
			if (!excelModel.getData().get(i)[18].toString().trim().equals("")) newMasterPlan.setD15(Integer.parseInt(excelModel.getData().get(i)[18].toString().trim()));
			if (!excelModel.getData().get(i)[19].toString().trim().equals("")) newMasterPlan.setD16(Integer.parseInt(excelModel.getData().get(i)[19].toString().trim()));
			if (!excelModel.getData().get(i)[20].toString().trim().equals("")) newMasterPlan.setD17(Integer.parseInt(excelModel.getData().get(i)[20].toString().trim()));
			if (!excelModel.getData().get(i)[21].toString().trim().equals("")) newMasterPlan.setD18(Integer.parseInt(excelModel.getData().get(i)[21].toString().trim()));
			if (!excelModel.getData().get(i)[22].toString().trim().equals("")) newMasterPlan.setD19(Integer.parseInt(excelModel.getData().get(i)[22].toString().trim()));
			if (!excelModel.getData().get(i)[23].toString().trim().equals("")) newMasterPlan.setD20(Integer.parseInt(excelModel.getData().get(i)[23].toString().trim()));

			if (!excelModel.getData().get(i)[24].toString().trim().equals("")) newMasterPlan.setD21(Integer.parseInt(excelModel.getData().get(i)[24].toString().trim()));
			if (!excelModel.getData().get(i)[25].toString().trim().equals("")) newMasterPlan.setD22(Integer.parseInt(excelModel.getData().get(i)[25].toString().trim()));
			if (!excelModel.getData().get(i)[26].toString().trim().equals("")) newMasterPlan.setD23(Integer.parseInt(excelModel.getData().get(i)[26].toString().trim()));
			if (!excelModel.getData().get(i)[27].toString().trim().equals("")) newMasterPlan.setD24(Integer.parseInt(excelModel.getData().get(i)[27].toString().trim()));
			if (!excelModel.getData().get(i)[28].toString().trim().equals("")) newMasterPlan.setD25(Integer.parseInt(excelModel.getData().get(i)[28].toString().trim()));
			if (!excelModel.getData().get(i)[29].toString().trim().equals("")) newMasterPlan.setD26(Integer.parseInt(excelModel.getData().get(i)[29].toString().trim()));
			if (!excelModel.getData().get(i)[30].toString().trim().equals("")) newMasterPlan.setD27(Integer.parseInt(excelModel.getData().get(i)[30].toString().trim()));
			if (!excelModel.getData().get(i)[31].toString().trim().equals("")) newMasterPlan.setD28(Integer.parseInt(excelModel.getData().get(i)[31].toString().trim()));
			if (!excelModel.getData().get(i)[32].toString().trim().equals("")) newMasterPlan.setD29(Integer.parseInt(excelModel.getData().get(i)[32].toString().trim()));
			if (!excelModel.getData().get(i)[33].toString().trim().equals("")) newMasterPlan.setD30(Integer.parseInt(excelModel.getData().get(i)[33].toString().trim()));

			if (!excelModel.getData().get(i)[34].toString().trim().equals("")) newMasterPlan.setD31(Integer.parseInt(excelModel.getData().get(i)[34].toString().trim()));
			newMasterPlan.setCreator_id(Integer.parseInt(userid));
			newMasterPlan.setCreate_date(curTime);
			
			result += planDao.insertPlanMaster(newMasterPlan);
		}		
		return result;
	}

	@Override
	public Map<String, Object> getPlanMasterIndex(Map<String, Object> queryMap) {
		int totalCount=0;
		List<PlanMasterIndex> datalist = planDao.getPlanMasterIndex(queryMap);
		totalCount = 0;
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}
	
	

}
