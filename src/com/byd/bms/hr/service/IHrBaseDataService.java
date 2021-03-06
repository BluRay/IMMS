package com.byd.bms.hr.service;

import java.util.List;
import java.util.Map;

import org.springframework.ui.ModelMap;

public interface IHrBaseDataService {
	// 组织架构树结构数据List
	public List<Map<String, Object>> getOrgDataTreeList(Map<String,Object> queryMap);
	
	public List<Map<String, Object>> getOrgDataByParentId(Map<String,Object> queryMap);
	
    public int addOrgData(Map<String,Object> queryMap);
	
	public int editOrgData(Map<String,Object> queryMap);
	
	public int deleteOrgData(Map<String,Object> conditionMap);
	
	public Map<String,Object> getStaffList(Map<String, Object> conditionMap);
	
    public int addPositionData(List<Map<String,Object>> list);
	
	public Map<String,Object> getPositionList(Map<String,Object> conditionMap);
	
	public List<Map<String,Object>> getPositionData(Map<String,Object> conditionMap);
	
	public int editPositionData(Map<String,Object> conditionMap);
	
    public Map<String,Object> addStandardHumanData(List<Map<String,Object>> list);
	
	public List<Map<String,Object>> getStandardHumanData(Map<String,Object> conditionMap);
	
	public int editStandardHumanData(List<Map<String, Object>> list);
	
	public void deleteStandardHumanData(String id);
	
	public void deletePositionData(List<String> list);

	public List<Map<String,Object>> getOrg(List<Map<String,Object>> conditionMap);
	public List<String> getStaffListByStaffNumbers(Map<String, Object> conditionMap);
	public int dimissionStaff(Map<String, Object> conditionMap);
	public int uploadStaff(List<Map<String, Object>> addList,List<Map<String, Object>> updateList);
	
	public Map<String,Object> getWorkgroupPriceList(Map<String, Object> conditionMap);
	public Map<String,Object> getOrgInfo(Map<String,Object> conditionMap);
	public Map<String,Object> queryWorkgroupPrice(Map<String, Object> map);
	public int addWorkgroupPrice(List<Map<String, Object>> addList);
	public int updateWorkgroupPrice(List<Map<String, Object>> upDateList);
	
	public Map<String,Object> getStaffDistribution(Map<String, Object> conditionMap);
	public int checkIsValidStaff(Map<String, Object> cMap);
	public Double getWorkgroupPrice(Map<String, Object> pmap);
	public int deleteStaffDistribution(Map<String,Object> conditionMap);
	public int saveStaffDistribution(List<Map<String, Object>> datalist);
	
	public int addWorkTimePrice(Map<String,Object> conditionMap);
	public int editWorkTimePrice(Map<String,Object> conditionMap);
	public Map<String,Object> getWorkTimePrice(Map<String, Object> conditionMap);
	/**
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	public void saveSupplierData(Map<String, Object> condMap, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param supplier
	 * @return
	 */
	public int querySupplierCount(String supplier);
	/**
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	public void getSupplierlist(Map<String, Object> condMap, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param ids
	 * @param model
	 */
	public void deleteSupplierData(String ids, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param infomap
	 * @return
	 */
	public int querySupplierPriceCount(Map<String, Object> infomap);
	/**
	 * @author xiong.jianwu
	 * @param infomap
	 * @return
	 */
	public Map<String, Object> getStandardWorkgroup(Map<String, Object> infomap);
	/**
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	public void saveSupplierPriceData(Map<String, Object> condMap, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param condMap
	 * @param model
	 */
	public void getSupplierPricelist(Map<String, Object> condMap, ModelMap model);
	/**
	 * @author xiong.jianwu
	 * @param ids
	 * @param model
	 */
	public void deleteSupplierPriceData(String ids, ModelMap model);
	
	public List<Map<String,Object>> getJopPriceList(Map<String, Object> infomap);
	
	public void saveJobUnitPrice(Map<String, Object> condMap);
}
