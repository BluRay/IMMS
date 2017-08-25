package com.byd.bms.report.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.report.service.IReportService;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {
	static Logger logger = Logger.getLogger(ReportController.class.getName());
	@Autowired
	private IReportService reportService;
	
	/************************* xjw start *****************************/
	/**
	 * 工厂年度产量
	 * @return
	 */
	@RequestMapping("/factoryOutputYear")
	public ModelAndView factoryOutputYear(){
		mv.setViewName("report/factoryOutputYear");
		return mv;
	}
	
	@RequestMapping("/factoryOutputReport")
	public ModelAndView factoryOutputReport(){
		mv.setViewName("report/factoryOutputReport");
		return mv;
	}
	
	/**
	 * 工厂年度产量报表数据查询
	 * @return
	 */
	@RequestMapping("/getFactoryOutputYearData")
	@ResponseBody
	public ModelMap getFactoryOutputYearData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		model.put("straw", request.getParameter("straw"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("year", request.getParameter("year"));
		
		reportService.getFactoryOutputYear(condMap, model);
		
		return model;
	}
	
	/**
	 * 工厂月计划达成
	 * @return
	 */
	@RequestMapping("/factoryPlanRate")
	public ModelAndView factoryPlanRate(){
		mv.setViewName("report/factoryPlanRate");
		return mv;
	}
	
	/**
	 * 工厂年度产量报表数据查询
	 * @return
	 */
	@RequestMapping("/getFactoryPlanRateData")
	@ResponseBody
	public ModelMap getFactoryPlanRateData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		model.put("straw", request.getParameter("straw"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("factory_name", request.getParameter("factory_name"));
		condMap.put("month", request.getParameter("month"));
		
		reportService.getFactoryPlanRateData(condMap, model);
		
		return model;
	}
	
	/************************* xjw end *****************************/
	
	/**
	 * 焊装、底盘上下线完成情况
	 * @return
	 */
	@RequestMapping("/onlineAndOfflineReport")
	public ModelAndView onlineAndOfflineReport(){
		mv.setViewName("report/onlineAndOfflineReport");
		return mv;
	}
	@RequestMapping("/getOnlineAndOfflineData")
	@ResponseBody
	public ModelMap getOnlineAndOfflineData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String plan_date=request.getParameter("reportDate");
		condMap.put("plan_date", plan_date);
		reportService.getOnlineAndOfflineData(condMap, model);
		
		return model;
	}
	
	@RequestMapping("/showFactoryOutputReportData")
	@ResponseBody
	public ModelMap showFactoryOutputReportData(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("date_array", request.getParameter("date_array"));
		conditionMap.put("factory_id", request.getParameter("factory_id"));
		
		List<Map<String, Object>> datalist  = reportService.showFactoryOutputReportData(conditionMap);		
		Map<String,Object> list = new HashMap<String,Object>();
		list.put("rows", datalist);
		list.put("total", 0);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}

}
