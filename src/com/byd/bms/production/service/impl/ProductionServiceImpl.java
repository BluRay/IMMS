/**
 * 
 */
package com.byd.bms.production.service.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.byd.bms.production.dao.IProductionDao;
import com.byd.bms.production.model.ProductionException;
import com.byd.bms.production.service.IProductionService;
import com.sun.media.jfxmedia.logging.Logger;

/**
 * @author xiong.jianwu
 *	生产模块service实现
 */
@Service
public class ProductionServiceImpl implements IProductionService {
	@Resource(name="productionDao")
	private IProductionDao productionDao;
	
	/*****************************xiong jianwu start  *****************************/
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
					rMap.put("message", lastPlanNode.get("plan_node")+"("+lastPlanNode.get("process_name")+")还未扫描，请先扫描"+lastPlanNode.get("plan_node")+"!");
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

	@Override
	@Transactional
	public void createProductionException(List<ProductionException> exceptionList,
			ModelMap model) {
		try{
			productionDao.insertProductionException(exceptionList);
			model.put("success", true);
			model.put("message", "登记成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "登记失败！");
			throw new RuntimeException(e.getMessage());
		}		
	}

	@Override
	public Map<String, Object> getBusInfoList(Map<String, Object> condMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.queryBusInfoList(condMap);
		totalCount=productionDao.queryBusInfoCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public void updateBusInfo(Map<String, Object> condMap, ModelMap model) {
		try{
			productionDao.updateBusInfo(condMap);
			model.put("success", true);
			model.put("message", "保存成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "保存失败！");
			throw new RuntimeException(e.getMessage());
		}			
	}

	@Override
	public void getSupplyTotalCount(Map<String, Object> condMap, ModelMap model) {
			model.put("data",productionDao.querySupplyTotalCount(condMap));		
	}

	@Override
	public void saveUpdateWorkshopSupply(Map<String, Object> condMap,
			ModelMap model) {
		try{
			if(condMap.get("id")!=null){
				productionDao.updateWorkshopSupply(condMap);
			}else{
				productionDao.saveWorkshopSupply(condMap);
			}
			
			model.put("success", true);
			model.put("message", "保存成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "保存失败！");
			throw new RuntimeException(e.getMessage());
		}			
		
	}

	@Override
	public Map<String, Object> getWorkshopSupplyList(Map<String, Object> condMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.queryWorkshopSupplyList(condMap);
		totalCount=productionDao.queryWorkshopSupplyCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public void getPartsFinishCount(Map<String, Object> condMap, ModelMap model) {
		model.put("data",productionDao.queryPartsFinishCount(condMap));			
	}

	@Override
	public void saveUpdatePartsOnOffRecord(Map<String, Object> condMap,
			ModelMap model) {
		try{
			if(condMap.get("id")!=null){
				productionDao.updatePartsOnOffRecord(condMap);
			}else{
				productionDao.savePartsOnOffRecord(condMap);
			}
			
			model.put("success", true);
			model.put("message", "保存成功！");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "保存失败！");
			throw new RuntimeException(e.getMessage());
		}			
	}

	@Override
	public Map<String, Object> getPartsOnOffList(
			Map<String, Object> condMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.queryPartsOnOffList(condMap);
		totalCount=productionDao.queryPartsOnOffCount(condMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", condMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public Map<String, Object> getNextProcess(Map<String, Object> condMap) {
		Map<String,Object> nextProcess=productionDao.queryNextProcess(condMap);
		return nextProcess;
	}

	@Override
	public List<Map<String, String>> getProductionSearchBusinfo(String bus_number) {
		return productionDao.getProductionSearchBusinfo(bus_number);
	}
	
	@Override
	public List<Map<String,String>> getProductionSearchScan(String bus_number){
		return productionDao.getProductionSearchScan(bus_number);
	}
	
	@Override
	public List<Map<String,String>> getNamePlateInfo(String bus_number){
		return productionDao.getNamePlateInfo(bus_number);
	}
	
	@Override
	public List<Map<String,String>> getProductionSearchException(String bus_number){
		return productionDao.getProductionSearchException(bus_number);
	}
	
	@Override
	public List<Map<String,String>> getCertificationInfo(String bus_number){
		return productionDao.getCertificationInfo(bus_number);
	}
	
	@Override
	public List<Map<String,String>> getEcnTasksByBusNumber(String bus_number){
		return productionDao.getEcnTasksByBusNumber(bus_number);
	}

	@Override
	public void getNameplatePrintList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.getNameplatePrintList(condMap);
		totalCount=productionDao.getNameplatePrintCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);	
	}

	@Override
	public void updateNameplatePrint(Map<String, Object> conditionMap,
			ModelMap model) {
		try{
			int i=productionDao.updateNameplatePrint(conditionMap);
			model.put("success", true);
			model.put("message", "打印成功");
		}catch(Exception e){
			model.put("success", false);
			model.put("message", e.getMessage());
		}
		
	}
	
	@Override
	public void getCertificationList(Map<String, Object> condMap, ModelMap model) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.getCertificationList(condMap);
		totalCount=productionDao.getCertificationCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);	
	}

	@Override
	public void transferDataToHGZSys(List<Map<String, Object>> buslist,ModelMap model) {
		String JDriver="com.microsoft.sqlserver.jdbc.SQLServerDriver";//SQL数据库引擎
		String connectDB="jdbc:sqlserver://10.3.12.134;DatabaseName=HGZ_DATABASE";//数据源
		String user="TEST";
		String password="byd123456";
	
		List<Map<String,Object>> updateList=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> insertList=new ArrayList<Map<String,Object>>();
		Connection con=null;
		try
		{
			Class.forName(JDriver);//加载数据库引擎，返回给定字符串名的类
			con=DriverManager.getConnection(connectDB,user,password);//连接数据库对象		
			con.setAutoCommit(false);
			System.out.println("连接数据库成功");
			Statement stmt=con.createStatement();//创建SQL命令对象
			
			for(Map<String,Object> bus:buslist){
				String sql_q="select VIN from PRINT_TABLE where VIN='"+bus.get("vin")+"'";
				ResultSet rs=stmt.executeQuery(sql_q);
				if(rs.next()){
					updateList.add(bus);
				}else{
					insertList.add(bus);
				}
			}
			
			for(Map<String,Object>bus:updateList){
				StringBuffer sb=new StringBuffer("update PRINT_TABLE set ");
				sb.append("CLXH='").append(bus.get("vehicle_model")).append("',");
				sb.append("FDJH='").append(bus.get("motor_model")).append(" ")
				.append(bus.get("motor_number")).append("',");
				sb.append("Leavedate='").append(bus.get("productive_date")).append("',");
				sb.append("CLYS='").append(bus.get("bus_color")).append("',");
				sb.append("Ltgg='").append(bus.get("tire_type")).append("',");
				sb.append("NOTE='").append(bus.get("hgz_note")).append("',");
				sb.append("SCD='").append(bus.get("zc_zzd")).append("'");
				sb.append(" where VIN='").append(bus.get("vin")).append("'").append(" and DATATYPE='1'");
				stmt.addBatch(sb.toString());
				
				StringBuffer sb1=new StringBuffer("update PRINT_TABLE set ");
				sb1.append("CLXH='").append(bus.get("chassis_model")).append("',");
				sb1.append("FDJH='").append(bus.get("motor_model")).append(" ")
				.append(bus.get("motor_number")).append("',");
				sb1.append("Leavedate='").append(bus.get("dp_production_date")).append("',");
				sb1.append("CLYS='").append(bus.get("bus_color")).append("',");
				sb1.append("Ltgg='").append(bus.get("tire_type")).append("',");
				sb1.append("NOTE='").append(bus.get("hgz_note")).append("',");
				sb1.append("SCD='").append(bus.get("dp_zzd")).append("'");
				sb1.append(" where VIN='").append(bus.get("vin")).append("'").append(" and DATATYPE='0'");;
				stmt.addBatch(sb1.toString());
			}
			
			for(Map<String,Object>bus:insertList){
				StringBuffer sb=new StringBuffer("insert into PRINT_TABLE (VIN,CLXH,FDJH,Leavedate,CLYS,Ltgg,NOTE,SCD,DATATYPE) values(");
				sb.append("'").append(bus.get("vin")).append("',");
				sb.append("'").append(bus.get("vehicle_model")).append("',");
				sb.append("'").append(bus.get("motor_model")).append(" ")
				.append(bus.get("motor_number")).append("',");
				sb.append("'").append(bus.get("productive_date")).append("',");
				sb.append("'").append(bus.get("bus_color")).append("',");
				sb.append("'").append(bus.get("tire_type")).append("',");
				sb.append("'").append(bus.get("hgz_note")).append("',");
				sb.append("'").append(bus.get("zc_zzd")).append("',");
				sb.append("'1')");
				stmt.addBatch(sb.toString());
				
				StringBuffer sb1=new StringBuffer("insert into PRINT_TABLE (VIN,CLXH,FDJH,Leavedate,CLYS,Ltgg,NOTE,SCD,DATATYPE) values(");
				sb1.append("'").append(bus.get("vin")).append("',");
				sb1.append("'").append(bus.get("chassis_model")).append("',");
				sb1.append("'").append(bus.get("motor_model")).append(" ")
				.append(bus.get("motor_number")).append("',");
				sb1.append("'").append(bus.get("dp_production_date")).append("',");
				sb1.append("'").append(bus.get("bus_color")).append("',");
				sb1.append("'").append(bus.get("tire_type")).append("',");
				sb1.append("'").append(bus.get("hgz_note")).append("',");
				sb1.append("'").append(bus.get("dp_zzd")).append("',");
				sb1.append("'0')");
				stmt.addBatch(sb1.toString());
			}
			
			stmt.executeBatch();
			stmt.close();
			con.commit();
			con.close();
			model.put("success", true);
			model.put("message", "传输打印成功！");
		}catch(Exception e)
		{
			model.put("success", false);
			model.put("message", e.getMessage());
		}
		
	}
	
	/*****************************xiong jianwu end  *****************************/


	/*******************  tangjin start **************************/
	@Override
	public Map<String, Object> getVinPrintList(Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.getVinPrintList(conditionMap);
		totalCount=productionDao.getVinPrintCount(conditionMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public int updateVinPrint(Map<String, Object> conditionMap) {
		return productionDao.updateVinPrint(conditionMap);
	}

	@Override
	public int updateBusMotorNumber(Map<String, Object> buslist) {
		return productionDao.updateBusMotorNumber(buslist);
	}

	@Override
	public int updateVinMotorNumber(Map<String, Object> buslist) {
		return productionDao.updateVinMotorNumber(buslist);
	}
	@Override
	public List<Map<String, String>> getVinList(Map<String, Object> conditionMap) {
		return productionDao.getVinList(conditionMap);
	}

	@Override
	public List<Map<String, String>> getBusNumberByVin(
			Map<String, Object> conditionMap) {
		return productionDao.getBusNumberByVin(conditionMap);
	}

	@Override
	public Map<String, Object> getBusNoPrintList(
			Map<String, Object> conditionMap) {
		int totalCount=0;
		List<Map<String, Object>> datalist=productionDao.getBusNoPrintList(conditionMap);
		totalCount=productionDao.getBusNoPrintCount(conditionMap);
		Map<String, Object> result=new HashMap<String,Object>();
		result.put("draw", conditionMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public int getOrderConfigDoneQty(Map<String, Object> conditionMap) {
		return productionDao.getOrderConfigDoneQty(conditionMap);
	}

	@Override
	public int updateBusPrint(Map<String, Object> conditionMap) {
		return productionDao.updateBusPrint(conditionMap);
	}

	@Override
	public int updateBusConfig(Map<String, Object> conditionMap) {
		return productionDao.updateBusConfig(conditionMap);
	}

	@Override
	public List<Map<String,Object>> getOrderConfigList(
			Map<String, Object> conditionMap) {
		List<Map<String, Object>> datalist=productionDao.getOrderConfigList(conditionMap);
		return datalist;
	}

	/*******************  tangjin end  **************************/
}
