package com.byd.bms.util.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.byd.bms.util.service.ICommonService;

@Controller
@RequestMapping("/common")
public class CommonController extends BaseController {
	@Autowired
	protected ICommonService commonService;
	/**
	 * added by xjw for 根据订单编号输入值模糊查询订单下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getOrderFuzzySelect")
	@ResponseBody
	public ModelMap getOrderFuzzySelect() {
		model=new ModelMap();
		String orderNo = request.getParameter("orderNo");
		String busType = request.getParameter("busType");
		String factory = request.getParameter("factory");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("orderNo", orderNo);
		condMap.put("busType", busType);
		condMap.put("factory",factory);
		model.put("data", commonService.getOrderFuzzySelect(condMap));

		return model;
	}
	/**
	 * added by xjw for 查询工厂下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getFactorySelect")
	@ResponseBody
	public ModelMap getFactorySelect(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getFactorySelect(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询工厂下拉列表(权限控制 ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getFactorySelectAuth")
	@ResponseBody
	public ModelMap getFactorySelectAuth(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getFactorySelectAuth(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询车型列表
	 * 
	 * @return
	 */
	@RequestMapping("/getBusType")
	@ResponseBody
	public ModelMap getBusType(){
		model=new ModelMap();
		model.put("data", commonService.getBusTypeSelect());

		return model;
	}
	/**
	 * added by xjw for 查询弹性建下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getKeysSelect")
	@ResponseBody
	public ModelMap getKeysSelect(){
		model=new ModelMap();
		model.put("data", commonService.getKeysSelect(request.getParameter("keyCode")
				.toString()));
		return model;
	}
	
	@RequestMapping("/getDepartmentByFactory")
	@ResponseBody
	public ModelMap getDepartmentByFactory(String factory_id){
		model=new ModelMap();
		model.put("data", commonService.getDepartmentByFactory(factory_id));
		return model;
	}
	
	@RequestMapping("/getUserInfoByCard")
	@ResponseBody
	public ModelMap getUserInfoByCard(){
		model=new ModelMap();
		model.put("data", commonService.getUserInfoByCard(request.getParameter("card_no")));
		return model;
	}
	
	/**
	 * added by xjw for 查询车间下拉列表(权限控制，ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkshopSelectAuth")
	@ResponseBody
	public ModelMap getWorkshopSelectAuth(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		String factory = request.getParameter("factory");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		condMap.put("factory", factory);
		condMap.put("workshop", request.getParameter("workshop"));
		model=new ModelMap();
		model.put("data", commonService.getWorkshopSelectAuth(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询车间下拉列表
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkshopSelect")
	@ResponseBody
	public ModelMap getWorkshopSelect(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		model=new ModelMap();
		model.put("data", commonService.getWorkshopSelect(condMap));

		return model;
	}
	
	@RequestMapping("/getReasonTypeSelect")
	@ResponseBody
	public ModelMap getReasonTypeSelect(){
		model=new ModelMap();
		model.put("data", commonService.getAllReasonType());
		return model;
	}
	
	/**
	 * 查询线别下拉列表（BMS_BASE_LINE表获取，无权限控制）
	 * @return
	 */
	@RequestMapping("/getLineSelect")
	@ResponseBody
	public ModelMap getLineSelect(){
		model=new ModelMap();
		model.put("data", commonService.getLineSelect());
		return model;
	}
	
	/**
	 * 查询线别下拉列表（BMS_BASE_PROCESS表获取，权限控制）
	 * @return
	 */
	@RequestMapping("/getLineSelectAuth")
	@ResponseBody
	public ModelMap getLineSelectAuth(){
		String staff_number = request.getSession().getAttribute("staff_number") + "";
		String function_url = request.getParameter("function_url");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", staff_number);
		condMap.put("function_url", function_url);
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		model=new ModelMap();
		model.put("data", commonService.getLineSelectAuth(condMap));
		return model;
	}
	
	
	@RequestMapping("/queryProcessList")
	@ResponseBody
	public ModelMap queryProcessList(){
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		condMap.put("line", request.getParameter("line") + "线");
		model=new ModelMap();
		model.put("data", commonService.queryProcessList(condMap));
		return model;
	}
	
	@RequestMapping("/getWorkshopSelect_Key")
	@ResponseBody
	public ModelMap getWorkshopSelect_Key() {
		model=new ModelMap();
		model.put("data", commonService.getWorkshopSelect_Key());
		return model;
	}
	
	/**
	 * 根据订单编号查询订单配置列表
	 * @return
	 */
	@RequestMapping("/getOrderConfigSelect")
	@ResponseBody
	public ModelMap getOrderConfigSelect(){
		model=new ModelMap();
		model.put("data", commonService.getOrderConfigSelect(request.getParameter("order_id")));
		return model;
	}
	
	@RequestMapping("/getPartsSelect")
	@ResponseBody
	public ModelMap getPartsSelect(){
		String parts = request.getParameter("parts");
		List<Map<String,String>> selectList = commonService.getPartsSelect(parts);
		//mv.clear();
		//model = mv.getModelMap();
		model=new ModelMap();
		model.put("data",selectList);
		return model;
	}
	
	@RequestMapping("/getPartsSelectByParts")
	@ResponseBody
	public ModelMap getPartsSelectByParts(){
		String parts = request.getParameter("parts");
		
		return model;
	}
	
	@RequestMapping("/getBusNumberFuzzySelect")
	@ResponseBody
	public ModelMap getBusNumberFuzzySelect(){
		String bus_input=request.getParameter("bus_input");
		List<Map<String,String>> selectList =commonService.getBusNumberList(bus_input);
		model=new ModelMap();
		model.put("data",selectList);
		return model;
	}
	
	/**
	 * added by xjw for 查询班组下拉列表(ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkgroupSelect")
	@ResponseBody
	public ModelMap getWorkgroupSelect(){

		String factory = request.getParameter("factory");
		String workshop = request.getParameter("workshop");
		String workgroup_input= request.getParameter("workgroup");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("workshop", workshop);
		condMap.put("workgroup", workgroup_input);
		model=new ModelMap();
		model.put("data", commonService.getWorkgroupSelect(condMap));

		return model;
	}
	
	/**
	 * added by xjw for 查询各个车间下的班组下拉列表(ORG表获取)
	 * 
	 * @return
	 */
	@RequestMapping("/getWorkgroupSelectAll")
	@ResponseBody
	public ModelMap getWorkgroupSelectAll(){

		String factory = request.getParameter("factory");
		String workshop_list = request.getParameter("workshop_list");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory", factory);
		condMap.put("workshop_list", workshop_list);
		model=new ModelMap();
		model.put("data", commonService.getWorkgroupSelectAll(condMap));

		return model;
	}
}
