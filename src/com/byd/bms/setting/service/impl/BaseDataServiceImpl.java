package com.byd.bms.setting.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseProcess;
import com.byd.bms.setting.model.BmsBaseStandardWorkgroup;
import com.byd.bms.setting.model.BmsBaseVinRule;
import com.byd.bms.setting.model.BmsBaseWorkshop;
import com.byd.bms.setting.service.IBaseDataService;
import com.byd.bms.util.DataSource;
@Service
@DataSource("dataSourceMaster")
public class BaseDataServiceImpl implements IBaseDataService {
	@Resource(name="baseDataDao")
	private IBaseDataDao baseDataDao;
	
	//工厂
	@Override
	public Map<String, Object> getFactoryList(Map<String,Object> queryMap){
		int totalCount=0;
		List<BmsBaseFactory> datalist=baseDataDao.getFactoryList(queryMap);
		totalCount=baseDataDao.getFactoryTotalCount(queryMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}
	@Override
	public void updateFactory(BmsBaseFactory factory){
		baseDataDao.updateFactory(factory);
	}
	@Override
	public void deleteFactory(List ids){
		baseDataDao.deleteFactory(ids);
	}
	@Override
	public int checkDeleteFactory(List ids){
		return baseDataDao.checkDeleteFactory(ids);
	}
	@Override
	public int addFactory(BmsBaseFactory factory){
		return baseDataDao.addFactory(factory);
	}
	
	//车间
	@Override
	public Map<String, Object> getWorkshopList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<BmsBaseWorkshop> datalist=baseDataDao.getWorkshopList(queryMap);
		totalCount=baseDataDao.getWorkshopTotalCount(queryMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}
	public Map<String, Object> getAllWorkshopList() {

		List<BmsBaseWorkshop> datalist=baseDataDao.getAllWorkshopList();

		Map<String, Object> result=new HashMap<String,Object>();
		
		result.put("data", datalist);
		return result;
	}
	@Override
	public int addWorkshop(BmsBaseWorkshop workshop) {
		return baseDataDao.addWorkshop(workshop);
	}
	@Override
	public void updateWorkshop(BmsBaseWorkshop workshop) {
		baseDataDao.updateWorkshop(workshop);
	}
	@Override
	public void deleteWorkshop(List ids) {
		baseDataDao.deleteWorkshop(ids);
	}
	@Override
	public int checkDeleteWorkshop(List ids) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	//线别
	@Override
	public Map<String, Object> getLineList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<BmsBaseLine> datalist=baseDataDao.getLineList(queryMap);
		totalCount=baseDataDao.getLineTotalCount(queryMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}
	@Override
	public int addLine(BmsBaseLine line) {
		return baseDataDao.addLine(line);
	}
	@Override
	public void updateLine(BmsBaseLine line) {
		baseDataDao.updateLine(line);
	}
	@Override
	public void deleteLine(List ids) {
		baseDataDao.deleteLine(ids);
	}
	@Override
	public int checkDeleteLine(List ids) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	//工序
	@Override
	public Map<String, Object> getProcessList(Map<String, Object> queryMap) {
		Map<String,Object> result=new HashMap<String,Object>();
		int totalCount=0;
		List<BmsBaseProcess> datalist=baseDataDao.getProcessList(queryMap);
		totalCount=baseDataDao.getProcessTotalCount(queryMap);
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("draw", queryMap.get("draw"));
		result.put("data", datalist);
		
		return result;
	}
	@Override
	public int addProcess(BmsBaseProcess process) {
		if(process!=null){
			baseDataDao.addProcess(process);
		}	
		return process.getId();
	}
	@Override
	public void updateProcess(BmsBaseProcess process) {
		if(process.getId()!=0){
			baseDataDao.updateProcess(process);
		}	
	}
	@Override
	public void deleteProcess(List ids) {
		if(ids.size()>0){
			baseDataDao.deleteProcess(ids);
		}		
	}
	@Override
	public Map<String, Object> getProcessConfigList(Map<String, Object> condMap) {
		Map<String,Object> result=new HashMap<String,Object>();
		int totalCount=0;
		List<Map<String,Object>> datalist=baseDataDao.queryProcessConfigList(condMap);
		totalCount=baseDataDao.queryProcessConfigCount(condMap);
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("draw", condMap.get("draw"));
		result.put("data", datalist);
		return result;
	}
	@Override
	public List<Map<String, Object>> getProcessListNoLine(
			Map<String, Object> condMap) {
		List<Map<String,Object>> datalist=baseDataDao.queryProcessListNoLine(condMap);
		return datalist;
	}
	@Override
	public List<Map<String,Object>> getProcessConfigDetailList(Map<String, Object> condMap) {
		List<Map<String,Object>> datalist=baseDataDao.queryProcessConfigDetailList(condMap);
		return datalist;
	}
	/**
	 * 根据工厂获取该工厂下所有车间的标准工序列表
	 */
	@Override
	public List<Map<String,Object>> getProcessListByFactory(Map<String, Object> condMap) {
		List<Map<String,Object>> datalist=baseDataDao.queryProcessListByFactory(condMap);
		return datalist;
	}
	/**
	 * 新增工序配置，同一工厂同一订单类型只允许保存一个工序配置
	 */
	@Override
	public void addProcessConfig(List<Map<String, Object>> process_list,
			ModelMap model) {
		String factory=(String) process_list.get(0).get("factory");
		String order_type=(String) process_list.get(0).get("order_type");
		Map<String,Object>condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("order_type", order_type);
		//根据工厂、订单类型查询是否已经存在工序配置
		List<Map<String, Object>> list=baseDataDao.queryProcessConfigList(condMap);
		if(list.size()>0){
			model.put("message", factory+" "+order_type+" 已存在工序配置，不能重复添加！");
			model.put("success", false);
			return;
		}
		try{
			int i=baseDataDao.insertProcessConfig(process_list);
			model.put("message","保存成功！");
			model.put("success", true);
		}catch(Exception e){
			model.put("message",e.getMessage());
			model.put("success", false);
		}	
	}
	
	/**
	 * 编辑工序配置，先删除该工厂该订单类型下的工序配置，再插入修改后的工序配置
	 */
	@Override
	@Transactional
	public void editProcessConfig(List<Map<String, Object>> process_list,
			ModelMap model) {
		String factory=(String) process_list.get(0).get("factory");
		String order_type=(String) process_list.get(0).get("order_type");
		Map<String,Object>condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("order_type", order_type);
		//删除该工厂订单类型下的工序配置
		try{
			baseDataDao.deleteProcessConfig(condMap);
			baseDataDao.insertProcessConfig(process_list);
			model.put("message","保存成功！");
			model.put("success", true);
		}catch(Exception e){
			model.put("message",e.getMessage());
			model.put("success", false);
			throw new RuntimeException("系统异常！");			
		}	
		
	}
	
	@Override
	public void deleteProcessConfig(Map<String, Object> condMap, ModelMap model) {
		try{
			baseDataDao.deleteProcessConfig(condMap);
			model.put("message","删除成功！");
			model.put("success", true);
		}catch(Exception e){
			model.put("message",e.getMessage());
			model.put("success", false);
		}	
	}
	
	//班组
	public List<BmsBaseStandardWorkgroup> getWorkgroupList(Map<String, Object> queryMap) {
		return baseDataDao.getWorkgroupList(queryMap);
	}

	public List<Map<String, Object>> getWorkshopTreeList(Map<String, Object> queryMap) {
	
		return baseDataDao.getWorkshopTreeList(queryMap);
	}
	@Override
	public int addWorkgroup(BmsBaseStandardWorkgroup workgroup) {
	
		return baseDataDao.addWorkgroup(workgroup);
	}
	@Override
	public int updateWorkgroup(BmsBaseStandardWorkgroup workgroup) {
		return baseDataDao.updateWorkgroup(workgroup);
	}
	@Override
	public void deleteWorkgroup(List ids) {
		for(Object id : ids){
			if(id!=null){
				baseDataDao.deleteWorkgroup((String)id);
				Map<String,Object>condMap=new HashMap<String,Object>();
				// 删除子节点记录
				condMap.put("parentId", (String)id);
				List<BmsBaseStandardWorkgroup> list=baseDataDao.getWorkgroupList(condMap);
				if(list.size()>0){
					for(BmsBaseStandardWorkgroup bean : list){
						baseDataDao.deleteWorkgroup(bean.getId()+"");
					}
				}
			}
		}
	}
	
	//车型
	@Override
	public Map<String, Object> getBusTypeList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<BmsBaseBusType> datalist=baseDataDao.getBusTypeList(queryMap);
		totalCount=baseDataDao.getBusTypeTotalCount(queryMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}
	@Override
	public int addBusType(BmsBaseBusType busType) {
		return baseDataDao.addBusType(busType);
	}
	@Override
	public void updateBusType(BmsBaseBusType busType) {
	    baseDataDao.updateBusType(busType);
	}
	@Override
	public BmsBaseBusType getBusTypeById(Map<String, Object> queryMap) {
		return baseDataDao.getBusTypeById(queryMap);
	}
	// VIN生成规则
	
	public Map<String, Object> getVinRuleList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<BmsBaseVinRule> datalist=baseDataDao.getVinRuleList(queryMap);
		totalCount=baseDataDao.getVinRuleTotalCount(queryMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	public int addVinRule(BmsBaseVinRule vinRule) {
		/*
		 * result 0:插入失败; 1:插入成功; 2:已存在记录
		 */
		int result=0;
		Map map=new HashMap<String,Object>();
		map.put("busTypeId", vinRule.getBusTypeId());
		map.put("area",vinRule.getArea());
		int count=baseDataDao.getVinRuleTotalCount(map);
		if(count==0){
			result=baseDataDao.addVinRule(vinRule);
		}else{
			result=2;
		}
		return result;
	}

	public int updateVinRule(BmsBaseVinRule vinRule) {
		return baseDataDao.updateVinRule(vinRule);
	}

	public void deleteVinRule(List ids) {
		baseDataDao.deleteVinRule(ids);
	}
	@Override
	public BmsBaseFactory getFactoryById(String id) {
		return baseDataDao.getFactoryById(id);
	}

}
