var tabs = 1;
var addTabs = function (options) {
	 //var rand = Math.random().toString();
	 //var id = rand.substring(rand.indexOf('.') + 1);
	 var url = window.location.protocol + '//' + window.location.host;
	 if(url.indexOf("http://") == -1){
		 options.url = url + options.url;
	 }
	 id = "tab_" + options.id;
	 //如果TAB不存在，创建一个新的TAB
	 //允许最多同时打开6个tab
	if (!$("#" + id)[0]) {
		 if(tabs>=7){
			 alert("最多只能同时打开6个页面，请先关闭已打开的程序后，再打开新的程序！");
		 }else{
			 //alert(options.url);
			 $(".active").removeClass("active");
			 //固定TAB中IFRAME高度
			 mainHeight = $(document).outerHeight()-115 ;//125
			 //创建新TAB的title
			 title = '<li class="myCloseTabClass" role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab"><i class="'+options.icon+'"></i>&nbsp;&nbsp;' + options.title;
			 //是否允许关闭
			 if (options.close) {
				 title += ' <i class="glyphicon glyphicon-remove-sign" tabclose="' + id + '"></i>';
			 }
			 title += '</a></li>';
			 //是否指定TAB内容
			 if (options.content) {
				 content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + options.content + '</div>';
			 } else {//没有内容，使用IFRAME打开链接
			  content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe src="' + options.url + '" width="100%" height="' + mainHeight +
			   '" frameborder="no" border="0" marginwidth="0" marginheight="0"  scrolling="yes" allowtransparency="yes"></iframe></div>';
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
	var oldSrc = $("#" + id).children('iframe ').attr('src');
	var newSrc = options.url;
	if(oldSrc !=newSrc){
		$("#" + id).children('iframe ').attr('src',newSrc);
	}
	 $("#tab_" + id).addClass('active');
	 $("#" + id).addClass("active");
	 
    //激活左边菜单
    $('#li_tab_'+options.id).addClass('active');
    
	 $(".myCloseTabClass").on("click", function (e) {
		 var pid = $(".myCloseTabClass.active").attr('id');
		 pid = pid.substring(4);
		 var id = $(this).attr("id");
		 id = id.substring(4);
		
		 $('#li_'+pid).removeClass('active');
	     $('#li_'+id).addClass('active');
	     
	 });
};
var closeTab = function (id) {
	 //如果关闭的是当前激活的TAB，激活他的前一个TAB
	 if ($(".myCloseTabClass.active").attr('id') == "tab_" + id) {
		 $("#tab_" + id).prev().addClass('active');
		 $("#" + id).prev().addClass('active');
		 
		 $('#li_'+id).removeClass('active');
		 var pid = $("#" + id).prev().attr('id');
	    //激活左边菜单
	    $('#li_'+pid).addClass('active');
	    
	 }else{
		 var mpid = $(".myCloseTabClass.active").attr('id');
		 mpid = mpid.substring(4);
		 var mid = $(this).attr("id");
		 $('#li_'+mid).removeClass('active');
		 $("#li_" + mpid).addClass("active");
		 
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
