package com.byd.bms.hr.controller;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.byd.bms.hr.service.IHrBaseDataService;
import com.byd.bms.util.controller.BaseController;
/**
 * HR基础数据Controller
 * @author tangjin 2017-07-12
 */ 
@Controller
@RequestMapping("/hrBaseData")
public class HrBaseDataController extends BaseController {

	static Logger logger = Logger.getLogger("HR");
	@Autowired
	protected IHrBaseDataService hrBaseDataService;
    private static List orgList;
	
	public List getOrgList() {
		return orgList;
	}

	public void setOrgList(List orgList) {
		this.orgList = orgList;
	}
	//组织架构
	@RequestMapping("/orgData")
	public ModelAndView orgDataPage() {
		mv.setViewName("hr/orgData");
		return mv;
	}
	
	// 获取组织架构tree型菜单
	@RequestMapping("/getOrgDataTreeList")
	@ResponseBody
	public ModelMap getOrgDataTreeList() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		String id = request.getParameter("id");
		queryMap.put("id", id);
		List result = hrBaseDataService.getOrgDataTreeList(queryMap);
		if(request.getParameter("id")==null){
			this.setOrgList(result);
		}

		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
        map.put( "success",true);
		model.addAllAttributes(map);
        return model;
	}
	// 根据parent_id查询该子节点菜单
	@RequestMapping("/getOrgDataByParentId")
	@ResponseBody
	public ModelMap getOrgDataByParentId() {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		String id = request.getParameter("id");
		String parent_id = request.getParameter("parent_id");
		conditionMap.put("id", id);
		conditionMap.put("parent_id", parent_id);
		List result = hrBaseDataService.getOrgDataByParentId(conditionMap);
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
        model.addAllAttributes(map);
        return model;
	}
	/**
	 * 修改组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/editOrgData")
	@ResponseBody
	public ModelMap editOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();
        conditionMap.put("parent_id", request.getParameter("parent_id"));
		conditionMap.put("org_type", request.getParameter("org_type"));
		conditionMap.put("org_kind", request.getParameter("org_kind"));
		conditionMap.put("name", request.getParameter("name"));
		conditionMap.put("name_en", request.getParameter("name_en"));
		conditionMap.put("org_code", request.getParameter("org_code"));
		conditionMap.put("manager", request.getParameter("manager"));
		conditionMap.put("responsibilities",
				request.getParameter("responsibilities"));
		conditionMap.put("deleted", "0");
		conditionMap.put("editor_id", editor_id);
		conditionMap.put("edit_date", curTime);

		conditionMap.put("id", request.getParameter("id"));

		int result = hrBaseDataService.editOrgData(conditionMap);
		if(result==1){
			conditionMap.put("success",true);
			model.addAllAttributes(conditionMap);
		}
		return model;
	}
	/**
	 * 删除组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/deleteOrgData")
	@ResponseBody
	public ModelMap deleteOrgData() throws UnsupportedEncodingException {
		
		Map<String, Object> conditionMap = new HashMap<String, Object>();

		conditionMap.put("id", request.getParameter("id"));

		//生成子tree
		TreeNode t = recursiveTree(request.getParameter("id"),this.getOrgList());
		//递归删除子tree的所有节点
		traverseTreeDeleteOrg(t);
		//删除当前节点
		int result = hrBaseDataService.deleteOrgData(conditionMap);

		return null;
	}
	public void traverseTreeDeleteOrg(TreeNode node){
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("id", n.getId());
			hrBaseDataService.deleteOrgData(conditionMap);
			traverseTreeDeleteOrg(n);
		}
	}
	/**
	 * 添加组织结构
	 * 
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@RequestMapping("/addOrgData")
	@ResponseBody
	public ModelMap addOrgData() throws UnsupportedEncodingException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		
			Map<String, Object> conditionMap = new HashMap<String, Object>();

			conditionMap.put("parent_id", request.getParameter("parent_id"));
			conditionMap.put("org_type", request.getParameter("org_type"));
			conditionMap.put("org_kind", request.getParameter("org_kind"));
			conditionMap.put("name", request.getParameter("name"));
			conditionMap.put("name_en", request.getParameter("name_en"));
			conditionMap.put("org_code", request.getParameter("org_code"));
			conditionMap
					.put("sort_number", request.getParameter("sort_number"));
			conditionMap.put("manager", request.getParameter("manager"));
			conditionMap.put("responsibilities",
					request.getParameter("responsibilities"));
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", editor_id);
			conditionMap.put("edit_date", curTime);
			
			//数据插入成功后返回新插入数据的id
			conditionMap.put("id", "");
			
			int result = hrBaseDataService.addOrgData(conditionMap);
			
			//复制
			if(request.getParameter("id")!=null){
				//生成子tree
				TreeNode t = recursiveTree(request.getParameter("id"),this.getOrgList());
				//递归复制子tree的所有节点
				traverseTreeCopyOrg(t,conditionMap.get("id").toString());
			}

			if(result==1){
				conditionMap.put("success",true);
				model.addAllAttributes(conditionMap);
			}
			return model;
		
	}
	public void traverseTreeCopyOrg(TreeNode node,String parent){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		for(TreeNode n :(List<TreeNode>)node.getNodes()){
			//do something
			
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			conditionMap.put("parent_id", parent);
			conditionMap.put("org_type", n.getOrg_type());
			conditionMap.put("org_kind", n.getOrg_kind());
			conditionMap.put("name", n.getDisplay_name());
			conditionMap.put("name_en", n.getName());
			conditionMap.put("org_code", n.getShort_name());
			conditionMap
					.put("sort_number", n.getSort_number());
			conditionMap.put("manager", n.getManager());
			conditionMap.put("responsibilities",
					n.getResponsibilities());
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", editor_id);
			conditionMap.put("edit_date", curTime);
			
			conditionMap.put("id", "");
			
			//conditionMap.put("id", n.getId());
			hrBaseDataService.addOrgData(conditionMap);
			traverseTreeCopyOrg(n,conditionMap.get("id").toString());
		}
	}
	
	/**
	 * 递归算法解析成树形结构
	 *
	 * @param id
	 * @return
	 * @author wx
	 */
	public TreeNode recursiveTree(String id,List<HashMap<Object,Object>> s) {
		// 根据cid获取节点对象(SELECT * FROM tb_tree t WHERE t.cid=?)
		TreeNode node = getTreeNode(id,s);
		// 查询cid下的所有子节点(SELECT * FROM tb_tree t WHERE t.pid=?)
		List<TreeNode> childTreeNodes = queryTreeNode(id,s);
		// 遍历子节点
		for (TreeNode child : childTreeNodes) {
			TreeNode n = recursiveTree(child.getId(),s); // 递归
			node.getNodes().add(n);
		}

		return node;
	}

	private List<TreeNode> queryTreeNode(String id,List<HashMap<Object,Object>> s) {
		List list = new ArrayList();
		for(HashMap<Object,Object> h : s){
			if(h.get("parent_id")==null){
				//
			}else
			if(h.get("parent_id").toString().equals(id)){
				TreeNode tn = new TreeNode();
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent_id")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent_id").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
				list.add(tn);
			}
		}
		return list;
	}

	private TreeNode getTreeNode(String id,List<HashMap<Object,Object>> s) {
		TreeNode tn = new TreeNode();
		for(HashMap<Object,Object> h : s){
			if(h.get("id").toString().equals(id)){
				tn.setId(h.get("id")==null?"":h.get("id").toString());
				if(h.get("parent")==null){
					tn.setParent("0");
				}else{
					tn.setParent(h.get("parent").toString());
				}
				tn.setName(h.get("name")==null?"":h.get("name").toString());
				tn.setDisplay_name(h.get("display_name")==null?"":h.get("display_name").toString());
				tn.setShort_name(h.get("short_name")==null?"":h.get("short_name").toString());
				tn.setSort_number(h.get("sort_number")==null?"0":h.get("sort_number").toString());
				tn.setManager(h.get("manager")==null?"":h.get("manager").toString());
				tn.setOrg_type(h.get("org_type")==null?"":h.get("org_type").toString());
				tn.setOrg_kind(h.get("org_kind")==null?"":h.get("org_kind").toString());
				tn.setResponsibilities(h.get("responsibilities")==null?"":h.get("responsibilities").toString());
				tn.setDeleted(h.get("deleted")==null?"":h.get("deleted").toString());
			}
		}
		return tn;
	}
	public class TreeNode implements Serializable {
		private String id;
		private String parent;
		private String name;
		private String display_name;
		private String short_name;
		private String sort_number;
		private String manager;
		private String org_type;
		private String org_kind;
		private String responsibilities;
		private String deleted;
		public String getDeleted() {
			return deleted;
		}
		public void setDeleted(String deleted) {
			this.deleted = deleted;
		}
		//子节点
		private List nodes = new ArrayList();
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getParent() {
			return parent;
		}
		public void setParent(String parent) {
			this.parent = parent;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDisplay_name() {
			return display_name;
		}
		public void setDisplay_name(String display_name) {
			this.display_name = display_name;
		}
		public String getShort_name() {
			return short_name;
		}
		public void setShort_name(String short_name) {
			this.short_name = short_name;
		}
		public String getSort_number() {
			return sort_number;
		}
		public void setSort_number(String sort_number) {
			this.sort_number = sort_number;
		}
		public String getManager() {
			return manager;
		}
		public void setManager(String manager) {
			this.manager = manager;
		}
		public String getOrg_type() {
			return org_type;
		}
		public void setOrg_type(String org_type) {
			this.org_type = org_type;
		}
		public String getOrg_kind() {
			return org_kind;
		}
		public void setOrg_kind(String org_kind) {
			this.org_kind = org_kind;
		}
		public String getResponsibilities() {
			return responsibilities;
		}
		public void setResponsibilities(String responsibilities) {
			this.responsibilities = responsibilities;
		}
		public List getNodes() {
			return nodes;
		}
		public void setNodes(List nodes) {
			this.nodes = nodes;
		}
	}
	@RequestMapping("/staffManager")
	public ModelAndView staffManager(){ 		//基础数据 员工库
		mv.setViewName("hr/staffManager");
        return mv;  
    }
	
	@RequestMapping("/workgroupPrice")
	public ModelAndView workgroupPrice(){ 		//基础数据 班组承包单价
		mv.setViewName("hr/workgroupPrice");
        return mv;  
    }

}
