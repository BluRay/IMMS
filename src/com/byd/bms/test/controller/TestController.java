package com.byd.bms.test.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import com.google.gson.Gson;

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
		List<BmsBaseUser> list=new ArrayList<BmsBaseUser>();
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
    
    @RequestMapping("validateVin")
    @ResponseBody
    public ModelMap validateVin(String vin,int flag){
    	Map<String,Object> param=new HashMap<String,Object>();
       /* param.put("vin","LC06S24R5G1990226");
        param.put("flag",1);*/
    	param.put("vin",vin);
        param.put("flag",flag);
        Gson gson=new Gson();
        String jsonstr=this.post("http://10.9.32.67:8082/i.dbhttpservice_bms/auto/validateVin",
        gson.toJson(param).toString());
        model.put("valresult",jsonstr);
        return model;
    }
    
    public String post(String strURL, String params) {
        try {
            URL url = new URL(strURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(3000);
            connection.setRequestMethod("POST"); // 设置请求方式
            connection.setRequestProperty("Accept", "application/json"); // 设置接收数据的格式
            connection.setRequestProperty("Content-Type", "application/json"); // 设置发送数据的格式
            connection.connect();
            OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
            out.append(params);
            out.flush();
            out.close();
            // 读取响应
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String lines;
            StringBuffer sb = new StringBuffer("");
            while ((lines = reader.readLine()) != null) {
               lines = new String(lines.getBytes(), "utf-8");
               sb.append(lines);
            }
            reader.close();
            connection.disconnect();
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "error";
     }

}
