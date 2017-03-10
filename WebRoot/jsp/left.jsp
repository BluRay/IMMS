<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>left</title>
</head>
<body>
	<ul class="nav nav-list">
					<li class="active">
						<a href="<%=basePath%>/index">
							<i class="menu-icon fa fa-tachometer"></i>
							<span class="menu-text"> 菜单栏 </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li  class="active">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-desktop"></i>
							<span class="menu-text"> 界面 &amp; 元素 </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<!-- <li class="">
								<a href="#" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>

									Layouts
									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="">
										<a href="top-menu.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Top Menu
										</a>

										<b class="arrow"></b>
									</li>

									<li class="">
										<a href="mobile-menu-1.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Default Mobile Menu
										</a>

										<b class="arrow"></b>
									</li>

									<li class="">
										<a href="mobile-menu-2.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Mobile Menu 2
										</a>

										<b class="arrow"></b>
									</li>

									<li class="">
										<a href="mobile-menu-3.html">
											<i class="menu-icon fa fa-caret-right"></i>
											Mobile Menu 3
										</a>

										<b class="arrow"></b>
									</li>
								</ul>
							</li>

							<li class="">
								<a href="typography.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Typography
								</a>

								<b class="arrow"></b>
							</li> -->
							
							<li class="">
								<a href="<%=basePath%>/blank.html">
									<i class="menu-icon fa fa-caret-right"></i>
									模板
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/elements.html">
									<i class="menu-icon fa fa-caret-right"></i>
									元素
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/buttons.html">
									<i class="menu-icon fa fa-caret-right"></i>
									按钮 &amp; 图标
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/treeview.html">
									<i class="menu-icon fa fa-caret-right"></i>
									树形菜单
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/jqueryui.html">
									<i class="menu-icon fa fa-caret-right"></i>
									jQuery UI
								</a>

								<b class="arrow"></b>
							</li>

							<!-- <li class="">
								<a href="nestable-list.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Nestable Lists
								</a>

								<b class="arrow"></b>
							</li> -->

							<!-- <li class="">
								<a href="#" class="dropdown-toggle">
									<i class="menu-icon fa fa-caret-right"></i>

									Three Level Menu
									<b class="arrow fa fa-angle-down"></b>
								</a>

								<b class="arrow"></b>

								<ul class="submenu">
									<li class="">
										<a href="#">
											<i class="menu-icon fa fa-leaf green"></i>
											Item #1
										</a>

										<b class="arrow"></b>
									</li>

									<li class="">
										<a href="#" class="dropdown-toggle">
											<i class="menu-icon fa fa-pencil orange"></i>

											4th level
											<b class="arrow fa fa-angle-down"></b>
										</a>

										<b class="arrow"></b>

										<ul class="submenu">
											<li class="">
												<a href="#">
													<i class="menu-icon fa fa-plus purple"></i>
													Add Product
												</a>

												<b class="arrow"></b>
											</li>

											<li class="">
												<a href="#">
													<i class="menu-icon fa fa-eye pink"></i>
													View Products
												</a>

												<b class="arrow"></b>
											</li>
										</ul>
									</li>
								</ul>
							</li> -->
						</ul>
					</li>

					<li class="active">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-list"></i>
							<span class="menu-text"> 表格 </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="<%=basePath%>/tables.html">
									<i class="menu-icon fa fa-caret-right"></i>
									简单 &amp; 动态
								</a>

								<b class="arrow"></b>
							</li>

							<!-- <li class="">
								<a href="jqgrid.html">
									<i class="menu-icon fa fa-caret-right"></i>
									jqGrid plugin
								</a>

								<b class="arrow"></b>
							</li> -->
						</ul>
					</li>

					<li class="active">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-pencil-square-o"></i>
							<span class="menu-text"> 表单 </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="<%=basePath%>/formelements.html">
									<i class="menu-icon fa fa-caret-right"></i>
									表单元素
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/formwizard.html">
									<i class="menu-icon fa fa-caret-right"></i>
									向导 &amp; 校验
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/wysiwyg.html">
									<i class="menu-icon fa fa-caret-right"></i>
									文本编辑器
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="<%=basePath%>/dropzone.html">
									<i class="menu-icon fa fa-caret-right"></i>
									拖拽上传文件
								</a>

								<b class="arrow"></b>
							</li>
							<li class="">
								<a href="<%=basePath%>/flow.html">
									<i class="menu-icon fa fa-caret-right"></i>
									流程测试
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li>

					<!-- <li class="">
						<a href="widgets.html">
							<i class="menu-icon fa fa-list-alt"></i>
							<span class="menu-text"> Widgets </span>
						</a>

						<b class="arrow"></b>
					</li> -->

					<!-- <li class="">
						<a href="calendar.html">
							<i class="menu-icon fa fa-calendar"></i>

							<span class="menu-text">
								Calendar

								#section:basics/sidebar.layout.badge
								<span class="badge badge-transparent tooltip-error" title="2 Important Events">
									<i class="ace-icon fa fa-exclamation-triangle red bigger-130"></i>
								</span>

								/section:basics/sidebar.layout.badge
							</span>
						</a>

						<b class="arrow"></b>
					</li> -->

					<!-- <li class="">
						<a href="gallery.html">
							<i class="menu-icon fa fa-picture-o"></i>
							<span class="menu-text"> Gallery </span>
						</a>

						<b class="arrow"></b>
					</li> -->

					<!-- <li class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-tag"></i>
							<span class="menu-text"> More Pages </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="profile.html">
									<i class="menu-icon fa fa-caret-right"></i>
									User Profile
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="inbox.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Inbox
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="pricing.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Pricing Tables
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="invoice.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Invoice
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="timeline.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Timeline
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="email.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Email Templates
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="login.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Login &amp; Register
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li> -->

					<!-- <li class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-file-o"></i>

							<span class="menu-text">
								Other Pages

								#section:basics/sidebar.layout.badge
								<span class="badge badge-primary">5</span>

								/section:basics/sidebar.layout.badge
							</span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
							<li class="">
								<a href="faq.html">
									<i class="menu-icon fa fa-caret-right"></i>
									FAQ
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="error-404.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Error 404
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="error-500.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Error 500
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="grid.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Grid
								</a>

								<b class="arrow"></b>
							</li>

							<li class="">
								<a href="blank.html">
									<i class="menu-icon fa fa-caret-right"></i>
									Blank Page
								</a>

								<b class="arrow"></b>
							</li>
						</ul>
					</li> -->
				</ul><!-- /.nav-list -->
</body>
</html>