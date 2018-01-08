package com.byd.bms.flow.controller;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;

import com.byd.bms.flow.model.Approval;
import com.byd.bms.flow.service.IApprovalService;
import com.byd.bms.flow.service.IFlowService;
import com.byd.bms.flow.service.imp.SnakerEngineFacets;
import com.byd.bms.util.controller.BaseController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author yuqs
 * @since 2.0
 */
@Controller("materialPurchase")
@RequestMapping(value = "/materialPurchase")
public class MaterialPurchaseController extends BaseController{
   
    @Autowired
    private SnakerEngineFacets facets;
    @Autowired
    private IApprovalService approvalService;
    @Autowired
    private IFlowService flowService;
    @RequestMapping(value = "apply", method= RequestMethod.GET)
	public String apply(Model model, String processId, String orderId, String taskId) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		String userName= session.getAttribute("user_name").toString();
    	model.addAttribute("userName", userName);
    	String userId= session.getAttribute("user_id").toString();
    	model.addAttribute("userId", userId);
    	String staffNumber= session.getAttribute("staff_number").toString();
    	model.addAttribute("staffNumber", staffNumber);
    	String department= session.getAttribute("department").toString();
    	model.addAttribute("department", department);
    	String departmentId= session.getAttribute("department_id").toString();
    	model.addAttribute("departmentId", departmentId);
    	String divisionId= session.getAttribute("division_id").toString();
    	model.addAttribute("divisionId", divisionId);
		if(StringUtils.isNotEmpty(orderId)) {
			Map<String,Object> map=flowService.getMaterialPurchaseByOrderId(orderId);
			model.addAttribute("materialPurchase", map);
		}
		if(StringUtils.isEmpty(orderId) || StringUtils.isNotEmpty(taskId)) {
			return "flow/materialPurchase/apply";
		} else {
			model.addAllAttributes(facets.flowData(orderId, "apply"));
			//返回申请的查看页面
			return "flow/materialPurchase/applyView";
		}
	}
	
	@RequestMapping(value = "applySave", method= RequestMethod.POST)
	@ResponseBody
	public ModelMap applySave(String processId, String orderId, String taskId,
			@RequestParam(value="file",required=false) MultipartFile file) {
		String user_id= session.getAttribute("user_id").toString();
		String user_name= session.getAttribute("user_name").toString();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String cur_time = df.format(new Date());
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("applier", request.getParameter("applier"));
		map.put("apply_date",request.getParameter("apply_date"));
		map.put("department",request.getParameter("department"));
		map.put("apply_type",request.getParameter("apply_type"));
		map.put("apply_kind",request.getParameter("apply_kind"));
		map.put("cost_center",request.getParameter("cost_center"));
		map.put("material_code",request.getParameter("material_code"));
		map.put("material_name",request.getParameter("material_name"));
		map.put("useage_place",request.getParameter("useage_place"));
		map.put("quantity",request.getParameter("quantity"));
		map.put("specification",request.getParameter("specification"));
		map.put("techcical_require",request.getParameter("techcical_require"));
		map.put("apply_reason",request.getParameter("apply_reason"));
		map.put("require_date",request.getParameter("require_date"));
		map.put("remark",request.getParameter("remark"));
		map.put("type","apply");
		map.put("user_id",user_id);
		map.put("user_name",user_name);
		map.put("edit_date",cur_time);
		map.put("apply.operator",request.getParameter("apply.operator"));
		map.put("applyLeader.operator",request.getParameter("applyLeader.operator"));
		map.put("purchaseBoss.operator",request.getParameter("purchase_leader"));
		map.put("departmentManager.operator",request.getParameter("departmentManager.operator"));
		String accountant= request.getParameter("accountant");
		if(accountant!=null && !accountant.equals("")){
			map.put("accountant.operator",request.getParameter("accountant"));
		}
        String bpath = "docs/upload/materialPurchase/";
		
		// 把上传的文件放到指定的路径下
		String path = request.getSession().getServletContext().getRealPath(bpath);

		// 写到指定的路径中
		File file_path = new File(path);
		// 如果指定的路径没有就创建
		if (!file_path.exists()) {
			file_path.mkdirs();
		}
		String afile_db ="";
		if (file != null) {
			if(file.getOriginalFilename().indexOf(".")>0){
				afile_db = "qcAfile_"
						+ cur_time.replace("-", "").replace(":", "").replace(" ", "")
						+ file.getOriginalFilename().substring(file.getOriginalFilename().indexOf("."),
								file.getOriginalFilename().length());
				try {
					FileUtils.copyInputStreamToFile(file.getInputStream(), new File(file_path, afile_db));
				} catch (IOException e) {
					e.printStackTrace();
				}
				
				map.put("file",bpath+ afile_db);
			}else{
				map.put("file",null);
			}
		}
        int result=flowService.saveMaterialPurchase(processId, orderId, taskId, map);
		/** 业务数据处理结束 */
        if(result>0){
			initModel(true,"",null);
		}else{
			initModel(false,"",null);
		}
		model = mv.getModelMap();
		return model;
	}

    /**
     * 由于审批类流程在各业务系统中经常出现，至此本方法是统一审批的url
     * 如果审批环节能够统一，建议使用该方法返回统一审批页面
     */
    @RequestMapping(value = "approval")
    public String approval(Model model, String processId, String orderId, String taskId, 
    		String taskName,String displayName) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		model.addAttribute("taskName", taskName);
		model.addAttribute("displayName", displayName);
        if(StringUtils.isNotEmpty(taskId)) {
        	// 查询拟稿人节点信息
        	model.addAllAttributes(facets.flowData(orderId, "apply"));
        	model.addAllAttributes(facets.flowData(orderId, "developerStart"));
        	// 查询已审批节点信息
        	List<Map<String,Object>> approvalList=flowService.findApprovalInfoByFlow(orderId,null);
        	model.addAttribute("approvalData", approvalList);
        	return "flow/materialPurchase/approval";
        } else {
            model.addAttribute("approvals", flowService.findByFlow(orderId, taskName));
            return "flow/materialPurchase/approvalView";
        }
    }

    /**
     * 审批环节的提交处理
     * 其中审批表可根据具体审批的业务进行定制，此处仅仅是举例
     */
    @RequestMapping(value = "doApproval")
    @ResponseBody
    public ModelMap doApproval() {
    	Map<String,Object> map=new HashMap<String,Object>();
    	String user_name= (String) session.getAttribute("user_name");
    	String user_id= session.getAttribute("user_id").toString();
    	map.put("orderId", request.getParameter("orderId"));
    	map.put("taskId", request.getParameter("taskId"));
    	map.put("taskName", request.getParameter("taskName"));
    	map.put("displayName", request.getParameter("displayName"));
    	map.put("description", request.getParameter("description"));
    	map.put("result", request.getParameter("result"));
    	map.put("operateTime",new DateTime().toString("yyyy-MM-dd HH:mm:ss"));
    	map.put("operator",user_name);
       
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("result", request.getParameter("result"));
        if(request.getParameter("developer")!=null){
        	params.put("developer.operator", request.getParameter("developer"));
        }
        if(request.getParameter("result").toString().equals("0")){ // 同意
            facets.execute(request.getParameter("taskId"), user_id, params);
        }else{
        	// 不同意 驳回到申请者
        	facets.executeAndJump(request.getParameter("taskId"), user_id, params, "apply");
        }
        /** 业务数据处理结束 */
        int result=flowService.saveApprovalInfo(map);

        if(result>0){
			initModel(true,"",null);
		}else{
			initModel(false,"",null);
		}
		model = mv.getModelMap();
		return model;
    }
    @RequestMapping(value = "developer")
    public String developer(Model model, String processId, String orderId, String taskId, 
    		String taskName,String displayName) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		model.addAttribute("taskName", taskName);
		model.addAttribute("displayName", displayName);
		String departmentId= session.getAttribute("department_id").toString();
    	model.addAttribute("departmentId", departmentId);
    	String divisionId= session.getAttribute("division_id").toString();
    	model.addAttribute("divisionId", divisionId);
        if(StringUtils.isNotEmpty(taskId)) {
        	// 查询拟稿人节点信息
        	model.addAllAttributes(facets.flowData(orderId, "apply"));
        	// 查询已审批节点信息
        	List<Map<String,Object>> approvalList=flowService.findApprovalInfoByFlow(orderId,null);
        	model.addAttribute("approvalData", approvalList);
        	return "flow/materialPurchase/developer";
        } else {
            model.addAttribute("approvals", flowService.findByFlow(orderId, taskName));
            return "flow/materialPurchase/developerView";
        }
    }
    @RequestMapping(value = "doDeveloper")
    @ResponseBody
    public ModelMap doDeveloper() {
    	Map<String,Object> map=new HashMap<String,Object>();
    	String user_name= (String) session.getAttribute("user_name");
    	String user_id= session.getAttribute("user_id").toString();
    	map.put("orderId", request.getParameter("orderId"));
    	map.put("taskId", request.getParameter("taskId"));
    	map.put("taskName", request.getParameter("taskName"));
    	map.put("displayName", request.getParameter("displayName"));
    	map.put("description", request.getParameter("description"));
    	map.put("urgent_item", request.getParameter("urgent_item"));
    	map.put("vendor_type", request.getParameter("vendor_type"));
    	map.put("vendor_name", request.getParameter("vendor_name"));
    	map.put("price", request.getParameter("price"));
    	map.put("amount", request.getParameter("amount"));
    	map.put("result", request.getParameter("result"));
    	map.put("type","developer");
    	map.put("operateTime",new DateTime().toString("yyyy-MM-dd HH:mm:ss"));
    	map.put("operator",user_name);
        map.put("user_id", user_id);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("result", request.getParameter("result"));
        if(request.getParameter("developer")!=null){
        	params.put("developer.operator", request.getParameter("developer"));
        }
        if(request.getParameter("result").toString().equals("0")){ // 同意
        	params.put("purchaseLeader.operator", request.getParameter("purchaseLeader"));
        	params.put("purchaseManager.operator", request.getParameter("purchaseManager"));
        	params.put("boss.operator", request.getParameter("boss"));
        }
        /** 业务数据处理结束 */
        int result=flowService.doDeveloper(map, params);

        if(result>0){
			initModel(true,"",null);
		}else{
			initModel(false,"",null);
		}
		model = mv.getModelMap();
		return model;
    }
    /**
	 * 获取审批组的用户信息
	 * @return
	 */
	@RequestMapping("getGroupListByGroupName")
	@ResponseBody
	public ModelMap getGroupListByGroupName(){
		model.clear();
		String group_name=request.getParameter("group_name");
		String org_id=request.getParameter("org_id");
		String process_name=request.getParameter("process_name");
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("group_name", group_name);
		condMap.put("process_name", process_name);
		if(org_id!=null && !org_id.equals("")){
			condMap.put("org_id", org_id);
		}
		flowService.getGroupListByGroupName(condMap,model);
		return model;
	}
	
	@RequestMapping("getMaterialPurchaseByOrderId")
	@ResponseBody
	public ModelMap getMaterialPurchaseByOrderId(){
		model.clear();
		String orderId=request.getParameter("orderId");
		Map<String,Object> result=flowService.getMaterialPurchaseByOrderId(orderId);
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	/************************移动端start****************************/
	@RequestMapping(value = "applyMobile")
    public String applyMobile(Model model, String processId, String orderId, String taskId, 
    		String taskName,String displayName) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		String userName= session.getAttribute("user_name").toString();
    	model.addAttribute("userName", userName);
    	String userId= session.getAttribute("user_id").toString();
    	model.addAttribute("userId", userId);
    	String staffNumber= session.getAttribute("staff_number").toString();
    	model.addAttribute("staffNumber", staffNumber);
    	String department= session.getAttribute("department").toString();
    	model.addAttribute("department", department);
    	String departmentId= session.getAttribute("department_id").toString();
    	model.addAttribute("departmentId", departmentId);
    	String divisionId= session.getAttribute("division_id").toString();
    	model.addAttribute("divisionId", divisionId);
		if(StringUtils.isNotEmpty(orderId)) {
			Map<String,Object> map=flowService.getMaterialPurchaseByOrderId(orderId);
			model.addAttribute("materialPurchase", map);
		}
		if(StringUtils.isEmpty(orderId) || StringUtils.isNotEmpty(taskId)) {
			return "flow/materialPurchase/applyMobile";
		} else {
			model.addAllAttributes(facets.flowData(orderId, "apply"));
			//返回申请的查看页面
			return "flow/materialPurchase/applyView";
		}
    }
	@RequestMapping(value = "approvalMobile")
    public String approvalMobile(Model model, String processId, String orderId, String taskId, 
    		String taskName,String displayName) {
		model.addAttribute("processId", processId);
		model.addAttribute("orderId", orderId);
		model.addAttribute("taskId", taskId);
		model.addAttribute("taskName", taskName);
		model.addAttribute("displayName", displayName);
        if(StringUtils.isNotEmpty(taskId)) {
        	// 查询拟稿人节点信息
        	model.addAllAttributes(facets.flowData(orderId, "apply"));
        	model.addAllAttributes(facets.flowData(orderId, "developerStart"));
        	// 查询已审批节点信息
        	List<Map<String,Object>> approvalList=flowService.findApprovalInfoByFlow(orderId,null);
        	model.addAttribute("approvalData", approvalList);
        	return "flow/materialPurchase/approvalMobile";
        } else {
            model.addAttribute("approvals", flowService.findByFlow(orderId, taskName));
            return "flow/materialPurchase/approvalView";
        }
    }
}
