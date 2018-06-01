package com.byd.bms.webService.service.impl;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class TestJson {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JSONObject re_json = new JSONObject();
		JSONObject responseHeader = new JSONObject();
		
		responseHeader.put("requestId", "001");
		responseHeader.put("success", "true");
		responseHeader.put("errorCode", "0");
		responseHeader.put("errorDesc", "");
		
		re_json.put("responseHeader", responseHeader);
		System.out.println(re_json.toString());
		
		
		JSONObject r_json = new JSONObject();
		JSONObject r_responseHeader = new JSONObject();
		JSONObject r_order = new JSONObject();
		//JSONObject r_productList = new JSONObject();
		List<JSONObject> r_productList = new ArrayList<JSONObject>();
		JSONObject r_product1 = new JSONObject();
		JSONObject r_product2 = new JSONObject();
		
		r_responseHeader.put("requestId", "201805080001");
		r_responseHeader.put("timeStamp", "20180508093000");
		r_responseHeader.put("requestSysSign", "");
		r_responseHeader.put("responseSysSign", "");
		r_responseHeader.put("serviceMethd", "");
		r_responseHeader.put("tokenKey", "");
		r_order.put("orderCode", "P_2018001");
		r_order.put("orderDate", "2018-01-01");
		r_order.put("order_area", "中国");
		r_order.put("order_name", "杭州");
		r_order.put("order_code", "HZ");		
		r_order.put("internal_name", "CS31");		//平台		
		r_order.put("bus_type_code", "K8");			//车型		
		r_order.put("bus_code", "BYD6121LGEV4");	//车辆型号 公告号	
		r_order.put("vehicle_class", "整车");		//整车类别
		r_order.put("order_type", "国内整车");		//订单类别 区分国内整车。。。
		r_order.put("order_qty", "100");			//订单数量
		r_order.put("productive_year", "2018");		//生产年份
		r_order.put("expect_delivery_date", "2018-12-01");	//销售期望交期
		r_order.put("Customer", "杭州巴士");			//客户名称
		r_order.put("supply_days", "120");			//供应总天数
		r_order.put("project_background", "");		//项目背景
		r_order.put("special_requirements", "");	//特殊要求
		r_order.put("editor_id", "");				//编制人
		r_order.put("edit_date", "");				//编制日期
		r_order.put("po_approval_date", "2018-01-02");		//PO批准时间
		r_order.put("synchronised_date", "");		//同步时间
		
		
		r_product1.put("order_vehicle_model", "K8-12345");	//订单整车型号
		r_product1.put("sap_materialNo", "");				//SAP总成料号
		r_product1.put("order_bus_type_code", "K8-123");	//订单车型编号
		r_product1.put("editor_id", "");					//
		r_product1.put("edit_date", "2018-01-01");			//更新时间
		r_product1.put("config_qty", "40");					//数量
		r_product1.put("vehicle_type", "客车");				//车辆类型
		r_product1.put("power_type", "纯电动");				//动力类型
		r_product1.put("internal_name", "CS31");			//
		r_product1.put("bus_type_code", "K8");				//
		r_product1.put("vin_prefix", "LC06M24F");			//
		r_product1.put("brand", "BYD");						//
		r_product1.put("wmi", "");							//
		r_product1.put("manufacturer", "BYD");				//制造商
		r_product1.put("vehicle_model", "");				//整车型号
		r_product1.put("drive_motor", "");					//驱动电机
		r_product1.put("chassis_model", "");				//底盘型号
		r_product1.put("motor_model", "");					//电机型号
		r_product1.put("vehicle_length", "8");				//车辆长度
		r_product1.put("motor_power", "200");				//电机最大功率
		r_product1.put("wheelbase", "5");					//轴距
		r_product1.put("battery_model", "");				//电池型号
		r_product1.put("battery_capacity", "1000");			//电池容量
		r_product1.put("rated_voltage", "250");				//
		r_product1.put("bus_seats", "25");					//
		r_product1.put("max_weight", "2000");				//最大允许质量
		r_product1.put("max_speed", "60");					//
		r_product1.put("light_downdip", "1");				//灯光倾下值
		r_product1.put("passenger_num", "45");				//额定载客
		r_product1.put("color", "RED");						//
		r_product1.put("tire_type", "");					//
		r_product1.put("spring_num", "6");					//弹簧片数
		r_product1.put("memo", "");							//
		
		r_product2.put("order_vehicle_model", "K8-12345");	//订单整车型号
		r_product2.put("sap_materialNo", "");				//SAP总成料号
		r_product2.put("order_bus_type_code", "K8-123");	//订单车型编号
		r_product2.put("editor_id", "");					//
		r_product2.put("edit_date", "2018-01-01");			//更新时间
		r_product2.put("config_qty", "60");					//数量
		r_product2.put("vehicle_type", "客车");				//车辆类型
		r_product2.put("power_type", "纯电动");				//动力类型
		r_product2.put("internal_name", "CS31");			//
		r_product2.put("bus_type_code", "K8");				//
		r_product2.put("vin_prefix", "LC06M24F");			//
		r_product2.put("brand", "BYD");						//
		r_product2.put("wmi", "");							//
		r_product2.put("manufacturer", "BYD");				//制造商
		r_product2.put("vehicle_model", "");				//整车型号
		r_product2.put("drive_motor", "");					//驱动电机
		r_product2.put("chassis_model", "");				//底盘型号
		r_product2.put("motor_model", "");					//电机型号
		r_product2.put("vehicle_length", "8");				//车辆长度
		r_product2.put("motor_power", "200");				//电机最大功率
		r_product2.put("wheelbase", "5");					//轴距
		r_product2.put("battery_model", "");				//电池型号
		r_product2.put("battery_capacity", "1000");			//电池容量
		r_product2.put("rated_voltage", "250");				//
		r_product2.put("bus_seats", "25");					//
		r_product2.put("max_weight", "2000");				//最大允许质量
		r_product2.put("max_speed", "60");					//
		r_product2.put("light_downdip", "1");				//灯光倾下值
		r_product2.put("passenger_num", "45");				//额定载客
		r_product2.put("color", "RED");						//
		r_product2.put("tire_type", "");					//
		r_product2.put("spring_num", "6");					//弹簧片数
		r_product2.put("memo", "");							//
		
		
		r_productList.add(r_product1);
		r_productList.add(r_product2);
		r_order.put("productList", r_productList);
		
		r_json.put("responseHeader", r_responseHeader);
		r_json.put("order", r_order);
		
		System.out.println(r_json.toString());
		
		
		
		String request_json = "{\"responseHeader\":{\"timeStamp\":\"20180508093000\",\"serviceMethd\":\"\",\"tokenKey\":\"\","
				+ "\"requestId\":\"201805080001\",\"requestSysSign\":\"\",\"responseSysSign\":\"\"},"
				+ "\"order\":{\"po_approval_date\":\"2018-01-02\",\"supply_days\":\"120\",\"special_requirements\":\"\","
				+ "\"Customer\":\"杭州巴士\",\"project_background\":\"\",\"editor_id\":\"\",\"order_qty\":\"100\","
				+ "\"expect_delivery_date\":\"2018-12-01\",\"order_name\":\"杭州\",\"order_code\":\"HZ\","
				+ "\"bus_type_code\":\"K8\",\"order_area\":\"中国\",\"internal_name\":\"CS31\",\"vehicle_class\":\"整车\","
				+ "\"synchronised_date\":\"\",\"orderCode\":\"P_2018001\",\"edit_date\":\"\",\"orderDate\":\"2018-01-01\","
				+ "\"order_type\":\"国内整车\",\"bus_code\":\"BYD6121LGEV4\",\"productList\":[{\"chassis_model\":\"\","
				+ "\"color\":\"RED\",\"order_vehicle_model\":\"K8-12345\",\"vin_prefix\":\"LC06M24F\",\"vehicle_model\":\"\","
				+ "\"memo\":\"\",\"editor_id\":\"\",\"drive_motor\":\"\",\"manufacturer\":\"BYD\",\"bus_type_code\":\"K8\","
				+ "\"wmi\":\"\",\"internal_name\":\"CS31\",\"rated_voltage\":\"250\",\"brand\":\"BYD\",\"tire_type\":\"\","
				+ "\"spring_num\":\"6\",\"motor_power\":\"200\",\"vehicle_length\":\"8\",\"order_bus_type_code\":\"K8-123\","
				+ "\"bus_seats\":\"25\",\"light_downdip\":\"1\",\"sap_materialNo\":\"\",\"vehicle_type\":\"客车\","
				+ "\"max_speed\":\"60\",\"motor_model\":\"\",\"config_qty\":\"40\",\"passenger_num\":\"45\","
				+ "\"max_weight\":\"2000\",\"wheelbase\":\"5\",\"battery_capacity\":\"1000\",\"edit_date\":\"2018-01-01\","
				+ "\"power_type\":\"纯电动\",\"battery_model\":\"\"},{\"chassis_model\":\"\",\"color\":\"RED\","
				+ "\"order_vehicle_model\":\"K8-12345\",\"vin_prefix\":\"LC06M24F\",\"vehicle_model\":\"\",\"memo\":\"\","
				+ "\"editor_id\":\"\",\"drive_motor\":\"\",\"manufacturer\":\"BYD\",\"bus_type_code\":\"K8\",\"wmi\":\"\","
				+ "\"internal_name\":\"CS31\",\"rated_voltage\":\"250\",\"brand\":\"BYD\",\"tire_type\":\"\","
				+ "\"spring_num\":\"6\",\"motor_power\":\"200\",\"vehicle_length\":\"8\",\"order_bus_type_code\":\"K8-123\","
				+ "\"bus_seats\":\"25\",\"light_downdip\":\"1\",\"sap_materialNo\":\"\",\"vehicle_type\":\"客车\","
				+ "\"max_speed\":\"60\",\"motor_model\":\"\",\"config_qty\":\"60\",\"passenger_num\":\"45\","
				+ "\"max_weight\":\"2000\",\"wheelbase\":\"5\",\"battery_capacity\":\"1000\",\"edit_date\":\"2018-01-01\","
				+ "\"power_type\":\"纯电动\",\"battery_model\":\"\"}],\"productive_year\":\"2018\"}}";
		
		JSONObject r_json2 = JSONObject.fromObject(request_json);
		JSONObject r_responseHeader2 = r_json2.getJSONObject("responseHeader");
		System.out.println(r_responseHeader2.get("requestId"));
		JSONObject r_order2 = r_json2.getJSONObject("order");
		System.out.println(r_order2.get("bus_code"));
		JSONArray productList = r_order2.getJSONArray("productList");
		for (int i = 0; i < productList.size(); i++) {
			System.out.println(JSONObject.fromObject(productList.get(i)).get("config_qty"));
		}
		
		
		
		
		////////////////////////////////////////////////////////////////////////////////////
		JSONObject request_json2 = new JSONObject();
		JSONObject request_responseHeader = new JSONObject();
		JSONObject request_orderConfigDetail = new JSONObject();
		//JSONObject r_productList = new JSONObject();
		List<JSONObject> request_CFGList = new ArrayList<JSONObject>();
		JSONObject request_CFG1 = new JSONObject();
		JSONObject request_CFG2 = new JSONObject();
		request_CFG1.put("order_vehicle_model", "K8-11111-A");
		request_CFG1.put("familyCode", "K8");
		request_CFG1.put("family_name", "空调类");
		request_CFG1.put("feature_code", "KT");
		request_CFG1.put("feature_name", "风机");
		request_CFG1.put("supplier_code", "12345");
		request_CFG1.put("supplierName", "供应商A");
		
		request_CFG2.put("order_vehicle_model", "K8-11111-B");
		request_CFG2.put("familyCode", "K8");
		request_CFG2.put("family_name", "空调类");
		request_CFG2.put("feature_code", "KT");
		request_CFG2.put("feature_name", "风机");
		request_CFG2.put("supplier_code", "22345");
		request_CFG2.put("supplierName", "供应商B");
		
		
		request_CFGList.add(request_CFG1);
		request_CFGList.add(request_CFG2);
		request_orderConfigDetail.put("Version", "0001");
		request_orderConfigDetail.put("ReleaseDate", "2018-05-10");
		request_orderConfigDetail.put("CFGList", request_CFGList);
		
		request_responseHeader.put("requestId", "201805080001");
		request_responseHeader.put("timeStamp", "20180508093000");
		request_responseHeader.put("requestSysSign", "");
		request_responseHeader.put("responseSysSign", "");
		request_responseHeader.put("serviceMethd", "setVehicleFeature");
		request_responseHeader.put("tokenKey", "");
		request_json2.put("responseHeader", request_responseHeader);
		request_json2.put("orderConfigDetail", request_orderConfigDetail);
		System.out.println("------------------------");
		System.out.println(request_json2.toString());
		
		////////////////////////////////////////////////////////////////////////////////////
		JSONObject request_cutting_json = new JSONObject();
		JSONObject request_cutting_responseHeader = new JSONObject();
		
		List<JSONObject> cutting_list = new ArrayList<JSONObject>();
		JSONObject request_cutting1 = new JSONObject();
		JSONObject request_cutting2 = new JSONObject();
		request_cutting1.put("order_bus_type_code", "K8-123");
		request_cutting1.put("order_vehicle_model", "K8-12345");
		request_cutting1.put("parentmat_no", "A-0001");
		request_cutting1.put("parentmat_desc", "父零部件物料描述");
		request_cutting1.put("childmat_no", "B-0001");
		request_cutting1.put("childmat_desc", "子零部件物料描述");
		request_cutting1.put("rawmat_no", "S-0001");
		request_cutting1.put("specification", "规格");
		request_cutting1.put("unit", "PCS");
		request_cutting1.put("quantity", "50");
		request_cutting1.put("memo", "");
		request_cutting1.put("source", "实际来源");
		request_cutting1.put("mat_type", "物料类型");
		request_cutting1.put("loss", "5");
		request_cutting1.put("weight", "120");
		request_cutting1.put("weight_total", "200");
		request_cutting1.put("use_workshop", "总装");
		request_cutting1.put("process", "工序");
		request_cutting1.put("assembly_position", "装配位置");
		request_cutting1.put("crafts_identification", "工艺标识");
		request_cutting1.put("filling_size_l", "12");
		request_cutting1.put("filling_size_w", "15");
		request_cutting1.put("filling_size_h", "20");
		request_cutting1.put("accuracy_demand", "精度要求");
		request_cutting1.put("surface_treatment", "表面处理");
		request_cutting1.put("crafts_memo", "工艺备注");
		request_cutting1.put("subcontracting_type", "分包类型");
		request_cutting1.put("process_sequence", "加工顺序");
		request_cutting1.put("process_flow", "工艺流程");
		request_cutting1.put("team", "所属班组");
		request_cutting1.put("change_escription", "变更说明");
		request_cutting1.put("change_subject", "变更主体");
		request_cutting1.put("start_date", "2018-01-01");
		request_cutting1.put("end_date", "2018-12-30");
		request_cutting1.put("change_id", "00001");
		request_cutting1.put("change_escription", "00002");
		request_cutting1.put("release_date", "2018-01-01");
		request_cutting1.put("reason", "变更原因");
		
		request_cutting2.put("order_bus_type_code", "K8-123");
		request_cutting2.put("order_vehicle_model", "K8-12345");
		request_cutting2.put("parentmat_no", "A-0002");
		request_cutting2.put("parentmat_desc", "父零部件物料描述");
		request_cutting2.put("childmat_no", "B-0002");
		request_cutting2.put("childmat_desc", "子零部件物料描述");
		request_cutting2.put("rawmat_no", "S-0001");
		request_cutting2.put("specification", "规格");
		request_cutting2.put("unit", "PCS");
		request_cutting2.put("quantity", "50");
		request_cutting2.put("memo", "");
		request_cutting2.put("source", "实际来源");
		request_cutting2.put("mat_type", "物料类型");
		request_cutting2.put("loss", "5");
		request_cutting2.put("weight", "120");
		request_cutting2.put("weight_total", "200");
		request_cutting2.put("use_workshop", "总装");
		request_cutting2.put("process", "工序");
		request_cutting2.put("assembly_position", "装配位置");
		request_cutting2.put("crafts_identification", "工艺标识");
		request_cutting2.put("filling_size_l", "12");
		request_cutting2.put("filling_size_w", "15");
		request_cutting2.put("filling_size_h", "20");
		request_cutting2.put("accuracy_demand", "精度要求");
		request_cutting2.put("surface_treatment", "表面处理");
		request_cutting2.put("crafts_memo", "工艺备注");
		request_cutting2.put("subcontracting_type", "分包类型");
		request_cutting2.put("process_sequence", "加工顺序");
		request_cutting2.put("process_flow", "工艺流程");
		request_cutting2.put("team", "所属班组");
		request_cutting2.put("change_escription", "变更说明");
		request_cutting2.put("change_subject", "变更主体");
		request_cutting2.put("start_date", "2018-01-01");
		request_cutting2.put("end_date", "2018-12-30");
		request_cutting2.put("change_id", "00001");
		request_cutting2.put("change_escription", "00002");
		request_cutting2.put("release_date", "2018-01-01");
		request_cutting2.put("reason", "变更原因");
		
		
		cutting_list.add(request_cutting1);
		cutting_list.add(request_cutting2);
		request_cutting_json.put("CuttingList", cutting_list);
		request_cutting_responseHeader.put("requestId", "201805080001");
		request_cutting_responseHeader.put("timeStamp", "20180508093000");
		request_cutting_responseHeader.put("requestSysSign", "");
		request_cutting_responseHeader.put("responseSysSign", "");
		request_cutting_responseHeader.put("serviceMethd", "setVehicleFeature");
		request_cutting_responseHeader.put("tokenKey", "");
		request_cutting_json.put("requestHeader", request_cutting_responseHeader);
		
		System.out.println("------------------------");
		System.out.println(request_cutting_json.toString());
	}

}
