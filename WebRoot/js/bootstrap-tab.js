var tabs = 1;
var addTabs = function (options) {
	 //var rand = Math.random().toString();
	 //var id = rand.substring(rand.indexOf('.') + 1);
	 var url = window.location.protocol + '//' + window.location.host;
	 options.url = url + options.url;
	 id = "tab_" + options.id;
	 //如果TAB不存在，创建一个新的TAB
	 //允许最多同时打开6个tab
	if (!$("#" + id)[0]) {
		 if(tabs>=6){
			 alert("最多只能同时打开6个页面，请先关闭已打开的程序后，再打开新的程序！");
		 }else{
			 $(".active").removeClass("active");
			 //固定TAB中IFRAME高度
			 mainHeight = $(document).outerHeight()-115 ;
			 //创建新TAB的title
			 title = '<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab"><i class="'+options.icon+'"></i>&nbsp;&nbsp;' + options.title;
			 //是否允许关闭
			 if (options.close) {
				 title += ' <i class="glyphicon glyphicon-remove" tabclose="' + id + '"></i>';
			 }
			 title += '</a></li>';
			 //是否指定TAB内容
			 if (options.content) {
				 content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
			 } else {//没有内容，使用IFRAME打开链接
			  content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe src="' + options.url + '" width="100%" height="' + mainHeight +
			   '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
			 }
			 tabs =tabs+1;
			 //加入TABS
			 $(".nav-tabs").append(title);
			 $(".tab-content").append(content);
		 }
	 }else{
		 $(".active").removeClass("active");
	 }
	 //激活TAB
	 $("#tab_" + id).addClass('active');
	 $("#" + id).addClass("active");
};
var closeTab = function (id) {
	 //如果关闭的是当前激活的TAB，激活他的前一个TAB
	 if ($("li.active").attr('id') == "tab_" + id) {
		 $("#tab_" + id).prev().addClass('active');
		 $("#" + id).prev().addClass('active');
	 }
	 //关闭TAB
	 tabs =tabs-1;
	 $("#tab_" + id).remove();
	 $("#" + id).remove();
};
$(function () {
	 mainHeight = $(document.body).height() - 45;
	 $('.main-left,.main-right').height(mainHeight);
	 $("[addtabs]").click(function () {
		 addTabs({ id: $(this).attr("id"), title: $(this).attr('title'), close: true });
	 });
 
	 $(".nav-tabs").on("click", "[tabclose]", function (e) {
	 id = $(this).attr("tabclose");
	 	closeTab(id);
	 });

});