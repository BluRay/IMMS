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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.order.service.IOrderService;
import com.byd.bms.quality.service.IQualityService;
import com.byd.bms.quality.model.BmsBaseQCStdRecord;
import com.byd.bms.quality.model.MaterialExceptionLogs;
import com.byd.bms.quality.model.ProblemImproveBean;
import com.byd.bms.quality.model.ProcessFaultBean;
import com.byd.bms.quality.model.QualityTargetBean;
import com.byd.bms.quality.model.StdFaultLibBean;
import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.model.BmsBaseFactory;
import com.byd.bms.setting.service.IBaseDataService;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
import com.byd.bms.util.controller.BaseController;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 品质模块Controller
 * @author xiong.jianwu
 *
 */
@Controller
@RequestMapping("/quality")
@Scope("prototype")
public class QualityController extends BaseController {
	static Logger logger = Logger.getLogger("QUALITY");
	@Autowired
	protected IQualityService qualityService;
	@Autowired
	protected IOrderService orderService;
	@Autowired
	protected IBaseDataService baseDataService;
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
		model=new ModelMap();;
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
			initModel(false,"保存失败！"+e.getMessage(),null);
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
		model=new ModelMap();
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
		model=new ModelMap();
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
		int item_no=0;
		String item="";
		for (Object[] data : excelModel.getData()) {
			Map<String, String> infomap = new HashMap<String, String>();
			if(!item.equals(data[0].toString())){
				item_no++;
				item=data[0].toString();
			}
			infomap.put("test_item_no", item_no+"");
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
		
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("order_config_id", request.getParameter("order_config_id"));
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
		model=new ModelMap();
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
		model=new ModelMap();
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
		model=new ModelMap();
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
		model=new ModelMap();
		String tpl_header_id=request.getParameter("tpl_header_id");
		qualityService.getPrdRcdOrderTplDetail(tpl_header_id,model);
		return model;
	}
	
	/**
	 * 订单成品记录表录入页面
	 * @return
	 */
	@RequestMapping("/prdRcdIn")
	public ModelAndView productRecord(){
		mv.setViewName("quality/productRecord");
		return mv;
	} 
	
	/**
	 * 录入页面根据车号、检验节点查询成品记录表模板
	 * @return
	 */
	@RequestMapping("getPrdRcdOrderTpl")
	@ResponseBody
	public ModelMap getPrdRcdOrderTpl(){
		model=new ModelMap();
		String bus_number=request.getParameter("bus_number");
		String test_node=request.getParameter("test_node");
		String test_node_id=request.getParameter("test_node_id");
		String customer_no=request.getParameter("customer_no");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bus_number", bus_number);
		condMap.put("customer_no", customer_no);
		condMap.put("test_node", test_node);
		condMap.put("test_node_id", test_node_id);
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("order_config_id", request.getParameter("order_config_id"));
		qualityService.getPrdRcdOrderTpl(condMap,model);
		return model;
	}
	
	/**
	 * 标准故障库查询
	 * @return
	 */
	@RequestMapping("getFaultLibFuzzyList")
	@ResponseBody
	public ModelMap getFaultLibFuzzyList(){
		model=new ModelMap();
		String bugType=request.getParameter("bugType");
		String bug=request.getParameter("bug");
		String seriousLevel=request.getParameter("seriousLevel");
		String faultType=request.getParameter("faultType");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bugType", bugType);
		condMap.put("bug", bug);
		condMap.put("seriousLevel", seriousLevel);
		condMap.put("faultType", faultType);
		qualityService.getFaultLibFuzzyList(condMap,model);
		return model;
	}
	
	/**
	 * 保存成品记录信息
	 * @return
	 */
	@RequestMapping("saveProductRecord")
	@ResponseBody	
	public ModelMap saveProductRecord(){
		model=new ModelMap();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat df_v = new SimpleDateFormat("yyyyMMddHHmmss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		String bus_number=request.getParameter("bus_number");
		String test_node=request.getParameter("test_node");
		String record_detail=request.getParameter("record_detail");
		String test_card_template_detail_id=request.getParameter("test_card_template_detail_id");
		String test_card_template_head_id=request.getParameter("test_card_template_head_id");
		
		List<Map<String,Object>> detail_list=null;	
		if(record_detail.contains("{")){
			JSONArray jsa=JSONArray.fromObject(record_detail);
			detail_list=JSONArray.toList(jsa, Map.class);
		}
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bus_number", bus_number);
		condMap.put("test_node",test_node);
		condMap.put("test_card_template_detail_id", test_card_template_detail_id);
		condMap.put("test_card_template_head_id",test_card_template_head_id);
		condMap.put("editor_id", userid);
		condMap.put("edit_date", curTime);
		condMap.put("detail_list", detail_list);
		qualityService.saveProductRecord(condMap,model);
		return model;
	}
	
	/**
	 * 查询成品记录表列表
	 * @return
	 */
	@RequestMapping("getProductRecordList")
	@ResponseBody
	public ModelMap getProductRecordList(){
			model=new ModelMap();
			int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
			int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
			int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
			String bus_number=request.getParameter("bus_number");
			String order_no=request.getParameter("order_no");
			String test_node_id=request.getParameter("test_node_id");
			String factory_id=request.getParameter("factory_id");
			String result=request.getParameter("result");
			Map<String,Object> condMap=new HashMap<String,Object>();
			condMap.put("draw", draw);
			condMap.put("start", start);
			condMap.put("length", length);
			condMap.put("bus_number", bus_number);
			condMap.put("order_no", order_no);
			condMap.put("test_node_id", test_node_id);
			condMap.put("factory_id", factory_id);
			condMap.put("result", result);
			qualityService.getProductRecordList(condMap,model);
			return model;
	}
	
	/**
	 * 根据车号、工厂、检验节点查询成品记录表数据
	 * @return
	 */
	@RequestMapping("getProductRecordDetail")
	@ResponseBody
	public ModelMap getProductRecordDetail(){
		model=new ModelMap();
		String bus_number=request.getParameter("bus_number");
		String test_node=request.getParameter("test_node");
		String factory_id=request.getParameter("factory_id");
		String test_card_template_head_id=request.getParameter("test_card_template_head_id");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bus_number", bus_number);
		condMap.put("test_node", test_node);
		condMap.put("factory_id", factory_id);
		condMap.put("test_card_template_head_id", test_card_template_head_id);
		
		qualityService.getProductRecordDetail(condMap,model);
		return model;
	}
	
	/**
	 * 订单成品记录表模板页面
	 * @return
	 */
	@RequestMapping("/prdRcdMobile")
	public ModelAndView productRecordMobile(){
		mv.setViewName("quality/productRecord_Mobile");
		return mv;
	} 
	
	/**
	 * 标准故障库模糊查询
	 * @return
	 */
	@RequestMapping("getFaultListFuzzy")
	@ResponseBody
	public ModelMap getFaultListFuzzy(){
		model=new ModelMap();
		String bug_type=request.getParameter("bug_type");
		String bug=request.getParameter("bug");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("bug", bug);
		condMap.put("bugType", bug_type);
		qualityService.getFaultLibFuzzyList(condMap, model);
		
		return model;
	}
	
	/**
	 * 零部件批次查询页面
	 * @return
	 */
	@RequestMapping("/partsBatchQuery")
	public ModelAndView partsBatchQuery(){
		mv.setViewName("quality/partsBatchQuery");
		return mv;
	}
	
	/**
	 * 根据零部件、批次查询车辆信息
	 * @return
	 */
	@RequestMapping("/getBusByPartsBatch")
	@ResponseBody
	public ModelMap getBusByPartsBatch(){
		model.clear();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		String parts_name=request.getParameter("parts_name");
		String batch=request.getParameter("batch");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("parts_name", parts_name);
		condMap.put("batch", batch);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		
		qualityService.getBusByPartsBatch(condMap, model);		
		
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
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):500;	//每一页数据条数

		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		conditionMap.put("bus_type", request.getParameter("bus_type").toString());
		conditionMap.put("factory_id", request.getParameter("factory_id").toString());
		conditionMap.put("area", request.getParameter("area").toString());
		conditionMap.put("week", request.getParameter("week").toString());
		conditionMap.put("level", request.getParameter("level").toString());
		conditionMap.put("fault_phenomenon", request.getParameter("fault_phenomenon").toString());
		conditionMap.put("fault_mils", request.getParameter("fault_mils").toString());
		conditionMap.put("is_batch", request.getParameter("is_batch").toString());
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
		//problemImprove.setFault_level(request.getParameter("edit_fault_level_id"));
		problemImprove.setFault_level_id(request.getParameter("edit_fault_level_id"));
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
		//判断VIN和车牌是否存在，不允许重复录入
		
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
		pocessFault.setResponse_factory(request.getParameter("response_factory"));
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
	

	@RequestMapping(value="/uploadProcessFault",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadProcessFault(@RequestParam(value="file",required=false) MultipartFile file){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		
		String fileFileName = "masterPlan.xls";
		int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);dataType.put("3", ExcelModel.CELL_TYPE_STRING);
		dataType.put("4", ExcelModel.CELL_TYPE_STRING);dataType.put("5", ExcelModel.CELL_TYPE_STRING);
		dataType.put("6", ExcelModel.CELL_TYPE_STRING);dataType.put("7", ExcelModel.CELL_TYPE_STRING);
		dataType.put("8", ExcelModel.CELL_TYPE_STRING);dataType.put("9", ExcelModel.CELL_TYPE_STRING);
		dataType.put("10", ExcelModel.CELL_TYPE_STRING);dataType.put("11", ExcelModel.CELL_TYPE_STRING);
		dataType.put("12", ExcelModel.CELL_TYPE_STRING);dataType.put("13", ExcelModel.CELL_TYPE_STRING);
		dataType.put("14", ExcelModel.CELL_TYPE_STRING);dataType.put("15", ExcelModel.CELL_TYPE_STRING);
		dataType.put("16", ExcelModel.CELL_TYPE_STRING);dataType.put("17", ExcelModel.CELL_TYPE_STRING);
		
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);

        File planFile = new File(fileFileName);
        
        try {
        	file.transferTo(planFile);
			InputStream is = new FileInputStream(planFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			int lineCount = excelModel.getData().size();
			String fault_date = "";
			for(int i=0;i<lineCount;i++){
				fault_date = excelModel.getData().get(i)[1].toString().trim();
				if(fault_date.length()!= 10){
					initModel(false,"日期格式有误，正确日期格式为YYYY-MM-DD ！",null);
					model = mv.getModelMap();
					return model;
				}
			}
			
			for(int i=0;i<lineCount;i++){
				ProcessFaultBean pocessFault = new ProcessFaultBean();
				pocessFault.setBus_type(excelModel.getData().get(i)[0].toString().trim());
				pocessFault.setFault_date(excelModel.getData().get(i)[1].toString().trim());
				pocessFault.setFault_mils(excelModel.getData().get(i)[2].toString().trim());
				pocessFault.setCustomer_name(excelModel.getData().get(i)[3].toString().trim());
				pocessFault.setLicense_number(excelModel.getData().get(i)[4].toString().trim());
				pocessFault.setVin(excelModel.getData().get(i)[5].toString().trim());
				pocessFault.setFault_level_id(excelModel.getData().get(i)[6].toString().trim());
				String is_batch = "";
				if(excelModel.getData().get(i)[7].toString().trim().equals("批量"))is_batch="1";
				if(excelModel.getData().get(i)[7].toString().trim().equals("非批量"))is_batch="0";
				pocessFault.setIs_batch(is_batch);
				
				pocessFault.setFault_phenomenon(excelModel.getData().get(i)[8].toString().trim());
				pocessFault.setFault_reason(excelModel.getData().get(i)[9].toString().trim());
				pocessFault.setFactory_name(excelModel.getData().get(i)[10].toString().trim());
				pocessFault.setResponse_workshop(excelModel.getData().get(i)[11].toString().trim());
				pocessFault.setResolve_method(excelModel.getData().get(i)[12].toString().trim());
				pocessFault.setResolve_date(excelModel.getData().get(i)[13].toString().trim());
				String resolve_result = "";
				if(excelModel.getData().get(i)[14].toString().trim().equals("关闭"))resolve_result="0";
				if(excelModel.getData().get(i)[14].toString().trim().equals("受理"))resolve_result="1";			
				pocessFault.setResolve_result(resolve_result);
				
				pocessFault.setPunish(excelModel.getData().get(i)[15].toString().trim());
				pocessFault.setCompensation(excelModel.getData().get(i)[16].toString().trim());
				pocessFault.setMemo(excelModel.getData().get(i)[17].toString().trim());
				pocessFault.setEditor_id(userid);
				pocessFault.setEdit_date(curTime);
				qualityService.addProcessFault2(pocessFault);
			}
        	
        }catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		
		initModel(true,"导入成功！",result);
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
                    filepath = "/BMS/file/upload/ProcessFault/" + saveFile.getName();
                }
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return filepath;
	}
	
	
	//======================== yk end=================================//
	
	
	//========================tj start=================================//
	/**
	 * 关键零部件跟踪
	 * @return
	 */
	@RequestMapping("/keyPartsTrace")
	public ModelAndView keyPartsTrace(){
		mv.setViewName("quality/keyPartsTrace");
		return mv;
	}
	
	@RequestMapping("/getKeyPartsTraceList")
	@ResponseBody
	public ModelMap getKeyPartsTraceList() {
		Map conditionMap = new HashMap();
		String factoryId = request.getParameter("factoryId");
		String busTypeId = request.getParameter("bustypeId");
		String workshop = request.getParameter("workshop");
		String busNumber = request.getParameter("busNumber");
		String orderNo = request.getParameter("orderNo");
		String orderconfigId = request.getParameter("orderconfigId");
		// 封装查询条件
		conditionMap.put("factoryId", factoryId);
        conditionMap.put("workshop", workshop);
		conditionMap.put("busNumber", busNumber);
		conditionMap.put("bustypeId", busTypeId);
        conditionMap.put("orderNo", orderNo);
		conditionMap.put("orderconfigId", orderconfigId);
	
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数
		
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		Map<String, Object> result = qualityService.getKeyPartsTraceList(conditionMap);

		model.addAllAttributes(result);

		return model;
	}
	@RequestMapping("/addKeyParts")
	@ResponseBody
	public ModelMap addKeyParts() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		String paramstr=request.getParameter("key_parts_list");
		JSONArray jsa=JSONArray.fromObject(paramstr);
		Iterator it=jsa.iterator();
		List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
		/**
		 * 封装需要保存的数据
		 */
		while(it.hasNext()){
			JSONObject el=(JSONObject) it.next();	
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("keypartsId", el.get("key_parts_id"));
			map.put("batch", el.get("batch"));
			map.put("bus_number", el.get("bus_number"));
			map.put("parts_no",el.get("parts_no"));
			map.put("parts_name",el.get("parts_name"));
			map.put("vendor",el.get("vendor"));
			map.put("size",el.get("size"));
			map.put("process_name",el.get("process_name"));
			map.put("workshop",el.get("workshop"));
			map.put("factory_id",el.get("factory_id"));
			map.put("key_parts_template_detail_id",el.get("key_parts_template_detail_id"));
			map.put("edit_date",curTime);
			map.put("editor_id",userid);
			list.add(map);
		}
		//调用service保存数据
		try{
			int result=qualityService.updateKeyParts(list);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			initModel(false,"保存失败!",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping("/getBusNumberDetailList")
	@ResponseBody
	public ModelMap getBusNumberDetailList() {
		Map conditionMap = new HashMap();
		String key_components_template_id = request.getParameter("key_components_template_id");
		String bus_number = request.getParameter("bus_number");
		// 封装查询条件
        conditionMap.put("bus_number", bus_number);
		conditionMap.put("key_components_template_id", key_components_template_id);
		conditionMap.put("workshop", request.getParameter("workshop"));
		
		Map<String, Object> result = qualityService.getBusNumberDetailList(conditionMap);

		model.addAllAttributes(result);

		return model;
	}
	/**
	 * 物料异常记录
	 * @return
	 */
	@RequestMapping("/materialExceptionLogs") 
	public ModelAndView materialExceptionLogs(){
		mv.setViewName("quality/materialExceptionLogs");
		return mv;
	}
	@RequestMapping("/getMaterialExceptionLogsList")
	@ResponseBody
	public ModelMap getMaterialExceptionLogsList() {
		Map conditionMap = new HashMap();
		String bustypeId = request.getParameter("bustypeId");
		String workshop = request.getParameter("workshop");
		String factory = request.getParameter("factory");
		String material = request.getParameter("material");
		String orderNo = request.getParameter("orderNo");
		String bugLevel = request.getParameter("bugLevel");
		String occurDateStart = request.getParameter("occurDateStart");
		String occurDateEnd = request.getParameter("occurDateEnd");
		// 封装查询条件
		conditionMap.put("bustypeId", bustypeId);
		conditionMap.put("orderNo", orderNo);
		conditionMap.put("workshop", workshop);
		conditionMap.put("factory", factory);
		conditionMap.put("material", material);
		conditionMap.put("bugLevel", bugLevel);
		conditionMap.put("occurDateStart", occurDateStart);
		conditionMap.put("occurDateEnd", occurDateEnd);
		int draw = Integer.parseInt(request.getParameter("draw"));// jquerydatatables
		int start = Integer.parseInt(request.getParameter("start"));// 分页数据起始数
		int length = Integer.parseInt(request.getParameter("length"));// 每一页数据条数
		
		conditionMap.put("draw", draw);
		conditionMap.put("start", start);
		conditionMap.put("length", length);
		Map<String, Object> result = qualityService.getMaterialExceptionLogsList(conditionMap);

		model.addAllAttributes(result);

		return model;
	}
	@RequestMapping(value="addMaterialExceptionLogs",method=RequestMethod.POST)
	@ResponseBody 
	public ModelMap addMaterialExceptionLogs(@RequestParam(value="new_bphoto",required=false) MultipartFile new_bphoto,
			@RequestParam(value="new_fphoto",required=false) MultipartFile new_fphoto){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		MaterialExceptionLogs logs = new MaterialExceptionLogs();
		logs.setOccur_date(request.getParameter("occurDate"));
		logs.setFactory_id(Integer.valueOf(request.getParameter("factory_id")));
		logs.setFactory(request.getParameter("factory"));
		logs.setWorkshop_id(Integer.valueOf(request.getParameter("workshop_id")));
		logs.setWorkshop(request.getParameter("workshop"));
		logs.setBus_type_id(Integer.valueOf(request.getParameter("bus_type")));
		logs.setBug_level(request.getParameter("bugLevel"));
		logs.setDescription(request.getParameter("description"));
		logs.setExpc_finish_date(request.getParameter("expcFinishDate"));
		logs.setFault_reason(request.getParameter("faultReason"));
		logs.setOrder_no(request.getParameter("orderNo"));
		logs.setImp_measure(request.getParameter("impMeasures"));
		logs.setMaterial(request.getParameter("material"));
		logs.setResp_person(request.getParameter("respPerson"));
		logs.setResp_unit(request.getParameter("respUnit"));
		logs.setTmp_measures(request.getParameter("tmpMeasures"));
		logs.setVerifier(request.getParameter("verifier"));
		logs.setVerify_result(request.getParameter("verifyResult"));
		logs.setMemo(request.getParameter("memo"));
		logs.setCreat_date(curTime);
		logs.setCreator_id(userid);
		if(new_bphoto != null){
			String bphoto = saveFileMethod(new_bphoto);
			logs.setBphoto(bphoto);
		}
		if(new_fphoto != null){
			String fphoto = saveFileMethod(new_fphoto);
			logs.setFphoto(fphoto);
		}
		int result = qualityService.saveMaterialExceptionLogs(logs);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping(value="editMaterialExceptionLogs",method=RequestMethod.POST)
	@ResponseBody 
	public ModelMap editMaterialExceptionLogs(@RequestParam(value="edit_bphoto",required=false) MultipartFile edit_bphoto,
			@RequestParam(value="edit_fphoto",required=false) MultipartFile edit_fphoto){
		int userid=(int) session.getAttribute("user_id");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		MaterialExceptionLogs logs = new MaterialExceptionLogs();
		logs.setId(Integer.valueOf(request.getParameter("id")));
		logs.setOccur_date(request.getParameter("occurDate"));
		logs.setFactory_id(Integer.valueOf(request.getParameter("factory_id")));
		logs.setFactory(request.getParameter("factory"));
		logs.setWorkshop_id(Integer.valueOf(request.getParameter("workshop_id")));
		logs.setWorkshop(request.getParameter("workshop"));
		logs.setBus_type_id(Integer.valueOf(request.getParameter("bus_type")));
		logs.setBug_level(request.getParameter("bugLevel"));
		logs.setDescription(request.getParameter("description"));
		logs.setExpc_finish_date(request.getParameter("expcFinishDate"));
		logs.setFault_reason(request.getParameter("faultReason"));
		logs.setOrder_no(request.getParameter("orderNo"));
		logs.setImp_measure(request.getParameter("impMeasures"));
		logs.setMaterial(request.getParameter("material"));
		logs.setResp_person(request.getParameter("respPerson"));
		logs.setResp_unit(request.getParameter("respUnit"));
		logs.setTmp_measures(request.getParameter("tmpMeasures"));
		logs.setVerifier(request.getParameter("verifier"));
		logs.setVerify_result(request.getParameter("verifyResult"));
		logs.setMemo(request.getParameter("memo"));
		logs.setCreat_date(curTime);
		logs.setCreator_id(userid);
		if(edit_bphoto != null){
			String bphoto = saveFileMethod(edit_bphoto);
			logs.setBphoto(bphoto);
		}
		if(edit_fphoto != null){
			String fphoto = saveFileMethod(edit_fphoto);
			logs.setFphoto(fphoto);
		}
		int result = qualityService.updateMaterialExceptionLogs(logs);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	/**
	 * 物料异常记录
	 */
	@RequestMapping("/showMaterialExceptionLogs")
	@ResponseBody
	public ModelMap showMaterialExceptionLogs() {
		Map<String, Object> result = new HashMap<String, Object>();
		Map conditionMap = new HashMap();
		int id = Integer.parseInt(request.getParameter("id"));
		
		MaterialExceptionLogs logs = qualityService.selectLogsById(id);
		result.put("data",logs);
		model.addAllAttributes(result);

		return model;
		
	}
	
	// 品质标准
	@RequestMapping("/qcStdRecord")
	public ModelAndView qcStdRecordPage() {
		mv.setViewName("quality/qcStdRecord");
		return mv;
	}
	
	/**
	 * 
	 */
	@RequestMapping("/showRecordList")
	@ResponseBody
	public ModelMap showRecordList() {
		Map<String,Object> conditionMap = new HashMap<String,Object>();
		String recordno = request.getParameter("recordno");
		String bustype = request.getParameter("bustype");
		String orderno = request.getParameter("orderno");
		String workshop = request.getParameter("workshop");
		String usynopsis = request.getParameter("usynopsis");
		conditionMap.put("recordno", recordno);
		conditionMap.put("bustype", bustype);
		conditionMap.put("orderno", orderno);
		conditionMap.put("workshop", workshop);
		conditionMap.put("usynopsis", usynopsis);
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
//		String bpath = "docs/upload/qcStandard/";
//		
//		// 把上传的文件放到指定的路径下
//		String path = request.getSession().getServletContext().getRealPath(bpath);
//
//		// 写到指定的路径中
//		File file = new File(path);
//		// 如果指定的路径没有就创建
//		if (!file.exists()) {
//			file.mkdirs();
//		}
//		String afile_db ="";
//		if (afile != null) {
//			afile_db = "qcAfile_"
//					+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
//					+ afile.getOriginalFilename().substring(afile.getOriginalFilename().indexOf("."),
//							afile.getOriginalFilename().length());
//			try {
//				FileUtils.copyInputStreamToFile(afile.getInputStream(), new File(file, afile_db));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//			stdRecord.setAfilePath(bpath+ afile_db);
//		}
//		String bfile_db= "";
//		if (bfile.getSize() != 0) {
//			bfile_db= "qcBfile_"
//					+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
//					+ bfile.getOriginalFilename().substring(bfile.getOriginalFilename().indexOf("."),
//							bfile.getOriginalFilename().length());
//			try {
//				FileUtils.copyInputStreamToFile(bfile.getInputStream(), new File(file, bfile_db));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			stdRecord.setBfilePath(bpath+ bfile_db);
//		}
		if(afile != null){
			String apath = saveFileMethod(afile);
			stdRecord.setAfilePath(apath);
		}
		if(bfile != null){
			String bpath = saveFileMethod(bfile);
			stdRecord.setBfilePath(bpath);
		}
		stdRecord.setEditorId(editor_id);
		stdRecord.setEditDate(edit_date);
		qualityService.insertStdRecord(stdRecord);
		
		mv.setViewName("redirect:/quality/qcStdRecord");
		return mv;
	}

	/**
	 * 品质标准更新记录预览
	 */
	@RequestMapping("/showStdRecord")
	@ResponseBody
	public ModelMap showStdRecord() {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> conmap = new HashMap<String, Object>();
		int id = Integer.parseInt(request.getParameter("id"));
		String implement_factory=request.getParameter("implement_factory");
		conmap.put("id", id);
		conmap.put("implement_factory", implement_factory);
		Map<String, Object> stdRecord = qualityService.selectStdRecord(conmap);
		result.put("stdRecord",stdRecord);
		model.addAllAttributes(result);

		return model;
		
	}
	
	
	//======================== tj end=================================//
	
	
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
	
	@RequestMapping("/processFaultReport")
	public ModelAndView processFaultReport(){
		mv.setViewName("quality/processFaultReport");
        return mv;  
    }
	
	@RequestMapping("/getProcessProblemReportData")
	@ResponseBody
	public ModelMap getProcessFaultReportData(){
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("start_date", request.getParameter("start_date"));
		conditionMap.put("end_date", request.getParameter("end_date"));
		
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		data = qualityService.getProcessFaultReportData(conditionMap);
		result.put("series", data);
		
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getFactoryIdByVin")
	@ResponseBody
	public ModelMap getFactoryIdByVin(){
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("vin", request.getParameter("vin"));
		
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		data = qualityService.getFactoryIdByVin(conditionMap);
		result.put("data", data);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
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
	// 品质异常记录
	@RequestMapping("/qualityAbnormalRecord")
	public ModelAndView qualityAbnormalRecord(){ 
		mv.setViewName("quality/qualityAbnormalRecord");
		int factory_id =(int) request.getSession().getAttribute("factory_id");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("factory_id",factory_id);
		mv.getModelMap().addAllAttributes(map);
        return mv;  
    }
	@RequestMapping("/getQualityAbnormalRecordList")
	@ResponseBody
	public ModelMap getQualityAbnormalRecordList() {
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):-1;	//每一页数据条数
		Map<String, Object> condMap = new HashMap<String, Object>();
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("test_node_id", request.getParameter("test_node_id"));
		condMap.put("bus_type", request.getParameter("bus_type"));
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("iqc", request.getParameter("iqc"));
		condMap.put("bus_number", request.getParameter("bus_number"));
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		Map<String, Object> result = qualityService.getQualityAbnormalRecordList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("addQualityAbnormalRecord")
	@ResponseBody
	public ModelMap addQualityAbnormalRecord(@RequestParam(value="file",required = false) MultipartFile file){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String user_name=(String) session.getAttribute("user_name");
		Map<String,Object> condMap=new HashMap<String,Object>();
//        String bpath = "docs/upload/qcStandard/";
//		
//		// 把上传的文件放到指定的路径下
//		String path = request.getSession().getServletContext().getRealPath(bpath);
//
//		// 写到指定的路径中
//		File pathfile = new File(path);
//		// 如果指定的路径没有就创建
//		if (!pathfile.exists()) {
//			pathfile.mkdirs();
//		}
//		String afile_db ="";
//		if (file!=null && file.getSize() != 0) {
//			afile_db = "qcAfile_"
//					+ curTime.replace("-", "").replace(":", "").replace(" ", "")
//					+ file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."),
//							file.getOriginalFilename().length());
//			try {
//				FileUtils.copyInputStreamToFile(file.getInputStream(), new File(pathfile, afile_db));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			condMap.put("problem_photo_path", bpath+ afile_db);
//		}
		if(file != null){
			String bpath = saveFileMethod(file);
			condMap.put("problem_photo_path", bpath);
		}
		condMap.put("bus_type", request.getParameter("bus_type"));
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("test_node_id", request.getParameter("test_node_id"));
		condMap.put("test_node", request.getParameter("test_node"));
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("bus_number", request.getParameter("bus_number"));
		condMap.put("problem_desc",request.getParameter("problem_desc"));
		condMap.put("solution", request.getParameter("solution"));
		condMap.put("iqc", request.getParameter("iqc"));
		condMap.put("bug_type",request.getParameter("bug_type"));
		condMap.put("bug_desc", request.getParameter("bug_desc"));
		condMap.put("level",request.getParameter("level"));
		condMap.put("resp_unit", request.getParameter("resp_unit"));
		condMap.put("remark", request.getParameter("remark"));
		condMap.put("editor", user_name);
		condMap.put("edit_date", curTime);
		try{
			qualityService.insertQualityAbnormalRecord(condMap);
			initModel(true,"保存成功！",null);
		}catch(Exception e){
			initModel(false,"保存失败！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping("/deleteQualityAbnormalRecord")
	@ResponseBody
	public ModelMap deleteQualityAbnormalRecord() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			qualityService.deleteQualityAbnormalRecord(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("checkBusNumber")
	@ResponseBody
	public ModelMap checkBusNumber(){
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("order_no", request.getParameter("order_no"));
		condMap.put("bus_number", request.getParameter("bus_number"));
		Map<String, Object> result = qualityService.checkBusNumber(condMap);
		model = mv.getModelMap();
		model.put("businfo", result);
		return model;
	}
	
	@RequestMapping("updateStdRecord")
	@ResponseBody
	public ModelAndView updateStdRecord(BmsBaseQCStdRecord stdRecord,@RequestParam("afile") MultipartFile afile,
			@RequestParam("bfile") MultipartFile bfile) {
//		int editor_id =(int) request.getSession().getAttribute("user_id");
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		String edit_date = df.format(new Date());
//		String bpath = "docs/upload/qcStandard/";
		
//		// 把上传的文件放到指定的路径下
//		String path = request.getSession().getServletContext().getRealPath(bpath);
//
//		// 写到指定的路径中
//		File file = new File(path);
//		// 如果指定的路径没有就创建
//		if (!file.exists()) {
//			file.mkdirs();
//		}
//		String afile_db ="";
		if(afile != null){
			String apath = saveFileMethod(afile);
			stdRecord.setAfilePath(apath);
		}
		if(bfile != null){
			String bpath = saveFileMethod(bfile);
			stdRecord.setBfilePath(bpath);
		}
//		if (afile != null) {
//			if(afile.getOriginalFilename().indexOf(".")>0){
//				afile_db = "qcAfile_"
//						+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
//						+ afile.getOriginalFilename().substring(afile.getOriginalFilename().indexOf("."),
//								afile.getOriginalFilename().length());
//				try {
//					FileUtils.copyInputStreamToFile(afile.getInputStream(), new File(file, afile_db));
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//				
//				stdRecord.setAfilePath(bpath+ afile_db);
//			}else{
//				stdRecord.setAfilePath(null);
//			}
//		}
//		String bfile_db= "";
//		if (bfile!= null) {
//			if(bfile.getOriginalFilename().indexOf(".")>0){
//				bfile_db= "qcBfile_"
//						+ edit_date.replace("-", "").replace(":", "").replace(" ", "")
//						+ bfile.getOriginalFilename().substring(bfile.getOriginalFilename().indexOf("."),
//								bfile.getOriginalFilename().length());
//				try {
//					FileUtils.copyInputStreamToFile(bfile.getInputStream(), new File(file, bfile_db));
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//				stdRecord.setBfilePath(bpath+ bfile_db);
//			}else{
//				stdRecord.setBfilePath(null);
//			}
//		}
		qualityService.updateStdRecord(stdRecord);
		
		mv.setViewName("redirect:/quality/qcStdRecord");
		return mv;
	}
	@RequestMapping("addStdImplementInfo")
	@ResponseBody
	public ModelMap addStdImplementInfo(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String user_name=(String) session.getAttribute("user_name");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		condMap.put("implement_factory", request.getParameter("implement_factory"));
		condMap.put("implement_bus_number", request.getParameter("implement_bus_number"));
		condMap.put("confirmor", request.getParameter("confirmor"));
		condMap.put("confirm_date",  request.getParameter("confirm_date"));
		condMap.put("quality_standard_id",  request.getParameter("quality_standard_id"));		
		condMap.put("editor", user_name);
		condMap.put("edit_date", curTime);
		try{
			int result=qualityService.insertQualityStdImplementInfo(condMap);
			if(result>0){
				initModel(true,"保存成功！",null);
			}else{
				initModel(false,"保存失败！",null);
			}
			
		}catch(Exception e){
			initModel(false,"保存失败！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping(value="/uploadMaterialExceptionLogs",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadMaterialExceptionLogs(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName=file.getOriginalFilename();
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_DATE);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("8", ExcelModel.CELL_TYPE_STRING);
		dataType.put("9", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("14", ExcelModel.CELL_TYPE_STRING);
		dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
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
		Map<String,Object> factoryMap=baseDataService.getFactoryList(queryMap);
		List factorydata=(List) factoryMap.get("data");
		List workshopdata=new ArrayList<>();
		Map<String,Object> busTypeMap=baseDataService.getBusTypeList(queryMap);
		List bustypedata=(List) busTypeMap.get("data");
        Map<String,Object> orderMap=orderService.getOrderListPage(queryMap);
        List orderdata=(List) orderMap.get("data");
		List<Map<String, Object>> addList = new ArrayList<Map<String, Object>>();
		for (Object[] data : excelModel.getData()) {
			Map<String, Object> infomap = new HashMap<String, Object>();
			String errorMessage="";
			if(data[0] == null){
				errorMessage="物料名称不能为空;";
			}else if(data[0].toString().trim().equals("")){
				errorMessage="物料名称不能为空;";
			}
			infomap.put("material", data[0] == null ? null : data[0].toString().trim());
			infomap.put("occur_date", data[1] == null ? null : data[1].toString().trim());
			if(data[2] == null){
				errorMessage="发生工厂不能为空;";
			}else if(data[2].toString().trim().equals("")){
				errorMessage="发生工厂不能为空;";
			}else{
				String ipmfactory=data[2].toString().trim();
				for(Object factory : factorydata){
					BmsBaseFactory entity=(BmsBaseFactory)factory;
					if(ipmfactory.equals(entity.getFactoryName())){
						infomap.put("factory", data[2].toString().trim());
						infomap.put("factory_id",entity.getId());
						Map<String,Object> workshopMap=qualityService.getWorkshopByFactoryId(entity.getId()+"");
						workshopdata=(List) workshopMap.get("data");
						break;
					}
				}
				if(infomap.get("factory")==null){
					infomap.put("factory", data[2].toString().trim());
					errorMessage+="发生工厂不存在;";
				}
			}
			if(data[3] == null){
				errorMessage="发生车间不能为空;";
			}else if(data[3].toString().trim().equals("")){
				errorMessage="发生车间不能为空;";
			}else{
				String ipmworkshop=data[3].toString().trim();
				for(Object workshop : workshopdata){
					Map entity=(Map)workshop;
					if(entity.get("name")!=null && ipmworkshop.equals(entity.get("name").toString())){
						infomap.put("workshop", data[3].toString().trim());
						infomap.put("workshop_id",entity.get("id"));
						break;
					}
				}
				if(infomap.get("workshop")==null){
					infomap.put("workshop", data[3].toString().trim());
					errorMessage+="发生车间不存在;";
				}
			}
			if(data[4]!= null && !data[4].toString().trim().equals("")){
				
				String ipmorderno=data[4].toString().trim();
				for(Object order : orderdata){
					Map<String, Object> entity=(Map<String, Object>)order;
					if(ipmorderno.equals(entity.get("order_no").toString())){
						infomap.put("order_no", data[4].toString().trim());
						infomap.put("order_id",entity.get("id"));
						break;
					}
				}
				if(infomap.get("order_no")==null){
					infomap.put("order_no", data[4].toString().trim());
					errorMessage+="订单编号不存在;";
				}
			}
			if(data[5] != null && !data[5].toString().trim().equals("")){
				String ipmbustype=data[5].toString().trim();
				for(Object bustype : bustypedata){
				 BmsBaseBusType entity=(BmsBaseBusType )bustype;
					if(ipmbustype.equals(entity.getBusTypeCode())){
						infomap.put("bus_type", data[5].toString().trim());
						infomap.put("bus_type_id",entity.getId());
						break;
					}
				}
				if(infomap.get("bus_type")==null){
					infomap.put("bus_type", data[5].toString().trim());
					errorMessage+="车型不存在;";
				}
			}else{
				errorMessage+="车型不能为空;";
			}
			
			if(data[6] == null){
				errorMessage="异常描述不能为空";
			}else if(data[6].toString().trim().equals("")){
				errorMessage="异常描述不能为空";
			}
			infomap.put("description", data[6] == null ? null : data[6].toString().trim());
			
			infomap.put("tmp_measures", data[7] == null ? null : data[7].toString().trim());
			infomap.put("fault_reason", data[8] == null ? null : data[8].toString().trim());
			infomap.put("imp_measure", data[9] == null ? null : data[9].toString().trim());
			infomap.put("bug_level", data[10] == null ? null : data[10].toString().trim());
			infomap.put("resp_unit", data[11] == null ? null : data[11].toString().trim());
			infomap.put("resp_person", data[12] == null ? null : data[12].toString().trim());
			infomap.put("verify_result", data[13] == null ? null : data[13].toString().trim());
			infomap.put("verifer", data[14] == null ? null : data[14].toString().trim());
			infomap.put("expc_finish_date", data[15] == null ? null : data[15].toString().trim());
			infomap.put("memo", data[16] == null ? null : data[16].toString().trim());
			if(!errorMessage.equals("")){
				infomap.put("error", errorMessage);
			}
			addList.add(infomap);
		}
		initModel(true,"",addList);
		
		}catch(Exception e){
			initModel(false,e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	@RequestMapping("saveMaterialExceptionLogsByBatch")
	@ResponseBody
	public ModelMap saveMaterialExceptionLogsByBatch(){
	    Map<String,Object> map=new HashMap<String,Object>();
		JSONArray add_arr=JSONArray.fromObject(request.getParameter("addList"));
		Iterator it=add_arr.iterator();
		List<Map<String,Object>> detail=new ArrayList<Map<String,Object>>();
		while(it.hasNext()){
			JSONObject jel=(JSONObject) it.next();
			Map<String,Object> object=(Map<String, Object>) JSONObject.toBean(jel, Map.class);
			detail.add(object);
		}
		map.put("list", detail);
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		map.put("creator_id", userid);
		map.put("edit_date", curTime);
		try{
			int result=qualityService.saveMaterialExceptionLogsByBatch(map);
			if(result>0){
				initModel(true,"保存成功！",null);
			}else{
				initModel(false,"保存成功！",null);
			}
			
		}catch(Exception e){
			logger.error(e.getMessage());
			initModel(false,"保存失败！"+e.getMessage(),null);
		}
		return mv.getModelMap();
	}
	
	@RequestMapping("/getWorkshopByFactoryId")
	@ResponseBody
	public ModelMap getWorkshopByFactoryId(){
		String factory_id=request.getParameter("factory_id");
		Map<String, Object> result = qualityService.getWorkshopByFactoryId(factory_id);
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/testingDate")
	public ModelAndView testingDate(){ 				//检测数据查询
		mv.setViewName("quality/testingDate");
        return mv;  
    }
	
	@RequestMapping("/testingDateReport")
	public ModelAndView testingDateReport(){ 		//检测数据报表（已同步到本地数据库数据）
		mv.setViewName("quality/testingDateReport");
        return mv;  
    }
	
	@RequestMapping("/testingDateReportPrint")		//检测数据报表 打印
	public ModelAndView testingDateReportPrint(){
		mv.setViewName("quality/testingDateReportPrint");
        return mv;
	}
	
	/**
	 * 查询检测线数据 制程品质->检测数据查询->查询
	 */
	@RequestMapping("/getTestingDateList")
	@ResponseBody
	public ModelMap getTestingDateList() {
		String factory_id=request.getParameter("factory_id");
		String order_no=request.getParameter("order_no");
		String bus_number=request.getParameter("bus_number");
		String start_busNum=request.getParameter("start_busNum");
		String end_busNum=request.getParameter("end_busNum");
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):500;	//每一页数据条数
		Map<String,Object> condMap = new HashMap<String,Object>();
		condMap.put("factory_id", factory_id);
		condMap.put("order_no", order_no);
		condMap.put("bus_number", bus_number);
		condMap.put("start_busNum", start_busNum);
		condMap.put("end_busNum", end_busNum);
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		List<Map<String, String>> buslist=new ArrayList<Map<String, String>>();
		buslist = qualityService.getTestingBusList(condMap);

		List<Map<String,Object>> datalist = new ArrayList<Map<String, Object>>();
		int total = qualityService.getTestingBusListCount(condMap);
		for(int i=0;i<buslist.size();i++) {
			Map<String,Object> condMap2 = new HashMap<String,Object>();
			condMap2.put("vin", buslist.get(i).get("vin"));
			Map<String, Object> testingInfo =new HashMap<String,Object>();
			if(factory_id.equals("16")) {		//长沙工厂
				testingInfo = qualityService.getBusTestingDateCS(condMap2);
			}
			// TODO 其他工厂	
			
			
			if(testingInfo != null) {
				testingInfo.put("bus_number", buslist.get(i).get("bus_number"));
				datalist.add(testingInfo);
			}else{
				testingInfo =new HashMap<String,Object>();
				testingInfo.put("bus_number", buslist.get(i).get("bus_number"));
				testingInfo.put("VIN", buslist.get(i).get("vin"));
				datalist.add(testingInfo);
			}
			
		}
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("draw", (request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1);
		result.put("recordsTotal", total);
		result.put("recordsFiltered", total);
		result.put("data", datalist);
		model.addAllAttributes(result);
		return model;
	}
	
	/**
	 * 同步检测线数据到本地数据库 制程品质->检测数据查询->同步
	 */
	@RequestMapping("/getTestingDateSync")
	@ResponseBody
	public ModelMap getTestingDateSync() {
		String factory_id=request.getParameter("factory_id");
		String vin= request.getParameter("vin");
		JSONArray jsonArray=JSONArray.fromObject(vin);
		for (int i = 0; i < jsonArray.size(); i++) {
			Map<String,Object> condMap2 = new HashMap<String,Object>();
			condMap2.put("vin", jsonArray.get(i));
			Map<String, Object> testingInfo =new HashMap<String,Object>();
			if(factory_id.equals("16")) {			//长沙工厂
				testingInfo = qualityService.getBusTestingDateCS(condMap2);
			}
			// TODO 其他工厂	
			
			testingInfo.put("factory_id", factory_id);
			if(testingInfo != null) {
				//判断bms_jcx JCX_BUS_INFO 此车辆信息是否存在，存在则更新，否则新增
				int check = qualityService.checkJcxBusInfoId(condMap2);
				if(check == 0) {
					qualityService.insertJcxBusInfo(testingInfo);
				}else {
					qualityService.updateJcxBusInfo(testingInfo);
				}
			}
		}
		initModel(true,"SUCCESS",null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getTestingDateListReport")
	@ResponseBody
	public ModelMap getTestingDateListReport() {
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):500;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("bus_type", request.getParameter("bus_type"));
		condMap.put("order_id", request.getParameter("order_id"));
		condMap.put("vin", request.getParameter("vin"));
		condMap.put("isPassed", request.getParameter("isPassed"));
		condMap.put("start_busNum", request.getParameter("start_busNum"));
		condMap.put("end_busNum", request.getParameter("end_busNum"));
		condMap.put("date_start", request.getParameter("date_start"));
		condMap.put("date_end", request.getParameter("date_end"));
		
		Map<String,Object> list = qualityService.getTestingDateReport(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getTestingDateInfo")
	@ResponseBody
	public ModelMap getTestingDateInfo() {
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("vin", request.getParameter("vin"));
		Map<String,Object> list = qualityService.getTestingInfo(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getTestingDate")
	@ResponseBody
	public ModelMap getTestingDate() {
		qualityService.getTestingDate();
		return model;
	}
}
