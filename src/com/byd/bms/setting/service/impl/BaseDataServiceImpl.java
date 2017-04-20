package com.byd.bms.setting.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.setting.dao.IBaseDataDao;
import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseProcess;
import com.byd.bms.setting.model.BmsBaseStandardWorkgroup;
import com.byd.bms.setting.model.BmsBaseWorkshop;
import com.byd.bms.setting.service.IBaseDataService;
@Service
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
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int addLine(BmsBaseLine line) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public void updateLine(BmsBaseLine line) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void deleteLine(List ids) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public int checkDeleteLine(List ids) {
		// TODO Auto-generated method stub
		return 0;
	}
	
	//工序
	@Override
	public Map<String, Object> getProcessList(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int addProcess(BmsBaseProcess process) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public void updateProcess(BmsBaseProcess process) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void deleteProcess(List ids) {
		// TODO Auto-generated method stub
		
	}
	
	//班组
	@Override
	public Map<String, Object> getWorkgroupList(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int addWorkgroup(BmsBaseStandardWorkgroup workgroup) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public void updateWorkgroup(BmsBaseStandardWorkgroup workgroup) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void deleteWorkgroup(List ids) {
		// TODO Auto-generated method stub
		
	}
	
	//车型
	@Override
	public Map<String, Object> getBusTypeList(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public int addBusType(BmsBaseBusType busType) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public void updateBusType(BmsBaseBusType busType) {
		// TODO Auto-generated method stub
		
	}
	
}
