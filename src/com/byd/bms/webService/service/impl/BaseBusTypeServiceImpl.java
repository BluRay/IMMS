package com.byd.bms.webService.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONObject;

import com.byd.bms.setting.model.BmsBaseBusType;
import com.byd.bms.setting.service.IBaseDataService;
import com.byd.bms.webService.service.IBaseBusTypeService;

@WebService
public class BaseBusTypeServiceImpl implements IBaseBusTypeService {
	@Autowired
	protected IBaseDataService baseDataService;

	
	@Override
	public String setProductType(String request) {
		//返回
		JSONObject jsonObjectRespose = new JSONObject();
		JSONObject jsonObjectResposeobj = new JSONObject();
		
		JSONObject obj = JSONObject.fromObject(request); 
		JSONObject requestHeaderObj=obj.getJSONObject("requestHeader");
		JSONObject ProductTypeObj=obj.getJSONObject("ProductType");
		if(ProductTypeObj.get("Code")==null||"".equals(ProductTypeObj.get("Code").toString())){
			jsonObjectResposeobj.put("requestId", "");
			jsonObjectResposeobj.put("success", "false");
			jsonObjectResposeobj.put("errorCode", "");
			jsonObjectResposeobj.put("errorDesc", "Code不能为空！");
		}else if(ProductTypeObj.get("Status")==null||"".equals(ProductTypeObj.get("Status").toString())){
			jsonObjectResposeobj.put("requestId", "");
			jsonObjectResposeobj.put("success", "false");
			jsonObjectResposeobj.put("errorCode", "");
			jsonObjectResposeobj.put("errorDesc", "Status不能为空！");
			
		}else{
					String Status=ProductTypeObj.get("Status").toString();
					String Code=ProductTypeObj.get("Code").toString();
					
					String parentCode="";
					if(ProductTypeObj.get("ParentCode")!=null){
						parentCode=ProductTypeObj.get("ParentCode").toString();
					}
					String updateDate="";
					if(ProductTypeObj.get("updateDate")!=null){
					    updateDate=ProductTypeObj.get("updateDate").toString();
					}
				try{
				
					if("A".equals(Status.trim())){//新增
							BmsBaseBusType busTypebean = new BmsBaseBusType();
							busTypebean.setBusTypeCode(Code);
							busTypebean.setBusSeries(parentCode);
							busTypebean.setEditDate(updateDate);
							
							baseDataService.addBusType(busTypebean);
							
							jsonObjectResposeobj.put("requestId", "");
							jsonObjectResposeobj.put("success", "true");
							jsonObjectResposeobj.put("errorCode", "");
							jsonObjectResposeobj.put("errorDesc", "");
					}else if("U".equals(Status.trim())){
						BmsBaseBusType busTypebean = new BmsBaseBusType();
						busTypebean.setBusTypeCode(Code);
						busTypebean.setBusSeries(parentCode);;
						busTypebean.setEditDate(updateDate);
						
						baseDataService.updateBusTypeByCode(busTypebean);
						
						jsonObjectResposeobj.put("requestId", "");
						jsonObjectResposeobj.put("success", "true");
						jsonObjectResposeobj.put("errorCode", "");
						jsonObjectResposeobj.put("errorDesc", "");
						
					}else if("D".equals(Status.trim())){
						Map<String, Object> condMap = new HashMap<String, Object>();
						condMap.put("busTypeCode", Code);
						condMap.put("busSeries", parentCode);
						
						baseDataService.deleteBusType(condMap);
						
						jsonObjectResposeobj.put("requestId", "");
						jsonObjectResposeobj.put("success", "true");
						jsonObjectResposeobj.put("errorCode", "");
						jsonObjectResposeobj.put("errorDesc", "");
					}
				 
				
				}catch(Exception e){
					jsonObjectResposeobj.put("requestId", "");
					jsonObjectResposeobj.put("success", "false");
					jsonObjectResposeobj.put("errorCode", "");
					jsonObjectResposeobj.put("errorDesc", e.getMessage());
				}
		}
		jsonObjectRespose.put("responseHeader", jsonObjectResposeobj);
		return jsonObjectRespose.toString();
	}

}
