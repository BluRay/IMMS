package com.byd.bms.util.model;

import org.springframework.stereotype.Component;

@Component
public class BmsBaseMenu {
	
	private int id;
	private String name;
	private String path;
	private int parent;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public int getParent() {
		return parent;
	}
	public void setParent(int parent) {
		this.parent = parent;
	}
	
}
