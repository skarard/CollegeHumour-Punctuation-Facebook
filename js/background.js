// Check whether new version or updated version is installed and if so display options.html 
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
	chrome.tabs.create({url: "../options.html"});
    }else if(details.reason == "update"){
	chrome.tabs.create({url: "../options.html"});
    }
});
// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-40054057-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
