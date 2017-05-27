package com.byd.bms.tech.controller;

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
import javax.servlet.ServletContext;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;
import com.byd.bms.tech.service.ITechService;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.util.controller.BaseController;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 工程变更Controller
 * @author thw 2017-04-21
 */ 
@Controller
@RequestMapping("/tech")
public class TechController extends BaseController{
	static Logger logger = Logger.getLogger(TechController.class.getName());
	@Autowired
	protected ITechService techService;
	
	/**
	 * 跳转到技改任务维护查询页面
	 * @return mv
	 */
	@RequestMapping("/techTaskMaintain")
	public ModelAndView taskMaintain(){ 		//技改任务维护
		mv.setViewName("tech/techTaskMaintain");
        return mv; 
    }
	
	@RequestMapping("/taskAssignPage")
	public ModelAndView taskAssignPage(){		//技改任务分配
		mv.setViewName("tech/taskAssignPage");
        return mv;
	}
	
	@RequestMapping("/taskAssignPrePage")
	public ModelAndView taskAssignPrePage(){	//技改任务分配-前段
		mv.setViewName("tech/taskAssignPrePage");
        return mv;
	}
	
	@RequestMapping("/techTaskMaterialCheck")	//技改物料确认
	public ModelAndView techTaskMaterialCheck(){
		mv.setViewName("tech/techTaskMaterialCheck");
        return mv;
	}
	
	@RequestMapping("/techTaskMaterialCheckPage")//技改物料确认-确认
	public ModelAndView techTaskMaterialCheckPage(){
		mv.setViewName("tech/techTaskMaterialCheckPage");
        return mv;
	}
	
	@RequestMapping("/workHourEstimatePage")	//工时评估
	public ModelAndView workHourEstimatePage(){
		mv.setViewName("tech/workHourEstimatePage");
        return mv;
	}
	
	@RequestMapping("/followingUpPage")			//技改跟进
	public ModelAndView followingUpPage(){
		mv.setViewName("tech/followingUpPage");
        return mv;
	}
	
	@RequestMapping("/worktimeMaintain")		//技改工时维护
	public ModelAndView worktimeMaintain(){
		mv.setViewName("tech/worktimeMaintain");
        return mv;
	}
	
	@RequestMapping("/worktimeVerify")			//技改工时审核
	public ModelAndView worktimeVerify(){
		mv.setViewName("tech/worktimeVerify");
        return mv;
	}
	
	@RequestMapping("/taskSearch")				//技改查询
	public ModelAndView taskSearch(){
		mv.setViewName("tech/taskSearch");
        return mv;
	}
	
	@RequestMapping("/techTaskReport")			//技改成本
	public ModelAndView techTaskReport(){
		mv.setViewName("tech/techTaskReport");
        return mv;
	}
	
	@RequestMapping("/techCollectReport")		//技改情况汇总
	public ModelAndView techCollectReport(){
		mv.setViewName("tech/techCollectReport");
        return mv;
	}
	
	@RequestMapping("/changeTypeReport")		//分类型变更汇总
	public ModelAndView changeTypeReport(){
		mv.setViewName("tech/changeTypeReport");
        return mv;
	}
	
	/**
	 * ajax 获取订单列表数据
	 * @return model
	 */
	@RequestMapping("/techTaskMaintain/getTaskMaintainList")
	@ResponseBody
	public ModelMap getTaskMaintainList(){
		Map<String,Object> condMap=new HashMap<String,Object>();
		String tech_order_no=request.getParameter("tech_order_no");		//技改单号
		String task_content=request.getParameter("task_content");		//技改任务内容
		String tech_date_start=request.getParameter("tech_date_start");	//技改单日期-开始
		String tech_date_end=request.getParameter("tech_date_end");		//技改单日期-结束
		String status=request.getParameter("status");					//技改任务状态
		condMap.put("draw", request.getParameter("draw"));
		condMap.put("start", request.getParameter("start"));
		condMap.put("length", request.getParameter("length"));
		condMap.put("tech_order_no", tech_order_no);
		condMap.put("task_content", task_content);
		condMap.put("tech_date_start",tech_date_start);
		condMap.put("tech_date_end", tech_date_end);
		condMap.put("status", status);
		Map<String,Object> result = new HashMap<String,Object>();
		result=techService.queryTechTaskMaintainList(condMap);
		model.addAllAttributes(result);
		
		return model;
	}
	
	@RequestMapping(value="/techTaskMaintain/uploadChangedMaterialListFile",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadChangedMaterialListFile(@RequestParam(value="file",required=false) MultipartFile file){
		String fileName="Tech_ChangedMaterialList.xls";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);

		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
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
		excelModel.setDataType(dataType);
		excelModel.setPath(fileName);
		File tempfile=new File(fileName);
		file.transferTo(tempfile);
		/**
		 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
		 */
		InputStream is = new FileInputStream(tempfile);

		ExcelTool excelTool = new ExcelTool();
		excelTool.readExcel(is, excelModel);

		List<Map<String, String>> addList = new ArrayList<Map<String, String>>();
		for (Object[] data : excelModel.getData()) {
			Map<String, String> infomap = new HashMap<String, String>();

			infomap.put("sap_no", data[0] == null ? null : data[0].toString().trim());
			infomap.put("material_desc", data[1] == null ? null : data[1].toString().trim());
			infomap.put("material_type", data[2] == null ? null : data[2].toString().trim());
			infomap.put("material_spec", data[3] == null ? null : data[3].toString().trim());
			infomap.put("unit", data[4] == null ? null : data[4].toString().trim());
			infomap.put("supplier_code", data[5] == null ? null : data[5].toString().trim());
			infomap.put("single_loss", data[6] == null ? null : data[6].toString().trim());
			infomap.put("level_usage", data[7] == null ? null : data[7].toString().trim());
			infomap.put("single_weight", data[8] == null ? null : data[8].toString().trim());
			infomap.put("single_usage", data[9] == null ? null : data[9].toString().trim());
			infomap.put("workshop", data[10] == null ? null : data[10].toString().trim());
			infomap.put("process", data[11] == null ? null : data[11].toString().trim());
			infomap.put("assemb_site", data[12] == null ? null : data[12].toString().trim());
			infomap.put("remark", data[13] == null ? null : data[13].toString().trim());

			// infomap.put("editor_id", String.valueOf(user_id));
			// infomap.put("edit_date", String.valueOf(createTime));
			addList.add(infomap);
		}
		initModel(true,"导入成功！",addList);
		}catch(Exception e){
			initModel(false,"导入失败！",null);
		}
		return mv.getModelMap();
	}
	
	/**
	 * ajax form 提交 新增技改任务
	 * @return model
	 */
	@RequestMapping(value="/techTaskMaintain/addTechTask",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap addTechTask(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("task_content", request.getParameter("new_task_content"));
		infomap.put("tech_order_no", request.getParameter("new_tech_order_no"));
		infomap.put("tech_point_num", request.getParameter("new_tech_point_num"));
		infomap.put("tech_order_type", request.getParameter("new_tech_order_type"));
		infomap.put("tech_type", request.getParameter("new_tech_type"));
		infomap.put("tech_date", request.getParameter("new_tech_date"));
		infomap.put("duty_unit", request.getParameter("new_duty_unit"));
		infomap.put("major_change", request.getParameter("new_major_change") == null ? "N" : "Y");
		infomap.put("repeat_change", request.getParameter("new_repeat_change") == null ? "N" : "Y");
		infomap.put("custom_change", request.getParameter("new_custom_change") == null ? "N" : "Y");
		infomap.put("custom_change_no", request.getParameter("new_custom_change_no"));
		
		//创建一个通用的多部分解析器  
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());  
        //判断 request 是否有文件上传,即多部分请求  
        if(multipartResolver.isMultipart(request)){  
            //转换成多部分request    
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;  
            //取得request中的所有文件名  
            Iterator<String> iter = multiRequest.getFileNames();  
            if(iter.hasNext()){  
                //取得第一个上传文件  
                MultipartFile file = multiRequest.getFile(iter.next());  
                if(file != null){  
                	infomap.put("tech_order_file", saveFileMethod(file));
                }  
            }
            if(iter.hasNext()){  
                //取得第二个上传文件  
                MultipartFile file = multiRequest.getFile(iter.next());  
                if(file != null){  
                	infomap.put("custom_change_file", saveFileMethod(file));
                }  
            }
              
        }  
		
		infomap.put("editor_id", userid);
		infomap.put("edit_date", curTime);
		infomap.put("id", -1);
		// addList.add(infomap);
		String selectedrows = request.getParameter("selectedrows");
		infomap.put("selectedrows", selectedrows);
		
		try{
			techService.addTechTask(infomap);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！",null);
		}
		return mv.getModelMap();
	}
	
	
	
	/**
	 * ajax 获取订单列表数据
	 * @return model
	 */
	@RequestMapping("/techTaskMaintain/getSingleTaskMaintain")
	@ResponseBody
	public ModelMap getSingleTaskMaintain(){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("id", request.getParameter("id"));
		try{
			List<Map<String,Object>> list = techService.querySingleTechTaskMaintain(conditionMap);
			initModel(true,"查询成功！",list);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"查询失败！",null);
		}
		return mv.getModelMap();
	}
	
	private String saveFileMethod(MultipartFile file) {
		ServletContext servletContext = ContextLoader.getCurrentWebApplicationContext().getServletContext(); 
		String filepath = "";

		if (file != null) {
			try {
				 //取得当前上传文件的文件名称  
                String myFileName = file.getOriginalFilename();  
                //如果名称不为“”,说明该文件存在，否则说明该文件不存在  
                if(myFileName.trim() !=""){  
    				// 把上传的文件放到指定的路径下
    				String path = servletContext.getRealPath("/file/upload/techTask/");
    				// 写到指定的路径中
    				File savedir = new File(path);
    				// 如果指定的路径没有就创建
    				if (!savedir.exists()) {
    					savedir.mkdirs();
    				}
    				File saveFile = new File(savedir, String.valueOf(System.currentTimeMillis()) + ".pdf");
                    System.out.println(myFileName);  
                    file.transferTo(saveFile);
                    filepath = "/IMMS/file/upload/techTask/" + saveFile.getName();
                }
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return filepath;
	}

	@RequestMapping("/techTaskMaintain/getChangedMaterialList")
	@ResponseBody
	public ModelMap getChangedMaterialList(){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("tech_task_id", request.getParameter("tech_task_id"));
		List<Map<String, Object>> list = techService.queryChangedMaterialList(conditionMap);
		initModel(true,"查询成功！",list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="/techTaskMaintain/editTechTaskMaintain",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap editTechTaskMaintain(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		List<Map<String, Object>> editList = new ArrayList<Map<String, Object>>();
		Map<String, Object> infomap = new HashMap<String, Object>();
		infomap.put("task_content", request.getParameter("edit_task_content"));
		infomap.put("tech_order_no", request.getParameter("edit_tech_order_no"));
		infomap.put("tech_point_num", request.getParameter("edit_tech_point_num"));
		infomap.put("tech_order_type", request.getParameter("edit_tech_order_type"));
		infomap.put("tech_type", request.getParameter("edit_tech_type"));
		infomap.put("tech_date", request.getParameter("edit_tech_date"));
		infomap.put("duty_unit", request.getParameter("edit_duty_unit"));
		infomap.put("major_change", request.getParameter("edit_major_change") == null ? "N" : "Y");
		infomap.put("repeat_change", request.getParameter("edit_repeat_change") == null ? "N" : "Y");
		infomap.put("custom_change", request.getParameter("edit_custom_change") == null ? "N" : "Y");
		infomap.put("custom_change_no", request.getParameter("edit_custom_change_no"));
		
		//创建一个通用的多部分解析器  
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());  
        //判断 request 是否有文件上传,即多部分请求  
        if(multipartResolver.isMultipart(request)){  
            //转换成多部分request    
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;  
            //取得request中的所有文件名  
            Iterator<String> iter = multiRequest.getFileNames();  
            if(iter.hasNext()){  
                //取得第一个上传文件  
                MultipartFile file = multiRequest.getFile(iter.next());  
                if(file != null){
                	infomap.put("tech_order_file", saveFileMethod(file));
                }  
            }
            if(iter.hasNext()){  
                //取得第二个上传文件  
                MultipartFile file = multiRequest.getFile(iter.next());  
                if(file != null){  
                	infomap.put("custom_change_file", saveFileMethod(file));
                }  
            }
              
        }

		infomap.put("editor_id", userid);
		infomap.put("edit_date", curTime);
		infomap.put("id", request.getParameter("tech_task_id"));
		editList.add(infomap);
		String selectedrows = request.getParameter("selectedrows");
		techService.updateTechTaskMaintain(editList);
		// 删除原来的变更物料清单
		Map<String, Object> deletemap = new HashMap<String, Object>();
		deletemap.put("tech_task_id", request.getParameter("tech_task_id"));
		techService.deleteChangedMaterialList(deletemap);
		List<Map<String, Object>> changeMaterialList = new ArrayList<Map<String, Object>>();
		JSONArray jsonArray = JSONArray.fromObject(selectedrows);
		JSONObject obj = null;
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String, Object> changeMaterialMap = new HashMap<String, Object>();
			obj = jsonArray.getJSONObject(i);
			changeMaterialMap.put("tech_task_id", request.getParameter("tech_task_id"));
			changeMaterialMap.put("sap_no", obj.getString("sap_no"));
			changeMaterialMap.put("material_desc", obj.getString("material_desc"));
			changeMaterialMap.put("material_type", obj.getString("material_type"));
			changeMaterialMap.put("material_spec", obj.getString("material_spec"));
			changeMaterialMap.put("unit", obj.getString("unit"));
			changeMaterialMap.put("supplier_code", obj.getString("supplier_code"));
			changeMaterialMap.put("single_loss", obj.getString("single_loss"));
			changeMaterialMap.put("level_usage", obj.getString("level_usage"));
			changeMaterialMap.put("single_weight", obj.getString("single_weight"));
			changeMaterialMap.put("single_usage", obj.getString("single_usage"));
			changeMaterialMap.put("workshop", obj.getString("workshop"));
			changeMaterialMap.put("process", obj.getString("process"));
			changeMaterialMap.put("assemb_site", obj.getString("assemb_site"));
			changeMaterialMap.put("remark", obj.getString("remark"));
			changeMaterialList.add(changeMaterialMap);
		}
		if (changeMaterialList.size() > 0) {
			techService.addChangedMaterialList(changeMaterialList);
		}

		initModel(true,"SUCCESS",null);
		model = mv.getModelMap();
		return model;
	}
	
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/taskAssignPage/getTaskList")
	@ResponseBody
	public ModelMap getTaskList(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			if(!"".equals(jo.get(key))){
				conditionMap.put(key, jo.get(key));
			}else{
				conditionMap.put(key, null);
			}
		}
		conditionMap.put("task_content", null);
		conditionMap.put("tech_order_no", null);
		conditionMap.put("order_no", null);
		Map<String,Object> list = techService.getTaskList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/taskAssignPage/getTechList")
	@ResponseBody
	public ModelMap getTechList(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String,Object>> list = techService.queryTechList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getOrderList")
	@ResponseBody
	public ModelMap getOrderList(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			conditionMap.put(key, jo.get(key));
		}
		List<Map<String,Object>> list = techService.queryFactoryOrderList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/assignTechTask")
	@ResponseBody
	public ModelMap assignTechTask(){
		String conditions = request.getParameter("conditions");
		int result = 0;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		result = techService.assignTechTask(conditions,edit_user,curTime);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getTaskInfo")
	@ResponseBody
	public ModelMap getTaskInfo(){
		String taskid = request.getParameter("taskid");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);		
		Map<String, Object> result = techService.getTaskInfo(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/checkTaskMaterial")
	@ResponseBody
	public ModelMap checkTaskMaterial(){
		String taskid = request.getParameter("taskid");
		String check_id = request.getParameter("check_id");
		String curTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		int result = techService.checkTaskMaterial(taskid,check_id,curTime,edit_user);
		initModel(true,String.valueOf(result),null);
		return model;
	}
	
	@RequestMapping("/getTaskOrderFinishInfo")
	@ResponseBody
	public ModelMap getTaskOrderFinishInfo(){
		String taskid = request.getParameter("taskid");
		String order_no = request.getParameter("order_no");
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("taskid", taskid);
		conditionMap.put("order_no", order_no);
		Map<String, Object> result = techService.getTaskOrderFinishInfo(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
}
