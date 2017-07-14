package com.byd.bms.hr.controller;

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
import org.springframework.web.servlet.ModelAndView;


import com.byd.bms.hr.service.IHrBaseDataService;
import com.byd.bms.util.controller.BaseController;
/**
 * HR基础数据Controller
 * @author tangjin 2017-07-12
 */ 
@Controller
@RequestMapping("/hrBaseData")
public class HrBaseDataController extends BaseController {

	static Logger logger = Logger.getLogger("HR");
	@Autowired
	protected IHrBaseDataService hrBaseDataService;
	//组织架构
	@RequestMapping("/orgData")
	public ModelAndView orgDataPage() {
		mv.setViewName("hr/orgData");
		return mv;
	}
	
	// 获取组织架构tree型菜单
	@RequestMapping("/getOrgDataTreeList")
	@ResponseBody
	public ModelMap getOrgDataTreeList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		List result = hrBaseDataService.getOrgDataTreeList(queryMap);
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
		model.addAllAttributes(map);
        return model;
	}
	
	@RequestMapping("/staffManager")
	public ModelAndView staffManager(){ 		//基础数据 员工库
		mv.setViewName("hr/staffManager");
        return mv;  
    }
	
	@RequestMapping("/workgroupPrice")
	public ModelAndView workgroupPrice(){ 		//基础数据 班组承包单价
		mv.setViewName("hr/workgroupPrice");
        return mv;  
    }

}
