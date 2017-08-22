package com.byd.bms.report.controller;

import java.util.HashMap;
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
	/**
	 * 工厂年度产量
	 * @return
	 */
	@RequestMapping("/factoryOutputYear")
	public ModelAndView factoryOutputYear(){
		mv.setViewName("report/factoryOutputYear");
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
}
