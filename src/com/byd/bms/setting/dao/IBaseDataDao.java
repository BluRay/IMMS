package com.byd.bms.setting.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.model.BmsBaseLine;
import com.byd.bms.setting.model.BmsBaseProcess;
import com.byd.bms.setting.model.BmsBaseStandardWorkgroup;
import com.byd.bms.setting.model.BmsBaseWorkshop;

@Repository(value="baseDataDao")
public interface IBaseDataDao {
	//工厂
	public List<BmsBaseFactory> getFactoryList(Map<String,Object> queryMap);
	public int getFactoryTotalCount(Map<String,Object> queryMap);
	public void updateFactory(BmsBaseFactory factory);
	public void deleteFactory(List ids);
	public int checkDeleteFactory(List ids);
	public int addFactory(BmsBaseFactory factory);
	
	//车间
	public List<BmsBaseWorkshop> getWorkshopList(Map<String,Object> queryMap);
	public int getWorkshopTotalCount(Map<String,Object> queryMap);
	public int addWorkshop(BmsBaseWorkshop workshop);
	public void updateWorkshop(BmsBaseWorkshop workshop);
	public void deleteWorkshop(List ids);
	public int checkDeleteWorkshop(List ids);
	//线别
	public List<BmsBaseLine> getLineList(Map<String,Object> queryMap);
	public int getLineTotalCount(Map<String,Object> queryMap);
	public int addLine(BmsBaseLine line);
	public void updateLine(BmsBaseLine line);
	public void deleteLine(List ids);
	public int checkDeleteLine(List ids);
	//工序
	public List<BmsBaseProcess> getProcessList(Map<String,Object> queryMap);
	public int getProcessTotalCount(Map<String,Object> queryMap);
	public int addProcess(BmsBaseProcess process);
	public void updateProcess(BmsBaseProcess process);
	public void deleteProcess(List ids);
	//车间班组
	public List<BmsBaseStandardWorkgroup> getWorkgroupList(Map<String,Object> queryMap);
	public int getWorkgroupTotalCount(Map<String,Object> queryMap);
	public int addWorkgroup(BmsBaseStandardWorkgroup workgroup);
	public void updateWorkgroup(BmsBaseStandardWorkgroup workgroup);
	public void deleteWorkgroup(List ids);
	//车型
	public List<BmsBaseBusType> getBusTypeList(Map<String,Object> queryMap);
	public int getBusTypeTotalCount(Map<String,Object> queryMap);
	public int addBusType(BmsBaseBusType busType);
	public void updateBusType(BmsBaseBusType busType);
}