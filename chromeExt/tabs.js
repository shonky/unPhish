
/* Testing purposes */
if (!window.console) console = {};
console.log = console.log || function(){};

/* Global Variables */
var listTabs=[];
var currentTabIndex=0;									// Later change to chrome.tab.get(index)

/* Data Types */
var Tab = function(index,url, newTab) {
	this.index = index;
	this.url = url;
	this.newTab = newTab;								// flag for new created tab with no url
}

/* updateURL()
 *
 * Updates the corresponding tab in array
 * with the new URL.
 *
 * tab = current tab information
 */
function updateURL(tab) {
	for (var i in listTabs) {
		if (listTabs[i].index == tab.index) {
			if (listTabs[i].url != tab.url) {
				listTabs[i].url = tab.url;
				console.log('updateURL new url: ' + listTabs[i].url);
			}
		}
	}
}

/* sameURL()
 *
 * Checks if tab has been redirected to another URL
 * while unfocused.
 *
 * tab = current tab information
 */
function sameURL(tab) {
	for (var i in listTabs) {					
		if (listTabs[i].index == tab.index) {
			if (listTabs[i].url != tab.url) {
				console.log(listTabs[i].url + ' | ' + tab.url);
				alert("You've been Tabnabbed");
			}
			break;
		}
	}
}

/* Listen for tab creation */
chrome.tabs.onCreated.addListener(function(nT) {
	console.log('new tab id: ' + nT.index);
	listTabs.push(new Tab(nT.index, nT.url, true));
});

/* Listen for tab changes */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 
	console.log('updated');
	if (changeInfo.url != 'chrome://newtab/' && changeInfo.url != null) { 
		console.log(changeInfo.url);
	/*	chrome.tabs.get(tabId, function(tab) {
			console.log('URL has changed: ' + changeInfo.url);
			updateURL(tab);			// For some reason the tab id keeps changing
		});*/
	} 
});

/* Listen for change in current tab */
chrome.tabs.onActivated.addListener(function(activeInfo) {			// onActivated fired when active tab changes
	console.log('onActivated');
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		if (currentTabIndex != tab.index) {							// Changed current tab
			currentTabIndex = tab.index;
			sameURL(tab);										
		} else {													// Current tab changed url
			updateURL(tab);
		}
	});

});

/* Removes tab object from array, when tab has been closed */ 
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	console.log('inside onRemoved');
	for (var i in listTabs) {
		if (tabId == listTabs[i].id) {
			console.log('removed');
			listTabs.splice(listTabs.indexOf(i), 1);
		}
	}
});

