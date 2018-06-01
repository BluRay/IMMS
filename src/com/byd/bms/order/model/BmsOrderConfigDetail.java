package com.byd.bms.order.model;

/**
 * 订单配置明细
 * @author xiong.jianwu
 *
 */
public class BmsOrderConfigDetail {
	private int config_id;//订单配置id
	private String order_vehicle_model;
	private String family_code;
	private String family_name;
	private String feature_code;
	private String feature_name;
	private String supplier_code;
	private String supplier_name;
	private String sap_material;
	private String material;
	private String workshop;//车间
	private String notes;//备注
	
	public String getFamily_code() {
		return family_code;
	}
	public void setFamily_code(String family_code) {
		this.family_code = family_code;
	}
	public String getOrder_vehicle_model() {
		return order_vehicle_model;
	}
	public void setOrder_vehicle_model(String order_vehicle_model) {
		this.order_vehicle_model = order_vehicle_model;
	}
	public int getConfig_id() {
		return config_id;
	}
	public void setConfig_id(int config_id) {
		this.config_id = config_id;
	}

	public String getWorkshop() {
		return workshop;
	}
	public void setWorkshop(String workshop) {
		this.workshop = workshop;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getFamily_name() {
		return family_name;
	}
	public void setFamily_name(String family_name) {
		this.family_name = family_name;
	}
	public String getFeature_code() {
		return feature_code;
	}
	public void setFeature_code(String feature_code) {
		this.feature_code = feature_code;
	}
	public String getFeature_name() {
		return feature_name;
	}
	public void setFeature_name(String feature_name) {
		this.feature_name = feature_name;
	}
	public String getSupplier_code() {
		return supplier_code;
	}
	public void setSupplier_code(String supplier_code) {
		this.supplier_code = supplier_code;
	}
	public String getSupplier_name() {
		return supplier_name;
	}
	public void setSupplier_name(String supplier_name) {
		this.supplier_name = supplier_name;
	}
	public String getSap_material() {
		return sap_material;
	}
	public void setSap_material(String sap_material) {
		this.sap_material = sap_material;
	}
	public String getMaterial() {
		return material;
	}
	public void setMaterial(String material) {
		this.material = material;
	}
	
	
}
