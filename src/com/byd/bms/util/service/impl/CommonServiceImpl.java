package com.byd.bms.util.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.byd.bms.util.dao.ICommonDao;
import com.byd.bms.util.model.BmsBaseProcess;
import com.byd.bms.util.service.ICommonService;
@Service
public class CommonServiceImpl implements ICommonService {
	@Resource
	private ICommonDao commonDao;
	@Override
	public List<Map<String, Object>> getOrderFuzzySelect(Map<String, Object> condMap) {
		List<Map<String, Object>> orderlist=commonDao.queryOrderList(condMap);
		return orderlist;
	}
	@Override
	public List<Map<String, Object>> getFactorySelect(Map<String, Object> condMap) {
		List<Map<String, Object>> factoryList=commonDao.queryFactoryList(condMap);
		return factoryList;
	}
	@Override
	public List<Map<String, Object>> getBusTypeSelect() {
		List<Map<String, Object>> busTypeList=commonDao.queryBusTypeList();
		return busTypeList;
	}
	@Override
	public List<Map<String, Object>> getKeysSelect(String keyCode) {
		List<Map<String, Object>> keylist=commonDao.queryKeysList(keyCode);
		return keylist;
	}
	@Override
	public List<Map<String, Object>> getDepartmentByFactory(String factory_id) {
		List<Map<String, Object>> departmentList=commonDao.queryDepartmentByFactory(factory_id);
		return departmentList;
	}
	@Override
	public List<String> getAllRoleAuthority() {
		List<String> datalist = commonDao.getAllRoleAuthority();
		return datalist;
	}
	@Override
	public List<String> getRoleAuthority(String staff_number) {
		List<String> datalist = commonDao.getRoleAuthority(staff_number);
		return datalist;
	}
	@Override
	public List<Map<String, Object>> getWorkshopSelect( Map<String, Object> condMap) {
		List<Map<String, Object>> workshopList=commonDao.queryWorkshopList(condMap);
		return workshopList;
	}
	@Override
	public List<Map<String, Object>> getFactorySelectAuth(Map<String, Object> condMap) {
		List<Map<String, Object>> factoryList=commonDao.queryFactoryListAuth(condMap);
		return factoryList;
	}
	@Override
	public List<Map<String, Object>> getWorkshopSelectAuth(Map<String, Object> condMap) {
		List<Map<String, Object>> workshopList=commonDao.queryWorkshopListAuth(condMap);
		return workshopList;
	}
	@Override
	public List<Map<String, String>> getAllReasonType() {
		return commonDao.getAllReasonType();
	}
	@Override
	public List<Map<String, Object>> getLineSelect() {
		
		return commonDao.queryLineList();
	}
	@Override
	public List<Map<String, Object>> getLineSelectAuth(
			Map<String, Object> condMap) {
		
		return commonDao.queryLineListAuth(condMap);
	}
	@Override
	public List<BmsBaseProcess> queryProcessList(Map<String, Object> condMap) {
		return commonDao.queryProcessList(condMap);
	}
	@Override
	public List<Map<String, String>> getWorkshopSelect_Key() {
		return commonDao.getWorkshopSelect_Key();
	}
	@Override
	public List<Map<String, Object>> getOrderConfigSelect(String order_id) {
		return commonDao.queryOrderConfigList(order_id);
	}

}
