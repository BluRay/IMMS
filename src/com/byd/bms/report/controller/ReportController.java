package com.byd.bms.report.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {
	static Logger logger = Logger.getLogger(ReportController.class.getName());
	
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
	@RequestMapping("/factoryOutputYear")
	@ResponseBody
	public ModelMap getFactoryOutputYearData(){
		model.clear();
		
		return model;
	}
}
