package com.byd.bms.hr.controller;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.hr.service.IHrReportService;
import com.byd.bms.production.service.IProductionService;
import com.byd.bms.util.controller.BaseController;
/**
 * HR工时报表控制器
 * @author THW 2017-07-25
 */ 
@Controller
@RequestMapping("/hrReport")
public class HrReportController extends BaseController {

	static Logger logger = Logger.getLogger("HR");
	@Autowired
	protected IHrReportService hrReportService;
	@Autowired
	protected IProductionService productionService;

	//奖惩汇总
	@RequestMapping("/rewardsCollect")
	public ModelAndView rewardsCollect() {
		mv.setViewName("hr/rewardsCollect");
		return mv;
	}
	
	//技改工时统计
	@RequestMapping("/ecnReport")
	public ModelAndView ecnReport() {
		mv.setViewName("hr/ecnReport");
		return mv;
	}
	
	@RequestMapping("/getRewardsCollectList")
	@ResponseBody
	public ModelMap getRewardsCollectList() {
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("rewards_factory", request.getParameter("factory"));
		conditionMap.put("rewards_workshop", request.getParameter("workshop"));
		conditionMap.put("rewards_date", request.getParameter("rewards_date"));
		
		Map<String, Object> selectList = hrReportService.getRewardsList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(selectList);
		model = mv.getModelMap();
		return model;
	}
	
	/**
	 * 考勤导入
	 * @return
	 */
	@RequestMapping("/staffAttendance")
	public ModelAndView staffAttendance(){
		mv.setViewName("hr/staffAttendance");
		return mv;
	}
	
	@RequestMapping("/getAttendanceList")
	@ResponseBody
	public ModelMap getAttendanceList() {
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("staff_number", request.getParameter("staff_number"));
		conditionMap.put("factory", request.getParameter("factory"));
		conditionMap.put("workshop", request.getParameter("workshop"));
		conditionMap.put("workgroup", request.getParameter("workgroup"));
		conditionMap.put("team", request.getParameter("team"));		
		conditionMap.put("month", request.getParameter("month"));
		
		Map<String, Object> selectList = productionService.getAttendanceList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(selectList);
		model = mv.getModelMap();
		return model;
	}
}
