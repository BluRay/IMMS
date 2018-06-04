package com.byd.bms.zzj.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.util.controller.BaseController;
import com.byd.bms.util.model.BmsBaseProcess;
import com.byd.bms.util.service.ICommonService;
import com.byd.bms.zzj.service.IZzjService;

/**
 * ZZJ Controller
 * @author xjw 2017-04-12
 */ 
@Controller
@RequestMapping("/zzj")
@Scope("prototype")
public class ZzjController extends BaseController{
	
	static Logger logger = Logger.getLogger(ZzjController.class.getName());
	@Autowired
	protected IZzjService zzjService;
	@Autowired
	protected ICommonService commonService;
	
	@RequestMapping("/importPMD")
	public ModelAndView importPMD(){ 
		mv.setViewName("zzj/importPMD");
        return mv;  
    } 
	@RequestMapping("/changePMD")
	public ModelAndView changePMD(){ 
		mv.setViewName("zzj/changePMD");
        return mv;  
    }
	@RequestMapping("/zzjPlanManage")
	public ModelAndView zzjPlanManage(){ 
		mv.setViewName("zzj/zzjPlan");
        return mv;  
    }
	@RequestMapping("/zzjOutput")
	public ModelAndView zzjOutput(){ 
		mv.setViewName("zzj/zzjOutput");
        return mv;  
    }
	
	@RequestMapping(value="/uploadPMD",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadPMD(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName=file.getOriginalFilename();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		String pmd_head_id = "0";
		try{
				ExcelModel excelModel = new ExcelModel();
				excelModel.setReadSheets(1);
				excelModel.setStart(1);
				Map<String, Integer> dataType = new HashMap<String, Integer>();
				dataType.put("0", ExcelModel.CELL_TYPE_STRING);
				dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("2", ExcelModel.CELL_TYPE_STRING);
				dataType.put("3", ExcelModel.CELL_TYPE_STRING);
				dataType.put("4", ExcelModel.CELL_TYPE_STRING);
				dataType.put("5", ExcelModel.CELL_TYPE_STRING);
				dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("8", ExcelModel.CELL_TYPE_STRING);
				dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("11", ExcelModel.CELL_TYPE_STRING);
				dataType.put("12", ExcelModel.CELL_TYPE_STRING);
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
				Map<String,Object> queryMap=new HashMap<String,Object>();
				queryMap.put("length", -1);
				//String processStr=settingService.checkProcess(queryMap,"Code");
				//新增数据列表
				List<Map<String, String>> addList = new ArrayList<Map<String, String>>();
				
				//获取车间List
				List<Map<String, Object>> workshopList = commonService.getWorkshopSelect(new HashMap<String, Object>());
				String workshopString = "";
				for(Map<String, Object> workshopMap:workshopList){
					workshopString +=workshopMap.get("name")+";";
				}
				//获取线别List
				List<Map<String, Object>> lineList = commonService.getLineSelect();
				String lineString = "";
				for(Map<String, Object> lineMap:lineList){
					lineString +=lineMap.get("name")+";";
				}
				
				//自制件类型+物料描述+装配位置集合，用于判断导入的EXCEL数据是否重复
				List<Map<String, Object>> matList = new ArrayList<Map<String, Object>>();
				
				//获取已导入的下料明细清单
				Map<String,Object> pmdinfoMap = zzjService.queryPmdInfo(param_map);
				if(null!=pmdinfoMap.get("pmd_head_id")){
					pmd_head_id = pmdinfoMap.get("pmd_head_id").toString();
				}
				List<Map<String,Object>> pmdItems =(List<Map<String,Object>>) pmdinfoMap.get("pmdItems");
				StringBuffer matBuffer = new StringBuffer();
				if(null!=pmdItems){
					for(Map map:pmdItems){
						matBuffer.append(map.get("zzj_type")+";"+map.get("mat_description")+";"+map.get("assembly_position"));
					}
				}
				
				int no = 1;
				for (Object[] data : excelModel.getData()) {
					int line=2; // 模板从第2行开始是bom数据
					String errorMessage="";
					Map<String, String> infomap = new HashMap<String, String>();
					infomap.put("no",no+"");
					
		            if(data[0] != null && !data[0].toString().equals("")){
		            	infomap.put("edit_type",data[0].toString().trim());
		            }else{
		            	errorMessage="必须填写序号！";
		            }
		            infomap.put("sap_mat", data[1] == null ? null : data[1].toString().trim());
		            if(data[2] != null && !data[2].toString().equals("")){
		            	infomap.put("zzj_type",data[2].toString().trim());
		            }else{
		            	errorMessage+="必须填写自制件类别；";
		            }
					if(data[3] != null && !data[3].toString().equals("")){
						infomap.put("mat_description",data[3].toString().trim());
		            }else{
		            	errorMessage+="必须填写物料描述；";
		            }
					if(data[4] != null && !data[4].toString().equals("")){
						infomap.put("mat_type",data[4].toString().trim());
		            }else{
		            	errorMessage+="必须填写物料类型；";
		            }
					if(data[5] != null && !data[5].toString().equals("")){
						infomap.put("specification",data[5].toString().trim());
		            }else{
		            	errorMessage+="必须填写物料/规格；";
		            }
					infomap.put("unit", data[6] == null ? null : data[6].toString().trim());
					infomap.put("loss", data[7] == null ? null : data[7].toString().trim());
					if(data[8] != null && !data[8].toString().equals("")){
						infomap.put("quantity",data[8].toString().trim());
		            }else{
		            	errorMessage+="必须填写单车用量；";
		            }
					infomap.put("weight", data[9] == null ? null : data[9].toString().trim());
					infomap.put("weight_total", data[10] == null ? null : data[10].toString().trim());
					if(data[11] != null && !data[11].toString().equals("")){
						//校验填写的车间是否在工厂下存在
						if(workshopString.indexOf(data[11].toString())>-1){
							infomap.put("use_workshop",data[11].toString().trim());
						}else{
							errorMessage+="使用车间不存在；";
						}
						
		            }else{
		            	errorMessage+="必须填写使用车间；";
		            }
					if(data[12] != null && !data[12].toString().equals("")){
						//校验填写的线别是否正确
						if(lineString.indexOf(data[12].toString())>-1){
							infomap.put("use_line",data[12].toString().trim());
						}else{
							errorMessage+="线别不存在；";
						}
		            }else{
		            	infomap.put("use_line","全部");
		            }
					infomap.put("process", data[13] == null ? null : data[13].toString().trim());
					if(data[14] != null && !data[14].toString().equals("")){
						infomap.put("assembly_position",data[14].toString().trim());
						//判断本次导入的自制件类别+物料描述+装配位置是否已在系统存在
						String mat = data[2].toString().trim() + ";" +data[3].toString().trim()+ ";" +data[14].toString().trim();
						if(matBuffer.indexOf(mat)>0){
							errorMessage+="系统已存在此行数据，不能重复导入；";
						}
					}else{
						errorMessage+="必须填写装配位置；";
					}
					infomap.put("crafts_identification", data[15] == null ? null : data[15].toString().trim());
					infomap.put("filling_size", data[16] == null ? null : data[16].toString().trim());
					infomap.put("accuracy_demand", data[17] == null ? null : data[17].toString().trim());
					infomap.put("surface_treatment", data[18] == null ? null : data[18].toString().trim());
					infomap.put("memo", data[19] == null ? null : data[19].toString().trim());
					infomap.put("crafts_memo", data[20] == null ? null : data[20].toString().trim());
					infomap.put("subcontracting_type", data[21] == null ? null : data[21].toString().trim());
					infomap.put("process_sequence", data[22] == null ? null : data[22].toString().trim());
					infomap.put("process_flow", data[23] == null ? null : data[23].toString().trim());
					infomap.put("team", data[24] == null ? null : data[24].toString().trim());
					infomap.put("change_escription", data[25] == null ? null : data[25].toString().trim());
					infomap.put("change_subject", data[26] == null ? null : data[26].toString().trim());
					
					Map<String, Object> matMap = new HashMap<String, Object>();
					String edit_type = data[0].toString().trim().equals("新增")?"修改":data[0].toString().trim();
					matMap.put("edit_type", edit_type);
					matMap.put("zzj_type", data[2].toString().trim());
					matMap.put("mat_description", data[3].toString().trim());
					matMap.put("assembly_position", data[14].toString().trim());
					matMap.put("change_type", "");
					matMap.put("change_from", "");
					matMap.put("ecn_quantity", "");
					if(matList.indexOf(matMap)!=-1 && matList.indexOf(matMap)!=(no-1)){
						//导入数据存在重复
						errorMessage+="第"+(matList.indexOf(matMap)+1)+"行数据与第"+no+"行数据重复；";
					}
					matList.add(matMap);
					
					infomap.put("error", errorMessage);
					addList.add(infomap);
					line++;
					no++;
				}
				
				Map<String, Object> rtnMap = new HashMap<String, Object>();
				rtnMap.put("addList", addList);
				rtnMap.put("pmd_head_id", pmd_head_id);
				initModel(true,"",rtnMap);
		}catch(Exception e){
			initModel(false,"模板格式有误："+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	@RequestMapping("/matPrint")
	public ModelAndView matPrint(){ 
		mv.setViewName("zzj/matPrint");
        return mv;  
    } 
	
	@RequestMapping("/savePMD")
	@ResponseBody
	public ModelMap savePMD(){
		model.clear();
		String addList=request.getParameter("addList");
		String modifyList=request.getParameter("modifyList");
		String deleteList=request.getParameter("deleteList");
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		String header_id = request.getParameter("header_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_date = df.format(new Date());
		String editor=String.valueOf(session.getAttribute("display_name"));
		//新增
		JSONArray add_arr=JSONArray.fromObject(addList);
		Iterator it=add_arr.iterator();
		List<Map<String,Object>> pmd_list=new ArrayList<Map<String,Object>>();
		Map<String,Object> param_map=new HashMap<String,Object>();
		while(it.hasNext()){
			JSONObject jel=(JSONObject) it.next();
			Map<String,Object> pmd=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			pmd.put("editor", editor);
			pmd.put("edit_date", edit_date);
			pmd_list.add(pmd);
		}
		
		//修改
		JSONArray modify_arr=JSONArray.fromObject(modifyList);
		Iterator it_m=modify_arr.iterator();
		List<Map<String,Object>> modify_list=new ArrayList<Map<String,Object>>();
		while(it_m.hasNext()){
			JSONObject jel=(JSONObject) it_m.next();
			Map<String,Object> pmd=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			pmd.put("editor", editor);
			pmd.put("edit_date", edit_date);
			modify_list.add(pmd);
		}
		//删除
		JSONArray delete_arr=JSONArray.fromObject(deleteList);
		Iterator it_d=delete_arr.iterator();
		List<Map<String,Object>> delete_list=new ArrayList<Map<String,Object>>();
		while(it_d.hasNext()){
			JSONObject jel=(JSONObject) it_d.next();
			Map<String,Object> pmd=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			pmd.put("editor", editor);
			pmd.put("edit_date", edit_date);
			delete_list.add(pmd);
		}
		
		param_map.put("pmd_list", pmd_list);
		param_map.put("modify_list", modify_list);
		param_map.put("delete_list", delete_list);
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("header_id",header_id);
		param_map.put("editor",editor);
		param_map.put("edit_date",edit_date);
		try{
			zzjService.savePmdInfo(param_map);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/changePDMSearch")
	@ResponseBody
	public ModelMap changePDMSearch(){
		model.clear();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		String mat_description=request.getParameter("mat_description");
		String zzj_type=request.getParameter("zzj_type");
		String use_workshop=request.getParameter("use_workshop");
		
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("mat_description",mat_description);
		param_map.put("zzj_type",zzj_type);
		param_map.put("use_workshop",use_workshop);
		
		Map<String,Object> all_param_map=new HashMap<String,Object>();
		all_param_map.put("order_id",order_id);
		all_param_map.put("factory_id",factory_id);
		all_param_map.put("factory_name",factory_name);
		all_param_map.put("workshop_name",workshop_name);
		all_param_map.put("line_name",line_name);
		
		try{
			//所有下料明细
			Map<String,Object> allResult = zzjService.queryPmdInfo(all_param_map);
			//需操作的下料明细
			Map<String,Object> result = zzjService.queryPmdInfo(param_map);
			Map<String,Object> rtn = new HashMap<String, Object>();
			rtn.put("allResult", allResult);
			rtn.put("result", result);
			initModel(true,"信息查询成功！",rtn);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"信息查询失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/queryZzjPlan")
	@ResponseBody
	public ModelMap queryZzjPlan(){
		model.clear();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		String batch = request.getParameter("batch");
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("batch",batch);
		
		try{
			Map<String,Object> result = zzjService.queryZzjPlan(param_map);
			initModel(true,"查询成功！",result);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"查询失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/queryFactoryOrderQuantity")
	@ResponseBody
	public ModelMap queryFactoryOrderQuantity(){
		model.clear();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		
		try{
			Map<String,Object> result = zzjService.queryFactoryOrderQuantity(param_map);
			initModel(true,"查询成功！",result);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"查询失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/addZzjPlan")
	@ResponseBody
	public ModelMap addZzjPlan(){
		model.clear();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		String batch=request.getParameter("batch");
		String quantity=request.getParameter("quantity");
		String start_date=request.getParameter("start_date");
		String end_date=request.getParameter("end_date");
		String memo=request.getParameter("memo");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_date = df.format(new Date());
		String editor=String.valueOf(session.getAttribute("user_id"));
		
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("batch","第"+batch+"批");
		param_map.put("quantity",quantity);
		param_map.put("start_date",start_date);
		param_map.put("end_date",end_date);
		param_map.put("memo",memo);
		param_map.put("edit_date",edit_date);
		param_map.put("editor",editor);
		param_map.put("status","1");
		
		try{
			int result= zzjService.addZzjPlan(param_map);
			initModel(true,"保存成功！",result);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/editZzjPlan")
	@ResponseBody
	public ModelMap editZzjPlan(){
		model.clear();
		String id=request.getParameter("id");
		String quantity=request.getParameter("quantity");
		String old_quantity = request.getParameter("old_quantity");
		String start_date=request.getParameter("start_date");
		String end_date=request.getParameter("end_date");
		String memo=request.getParameter("memo");
		String change_reason=request.getParameter("change_reason");
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_date = df.format(new Date());
		String editor=String.valueOf(session.getAttribute("user_id"));
		
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("id",id);
		param_map.put("quantity",quantity);
		if(!quantity.equals(old_quantity)){
			param_map.put("change_content","批次数量由"+old_quantity+"调整为"+quantity+";");
		}
		param_map.put("start_date",start_date);
		param_map.put("end_date",end_date);
		param_map.put("memo",memo);
		param_map.put("edit_date",edit_date);
		param_map.put("editor",editor);
		param_map.put("change_reason",change_reason);
		
		try{
			int result= zzjService.editZzjPlan(param_map);
			initModel(true,"保存成功！",result);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/deletePlan")
	@ResponseBody
	public ModelMap deletePlan(){
		model.clear();
		String id=request.getParameter("id");
		
		try{
			int result= zzjService.deleteZzjPlan(Integer.valueOf(id));
			initModel(true,"删除成功！",result);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"删除失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	public static boolean isValidDate(String str) {
	      boolean convertSuccess=true;
	       SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	       try {
	          format.setLenient(false);
	          format.parse(str);
	       } catch (ParseException e) {
	          // e.printStackTrace();
	    	   // 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
	           convertSuccess=false;
	       } 
	       return convertSuccess;
	}
	
	@RequestMapping(value="/uploadOutput",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadOutput(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName=file.getOriginalFilename();
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name"); 
		
		Map<String,Object> param_map=new HashMap<String,Object>();
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("factory",factory_name);
		param_map.put("workshop",workshop_name);
		param_map.put("line",line_name);
		
		try{
				ExcelModel excelModel = new ExcelModel();
				excelModel.setReadSheets(1);
				excelModel.setStart(1);
				Map<String, Integer> dataType = new HashMap<String, Integer>();
				dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("1", ExcelModel.CELL_TYPE_STRING);
				dataType.put("2", ExcelModel.CELL_TYPE_STRING);
				dataType.put("3", ExcelModel.CELL_TYPE_STRING);
				dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
				dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
				dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
				
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
				Map<String,Object> queryMap=new HashMap<String,Object>();
				queryMap.put("length", -1);
				//String processStr=settingService.checkProcess(queryMap,"Code");
				List<Map<String, String>> addList = new ArrayList<Map<String, String>>();
				
				//查询填写的自制件类别+物料描述是否正确
				Map<String,Object> pmdinfo = zzjService.queryPmdInfo(param_map);
				List<Map<String,Object>> pmdItems =(List<Map<String,Object>>) pmdinfo.get("pmdItems");
				StringBuffer matBuffer = new StringBuffer();
				if(null!=pmdItems){
					for(Map map:pmdItems){
						matBuffer.append(map.get("zzj_type")+";"+map.get("mat_description"));
					}
				}
				
				//查询填写的计划批次是否正确
				Map<String,Object> planMap = zzjService.queryZzjPlan(param_map);
				List<Map<String,Object>> zzjPlan =null;
				StringBuffer planBuffer = new StringBuffer();
				if(null!=planMap ){
					zzjPlan =(List<Map<String,Object>>) planMap.get("zzjPlan");
					if(zzjPlan!=null && zzjPlan.size()>0){
						for(Map map:zzjPlan){
							planBuffer.append(map.get("batch"));
						}
					}
					
				}
				//查询填写的工序是否存在
				StringBuffer processBuffer = new StringBuffer();
				List<BmsBaseProcess> processList = commonService.queryProcessList(param_map);
				if(null!=processList){
					for(BmsBaseProcess process:processList){
						processBuffer.append(process.getProcess_name());
					}
				}
				StringBuffer teamBuffer = new StringBuffer();
				List<Map<String,Object>> teamMapList = 	commonService.getTeamSelect(param_map);
				if(null!=teamMapList){
					for(Map team:teamMapList){
						teamBuffer.append(team.get("name"));
					}
				}
				
				for (Object[] data : excelModel.getData()) {
					int line=2; // 模板从第2行开始是bom数据
					String errorMessage="";
					Map<String, String> infomap = new HashMap<String, String>();
		            if(data[0] != null && !data[0].toString().equals("")){
		            	infomap.put("no",data[0].toString().trim());
		            }else{
		            	errorMessage="必须填写序号！";
		            }
		            if(data[1] != null && !data[1].toString().equals("")){
		            	infomap.put("zzj_type",data[1].toString().trim());
		            }else{
		            	errorMessage+="必须填写自制件类别；";
		            }
					if(data[2] != null && !data[2].toString().equals("")){
						infomap.put("mat_description",data[2].toString().trim());
		            }else{
		            	errorMessage+="必须填写物料描述；";
		            }
					if(data[1] != null && !data[1].toString().equals("")&& data[2] != null && !data[2].toString().equals("")){
						//查询填写的自制件类别+物料描述是否正确
						String mat = data[1].toString().trim() + ";" +data[2].toString().trim();
						if(matBuffer.indexOf(mat)==-1){
							errorMessage+="填写的自制件类别+物料描述在下料明细里不存在；";
						}
					}
					
					if(data[3] != null && !data[3].toString().equals("")){
						infomap.put("batch",data[3].toString().trim());
						//判断填写的批次是否正确
						
						if(!planBuffer.toString().contains(data[3].toString().trim())){
							errorMessage+="填写生产批次有误；";
						}
		            }else{
		            	errorMessage+="必须填写生产批次；";
		            }
					
					if(data[5] != null && !data[5].toString().equals("")){
						if(isValidDate(data[5].toString().trim())){
							infomap.put("product_date",data[5].toString().trim());
						}else{
							errorMessage+="日期格式必须为yyyy-MM-dd，如(2018-05-05)；";
						}
		            }else{
		            	errorMessage+="必须填写生产日期；";
		            }
					if(data[6] != null && !data[6].toString().equals("")){
						infomap.put("process", data[6] == null ? null : data[6].toString().trim());
						//判断填写的工序是否正确
						if(processBuffer.indexOf(data[6].toString().trim())==-1){
							errorMessage+="填写生产工序有误；";
						}
		            }else{
		            	errorMessage+="必须填写生产工序；";
		            }
					
					if(data[4] != null && !data[4].toString().equals("")&&data[4].toString().trim().matches("^\\+?[1-9][0-9]*$")){
						infomap.put("quantity",data[4].toString().trim());
						//判断填写的生产数量是否超出计划数量
						param_map.put("zzj_type", data[1].toString().trim());
						param_map.put("mat_desc", data[2].toString().trim());
						param_map.put("batch", data[3].toString().trim());
						param_map.put("process", data[6].toString().trim());
						
						Map<String,Object> plan_done = zzjService.queryMatOutput(param_map);
						if(plan_done.isEmpty()){
							errorMessage+="请先维护下料计划！";
						}else{
							int plan_num=(int)plan_done.get("plan_quantity");
							int done_num=new Double((double) plan_done.get("done_quantity")).intValue();
							int quantity = new Double(data[4].toString()).intValue();
							if((quantity+done_num)>plan_num){//超出
								errorMessage+="累计完成产量加上本次输入的产量超出计划数量；";
							}
						}					
		            }else{
		            	errorMessage+="生产数量必须为大于0的正整数；";
		            }
					
					if(data[7] != null && !data[7].toString().equals("")){
						infomap.put("team", data[7].toString().trim());
						if(teamBuffer.indexOf(data[7].toString().trim())==-1){
							errorMessage+="填写班组有误；";
						}
		            }else{
		            	infomap.put("team", data[7] == null ? null : data[7].toString().trim());
		            }
					
					infomap.put("memo", data[8] == null ? null : data[8].toString().trim());
					
					infomap.put("error", errorMessage);
					addList.add(infomap);
					line++;
				}
				initModel(true,"",addList);
		}catch(Exception e){
			initModel(false,"模板格式有误："+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	@RequestMapping("/saveOutput")
	@ResponseBody
	public ModelMap saveOutput(){
		model.clear();
		String addList=request.getParameter("addList");
		String order_id=request.getParameter("order_id");
		String factory_id=request.getParameter("factory_id");
		String factory_name=request.getParameter("factory_name");
		String workshop_name=request.getParameter("workshop_name");
		String line_name=request.getParameter("line_name");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_date = df.format(new Date());
		String editor_id=String.valueOf(session.getAttribute("display_name"));
		JSONArray add_arr=JSONArray.fromObject(addList);
		Iterator it=add_arr.iterator();
		List<Map<String,Object>> output_list=new ArrayList<Map<String,Object>>();
		Map<String,Object> param_map=new HashMap<String,Object>();
		while(it.hasNext()){
			JSONObject jel=(JSONObject) it.next();
			Map<String,Object> pmd=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			output_list.add(pmd);
		}
		param_map.put("output_list", output_list);
		param_map.put("order_id",order_id);
		param_map.put("factory_id",factory_id);
		param_map.put("factory_name",factory_name);
		param_map.put("workshop_name",workshop_name);
		param_map.put("line_name",line_name);
		param_map.put("workshop",workshop_name);
		param_map.put("line",line_name);
		param_map.put("editor_id",editor_id);
		param_map.put("edit_date",edit_date);
		try{
			zzjService.importOutput(param_map);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		
		return mv.getModelMap();
	}
	
	@RequestMapping("/showMatList")
	@ResponseBody
	public ModelMap showMatList(){
		model.clear();
		String order_no = request.getParameter("order_no");
		String factory = request.getParameter("factory");
		String zzj_type =  request.getParameter("zzj_type");
		String mat_desc = request.getParameter("mat_desc");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_no", order_no);
		condMap.put("factory", factory);
		condMap.put("zzj_type", zzj_type);
		condMap.put("mat_desc", mat_desc);
		
		zzjService.getMatList(condMap,model);
		return model;		
	}
	
	@RequestMapping("/afterMatPrint")
	@ResponseBody
	public ModelMap afterMatPrint(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String matIds=request.getParameter("matIds");
		String printer=(String)session.getAttribute("display_name");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		condMap.put("matIds", matIds);
		condMap.put("printer", printer);
		condMap.put("print_date", curTime);
		
		zzjService.updateMatById(condMap,model);
		
		return model;
	}
	
	@RequestMapping("/getZzjTypeList")
	@ResponseBody
	public ModelMap getZzjTypeList(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_no = request.getParameter("order_no");
		String factory = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		condMap.put("order_no", order_no);
		condMap.put("factory", factory);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		
		zzjService.getZzjTypeList(condMap,model);
		return model;
	}
	

	@RequestMapping("/getBatchList")
	@ResponseBody
	public ModelMap getBatchList(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory = request.getParameter("factory");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		condMap.put("order_id", order_id);
		condMap.put("factory", factory);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		
		zzjService.getBatchList(condMap,model);
		return model;
	}
	
	@RequestMapping("/matEnter_Mobile")
	public ModelAndView matEnter_Mobile(){ 
		mv.setViewName("zzj/matEnter_Mobile");
        return mv;  
    } 
	
	@RequestMapping("/getMatInfo")
	@ResponseBody
	public ModelMap getMatInfo(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_no = request.getParameter("order_no");
		String factory = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		condMap.put("order_no", order_no);
		condMap.put("factory", factory);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		
		zzjService.getMatInfo(condMap,model);
		return model;
	}
	
	
	@RequestMapping("/enterMatOutput")
	@ResponseBody
	public ModelMap enterMatOutput(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String output_id = request.getParameter("output_id");
		String factory_id = request.getParameter("factory_id");
		String factory = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String team = request.getParameter("team");
		String process = request.getParameter("process");
		String zzj_type = request.getParameter("zzj_type");
		String batch_old = request.getParameter("batch_old");
		String batch = request.getParameter("batch");
		String quantity = request.getParameter("quantity");
		String product_date = request.getParameter("product_date");
		String memo = request.getParameter("memo");
		String editor=(String)session.getAttribute("display_name");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		condMap.put("output_id", output_id);
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory_id);
		condMap.put("factory", factory);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("team", team);
		condMap.put("process", process);
		condMap.put("zzj_type", zzj_type);
		condMap.put("batch", batch);
		condMap.put("quantity", quantity);
		condMap.put("product_date", product_date);
		condMap.put("memo", memo);
		condMap.put("editor", editor);
		condMap.put("edit_date", curTime);
		condMap.put("batch_old", batch_old);
		
		zzjService.enterMatOutput(condMap,model);
		return model;
	}
	
	@RequestMapping(value="/matUpdate_Mobile")
	public ModelAndView matUpdate_Mobile() throws UnsupportedEncodingException { 
		byte source []=null;
		mv.getModelMap().put("order_no", request.getParameter("order_no"));
		String mat_desc=request.getParameter("mat_desc");
		source= mat_desc.getBytes("iso8859-1");
		mat_desc=new String (source,"UTF-8");
		mv.getModelMap().put("mat_desc", mat_desc);
		mv.getModelMap().put("output_id", request.getParameter("output_id"));
		mv.getModelMap().put("order_id", request.getParameter("order_id"));
		mv.getModelMap().put("factory_id", request.getParameter("factory_id"));
		String workshop=request.getParameter("workshop");
		source = workshop.getBytes("iso8859-1");
		workshop=new String (source,"UTF-8");
		mv.getModelMap().put("workshop", workshop);
		String line=request.getParameter("line");
		source = line.getBytes("iso8859-1");
		line=new String (source,"UTF-8");
		mv.getModelMap().put("line", line);
		String process=request.getParameter("process");
		source = process.getBytes("iso8859-1");
		process=new String (source,"UTF-8");
		mv.getModelMap().put("process", process);
		String batch=request.getParameter("batch");
		source = batch.getBytes("iso8859-1");
		batch=new String (source,"UTF-8");
		mv.getModelMap().put("batch", batch);
		mv.getModelMap().put("output", request.getParameter("output"));
		mv.getModelMap().put("product_date", request.getParameter("product_date"));
		String team=request.getParameter("team");
		source = team.getBytes("iso8859-1");
		team=new String (source,"UTF-8");
		mv.getModelMap().put("team", team);
		String zzj_type=request.getParameter("zzj_type");
		source = zzj_type.getBytes("iso8859-1");
		zzj_type=new String (source,"UTF-8");
		mv.getModelMap().put("zzj_type", zzj_type);
		mv.setViewName("zzj/matUpdate_Mobile");
        return mv;  
    } 
	
	@RequestMapping("/matDelete")
	@ResponseBody
	public ModelMap matDelete(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String output_id = request.getParameter("output_id");
		String factory_id = request.getParameter("factory_id");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String batch = request.getParameter("batch");
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory_id);
		condMap.put("output_id", output_id);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("batch", batch);
		
		zzjService.deleteMatOutput(condMap,model);
		return model;
	}
	/**
	 * 自制件产量录入明细查询报表
	 * @return
	 */
	@RequestMapping("/matOutputReport")
	public ModelAndView matOutputReport(){
		mv.setViewName("zzj/matOutputReport");
        return mv; 
	}
	
	@RequestMapping("/getOutputDetailList")
	@ResponseBody
	public ModelMap getOutputDetailList(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_no = request.getParameter("order_no");
		String factory = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String team = request.getParameter("team");
		String batch = request.getParameter("batch");
		String zzj_type = request.getParameter("zzj_type");
		String process = request.getParameter("process");
		String start_date = request.getParameter("start_date");
		String end_date = request.getParameter("end_date");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_no", order_no);
		condMap.put("factory", factory);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("team", team);
		condMap.put("batch", batch);
		condMap.put("zzj_type", zzj_type);
		condMap.put("process", process);
		condMap.put("start_date", start_date);
		condMap.put("end_date", end_date);
		
		zzjService.getOutputDetailList(condMap,model);
		return model;
	}
	
	/**
	 * 自制件产量达成汇总查询报表
	 * @return
	 */
	@RequestMapping("/matOutputCountReport")
	public ModelAndView matOutputCountReport(){
		mv.setViewName("zzj/matOutputCountReport");
        return mv; 
	}
	
	/**
	 * 获取产量达成汇总报表数据
	 * @return
	 */
	@RequestMapping("/getOutputCountData")
	@ResponseBody
	public ModelMap getOutputCountData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory = request.getParameter("factory");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String batch = request.getParameter("batch");
		String zzj_type = request.getParameter("zzj_type");
		String process = request.getParameter("process");
/*		int page=Integer.parseInt(request.getParameter("page"));//分页数据起始数
		int page_size=Integer.parseInt(request.getParameter("rows"));//每一页数据条数	
		condMap.put("start", page*page_size+1);
		condMap.put("length", page_size);*/
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
/*		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
*/		
		condMap.put("draw", draw);
		/*condMap.put("start", start);
		condMap.put("length", length);*/
		condMap.put("order_id", order_id);
		condMap.put("factory", factory);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("batch", batch);
		condMap.put("zzj_type", zzj_type);
		condMap.put("process", process);

		zzjService.getOutputCountData(condMap,model);
		return model;
	}
	
	/**
	 * 自制件产量达成明细查询报表
	 * @return
	 */
	@RequestMapping("/matOutputCountDetail")
	public ModelAndView matOutputCountDetailReport(){
		mv.setViewName("zzj/matOutputCountDetailReport");
        return mv; 
	}
	
	/**
	 * 获取产量达成明细报表数据
	 * @return
	 */
	@RequestMapping("/getOutputCountDetailData")
	@ResponseBody
	public ModelMap getOutputCountDetailData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory_id = request.getParameter("factory");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String batch = request.getParameter("batch");
		String zzj_type = request.getParameter("zzj_type");
		String process = request.getParameter("process");
		String mat_desc = request.getParameter("mat_desc");
		String status = request.getParameter("status");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory_id);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("batch", batch);
		condMap.put("zzj_type", zzj_type);
		condMap.put("mat_desc", mat_desc);
		condMap.put("process", process);
		condMap.put("status", status);

		zzjService.getOutputCountDetailData(condMap,model);
		return model;
	}
	
	/**
	 * 自制件产量批次达成报表
	 * @return
	 */
	@RequestMapping("/matOutputBatchCountReport")
	public ModelAndView matOutputBatchCountReport(){
		mv.setViewName("zzj/matOutputBatchCountReport");
        return mv; 
	}
	
	/**
	 * 获取产量批次达成报表数据
	 * @return
	 */
	@RequestMapping("/getOutputBatchCountData")
	@ResponseBody
	public ModelMap getOutputBatchCountData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory_id = request.getParameter("factory");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String batch = request.getParameter("batch");
		String zzj_type = request.getParameter("zzj_type");
		String process = request.getParameter("process");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory_id);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("batch", batch);
		condMap.put("zzj_type", zzj_type);
		condMap.put("process", process);

		zzjService.getOutputBatchCountData(condMap,model);
		return model;
	}
	
	/************************ tangjin start  **********************/
	// 电泳件外发
	@RequestMapping("/electrophoresisOuter")
	public ModelAndView electrophoresisOuter(){ 
		mv.setViewName("zzj/electrophoresisOuter");
        return mv;  
    } 

	@RequestMapping("/matQuery_Mobile")
	public ModelAndView matQuery(){ 
		mv.setViewName("zzj/matQuery_Mobile");
        return mv;  
    } 
	
	@RequestMapping("/getMatOutputData")
	@ResponseBody
	public ModelMap getMatOutputData(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		String product_date = request.getParameter("product_date");
		String process = request.getParameter("process");
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		condMap.put("product_date", product_date);
		condMap.put("process", process);
		
		zzjService.getMatOutputData(condMap,model);
		return model;
	}

	// 电泳件进仓
	@RequestMapping("/electrophoresisEnter")
	public ModelAndView electrophoresisEnter(){
//		String business_type = request.getParameter("business_type");
//		mv.getModelMap().addAttribute("business_type", business_type);
		mv.setViewName("zzj/electrophoresisEnter");
        return mv;  
    } 
	
	// 电泳件添加
	@RequestMapping("/electrophoresisAdd")
	public ModelAndView electrophoresisAdd(){ 
		mv.setViewName("zzj/electrophoresisAdd");
        return mv;  
    } 
	
	@RequestMapping("/getElectrophoresisList")
	@ResponseBody
	public ModelMap getElectrophoresisList(){
		model.clear();
		String order_id = request.getParameter("order_id");
		String factory_name = request.getParameter("factory_name");
		String workshop_name = request.getParameter("workshop_name");
		String line_name = request.getParameter("line_name");
		String batch = request.getParameter("batch");
		String business_date_start = request.getParameter("business_date_start");
		String business_date_end = request.getParameter("business_date_end");
		String zzj_type =  request.getParameter("zzj_type");
		String mat_description = request.getParameter("mat_description");
		String type = request.getParameter("type");
		String business_type = request.getParameter("business_type");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_id", order_id);
		condMap.put("factory_name", factory_name);
		condMap.put("zzj_type", zzj_type);
		condMap.put("mat_description", mat_description);
		condMap.put("batch", batch);
		condMap.put("workshop_name", workshop_name);
		condMap.put("line_name", line_name);
		condMap.put("business_date_start", business_date_start);
		condMap.put("business_date_end", business_date_end);
		condMap.put("type", type);
		condMap.put("business_type", business_type);
		zzjService.getElectrophoresisList(condMap,model);
		return model;		
	}
	@RequestMapping("/getZzjBatchList")
	@ResponseBody
	public ModelMap getZzjBatchList(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		String order_id = request.getParameter("order_id");
		String factory_id = request.getParameter("factory");
		String mat_desc = request.getParameter("mat_desc");
		String workshop =  request.getParameter("workshop");
		String line = request.getParameter("line");
		condMap.put("order_id", order_id);
		condMap.put("factory_id", factory_id);
		condMap.put("mat_desc", mat_desc);
		condMap.put("workshop", workshop);
		condMap.put("line", line);
		
		zzjService.getZzjBatchList(condMap,model);
		return model;
	}
	@RequestMapping("/getMatListMatDesc")
	@ResponseBody
	public ModelMap getMatListMatDesc(){
		model.clear();
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("workshop_name", request.getParameter("workshop_name"));
		condMap.put("line_name", request.getParameter("line_name"));
		condMap.put("mat_desc", request.getParameter("mat_desc"));
		zzjService.getMatListMatDesc(condMap,model);
		return model;		
	}
	
    @RequestMapping("/saveElectrophoresis")
	@ResponseBody
	public ModelMap saveElectrophoresis(){
		String datalist=request.getParameter("datalist");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String user_id=String.valueOf(session.getAttribute("user_id"));
		JSONArray jsonArray=JSONArray.fromObject(datalist);
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		for(int i=0;i<jsonArray.size();i++){
			JSONObject object = (JSONObject)jsonArray.get(i);		
			object.put("editor", user_id);
			object.put("edit_date", curTime);
			Map<String, Object> map = (Map<String, Object>) object;
			list.add(map);
		}
		int result=zzjService.saveElectrophoresis(list);
		Map<String,Object> map=new HashMap<String,Object>();
		if(result>0){
			map.put("success", true);
		}else{
			map.put("success", false);
		}
		mv.clear();
		mv.getModelMap().addAllAttributes(map);
		model = mv.getModelMap();
		return model;
	}
    @RequestMapping("/updateElectrophoresis")
	@ResponseBody
	public ModelMap updateElectrophoresis(){
		String id=request.getParameter("id");
		String batch=request.getParameter("batch");
		String vendor=request.getParameter("vendor");
		String quantity=request.getParameter("quantity");
		String business_date=request.getParameter("business_date");
		String memo=request.getParameter("memo");
		Map<String,Object> condmap=new HashMap<String,Object>();
		condmap.put("id", id);
		condmap.put("batch", batch);
		condmap.put("vendor", vendor);
		condmap.put("quantity", quantity);
		condmap.put("business_date", business_date);
		condmap.put("memo", memo);
		int result=zzjService.updateElectrophoresis(condmap);
		Map<String,Object> map=new HashMap<String,Object>();
		if(result>0){
			map.put("success", true);
		}else{
			map.put("success", false);
		}
		mv.clear();
		mv.getModelMap().addAllAttributes(map);
		model = mv.getModelMap();
		return model;
	}
    
    @RequestMapping("/delElectrophoresis")
	@ResponseBody
	public ModelMap delElectrophoresis(){
		String id=request.getParameter("id");
		int result=zzjService.delElectrophoresis(id);
		Map<String,Object> map=new HashMap<String,Object>();
		if(result>0){
			map.put("success", true);
		}else{
			map.put("success", false);
		}
		mv.clear();
		mv.getModelMap().addAllAttributes(map);
		model = mv.getModelMap();
		return model;
	}
    // 自制件车间供应
  	@RequestMapping("/zzjWorkshopSupply")
  	public ModelAndView zzjWorkshopSupply(){ 
  		mv.setViewName("zzj/zzjWorkshopSupply");
          return mv;  
      } 
  	
  	@RequestMapping("/getWorkshopSupplyList")
 	@ResponseBody
 	public ModelMap getWorkshopSupplyList(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String order_no = request.getParameter("order_no");
 		String factory_id = request.getParameter("factory_id");
 		String delivery_workshop = request.getParameter("delivery_workshop");
 		String line_name = request.getParameter("line_name");
 		String receiving_workshop = request.getParameter("receiving_workshop");
 		String business_date_start = request.getParameter("business_date_start");
 		String business_date_end = request.getParameter("business_date_end");
 		String business_date =  request.getParameter("business_date");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		int draw=request.getParameter("draw")!=null ? Integer.parseInt(request.getParameter("draw")): 1;//jquerydatatables 
 		int start=request.getParameter("start")!=null ? Integer.parseInt(request.getParameter("start")) : 0;//分页数据起始数
 		int length=request.getParameter("length")!=null ? Integer.parseInt(request.getParameter("length")) : -1;//每一页数据条数
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("draw", draw);
 		condMap.put("start", start);
 		condMap.put("length", length);
 		condMap.put("order_id", order_id);
 		condMap.put("order_no", order_no);
 		condMap.put("factory_id", factory_id);
 		condMap.put("receiving_workshop", receiving_workshop);
 		condMap.put("delivery_workshop", delivery_workshop);
 		condMap.put("line_name", line_name);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		condMap.put("business_date_start", business_date_start);
 		condMap.put("business_date_end", business_date_end);
 		condMap.put("business_date", business_date);
 		zzjService.getWorkshopSupplyList(condMap,model);
 		return model;		
 	}
  	@RequestMapping("/saveWorkshopSupplyByBatch")
 	@ResponseBody
 	public ModelMap saveWorkshopSupplyByBatch(){
 		String datalist=request.getParameter("datalist");
 		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 		String curTime = df.format(new Date());
 		String user_id=String.valueOf(session.getAttribute("user_id"));
 		JSONArray jsonArray=JSONArray.fromObject(datalist);
 		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
 		for(int i=0;i<jsonArray.size();i++){
 			JSONObject object = (JSONObject)jsonArray.get(i);		
 			object.put("editor", user_id);
 			object.put("edit_date", curTime);
 			object.put("business_date", curTime.substring(0, 10));
 			Map<String, Object> map = (Map<String, Object>) object;
 			list.add(map);
 		}
 		int result=zzjService.saveWorkshopSupply(list);
 		Map<String,Object> map=new HashMap<String,Object>();
 		if(result>0){
 			map.put("success", true);
 		}else{
 			map.put("success", false);
 		}
 		mv.clear();
 		mv.getModelMap().addAllAttributes(map);
 		model = mv.getModelMap();
 		return model;
 	}
     @RequestMapping("/updateWorkshopSupply")
 	@ResponseBody
 	public ModelMap updateWorkshopSupply(){
 		String id=request.getParameter("id");
 		String batch=request.getParameter("batch");
 		String vendor=request.getParameter("vendor");
 		String quantity=request.getParameter("quantity");
 		String business_date=request.getParameter("business_date");
 		String memo=request.getParameter("memo");
 		Map<String,Object> condmap=new HashMap<String,Object>();
 		condmap.put("id", id);
 		condmap.put("batch", batch);
 		condmap.put("vendor", vendor);
 		condmap.put("quantity", quantity);
 		condmap.put("business_date", business_date);
 		condmap.put("memo", memo);
 		int result=zzjService.updateWorkshopSupply(condmap);
 		Map<String,Object> map=new HashMap<String,Object>();
 		if(result>0){
 			map.put("success", true);
 		}else{
 			map.put("success", false);
 		}
 		mv.clear();
 		mv.getModelMap().addAllAttributes(map);
 		model = mv.getModelMap();
 		return model;
 	}
     @RequestMapping("/delWorkshopSupply")
 	@ResponseBody
 	public ModelMap delWorkshopSupply(){
 		String id=request.getParameter("id");
 		int result=zzjService.delWorkshopSupply(id);
 		Map<String,Object> map=new HashMap<String,Object>();
 		if(result>0){
 			map.put("success", true);
 		}else{
 			map.put("success", false);
 		}
 		mv.clear();
 		mv.getModelMap().addAllAttributes(map);
 		model = mv.getModelMap();
 		return model;
 	}
     // 自制件车间供应新增
   	@RequestMapping("/zzjWorkshopSupplyAdd")
   	public ModelAndView zzjWorkshopSupplyAdd(){ 
   		mv.setViewName("zzj/zzjWorkshopSupplyAdd");
 	    return mv;  
 	} 
   	@RequestMapping("/getWorkshopSupplyAddByMap")
 	@ResponseBody
 	public ModelMap getWorkshopSupplyAddByMap(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String workshop_name = request.getParameter("workshop_name");
 		String line_name = request.getParameter("line_name");
 		String use_workshop = request.getParameter("use_workshop");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("use_workshop", use_workshop);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("line_name", line_name);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		zzjService.getWorkshopSupplyAddByMap(condMap,model);
 		return model;		
 	}
    // 自制件车间供应查询 移动端
   	@RequestMapping("/zzjWorkshopSupplyQuery_Mobile")
   	public ModelAndView zzjWorkshopSupplyQuery_Mobile(){ 
   		mv.setViewName("zzj/zzjWorkshopSupplyQuery_Mobile");
 	    return mv;  
 	} 
   	@RequestMapping(value="/zzjWorkshopSupplyUpdate_Mobile")
	public ModelAndView zzjWorkshopSupplyUpdate_Mobile() throws UnsupportedEncodingException { 
		byte source []=null;
		mv.getModelMap().put("order_no", request.getParameter("order_no"));
		String mat_description=request.getParameter("mat_description");
		source= mat_description.getBytes("iso8859-1");
		mat_description=new String (source,"UTF-8");
		mv.getModelMap().put("mat_description", mat_description);
		mv.getModelMap().put("id", request.getParameter("id"));
		String receiving_workshop=request.getParameter("receiving_workshop");
		source = receiving_workshop.getBytes("iso8859-1");
		receiving_workshop=new String (source,"UTF-8");
		mv.getModelMap().put("receiving_workshop", receiving_workshop);
		String order_desc=request.getParameter("order_desc");
		source = order_desc.getBytes("iso8859-1");
		order_desc=new String (source,"UTF-8");
		mv.getModelMap().put("order_desc", order_desc);
		String zzj_type=request.getParameter("zzj_type");
		source = zzj_type.getBytes("iso8859-1");
		zzj_type=new String (source,"UTF-8");
		mv.getModelMap().put("zzj_type", zzj_type);
		String factory_name=request.getParameter("factory_name");
		source = factory_name.getBytes("iso8859-1");
		factory_name=new String (source,"UTF-8");
		mv.getModelMap().put("factory_name", factory_name);
		String delivery_workshop=request.getParameter("delivery_workshop");
		source = delivery_workshop.getBytes("iso8859-1");
		delivery_workshop=new String (source,"UTF-8");
		mv.getModelMap().put("delivery_workshop", delivery_workshop);
		String line_name=request.getParameter("line_name");
		source = line_name.getBytes("iso8859-1");
		line_name=new String (source,"UTF-8");
		mv.getModelMap().put("line_name", line_name);
		mv.getModelMap().put("demand_quantity", request.getParameter("demand_quantity"));
		mv.getModelMap().put("received_quantity", request.getParameter("received_quantity"));
		mv.getModelMap().put("quantity", request.getParameter("quantity"));
		mv.getModelMap().put("business_date", request.getParameter("business_date"));
		mv.setViewName("zzj/zzjWorkshopSupplyUpdate_Mobile");
        return mv;  
    } 
    // 自制件车间供应新增移动版
   	@RequestMapping("/zzjWorkshopSupplyAdd_Mobile")
   	public ModelAndView zzjWorkshopSupplyAdd_Mobile(){ 
   		mv.setViewName("zzj/zzjWorkshopSupplyAdd_Mobile");
 	    return mv;  
 	} 
   	@RequestMapping("/saveWorkshopSupply")
 	@ResponseBody
 	public ModelMap saveWorkshopSupply(){
 		String order_id=request.getParameter("order_id");
 		String factory_id=request.getParameter("factory_id");
 		String factory_name=request.getParameter("factory_name");
 		String receiving_workshop=request.getParameter("receiving_workshop");
 		String delivery_workshop=request.getParameter("delivery_workshop");
 		String line_name=request.getParameter("line_name");
 		String mat_description=request.getParameter("mat_description");
 		String zzj_type=request.getParameter("zzj_type");
 		String quantity=request.getParameter("quantity");
 		String business_date=request.getParameter("business_date");
 		String business_type=request.getParameter("business_type");
 		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 		String curTime = df.format(new Date());
 		String user_id=String.valueOf(session.getAttribute("user_id"));
 		
 		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
 		Map<String, Object> map = new HashMap<String, Object>();
 		map.put("order_id", order_id);
 		map.put("factory_id", factory_id);
 		map.put("factory_name", factory_name);
 		map.put("receiving_workshop", receiving_workshop);
 		map.put("delivery_workshop", delivery_workshop);
 		map.put("line_name", line_name);
 		map.put("mat_description", mat_description);
 		map.put("zzj_type", zzj_type);
 		map.put("quantity", quantity);
 		map.put("editor", user_id);
 		map.put("edit_date", curTime);
 		map.put("business_date", business_date);
 		map.put("business_type", business_type);	
 		list.add(map);
 		
 		int result=zzjService.saveWorkshopSupply(list);
 		//Map<String,Object> retmap=new HashMap<String,Object>();
 		if(result>0){
 			map.put("success", true);
 		}else{
 			map.put("success", false);
 		}
 		mv.clear();
 		mv.getModelMap().addAllAttributes(map);
 		model = mv.getModelMap();
 		return model;
 	}
    // 自制件下料明细查询报表
   	@RequestMapping("/zzjPMDQuery")
   	public ModelAndView zzjPMDQuery(){ 
   		mv.setViewName("zzj/zzjPMDQuery");
   		Map<String, Object> map = new HashMap<String, Object>();
   		map.put("order_id",request.getParameter("order_id"));
		map.put("order_no",request.getParameter("order_no"));
	    map.put("order_desc",request.getParameter("order_desc"));
	    map.put("factory_id",request.getParameter("factory_id"));
	    map.put("zzj_type",request.getParameter("zzj_type"));
		mv.getModelMap().addAllAttributes(map);
 	    return mv;  
 	} 
   	// 自制件下料明细查询报表
   	@RequestMapping("/getPmdByMap")
 	@ResponseBody
 	public ModelMap getPmdByMap(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String zzj_type =  request.getParameter("zzj_type");
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("zzj_type", zzj_type);
 		zzjService.getPmdByMap(condMap,model);
 		return model;		
 	}
    // 自制件下料明细查询报表
   	@RequestMapping("/zzjPMDDetailQuery")
   	public ModelAndView zzjPMDDetailQuery(){ 
   		mv.setViewName("zzj/zzjPMDDetailQuery");
   		Map<String, Object> map = new HashMap<String, Object>();
   		map.put("order_id",request.getParameter("order_id"));
		map.put("order_no",request.getParameter("order_no"));
	    map.put("order_desc",request.getParameter("order_desc"));
	    map.put("factory_id",request.getParameter("factory_id"));
	    map.put("zzj_type",request.getParameter("zzj_type"));
	    map.put("default_zzj_type",request.getParameter("default_zzj_type"));
		mv.getModelMap().addAllAttributes(map);
 	    return mv;  
 	} 
 // 自制件下料明细查询报表
   	@RequestMapping("/getPmdDetailByMap")
 	@ResponseBody
 	public ModelMap getPmdDetailByMap(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		String type = request.getParameter("type");
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		condMap.put("type", type);  // [0:最新数据；1：变更数据]
 		zzjService.getPmdDetailByMap(condMap,model);
 		return model;		
 	}
    // 电泳件外发进仓明细查询报表
   	@RequestMapping("/electrophoresisQuery")
   	public ModelAndView electrophoresisQuery(){ 
   		Map<String, Object> map = new HashMap<String, Object>();
   		map.put("order_id",request.getParameter("order_id"));
		map.put("order_no",request.getParameter("order_no"));
	    map.put("order_desc",request.getParameter("order_desc"));
	    map.put("factory_id",request.getParameter("factory_id"));
	    map.put("zzj_type",request.getParameter("zzj_type"));
	    map.put("total_kind",request.getParameter("total_kind"));
		mv.getModelMap().addAllAttributes(map);
   		mv.setViewName("zzj/electrophoresisQuery");
 	    return mv;  
 	} 
   	@RequestMapping("/getEelectrophoresisByBatch")
 	@ResponseBody
 	public ModelMap getEelectrophoresisByBatch(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String workshop_name = request.getParameter("workshop_name");
 		String use_workshop = request.getParameter("use_workshop");
 		String line_name = request.getParameter("line_name");
 		String batch =  request.getParameter("batch");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		String kind = request.getParameter("kind");
 		int draw=request.getParameter("draw")!=null ? Integer.parseInt(request.getParameter("draw")): 1;//jquerydatatables 
 		int start=request.getParameter("start")!=null ? Integer.parseInt(request.getParameter("start")) : 0;//分页数据起始数
 		int length=request.getParameter("length")!=null ? Integer.parseInt(request.getParameter("length")) : -1;//每一页数据条数
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("draw", draw);
 		condMap.put("start", start);
 		condMap.put("length", length);
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("use_workshop", use_workshop);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("line_name", line_name);
 		condMap.put("batch", batch);
 		condMap.put("kind", kind);
 		zzjService.getElectrophoresisByBatchList(condMap,model);
 		return model;		
 	}
	@RequestMapping("/getEelectrophoresisByOrder")
 	@ResponseBody
 	public ModelMap getEelectrophoresisByOrder(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String workshop_name = request.getParameter("workshop_name");
 		String use_workshop = request.getParameter("use_workshop");
 		String batch =  request.getParameter("batch");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		String kind = request.getParameter("kind");
 		String totalkind = request.getParameter("total_kind");
 		int draw=request.getParameter("draw")!=null ? Integer.parseInt(request.getParameter("draw")): 1;//jquerydatatables 
 		int start=request.getParameter("start")!=null ? Integer.parseInt(request.getParameter("start")) : 0;//分页数据起始数
 		int length=request.getParameter("length")!=null ? Integer.parseInt(request.getParameter("length")) : -1;//每一页数据条数
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("draw", draw);
 		condMap.put("start", start);
 		condMap.put("length", length);
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("use_workshop", use_workshop);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		condMap.put("batch", batch);
 		condMap.put("kind", kind);
 		condMap.put("totalkind", totalkind);
 		zzjService.getElectrophoresisByOrderList(condMap,model);
 		return model;		
 	}
    // 电泳件按订单分类汇总查询报表
   	@RequestMapping("/electrophoresisTotalQuery")
   	public ModelAndView electrophoresisTotalQuery(){ 
   		mv.setViewName("zzj/electrophoresisTotalQuery");
 	    return mv;  
 	} 
   	@RequestMapping("/getEelectrophoresisTotal")
 	@ResponseBody
 	public ModelMap getEelectrophoresisTotal(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String workshop_name = request.getParameter("workshop_name");
 		String line_name = request.getParameter("line_name");
 		String use_workshop = request.getParameter("use_workshop");
 		String zzj_type =  request.getParameter("zzj_type");
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("line_name", line_name);
 		condMap.put("use_workshop", use_workshop);
 		condMap.put("zzj_type", zzj_type);
 		zzjService.getElectrophoresisTotalList(condMap,model);
 		return model;		
 	}
   	@RequestMapping("/checkEelectroEnterQuantity")
 	@ResponseBody
 	public ModelMap checkEelectroEnterQuantity(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_name = request.getParameter("factory_name");
 		String workshop_name = request.getParameter("workshop_name");
 		String line_name = request.getParameter("line_name");
 		String batch =  request.getParameter("batch");
 		String zzj_type =  request.getParameter("zzj_type");
 		String mat_description = request.getParameter("mat_description");
 		int quantity=Integer.parseInt(request.getParameter("quantity"));
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_name", factory_name);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("mat_description", mat_description);
 		condMap.put("batch", batch);
 		condMap.put("line_name", line_name);
 		// 已外发未进仓的电泳件数量
 		int quantityOuter=zzjService.checkElectroEnterQuantity(condMap);
 		if(quantity>quantityOuter){
 			model.addAttribute("success", false);
 			model.addAttribute("maxQuantity", quantityOuter);
 		}else{
 			model.addAttribute("success", true);
 		}
 		return model;		
 	}
   	@RequestMapping("/getElectrophoresisUnOuterList")
 	@ResponseBody
 	public ModelMap getElectrophoresisUnOuterList(){
 		model.clear();
 		String order_id = request.getParameter("order_id");
 		String factory_id = request.getParameter("factory_id");
 		String workshop_name = request.getParameter("workshop_name");
 		String line_name = request.getParameter("line_name");
 		String zzj_type =  request.getParameter("zzj_type");
 		String use_workshop =  request.getParameter("use_workshop");
 		Map<String,Object> condMap=new HashMap<String,Object>();
 		condMap.put("order_id", order_id);
 		condMap.put("factory_id", factory_id);
 		condMap.put("workshop_name", workshop_name);
 		condMap.put("zzj_type", zzj_type);
 		condMap.put("use_workshop", use_workshop);
 		condMap.put("line_name", line_name);
 		// 已外发未进仓的电泳件数量
 		zzjService.getElectrophoresisUnOuterList(condMap, model);
 		return model;		
 	}
   	
 	/************************ tangjin end **********************/
   	
	@RequestMapping("/matEnter")
	public ModelAndView matEnter(){ 
		mv.setViewName("zzj/matEnter");
        return mv;  
    } 
	
	@RequestMapping("/enterMatOutputBatch")
	@ResponseBody
	public ModelMap enterMatOutputBatch() {
		model.clear();
		Map<String,Object> param_map=new HashMap<String,Object>();
		String addList=request.getParameter("addList");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 		String curTime = df.format(new Date());
 		String user_name=String.valueOf(session.getAttribute("display_name"));
 		JSONArray add_arr=JSONArray.fromObject(addList);
		Iterator it=add_arr.iterator();
		List<Map<String,Object>> output_list=new ArrayList<Map<String,Object>>();

		while(it.hasNext()){
			JSONObject jel=(JSONObject) it.next();
			Map<String,Object> pmd=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			pmd.put("edit_date", curTime);
			pmd.put("editor", user_name);
			output_list.add(pmd);
		}
 	
 		param_map.put("output_list", output_list);
 		
		try{
			zzjService.enterMatOutput(param_map);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}		
		return mv.getModelMap();
		
	}
 }

