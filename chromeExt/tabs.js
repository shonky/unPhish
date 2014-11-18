
/*window.onBlur=oldUrl;
window.onFocus=newUrl;
function oldUrl()
{
	chrome.window.getCurrent(url,function (tab_url){
		alert(tab_url);
	});
}
*/
if (!window.console) console = {};
console.log = console.log || function(){};

/* Global Variables */
var listTabs=[];
var Tab = function(id,url) {
	this.id=id;
	this.url=url;
}

function checkNewPage(tab, activeInfo) {
	for (var i in listTabs) {
		console.log('In for loop, size: ' + listTabs.length);
		console.log(listTabs[i].id + ' == ' + activeInfo.tabId);
		if (listTabs[i].id == activeInfo.tabId) {
			if (listTabs[i].url != tab.url) {
				listTabs[i].url = tab.url;

				console.log('onUpdated new url: ' + listTabs[i].url);
			}
		}
	}
}

chrome.tabs.onCreated.addListener(function(nT) {
	console.log('new tab id: ' + nT.title);
	listTabs.push(new Tab(nT.id, nT.url));
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 
//	console.log('onUpdated');
//	checkNewPage(tab);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	console.log('onActivated');
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		console.log('onActivated: ' + activeInfo.tabId);
		checkNewPage(tab,activeInfo);
	});
});

// WORKS
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	console.log('inside onRemoved');
	for (var i in listTabs) {
		if (tabId == listTabs[i].id) {
			console.log('removed');
			listTabs.splice(listTabs.indexOf(i), 1);
		}
	}
});

