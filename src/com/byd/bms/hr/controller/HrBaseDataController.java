package com.byd.bms.hr.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.byd.bms.hr.service.IHrBaseDataService;
import com.byd.bms.util.ExcelModel;
import com.byd.bms.util.ExcelTool;
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
	//标准岗位库
	@RequestMapping("/positionSystem")
	public ModelAndView positionSystemPage() {
		mv.setViewName("hr/positionSystem");
		return mv;
	}
	//标准人力
	@RequestMapping("/standardHuman")
	public ModelAndView standardHumanPage() {
		mv.setViewName("hr/standardHuman");
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
		conditionMap.put("salary_model", request.getParameter("salary_model"));
		conditionMap.put("customer_no_flag", request.getParameter("customer_no_flag"));

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
		int result=0;
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		String ids=request.getParameter("ids");
		List idlist=Arrays.asList(ids.split(","));
		for(Object id : idlist){
			conditionMap.put("id", (String)id);
            //生成子tree
			TreeNode t = recursiveTree((String)id,this.getOrgList());
			//递归删除子tree的所有节点
			traverseTreeDeleteOrg(t);
			//删除当前节点
			result = hrBaseDataService.deleteOrgData(conditionMap);
		}
		if(result==1){
			conditionMap.put("success",true);
			model.addAllAttributes(conditionMap);
		}
		return model;
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
			conditionMap.put("foreign_id", request.getParameter("foreign_id"));
			conditionMap.put("responsibilities",
					request.getParameter("responsibilities"));
			conditionMap.put("deleted", "0");
			conditionMap.put("editor_id", editor_id);
			conditionMap.put("edit_date", curTime);
			conditionMap.put("salary_model", request.getParameter("salary_model"));
			conditionMap.put("customer_no_flag", request.getParameter("customer_no_flag"));
			
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
	@RequestMapping(value="/uploadPositionSystem",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadPositionSystem(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName="positionSystem.xls";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileName);
		File tempfile=new File(fileName);
		file.transferTo(tempfile);
		/**
		 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
		 */
		InputStream is = new FileInputStream(tempfile);

		ExcelTool excelTool = new ExcelTool();
		excelTool.readExcel(is, excelModel);

		List<Map<String, Object>> addList = new ArrayList<Map<String, Object>>();
		for (Object[] data : excelModel.getData()) {
			Map<String, Object> infomap = new HashMap<String, Object>();

			infomap.put("job_no", data[0] == null ? null : data[0].toString().trim());
			infomap.put("job_name", data[1] == null ? null : data[1].toString().trim());
			infomap.put("basic_besponsibilit", data[2] == null ? null : data[2].toString().trim());
			infomap.put("requirements", data[3] == null ? null : data[3].toString().trim());
			infomap.put("skill_and_capability", data[4] == null ? null : data[4].toString().trim());
			infomap.put("required_train", data[5] == null ? null : data[5].toString().trim());
			infomap.put("editor_id", editor_id);
			infomap.put("edit_date", curTime);
			addList.add(infomap);
		}
		hrBaseDataService.addPositionData(addList);
		initModel(true,"导入成功！",addList);
		}catch(Exception e){
			initModel(false,"导入失败！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping(value="/editPositionData",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap editPositionData(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("id",request.getParameter("id"));
		map.put("job_no",request.getParameter("job_no"));
		map.put("job_name", request.getParameter("job_name"));
		map.put("basic_besponsibilit", request.getParameter("basic_besponsibilit"));
		map.put("requirements", request.getParameter("requirements"));
		map.put("skill_and_capability",request.getParameter("skill_and_capability"));
		map.put("required_train",request.getParameter("required_train"));
		map.put("editor_id", editor_id);
		map.put("edit_date", curTime);
		
		int result=hrBaseDataService.editPositionData(map);
		if(result==1){
			initModel(true,"编辑成功！",null);
		}
		return mv.getModelMap();
	}
	@RequestMapping("/getPositionList")
	@ResponseBody
	public ModelMap getPositionList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("start")!=null)?Integer.parseInt(request.getParameter("start")):0;		//分页数据起始数
		int length=(request.getParameter("length")!=null)?Integer.parseInt(request.getParameter("length")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("job_no", request.getParameter("job_no"));
		condMap.put("orgStr", request.getParameter("orgStr"));
		
		Map<String,Object> list = hrBaseDataService.getPositionList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/getPositionData")
	@ResponseBody
	public ModelMap getPositionData(){
	
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		Map<String, Object> result=new HashMap<String, Object>(); 
		List<Map<String,Object>> list = hrBaseDataService.getPositionData(condMap);
		if(list.size()>0){
			result.put("data",list.get(0));
		}
		mv.clear();
		mv.getModelMap().addAllAttributes(result);
		model = mv.getModelMap();
		return model;
	}
	@RequestMapping("/deletePositionData")
	@ResponseBody
	public ModelMap deletePositionData() {
		try {
			String ids = request.getParameter("ids");
			List<String> idlist = new ArrayList<String>();
			for(String id : ids.split(",")){
				idlist.add(id);
			}
			hrBaseDataService.deletePositionData(idlist);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	/**
	 * 上传标准人力
	 * @return
	 */
	@RequestMapping("/uploadStandardHuman")
	@ResponseBody
	public ModelMap uploadStandardHuman(@RequestParam(value="file",required=false) MultipartFile file){
		logger.info("uploading.....");
		String fileName="standardHuman.xls";
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		try{
		ExcelModel excelModel = new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String, Integer> dataType = new HashMap<String, Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("1", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileName);
		File tempfile=new File(fileName);
		file.transferTo(tempfile);
		/**
		 * 读取输入流中的excel文件，并且将数据封装到ExcelModel对象中
		 */
		InputStream is = new FileInputStream(tempfile);

		ExcelTool excelTool = new ExcelTool();
		excelTool.readExcel(is, excelModel);
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		List<Map<String, Object>> positionDataList = hrBaseDataService.getPositionData(conditionMap);
		List<Map<String, Object>> addList = new ArrayList<Map<String, Object>>();
		//行号
		int line=1;
		String orgId="";
		String result =null;
		for (Object[] data : excelModel.getData()) {
			line++;
			Map<String, Object> infomap = new HashMap<String, Object>();
			String factory_name=data[0].toString().trim();
			String workshop_name=data[1]!=null ? data[1].toString().trim() : "";
			String workgroup_name=data[2]!=null ? data[2].toString().trim() : "";
			
			String job_name=data[3]!=null ? data[3].toString().trim() : "";
			
			orgId=this.findTreeNodeByName(factory_name);
			if(!workshop_name.equals("")){
				orgId=this.findChildNodeByName(workshop_name, orgId);
			}
			if(!workgroup_name.equals("")){
				orgId=this.findChildNodeByName(workgroup_name, orgId);
			}
			//获得岗位id
			boolean jobFlag= false;
			for(Map<String,Object> m : positionDataList){
				if(job_name.equals(m.get("job_name").toString())){
					long job_id = (long)m.get("id");
					infomap.put("job_id", job_id);
					String job_no = (String)m.get("job_no");
					infomap.put("job_no", job_no);
					jobFlag = true;
					break;
				}
			}
			String type=data[5]!=null ? data[5].toString().trim() : "";
			if("计时".equals(type)){
				infomap.put("type", "0");
			}
			if("计件".equals(type)){
				infomap.put("type", "1");
			}
			if(null == orgId || "".equals(orgId.trim())){
				//组织结构填写有误
				result += "第"+line+"行组织结构填写有误！";
			}
			if(!jobFlag){
				//岗位在岗位库不存在
				result += "第"+line+"行填写的岗位名称在标准岗位库不存在！";
			}
			
			infomap.put("org_id", orgId);
			infomap.put("factory", factory_name);
			infomap.put("workshop", workshop_name);
			infomap.put("workgroup", workgroup_name);
			infomap.put("job_name", data[3] == null ? null : data[3].toString().trim());
			infomap.put("standard_humans", data[4] == null ? null : data[4].toString().trim());
			//infomap.put("type", type);
			infomap.put("editor_id", editor_id);
			infomap.put("edit_date", curTime);
			infomap.put("deleted", "0");
			infomap.put("line", line);
			addList.add(infomap);
		}
		if(result!=null){
			initModel(false,"导入失败："+result,null);
			
		}else{
			Map<String,Object> resultMap=hrBaseDataService.addStandardHumanData(addList);
			if(resultMap.get("error")==null){
				initModel(true,"导入成功！",addList);
			}else{
				initModel(false,(String)resultMap.get("error"),null);
			}
		}
		
		}catch(Exception e){
			initModel(false,"导入失败！",null);
		}
		return mv.getModelMap();
	}
	//根据名称获得节点id
	public String findTreeNodeByName(String name){
		if(getOrgList()==null){
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			List list = hrBaseDataService.getOrgDataTreeList(conditionMap);
			setOrgList(list);
		}
		for(Map m : (List<Map<String,Object>>)getOrgList()){
			if(name.equals(m.get("display_name")!=null?m.get("display_name").toString():"")){
				return m.get("id").toString();
			}
		}
		return null;
	}
	
	//根据节点名和父节点id获得节点id
	public  String findChildNodeByName(String name,String parentid){
		/*if(getOrgList()==null){
			Map<String, Object> conditionMap = new HashMap<String, Object>();
			List list = orgDao.getOrgData(conditionMap);
			setOrgList(list);
		}*/
		for(Map m : (List<Map<String,Object>>)getOrgList()){
			if(name.equals(m.get("display_name")!=null?m.get("display_name").toString():"") && parentid.equals(m.get("parent_id")!=null?m.get("parent_id").toString():"")){
				return m.get("id").toString();
			}
		}
		return null;
	}
	/**
	 * 判断是否数字
	 * @param str
	 * @return
	 */
	public boolean isNumeric(String str){
	   Pattern pattern = Pattern.compile("[0-9]*");
	   Matcher isNum = pattern.matcher(str);
	   if( !isNum.matches() ){
	       return false;
	   }
	   return true;
	}
	// 获取组织架构tree型菜单
	@RequestMapping("/getStandardHumanData")
	@ResponseBody
	public ModelMap getStandardHumanData() {
		Map<String, Object> queryMap = new HashMap<String, Object>();
		String id = request.getParameter("id");
		queryMap.put("org_id", id);
		queryMap.put("factory", request.getParameter("factory"));
		queryMap.put("workshop", request.getParameter("workshop"));
		queryMap.put("workgroup", request.getParameter("workgroup"));
		List result = hrBaseDataService.getStandardHumanData(queryMap);
		Map<String, Object> map = new HashMap<String, Object>();  
        map.put( "data",result);
        map.put( "success",true);
		model.addAllAttributes(map);
        return model;
	}
	@RequestMapping("/deleteStandardHumanData")
	@ResponseBody
	public ModelMap deleteStandardHumanData() {
		try {
			String id = request.getParameter("id");
			
			hrBaseDataService.deleteStandardHumanData(id);
			initModel(true, "success", "");
		} catch (Exception e) {
			initModel(false, e.getMessage(), e.toString());
		}
		model = mv.getModelMap();
		return model;
	}
	/****************START YangKe**************************************************/
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
	
	@RequestMapping("/staffDistribution")
	public ModelAndView staffDistribution(){ 	//基础数据 班组成员承包单价
		mv.setViewName("hr/staffDistribution");
        return mv;  
    }
	
	@RequestMapping("/workTimePrice")
	public ModelAndView workTimePrice(){ 		//基础数据 工时(等待)单价维护
		mv.setViewName("hr/workTimePrice");
        return mv;  
    }
	
	@RequestMapping("/getStaffList")
	@ResponseBody
	public ModelMap getStaffList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("org_id", request.getParameter("org_id"));
		condMap.put("orgType", (request.getParameter("orgType").equals(""))?0:request.getParameter("orgType"));
		condMap.put("staff_number", request.getParameter("staff_number"));
		condMap.put("staff_level", request.getParameter("staff_level"));
		condMap.put("salary_type", request.getParameter("salary_type"));
		condMap.put("job_type", request.getParameter("job_type"));
		condMap.put("job", request.getParameter("job"));
		condMap.put("workplace", request.getParameter("workplace"));
		condMap.put("status", request.getParameter("status"));
		condMap.put("orgStr", request.getParameter("orgStr"));
		
		Map<String,Object> list = hrBaseDataService.getStaffList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/dimissionStaff")
	@ResponseBody
	public ModelMap dimissionStaff(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("staff_number", request.getParameter("staff_number"));
		condMap.put("curTime", curTime);
		condMap.put("edit_user", edit_user);
		int result = hrBaseDataService.dimissionStaff(condMap);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getStaffDistribution")
	@ResponseBody
	public ModelMap getStaffDistribution(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);

		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		condMap.put("workgroup", request.getParameter("workgroup"));
		condMap.put("team", request.getParameter("team"));
		condMap.put("order_no", request.getParameter("orderId"));
		condMap.put("staff", request.getParameter("staff"));
		condMap.put("effctiveDateStart", request.getParameter("effctiveDateStart"));
		condMap.put("effctiveDateEnd", request.getParameter("effctiveDateEnd"));	
		
		Map<String,Object> list = hrBaseDataService.getStaffDistribution(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getWorkTimePriceList")
	@ResponseBody
	public ModelMap getWorkTimePriceList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("effective_date", request.getParameter("effective_date"));
		
		Map<String,Object> list = hrBaseDataService.getWorkTimePrice(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/addWorkTimePrice")
	@ResponseBody
	public ModelMap addWorkTimePrice(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("hour_type", request.getParameter("hour_type"));
		condMap.put("effective_date", request.getParameter("effective_date"));
		condMap.put("price", request.getParameter("price"));
		condMap.put("edit_date", curTime);
		condMap.put("editor_id", edit_user);
		int result = hrBaseDataService.addWorkTimePrice(condMap);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/editWorkTimePrice")
	@ResponseBody
	public ModelMap editWorkTimePrice(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("id", request.getParameter("id"));
		condMap.put("factory_id", request.getParameter("factory_id"));
		condMap.put("hour_type", request.getParameter("hour_type"));
		condMap.put("effective_date", request.getParameter("effective_date"));
		condMap.put("price", request.getParameter("price"));
		condMap.put("edit_date", curTime);
		condMap.put("editor_id", edit_user);
		int result = hrBaseDataService.editWorkTimePrice(condMap);
		initModel(true,String.valueOf(result),null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="/uploadWorkgroupPrice",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadWorkgroupPrice(@RequestParam(value="file",required=false) MultipartFile file){
		String order_no = request.getParameter("orderId");
		String effective_date = request.getParameter("effective_date");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		String result = "";
		boolean success = true;
		String fileFileName = "uploadWorkgroupPrice.xls";
		//int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_STRING);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		try{
			File staffFile = new File(fileFileName);
			file.transferTo(staffFile);
			InputStream is = new FileInputStream(staffFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			List<String> headers=excelModel.getHeader();
			if(!headers.get(0).equals("工厂")||!headers.get(1).equals("车间")||
					!headers.get(2).equals("班组")||!headers.get(3).equals("小班组")||!headers.get(4).equals("承包单价")){
				Exception e=new Exception("请使用下载的模板导入！");
				throw e;			
			}
			List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
			List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
			int dataFlag = 0;
			for(Object[] data : excelModel.getData()){
				Map<String, Object> info = new HashMap<String, Object>();
				String factory = data[0].toString().trim(); 
				info.put("factory", factory);
				info.put("workshop", data[1] == null?null:data[1].toString().trim());
				info.put("workgroup", data[2] == null?null:data[2].toString().trim());
				info.put("small_workgroup", data[3] == null?null:data[3].toString().trim());
				info.put("standard_price", data[4] == null?null:data[4].toString().trim());
				info.put("editor_id", edit_user);
				info.put("edit_date", curTime);
				info.put("effective_date", effective_date);
				info.put("order_no", order_no);
				
				//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map<String,Object> orgMap =  hrBaseDataService.getOrgInfo(info);
				if(null == orgMap){
					++dataFlag;
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					result = "用户填写的工厂、车间、班组、小班组信息有误!";
					break;
				}else{
					info.put("org_id", orgMap.get("id"));
					//根据工厂、车间、班组、小班组、订单、日期查询标准工时和单价
					Map<String,Object> map = hrBaseDataService.queryWorkgroupPrice(info);
					
					if(null != map && Integer.parseInt(map.get("id").toString()) >0){
						//修改
						info.put("id", map.get("id"));
						upDateList.add(info);
					}else{
						addList.add(info);
					}
					
					if(dataFlag>0){
						result = result+"行数据输入的工厂、车间、班组或小班组信息有误，请确认组织结构是否存在！\n";
					}
					if(success && addList.size()>0){
						//批量新增标准工时/单价
						hrBaseDataService.addWorkgroupPrice(addList);
						result =  "导入成功！";
					}
					if(success && upDateList.size()>0){
						//批量修改标准工时/单价
						hrBaseDataService.updateWorkgroupPrice(upDateList);
						result =  "导入成功！";
					}
				}
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		initModel(success,result,result);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping(value="/uploadStaffDistribution",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadStaffDistribution(@RequestParam(value="file",required=false) MultipartFile file){
		String fileFileName = "uploadStaffDistribution.xls";
		String order_no = request.getParameter("orderId");
		boolean success = true;
		String message = "";
		String effective_date = request.getParameter("effective_date");
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String edit_user = request.getSession().getAttribute("staff_number") + "";
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_STRING);
		dataType.put("3", ExcelModel.CELL_TYPE_STRING);
		dataType.put("4", ExcelModel.CELL_TYPE_NUMERIC);
		dataType.put("5", ExcelModel.CELL_TYPE_STRING);
		dataType.put("6", ExcelModel.CELL_TYPE_NUMERIC);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		try {
			Map<String,Object> disMap=new HashMap<String,Object>();
			//datalist:保存数据封装
			List<Map<String,Object>> datalist=new ArrayList<Map<String,Object>>();
			//staff number 列表
			List<String> stafflist=new ArrayList<String>();		
			File staffFile = new File(fileFileName);
			file.transferTo(staffFile);
			InputStream is = new FileInputStream(staffFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			List<String> headers=excelModel.getHeader();
			if(!headers.get(0).equals("工厂")||!headers.get(1).equals("车间")||
					!headers.get(2).equals("班组")||!headers.get(3).equals("小班组")||
					!headers.get(4).equals("工号")||!headers.get(5).equals("姓名")||
					!headers.get(6).equals("分配金额")){
				Exception e=new Exception("请使用下载的模板导入！");
				throw e;			
			}
			//遍历excel数据，将分配比例按小班组汇总保存到disMap中
    		String last_factory="";
    		String last_workshop="";
    		String last_workgroup="";
    		String last_team="";
    		int rowcount=2;
    		for(Object[] data:excelModel.getData()){
    			String factory=data[0].toString();
    			String workshop=data[1].toString();
    			String workgroup=data[2].toString();
    			String team=data[3].toString();
    			String staffNumber=data[4].toString();
    			String staffName=data[5].toString();
    			BigDecimal dist_val=new BigDecimal(data[6].toString());
    			String mapKey=factory+"-"+workshop+"-"+workgroup+"-"+team;
    			Map<String,Object> dmap=new HashMap<String,Object>();
    			dmap.put("factory", factory);
    			dmap.put("workshop", workshop);
    			dmap.put("workgroup", workgroup);
    			dmap.put("team", team);
    			dmap.put("staff_number", staffNumber);
    			dmap.put("staff_name", staffName);
    			dmap.put("order_id", order_no);
    			dmap.put("distribution", dist_val.toString());
    			dmap.put("editor", edit_user);
    			dmap.put("edit_date", curTime);
    			dmap.put("effective_date", effective_date);
    			
    			Map<String,Object> info=new HashMap<String,Object>();
    			info.put("factory", factory);
    			info.put("workshop", workshop);
    			info.put("workgroup", workgroup);
    			info.put("small_workgroup", team);
    			//校验用户填写的工厂、车间、班组、小班组、车型 信息是否正确
				Map orgMap =  hrBaseDataService.getOrgInfo(info);
				if(null == orgMap){
					//用户填写的工厂、车间、班组、小班组信息有误
					success = false;
					throw new Exception("第"+rowcount+"行信息有误，请核实组织结构信息是否正确后重新导入！");
				}
				//校验工号姓名是否匹配
    			if(hrBaseDataService.checkIsValidStaff(dmap)==0){
    				success=false;
    				message="工号“"+staffNumber+"”和姓名“"+staffName+"”不匹配！";
    				throw new Exception(message);
    			}else{
    				if(disMap.get(mapKey)!=null){
        				BigDecimal map_val=new BigDecimal((String)disMap.get(mapKey));
        				disMap.put(mapKey, (dist_val.add(map_val)).toString());
        			}else{
        				disMap.put(mapKey, dist_val.toString());
        			}
    			}
    			datalist.add(dmap);
    			stafflist.add(staffNumber);
    			rowcount++;
    		}
    		//封装cdmap用以删除对应生效日期内的需要导入员工的分配信息
    		Map<String,Object> cdmap=new HashMap<String,Object>();
    		cdmap.put("order_id", order_no);
    		cdmap.put("stafflist", stafflist);
    		cdmap.put("effective_date", effective_date);
    		for(String m_key:disMap.keySet()){
    			Map<String,Object> pmap=new HashMap<String,Object>();
    			pmap.put("order_id", order_no);
    			pmap.put("workgroup", m_key);
    			pmap.put("effective_date", effective_date);
    			Double total_price=hrBaseDataService.getWorkgroupPrice(pmap);
    			total_price=total_price==null?0:total_price;
    			if(total_price==0){
    				success=false;
    				message=m_key+"未维护班组承包单价,请维护后重新导入！";
    				throw new Exception(message);
    			}
    			if(Double.parseDouble((String)disMap.get(m_key))!=total_price){
    				success=false;
    				message=m_key+"分配金额和值不等于该班组承包单价"+total_price+",请修改后重新导入！";
    				throw new Exception(message);
    			}
    		}
    		if(success){   			
    			//先删除对应生效日期内的需要导入员工的分配信息，再导入新的数据
    			hrBaseDataService.deleteStaffDistribution(cdmap);
    			int i=hrBaseDataService.saveStaffDistribution(datalist);
    			if(i>0){
    				success=true;
    				message="导入成功！";
    			}
    		}    		
			
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,message,null);
			model = mv.getModelMap();
			return model;
		}
		
		initModel(true,message,null);
		model = mv.getModelMap();
		return model;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/uploadStaff",method=RequestMethod.POST)
	@ResponseBody
	public ModelMap uploadStaff(@RequestParam(value="file",required=false) MultipartFile file){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String curTime = df.format(new Date());
		String editor_id = request.getSession().getAttribute("user_id") + "";
		String fileFileName = "uploadStaff.xls";
		//int result = 0;
		ExcelModel excelModel =new ExcelModel();
		excelModel.setReadSheets(1);
		excelModel.setStart(1);
		Map<String,Integer> dataType = new HashMap<String,Integer>();
		dataType.put("0", ExcelModel.CELL_TYPE_STRING);
		dataType.put("1", ExcelModel.CELL_TYPE_STRING);
		dataType.put("2", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("3", ExcelModel.CELL_TYPE_DATE);
		dataType.put("4", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("5", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("6", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("7", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("8", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("9", ExcelModel.CELL_TYPE_DATE);
		dataType.put("10", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("11", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("12", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("13", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("14", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("15", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("16", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("17", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("18", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("19", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("20", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("21", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("22", ExcelModel.CELL_TYPE_DATE);
		dataType.put("23", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("24", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("25", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("26", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("27", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("28", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("29", ExcelModel.CELL_TYPE_CANNULL);
		dataType.put("30", ExcelModel.CELL_TYPE_CANNULL);
		excelModel.setDataType(dataType);
		excelModel.setPath(fileFileName);
		String result = "";
		try {
			File staffFile = new File(fileFileName);
			file.transferTo(staffFile);
			InputStream is = new FileInputStream(staffFile);
			ExcelTool excelTool = new ExcelTool();
			excelTool.readExcel(is, excelModel);
			
			if(excelModel.getData().size()>500){
				initModel(false,"不能同时导入500条以上数据！",null);
				model = mv.getModelMap();
				return model;
			}else{
				StringBuffer staff_numbers = new StringBuffer();
				boolean success = true;
				int i = 1;
				List<Map<String, Object>> queryOrgList = new ArrayList<Map<String,Object>>();
				List staffNumberList = new ArrayList();
				for(Object[] data : excelModel.getData()){
					++i;
					if(null != data[0] && StringUtils.isNotBlank(data[0].toString().trim())){
						String staff_number = data[0].toString().trim();
						if(!staffNumberList.contains(staff_number)){
							staff_numbers.append(staff_number);
							staff_numbers.append(",");
							staffNumberList.add(staff_number);
						}else{
							success = false;
							result = result+"第"+i+"行存在重复工号信息："+staff_number+"！\n";
						}
					}else{
						//用户填写的工厂、车间、班组、小班组信息有误
						success = false;
						result = result+"第"+i+"行工号信息为必填项！\n";
					}
					//工厂/部	科室	车间	班组	小班组
					if(null == data[14] || StringUtils.isBlank(data[14].toString().trim())){
						//工厂/部为必填值
						success = false;
						result = result+"第"+i+"行工厂/部门信息为必填项！\n";
					}
					//组织结构信息校验
					Map queryOrgMap = new HashMap<String, Object>();
					queryOrgMap.put("plant_org", data[14].toString());
					
					if(StringUtils.isEmpty(data[15].toString().trim())&&"计件".equals(data[13].toString().trim())){
						success = false;
						result = result+"第"+i+"行计件员工的车间/科室信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[16].toString().trim())&&"计件".equals(data[13].toString().trim())){
						success = false;
						result = result+"第"+i+"行计件员工的班组信息为必填项！\n";
					}
					if(StringUtils.isEmpty(data[17].toString().trim())&&"计件".equals(data[13].toString().trim())){
						success = false;
						result = result+"第"+i+"行计件员工的小班组信息为必填项！\n";
					}
					
					if(null!=data[15] && !"".equals(data[15].toString().trim())){
						queryOrgMap.put("workshop_org", data[15]==null?null:data[15].toString());
					}
					if(null!=data[16] && !"".equals(data[16].toString().trim())){
						queryOrgMap.put("workgroup_org", data[16]==null?null:data[16].toString());
					}
					if(null!=data[17] && !"".equals(data[17].toString().trim())){
						queryOrgMap.put("team_org", data[17]==null?null:data[17].toString());
					}
					
					queryOrgList.add(queryOrgMap);
				}
				//根据用户填写的组织结构信息查询bms_base_org表
				List<Map<String, Object>> orgResultList = hrBaseDataService.getOrg(queryOrgList);
				
				//导入信息准备
				Map<String, Object> conditionMap = new HashMap<String, Object>();
				conditionMap.put("staff_numbers", staff_numbers.toString().trim());
				List<String> list = hrBaseDataService.getStaffListByStaffNumbers(conditionMap);
				
				List<Map<String, Object>> addList = new ArrayList<Map<String,Object>>();
				List<Map<String, Object>> upDateList = new ArrayList<Map<String,Object>>();
				int index = 1;
				if(success){
					for(Object[] data : excelModel.getData()){
						++index;
						//数据校验
						boolean test = true;
						for(int x=0;x< orgResultList.size(); x++){
							Map map = orgResultList.get(x);
							String plant_org = map.get("plant_org")==null?"":map.get("plant_org").toString();
							String workshop_org = map.get("workshop_org")==null?"":map.get("workshop_org").toString();
							String workgroup_org = map.get("workgroup_org")==null?"":map.get("workgroup_org").toString();
							String team_org = map.get("team_org")==null?"":map.get("team_org").toString();
							
							if(data[14] != null && !"".equals(data[14].toString()) && !data[14].equals(plant_org)){
								test = false;
							}
							if(data[15] != null && !"".equals(data[15].toString()) && !data[15].equals(workshop_org)){
								test = false;
							}
							if(data[16] != null && !"".equals(data[16].toString()) && !data[16].equals(workgroup_org)){
								test = false;
							}
							if(data[17] != null && !"".equals(data[17].toString()) && !data[17].equals(team_org)){
								test = false;
							}
							if(test){
								break;
							}
							if(x != orgResultList.size()-1){
								test = true;
							}
							if(!test){
								success = false;
								result = result+"第"+index+"行工厂/职能部门、科室、车间、班组或者小班组信息填写有误，请确认组织结构是否存在！\n";
							}

						}
						
						if(success){
							//封装数据
							Map<String, Object> staffInfo = new HashMap<String, Object>();
							String staff_number = data[0].toString().trim(); 
							staffInfo.put("staff_number", staff_number);
							staffInfo.put("name", data[1] == null?null:data[1].toString().trim());
							staffInfo.put("sex", data[2] == null?null:data[2].toString().trim());
							staffInfo.put("birthday", data[3] == null?null:data[3].toString().trim());
							staffInfo.put("age", data[4] == null?null:data[4].toString().trim());
							staffInfo.put("highest_education", data[5] == null?null:data[5].toString().trim());
							staffInfo.put("fresh_student", data[6] == null?null:data[6].toString().trim());
							staffInfo.put("political_status", data[7] == null?null:data[7].toString().trim());
							staffInfo.put("identity_card", data[8] == null?null:data[8].toString().trim());
							staffInfo.put("factory_incoming_date", data[9] == null?null:data[9].toString().trim());
							staffInfo.put("staff_level", data[10] == null?null:data[10].toString().trim());
							staffInfo.put("basic_salary", data[11] == null?null:data[11].toString().trim());
							staffInfo.put("skill_parameter", data[12] == null?null:data[12].toString().trim());
							staffInfo.put("salary_type", data[13] == null?null:data[13].toString().trim());
							staffInfo.put("plant_org", data[14] == null?null:data[14].toString().trim());
							staffInfo.put("workshop_org", data[15] == null?null:data[15].toString().trim());
							staffInfo.put("workgroup_org", data[16] == null?null:data[16].toString().trim());
							staffInfo.put("team_org", data[17] == null?null:data[17].toString().trim());
							staffInfo.put("job", data[18] == null?null:data[18].toString().trim());
							staffInfo.put("status", data[19] == null?null:data[19].toString().trim());
							staffInfo.put("join_channel", data[20] == null?null:data[20].toString().trim());
							staffInfo.put("leave_way", data[21] == null?null:data[21].toString().trim());
							staffInfo.put("leave_date", data[22] == null?null:data[22].toString().trim());
							staffInfo.put("leave_reason", data[23] == null?null:data[23].toString().trim());
							staffInfo.put("last_company", data[24] == null?null:data[24].toString().trim());
							staffInfo.put("last_leave_reason", data[25] == null?null:data[25].toString().trim());
							staffInfo.put("phone", data[26] == null?null:data[26].toString().trim());
							staffInfo.put("family_address", data[27] == null?null:data[27].toString().trim());
							staffInfo.put("nation", data[28] == null?null:data[28].toString().trim());
							staffInfo.put("corporation", data[29] == null?null:data[29].toString().trim());
							staffInfo.put("workplace", data[30] == null?null:data[30].toString().trim());
							staffInfo.put("editor", editor_id);
							staffInfo.put("edit_date", curTime);
							
							if(list.contains(staff_number)){
								upDateList.add(staffInfo);
							}else{
								addList.add(staffInfo);
							}
						}
						
					}
					
				}
				
				if(success){
					//批量新增用户信息
					int r = hrBaseDataService.uploadStaff(addList,upDateList);
					if(r>0){
						result = "导入成功！";
					}else{
						result = "导入失败！";
					}
				}
			
			}
		
		} catch (Exception e) {
			e.printStackTrace();
			initModel(false,"导入文件的格式有误！",null);
			model = mv.getModelMap();
			return model;
		}
		
		initModel(true,result,null);
		model = mv.getModelMap();
		return model;
	}
	
	@RequestMapping("/getWorkgroupPriceList")
	@ResponseBody
	public ModelMap getWorkgroupPriceList(){
		int draw=(request.getParameter("draw")!=null)?Integer.parseInt(request.getParameter("draw")):1;	
		int start=(request.getParameter("offset")!=null)?Integer.parseInt(request.getParameter("offset")):0;		//分页数据起始数
		int length=(request.getParameter("limit")!=null)?Integer.parseInt(request.getParameter("limit")):20;	//每一页数据条数
		Map<String,Object> condMap=new HashMap<String,Object>();
		condMap.put("draw", draw);
		condMap.put("start", start);
		condMap.put("length", length);
		condMap.put("factory", request.getParameter("factory"));
		condMap.put("workshop", request.getParameter("workshop"));
		condMap.put("workgroup", request.getParameter("workgroup"));
		condMap.put("team", request.getParameter("team"));
		condMap.put("orderId", request.getParameter("orderId"));
		condMap.put("effctiveDateStart", request.getParameter("effctiveDateStart"));
		condMap.put("effctiveDateEnd", request.getParameter("effctiveDateEnd"));
		
		Map<String,Object> list = hrBaseDataService.getWorkgroupPriceList(condMap);
		mv.clear();
		mv.getModelMap().addAllAttributes(list);
		model = mv.getModelMap();
		return model;
	}
	
	/****************END YangKe**************************************************/
	
}
