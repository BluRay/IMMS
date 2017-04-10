package com.byd.bms.plan.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/plan")
public class PlanController extends BaseController{
	static Logger logger = Logger.getLogger(PlanController.class.getName());
	
	@RequestMapping("/importMaster")
	public ModelAndView maintain(){ 
		mv.setViewName("plan/importMaster");
        return mv;  
    } 

}
