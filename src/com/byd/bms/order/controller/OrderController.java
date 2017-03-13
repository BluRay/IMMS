package com.byd.bms.order.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.byd.bms.util.controller.BaseController;

@Controller
@RequestMapping("/order")
public class OrderController extends BaseController{
	
	static Logger logger = Logger.getLogger(OrderController.class.getName());
	
	@RequestMapping("/maintain")
	public ModelAndView maintain(){ 
		mv.setViewName("order/maintain");
        return mv;  
    } 
	
}
