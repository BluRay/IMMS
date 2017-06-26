package com.byd.bms.quality.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
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
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.quality.service.IQualityService;
import com.byd.bms.quality.model.BmsBaseQCStdRecord;
import com.byd.bms.quality.model.ProblemImproveBean;
import com.byd.bms.quality.model.ProcessFaultBean;
import com.byd.bms.quality.model.QualityTargetBean;
import com.byd.bms.quality.model.StdFaultLibBean;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.util.controller.BaseController;

import net.sf.json.JSONObject;

/**
 * 品质模块Controller
 * @author xiong.jianwu
 *
 */
@Controller
@RequestMapping("/quality")
public class QualityController extends BaseController {
	static Logger logger = Logger.getLogger("QUALITY");
	@Autowired
	protected IQualityService qualityService;
	
	//======================== xjw start=================================//
	/**
	 * 订单关键零部件页面
	 * @return
	 */
	@RequestMapping("/orderKeyParts")
	public ModelAndView orderKeyParts(){
		mv.setViewName("quality/orderKeyParts");
		return mv;
	}
	
	/**
	 * 订单配置列表
	 * @return
	 */
	@RequestMapping("/getOrderConfigList")
	@ResponseBody
	public ModelMap getOrderConfigList(){
		model.clear();;
		Map<String,Object> condMap=new HashMap<String,Object>();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		String order_id=request.getParameter("order_id");//订单
		String order_config_id=request.getParameter("order_config_id");//订单配置
		String bus_type_id=request.getParameter("bus_type_id");//车型
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("order_id", order_id);
		condMap.put("order_config_id", order_config_id);
		condMap.put("bus_type_id",bus_type_id);
		qualityService.getOrderConfigList(condMap,model);
		
		return model;
	}
	
	/**
	 * 关键零部件模板上传
	 * @return
	 */
	@RequestMapping(value="/uploadKeyPartsFile",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadKeyPartsFile(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName="keyPartsDetail.xls";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
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
		int i=1;
		for (Object[] data : excelModel.getData()) {
			Map<String, String> infomap = new HashMap<String, String>();

			infomap.put("sap_mat", data[0] == null ? null : data[0].toString().trim());
			infomap.put("parts_no", data[1] == null ? null : data[1].toString().trim());
			infomap.put("parts_name", data[2] == null ? null : data[2].toString().trim());
			infomap.put("size", data[3] == null ? null : data[3].toString().trim());
			infomap.put("vendor", data[4] == null ? null : data[4].toString().trim());
			infomap.put("workshop", data[5] == null ? null : data[5].toString().trim());
			infomap.put("process", data[6] == null ? null : data[6].toString().trim());
			String is_3c=data[7] == null ? "" : data[7].toString().trim();
			String parts_name=data[2] == null ? null : data[2].toString().trim();
			if(!is_3c.equals("是")&&!is_3c.equals("否")){
				throw new Exception("数据错误，第"+i+"行数据“3C件”请填写‘是’或者‘否’！");
			}
			if(parts_name==null||parts_name.isEmpty()){
				throw new Exception("数据错误，第"+i+"行数据“零部件名称”为空！");
			}
			infomap.put("ccc", data[7] == null ? null : data[7].toString().trim());
			infomap.put("cccNo", data[8] == null ? null : data[8].toString().trim());
			addList.add(infomap);
			i++;
		}
		initModel(true,"导入成功！",addList);
		
		//根据车间、工序校验车间工序是否有效
		qualityService.validateWorkshopProcess(addList);
		}catch(Exception e){
			initModel(false,"导入失败！"+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	/**
	 * 保存关键零部件明细
	 * @return
	 */
	@RequestMapping("saveKeyParts")
	@ResponseBody
	public ModelMap saveKeyParts(){
		Map<String,Object> keyParts=new HashMap<String,Object>();
		keyParts.put("order_config_id",Integer.parseInt(request.getParameter("order_config_id")));
		keyParts.put("order_id",Integer.parseInt(request.getParameter("order_id")));
		keyParts.put("bus_type_id",Integer.parseInt(request.getParameter("bus_type_id")));
		keyParts.put("parts_detail", request.getParameter("parts_detail"));
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		keyParts.put("editor_id", userid);
		keyParts.put("edit_date", curTime);
		try{
			qualityService.saveKeyPartsDetail(keyParts);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！",null);
		}
		return mv.getModelMap();
	}
	
	/**
	 *  查询关键零部件明细
	 * @return
	 */
	@RequestMapping("getKeyPartsList")
	@ResponseBody
	public ModelMap getKeyPartsList(){
		model.clear();
		String order_id=request.getParameter("order_id");//订单
		String order_config_id=request.getParameter("order_config_id");//订单配置
		String bus_type_id=request.getParameter("bus_type_id");//车型
		HashMap<String, Object> condMap =new HashMap<String,Object>();
		condMap .put("order_id", order_id);
		condMap.put("order_config_id", order_config_id);
		condMap.put("bus_type_id",bus_type_id);
		
		qualityService.getKeyPartsList(condMap,model);
		
		return model;
	}
	
	/**
	 * 车型成品记录表模板页面
	 * @return
	 */
	@RequestMapping("/prdRcdBusTypeTpl")
	public ModelAndView productRecordBusTypeTpl(){
		mv.setViewName("quality/productRecordBusTypeTpl");
		return mv;
	}
	
	/**
	 * 查询车型成品记录表模板列表
	 * @return
	 */
	@RequestMapping("getPrdRcdBusTypeTplList")
	@ResponseBody
	public ModelMap getPrdRcdBusTypeTplList(){
		model.clear();
		String bus_type_id=request.getParameter("bus_type_id");//车型
		String test_node_id=request.getParameter("test_node_id");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		HashMap<String, Object> condMap =new HashMap<String,Object>();
		condMap.put("bus_type_id",bus_type_id);
		condMap.put("test_node_id", test_node_id);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		qualityService.getPrdRcdBusTypeTplList(condMap,model);
		return model;
	}
	
	/**
	 * 车型成品记录表模板上传
	 * @return
	 */
	@RequestMapping(value="/uploadPrdRcdBusTypeTpl",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadPrdRcdBusTypeTpl(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading PrdRcdBusTypeTpl .....");
		String fileName="prdRcdBusTypeTpl.xls";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
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
		int i=1;
		for (Object[] data : excelModel.getData()) {
			Map<String, String> infomap = new HashMap<String, String>();

			infomap.put("test_item", data[0] == null ? null : data[0].toString().trim());
			infomap.put("test_standard", data[1] == null ? null : data[1].toString().trim());
			infomap.put("test_request", data[2] == null ? null : data[2].toString().trim());
			infomap.put("is_null", data[3] == null ? null : data[3].toString().trim());
			String test_item=data[0] == null ? null : data[0].toString().trim();
			String test_standard=data[1] == null ? null : data[1].toString().trim();
			String is_null=data[3] == null ? null : data[3].toString().trim();
			if(test_item==null||test_item.isEmpty()){
				throw new Exception("数据错误，第"+i+"行数据“检验项目”为空！");
			}
			if(test_standard==null||test_standard.isEmpty()){
				throw new Exception("数据错误，第"+i+"行数据“检验标准”为空！");
			}
			if(!is_null.equals("是")&&!is_null.equals("否")){
				throw new Exception("数据错误，第"+i+"行数据“是否必填项”请填写‘是’或者‘否’！");
			}
			addList.add(infomap);
			i++;
		}
		initModel(true,"导入成功！",addList);
		
		}catch(Exception e){
			initModel(false,"导入失败！"+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	/**
	 * 保存车型成品记录表模板
	 * @return
	 */
	@RequestMapping("savePrdRcdBusTypeTpl")
	@ResponseBody
	public ModelMap savePrdRcdBusTypeTpl(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat df_v = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bus_type_id", request.getParameter("bus_type_id"));
		condMap.put("test_node_id", request.getParameter("test_node_id"));
		condMap.put("test_node", request.getParameter("test_node"));
		condMap.put("memo", request.getParameter("memo"));
		condMap.put("tpl_header_id", request.getParameter("tpl_header_id"));
		condMap.put("version", df_v.format(new Date()));
		condMap.put("tpl_list_str", request.getParameter("tpl_list_str"));
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		
		try{
			qualityService.savePrdRcdBusTypeTpl(condMap);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	/**
	 * 查询车型成品记录表模板
	 * @return
	 */
	@RequestMapping("getPrdRcdBusTypeTplDetail")
	@ResponseBody
	public ModelMap getPrdRcdBusTypeTplDetail(){
		model.clear();
		String tpl_header_id=request.getParameter("tpl_header_id");
		qualityService.getPrdRcdBusTypeTplDetail(tpl_header_id,model);
		return model;
	}
	
	/**
	 * 订单成品记录表模板页面
	 * @return
	 */
	@RequestMapping("/prdRcdOrderTpl")
	public ModelAndView productRecordOrderTpl(){
		mv.setViewName("quality/productRecordOrderTpl");
		return mv;
	}
	
	/**
	 * 查询车型成品记录表模板列表
	 * @return
	 */
	@RequestMapping("getPrdRcdOrderTplList")
	@ResponseBody
	public ModelMap getPrdRcdOrderTplList(){
		model.clear();
		String bus_type_id=request.getParameter("bus_type_id");//车型
		String test_node_id=request.getParameter("test_node_id");
		String order_id=request.getParameter("order_id");
		String order_config_id=request.getParameter("order_config_id");
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		HashMap<String, Object> condMap =new HashMap<String,Object>();
		condMap.put("bus_type_id",bus_type_id);
		condMap.put("test_node_id", test_node_id);
		condMap.put("order_id",order_id);
		condMap.put("order_config_id", order_config_id);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		qualityService.getPrdRcdOrderTplList(condMap,model);
		return model;
	}
	
	/**
	 * 根据车型、检验节点查询最新车型模板
	 * @return
	 */
	@RequestMapping("getPrdRcdBusTypeTplDetailLatest")
	@ResponseBody
	public ModelMap getPrdRcdBusTypeTplDetailLatest(){
		model.clear();
		HashMap<String, Object> condMap =new HashMap<String,Object>();
		condMap.put("bus_type_id", request.getParameter("bus_type_id"));
		condMap.put("test_node_id", request.getParameter("test_node_id"));
		qualityService.getPrdRcdBusTypeTplDetailLatest(condMap,model);
		return model;
	}
	
	/**
	 * 保存订单成品记录表模板明细
	 * @return
	 */
	@RequestMapping("savePrdRcdOrderTypeTpl")
	@ResponseBody
	public ModelMap savePrdRcdOrderTypeTpl(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat df_v = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bus_type_id", request.getParameter("bus_type_id"));
		condMap.put("test_node_id", request.getParameter("test_node_id"));
		condMap.put("test_node", request.getParameter("test_node"));
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("order_config_id", request.getParameter("order_config_id"));
		condMap.put("tpl_header_id", request.getParameter("tpl_header_id"));
		condMap.put("version", df_v.format(new Date()));
		condMap.put("version_cp", request.getParameter("version_cp"));
		condMap.put("tpl_list_str", request.getParameter("tpl_list_str"));
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		
		try{
			qualityService.savePrdRcdOrderTpl(condMap);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	/**
	 * 查询车型成品记录表模板
	 * @return
	 */
	@RequestMapping("getPrdRcdOrderTplDetail")
	@ResponseBody
	public ModelMap getPrdRcdOrderTplDetail(){
		model.clear();
		String tpl_header_id=request.getParameter("tpl_header_id");
		qualityService.getPrdRcdOrderTplDetail(tpl_header_id,model);
		return model;
	}
	//======================== xjw end=================================//
	
	
	//========================yk start=================================//
	@RequestMapping("addParamRecord")
	@ResponseBody
	public ModelMap addParamRecord(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		StdFaultLibBean stdFaultLib = new StdFaultLibBean();
		//stdFaultLib.setPartsId(Integer.valueOf(request.getParameter("partsId").toString()));
		stdFaultLib.setBugType(request.getParameter("bugType").toString());
		stdFaultLib.setBug(request.getParameter("bug").toString());
		stdFaultLib.setFaultLevel(request.getParameter("faultLevel").toString());
		stdFaultLib.setFaultType(request.getParameter("faultType").toString());
		
		stdFaultLib.setEditorId(userid);
		stdFaultLib.setEditDate(curTime);
		
		int result = qualityService.insertFaultLib(stdFaultLib);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("updateParamRecord")
	@ResponseBody
	public ModelMap updateParamRecord(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		StdFaultLibBean stdFaultLib = new StdFaultLibBean();
		stdFaultLib.setBugType(request.getParameter("bugType").toString());
		stdFaultLib.setBug(request.getParameter("bug").toString());
		stdFaultLib.setFaultLevel(request.getParameter("faultLevel").toString());
		stdFaultLib.setFaultType(request.getParameter("faultType").toString());
		stdFaultLib.setId(Integer.valueOf(request.getParameter("id").toString()));
		stdFaultLib.setEditorId(userid);
		stdFaultLib.setEditDate(curTime);
		int result = qualityService.updateFaultLib(stdFaultLib);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping("getQaTargetParamList")
	@ResponseBody
	public ModelMap getQaTargetParamList(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=(Map<String, Object>) JSONObject.toBean(jo, Map.class);
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		
		Map<String, Object> result = qualityService.getQaTargetParamList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("addQaTargetParam")
	@ResponseBody
	public ModelMap addQaTargetParam(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		QualityTargetBean qualityTarget = new QualityTargetBean();
		qualityTarget.setEditorId(userid);
		qualityTarget.setEditDate(curTime);
		qualityTarget.setFactoryId(Integer.valueOf(request.getParameter("factoryId").toString()));
		qualityTarget.setWorkshopId(Integer.valueOf(request.getParameter("workshopId").toString()));
		qualityTarget.setTargetTypeId(Integer.valueOf(request.getParameter("targetTypeId").toString()));
		qualityTarget.setTargetVal(request.getParameter("targetVal").toString());
		qualityTarget.setEffecDateStart(request.getParameter("effecDateStart").toString());
		qualityTarget.setEffecDateEnd(request.getParameter("effecDateEnd").toString());
		int result = qualityService.insertQualityTarget(qualityTarget);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("updateQaTargetParam")
	@ResponseBody
	public ModelMap updateQaTargetParam(){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		QualityTargetBean qualityTarget = new QualityTargetBean();
		qualityTarget.setEditorId(userid);
		qualityTarget.setEditDate(curTime);
		qualityTarget.setId(Integer.valueOf(request.getParameter("id").toString()));
		qualityTarget.setFactoryId(Integer.valueOf(request.getParameter("factoryId").toString()));
		qualityTarget.setWorkshopId(Integer.valueOf(request.getParameter("workshopId").toString()));
		qualityTarget.setTargetTypeId(Integer.valueOf(request.getParameter("targetTypeId").toString()));
		qualityTarget.setTargetVal(request.getParameter("targetVal").toString());
		qualityTarget.setStatus(request.getParameter("status").toString());
		qualityTarget.setEffecDateStart(request.getParameter("effecDateStart").toString());
		qualityTarget.setEffecDateEnd(request.getParameter("effecDateEnd").toString());
		int result = qualityService.updateQualityTarget(qualityTarget);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("getProcessFaultList")
	@ResponseBody
	public ModelMap getProcessFaultList(){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("factory_id", request.getParameter("factory_id").toString());
		conditionMap.put("customer_name", request.getParameter("customer_name").toString());
		conditionMap.put("status", request.getParameter("status").toString());
		conditionMap.put("fault_phenomenon", request.getParameter("fault_phenomenon").toString());
		conditionMap.put("fault_date_start", request.getParameter("fault_date_start").toString());
		conditionMap.put("fault_date_end", request.getParameter("fault_date_end").toString());
		Map<String, Object> result = qualityService.getProcessFaultList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="editProblemImprove",method=RequestMethod.POST)
	@ResponseBody 
	public ModelMap editProblemImprove(@RequestParam(value="edit_fault_pic",required=false) MultipartFile edit_fault_pic,@RequestParam(value="edit_8d_report",required=false) MultipartFile edit_8d_report,@RequestParam(value="edit_close_evidenc",required=false) MultipartFile edit_close_evidenc){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		ProblemImproveBean problemImprove = new ProblemImproveBean();
		problemImprove.setId(Integer.valueOf(request.getParameter("edit_id")));
		problemImprove.setFault_description(request.getParameter("edit_fault_description"));
		problemImprove.setFactory_id(Integer.valueOf(request.getParameter("edit_factory")));
		problemImprove.setResponse_workshop(request.getParameter("edit_workshop"));
		problemImprove.setBus_type(request.getParameter("edit_bus_type"));
		problemImprove.setVin(request.getParameter("edit_vin"));
		problemImprove.setLicense_number(request.getParameter("edit_license_number"));
		problemImprove.setFault_mils(request.getParameter("edit_fault_mils"));
		problemImprove.setFault_phenomenon(request.getParameter("edit_fault_phenomenon"));
		problemImprove.setFault_level(request.getParameter("edit_fault_level_id"));
		problemImprove.setFault_reason(request.getParameter("edit_fault_reason"));
		problemImprove.setRisk_evaluate(request.getParameter("edit_risk_evaluate"));
		problemImprove.setKeystone_attention(request.getParameter("edit_keystone_attention"));
		problemImprove.setResolve_method(request.getParameter("edit_resolve_method"));
		problemImprove.setResolve_date(request.getParameter("edit_resolve_date"));
		problemImprove.setMemo(request.getParameter("edit_memo"));
		problemImprove.setIs_closed(request.getParameter("edit_is_closed"));
		problemImprove.setEditor_id(userid);
		problemImprove.setEdit_date(curTime);
		if(edit_fault_pic != null){
			String new_fault_pic_path = saveFileMethod(edit_fault_pic);
			problemImprove.setFault_pic_path(new_fault_pic_path);
		}
		if(edit_8d_report != null){
			String new_8d_report_path = saveFileMethod(edit_8d_report);
			problemImprove.setEightD_report_path(new_8d_report_path);
		}
		if(edit_close_evidenc != null){
			String new_close_evidenc_path = saveFileMethod(edit_close_evidenc);
			problemImprove.setClose_evidenc_path(new_close_evidenc_path);
		}

		int result = qualityService.updateProblemImprove(problemImprove);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="addProblemImprove",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap addProblemImprove(@RequestParam(value="new_fault_pic",required=false) MultipartFile new_fault_pic,@RequestParam(value="new_8d_report",required=false) MultipartFile new_8d_report,@RequestParam(value="new_close_evidenc",required=false) MultipartFile new_close_evidenc){	
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		ProblemImproveBean problemImprove = new ProblemImproveBean();
		problemImprove.setFault_description(request.getParameter("new_fault_description"));
		problemImprove.setFactory_id(Integer.valueOf(request.getParameter("new_factory")));
		problemImprove.setResponse_workshop(request.getParameter("new_workshop"));
		problemImprove.setBus_type(request.getParameter("new_bus_type"));
		problemImprove.setVin(request.getParameter("new_vin"));
		problemImprove.setLicense_number(request.getParameter("new_license_number"));
		problemImprove.setFault_mils(request.getParameter("new_fault_mils"));
		problemImprove.setFault_phenomenon(request.getParameter("new_fault_phenomenon"));
		problemImprove.setFault_level(request.getParameter("new_fault_level_id"));
		problemImprove.setFault_reason(request.getParameter("new_fault_reason"));
		problemImprove.setRisk_evaluate(request.getParameter("new_risk_evaluate"));
		problemImprove.setKeystone_attention(request.getParameter("new_keystone_attention"));
		problemImprove.setResolve_method(request.getParameter("new_resolve_method"));
		problemImprove.setResolve_date(request.getParameter("new_resolve_date"));
		problemImprove.setMemo(request.getParameter("new_memo"));
		problemImprove.setIs_closed(request.getParameter("new_is_closed"));
		problemImprove.setEditor_id(userid);
		problemImprove.setEdit_date(curTime);
		if(new_fault_pic != null){
			String new_fault_pic_path = saveFileMethod(new_fault_pic);
			problemImprove.setFault_pic_path(new_fault_pic_path);
		}
		if(new_8d_report != null){
			String new_8d_report_path = saveFileMethod(new_8d_report);
			problemImprove.setEightD_report_path(new_8d_report_path);
		}
		if(new_close_evidenc != null){
			String new_close_evidenc_path = saveFileMethod(new_close_evidenc);
			problemImprove.setClose_evidenc_path(new_close_evidenc_path);
		}
		int result = qualityService.insertProblemImprove(problemImprove);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("getProblemImproveList")
	@ResponseBody
	public ModelMap getProblemImproveList(){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("factory_id", request.getParameter("factory_id").toString());
		conditionMap.put("bus_type", request.getParameter("bus_type").toString());
		conditionMap.put("vin", request.getParameter("vin").toString());
		conditionMap.put("fault_description", request.getParameter("fault_description").toString());
		conditionMap.put("is_closed", request.getParameter("is_closed").toString());
		
		Map<String, Object> result = qualityService.getProblemImproveList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}

	@RequestMapping("showProblemImprove")
	@ResponseBody
	public ModelMap showProblemImprove(){
		int id = Integer.valueOf(request.getParameter("id"));
		ProblemImproveBean problemImprove = qualityService.showProblemImproveInfo(id);
		initModel(true,"SUCCESS",problemImprove);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="addProcessFault",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap addProcessFault(@RequestParam(value="new_report_file",required=false) MultipartFile file){	
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String filename = saveFileMethod(file);
		logger.info("-->filename = " + filename);
		ProcessFaultBean pocessFault = new ProcessFaultBean();
		pocessFault.setBus_type(request.getParameter("bus_type"));
		pocessFault.setFault_date(request.getParameter("fault_date"));
		pocessFault.setFault_mils(request.getParameter("fault_mils"));
		pocessFault.setCustomer_name(request.getParameter("customer_name"));
		pocessFault.setLicense_number(request.getParameter("license_number"));
		pocessFault.setVin(request.getParameter("vin"));
		pocessFault.setFault_level_id(request.getParameter("fault_level_id"));
		pocessFault.setIs_batch(request.getParameter("is_batch"));
		pocessFault.setFault_phenomenon(request.getParameter("fault_phenomenon"));
		pocessFault.setFault_reason(request.getParameter("fault_reason"));
		pocessFault.setFactory_id(Integer.valueOf(request.getParameter("factory")));
		pocessFault.setResponse_workshop(request.getParameter("workshop"));
		pocessFault.setResolve_method(request.getParameter("resolve_method"));
		pocessFault.setResolve_date(request.getParameter("resolve_date"));
		pocessFault.setResolve_result(request.getParameter("resolve_result"));
		pocessFault.setPunish(request.getParameter("punish"));
		pocessFault.setCompensation(request.getParameter("compensation"));
		pocessFault.setMemo(request.getParameter("memo"));
		pocessFault.setEditor_id(userid);
		pocessFault.setEdit_date(curTime);
		pocessFault.setReport_file_path(filename);
		int result = qualityService.addProcessFault(pocessFault);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="editProcessFault",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap editProcessFault(@RequestParam(value="edit_report_file",required=false) MultipartFile file){	
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String filename = saveFileMethod(file);
		ProcessFaultBean pocessFault = new ProcessFaultBean();
		pocessFault.setBus_type(request.getParameter("bus_type"));
		pocessFault.setFault_date(request.getParameter("fault_date"));
		pocessFault.setFault_mils(request.getParameter("fault_mils"));
		pocessFault.setCustomer_name(request.getParameter("customer_name"));
		pocessFault.setLicense_number(request.getParameter("license_number"));
		pocessFault.setVin(request.getParameter("vin"));
		pocessFault.setFault_level_id(request.getParameter("fault_level_id"));
		pocessFault.setIs_batch(request.getParameter("is_batch"));
		pocessFault.setFault_phenomenon(request.getParameter("fault_phenomenon"));
		pocessFault.setFault_reason(request.getParameter("fault_reason"));
		pocessFault.setFactory_id(Integer.valueOf(request.getParameter("factory")));
		pocessFault.setResponse_workshop(request.getParameter("workshop"));
		pocessFault.setResolve_method(request.getParameter("resolve_method"));
		pocessFault.setResolve_date(request.getParameter("resolve_date"));
		pocessFault.setResolve_result(request.getParameter("resolve_result"));
		pocessFault.setPunish(request.getParameter("punish"));
		pocessFault.setCompensation(request.getParameter("compensation"));
		pocessFault.setMemo(request.getParameter("memo"));
		pocessFault.setId(Integer.valueOf(request.getParameter("id")));
		pocessFault.setEditor_id(userid);
		pocessFault.setEdit_date(curTime);
		pocessFault.setReport_file_path(filename);
		int result = qualityService.editProcessFault(pocessFault);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("showProcessFaultInfo")
	@ResponseBody
	public ModelMap showProcessFaultInfo(){
		int ProcessFaultID = Integer.valueOf(request.getParameter("id"));
		ProcessFaultBean processFault = qualityService.showProcessFaultInfo(ProcessFaultID);
		initModel(true,"SUCCESS",processFault);
		model = mv.getModelMap();
		return model;
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
    				String path = servletContext.getRealPath("/file/upload/ProcessFault/");
    				// 写到指定的路径中
    				File savedir = new File(path);
    				// 如果指定的路径没有就创建
    				if (!savedir.exists()) {
    					savedir.mkdirs();
    				}
    				//System.out.println(myFileName.substring(myFileName.indexOf("."),myFileName.length()));
    				File saveFile = new File(savedir, String.valueOf(System.currentTimeMillis()) + myFileName.substring(myFileName.indexOf("."),myFileName.length()));
                    System.out.println(myFileName);  
                    file.transferTo(saveFile);
                    filepath = "/IMMS/file/upload/ProcessFault/" + saveFile.getName();
                }
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return filepath;
	}
	
	
	//======================== yk end=================================//
	
	
	//========================tj start=================================//
	
	
	
	
	//======================== tj end=================================//
	// 品质标准
	@RequestMapping("/qcStdRecord")
	public ModelAndView qcStdRecordPage() {
		mv.setViewName("quality/qcStdRecord");
		return mv;
	}
	
	@RequestMapping("/standardFaultLib")
	public ModelAndView standardFaultLib(){ 			//标准故障库
		mv.setViewName("quality/standardFaultLib");
        return mv;  
    }
	
	@RequestMapping("/qaTargetParameter")
	public ModelAndView qaTargetParameter(){ 			//质量目标参数
		mv.setViewName("quality/qaTargetParameter");
        return mv;  
    }
	
	@RequestMapping("/problemImprove")
	public ModelAndView problemImprove(){ 				//问题改善
		mv.setViewName("quality/problemImprove");
        return mv;  
    }
	
	@RequestMapping("/processFault")
	public ModelAndView processFault(){ 				//制程异常
		mv.setViewName("quality/processFault");
        return mv;  
    }
	
	/**
	 * 
	 */
	@RequestMapping("/showRecordList")
	@ResponseBody
	public ModelMap showRecordList() {
		Map conditionMap = new HashMap();
		String recordNo = request.getParameter("recordNo");
		String stdFileName = request.getParameter("stdFileName");
		String update_start = request.getParameter("start_date");
		String update_end = request.getParameter("end_date");
		// 封装查询条件
		conditionMap.put("recordNo", recordNo);
		conditionMap.put("stdFileName", stdFileName);
		conditionMap.put("updateStart", update_start);
		conditionMap.put("updateEnd", update_end);
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数
		
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		Map<String, Object> result = qualityService.getStdRecordList(conditionMap);

		model.addAllAttributes(result);

		return model;
	}

	/**
	 * 品质标准更新记录保存
	 */
	@RequestMapping("/addRecord")
	@ResponseBody
	public ModelAndView addRecord(BmsBaseQCStdRecord stdRecord,@RequestParam("afile") MultipartFile afile,
			@RequestParam("bfile") MultipartFile bfile) {
		int editor_id =(int) request.getSession().getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String edit_date = df.format(new Date());
		String bpath = "docs/upload/qcStandard/";
		
		// 把上传的文件放到指定的路径下
		String path = request.getSession().getServletContext().getRealPath(bpath);

		// 写到指定的路径中
		File file = new File(path);
		// 如果指定的路径没有就创建
		if (!file.exists()) {
			file.mkdirs();
		}
		String afile_db = "qcAfile_"
				+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
				+ afile.getOriginalFilename().substring(afile.getOriginalFilename().indexOf("."),
						afile.getOriginalFilename().length());
		String bfile_db= "qcBfile_"
				+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
				+ bfile.getOriginalFilename().substring(bfile.getOriginalFilename().indexOf("."),
						bfile.getOriginalFilename().length());
		if (afile != null) {
			try {
				FileUtils.copyInputStreamToFile(afile.getInputStream(), new File(file, afile_db));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (bfile != null) {
			try {
				FileUtils.copyInputStreamToFile(bfile.getInputStream(), new File(file, bfile_db));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		stdRecord.setAfilePath(bpath+ afile_db);
		stdRecord.setBfilePath(bpath+ bfile_db);
		stdRecord.setEditorId(editor_id);
		stdRecord.setEditDate(edit_date);
		qualityService.insertStdRecord(stdRecord);
		
		mv.setViewName("quality/qcStdRecord");
		return mv;
	}

	/**
	 * 品质标准更新记录预览
	 */
	@RequestMapping("/showStdRecord")
	@ResponseBody
	public ModelMap showStdRecord() {
		Map<String, Object> result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		int id = Integer.parseInt(request.getParameter("id"));
		
		BmsBaseQCStdRecord stdRecord = qualityService.selectStdRecord(id);
		result.put("stdRecord",stdRecord);
		model.addAllAttributes(result);

		return model;
		
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/getFaultLibList")
	@ResponseBody
	public ModelMap getFaultLibList(){
		String conditions = request.getParameter("conditions");
		JSONObject jo=JSONObject.fromObject(conditions);
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		for(Iterator it=jo.keys();it.hasNext();){
			String key=(String) it.next();
			//System.out.println(key);
			if(key.equals("faultLevel")){
				Object[] arr=jo.getJSONArray(key).toArray();
				conditionMap.put(key, arr);
			}else
			conditionMap.put(key, jo.get(key));
		}
		
		Map<String, Object> result = qualityService.getFaultLibList(conditionMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
}
