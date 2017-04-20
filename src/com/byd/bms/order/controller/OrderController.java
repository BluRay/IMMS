package com.byd.bms.order.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.order.service.IOrderService;
import com.byd.bms.util.controller.BaseController;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
/**
 * 订单Controller
 * @author xjw 2017-04-12
 */ 
@Controller
@RequestMapping("/order")
public class OrderController extends BaseController{
	
	static Logger logger = Logger.getLogger(OrderController.class.getName());
	@Autowired
	protected IOrderService orderService;
	
	@RequestMapping("/maintain")
	public ModelAndView maintain(){ 
		mv.setViewName("order/maintain");
        return mv;  
    } 
	
	/**
	 * ajax 获取订单列表数据
	 * @return model
	 */
	@RequestMapping("/showOrderList")
	@ResponseBody
	public ModelMap showOrderList(){
		Map<String,Object> condMap=new HashMap<String,Object>();
		int draw=Integer.parseInt(request.getParameter("draw"));//jquerydatatables 
		int start=Integer.parseInt(request.getParameter("start"));//分页数据起始数
		int length=Integer.parseInt(request.getParameter("length"));//每一页数据条数
		String orderNo=request.getParameter("orderNo");//订单编号
		String orderName=request.getParameter("orderName");//订单名称模糊匹配
		String actYear=request.getParameter("actYear");//生产年份
		String factory=request.getParameter("factory");//工厂
		String orderColumn=request.getParameter("orderColumn");//排序字段
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("orderNo", orderNo);
		condMap.put("orderName", orderName);
		condMap.put("actYear",actYear);
		condMap.put("factory", factory);
		condMap.put("orderColumn", orderColumn);
		Map<String,Object> result=orderService.getOrderListPage(condMap);
		model.addAllAttributes(result);
		
		return model;
	}
	
	/**
	 * ajax 获取车辆最近的流水
	 * @return model
	 */
	@RequestMapping("/getLatestBusSeries")
	@ResponseBody
	public ModelMap getLatestBusSeries(){
		String productive_year=request.getParameter("productive_year");
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		conditionMap.put("productive_year", productive_year);	
		int bus_num_start=orderService.getBusNumberStart(conditionMap)+1;
		model.put("latest_num_start", bus_num_start);
		return model;
	}
	/**
	 * ajax 获取订单详情
	 * @return model
	 */
	@RequestMapping("/showOrderDetailList")
	@ResponseBody
	public ModelMap showOrderDetailList(){
		Map<String,Object> conditionMap=new HashMap<String,Object>();
		if (request.getParameter("search_order_no") != null) conditionMap.put("search_order_no", request.getParameter("search_order_no"));
		if (request.getParameter("search_order_name") != null) conditionMap.put("search_order_name", request.getParameter("search_order_name"));
		if (request.getParameter("search_productive_year") != null) conditionMap.put("search_productive_year", request.getParameter("search_productive_year"));
		if ((request.getParameter("search_factory") != "")&&(request.getParameter("search_factory") != null)) conditionMap.put("search_factory", Integer.valueOf(request.getParameter("search_factory")));
		if (request.getParameter("order_id") != null){
			conditionMap.put("order_id", request.getParameter("order_id"));
		}
		if (request.getParameter("start") != null){
			conditionMap.put("start",request.getParameter("start"));
			conditionMap.put("length",request.getParameter("length"));
		}
		List datalist=new ArrayList();
		datalist=orderService.getOrderDetailList(conditionMap);	
		
		model.put("data", datalist);
		return model;
	}
	
	/**
	 * 修改订单
	 * @return model
	 */
	@RequestMapping("/editOrder")
	@ResponseBody
	public ModelMap editOrder(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String userid=String.valueOf(session.getAttribute("user_id"));
		
		String factoryOrderDetail = request.getParameter("factoryOrderDetail");//根据factoryOrderDetail合并后的工厂订单列表
		String delOrderList = request.getParameter("del_order_list");//需要删除的工厂订单列表
		String order_id=request.getParameter("data_order_id");//操作的订单id
		Map<String,String> ordermap=new HashMap<String,String>();
		ordermap.put("order_id", order_id);
		ordermap.put("delivery_date", request.getParameter("delivery_date"));
		ordermap.put("memo", request.getParameter("memo"));
		ordermap.put("curTime", curTime);
		ordermap.put("userid", userid);
		
		JsonArray jsar_del=new JsonArray();
		JsonParser parser = new JsonParser();
		JsonElement jel=parser.parse(factoryOrderDetail);
		JsonArray jsonArray = null;
		
		if(jel.isJsonArray()){
			jsonArray = jel.getAsJsonArray();
		}
		
		JsonElement jel_del=parser.parse(delOrderList);
		if(jel_del.isJsonArray()){
			jsar_del = jel_del.getAsJsonArray();
		}
		try{
			orderService.editOrder(jsar_del,jsonArray,ordermap);
			model.put("success", true);
		}catch(Exception e){
			model.put("success", false);
		}		
		
		return model;
	}
	/**
	 * 新增订单
	 * @return model
	 */
	@RequestMapping("/addOrder")
	@ResponseBody
	public ModelMap addOrder(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		int userid=(int) session.getAttribute("user_id");
		
		BmsOrder order = new BmsOrder();
		order.setOrder_no(getOrderSerialByYear(request.getParameter("data_productive_year")));
		order.setOrder_name(request.getParameter("data_order_name"));
		order.setOrder_code(request.getParameter("data_order_code"));
		order.setOrder_type(request.getParameter("data_order_type"));		
		order.setBus_type_id(Integer.parseInt(request.getParameter("data_bus_type_id")));
		order.setOrder_qty(Integer.parseInt(request.getParameter("data_order_qty")));
		order.setProductive_year(request.getParameter("data_productive_year"));
		order.setDelivery_date(request.getParameter("delivery_date"));
		order.setMemo(request.getParameter("memo"));
		order.setCustomer(request.getParameter("customer"));
		order.setEditor_id(userid);
		order.setEdit_date(curTime);
		
		String factoryOrderNum = request.getParameter("factoryOrderNum");
		try{
			orderService.createOrder(order,factoryOrderNum);
			initModel(true, "新增成功！", null);
		}catch(Exception e){
			initModel(false, "新增失败！", null);
		}
				
		return mv.getModelMap();
	}
	
	public String getOrderSerialByYear(String year){
		String order_no = orderService.getOrderSerial(year);
		String new_order_no = "";
		if (order_no == null){
			return "D" + year + "001";
		}
		int serial = Integer.parseInt(order_no.substring(5, 8)) + 1;
		if (serial < 10){
			new_order_no = order_no.substring(0, 5) + "00" + String.valueOf(serial);
		}else if (serial < 100){
			new_order_no = order_no.substring(0, 5) + "0" + String.valueOf(serial);
		}else{
			new_order_no = order_no.substring(0, 5) + String.valueOf(serial);
		}
		return new_order_no;		
	}
}
