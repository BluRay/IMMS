package com.byd.bms.test.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.byd.bms.util.controller.BaseController;
import com.byd.bms.util.model.BmsBaseUser;
import com.byd.bms.util.service.ILoginService;

@Controller
public class TestController extends BaseController{
	@Autowired
	protected ILoginService loginService;
	static Logger logger = Logger.getLogger(TestController.class.getName());
	@RequestMapping("/getUser")
	@ResponseBody
	public ModelMap getUser(){
		BmsBaseUser user=new BmsBaseUser();
		String username=request.getParameter("username");
		List list=new ArrayList();
		user=loginService.getUser(username);
		list.add(user);
		initModel(true,"success",list);
		return model;
	}
	  
    @RequestMapping("/upload")  
    @ResponseBody
    public ModelMap upload(@RequestParam(value = "file", required = false) MultipartFile file) throws Exception {  
  
    	logger.info("开始");
    	try {
        String path = request.getSession().getServletContext().getRealPath("upload");  
        String fileName = file.getOriginalFilename();  
//        String fileName = new Date().getTime()+".jpg";  
        logger.info(path);  
        File targetFile = new File(path, fileName);  
        if(!targetFile.exists()){  
            targetFile.mkdirs();  
        }  
        
        //保存  
        file.transferTo(targetFile);  
        model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+fileName);  
        logger.info("fileUrl:"+request.getContextPath()+"/upload/"+fileName);
        } catch (Exception e) {  
            e.printStackTrace(); 
            logger.error(e.getMessage());
        }  
        
        
        return model;  
    } 
    @RequestMapping("createUser")
    @ResponseBody
    public ModelMap createUser(BmsBaseUser user){
    	try{
    	logger.info("测试事务回滚");
    	loginService.saveUser(user);
    	int id=user.getId();
    	logger.info("产生的userid："+id);
    	}catch(Exception e){
    		logger.error(e.getMessage());
    	}
    	
    	return model;
    }
}
