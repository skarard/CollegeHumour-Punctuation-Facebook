// Two Arrays
var toText = [];
var replaceText = [];
toText.push('_.',
	'and/or',
	'*"',
	'"*',
	':;',
	'({',
	'})',
	'~',
	'.....',
	'^[',
	']^');
replaceText.push('<span class="chfb">.</span>',
	'<span class="chf">&</span>',
	'<span class="chfb">&#8220;</span>',
	'<span class="chfb">&#8221;</span>',
	'<span class="chfb">;</span>',
	'<span class="chfb">(</span>',
	'<span class="chfb">)</span>',
	'<span class="chf">,</span>',
	'<span class="chfb">-</span>',
	'<span class="chfb">[</span>',
	'<span class="chfb">]</span>');

function occurrences(string, subString, allowOverlapping){

    string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
}

function rewrite() {
  // Find all the text to replace with in the tags defind below by class.
  var result = document.evaluate(
      '//span[contains(@class, "userContent")] | //div[contains(@class, "direction_ltr")] | //span[contains(@class,"UFICommentBody")] | //div[contains(@class, "snippet")]',
      document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

  var item;
  var nodes = [];
  // cannot change the NODE_ITERATOR nodes' attributes in this loop itself
  // since iterateNext will invalidate the state; Need to store temporarily.
  while (item = result.iterateNext()) {
    nodes.push(item);
  }
  // This does the number crunching. 
  for (var i = 0; i < nodes.length; i++) {
    //Loads the text within nodes
	var newHTML = nodes[i].innerHTML;
	for (var j = 0; j < toText.length; j++) {
        //checks for how many times the toText occurres in html of the node
		var kcount = occurrences(newHTML, toText[j]);
		if (kcount > 0) {
			for (var k = 0; k < kcount; k++) {
                // replace the toText with replaceText if it occures and runs the amount of times it 
				newHTML = newHTML.replace(toText[j], replaceText[j]);
				nodes[i].innerHTML = newHTML;
			}
		}
	}
  }
}

function addDebouncedEventListener(obj, eventType, listener, delay) {
    var timer;

    obj.addEventListener(eventType, function(evt) {
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = window.setTimeout(function() {
            timer = null;
            listener.call(obj, evt);
        }, delay);
    }, false);
}

//Runs when a new DOM node is inserted then pauses for 2 secs to stop it running more times than nessercery
addDebouncedEventListener(document, 'DOMNodeInserted', function(evt) {
    rewrite();
}, 2000);

//Lost a bit of focus playing cars with a three year old...
