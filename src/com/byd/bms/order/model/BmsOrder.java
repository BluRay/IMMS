package com.byd.bms.order.model;

/**
 * 订单实体类
 * @author xjw 2017-04-12
 */
public class BmsOrder {
	private int id;
	private String order_no_bom;			//BOM系统订单编号
	private String bus_series;				//关联车型表 代号/内部名称(平台)
	private String bus_code;				//车辆型号（对接BOM系统-公告号BYD6121LGEV4）
	private String vehicle_class;			//整车类别（包括整车、底盘车）
	private String order_color;				//
	private String expect_delivery_date;	//销售期望交期
	private String supply_days;				//供应总天数
	private String project_background;		//项目背景
	private String special_requirements;	//特殊要求
	private String po_approval_date;		//PO批准时间
	private String order_source;			//1 BMS 2 BOM
	private String synchronised_date;		//同步时间
	private String order_no;
	private String order_name;
	private String order_name_str;
	private String order_code;
	private String order_type;
	private int bus_type_id;
	private String bus_type_code;
	private String internal_name;
	private String bus_type;
	private int order_qty;
	private int issed_qty;
	private String productive_year;
	private String delivery_date;
	private String status;
	private String memo;
	private int editor_id;
	private String edit_date;
	private String customer;
	private String order_area;
	
	public String getOrder_name_str() {
		return order_name_str;
	}
	public void setOrder_name_str(String order_name_str) {
		this.order_name_str = order_name_str;
	}
	public String getBus_type() {
		return bus_type;
	}
	public void setBus_type(String bus_type) {
		this.bus_type = bus_type;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrder_no() {
		return order_no;
	}
	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}
	public String getOrder_name() {
		return order_name;
	}
	public void setOrder_name(String order_name) {
		this.order_name = order_name;
	}
	public String getOrder_code() {
		return order_code;
	}
	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
	public int getBus_type_id() {
		return bus_type_id;
	}
	public void setBus_type_id(int bus_type_id) {
		this.bus_type_id = bus_type_id;
	}
	public int getOrder_qty() {
		return order_qty;
	}
	public void setOrder_qty(int order_qty) {
		this.order_qty = order_qty;
	}
	public String getProductive_year() {
		return productive_year;
	}
	public void setProductive_year(String productive_year) {
		this.productive_year = productive_year;
	}
	public String getDelivery_date() {
		return delivery_date;
	}
	public void setDelivery_date(String delivery_date) {
		this.delivery_date = delivery_date;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public int getEditor_id() {
		return editor_id;
	}
	public void setEditor_id(int editor_id) {
		this.editor_id = editor_id;
	}
	public String getEdit_date() {
		return edit_date;
	}
	public void setEdit_date(String edit_date) {
		this.edit_date = edit_date;
	}
	public int getIssed_qty() {
		return issed_qty;
	}
	public void setIssed_qty(int issed_qty) {
		this.issed_qty = issed_qty;
	}
	public String getOrder_type() {
		return order_type;
	}
	public void setOrder_type(String order_type) {
		this.order_type = order_type;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getOrder_area() {
		return order_area;
	}
	public void setOrder_area(String order_area) {
		this.order_area = order_area;
	}
	public String getBus_type_code() {
		return bus_type_code;
	}
	public void setBus_type_code(String bus_type_code) {
		this.bus_type_code = bus_type_code;
	}
	public String getInternal_name() {
		return internal_name;
	}
	public void setInternal_name(String internal_name) {
		this.internal_name = internal_name;
	}
	public String getOrder_no_bom() {
		return order_no_bom;
	}
	public void setOrder_no_bom(String order_no_bom) {
		this.order_no_bom = order_no_bom;
	}
	public String getBus_series() {
		return bus_series;
	}
	public void setBus_series(String bus_series) {
		this.bus_series = bus_series;
	}
	public String getBus_code() {
		return bus_code;
	}
	public void setBus_code(String bus_code) {
		this.bus_code = bus_code;
	}
	public String getVehicle_class() {
		return vehicle_class;
	}
	public void setVehicle_class(String vehicle_class) {
		this.vehicle_class = vehicle_class;
	}
	public String getOrder_color() {
		return order_color;
	}
	public void setOrder_color(String order_color) {
		this.order_color = order_color;
	}
	public String getExpect_delivery_date() {
		return expect_delivery_date;
	}
	public void setExpect_delivery_date(String expect_delivery_date) {
		this.expect_delivery_date = expect_delivery_date;
	}
	public String getSupply_days() {
		return supply_days;
	}
	public void setSupply_days(String supply_days) {
		this.supply_days = supply_days;
	}
	public String getProject_background() {
		return project_background;
	}
	public void setProject_background(String project_background) {
		this.project_background = project_background;
	}
	public String getSpecial_requirements() {
		return special_requirements;
	}
	public void setSpecial_requirements(String special_requirements) {
		this.special_requirements = special_requirements;
	}
	public String getPo_approval_date() {
		return po_approval_date;
	}
	public void setPo_approval_date(String po_approval_date) {
		this.po_approval_date = po_approval_date;
	}
	public String getOrder_source() {
		return order_source;
	}
	public void setOrder_source(String order_source) {
		this.order_source = order_source;
	}
	public String getSynchronised_date() {
		return synchronised_date;
	}
	public void setSynchronised_date(String synchronised_date) {
		this.synchronised_date = synchronised_date;
	}	
	
}
