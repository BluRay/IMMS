/**
 * 
 */
package com.byd.bms.production.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.production.service.IProductionService;

/**
 * @author xiong.jianwu
 *	生产模块service实现
 */
@Service
public class ProductionServiceImpl implements IProductionService {
	@Resource(name="productionDao")
	private IProductionDao productionDao;
	/**
	 * 查询线别工序列表
	 */
	@Override
	public List getLineProcessList(Map<String, Object> condMap) {
		List datalist=new ArrayList();
		datalist=productionDao.queryLineProcessList(condMap);
		return datalist;
	}

	@Override
	public List<Map<String, Object>> getProcessMonitorSelect(
			Map<String, Object> condMap) {
		
		return productionDao.queryProcessMonitorList(condMap);
	}

	@Override
	public List<Map<String, Object>> getKeyParts(Map<String, Object> condMap) {
		List<Map<String, Object>> keyParts=productionDao.queryKeyParts(condMap);
		if(keyParts==null){
			keyParts=new ArrayList<Map<String,Object>>();
		}
		return keyParts;
	}

	@Override
	public Map<String, Object> getBusInfo(String bus_number) {
		Map<String,Object> businfo=new HashMap<String,Object>();
		businfo=productionDao.queryBusInfo(bus_number);

		return businfo;
	}

	@Override
	public List<Map<String, Object>> getOrderConfigList(String order_config_id) {
		List<Map<String, Object>> configList=productionDao.queryOrderConfigList(order_config_id);
		if(configList==null){
			configList=new ArrayList<Map<String,Object>>();
		}
		return configList;
	}

	/**
	 *车辆扫描，判断该工序是否有扫描记录，未扫描判断上一个计划节点是否有扫描记录，无则提示先扫描上一个计划节点
	 * 保存扫描信息、关键零部件信息、更新bus表对应车辆的latest_process_id 
	 */
	@Override
	@Transactional
	public Map<String,Object> scan(Map<String, Object> condMap,List partsList) {
		Map<String,Object> rMap=new HashMap<String,Object>();
		int scan_num_cur=productionDao.queryScanRecord(condMap);//查询当前节点扫描记录
		if(scan_num_cur<=0){   //当前节点未扫描		
			Map<String,Object> lastPlanNode=productionDao.queryLastPlanNode(condMap);
			//没有上一个计划节点，保存扫描信息，更新bus表
			if(lastPlanNode==null){
				productionDao.saveScanRecord(condMap);
				productionDao.updateBusProcess(condMap);
			}else{
				condMap.put("last_process_id", lastPlanNode.get("process_id"));
				Map<String,Object> scanRecord=productionDao.queryScanLastPlanNode(condMap);
				if(scanRecord==null){
					rMap.put("success", false);
					rMap.put("message", lastPlanNode.get("process_name")+"还未扫描，请先扫描"+lastPlanNode.get("process_name")+"!");
					 return rMap;
				}else{
					productionDao.saveScanRecord(condMap);
					productionDao.updateBusProcess(condMap);
					rMap.put("success", true);
					rMap.put("message", "扫描成功！");
				}
			}
			
			if(partsList.size()>0){
				productionDao.saveParts(partsList);
			}
			
			rMap.put("success", true);
			rMap.put("message", "扫描成功！");
		}else{  // 当前节点已扫描
			if(partsList.size()>0){
				productionDao.updateParts(partsList);
			}		
			rMap.put("success", true);
			rMap.put("message", "扫描成功！");
		}
		return rMap;
	}

}
