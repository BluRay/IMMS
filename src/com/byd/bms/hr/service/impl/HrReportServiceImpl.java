package com.byd.bms.hr.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.hr.dao.IHrReportDao;
import com.byd.bms.hr.service.IHrReportService;
@Service
public class HrReportServiceImpl implements IHrReportService {
	@Resource(name="hrReportDao")
	private IHrReportDao hrReportDao;
	
	@Override
	public Map<String, Object> getRewardsList(Map<String,Object> queryMap){
		int totalCount=0;
		List<Map<String,Object>> datalist = hrReportDao.getRewardsCollectList(queryMap);
		totalCount = hrReportDao.getRewardsCollectTotalCount(queryMap);		
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}

	@Override
	public void getStaffPieceHours(Map<String, Object> conditionMap,
			ModelMap model) {
		int totalCount=hrReportDao.queryStaffPieceHoursCount(conditionMap);
		List<Map<String,Object>> datalist =hrReportDao.queryStaffPieceHours(conditionMap);	
		
		model.put("recordsTotal", totalCount);
		model.put("draw", conditionMap.get("draw"));
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);		
		
	}

	@Override
	public void getStaffPieceSalary(Map<String, Object> conditionMap,
			ModelMap model) {
		Calendar c = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM");
		String curMonth = df.format(new Date());
		c.add(Calendar.MONTH, -1);
		String lastMonth = df.format(c.getTime());
		List<Map<String,Object>> datalist=null;
		if(curMonth.equals(conditionMap.get("month"))||lastMonth.equals(conditionMap.get("month"))){
			datalist=hrReportDao.queryStaffPieceSalary(conditionMap);	
		}else{//取历史记录
			datalist=hrReportDao.queryStaffPieceSalaryHistory(conditionMap);	
		}
		
		
		model.put("draw", conditionMap.get("draw"));
		model.put("data", datalist);	
		
	}

	@Override
	@Transactional
	public void submitStaffSalary(Map<String, Object> conditionMap,
			ModelMap model) {
		try{
			//先判断 月份+提交工厂+提交车间 是否存在已结算的工资记录
			List<Map<String,Object>> bal_staffSalary=hrReportDao.queryBalanceStaffSalary(conditionMap);
			List<String> staff_list=new ArrayList<String>();
			
		
			for(Map<String,Object> m:bal_staffSalary){
				staff_list.add(m.get("staff_number").toString());
			}
			hrReportDao.deletePieceSalaryHistory(conditionMap);//删除对应计件工资历史记录
			List<Map<String,Object>> list_to_submit=new ArrayList<Map<String,Object>>();
			List<Map<String,Object>>staff_salary_list= (List<Map<String, Object>>) conditionMap.get("staff_salary_list");
			for(Map<String,Object> m:staff_salary_list){
				if(!staff_list.contains(m.get("staff_number"))){
					list_to_submit.add(m);
				}
			}
			if(list_to_submit.size()==0){
				model.put("success", false);
				model.put("message", "该月工资已结算，不能再提交！");
			}
			else{
				//把map中staff_salary_list 替换为需要提交的列表
				conditionMap.put("staff_salary_list", list_to_submit);
				hrReportDao.saveSubmitStaffSalary(conditionMap);
				model.put("success", true);
				model.put("message", "工资提交成功！");
			}
	
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "工资提交失败！"+e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		
	}

	@Override
	public void getStaffPieceSalaryToBal(Map<String, Object> conditionMap,
			ModelMap model) {
		List<Map<String,Object>> datalist=hrReportDao.queryStaffPieceSalaryHistory(conditionMap);
		model.put("draw", conditionMap.get("draw"));
		model.put("data", datalist);
	}

	@Override
	public void rejectStaffSalary(Map<String, Object> conditionMap,
			ModelMap model) {
		try{
			hrReportDao.updateStaffSalaryStatus(conditionMap);
			model.put("success", true);
			model.put("message", "工资驳回成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "工资驳回失败！"+e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		
	}

	@Override
	public void balanceStaffSalary(Map<String, Object> conditionMap,
			ModelMap model) {
		try{
			hrReportDao.updateStaffSalaryStatus(conditionMap);
			model.put("success", true);
			model.put("message", "工资结算成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "工资结算失败！"+e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
	}

	@Override
	public List<Map<String, Object>> getEcnReportData(Map<String, Object> conditionMap) {
		return hrReportDao.getEcnReportData(conditionMap);
	}
	
	
}
