/**
 * Copyright (c) 2005-2010 springside.org.cn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * 
 * $Id: ServletUtils.java 1211 2010-09-10 16:20:45Z calvinxiu $
 */
package com.byd.bms.flow.util;

import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeMap;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.Assert;

/**
 * Http涓嶴ervlet宸ュ叿绫�
 * 
 * @author calvin
 */
public class ServletUtils {

	//-- Content Type 瀹氫箟 --//
	public static final String TEXT_TYPE = "text/plain";
	public static final String JSON_TYPE = "application/json";
	public static final String XML_TYPE = "text/xml";
	public static final String HTML_TYPE = "text/html";
	public static final String JS_TYPE = "text/javascript";
	public static final String EXCEL_TYPE = "application/vnd.ms-excel";

	//-- Header 瀹氫箟 --//
	public static final String AUTHENTICATION_HEADER = "Authorization";

	//-- 甯哥敤鏁板�瀹氫箟 --//
	public static final long ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

	/**
	 * 璁剧疆瀹㈡埛绔紦瀛樿繃鏈熸椂闂�鐨凥eader.
	 */
	public static void setExpiresHeader(HttpServletResponse response, long expiresSeconds) {
		//Http 1.0 header
		response.setDateHeader("Expires", System.currentTimeMillis() + expiresSeconds * 1000);
		//Http 1.1 header
		response.setHeader("Cache-Control", "private, max-age=" + expiresSeconds);
	}

	/**
	 * 璁剧疆绂佹瀹㈡埛绔紦瀛樼殑Header.
	 */
	public static void setDisableCacheHeader(HttpServletResponse response) {
		//Http 1.0 header
		response.setDateHeader("Expires", 1L);
		response.addHeader("Pragma", "no-cache");
		//Http 1.1 header
		response.setHeader("Cache-Control", "no-cache, no-store, max-age=0");
	}

	/**
	 * 璁剧疆LastModified Header.
	 */
	public static void setLastModifiedHeader(HttpServletResponse response, long lastModifiedDate) {
		response.setDateHeader("Last-Modified", lastModifiedDate);
	}

	/**
	 * 璁剧疆Etag Header.
	 */
	public static void setEtag(HttpServletResponse response, String etag) {
		response.setHeader("ETag", etag);
	}

	/**
	 * 鏍规嵁娴忚鍣↖f-Modified-Since Header, 璁＄畻鏂囦欢鏄惁宸茶淇敼.
	 * 
	 * 濡傛灉鏃犱慨鏀� checkIfModify杩斿洖false ,璁剧疆304 not modify status.
	 * 
	 * @param lastModified 鍐呭鐨勬渶鍚庝慨鏀规椂闂�
	 */
	public static boolean checkIfModifiedSince(HttpServletRequest request, HttpServletResponse response,
			long lastModified) {
		long ifModifiedSince = request.getDateHeader("If-Modified-Since");
		if ((ifModifiedSince != -1) && (lastModified < ifModifiedSince + 1000)) {
			response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
			return false;
		}
		return true;
	}

	/**
	 * 鏍规嵁娴忚鍣�If-None-Match Header, 璁＄畻Etag鏄惁宸叉棤鏁�
	 * 
	 * 濡傛灉Etag鏈夋晥, checkIfNoneMatch杩斿洖false, 璁剧疆304 not modify status.
	 * 
	 * @param etag 鍐呭鐨凟Tag.
	 */
	public static boolean checkIfNoneMatchEtag(HttpServletRequest request, HttpServletResponse response, String etag) {
		String headerValue = request.getHeader("If-None-Match");
		if (headerValue != null) {
			boolean conditionSatisfied = false;
			if (!"*".equals(headerValue)) {
				StringTokenizer commaTokenizer = new StringTokenizer(headerValue, ",");

				while (!conditionSatisfied && commaTokenizer.hasMoreTokens()) {
					String currentToken = commaTokenizer.nextToken();
					if (currentToken.trim().equals(etag)) {
						conditionSatisfied = true;
					}
				}
			} else {
				conditionSatisfied = true;
			}

			if (conditionSatisfied) {
				response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
				response.setHeader("ETag", etag);
				return false;
			}
		}
		return true;
	}

	/**
	 * 璁剧疆璁╂祻瑙堝櫒寮瑰嚭涓嬭浇瀵硅瘽妗嗙殑Header.
	 * 
	 * @param fileName 涓嬭浇鍚庣殑鏂囦欢鍚�
	 */
	public static void setFileDownloadHeader(HttpServletResponse response, String fileName) {
		try {
			//涓枃鏂囦欢鍚嶆敮鎸�			
			String encodedfileName = new String(fileName.getBytes(), "ISO8859-1");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedfileName + "\"");
		} catch (UnsupportedEncodingException e) {
		}
	}

	/**
	 * 鍙栧緱甯︾浉鍚屽墠缂�殑Request Parameters.
	 * 
	 * 杩斿洖鐨勭粨鏋滅殑Parameter鍚嶅凡鍘婚櫎鍓嶇紑.
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> getParametersStartingWith(ServletRequest request, String prefix) {
		Assert.notNull(request, "Request must not be null");
		Enumeration paramNames = request.getParameterNames();
		Map<String, Object> params = new TreeMap<String, Object>();
		if (prefix == null) {
			prefix = "";
		}
		while (paramNames != null && paramNames.hasMoreElements()) {
			String paramName = (String) paramNames.nextElement();
			if ("".equals(prefix) || paramName.startsWith(prefix)) {
				String unprefixed = paramName.substring(prefix.length());
				String[] values = request.getParameterValues(paramName);
				if (values == null || values.length == 0) {
					// Do nothing, no values found at all.
				} else if (values.length > 1) {
					params.put(unprefixed, values);
				} else {
					params.put(unprefixed, values[0]);
				}
			}
		}
		return params;
	}

	/**
	 * 瀵笻ttp Basic楠岃瘉鐨�Header杩涜缂栫爜.
	 */
	public static String encodeHttpBasic(String userName, String password) {
		String encode = userName + ":" + password;
		return "Basic " + EncodeUtils.base64Encode(encode.getBytes());
	}
}
