package com.byd.bms.webService.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.byd.bms.order.model.BmsOrder;
import com.byd.bms.order.service.IOrderService;
import com.byd.bms.webService.service.IBomOrderService;

@WebService()  
@SOAPBinding()
public class BomOrderServiceImpl implements IBomOrderService {
	
	@Autowired
	protected IOrderService orderService;

	@Override
	@WebMethod
	public String setOrder(String request_json) {
		System.out.println("---->webService : BomOrderServiceImpl::getOrder() request_json = " + request_json);
		JSONObject re_json = new JSONObject();
		JSONObject responseHeader = new JSONObject();

		JSONObject r_json2 = JSONObject.fromObject(request_json);
		//JSONObject r_responseHeader2 = r_json2.getJSONObject("responseHeader");
		JSONObject r_order2 = r_json2.getJSONObject("order");
		String requestId = r_json2.getJSONObject("responseHeader").get("requestId").toString();
		//System.out.println(r_order2.get("bus_code"));
		JSONArray productList = r_order2.getJSONArray("productList");
		//数据校验
		Map<String, Object> condMap = new HashMap<String,Object>();
		if(r_order2.get("order_no_bom") == null || "".equals(r_order2.get("order_no_bom").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "order_no_bom 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("bus_series") == null || "".equals(r_order2.get("bus_series").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "bus_series 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("productive_year") == null || "".equals(r_order2.get("productive_year").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "productive_year生产年份不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("order_name") == null || "".equals(r_order2.get("order_name").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "order_name 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("order_code") == null || "".equals(r_order2.get("order_code").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "order_code 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("bus_type_code") == null || "".equals(r_order2.get("bus_type_code").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "bus_type_code 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}else{
			condMap.put("bus_type_code", r_order2.get("bus_type_code").toString());
			condMap.put("bus_series", r_order2.get("bus_series").toString());
			int bus_type_id = orderService.getBusTypeIdByCode(condMap);
			if(bus_type_id==0){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-2");
				responseHeader.put("errorDesc", "bus_type_code 【"+r_order2.get("bus_type_code").toString()+"】在BMS中不存在，请联系BMS管理员！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
				return re_json.toString();
			}
		}
		if(r_order2.get("order_qty") == null || "".equals(r_order2.get("order_qty").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "order_qty 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		if(r_order2.get("expect_delivery_date") == null || "".equals(r_order2.get("expect_delivery_date").toString())){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-1");
			responseHeader.put("errorDesc", "expect_delivery_date 不能为空！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
		
		try{
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String curTime = df.format(new Date());
			BmsOrder order = new BmsOrder();
			order.setOrder_no_bom(r_order2.get("order_no_bom").toString());
			order.setBus_series(r_order2.get("bus_series").toString());
			order.setBus_code(r_order2.get("bus_code").toString());
			if(r_order2.get("vehicle_class") != null)order.setVehicle_class(r_order2.get("vehicle_class").toString());
			if(r_order2.get("expect_delivery_date") != null)order.setExpect_delivery_date(r_order2.get("expect_delivery_date").toString());
			if(r_order2.get("supply_days") != null)order.setSupply_days(r_order2.get("supply_days").toString());
			if(r_order2.get("project_background") != null)order.setProject_background(r_order2.get("project_background").toString());
			if(r_order2.get("special_requirements") != null)order.setSpecial_requirements(r_order2.get("special_requirements").toString());
			if(r_order2.get("po_approval_date") != null)order.setPo_approval_date(r_order2.get("po_approval_date").toString());
			order.setOrder_source("2");
			order.setSynchronised_date(curTime);
			
			order.setOrder_no(getOrderSerialByYear(r_order2.get("productive_year").toString()));
			order.setOrder_name(r_order2.get("order_name").toString());
			order.setOrder_code(r_order2.get("order_code").toString());
			String order_type = "";
			if(r_order2.get("order_type").toString().indexOf("整车")>0)order_type="标准订单";
			if(r_order2.get("order_type").toString().indexOf("底盘")>0)order_type="底盘车";
			if(r_order2.get("order_type").toString().indexOf("KD")>0)order_type="KD件";
			order.setOrder_type(order_type);
			order.setBus_type(r_order2.get("bus_type_code").toString());
			order.setBus_type_id(orderService.getBusTypeIdByCode(condMap));
			order.setOrder_qty(Integer.valueOf(r_order2.get("order_qty").toString()));
			order.setProductive_year(r_order2.get("productive_year").toString());
			order.setDelivery_date(r_order2.get("expect_delivery_date").toString());
			if(r_order2.get("memo") != null)order.setMemo(r_order2.get("memo").toString());
			if(r_order2.get("customer") != null)order.setCustomer(r_order2.get("customer").toString());
			order.setOrder_area(r_order2.get("order_area").toString());
			
			//新增/修改 order
			int o_id = orderService.getOrderIdByBomNo(r_order2.get("order_no_bom").toString());
			if(o_id == 0){	//新增
				o_id = orderService.insertOrderByBom(order);
			}else{			//修改
				int fac_count = orderService.getFactoryOrderCountByOrderId(String.valueOf(o_id));
				if(fac_count == 0){
					//没有分配工厂可以任意修改数量
					orderService.updateOrderByBom(order);
				}else{
					//分配工厂后订单数量只能改大
					int order_qty = orderService.getOrderQtyById(String.valueOf(o_id));
					if(Integer.valueOf(r_order2.get("order_qty").toString()) < order_qty){
						responseHeader.put("success", "false");
						responseHeader.put("errorCode", "-3");
						responseHeader.put("errorDesc", "该订单BMS已经分配到工厂，订单数量不能改小，请联系BMS系统管理员！");
						re_json.put("responseHeader", responseHeader);
						System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
						return re_json.toString();
					}else{
						orderService.updateOrderByBom(order);
					}
				}
			}
			//新增/修改 orderConfig
			Map<String, Object> orderConfigMap = new HashMap<String,Object>();
			List<Map<String, String>> order_config_list = new ArrayList<Map<String, String>>();
			for (int i = 0; i < productList.size(); i++) {
				//System.out.println(JSONObject.fromObject(productList.get(i)).get("config_qty"));
				Map<String, String> orderConfig = new HashMap<String,String>();
				orderConfig.put("order_id", String.valueOf(o_id));
				orderConfig.put("order_vehicle_model", JSONObject.fromObject(productList.get(i)).get("order_vehicle_model").toString());
				orderConfig.put("sap_materialNo", JSONObject.fromObject(productList.get(i)).get("sap_materialNo").toString());
				orderConfig.put("order_bus_type_code", JSONObject.fromObject(productList.get(i)).get("order_bus_type_code").toString());
				orderConfig.put("config_qty", JSONObject.fromObject(productList.get(i)).get("config_qty").toString());
				orderConfig.put("customer", r_order2.get("customer").toString());
				orderConfig.put("vin_prefix", JSONObject.fromObject(productList.get(i)).get("vin_prefix").toString());
				orderConfig.put("vehicle_type", JSONObject.fromObject(productList.get(i)).get("vehicle_type").toString());
				orderConfig.put("brand", JSONObject.fromObject(productList.get(i)).get("brand").toString());
				orderConfig.put("wmi", JSONObject.fromObject(productList.get(i)).get("wmi").toString());
				orderConfig.put("manufacturer", JSONObject.fromObject(productList.get(i)).get("manufacturer").toString());
				orderConfig.put("vehicle_model", JSONObject.fromObject(productList.get(i)).get("vehicle_model").toString());
				orderConfig.put("chassis_model", JSONObject.fromObject(productList.get(i)).get("chassis_model").toString());
				orderConfig.put("vehicle_length", JSONObject.fromObject(productList.get(i)).get("vehicle_length").toString());
				orderConfig.put("wheelbase", JSONObject.fromObject(productList.get(i)).get("wheelbase").toString());
				orderConfig.put("power_type", JSONObject.fromObject(productList.get(i)).get("power_type").toString());
				orderConfig.put("drive_motor", JSONObject.fromObject(productList.get(i)).get("drive_motor").toString());
				orderConfig.put("motor_model", JSONObject.fromObject(productList.get(i)).get("motor_model").toString());
				orderConfig.put("motor_power", JSONObject.fromObject(productList.get(i)).get("motor_power").toString());
				orderConfig.put("battery_model", JSONObject.fromObject(productList.get(i)).get("battery_model").toString());
				orderConfig.put("battery_capacity", JSONObject.fromObject(productList.get(i)).get("battery_capacity").toString());
				orderConfig.put("rated_voltage", JSONObject.fromObject(productList.get(i)).get("rated_voltage").toString());
				orderConfig.put("passenger_num", JSONObject.fromObject(productList.get(i)).get("passenger_num").toString());
				orderConfig.put("light_downdip", JSONObject.fromObject(productList.get(i)).get("light_downdip").toString());
				orderConfig.put("spring_num", JSONObject.fromObject(productList.get(i)).get("spring_num").toString());
				orderConfig.put("max_speed", JSONObject.fromObject(productList.get(i)).get("max_speed").toString());
				orderConfig.put("max_weight", JSONObject.fromObject(productList.get(i)).get("max_weight").toString());
				orderConfig.put("tire_type", JSONObject.fromObject(productList.get(i)).get("tire_type").toString());
				orderConfig.put("color", JSONObject.fromObject(productList.get(i)).get("color").toString());
				orderConfig.put("bus_seats", JSONObject.fromObject(productList.get(i)).get("bus_seats").toString());
				orderConfig.put("config_source", "2");
				orderConfig.put("memo", JSONObject.fromObject(productList.get(i)).get("memo").toString());

				order_config_list.add(orderConfig);
			}
			orderConfigMap.put("order_config_list", order_config_list);
			
			int result = orderService.updateOrderConfigByBom(orderConfigMap);
			if(-1 == result){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-4");
				responseHeader.put("errorDesc", "系统存在其他已产生车号的配置,请联系BMS系统管理员！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
				return re_json.toString();
			}
			if(-2 == result){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-5");
				responseHeader.put("errorDesc", "数量不能小于已生成车号数,请联系BMS系统管理员！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
				return re_json.toString();
			}
		
		}catch(Exception e){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-9");
			responseHeader.put("errorDesc", "更新订单信息出错，请检查输入参数是否完整或联系BMS系统管理员！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
			return re_json.toString();
		}
			
		responseHeader.put("requestId", requestId);
		responseHeader.put("success", "true");
		responseHeader.put("errorCode", "0");
		responseHeader.put("errorDesc", "");
		
		re_json.put("responseHeader", responseHeader);
		System.out.println("---->webService : BomOrderServiceImpl::getOrder() return_json = " + re_json.toString());
		return re_json.toString();
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

	@Override
	@WebMethod
	public String setVehicleFeature(String request_json) {
		JSONObject re_json = new JSONObject();
		JSONObject responseHeader = new JSONObject();
		System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() request_json = " + request_json);
		try{
			JSONObject r_json2 = JSONObject.fromObject(request_json);
			JSONObject r_orderConfigDetail = r_json2.getJSONObject("orderConfigDetail");
			//System.out.println(r_order2.get("bus_code"));
			JSONArray CFGList = r_orderConfigDetail.getJSONArray("CFGList");
			//数据校验
			
			for (int i = 0; i < CFGList.size(); i++) {
				if(JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model") == null || "".equals(JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model"))){
					responseHeader.put("success", "false");
					responseHeader.put("errorCode", "-1");
					responseHeader.put("errorDesc", "order_vehicle_model 不能为空！");
					re_json.put("responseHeader", responseHeader);
					System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
					return re_json.toString();
				}
				if(JSONObject.fromObject(CFGList.get(i)).get("family_code") == null || "".equals(JSONObject.fromObject(CFGList.get(i)).get("family_code"))){
					responseHeader.put("success", "false");
					responseHeader.put("errorCode", "-1");
					responseHeader.put("errorDesc", "family_code 不能为空！");
					re_json.put("responseHeader", responseHeader);
					System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
					return re_json.toString();
				}
				if(JSONObject.fromObject(CFGList.get(i)).get("family_name") == null || "".equals(JSONObject.fromObject(CFGList.get(i)).get("family_name"))){
					responseHeader.put("success", "false");
					responseHeader.put("errorCode", "-1");
					responseHeader.put("errorDesc", "family_name 不能为空！");
					re_json.put("responseHeader", responseHeader);
					System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
					return re_json.toString();
				}
				if(JSONObject.fromObject(CFGList.get(i)).get("feature_code") == null || "".equals(JSONObject.fromObject(CFGList.get(i)).get("feature_code"))){
					responseHeader.put("success", "false");
					responseHeader.put("errorCode", "-1");
					responseHeader.put("errorDesc", "feature_code 不能为空！");
					re_json.put("responseHeader", responseHeader);
					System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
					return re_json.toString();
				}
				if(JSONObject.fromObject(CFGList.get(i)).get("feature_name") == null || "".equals(JSONObject.fromObject(CFGList.get(i)).get("feature_name"))){
					responseHeader.put("success", "false");
					responseHeader.put("errorCode", "-1");
					responseHeader.put("errorDesc", "feature_name 不能为空！");
					re_json.put("responseHeader", responseHeader);
					System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
					return re_json.toString();
				}
				//order_vehicle_model 判断 是否存在
				int order_config_id = orderService.getOrderConfigIdByVehicleModel(JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model").toString());
				//System.out.println("-->order_config_id = " + order_config_id);
			}
			
			for (int i = 0; i < CFGList.size(); i++) {
				Map<String, Object> orderConfigDetail = new HashMap<String,Object>();
				orderConfigDetail.put("order_config_id", String.valueOf(orderService.getOrderConfigIdByVehicleModel(JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model").toString())));
				orderConfigDetail.put("order_vehicle_model", JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model").toString());
				orderConfigDetail.put("family_code", JSONObject.fromObject(CFGList.get(i)).get("family_code").toString());
				orderConfigDetail.put("family_name", JSONObject.fromObject(CFGList.get(i)).get("family_name").toString());
				orderConfigDetail.put("feature_code", JSONObject.fromObject(CFGList.get(i)).get("feature_code").toString());
				orderConfigDetail.put("feature_name", JSONObject.fromObject(CFGList.get(i)).get("feature_name").toString());
				if(JSONObject.fromObject(CFGList.get(i)).get("supplier_code") != null)orderConfigDetail.put("supplier_code", JSONObject.fromObject(CFGList.get(i)).get("supplier_code").toString());
				if(JSONObject.fromObject(CFGList.get(i)).get("supplier_name") != null)orderConfigDetail.put("supplier_name", JSONObject.fromObject(CFGList.get(i)).get("supplier_name").toString());
				//增加/修改
				int order_config_detail_id = orderService.getOrderConfigDetailIdByVehicleModel(JSONObject.fromObject(CFGList.get(i)).get("order_vehicle_model").toString());
				if(0==order_config_detail_id){
					orderService.insertOrderConfigDetailByBom(orderConfigDetail);
				}else{
					orderService.updateOrderConfigDetailByBom(orderConfigDetail);
				}
			}
			
		}catch(Exception e){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-2");
			responseHeader.put("errorDesc", "更新数据出错，请检查输入参数是否完整或联系BMS系统管理员！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
			return re_json.toString();
		}
		
		responseHeader.put("requestId", "001");
		responseHeader.put("success", "true");
		responseHeader.put("errorCode", "0");
		responseHeader.put("errorDesc", "");
		
		re_json.put("responseHeader", responseHeader);
		System.out.println("---->webService : BomOrderServiceImpl::setVehicleFeature() return_json = " + re_json.toString());
		return re_json.toString();
	}
	
	@Override
	@WebMethod
	public String getCuttingListByDate(String request_json){
		JSONObject re_json = new JSONObject();
		JSONObject responseHeader = new JSONObject();
		System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() request_json = " + request_json);
		
		JSONObject r_json2 = JSONObject.fromObject(request_json);
		JSONArray cuttingList = r_json2.getJSONArray("CuttingList");
		//数据校验		
		for (int i = 0; i < cuttingList.size(); i++) {
			if(JSONObject.fromObject(cuttingList.get(i)).get("order_vehicle_model") == null || "".equals(JSONObject.fromObject(cuttingList.get(i)).get("order_vehicle_model"))){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-1");
				responseHeader.put("errorDesc", "order_vehicle_model 不能为空！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
				return re_json.toString();
			}
			if(JSONObject.fromObject(cuttingList.get(i)).get("order_bus_type_code") == null || "".equals(JSONObject.fromObject(cuttingList.get(i)).get("order_bus_type_code"))){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-1");
				responseHeader.put("errorDesc", "order_bus_type_code 不能为空！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
				return re_json.toString();
			}
			if(JSONObject.fromObject(cuttingList.get(i)).get("rawmat_no") == null || "".equals(JSONObject.fromObject(cuttingList.get(i)).get("rawmat_no"))){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-1");
				responseHeader.put("errorDesc", "rawmat_no 不能为空！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
				return re_json.toString();
			}
			if(JSONObject.fromObject(cuttingList.get(i)).get("parentmat_no") == null || "".equals(JSONObject.fromObject(cuttingList.get(i)).get("parentmat_no"))){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-1");
				responseHeader.put("errorDesc", "parentmat_no 不能为空！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
				return re_json.toString();
			}
			if(JSONObject.fromObject(cuttingList.get(i)).get("childmat_no") == null || "".equals(JSONObject.fromObject(cuttingList.get(i)).get("childmat_no"))){
				responseHeader.put("success", "false");
				responseHeader.put("errorCode", "-1");
				responseHeader.put("errorDesc", "childmat_no 不能为空！");
				re_json.put("responseHeader", responseHeader);
				System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
				return re_json.toString();
			}
		}
		
		try{
			for (int i = 0; i < cuttingList.size(); i++) {
				Map<String, Object> cutting_map = new HashMap<String,Object>();
				if(JSONObject.fromObject(cuttingList.get(i)).get("order_bus_type_code") != null)cutting_map.put("order_bus_type_code", JSONObject.fromObject(cuttingList.get(i)).get("order_bus_type_code").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("order_vehicle_model") != null)cutting_map.put("order_vehicle_model", JSONObject.fromObject(cuttingList.get(i)).get("order_vehicle_model").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("parentmat_no") != null)cutting_map.put("parentmat_no", JSONObject.fromObject(cuttingList.get(i)).get("parentmat_no").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("parentmat_desc") != null)cutting_map.put("parentmat_desc", JSONObject.fromObject(cuttingList.get(i)).get("parentmat_desc").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("childmat_no") != null)cutting_map.put("childmat_no", JSONObject.fromObject(cuttingList.get(i)).get("childmat_no").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("childmat_desc") != null)cutting_map.put("childmat_desc", JSONObject.fromObject(cuttingList.get(i)).get("childmat_desc").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("rawmat_no") != null)cutting_map.put("rawmat_no", JSONObject.fromObject(cuttingList.get(i)).get("rawmat_no").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("specification") != null)cutting_map.put("specification", JSONObject.fromObject(cuttingList.get(i)).get("specification").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("unit") != null)cutting_map.put("unit", JSONObject.fromObject(cuttingList.get(i)).get("unit").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("quantity") != null)cutting_map.put("quantity", JSONObject.fromObject(cuttingList.get(i)).get("quantity").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("memo") != null)cutting_map.put("memo", JSONObject.fromObject(cuttingList.get(i)).get("memo").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("source") != null)cutting_map.put("source", JSONObject.fromObject(cuttingList.get(i)).get("source").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("mat_type") != null)cutting_map.put("mat_type", JSONObject.fromObject(cuttingList.get(i)).get("mat_type").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("loss") != null)cutting_map.put("loss", JSONObject.fromObject(cuttingList.get(i)).get("loss").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("loss") != null)cutting_map.put("loss", JSONObject.fromObject(cuttingList.get(i)).get("loss").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("weight_total") != null)cutting_map.put("weight_total", JSONObject.fromObject(cuttingList.get(i)).get("weight_total").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("use_workshop") != null)cutting_map.put("use_workshop", JSONObject.fromObject(cuttingList.get(i)).get("use_workshop").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("process") != null)cutting_map.put("process", JSONObject.fromObject(cuttingList.get(i)).get("process").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("assembly_position") != null)cutting_map.put("assembly_position", JSONObject.fromObject(cuttingList.get(i)).get("assembly_position").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("crafts_identification") != null)cutting_map.put("crafts_identification", JSONObject.fromObject(cuttingList.get(i)).get("crafts_identification").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("filling_size_l") != null)cutting_map.put("filling_size_l", JSONObject.fromObject(cuttingList.get(i)).get("filling_size_l").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("filling_size_w") != null)cutting_map.put("filling_size_w", JSONObject.fromObject(cuttingList.get(i)).get("filling_size_w").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("filling_size_h") != null)cutting_map.put("filling_size_h", JSONObject.fromObject(cuttingList.get(i)).get("filling_size_h").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("accuracy_demand") != null)cutting_map.put("accuracy_demand", JSONObject.fromObject(cuttingList.get(i)).get("accuracy_demand").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("surface_treatment") != null)cutting_map.put("surface_treatment", JSONObject.fromObject(cuttingList.get(i)).get("surface_treatment").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("crafts_memo") != null)cutting_map.put("crafts_memo", JSONObject.fromObject(cuttingList.get(i)).get("crafts_memo").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("subcontracting_type") != null)cutting_map.put("subcontracting_type", JSONObject.fromObject(cuttingList.get(i)).get("subcontracting_type").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("process_sequence") != null)cutting_map.put("process_sequence", JSONObject.fromObject(cuttingList.get(i)).get("process_sequence").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("process_flow") != null)cutting_map.put("process_flow", JSONObject.fromObject(cuttingList.get(i)).get("process_flow").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("team") != null)cutting_map.put("team", JSONObject.fromObject(cuttingList.get(i)).get("team").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("change_escription") != null)cutting_map.put("change_escription", JSONObject.fromObject(cuttingList.get(i)).get("change_escription").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("change_subject") != null)cutting_map.put("change_subject", JSONObject.fromObject(cuttingList.get(i)).get("change_subject").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("start_date") != null)cutting_map.put("start_date", JSONObject.fromObject(cuttingList.get(i)).get("start_date").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("end_date") != null)cutting_map.put("end_date", JSONObject.fromObject(cuttingList.get(i)).get("end_date").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("change_id") != null)cutting_map.put("change_id", JSONObject.fromObject(cuttingList.get(i)).get("change_id").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("change_escription") != null)cutting_map.put("change_escription", JSONObject.fromObject(cuttingList.get(i)).get("change_escription").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("release_date") != null)cutting_map.put("release_date", JSONObject.fromObject(cuttingList.get(i)).get("release_date").toString());
				if(JSONObject.fromObject(cuttingList.get(i)).get("reason") != null)cutting_map.put("reason", JSONObject.fromObject(cuttingList.get(i)).get("reason").toString());
				
				//新增/修改
				Map<String, Object> re_map = new HashMap<String,Object>();
				re_map.put("order_vehicle_model", JSONObject.fromObject(cuttingList.get(i)).get("order_vehicle_model").toString());
				re_map.put("rawmat_no", JSONObject.fromObject(cuttingList.get(i)).get("rawmat_no").toString());
				int pmd_id = orderService.getBomPmdIdByBom(re_map);
				if(0==pmd_id){
					orderService.insertBomPmdIdByBom(cutting_map);
				}else{
					orderService.updateBomPmdIdByBom(cutting_map);
				}
				
			}
		}catch(Exception e){
			responseHeader.put("success", "false");
			responseHeader.put("errorCode", "-2");
			responseHeader.put("errorDesc", "更新数据出错，请检查输入参数是否完整或联系BMS系统管理员！");
			re_json.put("responseHeader", responseHeader);
			System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
			return re_json.toString();
		}
		
		responseHeader.put("requestId", "001");
		responseHeader.put("success", "true");
		responseHeader.put("errorCode", "0");
		responseHeader.put("errorDesc", "");
		
		re_json.put("responseHeader", responseHeader);
		System.out.println("---->webService : BomOrderServiceImpl::getCuttingListByDate() return_json = " + re_json.toString());
		return re_json.toString();
	}

}
