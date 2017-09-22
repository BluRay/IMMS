package com.byd.bms.hr.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
import com.byd.bms.production.service.IProductionService;
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

	//额外工时统计
	@RequestMapping("/tmpReport")
	public ModelAndView tmpReport() {
		mv.setViewName("hr/tmpReport");
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
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getEcnReportData")
	@ResponseBody
	public ModelMap getEcnReportData(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String, Object>> datalist = hrReportService.getEcnReportData(conditionMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getEcnReportData1")
	@ResponseBody
	public ModelMap getEcnReportData1(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String, Object>> datalist = hrReportService.getEcnReportData1(conditionMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getTmpReportData")
	@ResponseBody
	public ModelMap getTmpReportData(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		
		List<Map<String, Object>> datalist = hrReportService.getTmpReportData(conditionMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getTmpReportData1")
	@ResponseBody
	public ModelMap getTmpReportData1(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		
		List<Map<String, Object>> datalist = hrReportService.getTmpReportData1(conditionMap);
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("data", datalist);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	/******************** xioing.jianwu **********************/
	
	/**
	 * 计件工时统计报表
	 * @return
	 */
	@RequestMapping("/pieceTimeReport")
	public ModelAndView pieceTimeReport(){
		mv.setViewName("hr/pieceTimeReport");
		return mv;
	}
	
	/**
	 * 查询计件工时统计报表数据
	 * @return
	 */
	@RequestMapping("/getStaffPieceHours")
	@ResponseBody
	public ModelMap getStaffPieceHours(){
		model.clear();
		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		String workgroup=request.getParameter("workgroup");
		String team = request.getParameter("team");
		String salary_model=request.getParameter("salary_model");
		String count_flag=request.getParameter("count_flag");
		String order_id=request.getParameter("order_id");
		String order_no=request.getParameter("order_no");
		String bus_number=request.getParameter("bus_number");
		String wdate_start=request.getParameter("wdate_start");
		String wdate_end=request.getParameter("wdate_end");
		String staff=request.getParameter("staff");//员工姓名或员工姓名
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("salary_model", salary_model);
		conditionMap.put("count_flag", count_flag);
		conditionMap.put("order_id", order_id);
		conditionMap.put("bus_number", bus_number);
		conditionMap.put("wdate_start", wdate_start);
		conditionMap.put("wdate_end", wdate_end);
		conditionMap.put("staff", staff);

		hrReportService.getStaffPieceHours(conditionMap,model);
		return model;
	}
	
	/**
	 * 计件工资提交页面
	 * @return
	 */
	@RequestMapping("/staffSalarySubmit")
	public ModelAndView staffSalarySubmit(){
		mv.setViewName("hr/staffSalarySubmit");
		return mv;
	}
	
	/**
	 * 计件工资提交页面工资列表查询
	 * @return
	 */
	@RequestMapping("/getStaffPieceSalary")
	@ResponseBody
	public ModelMap getStaffPieceSalary(){
		model.clear();
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");
		String workgroup = request.getParameter("workgroup");
		String team = request.getParameter("team");
		String staff = request.getParameter("staff");
		String month = request.getParameter("month");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("month", month);
		conditionMap.put("staff", staff);
		
		hrReportService.getStaffPieceSalary(conditionMap,model);
		return model;
	}
	
	/**
	 * 计件工资提交
	 * @return
	 */
	@RequestMapping("/submitStaffSalary")
	@ResponseBody
	public ModelMap submitStaffSalary(){
		model.clear();
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");		
		String staff_salary_list = request.getParameter("staff_salary_list");
		String month = request.getParameter("month");		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String saver=(String) session.getAttribute("user_name");
		JSONArray jsa=JSONArray.fromObject(staff_salary_list);
		Iterator it=jsa.iterator();
		List<Map<String,String>> detail_list=new ArrayList<Map<String,String>>();
		/**
		 * 封装需要保存的数据
		 */
		while(it.hasNext()){
			JSONObject el=(JSONObject) it.next();
			Map<String,String> m=(Map<String,String>) JSONObject.toBean(el, Map.class);	
			detail_list.add(m);
		}
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("staff_salary_list", detail_list);
		conditionMap.put("month", month);
		conditionMap.put("saver", saver);
		conditionMap.put("save_date", curTime);

		
		hrReportService.submitStaffSalary(conditionMap,model);
		return model;
	}
	
	/**
	 * 计件工资结算页面
	 * @return
	 */
	@RequestMapping("/staffSalaryBalance")
	public ModelAndView staffSalaryBalance(){
		mv.setViewName("hr/staffSalaryBalance");
		return mv;
	}
	
	/**
	 * 计件工资结算页面工资列表查询
	 * @return
	 */
	@RequestMapping("/getStaffPieceSalaryToBal")
	@ResponseBody
	public ModelMap getStaffPieceSalaryToBal(){
		model.clear();
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");
		String workgroup = request.getParameter("workgroup");
		String team = request.getParameter("team");
		String staff = request.getParameter("staff");
		String month = request.getParameter("month");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("month", month);
		conditionMap.put("staff", staff);
		
		hrReportService.getStaffPieceSalaryToBal(conditionMap,model);
		return model;
	}
	
	/**
	 * 计件工资驳回
	 * @return
	 */
	@RequestMapping("/rejectStaffSalary")
	@ResponseBody
	public ModelMap rejectStaffSalary(){
		model.clear();
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");	
		String workgroup = request.getParameter("workgroup");
		String team = request.getParameter("team");
		String month = request.getParameter("month");	
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String saver=(String) session.getAttribute("user_name");
		String staff_salary_list = request.getParameter("staff_salary_list");
		JSONArray jsa=JSONArray.fromObject(staff_salary_list);
		Iterator it=jsa.iterator();
		List<Map<String,String>> detail_list=new ArrayList<Map<String,String>>();
		/**
		 * 封装需要保存的数据
		 */
		while(it.hasNext()){
			JSONObject el=(JSONObject) it.next();
			Map<String,String> m=(Map<String,String>) JSONObject.toBean(el, Map.class);	
			detail_list.add(m);
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("staff_salary_list", detail_list);
		conditionMap.put("month", month);
		conditionMap.put("saver", saver);
		conditionMap.put("save_date", curTime);
		conditionMap.put("status", "已驳回");
		
		hrReportService.rejectStaffSalary(conditionMap,model);
		return model;
	}
	/**
	 * 计件工资结算
	 * @return
	 */
	@RequestMapping("/balanceStaffSalary")
	@ResponseBody
	public ModelMap balanceStaffSalary(){
		model.clear();
		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");	
		String workgroup = request.getParameter("workgroup");
		String team = request.getParameter("team");
		String month = request.getParameter("month");	
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String saver=(String) session.getAttribute("user_name");
		String staff_salary_list = request.getParameter("staff_salary_list");
		JSONArray jsa=JSONArray.fromObject(staff_salary_list);
		Iterator it=jsa.iterator();
		List<Map<String,String>> detail_list=new ArrayList<Map<String,String>>();
		/**
		 * 封装需要保存的数据
		 */
		while(it.hasNext()){
			JSONObject el=(JSONObject) it.next();
			Map<String,String> m=(Map<String,String>) JSONObject.toBean(el, Map.class);	
			detail_list.add(m);
		}
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("staff_salary_list", detail_list);
		conditionMap.put("month", month);
		conditionMap.put("saver", saver);
		conditionMap.put("save_date", curTime);
		conditionMap.put("status", "已结算");
		
		hrReportService.balanceStaffSalary(conditionMap,model);
		return model;
	}
	
	/**
	 * 人员去向统计页面
	 * @return
	 */
	@RequestMapping("/attendanceReport")
	public ModelAndView attendanceReport(){
		mv.setViewName("hr/attendanceReport");
		return mv;
	}
	
	/**
	 * 人员去向统计数据查询
	 * @return
	 */
	@RequestMapping("/getAttendenceReport")
	@ResponseBody
	public ModelMap getAttendenceReport(){
		model.clear();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(request.getParameter("conditions"));
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		
		hrReportService.getAttendenceReport(conditionMap,model);
		
		return model;
	}
	
	/**
	 * 人员去向导入页面
	 * @return
	 */
	@RequestMapping("/attendanceUpload")
	public ModelAndView attendanceUpload(){
		mv.setViewName("hr/attendanceUpload");
		return mv;
	}
	
	/**
	 * 人员去向数据导入（计件）
	 * @return
	 */
	@RequestMapping(value="/uploadAttendenceData",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadAttendenceData(@RequestParam(value="file",required=false) MultipartFile file){
		model.clear();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String user_id = request.getSession().getAttribute("user_id").toString();
		String record_date=request.getParameter("record_date");
		String result = "导入成功！";
		String fileFileName=file.getOriginalFilename();
		if(fileFileName.contains("计时")){
			result = "用户信息上传出错：导入维度不对，请选择正确的维度，重新导入！";
			model.put("success", false);
			model.put("message", result);
		}
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(2);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("22", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("31", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("32", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("33", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("34", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("35", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("36", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("37", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("38", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("39", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("40", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("41", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("42", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("43", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("44", ExcelModel.CELL_TYPE_CANNULL);
		
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		
		try{
			File tempfile=new File(fileFileName);
			file.transferTo(tempfile);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
			InputStream is = new FileInputStream(tempfile);
			
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			 
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			Map<String,Object> condMap=new HashMap<String,Object>();
			
			for(Object[] data : excelModel.getData()){
				Map<String, Object> info = new HashMap<String, Object>();
				String factory=data[0].toString().trim();
				String workshop=data[1].toString().trim();
				String team=data[2].toString().trim();
				if(factory !=""&&workshop!=""){
					info.put("factory", factory);
					info.put("workshop", workshop);
					info.put("team", team);
					info.put("direct_num_yd", data[3] == null?null:data[3].toString().trim());
					info.put("direct_num_sd", data[4] == null?null:data[4].toString().trim());
					info.put("short_num_yd", data[5] == null?null:data[5].toString().trim());
					info.put("short_num_sd", data[6] == null?null:data[6].toString().trim());
					info.put("leave_num", data[7] == null?null:data[7].toString().trim());
					info.put("holiday_num", data[8] == null?null:data[8].toString().trim());
					info.put("absence_num", data[9] == null?null:data[9].toString().trim());
					info.put("trip_num", data[10] == null?null:data[10].toString().trim());
					info.put("out_aid_num", data[11] == null?null:data[11].toString().trim());
					info.put("work_num", data[12] == null?null:data[12].toString().trim());
					info.put("out_aid_cs_num", data[13] == null?null:data[13].toString().trim());
					info.put("out_aid_nj_num", data[14] == null?null:data[14].toString().trim());
					info.put("out_aid_hz_num", data[15] == null?null:data[15].toString().trim());
					info.put("out_aid_dl_num", data[16] == null?null:data[16].toString().trim());
					info.put("out_aid_qd_num", data[17] == null?null:data[17].toString().trim());
					info.put("out_aid_cd_num", data[18] == null?null:data[18].toString().trim());
					info.put("out_aid_wh_num", data[19] == null?null:data[19].toString().trim());
					info.put("out_aid_sw_num", data[20] == null?null:data[20].toString().trim());
					info.put("out_aid_ty_num", data[21] == null?null:data[21].toString().trim());
					info.put("out_aid_sz_num", data[22] == null?null:data[22].toString().trim());					
					info.put("out_aid_xa_num", data[23] == null?null:data[23].toString().trim());
					info.put("out_aid_nb_num", data[24] == null?null:data[24].toString().trim());
					info.put("out_aid_yc_num", data[25] == null?null:data[25].toString().trim());					
					info.put("out_aid_tj_num", data[26] == null?null:data[26].toString().trim());
					info.put("out_aid_oth_num", data[27] == null?null:data[27].toString().trim());
					info.put("out_aid_note", data[28] == null?null:data[28].toString().trim());
					info.put("in_aid_cs_num", data[29] == null?null:data[29].toString().trim());
					info.put("in_aid_nj_num", data[30] == null?null:data[30].toString().trim());
					info.put("in_aid_hz_num", data[31] == null?null:data[31].toString().trim());
					info.put("in_aid_dl_num", data[32] == null?null:data[32].toString().trim());
					info.put("in_aid_qd_num", data[33] == null?null:data[33].toString().trim());
					info.put("in_aid_cd_num", data[34] == null?null:data[34].toString().trim());
					info.put("in_aid_wh_num", data[35] == null?null:data[35].toString().trim());
					info.put("in_aid_sw_num", data[36] == null?null:data[36].toString().trim());
					info.put("in_aid_ty_num", data[37] == null?null:data[37].toString().trim());
					info.put("in_aid_sz_num", data[38] == null?null:data[38].toString().trim());					
					info.put("in_aid_xa_num", data[39] == null?null:data[39].toString().trim());
					info.put("in_aid_nb_num", data[40] == null?null:data[40].toString().trim());
					info.put("in_aid_yc_num", data[41] == null?null:data[41].toString().trim());					
					info.put("in_aid_tj_num", data[42] == null?null:data[42].toString().trim());
					info.put("in_aid_oth_num", data[43] == null?null:data[43].toString().trim());
					info.put("in_aid_note", data[44] == null?null:data[44].toString().trim());

					info.put("record_date", record_date);
					info.put("report_type", "计件");
					info.put("editor_id", user_id);
					info.put("edit_date", curTime);
					addList.add(info);					
				}	
			}
			
			condMap.put("factory", excelModel.getData().get(0)[0].toString());
			condMap.put("workshop", excelModel.getData().get(0)[1].toString());
			condMap.put("team", excelModel.getData().get(0)[2].toString());
			condMap.put("record_date", record_date);
			condMap.put("report_type", "计件");
			condMap.put("dataList", addList);
			//删除需要替换的数据,保存新的数据
			hrReportService.uploadAttendenceData(condMap,model);
		}catch(Exception e){
			model.put("success", false);
			model.put("message", "系统异常，导入失败!");
		}
		
		
		return model;
	}
	
	/**
	 * 人员去向数据导入（计时）
	 * @return
	 */
	@RequestMapping(value="/uploadAttendenceHourData",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadAttendenceHourData(@RequestParam(value="file",required=false) MultipartFile file){
		model.clear();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String user_id = request.getSession().getAttribute("user_id").toString();
		String record_date=request.getParameter("record_date");
		String result = "导入成功！";
		String fileFileName=file.getOriginalFilename();
		if(fileFileName.contains("计件")){
			result = "用户信息上传出错：导入维度不对，请选择正确的维度，重新导入！";
			model.put("success", false);
			model.put("message", result);
		}
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(2);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("22", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("31", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("32", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("33", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("34", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("35", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("36", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("37", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("38", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("39", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("40", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("41", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("42", ExcelModel.CELL_TYPE_CANNULL);
	
		
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		
		try{
			File tempfile=new File(fileFileName);
			file.transferTo(tempfile);
			/**
			 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
			 */
			InputStream is = new FileInputStream(tempfile);
			
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			 
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			Map<String,Object> condMap=new HashMap<String,Object>();
			
			for(Object[] data : excelModel.getData()){
				Map<String, Object> info = new HashMap<String, Object>();
				String factory=data[0].toString().trim();
				String workshop=data[1].toString().trim();
				//String team=data[2].toString().trim();
				if(factory !=""&&workshop!=""){
					info.put("factory", factory);
					info.put("workshop", workshop);
					info.put("assist_num_yd", data[2] == null?null:data[2].toString().trim());
					info.put("assist_num_sd", data[3] == null?null:data[3].toString().trim());
					info.put("leave_num", data[4] == null?null:data[4].toString().trim());
					info.put("holiday_num", data[5] == null?null:data[5].toString().trim());
					info.put("absence_num", data[6] == null?null:data[6].toString().trim());
					info.put("trip_num", data[7] == null?null:data[7].toString().trim());
					info.put("out_aid_num", data[8] == null?null:data[8].toString().trim());
					info.put("callout_num", data[9] == null?null:data[9].toString().trim());
					info.put("work_num", data[10] == null?null:data[10].toString().trim());
					info.put("out_aid_cs_num", data[11] == null?null:data[11].toString().trim());
					info.put("out_aid_nj_num", data[12] == null?null:data[12].toString().trim());
					info.put("out_aid_hz_num", data[13] == null?null:data[13].toString().trim());
					info.put("out_aid_dl_num", data[14] == null?null:data[14].toString().trim());
					info.put("out_aid_qd_num", data[15] == null?null:data[15].toString().trim());
					info.put("out_aid_cd_num", data[16] == null?null:data[16].toString().trim());
					info.put("out_aid_wh_num", data[17] == null?null:data[17].toString().trim());
					info.put("out_aid_sw_num", data[18] == null?null:data[18].toString().trim());
					info.put("out_aid_ty_num", data[19] == null?null:data[19].toString().trim());
					info.put("out_aid_sz_num", data[20] == null?null:data[20].toString().trim());
					info.put("out_aid_xa_num", data[21] == null?null:data[21].toString().trim());
					info.put("out_aid_nb_num", data[22] == null?null:data[22].toString().trim());
					info.put("out_aid_yc_num", data[23] == null?null:data[23].toString().trim());
					info.put("out_aid_tj_num", data[24] == null?null:data[24].toString().trim());
					info.put("out_aid_oth_num", data[25] == null?null:data[25].toString().trim());
					info.put("out_aid_note", data[26] == null?null:data[26].toString().trim());
					info.put("in_aid_cs_num", data[27] == null?null:data[27].toString().trim());
					info.put("in_aid_nj_num", data[28] == null?null:data[28].toString().trim());
					info.put("in_aid_hz_num", data[29] == null?null:data[29].toString().trim());
					info.put("in_aid_dl_num", data[30] == null?null:data[30].toString().trim());
					info.put("in_aid_qd_num", data[31] == null?null:data[31].toString().trim());
					info.put("in_aid_cd_num", data[32] == null?null:data[32].toString().trim());
					info.put("in_aid_wh_num", data[33] == null?null:data[33].toString().trim());
					info.put("in_aid_sw_num", data[34] == null?null:data[34].toString().trim());
					info.put("in_aid_ty_num", data[35] == null?null:data[35].toString().trim());
					info.put("in_aid_sz_num", data[36] == null?null:data[36].toString().trim());
					info.put("in_aid_xa_num", data[37] == null?null:data[37].toString().trim());
					info.put("in_aid_nb_num", data[38] == null?null:data[38].toString().trim());
					info.put("in_aid_yc_num", data[39] == null?null:data[39].toString().trim());
					info.put("in_aid_tj_num", data[40] == null?null:data[40].toString().trim());
					info.put("in_aid_oth_num", data[41] == null?null:data[41].toString().trim());
					info.put("in_aid_note", data[42] == null?null:data[42].toString().trim());

					info.put("record_date", record_date);
					info.put("report_type", "计时");
					info.put("editor_id", user_id);
					info.put("edit_date", curTime);
					addList.add(info);					
				}	
			}
			
			condMap.put("factory", excelModel.getData().get(0)[0].toString());
			condMap.put("workshop", excelModel.getData().get(0)[1].toString());
			//condMap.put("team", excelModel.getData().get(0)[2].toString());
			condMap.put("record_date", record_date);
			condMap.put("report_type", "计时");
			condMap.put("dataList", addList);
			//删除需要替换的数据,保存新的数据
			hrReportService.uploadAttendenceData(condMap,model);

		}catch(Exception e){
			model.put("success", false);
			model.put("message", "系统异常，导入失败!");
		}
		
		return model;
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/getReportData")
	@ResponseBody
	public ModelMap getReportData(){
		model.clear();
		String conditions=request.getParameter("conditions");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		JSONObject jo=JSONObject.fromObject(conditions);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			System.out.println(key);
			conditionMap.put(key, jo.get(key));
		}
		hrReportService.getReportData(conditionMap,model);

		return model;
	}
	
	/******************** xioing.jianwu **********************/
	/******************** tangjin start **********************/
	/**
	 * 等待工资统计
	 * @return
	 */
	@RequestMapping("/waitReport")
	public ModelAndView waitReport(){
		mv.setViewName("hr/waitReport");
		return mv;
	}
	
	@RequestMapping("/getStaffWaitHours")
	@ResponseBody
	public ModelMap getStaffWaitHours(){
		model.clear();
		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		String workgroup=request.getParameter("workgroup");
		String team = request.getParameter("team");
		String waitdate=request.getParameter("waitdate");
		String staff=request.getParameter("staff");//员工姓名或员工姓名
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("waitdate", waitdate);
		conditionMap.put("staff", staff);

		hrReportService.getStaffWaitHours(conditionMap,model);
		return model;
	}
	// 工时统计报表
	@RequestMapping("/workHourReport")
	public ModelAndView workHourReport(){
		mv.setViewName("hr/workHourReport");
		return mv;
	}
	
	@RequestMapping("/queryStaffWorkHoursList")
	@ResponseBody
	public ModelMap queryStaffWorkHoursList(){
		model.clear();
		String factory=request.getParameter("factory");
		String workshop=request.getParameter("workshop");
		String workgroup=request.getParameter("workgroup");
		String team = request.getParameter("team");
		String work_date=request.getParameter("work_date");
		String staff=request.getParameter("staff");//员工姓名或员工姓名
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):10;	//每一页数据条数
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("factory", factory);
		conditionMap.put("workshop", workshop);
		conditionMap.put("workgroup", workgroup);
		conditionMap.put("team", team);
		conditionMap.put("work_date", work_date);
		conditionMap.put("staff", staff);

		hrReportService.queryStaffWorkHoursList(conditionMap,model);
		return model;
	}
	/******************** tangjin end **********************/
}
