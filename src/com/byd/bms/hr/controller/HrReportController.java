package com.byd.bms.hr.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
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

import com.byd.bms.hr.service.IHrReportService;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
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

	//组织架构
	@RequestMapping("/rewardsCollect")
	public ModelAndView rewardsCollect() {
		mv.setViewName("hr/rewardsCollect");
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
	
}
