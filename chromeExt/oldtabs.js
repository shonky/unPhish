

if (!window.console) console = {};
console.log = console.log || function(){};

/* Global Variables */
var listTabs=[];
var Tab = function(index,url, newTab) {
	this.index = index;
	this.url = url;
	this.newTab = newTab;		// flag for new created tab with no url
}

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

function sameURL(tab) {
	for (var i in listTabs) {
		if (listTabs[i].index == tab.index) {
			console.log(listTabs[i].index + ' | ' + tab.index);
			if (listTabs[i].url == tab.url) {
				console.log(listTabs[i].url + ' | ' + tab.url);
				return true;		// URL has not changed while tab was inactive
			}
		}
	}
	return false;
}

chrome.tabs.onCreated.addListener(function(nT) {
	console.log('new tab id: ' + nT.index);
	listTabs.push(new Tab(nT.index, nT.url, true));
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){ 
	console.log('updated');
	if (changeInfo.url != 'chrome://newtab/' && changeInfo.url != null) { 
		chrome.tabs.get(tabId, function(tab) {
			console.log('URL has changed: ' + changeInfo.url);
			updateURL(tab);			// For some reason the tab id keeps changing
		});
	} else {
		console.log(changeInfo.url);
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {			// onActivated fired when active tab changes
	console.log('onActivated');
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		console.log('onActivated: ' + tab.url);
		if (!sameURL(tab)) {											// Check if current tab url has changed during inactivity 
			console.log('WARNING: URL has changed');
		} else {
			updateURL(tab);											// Update URL list 
		}
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

