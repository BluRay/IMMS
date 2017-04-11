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

}
