package com.byd.bms.hr.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.util.controller.BaseController;
/**
 * HR基础数据Controller
 * @author tangjin 2017-07-12
 */ 
@Controller
@RequestMapping("/hrBaseData")
public class HrBaseDataController extends BaseController {
	
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
