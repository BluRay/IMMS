package com.byd.bms.util;

import java.util.Enumeration;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * @author Yangke 170313
 * 登录拦截器
 */
public class LoginInterceptor extends HandlerInterceptorAdapter{
	static Logger logger = Logger.getLogger("[BMS]");
	private List<String> excludedUrls;

	public void setExcludeUrls(List<String> excludeUrls) {
		this.excludedUrls = excludeUrls;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// 获得请求路径的uri
		String uri = request.getRequestURI();
		for (String url : excludedUrls) {
			if (uri.endsWith(url)) {
				return true;		//不拦截静态资源文件
			}
		}
		
		// 进入登录页面，在LoginController中判断是否已登录，有的话重定向到首页，否则进入登录界面
		if (uri.contains("/loginPage")) {
			return true;
		}
		if (uri.contains("/login")) {
			return true;
		}
		
		// 其他情况判断session中是否有key，有的话继续用户的操作
		if (request.getSession().getAttribute("user_name") != null) {
			//TODO 判断user是否拥有该请求的访问权限,没有则跳到无权限的错误提示页面
			
			//保存操作日志 TODO 先判断请求是否需要记录操作日志
			//操作日志格式：	工号		IP地址		  请求地址	  请求数据
			//				2074793 10.23.105.108 /IMMS/login order_no:123456 new_value:8888
			Enumeration<?> enu=request.getParameterNames();
			String str_request = "";
			while(enu.hasMoreElements()){  
				String paraName=(String)enu.nextElement();  
				str_request += paraName + ":" + request.getParameter(paraName) + " ";  
			}
			logger.info("-->" + request.getSession().getAttribute("user_name") + " " + request.getRemoteAddr() + " " + uri + " " + str_request);
			
			return true;
		}

		// 最后的情况就是进入登录页面
		response.sendRedirect(request.getContextPath() + "/loginPage");
		return false;
	}
}