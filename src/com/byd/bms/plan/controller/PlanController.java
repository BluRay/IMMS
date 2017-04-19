package com.byd.bms.plan.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/plan")
public class PlanController extends BaseController{
	static Logger logger = Logger.getLogger("PLAN");
	
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
		logger.info("---->uploadMasterPlan" + file.getContentType());
		
		initModel(true,"success",null);
		model = mv.getModelMap();
		return model;
	}

}
