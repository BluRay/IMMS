package com.byd.bms.zzj.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.ui.ModelMap;

import com.byd.bms.util.DataSource;
import com.byd.bms.zzj.dao.IZzjDao;
import com.byd.bms.zzj.service.IZzjService;
@Service
@DataSource("dataSourceMaster")
public class ZzjServiceImpl implements IZzjService {
	private Logger log=Logger.getLogger(ZzjServiceImpl.class);
	@Resource(name="zzjDao")
	private IZzjDao zzjDao;

	@Override
	public void getMatList(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryMatList(condMap);
		int totalCount=zzjDao.queryMatListCount(condMap);
		
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	@Override
	public void updateMatById(Map<String, Object> condMap, ModelMap model) {
		try{
			zzjDao.updateMatById(condMap);
			model.put("success", true);
			model.put("message", "更新成功！");
		}catch(Exception e){
			log.error(e.getMessage());
			model.put("success", false);
			model.put("message", "更新失败！");
		}
		
	}

	@Override
	public void getZzjTypeList(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryZjjTypeList(condMap);
		model.put("data", datalist);
	}

	@Override
	public void getMatInfo(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryMatInfo(condMap);
		model.put("data", datalist);
	}

	/**
	 * 自制件产量录入,根据订单、工厂、车间、线别、自制件类别、批次、物料描述判断累计产量是否
	 * 超出批次计划量*单车用量,超出则提示错误信息，等于则更新批次计划状态为“已完成”,小于则更新批次
	 * 计划状态为“生产中”
	 */
	@Override
	@Transactional
	public void enterMatOutput(Map<String, Object> condMap, ModelMap model) {
		Map<String,Object> plan_done=new HashMap<String,Object>();

		//如果存在output id，则先根据id删除原有记录
		if(condMap.get("output_id")!=null){
			zzjDao.deleteMatOutputById(condMap.get("output_id").toString());
		}
		//保存产量信息
		zzjDao.saveMatOutput(condMap);
		
		//查询单种物料的计划和完成数量
		plan_done=this.getBatchPlanDone(condMap).get(0);
		//int output=Integer.parseInt(condMap.get("quantity").toString());
		int plan_num=(int) plan_done.get("plan_quantity");
		int done_num=new Double((double) plan_done.get("done_quantity")).intValue();
		if(done_num>plan_num){//超出
			model.put("success", false);
			model.put("message", "累计生产数量不能超出计划数量！");	
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); //手动开启事务回滚
			return ;
			//throw new RuntimeException("自制件产量录入：累计生产数量不能超出计划数量！") ;
		}
		
		//查询所有物料是否都已生产完成，更新计划状态,批次是否完成以自制件最后一个工序（入库）为准
		Map<String, Object> condMap1=new HashMap<String,Object>();
		condMap1.put("order_id", condMap.get("order_id"));
		condMap1.put("factory_id", condMap.get("factory_id"));
		condMap1.put("batch", condMap.get("batch"));
		condMap1.put("workshop", condMap.get("workshop"));
		condMap1.put("line", condMap.get("line"));
		condMap1.put("process", "入库");
		/*condMap1.putAll(condMap);
		condMap1.remove("mat_desc");*/
		String plan_status=validatePlanStatus(condMap1);
		condMap.put("status", plan_status);
		zzjDao.updateZZJPlanStatus(condMap);
		
		//修改时，如何修改后的批次发生改变需要重新校验原有计划的状态，并进行更新
		if(!condMap.get("batch").equals(condMap.get("batch_old"))){
			condMap.put("batch", condMap.get("batch_old"));
			condMap1.put("batch", condMap.get("batch_old"));
			plan_status=validatePlanStatus(condMap1);
			condMap.put("status", plan_status);
			zzjDao.updateZZJPlanStatus(condMap);
		}
		
		model.put("success", true);
		model.put("message", "录入成功！");

	}
	/**
	 * 查询零部件计划及已完成数量信息
	 * @param condMap
	 * @return
	 */
	@Override
	public Map<String,Object> queryMatOutput(Map<String, Object> condMap){
		Map<String,Object> plan_done=null;
		//查询单种物料的计划和完成数量
		List<Map<String,Object>> dl=this.getBatchPlanDone(condMap);
		if(null!=dl&& dl.size()>0){
			plan_done=dl.get(0);
		}else{
			plan_done=new HashMap<String,Object>();
		}
		
		return plan_done;
	}

	/**
	 * 判断批次计划是否已生产完成，需要判断每种物料是否都已完成,
	 * 以入库节点判断是否完成
	 * 
	 */
	@Override
	public String validatePlanStatus(Map<String, Object> condMap) throws RuntimeException{
		String status="3";//已完成
		condMap.put("process", "入库");
		List<Map<String,Object>> datalist= this.getBatchPlanDone(condMap);
		for(Map<String,Object> m:datalist){
			int plan_num=(int)m.get("plan_quantity");
			int done_num=new Double((double) m.get("done_quantity")).intValue();
			if(plan_num>done_num){
				status="2";
				break;
			}
		}
		
		return status;
	}

	@Override
	public void getMatOutputData(Map<String, Object> condMap, ModelMap model) {
		List datalist=zzjDao.queryMatOutputList(condMap);
		model.put("data", datalist);
	}
    
	@Override
	@Transactional
	public void deleteMatOutput(Map<String, Object> condMap, ModelMap model) {
		//如果存在output id，则先根据id删除原有记录
		if(!StringUtils.isEmpty(condMap.get("output_id").toString())){
			zzjDao.deleteMatOutputById(condMap.get("output_id").toString());
		}
		//查询所有物料是否都已生产完成，更新计划状态
		Map<String, Object> condMap1=new HashMap<String,Object>();
		condMap1.putAll(condMap);
		condMap1.remove("mat_desc");
		String plan_status=validatePlanStatus(condMap1);
		condMap.put("status", plan_status);
		zzjDao.updateZZJPlanStatus(condMap);
		model.put("success", true);
		model.put("message", "删除成功！");
	
		
	}
	
	/**
	 * 按物料、自制件类别、批次查询计划数、生产完成数
	 * @param condMap
	 * @return
	 */
	public List<Map<String, Object>> getBatchPlanDone(Map<String, Object> condMap){
		List<Map<String, Object>> plan_done_list=new ArrayList<Map<String, Object>>();
		plan_done_list=zzjDao.queryPlanDoneList(condMap);
		int count=0;
		Iterator<Map<String, Object>> it1=plan_done_list.iterator();
		while(it1.hasNext()){
			Map<String,Object> m=it1.next();
			Integer plan_quantity=Integer.parseInt(m.get("batch_quantity").toString())*Integer.parseInt(m.get("quantity").toString());
			//plan_done_list.remove(count);
			String ecn_quantity=m.get("ecn_quantity").toString();
			Integer batch_quantity=Integer.parseInt(m.get("batch_quantity").toString());
			//技改明细不为空，需求数量根据批次计划数和技改明细综合对比计算
			if(StringUtils.isNotEmpty(ecn_quantity)){
				plan_quantity=0;
				for(String d:ecn_quantity.split(",")){
					Integer s=Integer.parseInt(d.split("-")[0]);
					Integer e=Integer.parseInt(d.split("-")[1]);
					Integer q=Integer.parseInt(d.split("-")[2]);
					if(batch_quantity<=(e-s+1)){
						plan_quantity+=(batch_quantity)*q;
						batch_quantity=0;
						break;
					}
					if(batch_quantity>(e-s+1)){
						plan_quantity+=(e-s+1)*q;
						batch_quantity=batch_quantity-(e-s+1);
					}				
				}
				//批次计划数量大于技改明细配置的数量，按照技改配置数量计算需求数量+剩余的批次数量*单车用量
				if(batch_quantity>0){
					plan_quantity+=batch_quantity*Integer.parseInt(m.get("quantity").toString());
				}
			}
			
			m.put("plan_quantity", plan_quantity);
			//判断前一条记录中自制件类别、物料描述、批次是否和本记录中一致			
			if(count>=1){
				Map<String,Object> m_last=plan_done_list.get(count-1);
				if(m_last.get("zzj_type").equals(m.get("zzj_type"))&&
						m_last.get("mat_description").equals(m.get("mat_description"))&&
						m_last.get("batch").equals(m.get("batch"))){
					plan_quantity=m_last.get("plan_quantity")==null?plan_quantity:(plan_quantity+Integer.parseInt(m_last.get("plan_quantity").toString()));
					m_last.put("plan_quantity", plan_quantity);
					
					//plan_done_list.remove(count);
					it1.remove();
					count--;
				}			
			}
	
			count++;
		}
		if(null !=condMap.get("status")&&condMap.get("status")!=""){
			Iterator<Map<String, Object>> it=plan_done_list.iterator();
			while(it.hasNext()){
				Map<String, Object> m= (Map<String, Object>) it.next();
				int plan_num=(int)m.get("plan_quantity");
				int done_num=new Double((double) m.get("done_quantity")).intValue();
				if("欠产".equals(condMap.get("status"))){
					if(plan_num<=done_num){
						it.remove();
					}
				}
				
				if("已完成".equals(condMap.get("status"))){
					if(plan_num>done_num){
						it.remove();
					}
				}
			}
		}
	
		return plan_done_list;
	}

	@Override
	public void getBatchList(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryBatchList(condMap);
		model.put("data", datalist);
		
	}
	
	@Override
	public void getOutputDetailList(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryOutputDetailList(condMap);
		int totalCount=zzjDao.queryOutputDetailListCount(condMap);
		
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	
	@Override
	public void getOutputCountData(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryMatOutputCount(condMap);
		
		model.put("draw", condMap.get("draw"));
		model.put("data", datalist);
	}

	
	@Override
	public void getOutputCountDetailData(Map<String, Object> condMap,
			ModelMap model) {
		List datalist=new ArrayList();
		datalist=getBatchPlanDone(condMap);
		List pagelist=new ArrayList();
		int start=(int) condMap.get("start");
		int length=(int) condMap.get("length");
		int end=start+length;
		if((start+length)>datalist.size()){
			end=datalist.size();
		}
		if(datalist.size()>0){
			pagelist=datalist.subList(start, end);					
		}
		
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", datalist.size());
		model.put("recordsFiltered", datalist.size());
		model.put("data", pagelist);		
	}

	/****************** tangjin start *******************/
	@Override
	public void getZzjBatchList(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=zzjDao.queryZjjBatchList(condMap);
		model.put("data", datalist);
	}
	
	@Override
	@Transactional
	public int savePmdInfo(Map<String, Object> condMap) {
		String header_id = condMap.get("header_id").toString();
		if(!header_id.equals("0")){
			//存在，在已导入的下料明细清单上做增删改查
			int pmd_header_id = Integer.valueOf(header_id);
			condMap.put("pmd_head_id", pmd_header_id);
			//新增数据，需新增明细表和明细记录表
			List<Map<String,Object>> add_list = (List<Map<String,Object>>)condMap.get("pmd_list");
			if(add_list.size()>0){
				zzjDao.addPmdDetails(condMap);
				zzjDao.addPmdHistoryDetails(condMap);
			}
			//修改数据
			List<Map<String,Object>> modify_list = (List<Map<String,Object>>)condMap.get("modify_list");
			if(modify_list.size()>0){
				zzjDao.modifyPmdDetails(condMap);
				condMap.put("pmd_list", modify_list);
				zzjDao.addPmdHistoryDetails(condMap);
			}
			//删除数据
			List<Map<String,Object>> delete_list = (List<Map<String,Object>>)condMap.get("delete_list");
			if(delete_list.size()>0){
				zzjDao.deletePmdItems(condMap);
				condMap.put("pmd_list", delete_list);
				zzjDao.addPmdHistoryDetails(condMap);
			}

		}else{
			//不存在，创建下料明细抬头数据
			zzjDao.addPmdHeader(condMap);
			int pmd_header_id = Integer.valueOf(condMap.get("id").toString());
			condMap.put("pmd_head_id", pmd_header_id);
			//新增数据，需新增明细表和明细记录表
			List<Map<String,Object>> add_list = (List<Map<String,Object>>)condMap.get("pmd_list");
			if(add_list.size()>0){
				zzjDao.addPmdDetails(condMap);
				zzjDao.addPmdHistoryDetails(condMap);
			}
		}
		return 0;
	}
	
	@Override
	public Map<String,Object> queryPmdInfo(Map<String,Object> condMap){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		Map<String,Object> pmdHead=zzjDao.queryPmdHeader(condMap);
		int header_id=0;
		if(pmdHead!=null){
			//查询下料明细
			header_id=Integer.parseInt(pmdHead.get("id").toString());
			condMap.put("pmd_head_id", header_id);
			List<Map<String,Object>> pmdItems = zzjDao.queryPmdItems(condMap);
			resultMap.put("pmdHead", pmdHead);
			resultMap.put("pmdItems", pmdItems);
			resultMap.put("production_qty", pmdHead.get("production_qty"));
		}
		return resultMap;
	}
	
	@Override
	public Map<String,Object> queryZzjPlan(Map<String,Object> condMap){
		Map<String,Object> resultMap=new HashMap<String, Object>();
		List<Map<String,Object>> zzjPlan = zzjDao.queryZzjPlan(condMap);
		if(null != zzjPlan && zzjPlan.size()>0){
			//查询到计划信息
			resultMap.put("zzjPlan", zzjPlan);
		}
		return resultMap;
	}
	
	@Override
	public Map<String,Object> queryFactoryOrderQuantity(Map<String,Object> condMap){
		Map<String,Object> factoryOrderInfo = zzjDao.queryFactoryOrderQuantity(condMap);
		return factoryOrderInfo;
	}
	
	@Override
	@Transactional
	public int addZzjPlan(Map<String,Object> condMap){
		return  zzjDao.addZzjPlan(condMap);
	}
	
	@Override
	@Transactional
	public int editZzjPlan(Map<String,Object> condMap){
		return  zzjDao.editZzjPlan(condMap);
	}
	
	@Override
	@Transactional
	public int deleteZzjPlan(int id){
		return  zzjDao.deletePlan(id);
	}
	
	@Override
	@Transactional
	public int importOutput(Map<String, Object> condMap){
		//保存导入的产量信息
		zzjDao.importOutput(condMap);

		List<Map<String,Object>> output_list =(List<Map<String,Object>>) condMap.get("output_list");
		//获取批次
		List<String> batchArr = new ArrayList<String>();
		for(Map<String,Object> map:output_list){
			map.put("mat_desc", map.get("mat_description"));
			map.put("workshop",condMap.get("workshop_name"));
			map.put("line",condMap.get("line"));
			map.put("factory",condMap.get("factory_name"));
			map.put("factory_id",condMap.get("factory_id"));
			map.put("order_id",condMap.get("order_id"));
			/**
			 * added by xjw 增加累计录入产量是否超出计划数校验
			 */
			Map<String,Object> plan_done=new HashMap<String,Object>();
			//查询单种物料的计划和完成数量
			plan_done=this.getBatchPlanDone(map).get(0);
			//int output=Integer.parseInt(condMap.get("quantity").toString());
			int plan_num=(int) plan_done.get("plan_quantity");
			int done_num=new Double((double) plan_done.get("done_quantity")).intValue();
			if(done_num>plan_num){//超出
				/*model.put("success", false);
				model.put("message", "累计生产数量不能超出计划数量！");	
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); //手动开启事务回滚
				break ;*/
				throw new RuntimeException("自制件产量录入：累计生产数量不能超出计划数量！物料：" + map.get("mat_description")) ;
			}	
			
			if(batchArr.indexOf(map.get("batch").toString())==-1){
				batchArr.add(map.get("batch").toString());
			}
		}
		for(String batch:batchArr){
			condMap.put("batch", batch);
			//查询所有物料是否都已生产完成，更新计划状态
			String plan_status=validatePlanStatus(condMap);
			condMap.put("status", plan_status);
			zzjDao.updateZZJPlanStatus(condMap);
		}
		return 0;
	}
	
	public void getElectrophoresisList(Map<String, Object> condMap, ModelMap model){
		List<Map<String, Object>> datalist=zzjDao.queryElectrophoresisList(condMap);
		int totalCount=zzjDao.queryElectrophoresisListCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	@Override
	public int saveElectrophoresis(List<Map<String, Object>> addlist) {
		return zzjDao.saveElectrophoresis(addlist);
	}

	@Override
	public void getMatListMatDesc(Map<String, Object> condMap, ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryMatListMatDesc(condMap);
		model.put("data", datalist);
	}

	@Override
	public int updateElectrophoresis(Map<String, Object> map) {
		return zzjDao.updateElectrophoresis(map);
	}

	@Override
	public int delElectrophoresis(String id) {
		return zzjDao.delElectrophoresis(Integer.parseInt(id));
	}
	@Override
	public void getWorkshopSupplyList(Map<String, Object> condMap,
			ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryWorkshopSupplyList(condMap);
		int totalCount=zzjDao.queryWorkshopSupplyListCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	@Override
	public int saveWorkshopSupply(List<Map<String, Object>> addlist) {
		return zzjDao.saveWorkshopSupply(addlist);
	}

	@Override
	public int updateWorkshopSupply(Map<String, Object> map) {
		return zzjDao.updateWorkshopSupply(map);
	}

	@Override
	public int delWorkshopSupply(String id) {
		return zzjDao.delWorkshopSupply(Integer.parseInt(id));
	}

	@Override
	public void getWorkshopSupplyAddByMap(Map<String, Object> condMap,ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryWorkshopSupplyAddByMap(condMap);
		model.put("data", datalist);
	}	

	@Override
	public void getPmdByMap(Map<String, Object> condMap, ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryPmdByMap(condMap);
		model.put("data", datalist);
	}

	@Override
	public void getPmdDetailByMap(Map<String, Object> condMap, ModelMap model) {
		String type=(String)condMap.get("type");
		List<Map<String, Object>> datalist=null;
		if(type.equals("0")){ // 当前数据
			datalist=zzjDao.queryCurVersionQMDList(condMap);
		}else{ // 变更数据
			datalist=zzjDao.queryPmdDetailByMap(condMap);
		}
		model.put("data", datalist);
	}

	@Override
	public void getElectrophoresisByOrderList(Map<String, Object> condMap,
			ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryElectrophoresisByOrderList(condMap);
		int totalCount=zzjDao.queryElectrophoresisByOrderCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	@Override
	public void getElectrophoresisByBatchList(Map<String, Object> condMap,
			ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryElectrophoresisByBatchList(condMap);
		int totalCount=zzjDao.queryElectrophoresisByBatchCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}

	@Override
	public void getElectrophoresisTotalList(
			Map<String, Object> condMap, ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryElectrophoresisTotalList(condMap);
		model.put("data", datalist);
	}

	@Override
	public int checkElectroEnterQuantity(Map<String, Object> map) {
		return zzjDao.checkElectroEnterQuantity(map);
	}

	@Override
	public void getElectrophoresisUnOuterList(Map<String, Object> condMap,
			ModelMap model) {
		List<Map<String, Object>> datalist=zzjDao.queryElectrophoresisUnOuterList(condMap);
		int totalCount=zzjDao.queryElectrophoresisUnOuterCount(condMap);
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", totalCount);
		model.put("recordsFiltered", totalCount);
		model.put("data", datalist);
	}
    
    /******************* tangjin end ********************/
	
	@Override
	@Transactional
	public int enterMatOutput(Map<String, Object> condMap) {
		try {
			//保存导入的产量信息
			zzjDao.batchSaveOutput(condMap);

			List<Map<String,Object>> output_list =(List<Map<String,Object>>) condMap.get("output_list");
			int i=1;
			for(Map<String,Object> map:output_list){
				map.put("mat_desc", map.get("mat_description"));
				map.put("line", map.get("line_name"));
				map.put("workshop", map.get("workshop_name"));
				/**
				 * added by xjw 增加累计录入产量是否超出计划数校验
				 */
				Map<String,Object> plan_done=new HashMap<String,Object>();
				//查询单种物料的计划和完成数量
				plan_done=this.getBatchPlanDone(map).get(0);
				//int output=Integer.parseInt(condMap.get("quantity").toString());
				int plan_num=(int) plan_done.get("plan_quantity");
				int done_num=new Double((double) plan_done.get("done_quantity")).intValue();
				if(done_num>plan_num){//超出
					/*model.put("success", false);
					model.put("message", "累计生产数量不能超出计划数量！");	
					TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); //手动开启事务回滚
					break ;*/	
					TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); //手动开启事务回滚
					throw new RuntimeException("第"+i+"行数据保存出错：累计生产数量不能超出计划数量！") ;
				}	
				
				/**
				 * 当扫描节点为入库时，判断批次计划是否完成，更新批次计划状态
				 */
				String status="3";
				if(map.get("process").equals("入库")) {
					if(plan_num>done_num){
						status="2";
					}
					map.put("status", status);
					zzjDao.updateZZJPlanStatus(map);
				}
				i++;
			}
		}catch(Exception e) {
			throw new RuntimeException(e.getMessage()) ;
		}
		return 0;
		
		
	}

	@Override
	public void getOutputBatchCountData(Map<String, Object> condMap, ModelMap model) {
		List datalist=new ArrayList();
		datalist=getBatchPlanDone(condMap);
		List<Map<String,Object>> recordlist=new ArrayList<Map<String,Object>>();
		int done_num=0;
		int plan_num=0;
		int i=0;
		Map<String,Object> m_cp=new HashMap<String,Object>(); 
		for(Object o:datalist) {
			Map m=(Map)o;
			int plan_quantity=(int)m.get("plan_quantity");
			int done_quantity=new Double((double) m.get("done_quantity")).intValue();
			if(!m_cp.isEmpty()&&m.get("zzj_type").equals(m_cp.get("zzj_type"))
					&&m.get("batch").equals(m_cp.get("batch"))&&m.get("line_name").equals(m_cp.get("line_name"))) {
				plan_num++;
				if(plan_quantity<=done_quantity) {
					done_num++;				
				}
				recordlist.get(i).put("done_quantity", done_num);
				recordlist.get(i).put("plan_quantity", plan_num);
			}else {
				plan_num=1;
				done_num=0;
				if(plan_quantity<=done_quantity) {
					done_num=1;				
				}
				Map<String,Object> d=new HashMap<String,Object>();
				d.put("order_desc", m.get("order_desc"));
				d.put("line_name", m.get("line_name"));
				d.put("zzj_type", m.get("zzj_type"));
				d.put("batch", m.get("batch"));
				d.put("done_quantity", done_num);
				d.put("plan_quantity", plan_num);
				recordlist.add(d);
				if(m_cp.isEmpty()) {
					i=0;
				}else
					i++;
			}
			/*m_cp.put("zzj_type", m.get("zzj_type"));
			m_cp.put("batch", m.get("batch"));
			m_cp.put("line_name", m.get("line_name"));*/
			m_cp.putAll(m);
		}
		
		
		
		List pagelist=new ArrayList();
		int start=(int) condMap.get("start");
		int length=(int) condMap.get("length");
		int end=start+length;
		if((start+length)>recordlist.size()){
			end=recordlist.size();
		}
		if(recordlist.size()>0){
			pagelist=recordlist.subList(start, end);					
		}
		
		model.put("draw", condMap.get("draw"));
		model.put("recordsTotal", recordlist.size());
		model.put("recordsFiltered", recordlist.size());
		model.put("data", pagelist);
		
	}
	
	
	
}
