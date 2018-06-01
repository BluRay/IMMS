package com.byd.bms.webService.service;

import javax.jws.WebService;

@WebService
public interface IBomOrderService {
	
	/**接口名称:订单基本信息及变更接口 由BOM系统实时调用该方法发送订单的信息。
	 * @param request_json
	 * @return
	 */
	public String setOrder(String request_json);
	
	/**
	 * 接口名称: 订单车型的配置清单及变更接口，向BMS系统中传递订单车型的配置清单的属性信息
	 * @param request_json
	 * @return
	 */
	public String setVehicleFeature(String request_json);
	
	/**
	 * 接口名称: 下料明细接口， BMS系统获取订单车型的下料明细清单的属性信息；
	 * @param request_json
	 * @return
	 */
	public String getCuttingListByDate(String request_json);
}
