package com.byd.bms.order.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.order.service.IOrderService;
import com.byd.bms.util.controller.BaseController;
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
	
}
