package com.byd.bms.plan.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Resource;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.plan.dao.IPlanDao;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.model.PlanPause;
import com.byd.bms.plan.model.PlanProductionPlan;
import com.byd.bms.plan.model.PlanBus;
import com.byd.bms.plan.model.PlanBusNumber;
import com.byd.bms.plan.model.PlanConfigIssedQty;
import com.byd.bms.plan.model.PlanIssuance;
import com.byd.bms.plan.model.PlanIssuanceCount;
import com.byd.bms.plan.model.PlanIssuanceTotal;
import com.byd.bms.plan.model.PlanMasterIndex;
import com.byd.bms.plan.service.IPlanService;
import com.byd.bms.production.model.ProductionException;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.model.BmsBaseOperateChangeLog;

@Service
public class PlanServiceImpl implements IPlanService {
	static Logger logger = Logger.getLogger("PLAN");
	@Resource(name="planDao")
	private IPlanDao planDao;
	
	@Override
	public String checkImportPlanFactory(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public int savePlanMaster(ExcelModel excelModel,String userid) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dd = new Date();
		String curTime = df.format(dd);
		int lineCount = excelModel.getData().size();
		int result = 0;
		String order_no = "";		//订单编号 同一个文件只能导入一个订单
		String factory_name = "";
		String plan_month = "";
		for(int i=0;i<lineCount;i++){
			if (i==0){
				order_no = excelModel.getData().get(i)[0].toString().trim();
				factory_name = excelModel.getData().get(i)[1].toString().trim();
				plan_month = excelModel.getData().get(i)[3].toString().trim();
			}
			PlanMasterPlan newMasterPlan = new PlanMasterPlan();
			newMasterPlan.setVersion(new SimpleDateFormat("yyyyMMddHHmmss").format(dd));
			newMasterPlan.setOrder_no(order_no);
			newMasterPlan.setFactory_name(factory_name);
			newMasterPlan.setPlan_code_keyname(excelModel.getData().get(i)[2].toString().trim());
			newMasterPlan.setPlan_month(plan_month);
			newMasterPlan.setFlag("0");
			if (!excelModel.getData().get(i)[4].toString().trim().equals("")) newMasterPlan.setD1(Integer.parseInt(excelModel.getData().get(i)[4].toString().trim()));
			if (!excelModel.getData().get(i)[5].toString().trim().equals("")) newMasterPlan.setD2(Integer.parseInt(excelModel.getData().get(i)[5].toString().trim()));
			if (!excelModel.getData().get(i)[6].toString().trim().equals("")) newMasterPlan.setD3(Integer.parseInt(excelModel.getData().get(i)[6].toString().trim()));
			if (!excelModel.getData().get(i)[7].toString().trim().equals("")) newMasterPlan.setD4(Integer.parseInt(excelModel.getData().get(i)[7].toString().trim()));
			if (!excelModel.getData().get(i)[8].toString().trim().equals("")) newMasterPlan.setD5(Integer.parseInt(excelModel.getData().get(i)[8].toString().trim()));
			if (!excelModel.getData().get(i)[9].toString().trim().equals("")) newMasterPlan.setD6(Integer.parseInt(excelModel.getData().get(i)[9].toString().trim()));
			if (!excelModel.getData().get(i)[10].toString().trim().equals("")) newMasterPlan.setD7(Integer.parseInt(excelModel.getData().get(i)[10].toString().trim()));
			if (!excelModel.getData().get(i)[11].toString().trim().equals("")) newMasterPlan.setD8(Integer.parseInt(excelModel.getData().get(i)[11].toString().trim()));
			if (!excelModel.getData().get(i)[12].toString().trim().equals("")) newMasterPlan.setD9(Integer.parseInt(excelModel.getData().get(i)[12].toString().trim()));
			if (!excelModel.getData().get(i)[13].toString().trim().equals("")) newMasterPlan.setD10(Integer.parseInt(excelModel.getData().get(i)[13].toString().trim()));

			if (!excelModel.getData().get(i)[14].toString().trim().equals("")) newMasterPlan.setD11(Integer.parseInt(excelModel.getData().get(i)[14].toString().trim()));
			if (!excelModel.getData().get(i)[15].toString().trim().equals("")) newMasterPlan.setD12(Integer.parseInt(excelModel.getData().get(i)[15].toString().trim()));
			if (!excelModel.getData().get(i)[16].toString().trim().equals("")) newMasterPlan.setD13(Integer.parseInt(excelModel.getData().get(i)[16].toString().trim()));
			if (!excelModel.getData().get(i)[17].toString().trim().equals("")) newMasterPlan.setD14(Integer.parseInt(excelModel.getData().get(i)[17].toString().trim()));
			if (!excelModel.getData().get(i)[18].toString().trim().equals("")) newMasterPlan.setD15(Integer.parseInt(excelModel.getData().get(i)[18].toString().trim()));
			if (!excelModel.getData().get(i)[19].toString().trim().equals("")) newMasterPlan.setD16(Integer.parseInt(excelModel.getData().get(i)[19].toString().trim()));
			if (!excelModel.getData().get(i)[20].toString().trim().equals("")) newMasterPlan.setD17(Integer.parseInt(excelModel.getData().get(i)[20].toString().trim()));
			if (!excelModel.getData().get(i)[21].toString().trim().equals("")) newMasterPlan.setD18(Integer.parseInt(excelModel.getData().get(i)[21].toString().trim()));
			if (!excelModel.getData().get(i)[22].toString().trim().equals("")) newMasterPlan.setD19(Integer.parseInt(excelModel.getData().get(i)[22].toString().trim()));
			if (!excelModel.getData().get(i)[23].toString().trim().equals("")) newMasterPlan.setD20(Integer.parseInt(excelModel.getData().get(i)[23].toString().trim()));

			if (!excelModel.getData().get(i)[24].toString().trim().equals("")) newMasterPlan.setD21(Integer.parseInt(excelModel.getData().get(i)[24].toString().trim()));
			if (!excelModel.getData().get(i)[25].toString().trim().equals("")) newMasterPlan.setD22(Integer.parseInt(excelModel.getData().get(i)[25].toString().trim()));
			if (!excelModel.getData().get(i)[26].toString().trim().equals("")) newMasterPlan.setD23(Integer.parseInt(excelModel.getData().get(i)[26].toString().trim()));
			if (!excelModel.getData().get(i)[27].toString().trim().equals("")) newMasterPlan.setD24(Integer.parseInt(excelModel.getData().get(i)[27].toString().trim()));
			if (!excelModel.getData().get(i)[28].toString().trim().equals("")) newMasterPlan.setD25(Integer.parseInt(excelModel.getData().get(i)[28].toString().trim()));
			if (!excelModel.getData().get(i)[29].toString().trim().equals("")) newMasterPlan.setD26(Integer.parseInt(excelModel.getData().get(i)[29].toString().trim()));
			if (!excelModel.getData().get(i)[30].toString().trim().equals("")) newMasterPlan.setD27(Integer.parseInt(excelModel.getData().get(i)[30].toString().trim()));
			if (!excelModel.getData().get(i)[31].toString().trim().equals("")) newMasterPlan.setD28(Integer.parseInt(excelModel.getData().get(i)[31].toString().trim()));
			if (!excelModel.getData().get(i)[32].toString().trim().equals("")) newMasterPlan.setD29(Integer.parseInt(excelModel.getData().get(i)[32].toString().trim()));
			if (!excelModel.getData().get(i)[33].toString().trim().equals("")) newMasterPlan.setD30(Integer.parseInt(excelModel.getData().get(i)[33].toString().trim()));

			if (!excelModel.getData().get(i)[34].toString().trim().equals("")) newMasterPlan.setD31(Integer.parseInt(excelModel.getData().get(i)[34].toString().trim()));
			newMasterPlan.setCreator_id(Integer.parseInt(userid));
			newMasterPlan.setCreate_date(curTime);
			
			result += planDao.insertPlanMaster(newMasterPlan);
		}		
		return result;
	}

	@Override
	public Map<String, Object> getPlanMasterIndex(Map<String, Object> queryMap) {
		int totalCount=0;
		List<PlanMasterIndex> datalist = planDao.getPlanMasterIndex(queryMap);
		totalCount = 0;
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public List<PlanMasterPlan> showPlanMasterList(Map<String, Object> queryMap) {
		List<PlanMasterPlan> datalist = planDao.getPlanMasterList(queryMap);
		return datalist;
	}

	@Override
	public List<Map<String, String>> getPlanIssed(Map<String, Object> queryMap) {
		List<Map<String,String>> datalist = planDao.getPlanIssed(queryMap);
		return datalist;
	}

	@Override
	@Transactional
	public int reVisionPlan(String factory_id, String order_no, String revision_str, String plan_month,String userId) {
		List<PlanMasterPlan> datalist=new ArrayList<PlanMasterPlan>();
		//复制指定工厂ID指定订单编号 最新版本 最大flag 的计划，保存flag+1
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("version", "");
		conditionMap.put("factory_id", factory_id);
		conditionMap.put("order_no", order_no);
		conditionMap.put("plan_month", plan_month);
		datalist=planDao.getPlanMasterList(conditionMap);
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatTime = df2.format(new Date());
		for(int i=0;i<datalist.size();i++){
			PlanMasterPlan copyPlanMasterPlan = (PlanMasterPlan) datalist.get(i);
			copyPlanMasterPlan.setFlag(String.valueOf(Integer.parseInt(copyPlanMasterPlan.getFlag())+1));
			copyPlanMasterPlan.setCreate_date(creatTime);
			
			planDao.insertMasterPlan(copyPlanMasterPlan);
			//更新 新增的 id 到list
			datalist.set(i, copyPlanMasterPlan);
		}
		//根据revision_str 更新计划信息  11,3,0,201507,1,8,0; [order_id,factory,i,month,day,num,old_num]
		if (revision_str.length()>0){
			String[] revisionStrArray=revision_str.split(";");
			for(int i = 0; i < revisionStrArray.length; i++){
				String[] revisionArray = revisionStrArray[i].split(",");
				PlanMasterPlan editPlanMasterPlan = (PlanMasterPlan) datalist.get(Integer.parseInt(revisionArray[2]));
				//revisionArray[6] = String.valueOf(editPlanMasterPlan.getD1()); //原值
				switch(Integer.parseInt(revisionArray[4])){
				case 1:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD1());editPlanMasterPlan.setD1(Integer.parseInt(revisionArray[5]));break;
				case 2:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD2());editPlanMasterPlan.setD2(Integer.parseInt(revisionArray[5]));break;
				case 3:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD3());editPlanMasterPlan.setD3(Integer.parseInt(revisionArray[5]));break;
				case 4:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD4());editPlanMasterPlan.setD4(Integer.parseInt(revisionArray[5]));break;
				case 5:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD5());editPlanMasterPlan.setD5(Integer.parseInt(revisionArray[5]));break;
				case 6:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD6());editPlanMasterPlan.setD6(Integer.parseInt(revisionArray[5]));break;
				case 7:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD7());editPlanMasterPlan.setD7(Integer.parseInt(revisionArray[5]));break;
				case 8:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD8());editPlanMasterPlan.setD8(Integer.parseInt(revisionArray[5]));break;
				case 9:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD9());editPlanMasterPlan.setD9(Integer.parseInt(revisionArray[5]));break;
				case 10:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD10());editPlanMasterPlan.setD10(Integer.parseInt(revisionArray[5]));break;

				case 11:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD11());editPlanMasterPlan.setD11(Integer.parseInt(revisionArray[5]));break;
				case 12:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD12());editPlanMasterPlan.setD12(Integer.parseInt(revisionArray[5]));break;
				case 13:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD13());editPlanMasterPlan.setD13(Integer.parseInt(revisionArray[5]));break;
				case 14:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD14());editPlanMasterPlan.setD14(Integer.parseInt(revisionArray[5]));break;
				case 15:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD15());editPlanMasterPlan.setD15(Integer.parseInt(revisionArray[5]));break;
				case 16:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD16());editPlanMasterPlan.setD16(Integer.parseInt(revisionArray[5]));break;
				case 17:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD17());editPlanMasterPlan.setD17(Integer.parseInt(revisionArray[5]));break;
				case 18:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD18());editPlanMasterPlan.setD18(Integer.parseInt(revisionArray[5]));break;
				case 19:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD19());editPlanMasterPlan.setD19(Integer.parseInt(revisionArray[5]));break;
				case 20:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD20());editPlanMasterPlan.setD20(Integer.parseInt(revisionArray[5]));break;

				case 21:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD21());editPlanMasterPlan.setD21(Integer.parseInt(revisionArray[5]));break;
				case 22:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD22());editPlanMasterPlan.setD22(Integer.parseInt(revisionArray[5]));break;
				case 23:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD23());editPlanMasterPlan.setD23(Integer.parseInt(revisionArray[5]));break;
				case 24:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD24());editPlanMasterPlan.setD24(Integer.parseInt(revisionArray[5]));break;
				case 25:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD25());editPlanMasterPlan.setD25(Integer.parseInt(revisionArray[5]));break;
				case 26:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD26());editPlanMasterPlan.setD26(Integer.parseInt(revisionArray[5]));break;
				case 27:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD27());editPlanMasterPlan.setD27(Integer.parseInt(revisionArray[5]));break;
				case 28:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD28());editPlanMasterPlan.setD28(Integer.parseInt(revisionArray[5]));break;
				case 29:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD29());editPlanMasterPlan.setD29(Integer.parseInt(revisionArray[5]));break;
				case 30:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD30());editPlanMasterPlan.setD30(Integer.parseInt(revisionArray[5]));break;
				case 31:revisionArray[6] = String.valueOf(editPlanMasterPlan.getD31());editPlanMasterPlan.setD31(Integer.parseInt(revisionArray[5]));break;
				
				}
				planDao.updatePlanMasterInfo(editPlanMasterPlan);
				//根据revision_str 更新日志表 operate_change_type_id = 63 table_name = BMS_PLAN_MASTER_PLAN
				BmsBaseOperateChangeLog changLog = new BmsBaseOperateChangeLog();
				changLog.setOperate_change_type_id(63);
				changLog.setTable_name("BMS_PLAN_MASTER_PLAN");
				changLog.setField_id(editPlanMasterPlan.getId());
				changLog.setField_name("D" + revisionArray[4]);
				changLog.setOld_value(revisionArray[6]);
				changLog.setNew_value(revisionArray[5]);
				changLog.setChanger_id(Integer.valueOf(userId));
				changLog.setChange_date(creatTime);
				planDao.insertOperateChangeLog(changLog);
			}
		}
		
		return 0;
	}

	@Override
	public List<Map<String, String>> checkPlanIssuanceList(Map<String, Object> queryMap) {
		List<Map<String, String>> checkdatalist=new ArrayList<Map<String, String>>();
		checkdatalist = planDao.checkPlanIssuanceList(queryMap);
		return checkdatalist;
	}

	@Override
	public List<PlanIssuance> getPlanIssuanceList(Map<String, Object> queryMap) {
		return planDao.getPlanIssuanceList(queryMap);
	}

	@Override
	public List<PlanIssuanceTotal> getPlanIssuanceTotal(Map<String, Object> queryMap) {
		return planDao.getPlanIssuanceTotal(queryMap);
	}

	@Override
	public List<PlanProductionPlan> getProductionPlanIssuanceList(Map<String, Object> queryMap) {
		return planDao.getProductionPlanIssuanceList(queryMap);
	}

	@Override
	public List<PlanIssuanceCount> getPlanIssuanceCount(Map<String, Object> queryMap) {
		return planDao.getPlanIssuanceCount(queryMap);
	}

	@Override
	public int getPlanConfigQty(int order_config_id) {
		return planDao.getPlanConfigQty(order_config_id);
	}

	@Override
	public List<PlanConfigIssedQty> getPlanConfigIssedQty(Map<String, Object> queryMap) {
		return planDao.getPlanConfigIssedQty(queryMap);
	}

	@Override
	@Transactional
	public int issuancePlanSubmit(String curTime, String edit_user, String issuance_date, int factory_id, String issuance_str) {
		String[] issuanceStrArray=issuance_str.split(";");
		int plan_code_value[]={0,1,2,3,4,5,6,7,8,9,10,11,12};
		//当前车号的生成规则是通过SQL自动产生，产生规则见planDao::insertPlanBusNumber		
		int bus_count = 0;				//【BMS_FACTORY_ORDER】 已发布数计数
		for(int i = 0; i < issuanceStrArray.length; i++){
			String[] issuanceArray = issuanceStrArray[i].split(",");
			String order_id = planDao.getOrderIdByConfigId(issuanceArray[0].substring(0, issuanceArray[0].length()-1));
			BmsOrder order_info = planDao.getOrderInfoByOrderID(order_id);
			String order_no = order_info.getOrder_no();
			String bus_type = order_info.getBus_type();
			String order_code = order_info.getOrder_code();
			String year = order_info.getProductive_year();
			String order_type = order_info.getOrder_type();		//订单类型，KD件不产生车号
			for(int j=1;j<issuanceArray.length;j++){
				if (Integer.valueOf(issuanceArray[j])>0){
					PlanProductionPlan productionPlan = new PlanProductionPlan();
					productionPlan.setOrder_no(order_no);
					productionPlan.setFactory_id(factory_id);
					productionPlan.setPlan_code_value(plan_code_value[j]);
					productionPlan.setPlan_date(issuance_date);
					productionPlan.setOrder_config_id(Integer.valueOf(issuanceArray[0].substring(0, issuanceArray[0].length()-1)));
					productionPlan.setPlan_qty(Integer.valueOf(issuanceArray[j]));
					productionPlan.setCreator_id(Integer.valueOf(edit_user));
					productionPlan.setCreat_date(curTime);				
					int production_plan_id = 0;
					planDao.insertPlanIssuance(productionPlan);
					production_plan_id = productionPlan.getId();
					//焊装上线节点 开始生成车号
					if(plan_code_value[j]==4){
						if(order_type.equals("KD件")){
							//logger.info("---->当前订单为KD件，不产生车号");
						}else{
							int busPlanQty=Integer.valueOf(issuanceArray[j]);	//发布数量
							for (int n=0;n<busPlanQty;n++){//START循环生成车号
								//查询当前订单 当前工厂  【BMS_FACTORY_ORDER_DETAIL】
								Map<String,Object> orderDetailMap=new HashMap<String,Object>();
								orderDetailMap.put("factory_id", factory_id);
								orderDetailMap.put("order_no", order_no);
								List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
								datalist = planDao.getFactoryOrderDetail(orderDetailMap);
								//List<Map<String,Object>> busNo_generatelist=new ArrayList<Map<String,Object>>();
								/**
							 	* 查询该工厂订单下的车号流水最小值，判断最小值是否超出流水范围，未超出则用最小值减一生成车号，超出则查找该工厂订单下车号流水的最大值，判断最大值
							 	* 是否超出流水范围，未超出用最大值加一生成车号，超出则不生成车号；
							 	*/
								Integer cur_bus_number=null;//当前产生车号准备使用的流水号
								int factory_order_id = 0;
								/**
								 * 当最小车号流水为0代表该工厂订单还未生成车号，则使用起始流水号开始生成车号；
								 * 当最小车号流水不为0，且最小车号流水大于起始流水号，则使用最小车号流水-1生成车号
								 * 当最小车号流水等于起始流水车号，判断最大车号流水是否小于结束流水号，是：用最大车号流水+1生成车号；
								 * 当最小车号流水等于起始流水车号，且最大车号流水等于结束流水号，则需要判断该工厂订单是否存在其他流水段，存在再重复该循环，
								 * 直到找到合适流水号，未找到则表明所有车号均已产生
								 */
								for(int k=0;k<datalist.size();k++){
									Map<String, Object> result = new HashMap<String,Object>();
									result = (Map<String, Object>) datalist.get(k);
									Long max=(Long)result.get("maxbusnum") ;
									Long min=(Long)result.get("minbusnum");
									int maxbusnum=max.intValue();
									int minbusnum=min.intValue();
									int busnum_start=Integer.parseInt(result.get("busnum_start").toString());
									int busnum_end=Integer.parseInt(result.get("busnum_end").toString());
									factory_order_id=Integer.parseInt(result.get("id").toString());
									if(minbusnum>busnum_start){//该段流水前段有剩余流水号，minbusnum-1接着生成
										cur_bus_number=minbusnum-1;
										break;
									}else if(maxbusnum<busnum_end&&minbusnum!=0&&maxbusnum!=0){//该段流水后段有剩余流水号，maxbusnum+1接着生成
										cur_bus_number=maxbusnum+1;
										break;
									}else if(minbusnum==0&&maxbusnum==0){//该段流水未产生车号
										cur_bus_number=busnum_start;
										break;
									}
								}
								//logger.info("---->当前车号为:" + cur_bus_number);
								if(cur_bus_number!=null){//当找到了合适的流水号时，产生车号，否则代表已全部生成完
									PlanBusNumber busNumber = new PlanBusNumber();
									busNumber.setCreator_id(Integer.valueOf(edit_user));
									busNumber.setPrint_sign("0");
									busNumber.setCreat_date(curTime);
									busNumber.setNum(cur_bus_number);
									busNumber.setBus_code(bus_type);
									busNumber.setOrder_code(order_code);
									busNumber.setYear(year);
									int busNumberId = planDao.insertPlanBusNumber(busNumber);
									logger.info("---->busNumberId = " + busNumberId + "=" + busNumber.getId());
									PlanBus bus = new PlanBus();
									bus.setBus_number_id(busNumber.getId());
									bus.setFactory_id(factory_id);
									bus.setStatus("0");
									bus.setOrder_no(order_no);
									bus.setOrder_config_id(Integer.valueOf(issuanceArray[0].substring(0, issuanceArray[0].length()-1)));
									bus.setSequence(i+1);
									bus.setProduction_plan_id(production_plan_id);
									bus.setFactory_order_id(factory_order_id);
									planDao.insertPlanBus(bus);
									//更新工厂已发布数:已发布数+1
									planDao.updateFactoryOrder(factory_order_id);
									bus_count++;
								}
							}//END循环生成车号
						}
					}
				}
			}
		}
		return bus_count;
	}

	@Override
	@Transactional
	public int addPause(List<PlanPause> pauseList) {
		int result = 0;
		for(PlanPause pause:pauseList) {
			result += planDao.addPause(pause);
		}
		return result;
	}

	@Override
	public Map<String,Object> getPauseList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<PlanPause> datalist = planDao.getPauseList(queryMap);
		totalCount = planDao.getPauseTotalCount(queryMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("draw", queryMap.get("draw"));
		result.put("recordsTotal", totalCount);
		result.put("recordsFiltered", totalCount);
		result.put("data", datalist);
		return result;
	}

	@Override
	public int updatePauseInfo(PlanPause pause) {
		return planDao.updatePauseInfo(pause);
	}

	@Override
	public Map<String, Object> getExceptionList(Map<String, Object> queryMap) {
		int totalCount=0;
		List<ProductionException> datalist = planDao.getExceptionList(queryMap);
		totalCount = planDao.getExceptionCount(queryMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("total", totalCount);
		result.put("rows", datalist);
		return result;
	}

	@Override
	public int updateExceptionInfo(ProductionException exception) {
		return planDao.updateExceptionInfo(exception);
	}
	
	

}
