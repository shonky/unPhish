/*function list_session(callback) {
	chrome.windows.getAll({populate : true}, function (window_list){
		var list=[];
		for(var i=0;i<window_list.length;i++){
			list=list.concat(window_list[i].tabs);
		}
		alert(list);
		if(callback){
			callback(list);
		}
	})
}*/

/*window.onBlur=oldUrl;
window.onFocus=newUrl;

function oldUrl()
{
	chrome.window.getCurrent(url,function (tab_url){
		alert(tab_url);
	});
}


list_session();
*/
//window.onBlur=oldUrl;
//window.onFocus=newUrl;

var listTabs=[];
var tab= function(id,url){
	this.id=id;
	this.url=url;
}

chrome.tabs.onCreated.addListener(function(t)
{
	chrome.tabs.onUpdated.addListener(function(s)
	{
	var newTab=new tab(t.id,t.url);
	//listTabs.concat(newTab);
	//alert(newTab.url);})
});







//newTab();

/*function list_session(callback){
	chrome.tabs.getAllInWindow(null,function(window_list){	var list=[];
		for(var i=0;i<window_list.length;i++){
			listUrl=window_list[i].url;
			listId=windows_list[i].id;
		alert(list);}
		
		if(callback){
			callback(list);
		}
	});}

*/
	