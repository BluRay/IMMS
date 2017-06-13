$(document).ready(function(){
	initPage();
	
	function initPage(){
		getFactorySelect("quality/qaTargetParameter",'',"#search_factory",null,'id');
		getKeysSelect("QUALITY_TARGET_PARAM", "", "#search_targetType","全部","value");
		getWorkshopSelect("quality/qaTargetParameter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect("quality/qaTargetParameter",$("#search_factory :selected").text(),"","#search_workshop",null,"id");
	})
	
});