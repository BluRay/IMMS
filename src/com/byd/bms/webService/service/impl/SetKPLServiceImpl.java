package com.byd.bms.webService.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.jws.WebService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;

import com.byd.bms.order.service.IOrderService;
import com.byd.bms.quality.dao.IQualityDao;
import com.byd.bms.webService.service.ISetKPLService;

@WebService
public class SetKPLServiceImpl implements ISetKPLService {

	@Autowired
	protected IOrderService orderService;
	
	@Resource(name="qualityDao")
	private IQualityDao qualityDao;

	@Override
	public String setKPL(String request) {
		//返回
		JSONObject jsonObjectRespose = new JSONObject();
		JSONObject jsonObjectResposeobj = new JSONObject();
				
		JSONObject obj = JSONObject.fromObject(request); 
		JSONObject requestHeaderObj=obj.getJSONObject("requestHeader");
		JSONObject tableObj=obj.getJSONObject("Table");
		//通过订单整车型号 获取 BMS_OR_ORDER_CONFIG  BMS_OR_ORDER, ID,order_id
		if(tableObj.get("orderVechicleModel")==null||"".equals(tableObj.get("orderVechicleModel").toString())){
			jsonObjectResposeobj.put("requestId", "");
			jsonObjectResposeobj.put("success", "false");
			jsonObjectResposeobj.put("errorCode", "");
			jsonObjectResposeobj.put("errorDesc", "orderVechicleModel不能为空！");
		}else if(tableObj.get("KPList")==null||"".equals(tableObj.get("KPList").toString())){
			jsonObjectResposeobj.put("requestId", "");
			jsonObjectResposeobj.put("success", "false");
			jsonObjectResposeobj.put("errorCode", "");
			jsonObjectResposeobj.put("errorDesc", "KPList不能为空！");
		}else{
			JSONArray KPList = tableObj.getJSONArray("KPList");
			if(KPList==null||KPList.size()==0){
				jsonObjectResposeobj.put("requestId", "");
				jsonObjectResposeobj.put("success", "false");
				jsonObjectResposeobj.put("errorCode", "");
				jsonObjectResposeobj.put("errorDesc", "KPList的内容不能为空！");		
			}else{
				try{
				String orderVechicleModel=tableObj.get("orderVechicleModel").toString();
				List<Map<String, Object>> listOrderConfigret=orderService.queryOrderConfigByVehicle(orderVechicleModel);
				if(listOrderConfigret!=null&&listOrderConfigret.size()>0){
					String configId=listOrderConfigret.get(0).get("configId").toString();
					String orderId=listOrderConfigret.get(0).get("orderId").toString();
					String busTypeId=listOrderConfigret.get(0).get("busTypeId").toString();
					
					Map<String, Object> keyParts=new HashMap<String,Object>();
					keyParts.put("bus_type_id", busTypeId);
					keyParts.put("order_id", orderId);
					keyParts.put("order_config_id", configId);
					int header_id=0;
					Map<String,Object> m=qualityDao.queryKeyPartsHeader(keyParts);
					if(m!=null){
						header_id=Integer.parseInt(m.get("id").toString());
					}
					//获取detail
					List<Map<String,String>> detail_list=new ArrayList();
					for(int i=0;i<KPList.size();i++){
						Map<String, String> detailMap = new HashMap<String,String>();
						detailMap.put("sap_mat", JSONObject.fromObject(KPList.get(i)).get("matNo").toString());
						detailMap.put("parts_no", JSONObject.fromObject(KPList.get(i)).get("partNo").toString());
						detailMap.put("parts_name", JSONObject.fromObject(KPList.get(i)).get("partName").toString());
						detailMap.put("cccNo", JSONObject.fromObject(KPList.get(i)).get("CCCNo").toString());
						detail_list.add(detailMap);
					}
					//
					Map<String,Object> smap=null;
					if(header_id==0){//头表不存在
						qualityDao.saveKeyPartsHeader(keyParts);//头表插入
						header_id=(int) keyParts.get("id");;	//新插入的 头表id
						smap=new HashMap<String,Object>();
						smap.put("header_id", header_id);
						smap.put("detail_list", detail_list);
						
						if(detail_list.size()>0){
							qualityDao.saveKeyPartsDetails(smap);
						}	
						
						jsonObjectResposeobj.put("requestId", "");
						jsonObjectResposeobj.put("success", "true");
						jsonObjectResposeobj.put("errorCode", "");
						jsonObjectResposeobj.put("errorDesc", "");
					}else{//头表存在
						List<Map<String,String>> detail_list_add=new ArrayList();
						qualityDao.updateKeyPartsHeader(keyParts);
						if(detail_list.size()>0){
							for(int j=0;j<detail_list.size();j++){
								Map<String, Object> condMap=new HashMap<String, Object>();
								condMap.put("parts_no", detail_list.get(j).get("parts_no"));
								condMap.put("parts_name", detail_list.get(j).get("parts_name"));
								List<Map<String, Object>> listdetailret=qualityDao.queryKeyPartsListByPartsNo(condMap);//按照零部件编号和名称查询
								if(listdetailret.size()==0){//如果本地数据库查询，没有则需要新增，否则不动
									detail_list_add.add(detail_list.get(j));
								}
							}
							
							smap=new HashMap<String,Object>();
							smap.put("header_id", header_id);
							smap.put("detail_list", detail_list_add);
							qualityDao.saveKeyPartsDetails(smap);//增加接口传来的比本地detail表多的数据
						}	
						
						jsonObjectResposeobj.put("requestId", "");
						jsonObjectResposeobj.put("success", "true");
						jsonObjectResposeobj.put("errorCode", "");
						jsonObjectResposeobj.put("errorDesc", "");
					}
				}
				}catch(Exception e){
					jsonObjectResposeobj.put("requestId", "");
					jsonObjectResposeobj.put("success", "false");
					jsonObjectResposeobj.put("errorCode", "");
					jsonObjectResposeobj.put("errorDesc", e.getMessage());
				}
			}
			
		}
		jsonObjectRespose.put("responseHeader", jsonObjectResposeobj);
		return jsonObjectRespose.toString();
	}

}
