package com.byd.bms.setting.service;

import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseProcess;
import com.byd.bms.setting.model.BmsBaseStandardWorkgroup;
import com.byd.bms.setting.model.BmsBaseVinRule;
import com.byd.bms.setting.model.BmsBaseWorkshop;

public interface IBaseDataService {
		//工厂
		public Map<String, Object> getFactoryList(Map<String,Object> queryMap);
		//public int getFactoryTotalCount(Map<String,Object> queryMap);
		public void updateFactory(BmsBaseFactory factory);
		public void deleteFactory(List ids);
		public int checkDeleteFactory(List ids);
		public int addFactory(BmsBaseFactory factory);
		public BmsBaseFactory getFactoryById(String id);
		//车间 分页查询
		public Map<String, Object> getWorkshopList(Map<String,Object> queryMap);
		//public int getWorkshopTotalCount(Map<String,Object> queryMap);
		// 查询所有记录
		public Map<String, Object> getAllWorkshopList();
		public int addWorkshop(BmsBaseWorkshop workshop);
		public void updateWorkshop(BmsBaseWorkshop workshop);
		public void deleteWorkshop(List ids);
		public int checkDeleteWorkshop(List ids);
		//线别
		public Map<String, Object> getLineList(Map<String,Object> queryMap);
		//public int getLineTotalCount(Map<String,Object> queryMap);
		public int addLine(BmsBaseLine line);
		public void updateLine(BmsBaseLine line);
		public void deleteLine(List ids);
		public int checkDeleteLine(List ids);
		//工序
		public Map<String, Object> getProcessList(Map<String,Object> queryMap);
		//public int getProcessTotalCount(Map<String,Object> queryMap);
		public int addProcess(BmsBaseProcess process);
		public void updateProcess(BmsBaseProcess process);
		public void deleteProcess(List ids);
		public List<Map<String,Object>> getProcessListNoLine(Map<String, Object> condMap);
		public List<Map<String,Object>> getProcessConfigDetailList(Map<String, Object> condMap);
		public List<Map<String,Object>> getProcessListByFactory(Map<String, Object> condMap);
		public void addProcessConfig(List<Map<String, Object>> process_list,ModelMap model);
		@Transactional
		public void editProcessConfig(List<Map<String, Object>> process_list,ModelMap model);
		public void deleteProcessConfig(Map<String, Object> condMap,ModelMap model);
		//车间班组
		public List<BmsBaseStandardWorkgroup> getWorkgroupList(Map<String,Object> queryMap);
		public List<Map<String, Object>> getWorkshopTreeList(Map<String,Object> queryMap);
		public int addWorkgroup(BmsBaseStandardWorkgroup workgroup);
		public int updateWorkgroup(BmsBaseStandardWorkgroup workgroup);
		public Map deleteWorkgroup(List ids);
		//车型
		public Map<String, Object> getBusTypeList(Map<String,Object> queryMap);
		//public int getBusTypeTotalCount(Map<String,Object> queryMap);
		public int addBusType(BmsBaseBusType busType);
		public void updateBusType(BmsBaseBusType busType);
		public Map<String, Object> getProcessConfigList(Map<String, Object> condMap);
		public BmsBaseBusType getBusTypeById(Map<String,Object> queryMap);
		public void deleteBusType(Map<String, Object> condMap);
		public void updateBusTypeByCode(BmsBaseBusType busType);
		//VIN生成规则
		public Map<String, Object> getVinRuleList(Map<String,Object> queryMap);
		//public int getWorkgroupTotalCount(Map<String,Object> queryMap);
		public int addVinRule(BmsBaseVinRule workgroup);
		public int updateVinRule(BmsBaseVinRule workgroup);
		public void deleteVinRule(List ids);
		
}
