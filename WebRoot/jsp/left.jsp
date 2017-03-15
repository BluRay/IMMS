<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String rqip= request.getRemoteAddr();

String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
/* if(rqip!=request.getServerName()){
	basePath=rqip+"/";
} */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>left</title>
<script type="text/javascript">
var s = [];
function ajaxQueryMenu(){
	$.ajax({
	    url: "getMenu",
	    async: false,
	    dataType: "json",
		type: "get",
	    data: {
	    	//parentId:"1",
	    },
	    success:function(response){
	    	if(response.success) {
                $.each(eval("(" + response.result + ")"), function (index, value) {
                	value.list = [];
                    s.push(value);
                });
            } 
	    }
	});
}

function recursiveTree(id,s) {
	var node = getTreeNode(id,s);
	var childTreeNodes = queryTreeNode(id,s);
	$.each(childTreeNodes, function (index, value) {
		var n = recursiveTree(value.id,s); // 递归
		node.list.push(n);
    });
	return node;
}

function queryTreeNode(id,s) {
	var list = [];
	$.each(s, function (index, value) {
		if(value.parent===0){
			//do nothing
		}else if(value.parent===id){
			list.push(value);
		}
	});
	return list;
}

function getTreeNode(id,s) {
	var tn;
	$.each(s, function (index, value) {
		if(value.id===id){
			tn = value;
		}
	});
	return tn;
}

var menuTree = [];
$(document).ready(function () {
	//收起侧边菜单
	/* $('.nav-list').find('li').each(function(){
		$(this).removeClass('active');
	}); */
	
	/* $('.nav-list').find('li').on('click',function(){
		//alert($(this).html());
		$('.nav-list').find('li').each(function(){
			if($(this).hasClass('open')){
			alert($(this).html());
			$(this).find('a').eq(0).trigger("click");
			}
		});
	});  */
	
	//查询菜单数据
	ajaxQueryMenu();
	//生成菜单树
	if(s.length>0){
		$.each(s, function (index, value) {
			if(value.parent===0){
				var node = recursiveTree(value.id,s);
				menuTree.push(node);
			}
		});
	}
	//console.log(menuTree);
	//生成菜单元素
	if(menuTree.length>0){
		$.each(menuTree, function (index, value) {
			var root = $('.nav-list');
			
			var li = $('<li  class="" />');
			var a = $('<a href=\"'+value.path+'\" class=\"dropdown-toggle\" ></a>');
			var i = $('<i class="menu-icon fa fa-desktop"></i>');
			i.appendTo(a);
			var span = $('<span class="menu-text"> '+value.name+' </span>');
			span.appendTo(a);
			if(value.list.length>0){
				var b = $('<b class="arrow fa fa-angle-down"></b>');
				b.appendTo(a);
			}
			a.appendTo(li);
			var b1 = $('<b class="arrow"></b>');
			b1.appendTo(li);
			
			traverseTree(value,li);
			//console.log(li.html());
			
			li.appendTo(root);
		});
	}
	
	//定位当前菜单
	var url = window.location+"";
	//alert(getRealPath(url));
	$('.nav-list').find('li').each(function(){
		if(getRealPath(url)===getRealPath($(this).find("a").eq(0).attr('href'))){
			//alert(getRealPath($(this).find("a").eq(0).attr('href')));
			/* $(this).parent().parent().addClass('open');*/
			$(this).parent().parent().find('a').eq(0).trigger("click");
			$(this).parent().parent().addClass('active');
			$(this).addClass('active');
		}
	});
});

function getRealPath(str){
	/* var index = str.indexOf("\/");
	var tmp  = str.substring(index + 1, str.length); */
	var index1 = str.lastIndexOf(".");
	if(index1===-1){
		return str;
	}
	var result = str.substring(0,index1);
	return result;
}

//遍历树生成菜单元素
function traverseTree(node,parentli){
	$.each(node.list, function (index, value) {
		var ul = $('<ul class="submenu" />');
		var li = $('<li  class="" />');
		var a = $('<a href=\"'+value.path+'\" class=\"dropdown-toggle\" >'+value.name+'</a>');
		if(value.list.length>0){
			var i = $('<i class="menu-icon fa fa-caret-right"></i>');
			i.appendTo(a);
		
			var b = $('<b class="arrow fa fa-angle-down"></b>');
			b.appendTo(a);
		}
		a.appendTo(li);
		var b1 = $('<b class="arrow"></b>');
		b1.appendTo(li);
		li.appendTo(ul);
		traverseTree(value,li);//递归
		ul.appendTo(parentli);
	});
}
</script>
</head>
<body>
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

				<ul class="nav nav-list">
					<li class="">
						<a href="<%=basePath%>/index">
							<i class="menu-icon fa fa-tachometer"></i>
							<span class="menu-text"> 菜单栏 </span>
						</a>

						<b class="arrow"></b>
					</li>

					<li  class="">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-desktop"></i>
							<span class="menu-text"> 界面 &amp; 元素 </span>

							<b class="arrow fa fa-angle-down"></b>
						</a>

						<b class="arrow"></b>

						<ul class="submenu">
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
						</ul>
					</li>

					<li class="">
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
						</ul>
					</li>

					<li class="">
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
				</ul><!-- /.nav-list -->

				<!-- #section:basics/sidebar.layout.minimize -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>

				<!-- /section:basics/sidebar.layout.minimize -->
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>
			</div>
</body>
</html>