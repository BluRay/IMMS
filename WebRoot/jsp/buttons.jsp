<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>Buttons &amp; Icon - Ace Admin</title>

		<meta name="description" content="Common Buttons &amp; Icons" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="assets/css/font-awesome.min.css" />

		<!-- page specific plugin styles -->

		<!-- text fonts -->
		<link rel="stylesheet" href="assets/css/ace-fonts.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="assets/css/ace.min.css" id="main-ace-style" />

		<!--[if lte IE 9]>
			<link rel="stylesheet" href="assets/css/ace-part2.min.css" />
		<![endif]-->
		<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
		<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />

		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
		<![endif]-->

		<!-- inline styles related to this page -->

		<!-- ace settings handler -->
		<script src="assets/js/ace-extra.min.js"></script>

		<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

		<!--[if lte IE 8]>
		<script src="assets/js/html5shiv.min.js"></script>
		<script src="assets/js/respond.min.js"></script>
		<![endif]-->
	</head>

	<body class="no-skin">
		<!-- #section:basics/navbar.layout -->
		<jsp:include page="top.jsp" flush="true"/>

		<!-- /section:basics/navbar.layout -->
		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<!-- #section:basics/sidebar -->
			<div id="sidebar" class="sidebar                  responsive">
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
				</script>

				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
						<button class="btn btn-success">
							<i class="ace-icon fa fa-signal"></i>
						</button>

						<button class="btn btn-info">
							<i class="ace-icon fa fa-pencil"></i>
						</button>

						<!-- #section:basics/sidebar.layout.shortcuts -->
						<button class="btn btn-warning">
							<i class="ace-icon fa fa-users"></i>
						</button>

						<button class="btn btn-danger">
							<i class="ace-icon fa fa-cogs"></i>
						</button>

						<!-- /section:basics/sidebar.layout.shortcuts -->
					</div>

					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<span class="btn btn-success"></span>

						<span class="btn btn-info"></span>

						<span class="btn btn-warning"></span>

						<span class="btn btn-danger"></span>
					</div>
				</div><!-- /.sidebar-shortcuts -->

				<jsp:include page="left.jsp" flush="true"/>

				<!-- #section:basics/sidebar.layout.minimize -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>

				<!-- /section:basics/sidebar.layout.minimize -->
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>
			</div>

			<!-- /section:basics/sidebar -->
			<div class="main-content">
				<!-- #section:basics/content.breadcrumbs -->
				<div class="breadcrumbs" id="breadcrumbs">
					<script type="text/javascript">
						try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
					</script>

					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">Home</a>
						</li>

						<li>
							<a href="#">UI &amp; Elements</a>
						</li>
						<li class="active">Buttons &amp; Icons</li>
					</ul><!-- /.breadcrumb -->

					<!-- #section:basics/content.searchbox -->
					<div class="nav-search" id="nav-search">
						<form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input" id="nav-search-input" autocomplete="off" />
								<i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
						</form>
					</div><!-- /.nav-search -->

					<!-- /section:basics/content.searchbox -->
				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					<!-- #section:settings.box -->
					<div class="ace-settings-container" id="ace-settings-container">
						<div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
							<i class="ace-icon fa fa-cog bigger-150"></i>
						</div>

						<div class="ace-settings-box clearfix" id="ace-settings-box">
							<div class="pull-left width-50">
								<!-- #section:settings.skins -->
								<div class="ace-settings-item">
									<div class="pull-left">
										<select id="skin-colorpicker" class="hide">
											<option data-skin="no-skin" value="#438EB9">#438EB9</option>
											<option data-skin="skin-1" value="#222A2D">#222A2D</option>
											<option data-skin="skin-2" value="#C6487E">#C6487E</option>
											<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
										</select>
									</div>
									<span>&nbsp; Choose Skin</span>
								</div>

								<!-- /section:settings.skins -->

								<!-- #section:settings.navbar -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar" />
									<label class="lbl" for="ace-settings-navbar"> Fixed Navbar</label>
								</div>

								<!-- /section:settings.navbar -->

								<!-- #section:settings.sidebar -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar" />
									<label class="lbl" for="ace-settings-sidebar"> Fixed Sidebar</label>
								</div>

								<!-- /section:settings.sidebar -->

								<!-- #section:settings.breadcrumbs -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs" />
									<label class="lbl" for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
								</div>

								<!-- /section:settings.breadcrumbs -->

								<!-- #section:settings.rtl -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" />
									<label class="lbl" for="ace-settings-rtl"> Right To Left (rtl)</label>
								</div>

								<!-- /section:settings.rtl -->

								<!-- #section:settings.container -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-add-container" />
									<label class="lbl" for="ace-settings-add-container">
										Inside
										<b>.container</b>
									</label>
								</div>

								<!-- /section:settings.container -->
							</div><!-- /.pull-left -->

							<div class="pull-left width-50">
								<!-- #section:basics/sidebar.options -->
								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" />
									<label class="lbl" for="ace-settings-hover"> Submenu on Hover</label>
								</div>

								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" />
									<label class="lbl" for="ace-settings-compact"> Compact Sidebar</label>
								</div>

								<div class="ace-settings-item">
									<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" />
									<label class="lbl" for="ace-settings-highlight"> Alt. Active Item</label>
								</div>

								<!-- /section:basics/sidebar.options -->
							</div><!-- /.pull-left -->
						</div><!-- /.ace-settings-box -->
					</div><!-- /.ace-settings-container -->

					<!-- /section:settings.box -->
					<div class="page-content-area">
						<div class="page-header">
							<h1>
								Buttons &amp; Icon
								<small>
									<i class="ace-icon fa fa-angle-double-right"></i>
									Common Buttons &amp; Icons
								</small>
							</h1>
						</div><!-- /.page-header -->

						<div class="row">
							<div class="col-xs-12">
								<!-- PAGE CONTENT BEGINS -->
								<div class="row">
									<div class="col-xs-12">
										<h3 class="header smaller lighter green">Application Buttons</h3>

										<!-- #section:elements.button.app -->
										<p>
											<a href="#" class="btn btn-default btn-app radius-4">
												<i class="ace-icon fa fa-cog bigger-230"></i>
												Default
												<span class="badge badge-pink">+3</span>
											</a>

											<a href="#" class="btn btn-app btn-primary no-radius">
												<i class="ace-icon fa fa-pencil-square-o bigger-230"></i>
												Edit
												<span class="badge badge-warning badge-left">11</span>
											</a>

											<a href="#" class="btn btn-app btn-success">
												<i class="ace-icon fa fa-refresh bigger-230"></i>
												Reload
											</a>

											<button class="btn btn-app btn-warning">
												<i class="ace-icon fa fa-undo bigger-230"></i>
												Undo
											</button>

											<a href="#" class="btn btn-app btn-info btn-sm no-radius">
												<i class="ace-icon fa fa-envelope bigger-200"></i>
												Mailbox
												<span class="label label-inverse arrowed-in">6+</span>
											</a>

											<button class="btn btn-app btn-danger btn-sm">
												<i class="ace-icon fa fa-trash-o bigger-200"></i>
												Delete
											</button>

											<button class="btn btn-app btn-purple btn-sm">
												<i class="ace-icon fa fa-cloud-upload bigger-200"></i>
												Upload
											</button>

											<button class="btn btn-app btn-pink btn-sm">
												<i class="ace-icon fa fa-share bigger-200"></i>
												Share
											</button>

											<button class="btn btn-app btn-inverse btn-xs">
												<i class="ace-icon fa fa-lock bigger-160"></i>
												Lock
											</button>

											<button class="btn btn-app btn-grey btn-xs radius-4">
												<i class="ace-icon fa fa-floppy-o bigger-160"></i>

												Save
												<span class="badge badge-transparent">
													<i class="light-red ace-icon fa fa-asterisk"></i>
												</span>
											</button>

											<button class="btn btn-app btn-light btn-xs">
												<i class="ace-icon fa fa-print bigger-160"></i>
												Print
											</button>

											<a href="#" class="btn btn-app btn-yellow btn-xs">
												<i class="ace-icon fa fa-shopping-cart bigger-160"></i>
												Shop
											</a>
										</p>

										<!-- /section:elements.button.app -->
									</div>
								</div>

								<div class="space"></div>

								<div class="row">
									<div class="col-sm-6" id="default-buttons">
										<h3 class="row header smaller lighter purple">
											<span class="col-sm-6"> Default Buttons </span><!-- /.col -->

											<span class="col-sm-6">
												<label class="pull-right inline">
													<small class="muted smaller-90">Border:</small>

													<input id="id-button-borders" checked="" type="checkbox" class="ace ace-switch ace-switch-5" />
													<span class="lbl middle"></span>
												</label>
											</span><!-- /.col -->
										</h3><!-- /.row -->

										<!-- #section:elements.button -->
										<p>
											<button class="btn">Default </button>
											<button class="btn btn-primary">Primary</button>
											<button class="btn btn-info">Info</button>
											<button class="btn btn-success">Success</button>
										</p>

										<p>
											<button class="btn btn-warning">Warning</button>
											<button class="btn btn-danger">Danger</button>
											<button class="btn btn-inverse">Inverse</button>
											<button class="btn btn-pink">Pink</button>
										</p>

										<p>
											<button class="btn btn-purple">Purple</button>
											<button class="btn btn-yellow">Yellow</button>
											<button class="btn btn-grey">Grey</button>
											<button class="btn btn-light">Light</button>
											<button class="btn btn-link">Link</button>
										</p>

										<!-- /section:elements.button -->

										<!-- #section:elements.button.white -->
										<p>
											<button type="button" class="btn btn-white">White</button>
											<button type="button" class="btn btn-white btn-default">Default</button>
											<button type="button" class="btn btn-white btn-primary">Primary</button>
											<button type="button" class="btn btn-white btn-info">Info</button>
											<button type="button" class="btn btn-white btn-success">Success</button>
											<button type="button" class="btn btn-white btn-warning">Warning</button>
										</p>

										<p>
											<button type="button" class="btn btn-white btn-danger btn-sm">Danger</button>
											<button type="button" class="btn btn-white btn-yellow btn-sm">Yellow</button>
											<button type="button" class="btn btn-white btn-pink btn-sm">Pink</button>
											<button type="button" class="btn btn-white btn-purple btn-sm">Purple</button>
											<button type="button" class="btn btn-white btn-inverse btn-sm">Inverse</button>
										</p>

										<!-- /section:elements.button.white -->
										<h3 class="header smaller lighter green">Button with Icons</h3>

										<p>
											<button class="btn btn-white btn-info btn-bold">
												<i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>
												Backup
											</button>

											<button class="btn btn-white btn-warning btn-bold">
												<i class="ace-icon fa fa-trash-o bigger-120 orange"></i>
												Delete
											</button>

											<button class="btn btn-white btn-default btn-round">
												<i class="ace-icon fa fa-times red2"></i>
												Cancel
											</button>
										</p>

										<div class="hr hr-dotted hr-16"></div>

										<p>
											<button class="btn">
												<i class="ace-icon fa fa-pencil align-top bigger-125"></i>
												Default
											</button>

											<button class="btn btn-primary">
												<i class="ace-icon fa fa-flask align-top bigger-125"></i>
												Primary
											</button>

											<button class="btn btn-info">
												Info
												<i class="ace-icon fa fa-print  align-top bigger-125 icon-on-right"></i>
											</button>
										</p>

										<p>
											<button class="btn btn-lg btn-success">
												<i class="ace-icon fa fa-check"></i>
												Success
											</button>

											<button class="btn btn-sm btn-warning">
												<i class="ace-icon fa fa-fire bigger-110"></i>
												<span class="bigger-110 no-text-shadow">Warning</span>
											</button>

											<button class="btn btn-xs btn-danger">
												<i class="ace-icon fa fa-bolt bigger-110"></i>

												Danger
												<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
											</button>
										</p>

										<p>
											<button class="btn btn-info">
												<i class="ace-icon fa fa-signal icon-only bigger-150"></i>
											</button>

											<button class="btn btn-warning btn-xs">
												<i class="ace-icon fa fa-wrench  bigger-110 icon-only"></i>
											</button>

											<button class="btn btn-danger btn-sm">
												<i class="ace-icon fa fa-reply icon-only"></i>
											</button>

											<button class="btn btn-grey btn-lg">
												<i class="ace-icon fa fa-trash-o fa-2x icon-only"></i>
											</button>
										</p>
									</div><!-- /.col -->

									<div class="col-sm-6">
										<h3 class="header smaller lighter red">Button Sizing</h3>

										<p>
											<button class="btn btn-minier btn-yellow">Minier</button>
											<button class="btn btn-xs">Mini</button>
											<button class="btn btn-sm btn-primary">Small</button>
											<button class="btn btn-info">Default</button>
											<button class="btn btn-lg btn-success">Large Size</button>
										</p>

										<p>
											<button class="btn btn-warning btn-lg">Large Size</button>
											<button class="btn btn-danger">Default</button>
											<button class="btn btn-sm btn-inverse">Small</button>
											<button class="btn btn-xs btn-pink">Pink</button>
											<button class="btn btn-minier btn-purple">Purple</button>
										</p>
										<h3 class="header smaller lighter grey">Disabled Buttons</h3>

										<p>
											<button class="btn disabled">Default </button>
											<button class="btn disabled btn-primary">Primary</button>
											<button class="btn disabled btn-info">Info</button>
											<button class="btn disabled btn-success">Success</button>
										</p>

										<hr />
										<p>
											<button class="btn btn-danger btn-block">Block Button</button>
										</p>
									</div><!-- /.col -->
								</div><!-- /.row -->

								<hr />
								<div class="row">
									<div class="col-sm-6">
										<h3 class="header smaller lighter blue">Button Groups</h3>

										<p></p>
										<div class="btn-group">
											<button type="button" class="btn">1</button>
											<button type="button" class="btn">2</button>
											<button type="button" class="btn">3</button>
										</div>
										

										<p></p>
										<div class="btn-group">
											<button type="button" class="btn btn-white btn-sm btn-primary">Left</button>
											<button type="button" class="btn btn-white btn-sm btn-primary">Middle</button>
											<button type="button" class="btn btn-white btn-sm btn-primary">Right</button>
										</div>
										

										<p></p>
										<div class="btn-toolbar">
											<div class="btn-group">
												<button class="btn btn-light">1</button>
												<button class="btn btn-light">2</button>
												<button class="btn btn-light">3</button>
												<button class="btn btn-light">4</button>
											</div>

											<div class="btn-group btn-corner">
												<button class="btn">5</button>
												<button class="btn">6</button>
												<button class="btn">7</button>
											</div>

											<div class="btn-group">
												<button class="btn btn-grey">8</button>
											</div>
										</div>
										

										<p></p>
										<div class="btn-group btn-group-vertical">
											<button class="btn" type="button">
												<i class="icon-only ace-icon fa fa-align-left"></i>
											</button>

											<button class="btn" type="button">
												<i class="icon-only ace-icon fa fa-align-center"></i>
											</button>

											<button class="btn" type="button">
												<i class="icon-only ace-icon fa fa-align-right"></i>
											</button>

											<button class="btn" type="button">
												<i class="icon-only ace-icon fa fa-align-justify"></i>
											</button>
										</div>

										<div class="space-6"></div>
										

										<p>
											<button id="loading-btn" type="button" class="btn btn-success" data-loading-text="Loading...">Loading state</button>
											<button type="button" class="btn btn-primary" data-toggle="button">Single Toggle</button>
											<button type="button" class="btn btn-sm btn-danger" data-toggle="button">Small</button>
											<button type="button" class="btn btn-xs btn-info" data-toggle="button">Mini</button>
										</p>

										<p></p>
										<div>
											<span>Checkbox: &nbsp;</span>

											<div data-toggle="buttons" class="btn-group">
												<label class="btn btn-sm">
													<input type="checkbox" value="1" />
													<i class="icon-only ace-icon fa fa-bold bigger-110"></i>
												</label>

												<label class="btn btn-sm">
													<input type="checkbox" value="2" />
													<i class="icon-only ace-icon fa fa-italic bigger-110"></i>
												</label>

												<label class="btn btn-sm">
													<input type="checkbox" value="3" />
													<i class="icon-only ace-icon fa fa-underline bigger-110"></i>
												</label>
											</div>
										</div>
										

										<p></p>
										<div>
											<span>Checkbox: &nbsp;</span>

											<!-- #section:elements.button.group -->
											<div data-toggle="buttons" class="btn-group btn-overlap btn-corner">
												<label class="btn btn-sm btn-white btn-info">
													<input type="checkbox" value="1" />
													<i class="icon-only ace-icon fa fa-bold bigger-110"></i>
												</label>

												<label class="btn btn-sm btn-white btn-info">
													<input type="checkbox" value="2" />
													<i class="icon-only ace-icon fa fa-italic bigger-110"></i>
												</label>

												<label class="btn btn-sm btn-white btn-info">
													<input type="checkbox" value="3" />
													<i class="icon-only ace-icon fa fa-underline bigger-110"></i>
												</label>
											</div>

											<!-- /section:elements.button.group -->
										</div>
										

										<p></p>
										<div>
											<span>Radio: &nbsp;</span>

											<div data-toggle="buttons" class="btn-group">
												<label class="btn btn-primary">
													<input type="radio" value="1" />
													<i class="icon-only ace-icon fa fa-align-left"></i>
												</label>

												<label class="btn btn-primary">
													<input type="radio" value="2" />
													<i class="icon-only ace-icon fa fa-align-center"></i>
												</label>

												<label class="btn btn-primary">
													<input type="radio" value="3" />
													<i class="icon-only ace-icon fa fa-align-right"></i>
												</label>
											</div>

											<label class="btn btn-primary" data-toggle="button">
												<i class="icon-only ace-icon fa fa-align-justify"></i>
											</label>
										</div>
										
									</div><!-- /.span -->

									<div class="col-sm-6">
										<h3 class="header smaller lighter green">Button Dropdown</h3>

										<p></p>
										<div class="btn-toolbar">
											<div class="btn-group">
												<button data-toggle="dropdown" class="btn dropdown-toggle">
													Action
													<span class="ace-icon fa fa-caret-down icon-on-right"></span>
												</button>

												<ul class="dropdown-menu dropdown-default">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-primary btn-white dropdown-toggle">
													Action
													<i class="ace-icon fa fa-angle-down icon-on-right"></i>
												</button>

												<ul class="dropdown-menu">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-sm btn-danger dropdown-toggle">
													Danger
													<i class="ace-icon fa fa-angle-down icon-on-right"></i>
												</button>

												<ul class="dropdown-menu dropdown-danger">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>

										<div class="space-4"></div>

										<div class="btn-toolbar">
											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-warning dropdown-toggle">
													Warning
													<span class="ace-icon fa fa-caret-down icon-on-right"></span>
												</button>

												<ul class="dropdown-menu dropdown-warning">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-success btn-lg dropdown-toggle">
													Success large
													<i class="ace-icon fa fa-angle-down icon-on-right"></i>
												</button>

												<ul class="dropdown-menu dropdown-success dropdown-menu-right">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>

										<div class="space-4"></div>

										<div class="btn-toolbar">
											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-info btn-sm dropdown-toggle">
													Info small
													<span class="ace-icon fa fa-caret-down icon-on-right"></span>
												</button>

												<ul class="dropdown-menu dropdown-info dropdown-menu-right">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button data-toggle="dropdown" class="btn btn-inverse btn-xs dropdown-toggle">
													Inverse mini
													<span class="ace-icon fa fa-caret-down icon-on-right"></span>
												</button>

												<ul class="dropdown-menu dropdown-inverse">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>

										<hr />
										

										<p></p>
										<div class="btn-toolbar">
											<div class="btn-group">
												<button class="btn">Action</button>

												<button data-toggle="dropdown" class="btn dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only"></span>
												</button>

												<ul class="dropdown-menu">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button class="btn btn-sm btn-yellow">Some Action</button>

												<button data-toggle="dropdown" class="btn btn-sm btn-yellow dropdown-toggle">
													<i class="ace-icon fa fa-angle-down icon-only"></i>
												</button>

												<ul class="dropdown-menu dropdown-yellow">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group dropup">
												<button class="btn btn-xs btn-danger">Danger</button>

												<button data-toggle="dropdown" class="btn btn-xs btn-danger dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only"></span>
												</button>

												<ul class="dropdown-menu dropdown-danger">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>

										<div class="space-2"></div>

										<div class="btn-toolbar">
											<div class="btn-group">
												<button class="btn btn-lg btn-warning">Warning</button>

												<button data-toggle="dropdown" class="btn btn-lg btn-warning dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only smaller-90"></span>
												</button>

												<ul class="dropdown-menu dropdown-warning">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button class="btn btn-success">Success</button>

												<button data-toggle="dropdown" class="btn btn-success dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only"></span>
												</button>

												<ul class="dropdown-menu dropdown-success">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->

											<div class="btn-group">
												<button class="btn btn-info btn-white">Info</button>

												<button data-toggle="dropdown" class="btn btn-info btn-white dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only"></span>
												</button>

												<ul class="dropdown-menu dropdown-info dropdown-menu-right">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>

										<div class="space-2"></div>

										<div class="btn-toolbar">
											<div class="btn-group">
												<button class="btn btn-inverse">Inverse</button>

												<button data-toggle="dropdown" class="btn btn-inverse dropdown-toggle">
													<span class="ace-icon fa fa-caret-down icon-only"></span>
												</button>

												<ul class="dropdown-menu dropdown-inverse">
													<li>
														<a href="#">Action</a>
													</li>

													<li>
														<a href="#">Another action</a>
													</li>

													<li>
														<a href="#">Something else here</a>
													</li>

													<li class="divider"></li>

													<li>
														<a href="#">Separated link</a>
													</li>
												</ul>
											</div><!-- /.btn-group -->
										</div>
										
									</div><!-- /.span -->
								</div><!-- /.row -->

								<hr />
								<div class="row">
									<div class="col-sm-6">
										<h3 class="header smaller lighter green">Lables & Badges</h3>

										<!-- #section:elements.label -->
										<p>
											<span class="label">Default</span>
											<span class="label label-success arrowed">Success</span>

											<span class="label label-warning">
												<i class="ace-icon fa fa-exclamation-triangle bigger-120"></i>
												Warning
											</span>
											<span class="label label-danger arrowed-in">Danger</span>
											<span class="label label-info arrowed-in-right arrowed">Info</span>
											<span class="label label-inverse">Inverse</span>
										</p>

										<!-- /section:elements.label -->

										<!-- #section:elements.badge -->
										<p>
											<span class="badge">1</span>
											<span class="badge badge-grey">1</span>
											<span class="badge badge-success">2</span>
											<span class="badge badge-warning">4</span>
											<span class="badge badge-danger">6</span>
											<span class="badge badge-info">8</span>
											<span class="badge badge-purple">3</span>
											<span class="badge badge-inverse">10</span>
											<span class="badge badge-pink">11</span>
											<span class="badge badge-yellow">2</span>
										</p>

										<!-- /section:elements.badge -->
										<p>
											<span class="label label-lg label-pink arrowed-right">Large</span>
											<span class="label label-lg label-yellow arrowed-in">Yellow</span>
											<span class="label label-lg label-purple arrowed">Purple</span>
										</p>

										<p>
											<span class="label label-xlg label-primary arrowed arrowed-right">Larger</span>
											<span class="label label-xlg label-grey arrowed-in-right arrowed-in">Grey</span>
											<span class="label label-xlg label-light arrowed-in-right">Light</span>
										</p>

										<p>
											<span class="label label-sm label-primary arrowed arrowed-right">Smaller</span>
										</p>
									</div><!-- /.span -->

									<div class="col-sm-6">
										<h3 class="header smaller lighter red">Pagination</h3>

										<div>
											<ul class="pagination">
												<li class="disabled">
													<a href="#">
														<i class="ace-icon fa fa-angle-double-left"></i>
													</a>
												</li>

												<li class="active">
													<a href="#">1</a>
												</li>

												<li>
													<a href="#">2</a>
												</li>

												<li>
													<a href="#">3</a>
												</li>

												<li>
													<a href="#">4</a>
												</li>

												<li>
													<a href="#">5</a>
												</li>

												<li>
													<a href="#">
														<i class="ace-icon fa fa-angle-double-right"></i>
													</a>
												</li>
											</ul>
										</div>

										<p></p>
										<ul class="pager">
											<li class="previous">
												<a href="#">&larr; Older</a>
											</li>

											<li class="next">
												<a href="#">Newer &rarr;</a>
											</li>
										</ul>
										
									</div><!-- /.span -->
								</div><!-- /.row -->

								<hr />
								<div class="row">
									<div class="col-xs-12">
										<h3 class="header smaller lighter blue">
											369 Scalable FontAwesome Icons
											<small>
												<a href="http://fontawesome.io/icons/" target="_blank">
													(see all icons
													<i class="ace-icon fa fa-external-link"></i>)
												</a>
											</small>
										</h3>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon fa fa-adjust"></i>
												fa-adjust
											</li>

											<li>
												<i class="ace-icon fa fa-asterisk"></i>
												fa-asterisk
											</li>

											<li>
												<i class="ace-icon fa fa-ban"></i>
												fa-ban
											</li>

											<li>
												<i class="ace-icon fa fa-bar-chart-o"></i>
												fa-bar-chart-o
											</li>

											<li>
												<i class="ace-icon fa fa-barcode"></i>
												fa-barcode
											</li>

											<li>
												<i class="ace-icon fa fa-flask"></i>
												fa-flask
											</li>

											<li>
												<i class="ace-icon fa fa-beer"></i>
												fa-beer
											</li>

											<li>
												<i class="ace-icon fa fa-bell-o"></i>
												fa-bell-o
											</li>

											<li>
												<i class="ace-icon fa fa-bell"></i>
												fa-bell
											</li>

											<li>
												<i class="ace-icon fa fa-bolt"></i>
												fa-bolt
											</li>

											<li>
												<i class="ace-icon fa fa-book"></i>
												fa-book
											</li>

											<li>
												<i class="ace-icon fa fa-bookmark"></i>
												fa-bookmark
											</li>

											<li>
												<i class="ace-icon fa fa-bookmark-o"></i>
												fa-bookmark-o
											</li>

											<li>
												<i class="ace-icon fa fa-briefcase"></i>
												fa-briefcase
											</li>

											<li>
												<i class="ace-icon fa fa-bullhorn"></i>
												fa-bullhorn
											</li>

											<li>
												<i class="ace-icon fa fa-calendar"></i>
												fa-calendar
											</li>

											<li>
												<i class="ace-icon fa fa-camera"></i>
												fa-camera
											</li>

											<li>
												<i class="ace-icon fa fa-camera-retro"></i>
												fa-camera-retro
											</li>

											<li>
												<i class="ace-icon fa fa-certificate"></i>
												fa-certificate
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon fa fa-check-square-o"></i>
												fa-check-square-o
											</li>

											<li>
												<i class="ace-icon fa fa-square-o"></i>
												fa-square-o
											</li>

											<li>
												<i class="ace-icon fa fa-circle"></i>
												fa-circle
											</li>

											<li>
												<i class="ace-icon fa fa-circle-o"></i>
												fa-circle-o
											</li>

											<li>
												<i class="ace-icon fa fa-cloud"></i>
												fa-cloud
											</li>

											<li>
												<i class="ace-icon fa fa-cloud-download"></i>
												fa-cloud-download
											</li>

											<li>
												<i class="ace-icon fa fa-cloud-upload"></i>
												fa-cloud-upload
											</li>

											<li>
												<i class="ace-icon fa fa-coffee"></i>
												fa-coffee
											</li>

											<li>
												<i class="ace-icon fa fa-cog"></i>
												fa-cog
											</li>

											<li>
												<i class="ace-icon fa fa-cogs"></i>
												fa-cogs
											</li>

											<li>
												<i class="ace-icon fa fa-comment"></i>
												fa-comment
											</li>

											<li>
												<i class="ace-icon fa fa-comment-o"></i>
												fa-comment-o
											</li>

											<li>
												<i class="ace-icon fa fa-comments"></i>
												fa-comments
											</li>

											<li>
												<i class="ace-icon fa fa-comments-o"></i>
												fa-comments-o
											</li>

											<li>
												<i class="ace-icon fa fa-credit-card"></i>
												fa-credit-card
											</li>

											<li>
												<i class="ace-icon fa fa-tachometer"></i>
												fa-tachometer
											</li>

											<li>
												<i class="ace-icon fa fa-desktop"></i>
												fa-desktop
											</li>

											<li>
												<i class="ace-icon fa fa-arrow-circle-o-down"></i>
												fa-arrow-circle-o-down
											</li>

											<li>
												<i class="ace-icon fa fa-download"></i>
												fa-download
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon fa fa-pencil-square-o"></i>
												fa-pencil-square-o
											</li>

											<li>
												<i class="ace-icon fa fa-envelope"></i>
												fa-envelope
											</li>

											<li>
												<i class="ace-icon fa fa-envelope-o"></i>
												fa-envelope-o
											</li>

											<li>
												<i class="ace-icon fa fa-exchange"></i>
												fa-exchange
											</li>

											<li>
												<i class="ace-icon fa fa-exclamation-circle"></i>
												fa-exclamation-circle
											</li>

											<li>
												<i class="ace-icon fa fa-external-link"></i>
												fa-external-link
											</li>

											<li>
												<i class="ace-icon fa fa-eye-slash"></i>
												fa-eye-slash
											</li>

											<li>
												<i class="ace-icon fa fa-eye"></i>
												fa-eye
											</li>

											<li>
												<i class="ace-icon fa fa-video-camera"></i>
												fa-video-camera
											</li>

											<li>
												<i class="ace-icon fa fa-fighter-jet"></i>
												fa-fighter-jet
											</li>

											<li>
												<i class="ace-icon fa fa-film"></i>
												fa-film
											</li>

											<li>
												<i class="ace-icon fa fa-filter"></i>
												fa-filter
											</li>

											<li>
												<i class="ace-icon fa fa-fire"></i>
												fa-fire
											</li>

											<li>
												<i class="ace-icon fa fa-flag"></i>
												fa-flag
											</li>

											<li>
												<i class="ace-icon fa fa-folder"></i>
												fa-folder
											</li>

											<li>
												<i class="ace-icon fa fa-folder-open"></i>
												fa-folder-open
											</li>

											<li>
												<i class="ace-icon fa fa-folder-o"></i>
												fa-folder-o
											</li>

											<li>
												<i class="ace-icon fa fa-folder-open-o"></i>
												fa-folder-open-o
											</li>

											<li>
												<i class="ace-icon fa fa-cutlery"></i>
												fa-cutlery
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon fa fa-gift"></i>
												fa-gift
											</li>

											<li>
												<i class="ace-icon fa fa-glass"></i>
												fa-glass
											</li>

											<li>
												<i class="ace-icon fa fa-globe"></i>
												fa-globe
											</li>

											<li>
												<i class="ace-icon fa fa-users"></i>
												fa-users
											</li>

											<li>
												<i class="ace-icon fa fa-hdd-o"></i>
												fa-hdd-o
											</li>

											<li>
												<i class="ace-icon fa fa-headphones"></i>
												fa-headphones
											</li>

											<li>
												<i class="ace-icon fa fa-heart"></i>
												fa-heart
											</li>

											<li>
												<i class="ace-icon fa fa-heart-o"></i>
												fa-heart-o
											</li>

											<li>
												<i class="ace-icon fa fa-home"></i>
												fa-home
											</li>

											<li>
												<i class="ace-icon fa fa-inbox"></i>
												fa-inbox
											</li>

											<li>
												<i class="ace-icon fa fa-info-circle"></i>
												fa-info-circle
											</li>

											<li>
												<i class="ace-icon fa fa-key"></i>
												fa-key
											</li>

											<li>
												<i class="ace-icon fa fa-leaf"></i>
												fa-leaf
											</li>

											<li>
												<i class="ace-icon fa fa-laptop"></i>
												fa-laptop
											</li>

											<li>
												<i class="ace-icon fa fa-gavel"></i>
												fa-gavel
											</li>

											<li>
												<i class="ace-icon fa fa-lemon-o"></i>
												fa-lemon-o
											</li>

											<li>
												<i class="ace-icon fa fa-lightbulb-o"></i>
												fa-lightbulb-o
											</li>

											<li>
												<i class="ace-icon fa fa-lock"></i>
												fa-lock
											</li>

											<li>
												<i class="ace-icon fa fa-unlock"></i>
												fa-unlock
											</li>
										</ul>
									</div>
								</div>

								<hr />
								<div class="row">
									<div class="col-xs-12">
										<h3 class="header smaller lighter blue">
											200 Scalable Glyphicons
											<small>
												<a href="http://getbootstrap.com/components/#glyphicons" target="_blank">
													(see all icons
													<i class="ace-icon fa fa-external-link"></i>)
												</a>
											</small>
										</h3>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon glyphicon glyphicon-asterisk"></i>
												glyphicon-asterisk
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-plus"></i>
												glyphicon-plus
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-euro"></i>
												glyphicon-euro
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-minus"></i>
												glyphicon-minus
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-cloud"></i>
												glyphicon-cloud
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-envelope"></i>
												glyphicon-envelope
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-pencil"></i>
												glyphicon-pencil
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-glass"></i>
												glyphicon-glass
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-music"></i>
												glyphicon-music
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-search"></i>
												glyphicon-search
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-heart"></i>
												glyphicon-heart
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-star"></i>
												glyphicon-star
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-star"></i>
												glyphicon-star-empty
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-user"></i>
												glyphicon-user
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-film"></i>
												glyphicon-film
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-th"></i>
												glyphicon-th-large
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-th"></i>
												glyphicon-th
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-th"></i>
												glyphicon-th-list
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-ok"></i>
												glyphicon-ok
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon glyphicon glyphicon-remove"></i>
												glyphicon-remove
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-zoom-in"></i>
												glyphicon-zoom-in
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-zoom-out"></i>
												glyphicon-zoom-out
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-off"></i>
												glyphicon-off
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-signal"></i>
												glyphicon-signal
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-cog"></i>
												glyphicon-cog
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-trash"></i>
												glyphicon-trash
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-home"></i>
												glyphicon-home
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-file"></i>
												glyphicon-file
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-time"></i>
												glyphicon-time
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-road"></i>
												glyphicon-road
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-download"></i>
												glyphicon-download-alt
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-download"></i>
												glyphicon-download
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-upload"></i>
												glyphicon-upload
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-inbox"></i>
												glyphicon-inbox
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-play"></i>
												glyphicon-play-circle
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-repeat"></i>
												glyphicon-repeat
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-refresh"></i>
												glyphicon-refresh
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-list"></i>
												glyphicon-list-alt
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon glyphicon glyphicon-lock"></i>
												glyphicon-lock
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-flag"></i>
												glyphicon-flag
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-headphones"></i>
												glyphicon-headphones
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-volume-off"></i>
												glyphicon-volume-off
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-volume-down"></i>
												glyphicon-volume-down
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-volume-up"></i>
												glyphicon-volume-up
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-qrcode"></i>
												glyphicon-qrcode
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-barcode"></i>
												glyphicon-barcode
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-tag"></i>
												glyphicon-tag
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-tags"></i>
												glyphicon-tags
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-book"></i>
												glyphicon-book
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-bookmark"></i>
												glyphicon-bookmark
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-print"></i>
												glyphicon-print
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-camera"></i>
												glyphicon-camera
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-font"></i>
												glyphicon-font
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-bold"></i>
												glyphicon-bold
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-italic"></i>
												glyphicon-italic
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-text-height"></i>
												glyphicon-text-height
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-text-width"></i>
												glyphicon-text-width
											</li>
										</ul>
									</div>

									<div class="col-xs-6 col-sm-3">
										<ul class="list-unstyled">
											<li>
												<i class="ace-icon glyphicon glyphicon-align-left"></i>
												glyphicon-align-left
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-align-center"></i>
												glyphicon-align-center
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-align-right"></i>
												glyphicon-align-right
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-align-justify"></i>
												glyphicon-align-justify
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-list"></i>
												glyphicon-list
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-indent-left"></i>
												glyphicon-indent-left
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-indent-right"></i>
												glyphicon-indent-right
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-facetime-video"></i>
												glyphicon-facetime-video
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-picture"></i>
												glyphicon-picture
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-map-marker"></i>
												glyphicon-map-marker
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-adjust"></i>
												glyphicon-adjust
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-tint"></i>
												glyphicon-tint
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-edit"></i>
												glyphicon-edit
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-share"></i>
												glyphicon-share
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-check"></i>
												glyphicon-check
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-move"></i>
												glyphicon-move
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-step-backward"></i>
												glyphicon-step-backward
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-fast-backward"></i>
												glyphicon-fast-backward
											</li>

											<li>
												<i class="ace-icon glyphicon glyphicon-backward"></i>
												glyphicon-backward
											</li>
										</ul>
									</div>
								</div><!-- PAGE CONTENT ENDS -->
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div><!-- /.page-content-area -->
				</div><!-- /.page-content -->
			</div><!-- /.main-content -->

			<div class="footer">
				<div class="footer-inner">
					<!-- #section:basics/footer -->
					<div class="footer-content">
						<span class="bigger-120">
							<span class="blue bolder">Ace</span>
							Application &copy; 2013-2014
						</span>

						&nbsp; &nbsp;
						<span class="action-buttons">
							<a href="#">
								<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
							</a>

							<a href="#">
								<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
							</a>
						</span>
					</div>

					<!-- /section:basics/footer -->
				</div>
			</div>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='assets/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='assets/js/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>

		<!-- page specific plugin scripts -->

		<!-- ace scripts -->
		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->
		<script type="text/javascript">
			jQuery(function($) {
				$('#loading-btn').on(ace.click_event, function () {
					var btn = $(this);
					btn.button('loading')
					setTimeout(function () {
						btn.button('reset')
					}, 2000)
				});
			
				$('#id-button-borders').attr('checked' , 'checked').on('click', function(){
						$('#default-buttons .btn').toggleClass('no-border');
				});
			})
		</script>

		<!-- the following scripts are used in demo only for onpage help and you don't need them -->
		<link rel="stylesheet" href="assets/css/ace.onpage-help.css" />
		<link rel="stylesheet" href="docs/assets/js/themes/sunburst.css" />

		<script type="text/javascript"> ace.vars['base'] = '..'; </script>
		<script src="assets/js/ace/elements.onpage-help.js"></script>
		<script src="assets/js/ace/ace.onpage-help.js"></script>
		<script src="docs/assets/js/rainbow.js"></script>
		<script src="docs/assets/js/language/generic.js"></script>
		<script src="docs/assets/js/language/html.js"></script>
		<script src="docs/assets/js/language/css.js"></script>
		<script src="docs/assets/js/language/javascript.js"></script>
	</body>
</html>
