package com.byd.bms.setting.model;

import org.springframework.stereotype.Component;

/*
 * 不同地区、车型生成VIN规则
 */
@Component
public class BmsBaseVinRule {
	
	private int id;
	
	//private int busTypeId; // 车型ID
	
	private String area;  // 区域
	
	private String vinPrefix;  // VIN码前八位
	
	private String wmiExtension; // WMI扩展代码
	
	private String numberSize; // 生成序列号位数
	
	private int editorId; //创建人ID
	
	private String editDate; //创建时间
	
	private int order_id;
	
	private String order_no;
	
	private String order_desc;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

/*	public int getBusTypeId() {
		return busTypeId;
	}

	public void setBusTypeId(int busTypeId) {
		this.busTypeId = busTypeId;
	}*/

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getVinPrefix() {
		return vinPrefix;
	}

	public void setVinPrefix(String vinPrefix) {
		this.vinPrefix = vinPrefix;
	}

	public String getWmiExtension() {
		return wmiExtension;
	}

	public void setWmiExtension(String wmiExtension) {
		this.wmiExtension = wmiExtension;
	}

	public String getNumberSize() {
		return numberSize;
	}

	public void setNumberSize(String numberSize) {
		this.numberSize = numberSize;
	}

	public int getEditorId() {
		return editorId;
	}

	public void setEditorId(int editorId) {
		this.editorId = editorId;
	}

	public String getEditDate() {
		return editDate;
	}

	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}

	public int getOrder_id() {
		return order_id;
	}

	public void setOrder_id(int order_id) {
		this.order_id = order_id;
	}

	public String getOrder_no() {
		return order_no;
	}

	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public String getOrder_desc() {
		return order_desc;
	}

	public void setOrder_desc(String order_desc) {
		this.order_desc = order_desc;
	}

	
	
}
