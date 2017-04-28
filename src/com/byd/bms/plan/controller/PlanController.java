package com.byd.bms.plan.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.byd.bms.util.controller.BaseController;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.plan.model.PlanIssuance;
import com.byd.bms.plan.model.PlanIssuanceTotal;
import com.byd.bms.plan.model.PlanMasterPlan;
import com.byd.bms.plan.service.IPlanService;
import com.byd.bms.util.ExcelModel;

@Controller
@RequestMapping("/plan")
public class PlanController extends BaseController{
	static Logger logger = Logger.getLogger("PLAN");
	@Autowired
	protected IPlanService planService;
	
	@RequestMapping("/importMaster")
	public ModelAndView importMaster(){ 		//总计划导入
		mv.setViewName("plan/importMaster");
        return mv;  
    }
	
	@RequestMapping("/planPreview")
	public ModelAndView planPreview(){ 			//总计划详情
		mv.setViewName("plan/planPreview");
        return mv;  
    }
	
	@RequestMapping("/planRevision")
	public ModelAndView planRevision(){ 		//计划调整
		mv.setViewName("plan/planRevision");
        return mv;  
    }
	
	@RequestMapping("/planIssuance")
	public ModelAndView planIssuance(){ 		//计划发布
		mv.setViewName("plan/planIssuance");
        return mv;  
    }
	
	@RequestMapping(value="/uploadMasterPlan",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadMasterPlan(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("---->uploadMasterPlan");
		String fileFileName = "masterPlan.xls";
		int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("5", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("6", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("7", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("8", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("9", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("10", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("11", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("12", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("13", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("14", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("15", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("16", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("17", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("18", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("19", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("20", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("21", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("22", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("23", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("24", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("25", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("26", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("27", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("28", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("29", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("30", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("31", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("32", ExcelModel.CELL_TYPE_NUMERIC);dataType.put("33", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("34", ExcelModel.CELL_TYPE_NUMERIC);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);

        File planFile = new File(fileFileName);
		
		/**
		 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
		 */
		try {
			file.transferTo(planFile);
			InputStream is = new FileInputStream(planFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			//数据校验/
			int lineCount = excelModel.getData().size();
			//上传的文件行数验证
			if(((lineCount)%12) != 0){
				initModel(false,"导入文件的行数有误！",null);
				model = mv.getModelMap();
				return model;
			}
			for(int i=0;i<lineCount;i++){
				String plan_no = "";		//订单编号 同一个文件只能导入一个订单
				String factory_name = "";
				//String plan_date = "";
				if (i==0){
					plan_no = excelModel.getData().get(i)[0].toString().trim();
					factory_name = excelModel.getData().get(i)[1].toString().trim();
					//plan_date = excelModel.getData().get(i)[2].toString().trim();
				}
				//判断上传计划的工厂是否属于这些订单
				Map<String,Object> importPlanMap=new HashMap<String,Object>();
				importPlanMap.put("order_no", plan_no);
				importPlanMap.put("factory_name", factory_name);
				//TODO
				/**
				String factory_order_id = planDao.checkImportPlanFactory(importPlanMap);
				if (factory_order_id == null){
					out.print(plan_no + " 订单没有 "+factory_name+"的计划，不能上传！<a href=\"javascript:history.back();\">返回</a>");
					return null;
				}**/
				
				String node = excelModel.getData().get(i)[2].toString().trim();
				int lineCountSwitch = i % 12;
				switch(lineCountSwitch){
					case 0 : if(!node.equals("自制件下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 1 : if(!node.equals("部件上线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 2 : if(!node.equals("部件下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 3 : if(!node.equals("焊装上线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 4 : if(!node.equals("焊装下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 5 : if(!node.equals("涂装上线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 6 : if(!node.equals("涂装下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 7 : if(!node.equals("底盘上线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 8 : if(!node.equals("底盘下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 9 : if(!node.equals("总装上线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 10 : if(!node.equals("总装下线")){throw new RuntimeException("导入文件的格式有误！");}break; 
					case 11 : if(!node.equals("入库")){throw new RuntimeException("导入文件的格式有误！");}break; 
				}
			}
			//上传的文件验证完成
			String userid=request.getSession().getAttribute("user_name") + "";;
			result = planService.savePlanMaster(excelModel,userid);			
			
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		
		initModel(true,"导入成功！",result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/showPlanMasterList")
	@ResponseBody
	public ModelMap showPlanMasterList(){
		String version=request.getParameter("version");
		String factory_id=request.getParameter("factory_id");
		String order_no=request.getParameter("order_no");
		String plan_month = request.getParameter("plan_month");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("version") != null) conditionMap.put("version", version);
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", factory_id);
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", order_no);
		if (request.getParameter("plan_month") != null) conditionMap.put("plan_month", plan_month);
		
		List<PlanMasterPlan> datalist = planService.showPlanMasterList(conditionMap);
		initModel(true,"success",datalist);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getPlanIssed")
	@ResponseBody
	public ModelMap getPlanIssed(){
		String factory_id=request.getParameter("factory_id");
		String order_no=request.getParameter("order_no");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", factory_id);
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", order_no);
		
		List<Map<String,String>> datalist = planService.getPlanIssed(conditionMap);
		initModel(true,"success",datalist);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/reVisionPlan")
	@ResponseBody
	public ModelMap reVisionPlan(){
		String factory_id = request.getParameter("factory_id");
		String order_no = request.getParameter("order_no");
		String revision_str = request.getParameter("revision_str");
		String plan_month = request.getParameter("plan_month");
		String edit_user = request.getSession().getAttribute("user_id") + "";
		int result = planService.reVisionPlan(factory_id, order_no, revision_str, plan_month,edit_user);		
		
		
		initModel(true,"success",result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/showPlanMasterIndex")
	@ResponseBody
	public ModelMap showPlanMasterIndex(){
		String factory_id=request.getParameter("factory_id");
		String order_no=request.getParameter("order_no");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("factory_id", factory_id);
		condMap.put("order_no", order_no);
		
		Map<String,Object> result = planService.getPlanMasterIndex(condMap);
		model.addAllAttributes(result);
		return model;
	}
	
	@RequestMapping("/getIssuancePlan")
	@ResponseBody
	public ModelMap getIssuancePlan(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("issuance_date") != null) conditionMap.put("issuance_date", request.getParameter("issuance_date"));
		conditionMap.put("day",Integer.valueOf(request.getParameter("issuance_date").substring(6, 8)));		
		conditionMap.put("issuance_month",request.getParameter("issuance_date").substring(0, 6));	
		if (request.getParameter("factory_id") != null) conditionMap.put("factory_id", request.getParameter("factory_id"));
		if (request.getParameter("order_no") != null) conditionMap.put("order_no", request.getParameter("order_no"));

		//判断发布订单是否已经发布到工厂
		String msg = "查询成功";
		List<Map<String,String>> checkdatalist=new ArrayList<Map<String, String>>();
		checkdatalist = planService.checkPlanIssuanceList(conditionMap);
		if (checkdatalist.size() == 0){
			msg = "当前没有可发布的计划";
		}else{
			for(int i=0;i<checkdatalist.size(); i++){
				Map<String,String> cerMap = (Map<String, String>) checkdatalist.get(i);
				if(cerMap.get("product_qty") == null){
					msg = cerMap.get("order_no") + "没有发布工厂配置！";
				}
			}
		}
		
		List datalist=new ArrayList();
		List<PlanIssuance> resultlist=new ArrayList<PlanIssuance>();
		datalist = planService.getPlanIssuanceList(conditionMap);
		int cur_order_id = 0;
		List total_datalist=new ArrayList();
		int issed_count_1 = 0;int issed_count_2 = 0;int issed_count_3 = 0;int issed_count_4 = 0;
		int issed_count_5 = 0;int issed_count_6 = 0;int issed_count_7 = 0;int issed_count_8 = 0;
		int issed_count_9 = 0;int issed_count_10 = 0;int issed_count_11 = 0;int issed_count_12 = 0;
		for(int i=0;i<datalist.size(); i++){
			PlanIssuance cur_planIssuance = (PlanIssuance)datalist.get(i);
			int this_order_id = cur_planIssuance.getOrder_id();
			if(cur_order_id == 0 || cur_order_id != this_order_id){
				PlanIssuance newIssuance = new PlanIssuance();
				newIssuance.setOrder_config_name(cur_planIssuance.getOrder_no() + "总数");
				Map<String,Object> conditionMap2=new HashMap<String,Object>();				
				conditionMap2.put("day",Integer.valueOf(request.getParameter("issuance_date").substring(6, 8)));		
				conditionMap2.put("month",request.getParameter("issuance_date").substring(0, 6));		
				conditionMap2.put("factory_id", request.getParameter("factory_id"));
				conditionMap2.put("order_id",this_order_id);
				total_datalist = planService.getPlanIssuanceTotal(conditionMap2);
				//判断当前订单是否有调整后的计划
				if(total_datalist.size() != 0){
					newIssuance.setPlan_code_1(((PlanIssuanceTotal)total_datalist.get(0)).getNum());
					newIssuance.setPlan_code_2(((PlanIssuanceTotal)total_datalist.get(1)).getNum());
					newIssuance.setPlan_code_3(((PlanIssuanceTotal)total_datalist.get(2)).getNum());
					newIssuance.setPlan_code_4(((PlanIssuanceTotal)total_datalist.get(3)).getNum());
					newIssuance.setPlan_code_5(((PlanIssuanceTotal)total_datalist.get(4)).getNum());
					newIssuance.setPlan_code_6(((PlanIssuanceTotal)total_datalist.get(5)).getNum());
					newIssuance.setPlan_code_7(((PlanIssuanceTotal)total_datalist.get(6)).getNum());
					newIssuance.setPlan_code_8(((PlanIssuanceTotal)total_datalist.get(7)).getNum());
					newIssuance.setPlan_code_9(((PlanIssuanceTotal)total_datalist.get(8)).getNum());
					newIssuance.setPlan_code_10(((PlanIssuanceTotal)total_datalist.get(9)).getNum());
					newIssuance.setPlan_code_11(((PlanIssuanceTotal)total_datalist.get(10)).getNum());
					newIssuance.setPlan_code_12(((PlanIssuanceTotal)total_datalist.get(11)).getNum());
				}
				issed_count_1 = 0;issed_count_2 = 0;issed_count_3 = 0;issed_count_4 = 0;
				issed_count_5 = 0;issed_count_6 = 0;issed_count_7 = 0;issed_count_8 = 0;
				issed_count_9 = 0;issed_count_10 = 0;issed_count_11 = 0;issed_count_12 = 0;
				resultlist.add(newIssuance);
			}
			cur_order_id = cur_planIssuance.getOrder_id();
			//计算配置发布数的推荐值  获取当前配置的总计划数及已发布数量
			PlanIssuance planIssuance = (PlanIssuance)datalist.get(i);
			
			//STEP 01 判断planIssuance的生产节点是否已经发布
			//planIssuance.setPlan_code_issed_20_done();
			
			//STEP 02 查询已分配数 planIssuance.setPlan_code_issed_X
			
			//STEP 03 获取当前工厂  当前配置  当前月份  总计划数  及 已发布数之和 planIssuance.setPlan_config_qty_X_done
			
			//STEP 04 推荐发布值 根据 当前配置总计划数 - 当前配置已发布部 < 当天计划数 
			
			//STEP 05 resultlist.add(planIssuance);
		}
		
		
		model = mv.getModelMap();
		return model;
	}
	

}
